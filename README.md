# KrishiMitr — Soil Health Card Portal Recreation

> **Educational & Technical Demonstration Project**  
> An independent, full-stack, and functional reverse-engineered recreation of the Government of India's Soil Health Card Portal ([https://soilhealth.dac.gov.in](https://soilhealth.dac.gov.in)).  
> *Notice: This is an academic and technical demonstration and is NOT an official Government of India service.*

---

## 1. Project Overview

**KrishiMitr** is a comprehensive, production-grade full-stack web application faithfully recreating the Ministry of Agriculture and Farmers Welfare's **Soil Health Card (SHC) Portal**. The project models public citizen services, official government aesthetics, an enterprise REST API backend, scientific fertilizer calculation engines, national laboratory directories, macro analytics, and multi-lingual access designed to empower Indian farmers with data-driven soil intelligence.

The application is architected as a modern **monorepo** featuring a **React 19 + Vite 8** frontend paired with a high-performance **Node.js + Express + TypeScript** backend powered by **Prisma ORM** and **PostgreSQL**.

---

## 2. Key Features & Capabilities

### 🎙️ 1. Bharti AI — Intelligent Kisan Assistant (Groq Cloud LLM & Multilingual Voice)
- **High-Speed Cloud LLM Reasoning:** Powered by Groq Cloud API (`llama-3.3-70b-versatile` / `openai/gpt-oss-120b`) for rapid conversational intelligence tailored to Indian agriculture.
- **Multilingual Voice Playback (Text-to-Speech):** High-fidelity voice narration supporting **11 Indian languages**:
  - Hindi (हिन्दी)
  - Marathi (मराठी)
  - Gujarati (ગુજરાતી)
  - Telugu (తెలుగు)
  - Tamil (தமிழ்)
  - Bengali (বাংলা)
  - Punjabi (ਪੰਜਾਬੀ)
  - Kannada (ಕನ್ನಡ)
  - Malayalam (മലയാളം)
  - Odia (ଓଡ଼ିଆ)
  - Indian English
- **Speech Synthesis Proxy (`/api/tts`):** Custom Vite dev middleware proxying natural TTS audio streams without browser CORS restrictions, with automatic fallback to Web Speech API.
- **Dynamic On-the-Fly Script Translation:** Integrated `/api/translate` service ensuring answers and spoken audio strictly match the farmer's active regional script (Devanagari, Gurmukhi, Telugu, etc.).
- **Voice Controls & Accessibility:**
  - Dedicated in-widget native voice language selector.
  - **Auto-Read Mode:** Automatically reads aloud all incoming answers for low-literacy farmers.
  - Interactive audio waveforms and animated speaking indicators.
  - Quick agronomic prompt chips localized per language.
- **Three-Tier Resilience Engine:**
  1. Primary: Enterprise Backend AI Endpoint (`/api/v1/assistant/chat`).
  2. Secondary: Direct browser-side Groq Cloud API fallback.
  3. Tertiary: Localized ICAR & DA&FW agronomic domain knowledge rule engine (runs completely offline).

---

### 📄 2. Soil Health Card Search & Certified PDF Generation (`/soilhealthcard`)
- **Dual Search Modalities:**
  - **Direct Mobile Search:** 10-digit phone lookup with `+91` validation and quick-fill test demo chips.
  - **Cascading Geographical Hierarchy:** Dynamic lookup through `State -> District -> Sub-District -> Village -> Farmer Name`.
- **Interactive Security:** Built-in reCAPTCHA verification widget.
- **Complete 12-Parameter Lab Scorecard:**
  - *Physical / Chemical:* Soil Reaction (pH), Electrical Conductivity (EC), Organic Carbon (OC).
  - *Primary Macronutrients:* Available Nitrogen (N), Phosphorus ($P_2O_5$), Potassium ($K_2O$).
  - *Secondary Nutrient:* Available Sulphur (S).
  - *Micronutrients:* Zinc (Zn), Iron (Fe), Copper (Cu), Manganese (Mn), Boron (B).
- **Server-Side Certified Vector PDF Export:** Backend streaming PDF generator built with `pdfkit`, producing official certified bilingual Soil Health Card documents with Ashoka emblem branding, laboratory ratings, and tailored fertilizer schedules.
- **Client-Side Print Layout:** Dedicated `@media print` styling for instant browser printing and physical dispatch.

---

### 🧪 3. ICAR-STCR Precision Fertilizer Recommendation Engine (`/fertilizer`)
- **Scientific STCR Equations:** Implements the Indian Council of Agricultural Research (ICAR) **Soil Test Crop Response** methodology instead of blanket generic recommendations.
- **Precision Crop Calculations:** Site-specific equations tailored to major crop cycles (Wheat, Paddy, Mustard, Sugarcane, Maize, Cotton, Pulses).
- **Commercial Fertilizer Conversion:** Automatically translates elemental nutrient deficits ($N, P_2O_5, K_2O$) into commercial fertilizer bags:
  - Urea (46% N)
  - Di-Ammonium Phosphate / DAP (18% N, 46% $P_2O_5$)
  - Muriate of Potash / MOP (60% $K_2O$)
  - Single Super Phosphate (SSP)
- **Application Schedule Breakdown:** Split application schedules categorized into **Basal Application** (at sowing) and **Top-Dressing** (at critical vegetative / flowering stages).
- **Organic Amendment Adjustments:** Integrated Farm Yard Manure (FYM), vermicompost, and green manuring (Dhaincha/Sanai) calculations.

---

### 🏢 4. Pan-India Soil Testing Laboratories Directory (`/soilTestingLabs`)
- **Complete National Coverage:** All **28 States and 8 Union Territories** covering **750+ districts** with **3,850+ static laboratories** and **1,240+ mobile vans**.
- **Four Categorized Laboratory Types:**
  - **District Soil Testing Laboratory (DSTL):** State Dept. of Agriculture static laboratory facilities.
  - **ICAR - Krishi Vigyan Kendra (KVK) Laboratory:** Specialized micronutrient and irrigation water testing farms.
  - **Mobile Soil Testing Laboratory (MSTL):** Doorstep rapid diagnostic testing vans.
  - **Agricultural University & Central Institutes:** Apex research laboratories (e.g., IARI Pusa, PAU Ludhiana, TNAU Coimbatore, CCSHAU Hisar, RBS College Bichpuri).
- **Interactive Filtering & Actions:**
  - Cascading State and District dropdowns with keyword instant search.
  - Filter pills for laboratory types.
  - 📞 **Direct Call (`tel:`)** link to lab officers.
  - ✉️ **Send Email (`mailto:`)** inquiry link.
  - 🧭 **Google Maps Directions** centered on verified laboratory coordinates.
  - Proximity-based nearby lab locator (`/api/v1/labs/nearby`).

---

### 🗺️ 5. Interactive GIS Soil Nutrient Maps & District Explorer (`/NutrientMapCycleII`)
- **Dual Interactive GIS Modes:**
  - **National SVG Map:** Real interactive geographic map rendering all 36 States & UTs with toggleable nutrient layers.
  - **District-Level Soil Explorer:** Deep dive into any State to inspect constituent districts (e.g., all 75 districts of UP, 23 of Punjab, 36 of Maharashtra).
- **12 Nutrient Layer Overlays:** Toggle between Nitrogen, Phosphorus, Potassium, Organic Carbon, pH Reaction, Electrical Conductivity, Zinc, Sulphur, Iron, Copper, Manganese, and Boron.
- **Export & Comparison:** Switch between color-coded District Cards View and full Tabular Data with live CSV export (`Export CSV`).

---

### 📊 6. Macro Analytics & School Soil Health Program (`/dashboard` & `/school`)
- **National Progress Dashboard:** National comparisons of Cycle I (2015-17) vs Cycle II (2017-19) with state-by-state targets vs samples tested, completion percentages, and live CSV export.
- **School Soil Health Program:** Participatory educational tracking covering 130 schools, 42 states/UTs, 51,628 students, and 22,771 samples analyzed by rural youth.

---

### 🔐 7. Multi-Role Administrative Portal & RBAC (`/admin`)
- **Role-Based Access Control (RBAC):** Supports 7 distinct user roles:
  - `CENTER_ADMIN`, `STATE_ADMIN`, `DISTRICT_ADMIN`, `LAB_ADMIN`, `RAWE_STUDENT`, `FARMER`, and `PUBLIC_USER`.
- **Secure Authentication:** JWT access and refresh token rotation, HTTP-only cookie support, bcrypt password hashing, and rate limiting.
- **Administrative Workflows:** Official Login (`/admin`), Citizen User Registration (`/admin/userRegistration`), Rural Agricultural Work Experience (RAWE) Student Registration (`/admin/RAWERegistration`), Password Recovery (`/admin/ForgotPassword`), and Audit Logging.

---

### 🎫 8. Citizen Support & Grievance Redressal Desk (`/support`)
- **Ticket Submission:** Citizens can lodge grievance tickets with automated reference code generation (e.g., `SHC-2026-XXXX`).
- **Live Ticket Tracking:** Instant status verification (PENDING, IN_PROGRESS, RESOLVED, CLOSED) with resolution comments.
- **Frequently Asked Questions:** Interactive accordions covering soil sampling, laboratory fees, and fertilizer schedules.

---

### 🌿 9. National Mission on Natural Farming & Library Hubs
- **NMNF Knowledge Center (`/National_Mission_on_Natural_Farming`):** Detailed SOPs for the 4 biological pillars: *Jeevamrit*, *Beejamrit*, *Acchadana*, and *Whapasa*.
- **Resource Libraries:** Official circulars, operational guidelines, and SOP downloads (`/GeneralResources`), school science guides (`/SchoolLibrary`), and media gallery (`/media`).

---

## 3. Technology Stack

### Frontend Application
| Layer | Technologies |
| :--- | :--- |
| **Framework** | React 19 (`react` ^19.3.1, `react-dom` ^19.3.1) |
| **Build Tool & Dev Server** | Vite 8 (`vite` ^8.3.4) with custom TTS & Translation proxy middleware |
| **Routing** | React Router v7 (`react-router-dom` ^7.18.4) |
| **Icons & UI** | Lucide React (`lucide-react` ^1.60.0) |
| **Styling** | Vanilla CSS Design Tokens (`src/styles/tokens.css`, `src/styles/portal.css`), CSS Grid, Flexbox, `@media print` |
| **Linter** | Oxlint (`oxlint` ^1.88.0) |
| **i18n & Translation** | Context-based localization + Google Translate API + Web Speech API |

### Backend Service
| Layer | Technologies |
| :--- | :--- |
| **Runtime & Framework** | Node.js (v18+) with Express 4 (`express` ^4.21.2) |
| **Language** | TypeScript 5 (`typescript` ^5.7.3) executed via `tsx` |
| **Database & ORM** | PostgreSQL 16 with Prisma ORM (`@prisma/client` ^5.22.0) |
| **Security & Middleware** | Helmet (`helmet` ^8.0.0), CORS, `express-rate-limit`, `cookie-parser`, `bcryptjs` |
| **Authentication** | JWT (`jsonwebtoken` ^9.0.2) with Access & Refresh Token rotation |
| **Validation** | Zod (`zod` ^3.24.1) schema validation |
| **Document Generation** | PDFKit (`pdfkit` ^0.16.0) for certified vector PDFs |
| **Logging** | Pino & Pino-HTTP (`pino` ^9.6.0, `pino-http` ^10.4.0) |
| **Testing** | Vitest (`vitest` ^2.1.8) and Supertest (`supertest` ^7.0.0) |

### AI & Speech Infrastructure
| Feature | Implementation |
| :--- | :--- |
| **Cloud LLM Provider** | Groq Cloud API (`llama-3.3-70b-versatile`, `openai/gpt-oss-120b`) |
| **Text-to-Speech (TTS)** | Google Translate TTS audio streaming proxy via Vite middleware (`/api/tts`) + Web Speech API fallback |
| **Speech Translation** | Dynamic multi-language script translator (`/api/translate`) |
| **Offline Fallback** | Localized agronomic rule engine modeled after ICAR-IISS bulletins |

---

## 4. Project Structure

```
KrishiMitr/
├── frontend/                               # React 19 + Vite 8 Frontend Application
│   ├── public/                             # Favicons and SVG sprite icons
│   ├── src/
│   │   ├── assets/                         # Emblems, national logos, and banner graphics
│   │   ├── components/
│   │   │   ├── common/                     # Header, Footer, BhartiAIWidget, NavDrawer, Breadcrumbs
│   │   │   ├── dashboard/                  # Metric counters, state tables, charts
│   │   │   ├── labs/                       # Laboratory directory cards, filter pills, ribbons
│   │   │   ├── maps/                       # Interactive India GIS SVG nutrient maps
│   │   │   └── shc/                        # SHC search forms, 12-parameter scorecards, print views
│   │   ├── context/                        # LanguageContext.jsx (multilingual i18n state)
│   │   ├── i18n/                           # Static dictionary & page-level translation mappings
│   │   ├── pages/                          # All 18 public and administrative pages
│   │   ├── services/                       # Centralized apiClient.js, lab, soil health, and stats services
│   │   ├── styles/                         # tokens.css, portal.css, App.css
│   │   ├── App.jsx                         # App routes and layout configuration
│   │   └── main.jsx                        # React root entry point
│   ├── index.html                          # Root HTML template with government meta tags
│   ├── package.json                        # Frontend dependencies and scripts
│   └── vite.config.js                      # Vite configuration with /api/tts & /api/translate proxies
│
├── backend/                                # Node.js + Express + TypeScript Backend
│   ├── prisma/
│   │   ├── schema.prisma                   # Complete relational database schema (PostgreSQL)
│   │   └── seed.ts                         # Database seeder (36 States/UTs, 750+ districts, labs, crops)
│   ├── src/
│   │   ├── config/                         # Database (Prisma), env (Zod), cors configurations
│   │   ├── middleware/                     # JWT authenticate, authorize, errorHandler, rateLimiter
│   │   ├── modules/
│   │   │   ├── admin/                      # Audit logs and user administration
│   │   │   ├── analytics/                  # Cycle I/II comparisons and school metrics
│   │   │   ├── assistant/                  # Bharti AI Groq integration & domain fallback
│   │   │   ├── auth/                       # Login, registration, RAWE onboarding, password recovery
│   │   │   ├── fertilizer/                 # ICAR-STCR calculation equations & fertilizer dosing
│   │   │   ├── laboratories/               # Lab directory and geolocation nearby endpoints
│   │   │   ├── locations/                  # Cascading States, Districts, Sub-districts, Villages
│   │   │   ├── nutrient-maps/              # State & District GIS fertility statistics
│   │   │   ├── resources/                  # SOPs, circulars, and media catalog
│   │   │   ├── soil-health-cards/          # SHC lookup, 12-parameter evaluation, PDF generator
│   │   │   └── support/                    # Citizen grievance ticket creation and tracking
│   │   ├── services/
│   │   │   ├── csv/                        # Live sanitized CSV exporter
│   │   │   └── pdf/                        # Certified Soil Health Card vector PDF generator (PDFKit)
│   │   ├── tests/                          # Vitest API and fertilizer algorithm test suites
│   │   ├── utils/                          # Standard API responses, error classes, pagination
│   │   ├── app.ts                          # Express application setup
│   │   └── server.ts                       # Server bootstrap and port listener
│   ├── package.json                        # Backend dependencies and scripts
│   └── tsconfig.json                       # TypeScript compiler options
│
├── docs/                                   # Architectural audit, API specs, and feature status
├── docker-compose.yml                      # PostgreSQL 16 container definition
├── package.json                            # Workspace root orchestration scripts
└── README.md                               # Project documentation
```

---

## 5. Getting Started & Development

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **Docker:** (Optional, for running PostgreSQL locally)

---

### Step 1: Install Dependencies
From the project root (`KrishiMitr`):
```bash
# Install frontend dependencies
npm install --prefix frontend

# Install backend dependencies
npm install --prefix backend
```

---

### Step 2: Configure Environment Variables

#### Frontend Configuration (`frontend/.env`):
Create `frontend/.env` (or copy from `frontend/.env.example`):
```env
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:4000/api/v1

# Groq Cloud API for Bharti AI (Optional, direct client fallback)
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_GROQ_MODEL=openai/gpt-oss-120b
```

#### Backend Configuration (`backend/.env`):
Create `backend/.env` (or copy from `backend/.env.example`):
```env
PORT=4000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/krishimitr?schema=public"
JWT_SECRET="super-secret-jwt-key-for-krishimitr-portal-2026"
JWT_REFRESH_SECRET="super-secret-refresh-key-for-krishimitr-portal-2026"
CORS_ORIGIN="http://localhost:5173,http://localhost:3000"

# AI Provider Settings (Groq Cloud API)
AI_PROVIDER=groq
AI_API_KEY=your_groq_api_key_here
AI_BASE_URL=https://api.groq.com/openai/v1
AI_MODEL=openai/gpt-oss-120b
```

---

### Step 3: Database Setup (PostgreSQL & Prisma)

1. **Start PostgreSQL via Docker (if running locally):**
   ```bash
   docker-compose up -d postgres
   ```
2. **Generate Prisma Client & Run Migrations:**
   ```bash
   cd backend
   npm run prisma:generate
   npm run prisma:migrate
   ```
3. **Seed Database with Baseline National Data:**
   ```bash
   npm run prisma:seed
   ```
   *Populates 36 States/UTs, 750+ districts, accredited laboratories, test cards, crop recommendations, and demo administrative accounts.*

---

### Step 4: Running the Applications

#### Option A: Run Full Stack Simultaneously (Recommended)
From the project root:
```bash
# Terminal 1: Run Backend
npm run dev:backend

# Terminal 2: Run Frontend
npm run dev:frontend
```

#### Option B: Run Standalone Frontend with Offline Resilient Mock Fallbacks
The frontend is architected with complete offline resilience. If the backend is not running, the application automatically uses built-in datasets for laboratories, test cards, nutrient maps, and Bharti AI domain fallback:
```bash
npm run dev
# or
npm run dev:frontend
```

Access the applications in your browser:
- **Frontend Portal:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:4000/api/v1](http://localhost:4000/api/v1)
- **Backend Health Check:** [http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health)

---

## 6. Backend API Endpoints Reference

The backend exposes a structured, RESTful API versioned under `/api/v1`:

| Module | Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- | :--- |
| **System** | `GET` | `/health` | Server status and database readiness check | Public |
| **Auth** | `POST` | `/auth/login` | Administrative & citizen login (returns JWT) | Public |
| **Auth** | `POST` | `/auth/register` | Citizen user registration | Public |
| **Auth** | `POST` | `/auth/register-rawe` | RAWE Student registration | Public |
| **Auth** | `POST` | `/auth/forgot-password` | Password reset request | Public |
| **Auth** | `GET` | `/auth/me` | Fetch active user profile from JWT session | Authenticated |
| **Soil Health Cards** | `POST` | `/soil-health-cards/search` | Search cards by mobile or cascading geography | Public |
| **Soil Health Cards** | `GET` | `/soil-health-cards/:id` | Retrieve 12-parameter lab scorecard | Public |
| **Soil Health Cards** | `GET` | `/soil-health-cards/:id/pdf` | Download certified bilingual vector PDF card | Public |
| **Fertilizer Engine** | `POST` | `/fertilizer/recommendations` | Calculate ICAR-STCR precision crop dosages | Public |
| **Laboratories** | `GET` | `/labs` | Pan-India lab directory with state/district filters | Public |
| **Laboratories** | `GET` | `/labs/nearby` | Find nearest laboratories using lat/lng geolocation | Public |
| **Nutrient Maps** | `GET` | `/nutrient-maps/states` | Fetch state-level macro/micronutrient stats | Public |
| **Nutrient Maps** | `GET` | `/nutrient-maps/districts` | Fetch district-level fertility stats for any state | Public |
| **Analytics** | `GET` | `/analytics/overview` | Cycle I vs Cycle II national progress comparison | Public |
| **Analytics** | `GET` | `/analytics/exports/csv` | Download national progress dataset as CSV | Public |
| **Analytics** | `GET` | `/analytics/schools` | School Soil Health Program participation metrics | Public |
| **Support Desk** | `POST` | `/support/tickets` | Submit citizen grievance ticket | Public |
| **Support Desk** | `GET` | `/support/tickets/:id` | Track grievance ticket status and updates | Public |
| **Bharti AI** | `POST` | `/assistant/chat` | Chat with Bharti AI (Groq LLM + domain fallback) | Public |
| **Locations** | `GET` | `/locations/states` | Cascading list of all 36 States & UTs | Public |
| **Locations** | `GET` | `/locations/districts` | List of constituent districts for selected state | Public |
| **Admin** | `GET` | `/admin/audit-logs` | Security and administrative audit trail | Admin Only |

---

## 7. Demonstration & Evaluation Walkthrough

Follow these steps to evaluate the key capabilities in your browser:

### 1. Test Bharti AI with Voice Playback & Groq LLM:
1. Click the floating **Bharti AI** avatar in the bottom-right corner of any page.
2. Select your preferred voice language from the dropdown (e.g., **हिन्दी**, **ગુજરાતી**, **मराठी**, **తెలుగు**, or **English**).
3. Toggle the **"Auto-read"** checkbox to hear incoming responses read aloud automatically.
4. Click one of the quick prompts or ask a question:
   - *"What does low Organic Carbon (OC) mean?"*
   - *"How do I download my Soil Health Card?"*
   - *"Explain the STCR recommendation approach."*
5. Click the **Listen** (🔊) button on any message to trigger native voice audio playback and view the localized script translation.

### 2. Test Soil Health Card Search & Certified PDF Download (`/soilhealthcard`):
1. Navigate to **Get Soil Health Card** (`/soilhealthcard`).
2. Click any of the pre-configured demo test chips:
   - `Gurpreet Singh (Punjab, +91 9876543210)`
   - `Rameshwar Yadav (UP, +91 9415012345)`
   - `Sunita Patil (MH, +91 9822019921)`
3. Check the reCAPTCHA box (*"I'm not a robot"*) and click **Search**.
4. Examine the 12-parameter scorecard with rating pills (*Low*, *Medium*, *High*, *Sufficient*).
5. Inspect the tailored **ICAR-STCR Fertilizer Recommendations** showing Basal and Top-Dressing splits.
6. Click **Print & Download PDF** to view the browser print layout or download the server-generated vector PDF.

### 3. Test Soil Testing Laboratories Locator (`/soilTestingLabs`):
1. Navigate to **Find Nearest Soil Testing Lab** (`/soilTestingLabs`).
2. Select State: **Uttar Pradesh** and District: **Agra** (or any state/district).
3. Click **Search** to see categorized cards:
   - *DSTL Krishi Bhawan static laboratory*
   - *ICAR-KVK Facility at RBS College Bichpuri*
   - *Mobile Soil Testing Rapid Van*
4. Test the **Directions** link (Google Maps), **Call Lab** (`tel:`), and filter pills.

### 4. Test Interactive GIS Nutrient Map (`/NutrientMapCycleII`):
1. Navigate to **Nutrient Maps -> Cycle II**.
2. Click through the nutrient layers (*Nitrogen*, *Phosphorus*, *Potassium*, *Organic Carbon*, *pH*, *Zinc*).
3. Click on any state on the SVG map to open the district drill-down explorer.
4. Toggle between **District Cards View** and **Full Tabular View**, then click **Export CSV**.

### 5. Test Citizen Grievance Support Desk (`/support`):
1. Navigate to **Support & Grievances** (`/support`).
2. Fill out the "Raise a Grievance Ticket" form and submit.
3. Note the generated reference code (e.g., `SHC-2026-XXXX`).
4. Paste the reference code into the "Track Grievance Status" section to verify live tracking.

---

## 8. Automated Testing & Verification

The backend includes automated integration and unit test suites written with **Vitest**:
```bash
cd backend
npm test
```
The test suite verifies:
- API health and readiness endpoints (`/health`).
- Location hierarchy cascading (`/locations/states`, `/locations/districts`).
- Soil Health Card lookup and parameter rating calculations.
- ICAR-STCR precision fertilizer equations and Urea/DAP/MOP bag conversions.
- Bharti AI domain knowledge fallback engine and conversation history.

---

## 9. Legal & Educational Disclaimer

This project is an independent educational and technical reverse-engineering demonstration developed for academic and evaluation purposes. It is **not** affiliated with, endorsed by, or operated by the Ministry of Agriculture and Farmers Welfare, the Government of India, the Indian Council of Agricultural Research (ICAR), or Krishitantra. All trademarks, logos, and emblems belong to their respective government entities.
