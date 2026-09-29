<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="110" alt="NestJS Logo" /></a>
</p>

<h1 align="center">StudyMate API</h1>

<p align="center">
  RESTful API backend built with <b>NestJS</b> and <b>TypeScript</b>.<br/>
  <i>Current Status: Environment Setup, Routing, Middleware & JWT Authentication (Lab 1 & Lab 2)</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-%3E%3D22.x-339933?logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/NestJS-v12.0-EA2845?logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-v6.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Test-Vitest-6E9F18?logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/License-UNLICENSED-lightgrey" alt="License" />
</p>

---

## 📖 Overview

**StudyMate API** is the backend service for the *Smart Study Group & Room Booking System*. At the current stage of development, the project focuses on configuring the **NestJS** environment and implementing core RESTful concepts: **Controllers (Routing)**, **Services**, **Custom Middleware**, and **JWT-based Authentication**.

---

## ✨ Implemented Features

- **🚀 RESTful API Foundation (Lab 1):**
  - Initialized with **NestJS v12** and **TypeScript (ESM)**.
  - Root endpoint (`GET /`) returning `"Hello World!"`.
- **🔐 JWT Login Service (Lab 2):**
  - `POST /login` endpoint that validates `userName` and client-hashed `password` (MD5) against the `User` data model (`IdUser`, `UserName`, `Password`, `Token`).
  - Generates and signs a **JSON Web Token (JWT)** with a 1-hour expiration using `@nestjs/jwt`.
- **🛡️ Custom Authentication Middleware (Lab 2):**
  - `AuthMiddleware` intercepts incoming requests, extracts the `Authorization: Bearer <token>` header, verifies token integrity, and attaches the decoded payload to `req.user`.
  - Applied to protect both `GET /` and `GET /auth`.
- **✅ Token Verification Endpoint (Lab 2):**
  - `GET /auth` endpoint returning the authenticated user payload decoded from the JWT.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [NestJS v12](https://nestjs.com/) (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`) |
| **Language** | [TypeScript v6](https://www.typescriptlang.org/) |
| **Authentication** | `@nestjs/jwt` (JSON Web Token) |
| **Testing** | Vitest, Supertest (`@nestjs/testing`) |
| **Code Quality** | Oxlint, Prettier |

---

## 📋 Prerequisites

Ensure the following tools are installed on your local machine:

- **Node.js:** `>= 22.22.3` or `>= 24.x`
- **npm:** `>= 10.x`
- **Postman:** *(Recommended for testing API endpoints)*

---

## ⚙️ Installation & Configuration

### 1. Clone the repository & install dependencies

```bash
git clone <your-repository-url>
cd Project
npm install
```

### 2. Environment Variables (`.env.example`)

By default, the application runs on port `3000` with a preconfigured JWT secret. You can optionally create a `.env` file in the root directory:

```dotenv
PORT=3000
JWT_SECRET=secret-key-12345
JWT_EXPIRES_IN=1h
```

---

## 🚀 Running the Project

```bash
# Development mode
npm run start

# Watch mode (auto-reload on file changes)
npm run start:dev

# Debug mode
npm run start:debug

# Build for production
npm run build

# Run compiled production build
npm run start:prod
```

Once started, the server listens at: `http://localhost:3000`

---

## 🧪 Running Tests

```bash
# Run unit tests (Vitest)
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run end-to-end (E2E) tests
npm run test:e2e

# Generate test coverage report
npm run test:cov

# Lint source files
npm run lint
```

---

## 📂 Folder Structure (`src/`)

```text
src/
├── auth/
│   ├── auth.controller.ts      # Handles POST /login and GET /auth
│   ├── auth.middleware.ts      # Verifies Bearer JWT token on protected routes
│   ├── auth.module.ts          # Configures JwtModule and exports AuthMiddleware
│   └── auth.service.ts         # Validates user credentials & issues JWT tokens
├── app.controller.spec.ts      # Unit tests for AppController
├── app.controller.ts           # Handles GET / ("Hello World!")
├── app.module.ts               # Root module & MiddlewareConsumer configuration
├── app.service.ts              # Root service logic
└── main.ts                     # Application entry point (listens on port 3000)
```

---

## 📡 API Documentation (Postman Guide)

**Base URL:** `http://localhost:3000`

### Endpoints Overview

| Method | Endpoint | Protected (`AuthMiddleware`) | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/login` | ❌ No | Authenticate user and issue a JWT token. |
| `GET` | `/auth` | ✅ Bearer Token | Verify JWT token and return decoded user info. |
| `GET` | `/` | ✅ Bearer Token | Return `"Hello World!"` if token is valid. |

### 1. Login to Get JWT Token (`POST /login`)

- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):** *(Default account: `admin` / MD5 of `admin`)*
```json
{
  "userName": "admin",
  "password": "21232f297a57a5a743894a0e4a801fc3"
}
```
- **Response (`200 OK`):**
```json
{
  "message": "Đăng nhập thành công",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Verify Token (`GET /auth`)

- **Headers:** `Authorization: Bearer <your-jwt-token>`
- **Response (`200 OK`):**
```json
{
  "message": "Xác thực token thành công",
  "user": {
    "userName": "admin",
    "sub": 1,
    "iat": 1759125600,
    "exp": 1759129200
  }
}
```

### 3. Access Protected Hello World (`GET /`)

- **Headers:** `Authorization: Bearer <your-jwt-token>`
- **Response (`200 OK`):**
```text
Hello World!
```
*(Returns `401 Unauthorized` if the `Authorization` header is missing or invalid).*

---

## 👨‍💻 Author & License

- **Team:** StudyMate Team — Service-Oriented Architecture (SOA) Course
- **License:** This project is **UNLICENSED** and intended for educational purposes.
