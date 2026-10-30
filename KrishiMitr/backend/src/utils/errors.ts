export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public details: unknown[];

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR', details: unknown[] = []) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details: unknown[] = []) {
    super(message, 404, 'NOT_FOUND', details);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Invalid input parameters', details: unknown[] = []) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required', details: unknown[] = []) {
    super(message, 401, 'UNAUTHORIZED', details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions to perform this action', details: unknown[] = []) {
    super(message, 403, 'FORBIDDEN', details);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource conflict or duplicate entry', details: unknown[] = []) {
    super(message, 409, 'CONFLICT', details);
  }
}
