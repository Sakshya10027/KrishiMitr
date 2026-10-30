# KrishiMitr — REST API Specification (v1)

**Base URL:** `http://localhost:4000/api/v1`  
**Response Envelope Standards:**
- **Success:** `{ "success": true, "data": <any>, "message": "<string>" }`
- **Paginated:** `{ "success": true, "data": [...], "pagination": { "page": 1, "limit": 20, "total": 100, "totalPages": 5 } }`
- **Error:** `{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "<string>", "details": [] } }`

---

## 1. Authentication & User Management

### `POST /auth/register`
- **Description:** Registers a new farmer or official user with role assignment restrictions.
- **Request Body:**
  ```json
  {
    "fullName": "Dr. Rajesh Sharma",
    "email": "officer@gov.in",
    "phone": "9876543210",
    "password": "SecurePassword123!",
    "role": "DISTRICT_ADMIN",
    "stateId": "st-punjab",
    "districtId": "dist-ludhiana"
  }
  ```
- **Response (201):** User object without password hash + initial JWT access token.

### `POST /auth/login`
- **Description:** Authenticates user via email/phone + password; returns access token and sets secure refresh cookie.
- **Request Body:** `{ "identifier": "officer@gov.in", "password": "SecurePassword123!" }`
- **Response (200):** `{ "token": "...", "user": { "id": "...", "fullName": "...", "role": "..." } }`

### `POST /auth/refresh`
- **Description:** Rotates JWT tokens using secure cookie.
- **Response (200):** New access token.

### `GET /auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):** Current authenticated user profile with assigned state/district scope.

### `POST /auth/logout`
- **Description:** Invalidates active session and clears refresh token cookie.
- **Response (200):** `{ "message": "Logged out successfully" }`

---

## 2. Locations Hierarchy

### `GET /locations/states`
- **Response (200):** List of all 36 States and Union Territories with standard codes.

### `GET /locations/districts?stateId=<id>`
- **Response (200):** Districts strictly belonging to the specified state.

### `GET /locations/sub-districts?districtId=<id>`
- **Response (200):** Blocks / Tehsils under the specified district.

---

## 3. Soil Health Cards & Tests

### `POST /soil-health-cards/search`
- **Request Body (Phone Mode):** `{ "queryType": "phone", "phone": "9876543210" }`
- **Request Body (Geo Mode):** `{ "queryType": "geo", "stateId": "...", "districtId": "...", "farmerName": "..." }`
- **Response (200):** Matching Soil Health Cards with 12 parameter tests and STCR crop advisories.

### `GET /soil-health-cards/:id`
- **Response (200):** Full card details, sample collection dates, analyst name, and laboratory details.

### `GET /soil-health-cards/:id/pdf`
- **Description:** Streams certified, high-resolution vector PDF of the Soil Health Card.
- **Headers:** `Content-Type: application/pdf`, `Content-Disposition: inline; filename="SHC-XXXX.pdf"`

### `POST /soil-health-cards`
- **Headers:** `Authorization: Bearer <token>` (Admin/Lab Operator only)
- **Request Body:** Farmer info, land coordinates, sample collection info, 12 parameter values.
- **Response (201):** Created Soil Health Card with assigned unique card number.

---

## 4. Fertilizer Recommendation Engine

### `POST /fertilizer/recommendations`
- **Request Body:**
  ```json
  {
    "crop": "wheat",
    "area": { "value": 2.5, "unit": "hectare" },
    "soilTest": {
      "ph": 7.4,
      "organicCarbon": 0.42,
      "nitrogen": 210,
      "phosphorus": 16.5,
      "potassium": 295,
      "zinc": 0.52,
      "sulphur": 8.5
    }
  }
  ```
- **Response (200):**
  ```json
  {
    "crop": "wheat",
    "targetYield": "55 q/ha",
    "fertilizerDoses": [
      { "fertilizer": "Urea", "basal": 65, "topDressing1": 65, "topDressing2": 30, "totalKg": 160 },
      { "fertilizer": "DAP", "basal": 55, "topDressing1": 0, "topDressing2": 0, "totalKg": 55 },
      { "fertilizer": "MOP", "basal": 0, "topDressing1": 0, "topDressing2": 0, "totalKg": 0 },
      { "fertilizer": "Zinc Sulphate (21%)", "basal": 25, "topDressing1": 0, "topDressing2": 0, "totalKg": 25 }
    ],
    "organicAdvisory": "Incorporate 10 tonnes/ha Farm Yard Manure (FYM) before sowing.",
    "formulaVersion": "ICAR-STCR-2024-v2.1"
  }
  ```

---

## 5. Soil Testing Laboratories

### `GET /labs`
- **Query Params:** `stateId`, `districtId`, `type`, `search`, `page`, `limit`
- **Response (200):** Paginated directory of accredited soil testing laboratories.

### `GET /labs/nearby`
- **Query Params:** `lat`, `lng`, `radiusKm` (default 50)
- **Response (200):** Laboratories sorted by Haversine distance with km metrics.

---

## 6. Analytics & Reports

### `GET /analytics/overview`
- **Response (200):** National sample collection, testing, printing, and card dispatch totals.

### `GET /analytics/states`
- **Response (200):** State-wise breakdown of targets vs. achievements.

### `GET /analytics/exports/csv?cycle=cycle2`
- **Response (200):** Sanitized CSV download with secure HTTP headers.

---

## 7. Resources & Documents

### `GET /resources`
- **Query Params:** `category` (`SOP`, `CIRCULAR`, `SCHOOL`, `COMPLIANCE`), `language`, `search`
- **Response (200):** List of official guidelines, circulars, and manuals.

### `GET /resources/:id/download`
- **Response (200):** Safe file download or validated external reference redirect.

---

## 8. Support Desk

### `POST /support/tickets`
- **Request Body:** `{ "farmerName": "Kisan", "phone": "9876543210", "category": "SHC Not Received", "description": "..." }`
- **Response (201):** Created ticket with tracked reference `TKT-XXXXXX`.

### `GET /support/tickets/:id`
- **Response (200):** Ticket details, status, and communication history.

---

## 9. Bharti AI Assistant

### `POST /assistant/chat`
- **Request Body:** `{ "message": "What does low organic carbon mean?", "conversationId": "..." }`
- **Response (200):**
  ```json
  {
    "conversationId": "conv-10291",
    "reply": "Organic Carbon below 0.5% indicates low soil biological activity...",
    "sourceReferences": ["ICAR-IISS Soil Management Bulletin 2024"],
    "provider": "anthropic/gemini/fallback-rules"
  }
  ```

---

## 10. System Health

### `GET /health`
- **Response (200):** `{ "status": "UP", "timestamp": "...", "database": "CONNECTED", "version": "1.0.0" }`
