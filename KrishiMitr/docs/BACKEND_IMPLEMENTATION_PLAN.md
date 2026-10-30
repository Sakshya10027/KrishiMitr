# KrishiMitr — Backend Implementation Plan & Architectural Design

**Document Version:** 1.0.0  
**Status:** Approved for Implementation  
**Backend Directory:** `backend/`  
**Author:** Senior Full-Stack Software Engineer & Backend Architect  

---

## 1. Architectural Overview

The KrishiMitr backend is architected as a modular, layered REST API built with Node.js, Express, TypeScript, Zod, Prisma ORM, and PostgreSQL. It enforces strict separation of concerns:
- **Routes / Controllers:** Handle HTTP requests, extract parameters, enforce authorization, and invoke service methods.
- **Middleware:** Request validation (Zod), JWT authentication, role & geographic authorization, rate limiting, and centralized error handling.
- **Services:** Encapsulate core business logic, domain rules (STCR agronomic calculations), and external integrations.
- **Data Access:** Pure Prisma Client operations isolated within services and repositories.
- **Utils:** Standardized API response format, pagination helpers, custom error classes, and CSV/PDF exporters.

---

## 2. Directory Structure

```
KrishiMitr/
├── backend/
│   ├── src/
│   │   ├── app.ts                 # Express application initialization & middleware
│   │   ├── server.ts              # HTTP server entrypoint & graceful shutdown
│   │   ├── config/
│   │   │   ├── env.ts             # Strongly-typed environment variables via Zod
│   │   │   ├── database.ts        # Prisma client singleton
│   │   │   └── cors.ts            # CORS origin policies
│   │   ├── middleware/
│   │   │   ├── authenticate.ts    # JWT token verification
│   │   │   ├── authorize.ts       # Role & scope-based access control
│   │   │   ├── validate.ts        # Zod schema validation middleware
│   │   │   ├── errorHandler.ts    # Global error handler & not-found handler
│   │   │   ├── rateLimiter.ts     # Throttling for sensitive endpoints
│   │   │   └── requestLogger.ts   # Structured request logging
│   │   ├── modules/
│   │   │   ├── auth/              # Registration, login, tokens, password recovery
│   │   │   ├── users/             # User management & profile operations
│   │   │   ├── locations/         # States, districts, blocks, villages hierarchy
│   │   │   ├── laboratories/      # Soil testing labs directory & geospatial search
│   │   │   ├── soil-health-cards/ # SHC creation, search, issuance, lifecycle
│   │   │   ├── soil-tests/        # 12-parameter lab test recording
│   │   │   ├── fertilizer/        # ICAR-STCR recommendation engine
│   │   │   ├── analytics/         # Progress stats, cycle metrics, CSV export
│   │   │   ├── nutrient-maps/     # Spatial fertility layers & district summaries
│   │   │   ├── resources/         # Circulars, SOPs, FAQs & document downloads
│   │   │   ├── support/           # Helpdesk tickets & comments
│   │   │   ├── assistant/         # Bharti AI chat integration with provider abstraction
│   │   │   └── admin/             # Privileged management & audit log views
│   │   ├── services/
│   │   │   ├── pdf/               # Vector PDF generation for Soil Health Cards
│   │   │   └── csv/               # Safe CSV generation & formula-injection sanitization
│   │   ├── utils/
│   │   │   ├── apiResponse.ts     # Standardized JSON response envelope
│   │   │   ├── errors.ts          # Custom AppError subclasses
│   │   │   └── pagination.ts      # Pagination query parsing & metadata
│   │   └── tests/                 # Vitest / Supertest unit & integration suites
│   ├── prisma/
│   │   ├── schema.prisma          # Normalized PostgreSQL relational schema
│   │   └── seed.ts                # Idempotent database seeding script
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── Dockerfile
├── docker-compose.yml             # Local PostgreSQL + Backend orchestration
├── docs/
└── src/                           # Frontend React 19 application
```

---

## 3. Database Schema Blueprint (Prisma)

### 3.1 Entities
1. **User:** `id`, `fullName`, `email`, `phone`, `passwordHash`, `role` (`FARMER`, `ADMIN`, `STATE_ADMIN`, `DISTRICT_ADMIN`, `LAB_OPERATOR`, `SCHOOL_ADMIN`, `RAWE_STUDENT`), `stateId`, `districtId`, `isActive`, `preferredLanguage`, `lastLoginAt`, timestamps.
2. **State:** `id`, `code`, `name`, `type` (`STATE` / `UT`).
3. **District:** `id`, `stateId`, `code`, `name`.
4. **SubDistrict (Block/Tehsil):** `id`, `districtId`, `name`.
5. **Village:** `id`, `subDistrictId`, `name`, `pincode`.
6. **Laboratory:** `id`, `name`, `laboratoryType` (`DISTRICT_STATIC`, `MOBILE_VAN`, `ICAR_KVK`, `UNIVERSITY_RESEARCH`), `stateId`, `districtId`, `address`, `postalCode`, `latitude`, `longitude`, `phone`, `email`, `accreditationStatus`, `supportedParameters`, `isActive`.
7. **SoilHealthCard:** `id`, `cardNumber` (unique), `sampleNumber` (unique), `farmerName`, `farmerPhone`, `farmerUserId`, `stateId`, `districtId`, `subDistrictId`, `villageId`, `khataNo`, `khasraNo`, `farmSizeHa`, `irrigationSource`, `soilType`, `laboratoryId`, `collectionDate`, `testingDate`, `issueDate`, `status` (`DRAFT`, `SAMPLE_COLLECTED`, `TESTING`, `COMPLETED`, `ISSUED`).
8. **SoilTestResult:** `id`, `cardId` (1:1), 12 parameters (`pH`, `EC`, `OC`, `N`, `P`, `K`, `S`, `Zn`, `Fe`, `Cu`, `Mn`, `B`) storing measured numeric value, unit, classification rating, and testing method.
9. **CropRecommendation:** `id`, `cardId`, `cropName`, `yieldTarget`, `fertilizers` (JSON array of basal/top-dress doses), `organicInputs`.
10. **Resource:** `id`, `title`, `description`, `category` (`SOP`, `CIRCULAR`, `TECHNICAL`, `COMPLIANCE`, `SCHOOL`), `language`, `fileUrl`, `fileSize`, `publicationDate`, `isActive`.
11. **SupportTicket:** `id`, `ticketNumber` (unique, e.g. `TKT-108291`), `userId`, `farmerName`, `phone`, `category`, `description`, `status` (`OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`), `priority`.
12. **TicketComment:** `id`, `ticketId`, `authorId`, `message`, `isInternal`, `createdAt`.
13. **AssistantConversation:** `id`, `userId`, `sessionToken`, `createdAt`.
14. **AssistantMessage:** `id`, `conversationId`, `sender` (`USER`, `ASSISTANT`), `message`, `language`, `citations`.
15. **AuditLog:** `id`, `actorId`, `actorRole`, `action`, `entityType`, `entityId`, `metadata` (JSON), `ipAddress`, `createdAt`.

---

## 4. Implementation Stages

### Stage 1: Backend Foundation & Database (Phases 2-4)
- Initialize `backend/` with `package.json`, TypeScript, Express, Helmet, CORS, and Pino logger.
- Define `schema.prisma` with all 15 relational entities and indexes.
- Create idempotent `seed.ts` containing accurate geographic reference data for 36 States/UTs, sample accredited laboratories, and demo accounts.
- Generate Prisma Client.

### Stage 2: Security & Authentication (Phase 5)
- Argon2 / bcrypt password hashing.
- JWT token generator and verify middleware (`authenticate`, `authorize`).
- Endpoints: Register, Login, Refresh, Me, Logout, Forgot Password, Reset Password.

### Stage 3: Core Domain Services (Phases 6-8)
- **Soil Health Cards:** Phone search, cascading geographic search, card lifecycle, and vector PDF generator.
- **Fertilizer Engine:** Tested ICAR-STCR calculation service for wheat, paddy, mustard, sugarcane.
- **Laboratories:** Filterable directory with distance calculation for coordinates.

### Stage 4: Analytics, Maps & Auxiliary Modules (Phases 9-13)
- **Analytics & Exports:** Aggregate queries for Cycle I/II, state/district progress, and sanitized CSV exports.
- **Nutrient Maps:** APIs for spatial macro/micronutrient parameters across states and districts.
- **Resources & Support:** Circulars library and ticketing system.
- **Bharti AI:** Provider abstraction with fallback agricultural FAQ responder.

### Stage 5: Frontend Service Integration (Phase 15)
- Create centralized API client in `src/services/apiClient.js` with `VITE_API_BASE_URL`.
- Wire `soilHealthService.js`, `labService.js`, `statsService.js`, `resourceService.js`, and Bharti AI to the backend.

### Stage 6: Testing & QA (Phase 18)
- Unit tests for STCR calculations, auth middleware, and validation.
- Integration tests using Supertest for REST endpoints.
- End-to-end frontend build verification (`npm run build`).
