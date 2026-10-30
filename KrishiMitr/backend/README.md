# KrishiMitr Backend Service

Enterprise-grade REST API backend for the KrishiMitr Soil Health Card Portal, developed with Node.js, Express, TypeScript, Zod, and Prisma ORM.

## Architecture & Technology Stack
- **Runtime:** Node.js & Express
- **Language:** TypeScript 5.x
- **Database:** PostgreSQL with Prisma ORM
- **Security:** Helmet, CORS allowlisting, Argon2/Bcrypt, JWT access/refresh token rotation, rate limiting
- **Validation:** Zod request schemas
- **Document Services:** Server-side Vector PDF generator for certified Soil Health Cards, sanitized CSV exports
- **AI Integration:** Bharti AI provider abstraction with localized agricultural knowledge fallback

## Quick Start

### 1. Start PostgreSQL
```bash
# From KrishiMitr root
docker-compose up -d postgres
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Setup Database Schema & Seed
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 4. Run Development Server
```bash
npm run dev
```
Backend runs at `http://localhost:4000/api/v1`.
Health check available at `http://localhost:4000/api/v1/health`.

### 5. Automated Tests
```bash
npm test
```
