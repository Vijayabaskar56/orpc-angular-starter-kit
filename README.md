# ORPC Angular Full e2e TypeScript Starter Kit

Inspired by [Better T Stack](https://better-t-stack.dev/)

This repository is a modern, full-stack TypeScript starter kit featuring:
- **Angular 20+** frontend (standalone components, TanStack Query, Tailwind CSS)
- **Fastify** backend (TypeScript, Bun runtime, ORPC, MongoDB)
- **Authentication** (better-auth)
- **Todo CRUD** (with ORPC, Zod validation, MongoDB)
- **AI endpoint** (Google Gemini via ai-sdk)
- **Monorepo** managed with Bun workspaces

---

## Monorepo Structure

```
.
├── apps/
│   ├── web/      # Angular frontend
│   └── server/   # Fastify backend (Bun, ORPC, MongoDB)
├── package.json  # Bun workspaces, turbo scripts
└── bun.lock      # Bun lockfile
```

---

## Quick Start

### Prerequisites
- [Bun](https://bun.sh/) (v1.2+)
- [Node.js](https://nodejs.org/) (for Angular CLI)
- [MongoDB](https://www.mongodb.com/) (local or remote)

### 1. Install dependencies
```bash
bun install
```

### 2. Start the backend (Fastify/ORPC)
```bash
bun run --cwd apps/server dev
# or from root:
bun run dev:server
```
- Runs on [http://localhost:3000](http://localhost:3000)
- Endpoints:
  - `/rpc` (ORPC API)
  - `/api/auth/*` (Authentication)
  - `/ai` (AI streaming)

### 3. Start the frontend (Angular)
```bash
bun run --cwd apps/web dev
# or from root:
bun run dev:web
```
- Runs on [http://localhost:3001](http://localhost:3001)

---

## Features
- **Authentication**: Email/password via better-auth
- **Todo CRUD**: Add, toggle, delete todos (MongoDB, Zod validation)
- **AI Endpoint**: `/ai` for streaming text (Google Gemini)
- **Modern Angular**: Standalone components, TanStack Query, Tailwind CSS, RxJS, signals
- **Type-safe API**: ORPC for end-to-end typesafety
- **Theming**: Light/dark/system mode

---

## Scripts

From the root:
- `bun run dev`         # Start all apps in dev mode (turbo)
- `bun run dev:web`     # Start Angular frontend
- `bun run dev:server`  # Start Fastify backend
- `bun run build`       # Build all apps

From each app directory:
- `bun run dev`         # Start in dev mode
- `bun run build`       # Build app
- `bun run test`        # Run tests (Angular only)

---

## Environment
- Angular config: `apps/web/src/environments/enviroments.ts`
- Backend config: `.env` (see `apps/server/src/index.ts` for CORS, MongoDB, etc.)

---

## Example Usage

### Angular (apps/web)
- Auth: `AuthService` (`src/services/auth.service.ts`)
- Todos: `TodoService` (`src/services/todo.service.ts`)
- ORPC: `ORPCService` (`src/services/orpc.service.ts`)
- Theming: `ThemeService` (`src/services/theme.service.ts`)

### Backend (apps/server)
- Main entry: `src/index.ts`
- Routers: `src/routers/`
- Models: `src/db/models/`

---

## License
MIT
