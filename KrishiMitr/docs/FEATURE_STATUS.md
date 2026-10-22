# Soil Health Card Portal Recreation — Feature Status Matrix

This document tracks all features, routes, and workflows identified during the reverse-engineering audit of [https://soilhealth.dac.gov.in/home](https://soilhealth.dac.gov.in/home) and their implementation status in the KrishiMitr project.

---

## 1. Feature Status Summary Table

| Category | Discovered Feature / Route | Route Path | Implementation Status | Data Source / Type | Testing Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Branding & Layout** | Official Emblem of India, SHC & NMNF Bilingual Logos | Global Header & Footer | **Complete** | Vector SVGs (Exact vectors) | Verified across all pages |
| **Navigation** | Off-canvas Responsive Navigation Drawer | `☰` Toggle | **Complete** | Interactive Accordion Drawer | Verified in browser QA |
| **Localization** | Language Toggle (`En` / `हिन्दी`) | Header Utility | **Complete** | State-driven switcher | Verified in header |
| **Homepage** | Hero Banner, PM & Farmers Graphic, Quick Links, Feature Cards | `/` or `/home` | **Complete** | Observable Layout & Assets | Verified in browser QA |
| **Farmer Services** | Search & View 12-parameter Soil Health Card | `/soilhealthcard` | **Complete (Demonstration)** | Mock Multi-State DB + STCR logic | Tested with Gurpreet Singh, Rameshwar Yadav, Sunita Patil |
| **Farmer Services** | Interactive reCAPTCHA Validation | `/soilhealthcard` | **Complete (Demonstration)** | Interactive verification state | Verified in form submission |
| **Farmer Services** | Crop-wise STCR Fertilizer Dosage Recommendations | `/soilhealthcard` | **Complete** | ICAR STCR Agronomic Algorithm | Tested with Wheat, Paddy, Mustard, Sugarcane |
| **Farmer Services** | Print & PDF Download of Soil Health Card | `/soilhealthcard` | **Complete** | Browser print & print-stylesheet | Tested via Action Bar |
| **Lab Locator** | Accredited Static & Mobile Soil Testing Labs Locator | `/soilTestingLabs` | **Complete** | State/District Directory Service | Tested for Punjab/Ludhiana, UP/Lucknow, MH/Pune |
| **Dashboard** | Legacy Dashboard (Cycle I vs Cycle II National Metrics) | `/dashboard` | **Complete** | Official DAC&FW Historical Stats | Tested table view, chart view & CSV export |
| **Dashboard** | State-wise Sample Collection & Progress with % Badges | `/dashboard` | **Complete** | Official State Progress Metrics | Tested state table, sorting & search |
| **School Program** | School Soil Health Dashboard & 6 KPI Metric Cards | `/school` | **Complete** | School Program Data Service | Tested state-wise and nation-wise views |
| **School Program** | School Science Library & Student Manuals | `/SchoolLibrary` | **Complete** | PDF and Video Course Index | Verified card grid & downloads |
| **Resources** | Circulars, SOPs & Security Audit Compliance | `/GeneralResources` | **Complete** | Official Guidelines Index | Verified table, view & download actions |
| **Media** | Photo Gallery & Video Awareness Campaigns | `/media` | **Complete** | Photo & Video Grid Tabs | Verified tab switching |
| **Support** | Help Hub, FAQ Accordions, and "Raise a Ticket" Modal | `/support` | **Complete (Demonstration)** | Interactive Ticket Generation | Tested ticket submission & FAQ toggle |
| **Contact Directory** | DAC&FW and ICAR Official Contact Directories | `/contactus` | **Complete** | Official Directory Data | Tested DAC&FW and ICAR tabs |
| **GIS & Maps** | Interactive India Soil Nutrient Map (Cycle II & Model Villages) | `/NutrientMapCycleII` & `/NutrientMapModelVillages` | **Complete (Demonstration)** | Interactive SVG Map with Fertility Layers | Tested N, P, K, OC, pH, Zn layers & state click |
| **Natural Farming** | National Mission on Natural Farming (NMNF) Section | `/National_Mission_on_Natural_Farming` | **Complete** | NMNF Mission Content & Bio-inputs | Verified 4 core pillars & hero layout |
| **Authentication** | Multi-category Admin & Official Login Interface | `/admin` | **Complete (Demonstration)** | Simulated Auth with Role Dropdowns | Tested auto-fill and redirect to dashboard |
| **Authentication** | Password Recovery (`/admin/ForgotPassword`) | `/admin/ForgotPassword` | **Complete (Demonstration)** | OTP dispatch simulation | Tested form submission |
| **Authentication** | Official User Registration (`/admin/userRegistration`) | `/admin/userRegistration` | **Complete (Demonstration)** | Role & district cascading registration | Tested registration flow |
| **Authentication** | Student RAWE Registration (`/admin/RAWERegistration`) | `/admin/RAWERegistration` | **Complete (Demonstration)** | College & field district registration | Tested RAWE volunteer enrollment |
| **AI Assistant** | "Bharti AI" Interactive Kisan Assistant Floating Widget | Global Floating Widget | **Complete (Demonstration)** | Domain Knowledge Response Engine | Tested question answering & prompt chips |
| **Footer** | Disclaimer, Technical Specs, Visitor Count, Dual Banners | Global Footer | **Complete** | "SWASTH DHARA" & "KHET HARA" | Verified at bottom of all pages |
| **Error Handling** | Portal-styled 404 Page | `*` (Catch-all) | **Complete** | Styled Error Page with Home Link | Tested direct URL 404 fallback |

---

## 2. Inaccessible / Simulated Backend Services

1. **Live NIC/DA&FW Database Integration:**
   - *Status:* Demonstration Only.
   - *Rationale:* Access to live government production databases containing unmasked Aadhaar or real-time farmer land records is restricted to authorized state government nodal authorities.
   - *Local Implementation:* Recreated an extensive, realistic mock service layer (`src/services/soilHealthService.js`) matching the exact 12-parameter schema (pH, EC, OC, N, P, K, S, Zn, Fe, Cu, Mn, B), STCR fertilizer equations, and dynamic generation for unindexed phone numbers.
2. **SLUSI Visualisation Tool (`/slusi-visualisation/`):**
   - *Status:* External Link & Integrated Equivalent.
   - *Rationale:* The Soil and Land Use Survey of India (SLUSI) viewer relies on specialized remote GIS map servers hosted by DAC&FW.
   - *Local Implementation:* Linked directly to the official external GIS tool and provided fully functional in-app interactive SVG choropleth maps (`/NutrientMapCycleII` and `/NutrientMapModelVillages`).
3. **Official reCAPTCHA Server Validation:**
   - *Status:* Simulated.
   - *Rationale:* Google reCAPTCHA v2 requires server-side secret key verification bound to `soilhealth.dac.gov.in`.
   - *Local Implementation:* Implemented an interactive mock component that simulates user interaction, spinner loading, and verified callback states.
