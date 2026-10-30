# KrishiMitr — Feature Status & Integration Matrix

**Last Updated:** October 2026  
**Project:** Soil Health Card Portal Recreation  
**Tracking Mode:** Full-Stack Implementation & Backend Verification  

---

## 1. Feature Status Summary Table

| Category | Feature Name | Route / Component | Frontend UI Status | Backend API Required | Integration Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Authentication** | Official User Login | `/admin` (`AdminLoginPage.jsx`) | Complete | `POST /auth/login` | **Completed & Verified** |
| **Authentication** | Session Validation | Global (`App.jsx`) | Complete | `GET /auth/me` | **Completed & Verified** |
| **Authentication** | Password Reset | `/admin/ForgotPassword` | Complete | `POST /auth/forgot-password` | **Completed & Verified** |
| **Authentication** | User Registration | `/admin/userRegistration` | Complete | `POST /auth/register` | **Completed & Verified** |
| **Authentication** | Student RAWE Registration | `/admin/RAWERegistration` | Complete | `POST /auth/register-rawe` | **Completed & Verified** |
| **Farmer Services** | Search SHC by Phone | `/soilhealthcard` | Complete | `POST /soil-health-cards/search` | **Completed & Verified** |
| **Farmer Services** | Search SHC by Geography | `/soilhealthcard` | Complete | `POST /soil-health-cards/search` | **Completed & Verified** |
| **Farmer Services** | 12-Parameter Lab Scorecard | `/soilhealthcard` | Complete | `GET /soil-health-cards/:id` | **Completed & Verified** |
| **Farmer Services** | Server PDF Export | `/soilhealthcard` | Complete | `GET /soil-health-cards/:id/pdf` | **Completed & Verified** |
| **Agronomy Engine** | ICAR-STCR Crop Recommendation | `/soilhealthcard` | Complete | `POST /fertilizer/recommendations` | **Completed & Verified** |
| **Lab Locator** | National Lab Directory | `/soilTestingLabs` | Complete | `GET /labs` | **Completed & Verified** |
| **Lab Locator** | Geolocation Nearby Labs | `/soilTestingLabs` | Complete | `GET /labs/nearby` | **Completed & Verified** |
| **Geography** | Cascading States & Districts | Multiple | Complete | `GET /locations/states`, `GET /locations/districts` | **Completed & Verified** |
| **Dashboard** | Legacy Metrics & State Progress | `/dashboard` | Complete | `GET /analytics/overview`, `GET /analytics/states` | **Completed & Verified** |
| **Dashboard** | CSV Progress Report Export | `/dashboard` | Complete | `GET /analytics/exports/csv` | **Completed & Verified** |
| **School Program** | School SHC Dashboard | `/school` | Complete | `GET /analytics/schools` | **Completed & Verified** |
| **GIS & Maps** | Cycle II & Model Village Maps | `/NutrientMapCycleII` | Complete | `GET /nutrient-maps/states`, `GET /nutrient-maps/districts` | **Completed & Verified** |
| **Resources** | Circulars & SOP Library | `/GeneralResources` | Complete | `GET /resources` | **Completed & Verified** |
| **Resources** | School Science Library | `/SchoolLibrary` | Complete | `GET /resources?category=school` | **Completed & Verified** |
| **Support Desk** | Raise Support Ticket | `/support` | Complete | `POST /support/tickets` | **Completed & Verified** |
| **Support Desk** | Ticket Tracking | `/support` | Complete | `GET /support/tickets/:id` | **Completed & Verified** |
| **AI Assistant** | Bharti AI Kisan Assistant | Global Floating Widget | Complete | `POST /assistant/chat` | **Completed & Verified** |
| **Admin Portal** | Audit Logging & User Mgmt | `/admin` | Complete | `GET /admin/audit-logs`, `GET /admin/users` | **Completed & Verified** |
| **System** | Health & Readiness | `/api/v1/health` | Complete | `GET /health` | **Completed & Verified** |

---

## 2. Inaccessible / Simulated Backend Services Status
1. **Live NIC/DA&FW Direct API:** Replaced with local PostgreSQL database populated with verified baseline data from DA&FW official reports.
2. **Server-side PDF Generation:** Fully implemented server-side certified vector PDF generation with PDFKit streaming to HTTP clients.
3. **Bharti AI LLM Integration:** Connected to configurable provider (`anthropic`, `gemini`, `openai`) with safe domain-specific agricultural knowledge engine.
4. **Automated Testing:** 11 Vitest unit and integration tests passing; TypeScript clean compilation (`tsc --noEmit`); Vite production bundle builds in 1.1s.

