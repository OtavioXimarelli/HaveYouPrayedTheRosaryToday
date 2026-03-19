# Rosário Vivo

> Catholic spiritual platform to track daily Rosary practice, learn the Mysteries, and grow in prayer.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-purple?logo=pwa)](https://web.dev/progressive-web-apps/)

---

## Mission

**Rosário Vivo exists to help Catholics pray the Rosary faithfully, learn its mysteries deeply, and live a daily life of prayer and charity in communion with the Universal Church.**

> "Never will anyone who says his Rosary every day be led astray. This is a statement that I would gladly sign with my blood."  
> — **St. Louis de Montfort**

> "The Rosary is the 'weapon' for these times."  
> — **St. Padre Pio**

---

## ✨ What's Available

### Prayer & Tracking
- **Daily check-in** — log your prayer with Mystery selection, intentions, and reflection
- **Personal history** — weekly calendar and timeline of completed prayers
- **Streak tracking** — monitor your prayer consistency over time
- **Mystery of the day** — automatic rotation (Joyful/Sorrowful/Glorious/Luminous) with Scripture references

### Content & Formation
- **How to Pray** — complete step-by-step prayer guide
- **Traditional Prayers** — full texts (Hail Mary, Our Father, Glory Be, Hail Holy Queen, and more)
- **Teachings** — library covering Scripture, Theology, History, Mary, Sacraments, Saints, and Prayers
- **Learning Paths** — Beginner, Intermediate, and Advanced tracks with progressive lessons
- **Resource Library** — papal documents, writings of saints, and curated external links
- **Tools** — novena calculator and rosary bead counter

### Design & Experience
- Persistent **dark/light theme** — "Cathedral Night" and "Sacred Cream"
- Design system: sacred glassmorphism, metallic gold, Cinzel + Manrope typography
- Installable PWA (service worker + manifest)
- Fully responsive — mobile-first

---

## 🗂 Project Structure

```
rosario-vivo/
├── frontend/               # Next.js 16 (App Router)
│   ├── src/
│   │   ├── app/            # Pages and routes
│   │   │   ├── dashboard/        # User dashboard
│   │   │   ├── ensinamentos/     # Content library
│   │   │   ├── misterios-do-dia/ # Daily mysteries
│   │   │   ├── oracoes-tradicionais/
│   │   │   ├── como-rezar/
│   │   │   ├── recursos/
│   │   │   └── ferramentas/
│   │   ├── components/     # Reusable UI components
│   │   ├── providers/      # AuthProvider, ThemeProvider, QueryProvider
│   │   ├── services/       # API client + mock data (localStorage)
│   │   ├── hooks/          # use-rosary, use-toast
│   │   └── types/
│   └── Dockerfile
│
├── backend/                # NestJS 10
│   ├── src/modules/
│   │   ├── auth/           # JWT + Passport
│   │   ├── users/          # User management
│   │   ├── checkins/       # Prayer check-ins
│   │   └── prayers/        # Prayer intentions
│   └── Dockerfile
│
├── compose.yaml            # Base services shared by all environments
├── compose.dev.yaml        # Development overrides + mongo-express profile
├── compose.prod.yaml       # Production overrides
├── docker-compose.prod.yml # Legacy production compose (Coolify-compatible)
└── pnpm-workspace.yaml     # Monorepo
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 10+
- Docker & Docker Compose

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run the full stack (recommended)

```bash
pnpm dev
```

Or separately:

```bash
# Terminal 1 — Backend + MongoDB
docker compose -f compose.yaml -f compose.dev.yaml up -d mongodb
pnpm dev:backend

# Terminal 2 — Frontend
pnpm dev:frontend
```

### 3. Access

| Service  | URL                            |
|----------|--------------------------------|
| Frontend | http://localhost:3000          |
| API      | http://localhost:3001/api      |
| Swagger  | http://localhost:3001/api/docs |

> **MVP note**: `AUTH_DISABLED=true` is active in the frontend — all features are unlocked without requiring login. To enable the full auth flow, toggle the flag in `src/providers/auth-provider.tsx`.

---

## 🐳 Docker

```bash
# Local dev (full stack)
pnpm docker:dev

# Production
pnpm docker:prod

# Stop local dev stack
pnpm docker:down

# Stop production stack
pnpm docker:down:prod
```

---

## ☁️ Coolify Deployment

1. Create a **Docker Compose** resource in Coolify
2. Point it to `docker-compose.prod.yml` (legacy) or use `compose.yaml` + `compose.prod.yaml` if your Coolify setup supports multiple files
3. Configure environment variables
4. Map domains:

| Service  | Domain             | Port |
|----------|--------------------|------|
| Frontend | yourdomain.com     | 3000 |
| Backend  | api.yourdomain.com | 3001 |

### Required Environment Variables

```env
# MongoDB
MONGO_ROOT_USER=rosary_admin
MONGO_ROOT_PASSWORD=<secure-password>

# Auth
JWT_SECRET=<min-32-character-secret>

# URLs
FRONTEND_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

> ⚠️ Never commit `.env` files. Use strong passwords in production.

---

## 📡 API Reference

### Authentication
| Method | Endpoint             | Description    |
|--------|----------------------|----------------|
| POST   | `/api/auth/register` | Create account |
| POST   | `/api/auth/login`    | Login          |

### Check-ins
| Method | Endpoint                 | Description      |
|--------|--------------------------|------------------|
| POST   | `/api/checkins`          | Record a prayer  |
| GET    | `/api/checkins/today`    | Today's check-in |
| GET    | `/api/checkins/my`       | Personal history |
| GET    | `/api/checkins/feed`     | Community feed   |
| POST   | `/api/checkins/:id/amen` | Toggle Amen      |

### Prayer Intentions
| Method | Endpoint                    | Description        |
|--------|-----------------------------|--------------------|
| POST   | `/api/prayers`              | Create intention   |
| GET    | `/api/prayers`              | List intentions    |
| POST   | `/api/prayers/:id/pray`     | Mark as prayed for |
| POST   | `/api/prayers/:id/answered` | Mark as answered   |

### User
| Method | Endpoint              | Description    |
|--------|-----------------------|----------------|
| GET    | `/api/users/me`       | Get profile    |
| PUT    | `/api/users/me`       | Update profile |
| GET    | `/api/users/me/stats` | Get stats      |

---

## 🛠 Tech Stack

| Layer        | Technology                                     |
|--------------|------------------------------------------------|
| **Frontend** | Next.js 16, TypeScript, Tailwind CSS, Radix UI |
| **State**    | TanStack Query v5, localStorage (MVP)          |
| **Backend**  | NestJS 10, Mongoose, Passport JWT, Swagger     |
| **Database** | MongoDB 7                                      |
| **Deploy**   | Docker, Coolify                                |
| **PWA**      | next-pwa, Workbox                              |

---

## 🗺 Roadmap

### MVP — In progress (`feat/frontend-mvp`)
- [x] Daily check-in with Mystery selection and intentions
- [x] Dashboard with personal history and weekly calendar
- [x] Full teachings library (7 topics + 3 learning paths)
- [x] Traditional prayers and prayer guide
- [x] Design system: glassmorphism, dark/light theme, animations
- [x] Installable PWA
- [x] `AUTH_DISABLED` feature flag for login-free MVP

### Next phases
- [ ] Full authentication (register, login, profile)
- [ ] Backend persistence (replace localStorage)
- [ ] Community feed and shared intentions
- [ ] Interactive prayer guide with timer and steps
- [ ] Spiritual reflection journal
- [ ] Push notification reminders
- [ ] Full offline mode
- [ ] Rosary bead animation during prayer

---

## 📖 Content Sources

All religious content is based on official sources:

- **Holy See (Vatican)**: [vatican.va/special/rosary](https://www.vatican.va/special/rosary/)
- **Rosarium Virginis Mariae** — Pope Saint John Paul II (October 16, 2002)
- **Catechism of the Catholic Church** — §971, §2678
- **CNBB** — Brazilian Portuguese translations

---

## 📄 License

MIT © 2026 Rosário Vivo
