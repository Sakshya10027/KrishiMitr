// KrishiMitr Centralized Frontend API Client
// Standardized communication layer with backend REST API at http://localhost:4000/api/v1

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';

export const TOKEN_KEY = 'krishimitr_auth_token';
export const USER_KEY = 'krishimitr_user';

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredSession(token, user) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // LocalStorage quota or access error handled gracefully
  }
}

export function clearStoredSession() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    // Ignore
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export class ApiError extends Error {
  constructor(message, code = 'API_ERROR', status = 500, details = []) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  const token = getStoredToken();

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const timeoutMs = options.timeout || 10000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
      credentials: 'include' // Send cookies for refresh token rotation
    });

    clearTimeout(timeoutId);

    // If PDF or raw blob requested
    if (options.responseType === 'blob') {
      if (!response.ok) {
        throw new ApiError(`Download failed with status ${response.status}`, 'DOWNLOAD_FAILED', response.status);
      }
      return await response.blob();
    }

    // If CSV or raw text requested
    if (options.responseType === 'text') {
      if (!response.ok) {
        throw new ApiError(`Request failed with status ${response.status}`, 'REQUEST_FAILED', response.status);
      }
      return await response.text();
    }

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = json?.error?.message || json?.message || `Request failed with status ${response.status}`;
      const errorCode = json?.error?.code || 'HTTP_ERROR';
      const errorDetails = json?.error?.details || [];
      throw new ApiError(errorMsg, errorCode, response.status, errorDetails);
    }

    return json;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new ApiError('Request timed out. Please check your network connection.', 'TIMEOUT_ERROR', 408);
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || 'Network error occurred while contacting portal server.', 'NETWORK_ERROR', 503);
  }
}

export const apiClient = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  patch: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
  getBaseUrl: () => API_BASE_URL
};

export default apiClient;
