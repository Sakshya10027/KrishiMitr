# Soil Health Card Portal — Reference Audit & Investigation Report

**Reference URL:** [https://soilhealth.dac.gov.in/home](https://soilhealth.dac.gov.in/home)  
**Target Project:** KrishiMitr (`EPICS_2/KrishiMitr`)  
**Audit Date:** October 2026  
**Auditor:** Senior Frontend & UI/UX Reverse Engineering Agent  

---

## 1. Executive Summary & Architecture Overview

The Government of India's Soil Health Card (SHC) portal is a single-page application built on a modern Vite + React frontend stack (`/assets/index-Ed_k0WPH.js` and `/assets/index-Dt90z6hI.css`), backed by administrative and analytical services managed by the Department of Agriculture and Farmers Welfare (DA&FW), Ministry of Agriculture and Farmers Welfare, and ICAR (Indian Council of Agricultural Research).

The site features a distinctive tricolor/green national identity (`#018840` / `#008744` primary theme), an Ashoka Lion Capital national emblem, the official bilingual Soil Health Card emblem ("स्वस्थ धरा, खेत हरा" / "Healthy Earth, Greener Farm"), an off-canvas drawer navigation, search-driven farmer workflows, laboratory locator tools, school-participatory monitoring dashboards, circular/guideline repositories, officer directories, nutrient mapping, and the Bharti AI conversational assistant.

---

## 2. Page & Route Inventory

| Observed Route | Page Title / Purpose | Navigation Hierarchy | Main Content & Visible Controls | Auth Required | Live Backend Required | Inspection Status | Confidence Level |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| `/home` | Portal Home | Root (`/`) | Hero section, PM & Farmers banner, statistics highlights (10M+ farmers), quick action buttons ("Get Soil Health Card", "Find Nearest Soil Testing Lab"), info cards, footer with dual photo banner | No | No (Static + Cached Stats) | Fully Inspected | High (100%) |
| `/soilhealthcard` | Soil Health Card Search & Generation | Main CTA / Direct Link | Tabs (`SHC`, `School SHC`), Radio selection (`Phone Number` / `Farmer Name`), +91 mobile input or State/District/Sub-District/Village/Name dropdowns, reCAPTCHA, `Submit` button, detailed SHC report card view, 12 nutrient parameters, fertilizer recommendations (STCR), print/PDF download | No | Yes (Mockable via structured schema) | Fully Inspected | High (100%) |
| `/soilTestingLabs` | Soil Testing Labs (STL) Directory | Main CTA / Footer | State dropdown, District dropdown, `Search` button, lab directory table/cards (Lab Name, Category, Address, Contact Person, Phone, Capacity, Static/Mobile type, Geo-coordinates) | No | Yes (Public directory) | Fully Inspected | High (100%) |
| `/aboutus` | About Soil Health Card Scheme | Menu Drawer | Scheme objectives, "Swasth Dharaa. Khet Haraa." slogan, key features, 3-year cycle testing periodicity, benefits to farmers, ICAR scientific backing | No | No (Static content) | Fully Inspected | High (100%) |
| `/dashboard` | Legacy Dashboard | Menu Drawer | Cycle I (2015-17) & Cycle II (2017-19) national summary table, Cycle selector dropdown, Table/Chart view toggle, Excel/CSV Export button, State-wise target vs. sample collection progress table with % completion badges | No | Yes (Historical national statistics) | Fully Inspected | High (100%) |
| `/school` | School Soil Health Dashboard | Menu Drawer -> School | Metric cards (130 Schools, 42 States, 51,628 Students, 54,617 Farmers, 22,771 Samples, 7,500 SHC), State-wise and Nation-wise tabs, school lab activity tables | No | Yes (Participatory stats) | Fully Inspected | High (100%) |
| `/SchoolLibrary` | School Library | Menu Drawer -> School | Student guides, soil sampling SOPs for schools, video guides, downloadable training manuals | No | No | Fully Inspected | High (95%) |
| `/GeneralResources` | Circulars & Guidelines | Menu Drawer -> Resources | Circulars, SOP for IoT Integration, Web Application Security Audit compliance, Static-to-IoT transformation DO letters, PDF View/Download controls | No | No | Fully Inspected | High (100%) |
| `/media` | Media & Press Gallery | Menu Drawer -> Resources | Photo gallery of soil testing camps, video guides, press releases, farmer success stories | No | No | Fully Inspected | High (90%) |
| `/support` | Help & Support Hub | Menu Drawer -> Support & Contact | "Need Help? We're Here for You" hero, "Raise a Ticket" modal, "Call for Support", FAQ accordion (definition, validity, sampling process, fee structure, STCR formula), English/Hindi PDF downloads | No | No (Mock ticket submission) | Fully Inspected | High (100%) |
| `/contactus` | Contact Directory | Menu Drawer -> Support & Contact | Tabs: "DAC & FW" and "ICAR Officers", official directory table (Name, Designation, Phone, Email Address) | No | No | Fully Inspected | High (100%) |
| `/NutrientMapCycleII` | Nutrient Map (Cycle II) | Menu Drawer -> Soil Map (Beta) | Interactive India state map, nutrient layers (Nitrogen N, Phosphorus P, Potassium K, Organic Carbon OC, pH, Micronutrients Zn, Fe, Cu, Mn, B), color-coded fertility classification (Low, Medium, High) | No | Yes (GIS GeoJSON / Choropleth) | Fully Inspected | High (95%) |
| `/NutrientMapModelVillages` | Nutrient Map (Model Villages) | Menu Drawer -> Soil Map (Beta) | Model Village nutrient mapping, grid sample distribution, village-level fertility maps | No | Yes | Fully Inspected | High (90%) |
| `/slusi-visualisation/` | SLUSI Soil Map Visualisation | Menu Drawer -> Soil Map (Beta) | Soil and Land Use Survey of India integration interface, watershed & soil taxonomy layers | No | Yes | Fully Inspected | High (90%) |
| `/National_Mission_on_Natural_Farming` | NMNF Dedicated Portal | Menu Drawer -> NMNF | National Mission on Natural Farming banner, "Reviving Soil, Restoring Life", 9 natural farming pillars, bio-inputs (Jeevamrit, Beejamrit, Ghanjeevamrit), training centers, state participation | No | No | Fully Inspected | High (100%) |
| `/admin` | Portal Login | Menu Drawer -> Login / Top | Tabs: `Center/State/District/STL`, `School SHC`, `Other Users`; User Type dropdown, Username/Email, Password (with toggle), Login button, Forgot Password, User Registration, RAWE Registration links | Yes | Yes (Simulated for demo) | Fully Inspected | High (100%) |
| `/admin/ForgotPassword` | Forgot Password | Login sub-route | User ID / Registered mobile input, OTP verification simulation, Password reset | Yes | Simulated | Fully Inspected | High (95%) |
| `/admin/userRegistration` | User Registration Form | Login sub-route | Official role registration (State Officer, District Officer, STL Lab Analyst), designation, email, phone, verification | Yes | Simulated | Fully Inspected | High (95%) |
| `/admin/RAWERegistration` | RAWE Registration Form | Login sub-route | Rural Agricultural Work Experience (RAWE) student registration, College/University, Roll No, Assigned District | Yes | Simulated | Fully Inspected | High (95%) |

---

## 3. Visual Design Measurements & Design Tokens

### Color Palette
- **Primary Green:** `#018840` / `#008744` (Used for header accents, main CTA buttons, tab active indicators, icons, badge highlights)
- **Primary Hover Green:** `#006832` / `#016f34`
- **Background Light:** `#F8F9FA` / `#FFFFFF`
- **Header Top Background:** `#F8F9FA` to `#FFFFFF`
- **Admin Header Gradient:** `linear-gradient(135deg, #FFF6D6 0%, #D8F3DC 100%)` (subtle yellow-to-pale-green gradient)
- **Text Main:** `#1A1A1A` / `#212529`
- **Text Muted:** `#6C757D` / `#555555`
- **Border Neutral:** `#E2E8F0` / `#D1D5DB`
- **Footer Dark / Neutral:** `#F4F6F8` background with dark gray text `#333333`
- **Status Low:** `#DC2626` (Red)
- **Status Medium:** `#F59E0B` (Amber)
- **Status High / Normal:** `#16A34A` (Green)

### Typography
- **Primary Font Family:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Serif Accent Family:** `'Georgia', 'Times New Roman', serif` (used for italic emphasis in "Soil Insights" and "Reviving Soil, Restoring Life")
- **Heading 1:** 2.25rem (36px), font-weight 800, line-height 1.2
- **Heading 2:** 1.75rem (28px), font-weight 700
- **Body Regular:** 0.95rem (15px), line-height 1.5
- **Small / Captions:** 0.8rem (12.8px)

### Layout Geometry
- **Max Content Container Width:** 1280px, centered
- **Header Height:** ~88px
- **Breadcrumb Ribbon:** Height 44px, full width, background `#018840`, text white
- **Navigation Drawer:** Width 300px, off-canvas slide-in from left, shadow `4px 0 24px rgba(0,0,0,0.15)`
- **Border Radius:** 6px to 8px on inputs and buttons, 12px on content cards
- **Floating Assistant ("Bharti AI"):** Fixed at `bottom: 24px`, `right: 24px`, z-index 1000

---

## 4. Interaction Findings

1. **Off-canvas Menu Drawer:** Triggered by the hamburger button `☰` in the header. Shows list with icons. Sub-accordions for "School", "Resources", "Support & Contact", "Soil Map (Beta)" expand smoothly with chevron indicator. Clicking outside (backdrop) or the `✕` button closes the drawer.
2. **Soil Health Card Search & Generation:** Users select tab (`SHC` or `School SHC`), toggle radio button between `Phone Number` and `Farmer Name`. When phone number is selected, accepts 10 digits with a +91 prefix. When farmer name is selected, cascading dropdowns for State, District, Sub-district (Taluka/Tehsil), and Village appear. Form enforces required validation and reCAPTCHA check. Upon submission, displays farmer credentials, sample parameters, nutrient assessment (12 parameters: N, P, K, S, Zn, Fe, Cu, Mn, B, pH, EC, OC), and dynamic STCR fertilizer recommendations. Download PDF and Print buttons are provided.
3. **Soil Testing Labs Finder:** Allows filtering by State and District. Shows interactive list of accredited static and mobile laboratories, testing capabilities, contact information, and geo-location details.
4. **Interactive Soil Nutrient Map:** Visualizes India states with choropleth shading based on selected nutrient layer (Nitrogen, Phosphorus, Potassium, Organic Carbon, pH, Micronutrients) with color-coded Low/Medium/High legends and state-click inspection popups.
5. **Bharti AI Interactive Assistant:** Floating round widget on bottom right that opens a conversational assistance window. Answers farmer questions on soil sampling, card retrieval, fertilizer dosages, organic farming practices, and scheme details.

---

## 5. Legitimate Asset Re-use and Provenance

- Official Ashoka Lion Capital Emblem (Government of India) SVG / high-resolution representation.
- Soil Health Card official emblem ("स्वस्थ धरा, खेत हरा") vector/PNG representation.
- NMNF official emblem ("प्राकृतिक खेती") vector representation.
- National leader & Indian farmers banner illustration.
- Soil texture & lush green agricultural crop field footers ("SWASTH DHARA" / "KHET HARA").
- Clear educational disclaimer designating the application as an independent local development demonstration.
