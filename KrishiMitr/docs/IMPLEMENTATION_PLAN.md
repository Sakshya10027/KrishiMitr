# Soil Health Card Portal — Implementation Plan

**Target Application:** KrishiMitr (`EPICS_2/KrishiMitr`)  
**Base Stack:** React 19 + Vite 8  
**Architecture:** Component-driven Single Page Application with client-side routing, modular design tokens, mock data services, accessible interactive forms, and responsive visual layout.

---

## 1. Component & Route Architecture

```
src/
├── assets/
│   ├── logos/               # Ashoka Lion emblem, SHC emblem, NMNF emblem, Bharti AI avatar
│   └── images/              # Hero banner, Swasth Dhara soil, Khet Hara farm
├── components/
│   ├── common/
│   │   ├── Header.jsx       # National emblem, Ministry details, SHC logo, Language selector, Menu toggle
│   │   ├── NavigationDrawer.jsx # Left slide-in drawer with accordion menus and active state
│   │   ├── Breadcrumb.jsx   # Green ribbon with home icon and page title
│   │   ├── Footer.jsx       # Ministry logos, quick links, disclaimers, visitor counter, dual bottom banner
│   │   ├── BhartiAIWidget.jsx # Floating AI assistant for farmer support
│   │   └── ReCaptchaMock.jsx # Interactive reCAPTCHA checkbox with verified state
│   ├── shc/
│   │   ├── SoilHealthCardSearch.jsx # Search tabs, phone/name mode, cascading selects
│   │   ├── SoilHealthCardView.jsx   # Detailed 12-parameter card, STCR recommendations, print/export
│   │   └── FertilizerCalculator.jsx # Crop-specific dosage calculator based on soil test
│   ├── labs/
│   │   └── LabDirectory.jsx # State/District filter, lab cards, capacity & contact info
│   ├── dashboard/
│   │   ├── MetricCards.jsx  # National/School KPI summary stats
│   │   └── ProgressTable.jsx # State-wise targets vs collections with status badges
│   └── maps/
│       └── IndiaNutrientMap.jsx # Interactive SVG map of India with nutrient layers & tooltip
├── pages/
│   ├── HomePage.jsx         # Hero section, action buttons, cards, PM & farmer banner
│   ├── SoilHealthCardPage.jsx # /soilhealthcard
│   ├── SoilTestingLabsPage.jsx # /soilTestingLabs
│   ├── AboutUsPage.jsx      # /aboutus
│   ├── LegacyDashboardPage.jsx # /dashboard
│   ├── SchoolDashboardPage.jsx # /school
│   ├── SchoolLibraryPage.jsx # /SchoolLibrary
│   ├── GeneralResourcesPage.jsx # /GeneralResources
│   ├── MediaGalleryPage.jsx # /media
│   ├── SupportPage.jsx      # /support
│   ├── ContactUsPage.jsx    # /contactus
│   ├── NutrientMapPage.jsx  # /NutrientMapCycleII and /NutrientMapModelVillages
│   ├── NMNFPage.jsx         # /National_Mission_on_Natural_Farming
│   ├── AdminLoginPage.jsx   # /admin
│   ├── ForgotPasswordPage.jsx # /admin/ForgotPassword
│   ├── UserRegistrationPage.jsx # /admin/userRegistration
│   ├── RAWERegistrationPage.jsx # /admin/RAWERegistration
│   └── NotFoundPage.jsx     # 404 page
├── services/
│   ├── soilHealthService.js # Mock farmer records, SHC reports, 12 nutrient calculations, STCR recommendation logic
│   ├── labService.js        # State and District lab directories across India
│   ├── statsService.js      # National cycle stats, state-wise targets and progress
│   └── resourceService.js   # Circulars, SOPs, library docs, FAQs
├── styles/
│   ├── tokens.css           # CSS variables for colors, typography, shadows, spacing
│   └── global.css           # Global resets, typography, button and input styles
├── App.jsx                  # Router setup and global layout wrapper
└── main.jsx                 # React root render
```

---

## 2. Dependencies

To support seamless client-side routing, icons, and export capabilities without extraneous bloat:
- `react-router-dom`: Client-side routing with deep link direct URL support and browser history.
- `lucide-react`: High quality lightweight icon library matching the portal's icons (globe, chevron, search, phone, mail, external-link, download, check-circle, leaf, lock, grid, user).

---

## 3. Implementation Stages & Progress Tracker

- [x] **Stage A — Inspect:** Inspected KrishiMitr project files, verified Vite + React setup; inspected reference website with browser subagent, extracted visual screenshots, routes, DOM components, and interactions.
- [x] **Stage B — Map:** Formulated `docs/REFERENCE_AUDIT.md` and `docs/IMPLEMENTATION_PLAN.md`.
- [x] **Stage C — Foundation:** Installed `react-router-dom` and `lucide-react`, configured design tokens in `tokens.css` and `portal.css`, crafted SVG assets (Ashoka emblem, SHC logo, NMNF logo, Bharti AI avatar, banners), created `Header`, `NavigationDrawer`, `Breadcrumb`, and `Footer`.
- [x] **Stage D — Homepage:** Reproduced hero section, PM & farmer banner, action buttons, feature cards ("Scheme", "Success Stories", "Fertiliser", "Guidelines"), and dual image footer banner ("SWASTH DHARA" / "KHET HARA").
- [x] **Stage E — Farmer & Lab Features:**
  - Built `/soilhealthcard` with dual tabs (`SHC`, `School SHC`), search modes (`Phone Number` / `Farmer Name`), interactive reCAPTCHA mock, realistic multi-state farmer test database, detailed 12-parameter Soil Health Card display, STCR fertilizer recommendations, and printable card layout.
  - Built `/soilTestingLabs` with State/District filters, comprehensive accredited laboratory directory across Indian states/UTs, contact info, testing facilities, and status badges.
- [x] **Stage F — Dashboards, Resources, Maps & Subpages:**
  - Built `/dashboard` (Legacy Dashboard) with Cycle I/II summary stats, Excel/CSV export, state-wise progress table.
  - Built `/school` (School Soil Health Dashboard) with participatory student metrics, nation-wide & state-wise views.
  - Built `/SchoolLibrary`, `/GeneralResources`, `/media`, `/support` (ticket submission + FAQs), and `/contactus`.
  - Built `/NutrientMapCycleII` and `/NutrientMapModelVillages` with interactive India nutrient layer visualizer.
  - Built `/National_Mission_on_Natural_Farming` (NMNF dedicated section).
  - Built `/admin` login with multi-user category tabs, password toggle, `/admin/ForgotPassword`, `/admin/userRegistration`, and `/admin/RAWERegistration`.
- [x] **Stage G — Interactive Features:**
  - Built the floating "Bharti AI" assistant with knowledge base on soil health cards, soil testing, fertilizer recommendations, and government schemes.
  - Implemented language switcher toggle (`English` / `हिन्दी`).
- [x] **Stage H — Testing & Quality Assurance:**
  - Executed `npm run build` with 0 errors (`dist` generated in 1.01s).
  - Ran comprehensive browser QA tests on `http://localhost:5173/`, capturing screenshots and testing route changes, forms, SHC generation, and AI responses.
- [x] **Stage I — Documentation:**
  - Finalized `README.md`, `docs/REFERENCE_AUDIT.md`, `docs/IMPLEMENTATION_PLAN.md`, and `docs/FEATURE_STATUS.md`.
