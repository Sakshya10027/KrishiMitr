# KrishiMitr — Soil Health Card Portal Recreation

> **Educational & Technical Demonstration Project**  
> An independent, faithful, and functional reverse-engineered recreation of the Government of India's Soil Health Card Portal ([https://soilhealth.dac.gov.in](https://soilhealth.dac.gov.in)).  
> *Notice: This is an academic and educational demonstration and is NOT an official Government of India service.*

---

## 1. Project Overview

**KrishiMitr** is a comprehensive, full-featured web application faithfully recreating the Ministry of Agriculture and Farmers Welfare's **Soil Health Card (SHC) Portal**. The project models public citizen services, official government aesthetics, scientific fertilizer calculation engines, national laboratory directories, macro analytics, and multi-lingual access designed to empower Indian farmers with data-driven soil intelligence.

### Key Capabilities Recreated:

1. **National Visual Identity & Government Branding:**
   - Ashoka Lion Capital National Emblem of India.
   - Bilingual Soil Health Card official emblem (*"स्वस्थ धरा, खेत हरा"* / *"Healthy Earth, Greener Farm"*).
   - Ministry header branding (*Ministry of Agriculture and Farmers Welfare / Department of Agriculture and Farmers Welfare*).
   - Tricolor/Green aesthetic theme (`#018840` / `#008744`).
   - Bottom split graphic banners (*SWASTH DHARA* and *KHET HARA*).
   - Bilingual / 12+ Indian language selector with Google Translate integration.

2. **Accredited Soil Testing Laboratories Directory (`/soilTestingLabs`):**
   - **Pan-India Coverage:** All **28 States and 8 Union Territories** covering **750+ districts**.
   - **District Laboratory Resolver:** Official accredited facilities for every district:
     - **District Soil Testing Laboratory (DSTL):** State Dept. of Agriculture / Krishi Bhawan static laboratory.
     - **ICAR - Krishi Vigyan Kendra (KVK) Laboratory:** Research farm facilities specialized in micronutrients and water analysis.
     - **Mobile Soil Testing Laboratory (MSTL):** Block-level mobile vans for doorstep rapid diagnostics.
     - **Agricultural University / ICAR Central Institutes:** Apex facilities (e.g., RBS College Bichpuri in Agra, PAU Ludhiana, CSAUAT Kanpur, TNAU Coimbatore, CCSHAU Hisar, UAS Bengaluru, IARI Pusa New Delhi).
   - **Interactive Multi-Filter Controls:**
     - State dropdown (All 36 States & UTs).
     - District dropdown (Cascades based on selected state, with an *(All Districts)* option).
     - Lab Type filter pills (*All Laboratories*, *District Static Labs*, *ICAR - KVK Labs*, *Mobile Testing Vans*, *University & Research*).
     - Quick keyword search (lab name, pin code, city, officer, or parameters).
   - **Rich Laboratory Cards & Action Triggers:**
     - NABL Accredited & ICAR Certified status badges.
     - Annual sample testing capacity.
     - Operating hours and free farmer fee disclosures under the GoI SHC Scheme.
     - 📞 **Direct Call (`tel:`)** link.
     - ✉️ **Send Email (`mailto:`)** inquiry link.
     - 🧭 **Google Maps Directions (`external link`)** centered on the lab location.
   - **Empty State & Helpline:** Helpful feedback when filters yield zero results, featuring a 1-click reset button and the **National Kisan Call Centre Helpline: 1800-180-1551** (Toll-Free).

3. **Soil Health Card Search & Generation (`/soilhealthcard`):**
   - Dual search modalities:
     - Direct phone search with `+91` validation and quick-fill demo chips.
     - Cascading geographical search (`State -> District -> Sub-District -> Village -> Farmer Name`).
   - Interactive reCAPTCHA verification widget.
   - **Complete 12-Parameter Test Card:**
     - *Physical / Chemical:* Soil Reaction (pH), Electrical Conductivity (EC), Organic Carbon (OC).
     - *Primary Macronutrients:* Available Nitrogen (N), Phosphorus ($P_2O_5$), Potassium ($K_2O$).
     - *Secondary Nutrient:* Available Sulphur (S).
     - *Micronutrients:* Zinc (Zn), Iron (Fe), Copper (Cu), Manganese (Mn), Boron (B).
   - **ICAR-STCR (Soil Test Crop Response)** scientific fertilizer dosage equations tailored to major crop rotations (Wheat, Paddy, Mustard, Sugarcane) with Basal and Top-Dressing application schedules.
   - Dedicated print-ready layout and PDF download simulation.

4. **Macro Analytics & Performance Dashboards (`/dashboard` & `/school`):**
   - **Legacy Dashboard:** Cycle I (2015-17) vs Cycle II (2017-19) national comparisons, state-by-state targets vs samples tested with completion percentages, table/chart visualizer, and live CSV export.
   - **School Soil Health Dashboard:** Participatory metrics (130 Schools, 42 States, 51,628 Students, 54,617 Farmers, 22,771 Samples, 7,500 SHCs) with state-wise and nation-wide breakdowns.

5. **Interactive GIS Soil Nutrient Maps & District-Level Explorer (`/NutrientMapCycleII` & `/NutrientMapModelVillages`):**
   - **Dual Interactive Modes:**
     - **National State Map:** Real cartographic geographic map rendering all 36 States & UTs with layer overlays.
     - **District-Level Soil Nutrient Explorer:** Drill down into any State to explore all constituent districts (e.g., all 75 districts of Uttar Pradesh, 23 of Punjab, 36 of Maharashtra, etc.).
   - **Complete 12-Parameter Lab Analysis Per District:** Available Nitrogen (N), Available Phosphorus (P), Available Potassium (K), Organic Carbon (OC), Soil pH Reaction, Electrical Conductivity (EC), Zinc (Zn), Sulphur (S), Iron (Fe), Copper (Cu), Manganese (Mn), and Boron (B).
   - **Dual Views & Export:** Interactive color-coded District Cards View or Full Tabular Comparison with live CSV export (`Export CSV`).
   - **ICAR-STCR Fertilizer Guidance:** Site-specific crop fertilizer dosages and dominant soil limitations.
   - **Validated Real Data Sources & Citations:**
     - *Department of Agriculture & Farmers Welfare (DA&FW)* — Soil Health Card National Portal (`soilhealth.dac.gov.in`).
     - *ICAR - Indian Institute of Soil Science (IISS), Bhopal* & All India Coordinated Research Project on Soil Test Crop Response (AICRP-STCR).
     - *Sampling Methodology:* GPS-tagged grid collection (2.5 ha irrigated, 10 ha rainfed).

6. **National Mission on Natural Farming (`/National_Mission_on_Natural_Farming`):**
   - Comprehensive portal section detailing sustainable chemical-free agriculture.
   - Preparation guides and application protocols for the 4 pillars: *Beejamrit*, *Jeevamrit*, *Acchadana*, and *Whapasa*.

7. **Official Circulars, Library & Media Hub:**
   - Circulars & SOPs (`/GeneralResources`) with View and Download controls.
   - School science guides & video tutorials (`/SchoolLibrary`).
   - Public awareness photo & video documentary gallery (`/media`).
   - Official administrative contact directories for DAC&FW and ICAR (`/contactus`).

8. **Citizen Support & "Bharti AI" Virtual Assistant:**
   - Dedicated Support Hub (`/support`) with FAQ accordions and interactive "Raise a Ticket" tracking reference generator.
   - Floating interactive **Bharti AI** assistant widget providing domain-specific agricultural advice, fertilizer guidance, and portal navigation.

9. **Administrative Access Portals (`/admin`):**
   - Multi-role tabs (*Center/State/District/STL*, *School SHC*, *Other Users*).
   - Demo credential auto-fill, password visibility toggle, and authenticated mock workflows.
   - Password Recovery (`/admin/ForgotPassword`), User Registration (`/admin/userRegistration`), and RAWE Student Registration (`/admin/RAWERegistration`).

---

## 2. Technology Stack

- **Framework:** React 19 (`react` ^19.3.1, `react-dom` ^19.3.1)
- **Bundler & Dev Server:** Vite 8 (`vite` ^8.3.4)
- **Routing:** React Router v7 (`react-router-dom` ^7.18.4)
- **Icons:** Lucide React (`lucide-react` ^1.60.0)
- **Styling:** Vanilla CSS design tokens (`src/styles/tokens.css`, `src/styles/portal.css`) with CSS Grid, Flexbox, and dedicated `@media print` stylesheets.

---

## 3. Getting Started & Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation
From the project directory (`KrishiMitr`):
```bash
npm install
```

### Running Locally
To start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/
```

### Production Build
To create an optimized production bundle:
```bash
npm run build
```
The output will be placed in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 4. Project Structure

```
KrishiMitr/
├── docs/
│   ├── REFERENCE_AUDIT.md       # Target portal investigation & route inventory
│   ├── IMPLEMENTATION_PLAN.md   # Architectural mapping & execution progress
│   └── FEATURE_STATUS.md        # Feature verification matrix
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── images/              # Banner graphics, Swasth Dhara, Khet Hara
│   │   └── logos/               # Emblem of India, SHC logo, NMNF logo, Bharti AI
│   ├── components/
│   │   ├── common/              # Header, NavigationDrawer, Breadcrumb, Footer, Bharti AI, Language Modal
│   │   ├── dashboard/           # Metrics cards and progress tables
│   │   ├── labs/                # Laboratory directory cards & filters
│   │   ├── maps/                # Interactive SVG India nutrient map
│   │   └── shc/                 # SHC search form, 12-parameter view, STCR calculator
│   ├── context/
│   │   └── LanguageContext.jsx  # Language preferences & translation state
│   ├── pages/                   # All 16 public-facing and administrative pages
│   ├── services/
│   │   ├── labService.js        # Comprehensive registry covering all 36 States/UTs & districts
│   │   ├── resourceService.js   # Circulars, SOPs, FAQs, and contact directories
│   │   ├── soilHealthService.js # 12 nutrient calculations, STCR equations, mock records
│   │   └── statsService.js      # Cycle I/II national summary stats & state progress
│   ├── styles/
│   │   ├── tokens.css           # Design tokens, color palette, typography
│   │   └── portal.css           # Global portal stylesheet and print layout
│   ├── App.jsx                  # Route definitions and layout wrapper
│   ├── index.css                # Base stylesheet
│   └── main.jsx                 # React root entry point
├── .gitignore                   # Version control ignore configuration
├── index.html                   # HTML root template with meta tags
├── package.json                 # Project dependencies and scripts
└── vite.config.js               # Vite bundler configuration
```

---

## 5. Demonstration & Evaluation Guide

To test the application workflows in your browser:

### 1. Test Soil Testing Laboratories Locator (`/soilTestingLabs`):
- Open `http://localhost:5173/soilTestingLabs`.
- Review the **National Overview Ribbon** (3,850+ Static Labs, 1,240+ Vans, 750+ Districts).
- Select State: **Uttar Pradesh**.
- Select District: **Agra** (or any of the 75 districts of UP).
- Click **Search**.
- Observe the instant results:
  - **District Soil Testing Laboratory (DSTL), Agra** (NABL Accredited, Krishi Bhawan Sanjay Place).
  - **ICAR-KVK Soil Testing Facility, RBS College Bichpuri, Agra** (12 parameters + irrigation water).
  - **Mobile Soil Testing Unit (MSTL) - Agra Division** (Rapid doorstep testing van).
- Test the interactive buttons:
  - Click **Directions** to view the Google Maps query.
  - Click **Call Lab** (`tel:`) or **Send Email** (`mailto:`).
- Switch the filter pill to **Mobile Testing Vans** or **ICAR - KVK Labs** to test live type filtering.
- Try other states like **Punjab (Ludhiana / Amritsar)**, **Maharashtra (Pune / Nagpur)**, **Bihar (Patna)**, or **Rajasthan (Jaipur)**.

### 2. Test Soil Health Card Search & Generation (`/soilhealthcard`):
- Open `http://localhost:5173/soilhealthcard`.
- Click one of the quick test chips under the search form:
  - `Gurpreet Singh (Punjab, +91 9876543210)`
  - `Rameshwar Yadav (UP, +91 9415012345)`
  - `Sunita Patil (MH, +91 9822019921)`
- Complete the reCAPTCHA checkbox (*"I'm not a robot"*).
- Click **Search**.
- Review the generated card with full 12-parameter ratings and ICAR-STCR fertilizer dosages.
- Click **Print Soil Health Card** to preview the print-formatted card.

### 3. Test Interactive GIS Soil Nutrient Map (`/NutrientMapCycleII`):
- Open `http://localhost:5173/NutrientMapCycleII`.
- Toggle between nutrient layers: *Nitrogen*, *Phosphorus*, *Potassium*, *Organic Carbon*, *pH*, and *Zinc*.
- Click on any state on the SVG map to inspect localized soil fertility metrics.

### 4. Test Analytics & CSV Export (`/dashboard`):
- Open `http://localhost:5173/dashboard`.
- Review Cycle I and Cycle II summary statistics.
- Click **EXPORT** to download the live CSV progress report.
- Toggle between **Table** and **Chart** visualization modes.

### 5. Test Bharti AI Assistant:
- Click the floating **Bharti AI** assistant widget in the bottom-right corner.
- Ask questions or click quick prompts (e.g., *"How do I download my Soil Health Card?"* or *"What does low Organic Carbon mean?"*).

---

## 6. How to Connect a Live Backend API

To connect KrishiMitr to a live backend database or REST API:
1. Open [`src/services/labService.js`](file:///d:/Coding%20files/EPICS_2/KrishiMitr/src/services/labService.js) and replace `getLabsByLocation` with your API fetch call (e.g., `fetch('/api/v1/labs?state=' + state + '&district=' + district)`).
2. Open [`src/services/soilHealthService.js`](file:///d:/Coding%20files/EPICS_2/KrishiMitr/src/services/soilHealthService.js) and replace `searchSoilHealthCard` with your endpoint (e.g., `fetch('/api/v1/cards/search', { method: 'POST', body: ... })`).
3. Set your API base URL in an environment file (`.env`):
   ```env
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```

---

## 7. Legal & Educational Disclaimer

This project is an independent educational and technical demonstration developed for evaluation purposes. It is **not** affiliated with, endorsed by, or operated by the Ministry of Agriculture and Farmers Welfare, the Government of India, the Indian Council of Agricultural Research (ICAR), or Krishitantra.
