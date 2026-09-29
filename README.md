<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" /></a>
</p>

<h1 align="center">NestJS RESTful API — StudyMate Service</h1>

<p align="center">
  A robust and scalable server-side application engineered with <b>NestJS</b>, <b>TypeScript</b>, and <b>RESTful Architecture</b>.<br/>
  Featuring <b>Dependency Injection</b>, <b>Modular Design</b>, <b>Custom Middleware</b>, and <b>JWT Security</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-v12.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS Version" />
  <img src="https://img.shields.io/badge/TypeScript-v6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-%3E%3D22.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Auth-JWT_Bearer-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT Auth" />
  <img src="https://img.shields.io/badge/Testing-Vitest_%26_Supertest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
</p>

---

## 🏛️ NestJS Architecture & Core Concepts

This project is built from the ground up leveraging the foundational pillars of the **NestJS** framework:

```text
Incoming Request
      │
      ▼
┌───────────────────────────────┐
│        AuthMiddleware         │  ◄── Implements NestMiddleware (verifies Bearer JWT)
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│          Controllers          │  ◄── Declarative Routing (@Controller, @Get, @Post, @Body)
│ (AppController / AuthController)
└──────────────┬────────────────┘
               │ (Dependency Injection via IoC Container)
               ▼
┌───────────────────────────────┐
│      Providers / Services     │  ◄── Business Logic (@Injectable: AuthService, AppService)
│   (AuthService / AppService)  │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│        External Modules       │  ◄── Dynamic Module Registration (JwtModule.register())
│          (JwtModule)          │
└───────────────────────────────┘
```

### 1. Modules (`@Module`)
- **`AppModule`**: The root module that orchestrates application dependencies and manages the global HTTP request lifecycle via `NestModule` and `MiddlewareConsumer`.
- **`AuthModule`**: A feature module encapsulating authentication concerns, registering the dynamic `JwtModule`, and exporting `JwtModule` and `AuthMiddleware` for consumption across the app.

### 2. Controllers & Routing (`@Controller`)
- **`AppController`**: Exposes the root health check route (`GET /`).
- **`AuthController`**: Declarative routing for user credentials verification (`POST /login` and `POST /`) and identity inspection (`GET /auth` & `POST /auth`).

### 3. Providers & Dependency Injection (`@Injectable`)
- Implements Inversion of Control (IoC). Dependencies like `JwtService` and `AuthService` are injected via class constructors, ensuring low coupling and high testability.

### 4. Custom Middleware (`NestMiddleware`)
- **`AuthMiddleware`**: Intercepts requests, validates the `Authorization: Bearer <token>` header against the secret key using `JwtService.verify()`, and injects the decoded payload into `req['user']`.
- Configured conditionally in `AppModule.configure()` using `consumer.apply(AuthMiddleware).forRoutes(...)`.

### 5. Built-in Exception Handling
- Throws standard NestJS HTTP exceptions (`UnauthorizedException`) mapped directly to appropriate HTTP status codes (`401 Unauthorized`) with standardized error JSON schemas.

---

## 📦 NestJS Ecosystem & Packages

| Package | Purpose in Project |
| :--- | :--- |
| **`@nestjs/core`** | NestJS core runtime, IoC container, and application lifecycle engine |
| **`@nestjs/common`** | Decorators (`@Module`, `@Controller`, `@Injectable`, `@Post`, `@Get`), HTTP abstractions, and exceptions |
| **`@nestjs/platform-express`** | Default HTTP adapter binding NestJS with Express |
| **`@nestjs/jwt`** | Official NestJS JWT utility wrapper around `jsonwebtoken` for signing and verifying tokens |
| **`@nestjs/cli`** | Command-line interface for scaffolding, building, and serving the app |
| **`@nestjs/testing`** | Utilities for bootstrapping isolated module fixtures during unit & E2E tests |

---

##  Project Structure (`src/`)

```text
src/
├── auth/                         # Feature Module: Authentication & JWT Security
│   ├── auth.controller.ts        # Route handlers for login & token introspection
│   ├── auth.middleware.ts        # Custom NestMiddleware verifying Bearer JWT
│   ├── auth.module.ts            # Nest module importing dynamic JwtModule
│   └── auth.service.ts           # Injectable provider handling credential checks & token signing
├── app.controller.spec.ts        # Unit test fixture for AppController
├── app.controller.ts             # Root controller exposing GET /
├── app.module.ts                 # Root module configuring MiddlewareConsumer
├── app.service.ts                # Injectable root service
└── main.ts                       # Application bootstrapper via NestFactory.create()
```

---

## ⚙️ Prerequisites & Setup

### Requirements
- **Node.js**: `>= 22.22.3` or `>= 24.x`
- **npm**: `>= 10.x`

### Installation
```bash
# Clone the repository
git clone <your-repository-url>
cd Project

# Install dependencies using npm
npm install
```

---

## 🚀 NestJS CLI Commands

### Development & Execution
```bash
# Start the NestJS application
npm run start

# Start with Watch Mode (Hot-reload enabled via Nest CLI)
npm run start:dev

# Start in Debug Mode
npm run start:debug

# Compile TypeScript to ./dist
npm run build

# Run the compiled production build
npm run start:prod
```

### Useful Nest CLI Scaffolding Commands
```bash
# Generate a new feature module
npx nest g module <module-name>

# Generate a new controller
npx nest g controller <controller-name>

# Generate a new service / provider
npx nest g service <service-name>
```

---

## 🧪 Testing with `@nestjs/testing`

The project utilizes `@nestjs/testing` together with **Vitest** and **Supertest** to execute isolated and E2E tests:

```bash
# Run unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run End-to-End (E2E) integration tests
npm run test:e2e

# Generate test coverage report
npm run test:cov
```

*Note: The test suite in `test/app.e2e-spec.ts` verifies middleware token interception, 401 guard responses, and successful JWT issuance.*

---

## 📡 API Endpoints Reference

**Base Server URL:** `http://localhost:3000`

| Method | Endpoint | Authorization | Request Body / Note |
| :--- | :--- | :---: | :--- |
| `POST` | `/login` *(or `/`)* | None | `{ "userName": "admin", "password": "..." }` → Returns `{ token }` |
| `GET` | `/auth` | `Bearer <token>` | Verifies JWT & returns decoded payload `{ user }` |
| `GET` | `/` | `Bearer <token>` | Returns `"Hello World!"` *(401 Unauthorized if token missing)* |

---

## 📄 License

This project is developed with the **NestJS** framework for educational purposes and is **UNLICENSED**.
