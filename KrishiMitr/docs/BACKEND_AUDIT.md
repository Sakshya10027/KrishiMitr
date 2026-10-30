# KrishiMitr — Complete Backend Audit & Architectural Review

**Document Version:** 1.0.0  
**Audit Date:** October 2026  
**Auditor:** Senior Full-Stack Software Engineer & Backend Architect  
**Project:** Educational & Technical Recreation of the Indian Soil Health Card Portal ([https://soilhealth.dac.gov.in](https://soilhealth.dac.gov.in))  
**Repository:** [https://github.com/Sakshya10027/KrishiMitr](https://github.com/Sakshya10027/KrishiMitr)

---

## 1. Executive Summary

A comprehensive, ground-up audit of the KrishiMitr codebase was performed across all routes, components, services, context providers, and data structures. KrishiMitr features an authentic, bilingual (English & Hindi) government-portal UI mirroring the official Ministry of Agriculture & Farmers Welfare (DA&FW) design system.

However, all backend functionalities currently rely on client-side simulation, in-memory arrays (`MOCK_FARMERS`, `STATES_AND_DISTRICTS`), local storage, hardcoded timers, or simulated responses. This document identifies all features, their frontend implementation files, current behavior, required backend APIs, and the target implementation status.

---

## 2. Comprehensive Feature Audit Table

| Feature | Existing Frontend File | Current Behavior | Required API | Implementation Status |
| :--- | :--- | :--- | :--- | :--- |
| **User Authentication (Admin/Official)** | `src/pages/AdminLoginPage.jsx` | `handleLogin` uses simulated `setTimeout` redirecting to `/dashboard` with hardcoded credentials (`stl.analyst.ldh@punjab.gov.in`). No real authentication, JWT, or session validation. | `POST /api/v1/auth/login` | **Pending Backend** |
| **Session Verification & Refresh** | `src/pages/AdminLoginPage.jsx`, `src/App.jsx` | No persistent token/cookie verification. Refreshing page drops user state. | `GET /api/v1/auth/me`<br>`POST /api/v1/auth/refresh` | **Pending Backend** |
| **User Logout** | `src/components/common/Header.jsx` | No server session revocation or cookie clearing. | `POST /api/v1/auth/logout` | **Pending Backend** |
| **Password Recovery** | `src/pages/ForgotPasswordPage.jsx` | Hardcoded OTP simulation; accepts any input and displays fake success alert. | `POST /api/v1/auth/forgot-password`<br>`POST /api/v1/auth/reset-password` | **Pending Backend** |
| **Official User Registration** | `src/pages/UserRegistrationPage.jsx` | Captures form data (role, state, district, email) and sets local `submitted=true`. No database persistence. | `POST /api/v1/auth/register` (official role validation) | **Pending Backend** |
| **Student RAWE Registration** | `src/pages/RAWERegistrationPage.jsx` | Captures university, course, roll number; local boolean submission flag. Data lost on reload. | `POST /api/v1/auth/register-rawe` | **Pending Backend** |
| **Soil Health Card Search (Phone)** | `src/components/shc/SoilHealthCardSearch.jsx`, `src/services/soilHealthService.js` | Searches static `MOCK_FARMERS` array or runs `generateDynamicRecord` on client side. No database queries. | `POST /api/v1/soil-health-cards/search` | **Pending Backend** |
| **Soil Health Card Search (Geographic)** | `src/components/shc/SoilHealthCardSearch.jsx` | Cascades through local `STATES_AND_DISTRICTS`. Filters in-memory mock records. | `POST /api/v1/soil-health-cards/search`<br>`GET /api/v1/locations/states`<br>`GET /api/v1/locations/districts` | **Pending Backend** |
| **12-Parameter Test Results** | `src/components/shc/SoilHealthCardView.jsx` | Renders client-stored 12 parameters (pH, EC, OC, N, P, K, S, Zn, Fe, Cu, Mn, B). | `GET /api/v1/soil-health-cards/:id` | **Pending Backend** |
| **Printable SHC PDF Generation** | `src/components/shc/SoilHealthCardView.jsx` | Uses browser `window.print()` with `@media print` CSS. No server-side certified PDF generation. | `GET /api/v1/soil-health-cards/:id/pdf` | **Pending Backend** |
| **ICAR-STCR Fertilizer Engine** | `src/services/soilHealthService.js` | Hardcoded fertilizer doses attached statically per mock farmer record. No dynamic mathematical model. | `POST /api/v1/fertilizer/recommendations` | **Pending Backend** |
| **Soil Testing Labs Directory** | `src/pages/SoilTestingLabsPage.jsx`, `src/services/labService.js` | Filters static client list of ~50 curated laboratories across states. | `GET /api/v1/labs`<br>`GET /api/v1/labs/:id` | **Pending Backend** |
| **Geographic Hierarchy (Locations)** | `src/services/labService.js` | Object `STATES_AND_DISTRICTS` containing 36 States/UTs hardcoded in JS bundle. | `GET /api/v1/locations/states`<br>`GET /api/v1/locations/districts`<br>`GET /api/v1/locations/sub-districts` | **Pending Backend** |
| **Nearby Labs Search (Geo)** | `src/pages/SoilTestingLabsPage.jsx` | Browser `navigator.geolocation` mocked; fails to query database coordinates. | `GET /api/v1/labs/nearby?lat=&lng=&radius=` | **Pending Backend** |
| **Legacy Dashboard Metrics** | `src/pages/LegacyDashboardPage.jsx`, `src/services/statsService.js` | Hardcoded strings in `CYCLE_SUMMARY` and `STATE_PROGRESS`. | `GET /api/v1/analytics/overview`<br>`GET /api/v1/analytics/states`<br>`GET /api/v1/analytics/cycles` | **Pending Backend** |
| **Dashboard CSV Export** | `src/pages/LegacyDashboardPage.jsx` | Client-side `data:text/csv` URI encoding of hardcoded records. | `GET /api/v1/analytics/exports/csv` | **Pending Backend** |
| **School Soil Program Dashboard** | `src/pages/SchoolDashboardPage.jsx`, `src/services/statsService.js` | Fixed numbers in `SCHOOL_DASHBOARD_METRICS` (130 schools, 51,628 students). | `GET /api/v1/analytics/schools` | **Pending Backend** |
| **National Nutrient Maps (Cycle II)** | `src/pages/NutrientMapPage.jsx`, `src/components/maps/IndiaNutrientMap.jsx`, `src/services/districtNutrientService.js` | Client-side state dictionary and Voronoi block generator with deterministic hash. | `GET /api/v1/nutrient-maps/states`<br>`GET /api/v1/nutrient-maps/districts`<br>`GET /api/v1/nutrient-maps/summary` | **Pending Backend** |
| **Resources & SOP Library** | `src/pages/GeneralResourcesPage.jsx`, `src/services/resourceService.js` | Static array `CIRCULARS_AND_GUIDELINES` with `#` download links. | `GET /api/v1/resources`<br>`GET /api/v1/resources/:id/download` | **Pending Backend** |
| **School Library Materials** | `src/pages/SchoolLibraryPage.jsx` | Static cards with dummy download anchors. | `GET /api/v1/resources?category=school` | **Pending Backend** |
| **Support Ticket Creation** | `src/pages/SupportPage.jsx` | Generates random `TKT-XXXXXX` string on client; not saved in any database. | `POST /api/v1/support/tickets` | **Pending Backend** |
| **Support Ticket Tracking** | `src/pages/SupportPage.jsx` | No ticket retrieval or status checking mechanism exists. | `GET /api/v1/support/tickets/:id` | **Pending Backend** |
| **Bharti AI Kisan Assistant** | `src/components/common/BhartiAIWidget.jsx` | Keyword matching rules (`if (lower.includes('download'))`) on client. No real LLM or provider integration. | `POST /api/v1/assistant/chat`<br>`GET /api/v1/assistant/conversations/:id` | **Pending Backend** |
| **Administrative Portals** | `src/pages/AdminLoginPage.jsx` | Simple redirect to public dashboard. No privileged management actions, role guards, or audit logging. | `GET /api/v1/admin/users`<br>`GET /api/v1/admin/audit-logs`<br>`POST /api/v1/admin/labs` | **Pending Backend** |

---

## 3. Technology Stack & Compatibility Evaluation

1. **Runtime:** Node.js (v24.17.0 detected) + Express.js.
2. **Language:** TypeScript 5.x for robust typing, compile-time safety, and modular imports.
3. **ORM & Database:** Prisma ORM with PostgreSQL.
4. **Validation:** Zod schemas applied to every incoming HTTP request payload.
5. **Security Suite:**
   - `helmet` for HTTP security headers
   - `cors` with strict origin allowlisting (`http://localhost:5173`)
   - `argon2` / `bcryptjs` for secure salted password hashing
   - `jsonwebtoken` for short-lived access tokens and refresh tokens
   - `express-rate-limit` for DDoS and brute-force mitigation on auth and search endpoints
6. **Logging:** `pino` + `pino-http` for structured JSON logging.
7. **Document Generation:** `pdfkit` / `pdfmake` for server-side generation of authentic Soil Health Cards in vector PDF.
8. **Testing:** `vitest` + `supertest` for comprehensive unit and integration test coverage.
