<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="110" alt="NestJS Logo" /></a>
</p>

<h1 align="center">StudyMate API — Smart Study Group & Room Booking System</h1>

<p align="center">
  A scalable, modular RESTful API built with <b>NestJS</b> and <b>TypeScript</b> that connects university students with compatible study partners and automates campus study room reservations.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-%3E%3D22.x-339933?logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/NestJS-v12.0-EA2845?logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-v6.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/License-UNLICENSED-lightgrey" alt="License" />
</p>

---

## 📖 Overview

Finding compatible study partners and securing an available study room on campus are two frequent challenges for students, often handled through fragmented chat groups or manual room checks.

**StudyMate** solves this problem by unifying both workflows into a seamless, automated pipeline:
> **Find Compatible Partners → Form a Study Group → Auto-Suggest Optimal Rooms → Book a Study Room**

---

## ✨ Key Features

- **🔐 Authentication & Student Profiles (Epic 1):**
  - Stateless authentication & route protection using **JWT (`@nestjs/jwt`)** and custom NestJS Middleware/Guards.
  - Role-Based Access Control (**RBAC**) for **Students** and **Admins (Room Managers)**.
  - Academic profile management (faculty, class, enrolled courses, study goals, and weekly free-time slots).
- **🤝 Smart Partner Matching (Epic 2):**
  - Multi-criteria partner search (by course, study target, and schedule).
  - Rule-based **Match Score Algorithm** that ranks compatibility based on shared courses, academic goals, and overlapping availability.
- **👥 Study Group Management (Epic 3):**
  - Create and manage study groups, send/accept peer invitations, manage group members, and schedule study sessions.
- **🏫 Room Management & Dual-Flow Booking (Epic 4):**
  - Complete CRUD operations for campus rooms, schedule management, and conflict-free availability checks.
  - **Flow 1 — Direct Booking:** Students or existing groups manually search and reserve available rooms.
  - **Flow 2 — Auto-Suggested Booking:** One-click booking from system-recommended rooms after group formation.
- **⚡ Smart Room Suggestion, Dashboard & Notifications (Epic 5):**
  - Automated room recommendation engine matching group headcount and mutual free time.
  - Admin analytics dashboard (room utilization rates, booking statistics) and real-time schedule reminders.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [NestJS v12](https://nestjs.com/) (Node.js, Express platform) |
| **Language** | [TypeScript v6](https://www.typescriptlang.org/) (ESM) |
| **Database** | PostgreSQL / SQL Server |
| **ORM** | TypeORM / Prisma |
| **Authentication** | JSON Web Token (`@nestjs/jwt`), Custom Middleware |
| **Real-time** | WebSockets (`@nestjs/websockets` / Socket.io) |
| **Testing & Linting** | Vitest, Supertest, Oxlint, Prettier |
| **DevOps & Tools** | Docker, Docker Compose, Swagger (`@nestjs/swagger`), Git |

---

## 📋 Prerequisites

Ensure you have the following installed on your local machine before setting up the project:

- **Node.js:** `>= 22.22.3` or `>= 24.x` (LTS recommended)
- **Package Manager:** `npm >= 10.x` (or `pnpm` / `yarn`)
- **Database:** `PostgreSQL >= 15.x` (or running via Docker)
- **Docker & Docker Compose:** *(Optional, for containerized execution)*

---

## ⚙️ Installation & Environment Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Example `.env.example` configuration:

```dotenv
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=studymate_db

# JWT Authentication
JWT_SECRET=secret-key-12345
JWT_EXPIRES_IN=1h
```

---

## 🚀 Running the Application

### Local / Development Mode

```bash
# Start in standard development mode
npm run start

# Start in watch mode (hot-reload enabled)
npm run start:dev

# Start in debug mode
npm run start:debug
```

### Production Mode

```bash
# Build the application to ./dist
npm run build

# Run the compiled production bundle
npm run start:prod
```

### Running with Docker

```bash
# Build and start containers in detached mode
docker compose up -d --build

# View application logs
docker compose logs -f api

# Stop containers
docker compose down
```

---

## 🧪 Running Tests

This project uses **Vitest** and **Supertest** for fast unit and end-to-end (E2E) testing:

```bash
# Run unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run end-to-end (E2E) tests
npm run test:e2e

# Generate test coverage report
npm run test:cov

# Run linter (Oxlint)
npm run lint
```

---

## 📂 Project Structure (`src/`)

```text
src/
├── auth/                         # Authentication & JWT Security Module (Epic 1)
│   ├── auth.controller.ts        # Login & token verification endpoints
│   ├── auth.middleware.ts        # JWT Bearer token verification middleware
│   ├── auth.module.ts            # Auth module & JwtModule configuration
│   └── auth.service.ts           # Credential validation & JWT signing logic
├── users/                        # (Planned) Student profiles & schedule management
├── matching/                     # (Planned) Partner search & Match Score algorithm (Epic 2)
├── groups/                       # (Planned) Study group CRUD & invitations (Epic 3)
├── rooms/                        # (Planned) Campus room CRUD & availability (Epic 4)
├── bookings/                     # (Planned) Direct & auto-suggested room booking (Epic 4 & 5)
├── notifications/                # (Planned) Real-time alerts & reminders (Epic 5)
├── common/                       # (Planned) Shared decorators, filters, guards, DTOs
├── app.controller.spec.ts        # Root controller unit tests
├── app.controller.ts             # Root health-check / Hello World controller
├── app.module.ts                 # Root application module & middleware consumer
├── app.service.ts                # Root application service
└── main.ts                       # Application entry point & bootstrapper
```

---

## 📡 API Documentation

### Swagger UI & Postman
- **Base URL (Local):** `http://localhost:3000`
- **Swagger UI (Planned):** `http://localhost:3000/api/docs`
- **Postman Testing:** Import endpoints below or set `Authorization: Bearer <token>` header for protected routes.

### Currently Implemented Endpoints (Lab 1 & Lab 2)

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/login` | ❌ No | Authenticate with `userName` and hashed `password` (MD5/Base64) to receive a JWT token. |
| `GET` | `/auth` | ✅ Bearer JWT | Verify JWT token validity via `AuthMiddleware` and return decoded user payload. |
| `GET` | `/` | ✅ Bearer JWT | Protected root endpoint returning `"Hello World!"`. |

#### Sample Login Request (`POST /login`)
```json
{
  "userName": "admin",
  "password": "21232f297a57a5a743894a0e4a801fc3"
}
```

#### Sample Login Response (`200 OK`)
```json
{
  "message": "Đăng nhập thành công",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 👨‍💻 Authors & Contributors

Developed by the **StudyMate Team** (5 Members) following the **Agile/Scrum** methodology across 3 Sprints:

- **Member A:** Epic 1 — Authentication & Student Profile
- **Member B:** Epic 2 — Partner Search & Match Score Algorithm
- **Member C:** Epic 3 — Study Group Management
- **Member D:** Epic 4 — Room Management & Booking System
- **Member E:** Epic 5 — Auto Room Suggestion, Dashboard & Notifications

---

## 📄 License

This project is developed for academic coursework (**Service-Oriented Architecture - SOA**) and is currently **UNLICENSED**.
