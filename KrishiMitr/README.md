<div align="center">

# KrishiMitr

An independent, full-stack educational recreation of the Government of India's Soil Health Card Portal — scientific fertilizer recommendations, a national lab directory, GIS nutrient maps, and a multilingual AI farming assistant.

![React](https://img.shields.io/badge/REACT-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/NODE.JS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/POSTGRESQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/STATUS-EDUCATIONAL_DEMO-007EC6?style=for-the-badge&labelColor=555555)

<br />

[Live Demo](#) · [Documentation](#overview) · [Report Bug](#) · [Request Feature](#)

</div>

**Current Version:** 1.0.0
**Project Status:** Development / Educational Demonstration

> **Notice:** This is an academic and technical demonstration project and is **NOT** an official Government of India service.

---

## Overview

**What the project does:**
KrishiMitr faithfully recreates the Ministry of Agriculture and Farmers Welfare's Soil Health Card (SHC) Portal — modeling citizen services, a scientific fertilizer calculation engine, a national soil-testing laboratory directory, GIS nutrient maps, macro analytics, and multilingual access for Indian farmers.

**Why it was built & Problem it solves:**
Public agricultural data portals are often hard to extend, demo, or study as engineering systems. KrishiMitr rebuilds the Soil Health Card Portal end-to-end as a modern, open full-stack application — demonstrating how government-scale citizen services, scientific recommendation engines, and multilingual AI assistance can be implemented with a production-grade architecture.

**Target users:**
Students and developers studying full-stack government service design, and (within the demo) farmers, lab administrators, and citizen-support evaluators exploring the simulated portal.

**Key capabilities:**
- Bharti AI — a Groq-powered conversational assistant with 11-language voice playback for low-literacy accessibility.
- ICAR-STCR scientific fertilizer recommendation engine converting nutrient deficits into commercial fertilizer dosages.
- Pan-India soil testing laboratory directory covering 28 states, 8 UTs, 750+ districts, 3,850+ labs, and 1,240+ mobile vans.
- Interactive GIS nutrient maps with 12 toggleable nutrient layers down to the district level.

---

## Features

### Bharti AI — Intelligent Kisan Assistant
- **High-Speed Cloud LLM Reasoning:** Powered by Groq Cloud API (`llama-3.3-70b-versatile` / `openai/gpt-oss-120b`) for agriculture-tailored conversational intelligence.
- **Multilingual Voice Playback (TTS):** Narration in 11 Indian languages — Hindi, Marathi, Gujarati, Telugu, Tamil, Bengali, Punjabi, Kannada, Malayalam, Odia, and Indian English.
- **Speech Synthesis Proxy:** Custom Vite dev middleware (`/api/tts`) proxies TTS audio streams without CORS restrictions, with Web Speech API fallback.
- **On-the-Fly Script Translation:** `/api/translate` keeps spoken and written answers matched to the farmer's active regional script (Devanagari, Gurmukhi, Telugu, etc.).
- **Accessibility Controls:** In-widget voice language selector, Auto-Read mode, animated speaking indicators, and localized quick-prompt chips.
- **Three-Tier Resilience Engine:** Enterprise backend endpoint → direct browser-side Groq fallback → fully offline ICAR/DA&FW rule-based knowledge engine.

### Soil Health Card Search & Certified PDF Generation
- **Dual Search Modalities:** Direct 10-digit mobile lookup, or cascading State → District → Sub-District → Village → Farmer Name search.
- **Interactive Security:** Built-in reCAPTCHA verification.
- **12-Parameter Lab Scorecard:** pH, EC, Organic Carbon, N/P₂O₅/K₂O, Sulphur, and Zn/Fe/Cu/Mn/B micronutrients.
- **Server-Side Certified PDF Export:** `pdfkit`-based streaming generator producing bilingual Soil Health Cards with emblem branding and fertilizer schedules.
- **Client-Side Print Layout:** Dedicated `@media print` styling for instant browser printing.

### ICAR-STCR Precision Fertilizer Recommendation Engine
- **Scientific STCR Equations:** Implements ICAR's Soil Test Crop Response methodology instead of blanket recommendations.
- **Precision Crop Calculations:** Site-specific equations for Wheat, Paddy, Mustard, Sugarcane, Maize, Cotton, and Pulses.
- **Commercial Fertilizer Conversion:** Converts elemental nutrient deficits into Urea, DAP, MOP, and SSP bag quantities.
- **Application Schedule Breakdown:** Splits recommendations into Basal and Top-Dressing applications.
- **Organic Amendment Adjustments:** Accounts for FYM, vermicompost, and green manuring.

### Pan-India Soil Testing Laboratories Directory
- **National Coverage:** 28 states, 8 UTs, 750+ districts, 3,850+ static labs, 1,240+ mobile vans.
- **Four Lab Categories:** DSTL, ICAR-KVK Laboratory, Mobile Soil Testing Laboratory (MSTL), and Agricultural University/Central Institutes.
- **Interactive Filtering & Actions:** Cascading State/District dropdowns, type filter pills, direct call/email links, Google Maps directions, and proximity-based nearby-lab lookup.

### Interactive GIS Soil Nutrient Maps
- **National SVG Map:** Interactive map of all 36 states/UTs with toggleable nutrient layers.
- **District-Level Explorer:** Drill into any state's constituent districts.
- **12 Nutrient Layer Overlays:** N, P, K, Organic Carbon, pH, EC, Zn, S, Fe, Cu, Mn, B.
- **Export & Comparison:** Switch between District Cards and Tabular views with live CSV export.

### Macro Analytics & School Soil Health Program
- **National Progress Dashboard:** Cycle I (2015–17) vs Cycle II (2017–19) comparisons with CSV export.
- **School Soil Health Program:** Tracks 130 schools, 42 states/UTs, 51,628 students, and 22,771 samples.

### Multi-Role Administrative Portal & RBAC
- **7 User Roles:** `CENTER_ADMIN`, `STATE_ADMIN`, `DISTRICT_ADMIN`, `LAB_ADMIN`, `RAWE_STUDENT`, `FARMER`, `PUBLIC_USER`.
- **Secure Authentication:** JWT access/refresh rotation, HTTP-only cookies, bcrypt hashing, rate limiting.
- **Administrative Workflows:** Login, citizen registration, RAWE student registration, password recovery, audit logging.

### Citizen Support & Grievance Redressal
- **Ticket Submission:** Automated reference codes (e.g., `SHC-2026-XXXX`).
- **Live Tracking:** PENDING / IN_PROGRESS / RESOLVED / CLOSED status with resolution comments.
- **FAQ Accordions:** Soil sampling, lab fees, and fertilizer schedules.

### National Mission on Natural Farming & Library Hubs
- **NMNF Knowledge Center:** SOPs for Jeevamrit, Beejamrit, Acchadana, and Whapasa.
- **Resource Libraries:** Official circulars, SOPs, school science guides, and a media gallery.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI library |
| Vite 8 | Build tool and dev server, with custom TTS/translation proxy middleware |
| React Router v7 | Client-side routing |
| Lucide React | Icon set |
| Vanilla CSS (Design Tokens) | `tokens.css`, `portal.css`, CSS Grid/Flexbox, `@media print` |
| Oxlint | Linting |
| Context-based i18n | Multilingual localization + Google Translate API + Web Speech API |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js 18+ / Express 4 | API server runtime and framework |
| TypeScript 5 (via `tsx`) | Backend language |
| PostgreSQL 16 + Prisma ORM | Relational database and ORM |
| Helmet, CORS, express-rate-limit, cookie-parser, bcryptjs | Security middleware |
| JSON Web Token | Access/refresh token authentication |
| Zod | Schema validation |
| PDFKit | Certified vector PDF generation |
| Pino / Pino-HTTP | Structured logging |
| Vitest / Supertest | Testing |

### AI & Speech Infrastructure
| Feature | Implementation |
|---------|-----------------|
| Cloud LLM Provider | Groq Cloud API (`llama-3.3-70b-versatile`, `openai/gpt-oss-120b`) |
| Text-to-Speech | Google Translate TTS proxy (`/api/tts`) + Web Speech API fallback |
| Speech Translation | Dynamic script translator (`/api/translate`) |
| Offline Fallback | Localized ICAR-IISS-modeled agronomic rule engine |

---

## Project Architecture

The application is a **monorepo** with a React/Vite frontend and a Node/Express/TypeScript backend, backed by PostgreSQL via Prisma.

```mermaid
graph TD
    Client[React 19 / Vite 8 Frontend] -->|REST API /api/v1| API[Express + TypeScript Backend]
    Client -->|/api/tts, /api/translate| ViteProxy[Vite Dev Middleware]

    API --> AuthModule[Auth Module - JWT]
    API --> SHCModule[Soil Health Cards Module]
    API --> FertModule[Fertilizer Module - ICAR-STCR]
    API --> LabsModule[Laboratories Module]
    API --> MapsModule[Nutrient Maps Module]
    API --> AnalyticsModule[Analytics Module]
    API --> AssistantModule[Bharti AI Assistant Module]
    API --> SupportModule[Support Module]
    API --> AdminModule[Admin Module]

    AuthModule --> DB[(PostgreSQL via Prisma)]
    SHCModule --> DB
    FertModule --> DB
    LabsModule --> DB
    MapsModule --> DB
    AnalyticsModule --> DB
    SupportModule --> DB
    AdminModule --> DB

    AssistantModule --> Groq[Groq Cloud LLM]
    AssistantModule -->|Offline Fallback| RuleEngine[ICAR/DA&FW Rule Engine]
    SHCModule --> PDFService[PDFKit Certified PDF Generator]
```

- **Client:** React 19 SPA with context-based i18n, built-in offline-resilient mock fallbacks, and a dedicated TTS/translation proxy for Bharti AI.
- **Server:** Modular Express + TypeScript backend organized by domain (auth, SHC, fertilizer, labs, maps, analytics, assistant, support, admin), all persisted through Prisma to PostgreSQL.

---

## Folder Structure

```
KrishiMitr/
├── frontend/                       # React 19 + Vite 8 Frontend Application
│   ├── public/                     # Favicons and SVG sprite icons
│   ├── src/
│   │   ├── assets/                 # Emblems, national logos, banner graphics
│   │   ├── components/
│   │   │   ├── common/             # Header, Footer, BhartiAIWidget, NavDrawer, Breadcrumbs
│   │   │   ├── dashboard/          # Metric counters, state tables, charts
│   │   │   ├── labs/               # Laboratory directory cards, filter pills, ribbons
│   │   │   ├── maps/               # Interactive India GIS SVG nutrient maps
│   │   │   └── shc/                # SHC search forms, 12-parameter scorecards, print views
│   │   ├── context/                # LanguageContext.jsx (multilingual i18n state)
│   │   ├── i18n/                   # Static dictionary & page-level translation mappings
│   │   ├── pages/                  # All 18 public and administrative pages
│   │   ├── services/                # apiClient.js, lab/soil-health/stats services
│   │   ├── styles/                  # tokens.css, portal.css, App.css
│   │   ├── App.jsx                   # App routes and layout configuration
│   │   └── main.jsx                   # React root entry point
│   ├── index.html                     # Root HTML template with government meta tags
│   ├── package.json                   # Frontend dependencies and scripts
│   └── vite.config.js                  # Vite config with /api/tts & /api/translate proxies
│
├── backend/                         # Node.js + Express + TypeScript Backend
│   ├── prisma/
│   │   ├── schema.prisma             # Complete relational database schema (PostgreSQL)
│   │   └── seed.ts                    # DB seeder (36 states/UTs, 750+ districts, labs, crops)
│   ├── src/
│   │   ├── config/                    # Database (Prisma), env (Zod), CORS configuration
│   │   ├── middleware/                # authenticate, authorize, errorHandler, rateLimiter
│   │   ├── modules/
│   │   │   ├── admin/                 # Audit logs and user administration
│   │   │   ├── analytics/             # Cycle I/II comparisons and school metrics
│   │   │   ├── assistant/             # Bharti AI Groq integration & domain fallback
│   │   │   ├── auth/                  # Login, registration, RAWE onboarding, password recovery
│   │   │   ├── fertilizer/            # ICAR-STCR calculation equations & dosing
│   │   │   ├── laboratories/          # Lab directory and geolocation nearby endpoints
│   │   │   ├── locations/             # Cascading States, Districts, Sub-districts, Villages
│   │   │   ├── nutrient-maps/         # State & district GIS fertility statistics
│   │   │   ├── resources/             # SOPs, circulars, media catalog
│   │   │   ├── soil-health-cards/     # SHC lookup, 12-parameter evaluation, PDF generator
│   │   │   └── support/               # Citizen grievance ticket creation and tracking
│   │   ├── services/
│   │   │   ├── csv/                   # Live sanitized CSV exporter
│   │   │   └── pdf/                    # Certified SHC vector PDF generator (PDFKit)
│   │   ├── tests/                      # Vitest API and fertilizer algorithm test suites
│   │   ├── utils/                       # Standard API responses, error classes, pagination
│   │   ├── app.ts                        # Express application setup
│   │   └── server.ts                      # Server bootstrap and port listener
│   ├── package.json                       # Backend dependencies and scripts
│   └── tsconfig.json                       # TypeScript compiler options
│
├── docs/                             # Architectural audit, API specs, feature status
├── docker-compose.yml                 # PostgreSQL 16 container definition
├── package.json                        # Workspace root orchestration scripts
└── README.md                            # Project documentation
```

---

## Folder Explanation

| Folder | Purpose |
|--------|---------|
| `frontend/src/components` | UI building blocks grouped by domain: common, dashboard, labs, maps, shc. |
| `frontend/src/context` | Multilingual i18n state via `LanguageContext.jsx`. |
| `frontend/src/pages` | All 18 public and administrative route-level pages. |
| `frontend/src/services` | Centralized API client and domain-specific service wrappers. |
| `backend/prisma` | Database schema definition and the national data seeder. |
| `backend/src/modules` | Domain-separated business logic — auth, SHC, fertilizer, labs, maps, analytics, assistant, support, admin. |
| `backend/src/services` | Cross-cutting services: CSV export and PDF generation. |
| `backend/src/middleware` | Authentication, authorization, error handling, and rate limiting. |
| `docs/` | Architectural audits, API specs, and feature status tracking. |

---

## File Explanation

- **`backend/src/app.ts`**: Express application setup — middleware registration and route mounting.
- **`backend/src/server.ts`**: Server bootstrap and port listener.
- **`backend/prisma/schema.prisma`**: Full relational schema for users, soil health cards, laboratories, locations, and support tickets.
- **`backend/prisma/seed.ts`**: Seeds the database with 36 states/UTs, 750+ districts, laboratories, test cards, crops, and demo admin accounts.
- **`backend/src/services/pdf/`**: PDFKit-based certified bilingual Soil Health Card generator.
- **`frontend/src/App.jsx`**: Route and layout configuration for all 18 pages.
- **`frontend/src/context/LanguageContext.jsx`**: Multilingual state used by Bharti AI and page-level translations.
- **`frontend/vite.config.js`**: Configures the `/api/tts` and `/api/translate` dev proxy middleware.

---

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Docker**: Optional, for running PostgreSQL locally

---

## Installation Guide

**1. Clone repository**
```bash
git clone <your-repo-url>
cd KrishiMitr
```

**2. Install Frontend Dependencies**
```bash
npm install --prefix frontend
```

**3. Install Backend Dependencies**
```bash
npm install --prefix backend
```

---

## Environment Variables

### Frontend (`frontend/.env`)
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_BASE_URL` | Yes | Backend API base URL | `http://localhost:4000/api/v1` |
| `VITE_GROQ_API_KEY` | No | Groq Cloud API key for direct client-side AI fallback | `your_groq_api_key_here` |
| `VITE_GROQ_MODEL` | No | Groq model identifier | `openai/gpt-oss-120b` |

### Backend (`backend/.env`)
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | No | Server port | `4000` |
| `NODE_ENV` | No | Environment mode | `development` |
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/krishimitr?schema=public` |
| `JWT_SECRET` | Yes | Access token signing secret | `super-secret-jwt-key-for-krishimitr-portal-2026` |
| `JWT_REFRESH_SECRET` | Yes | Refresh token signing secret | `super-secret-refresh-key-for-krishimitr-portal-2026` |
| `CORS_ORIGIN` | Yes | Allowed frontend origins (comma-separated) | `http://localhost:5173,http://localhost:3000` |
| `AI_PROVIDER` | Yes | AI provider identifier | `groq` |
| `AI_API_KEY` | Yes | Groq Cloud API key | `your_groq_api_key_here` |
| `AI_BASE_URL` | Yes | Groq API base URL | `https://api.groq.com/openai/v1` |
| `AI_MODEL` | Yes | Groq model identifier | `openai/gpt-oss-120b` |

---

## Running the Project

**Database Setup (PostgreSQL & Prisma)**
```bash
# 1. Start PostgreSQL via Docker (optional)
docker-compose up -d postgres

# 2. Generate Prisma Client & run migrations
cd backend
npm run prisma:generate
npm run prisma:migrate

# 3. Seed baseline national data
npm run prisma:seed
```
Seeding populates 36 states/UTs, 750+ districts, accredited laboratories, test cards, crop recommendations, and demo administrative accounts.

**Development Mode — Option A: Full Stack**
```bash
# Terminal 1: Backend
npm run dev:backend

# Terminal 2: Frontend
npm run dev:frontend
```

**Development Mode — Option B: Frontend Only (Offline-Resilient)**
The frontend automatically falls back to built-in datasets for labs, test cards, nutrient maps, and Bharti AI if the backend isn't running:
```bash
npm run dev
# or
npm run dev:frontend
```

**Access Points**
- Frontend Portal: `http://localhost:5173`
- Backend API: `http://localhost:4000/api/v1`
- Backend Health Check: `http://localhost:4000/api/v1/health`

---

## Application Workflow

**Bharti AI Three-Tier Resilience Flow**
```mermaid
sequenceDiagram
    Client->>Backend: POST /api/v1/assistant/chat
    alt Backend reachable
        Backend->>Groq: Forward query to Groq Cloud LLM
        Groq-->>Backend: AI response
        Backend-->>Client: Response + optional TTS trigger
    else Backend unreachable
        Client->>Groq: Direct browser-side Groq API call
        alt Groq reachable
            Groq-->>Client: AI response
        else Groq unreachable
            Client->>Client: ICAR/DA&FW offline rule engine
        end
    end
    Client->>TTSProxy: /api/tts (voice playback)
    TTSProxy-->>Client: Audio stream in selected language
```

**Soil Health Card Search & PDF Flow**
1. Citizen searches by mobile number or cascading State → District → Sub-District → Village → Farmer Name.
2. reCAPTCHA verification is completed.
3. Backend returns the 12-parameter lab scorecard with rating pills.
4. The ICAR-STCR engine computes tailored Basal/Top-Dressing fertilizer recommendations.
5. User downloads the server-generated certified bilingual PDF (PDFKit) or uses the browser print layout.

---

## API Documentation

The backend exposes a structured, RESTful API versioned under `/api/v1`.

| Module | Method | Endpoint | Description | Access |
|--------|--------|----------|-------------|--------|
| System | GET | `/health` | Server status and database readiness check | Public |
| Auth | POST | `/auth/login` | Administrative & citizen login (returns JWT) | Public |
| Auth | POST | `/auth/register` | Citizen user registration | Public |
| Auth | POST | `/auth/register-rawe` | RAWE student registration | Public |
| Auth | POST | `/auth/forgot-password` | Password reset request | Public |
| Auth | GET | `/auth/me` | Fetch active user profile from JWT session | Authenticated |
| Soil Health Cards | POST | `/soil-health-cards/search` | Search cards by mobile or cascading geography | Public |
| Soil Health Cards | GET | `/soil-health-cards/:id` | Retrieve 12-parameter lab scorecard | Public |
| Soil Health Cards | GET | `/soil-health-cards/:id/pdf` | Download certified bilingual vector PDF card | Public |
| Fertilizer Engine | POST | `/fertilizer/recommendations` | Calculate ICAR-STCR precision crop dosages | Public |
| Laboratories | GET | `/labs` | Pan-India lab directory with state/district filters | Public |
| Laboratories | GET | `/labs/nearby` | Find nearest laboratories via lat/lng geolocation | Public |
| Nutrient Maps | GET | `/nutrient-maps/states` | State-level macro/micronutrient stats | Public |
| Nutrient Maps | GET | `/nutrient-maps/districts` | District-level fertility stats for a given state | Public |
| Analytics | GET | `/analytics/overview` | Cycle I vs Cycle II national progress comparison | Public |
| Analytics | GET | `/analytics/exports/csv` | Download national progress dataset as CSV | Public |
| Analytics | GET | `/analytics/schools` | School Soil Health Program participation metrics | Public |
| Support Desk | POST | `/support/tickets` | Submit citizen grievance ticket | Public |
| Support Desk | GET | `/support/tickets/:id` | Track grievance ticket status and updates | Public |
| Bharti AI | POST | `/assistant/chat` | Chat with Bharti AI (Groq LLM + domain fallback) | Public |
| Locations | GET | `/locations/states` | Cascading list of all 36 states & UTs | Public |
| Locations | GET | `/locations/districts` | Districts for a selected state | Public |
| Admin | GET | `/admin/audit-logs` | Security and administrative audit trail | Admin Only |

---

## Database

**Database Type:** Relational (PostgreSQL 16 via Prisma ORM)

**Key Entities:**
1. **User**: Citizens, farmers, and the 7 administrative roles (`CENTER_ADMIN` through `PUBLIC_USER`), with JWT-based credentials.
2. **SoilHealthCard**: 12-parameter lab scorecards linked to a farmer and location.
3. **Laboratory**: DSTL, KVK, MSTL, and university/central institute records with geolocation.
4. **Location**: Cascading State → District → Sub-District → Village hierarchy.
5. **SupportTicket**: Citizen grievance tickets with status tracking.

```mermaid
erDiagram
    USER ||--o{ SOIL_HEALTH_CARD : owns
    USER ||--o{ SUPPORT_TICKET : files
    LOCATION ||--o{ SOIL_HEALTH_CARD : "located in"
    LOCATION ||--o{ LABORATORY : "located in"
    USER {
        string id
        string email
        string role
        string passwordHash
    }
    SOIL_HEALTH_CARD {
        string id
        string farmerName
        string mobileNumber
        json parameters
        string locationId
    }
    LABORATORY {
        string id
        string name
        string type
        float latitude
        float longitude
    }
    LOCATION {
        string id
        string state
        string district
        string subDistrict
        string village
    }
    SUPPORT_TICKET {
        string id
        string userId
        string referenceCode
        string status
    }
```

---

## Configuration

- **`vite.config.js`**: Configures the `/api/tts` and `/api/translate` dev proxy middleware for Bharti AI.
- **`prisma/schema.prisma`**: Defines the full relational schema; migrations managed via `npm run prisma:migrate`.
- **`docker-compose.yml`**: Defines the local PostgreSQL 16 container.
- **CORS**: Configured via `CORS_ORIGIN`, accepting a comma-separated list of allowed frontend origins.

---

## Build Instructions

**Frontend Production Build:**
```bash
cd frontend
npm run build
```

**Backend Build:**
```bash
cd backend
npm run build
```

---

## Deployment

**Backend Deployment**
1. Provision a PostgreSQL 16 instance and set `DATABASE_URL`.
2. Run `npm run prisma:generate` and `npm run prisma:migrate` against the production database.
3. Set production secrets (`JWT_SECRET`, `JWT_REFRESH_SECRET`, `AI_API_KEY`) and `CORS_ORIGIN` to the deployed frontend origin.
4. Start command: the compiled backend entry point (`server.ts` build output).

**Frontend Deployment**
1. Set `VITE_API_BASE_URL` to the deployed backend's `/api/v1` URL.
2. Build with `npm run build` and deploy the static output to a hosting platform (e.g., Vercel, Netlify).

---

## Testing

The backend includes automated integration and unit test suites written with **Vitest** and **Supertest**:
```bash
cd backend
npm test
```
The suite verifies:
- API health and readiness endpoints (`/health`).
- Location hierarchy cascading (`/locations/states`, `/locations/districts`).
- Soil Health Card lookup and parameter rating calculations.
- ICAR-STCR precision fertilizer equations and Urea/DAP/MOP bag conversions.
- Bharti AI domain knowledge fallback engine and conversation history.

---

## Logging

- Backend request/response logging via **Pino** and **Pino-HTTP**, structured for production observability.
- Administrative actions are recorded to an audit log, viewable at `/admin/audit-logs`.

---

## Error Handling

- **Validation:** Zod schemas validate all incoming request payloads across modules.
- **Centralized Error Middleware:** `errorHandler` middleware normalizes error responses across the API.
- **Rate Limiting:** `express-rate-limit` protects auth and public endpoints from abuse.
- **HTTP Errors:** Standard status codes returned via the `utils/` standardized API response helpers.

---

## Security

- **Authentication:** JWT access and refresh token rotation with HTTP-only cookie support.
- **Password Protection:** `bcryptjs` hashing for all stored credentials.
- **Security Headers:** Helmet middleware applied across the Express app.
- **RBAC:** 7 distinct roles enforced via `authorize` middleware, restricting admin-only endpoints such as `/admin/audit-logs`.
- **Rate Limiting:** Applied to sensitive endpoints to mitigate brute-force and abuse.

---

## Performance Optimizations

- **Offline-Resilient Frontend:** Built-in mock datasets let the frontend function fully even if the backend or AI provider is unreachable.
- **Three-Tier AI Resilience:** Falls back from enterprise backend → direct Groq call → offline rule engine, avoiding hard failures.
- **Server-Side PDF Streaming:** PDFKit streams certified PDFs rather than generating them fully in memory.
- **CSV Export Services:** Dedicated, sanitized CSV exporters for large analytics datasets.

---

## Troubleshooting

- **`Bharti AI not responding`**: Confirm `AI_API_KEY`/`VITE_GROQ_API_KEY` are set; if both fail, the app should still answer via the offline rule engine.
- **`Database connection failed`**: Verify `DATABASE_URL` and that the PostgreSQL container (`docker-compose up -d postgres`) is running.
- **`TTS audio not playing`**: Check that the Vite dev proxy (`/api/tts`) is reachable; the app falls back to the Web Speech API if the proxy fails.
- **`CORS errors in development`**: Ensure `CORS_ORIGIN` on the backend includes the exact frontend origin (e.g., `http://localhost:5173`).

---

## Available Scripts

| Command | Location | Purpose |
|---------|----------|---------|
| `npm run dev:frontend` | root | Start frontend dev server |
| `npm run dev:backend` | root | Start backend dev server |
| `npm run dev` | root | Start frontend in offline-resilient mode |
| `npm run build` | `frontend/` or `backend/` | Build for production |
| `npm run prisma:generate` | `backend/` | Generate Prisma client |
| `npm run prisma:migrate` | `backend/` | Run database migrations |
| `npm run prisma:seed` | `backend/` | Seed baseline national data |
| `npm test` | `backend/` | Run Vitest/Supertest test suite |

---

## Coding Standards

- **Formatting:** Oxlint for frontend linting; TypeScript strict typing on the backend.
- **Naming Conventions:** camelCase for variables/functions, PascalCase for React components and Prisma models.
- **Module Organization:** Backend logic strictly separated by domain under `src/modules/`.

---

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m "Add: amazing feature"`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Roadmap

- [ ] Expand ICAR-STCR crop coverage beyond the current seven major crops.
- [ ] Add offline-first PWA support for low-connectivity rural access.
- [ ] Extend Bharti AI with image-based soil/crop diagnosis.
- [ ] Add real-time lab appointment scheduling.

---

## Known Limitations

- **Simulated government data:** Laboratory, card, and analytics data are modeled/seeded for demonstration, not sourced from the live government portal.
- **AI responses depend on Groq Cloud availability** for the two higher tiers of the resilience engine; the offline tier is rule-based and limited in scope.
- **No production-grade load testing** has been performed on the national-scale dataset volumes described.

---

## License & Disclaimer

This project is an independent educational and technical reverse-engineering demonstration developed for academic and evaluation purposes. It is **not** affiliated with, endorsed by, or operated by the Ministry of Agriculture and Farmers Welfare, the Government of India, the Indian Council of Agricultural Research (ICAR), or Krishitantra. All trademarks, logos, and emblems belong to their respective government entities.

---

## Author

- **Author Name:** Sakshya Patel

---

## Acknowledgements

- AI reasoning powered by [Groq Cloud](https://groq.com/)
- Database ORM by [Prisma](https://www.prisma.io/)
- Certified PDF generation via [PDFKit](https://pdfkit.org/)
