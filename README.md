# Rosário Vivo (Living Rosary)

> Catholic spiritual platform to track daily Rosary practice, learn the Mysteries, and grow in prayer with a community.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)

## 🎯 Mission & Purpose

**Rosário Vivo exists to help Catholics pray the Rosary faithfully, learn its mysteries deeply, and live a daily life of prayer and charity in communion with the Universal Church.**

### Our Vision

The Rosary is not merely a devotional practice—it is a meditation on the life of Christ through the eyes of His Mother. By contemplating the mysteries of Christ's life, death, and resurrection, we draw closer to God and fulfill the Church's mission to evangelize, sanctify, and serve.

This platform seeks to:

1. **Foster fidelity in prayer** — Equip believers to pray the Rosary daily with consistency, reverence, and understanding.
2. **Provide formation in the faith** — Offer clear, faithful teaching rooted in Scripture, Tradition, and the Magisterium.
3. **Build communion in prayer** — Unite Catholics worldwide in shared devotion, intercession, and spiritual encouragement.

### Rooted in Scripture and Tradition

- **Mary's mission**: "Blessed are you among women, and blessed is the fruit of your womb" (Luke 1:42)
- **Christ entrusts Mary to the Church**: "Behold, your mother" (John 19:27)
- **The call to constant prayer**: "Pray without ceasing" (1 Thessalonians 5:17)
- **The Rosary as meditation on Christ**: *Catechism of the Catholic Church* 971, 2678

### Guided by the Saints

> "The Rosary is the 'weapon' for these times."  
> — **St. Padre Pio**

> "Give me an army saying the Rosary and I will conquer the world."  
> — **Blessed Pope Pius IX**

> "The Rosary is the book of the blind, where souls see and there enact the greatest drama of love the world has ever known; it is the book of the simple, which initiates them into mysteries and knowledge more satisfying than the education of other men."  
> — **Venerable Fulton J. Sheen**

> "Never will anyone who says his Rosary every day be led astray. This is a statement that I would gladly sign with my blood."  
> — **St. Louis de Montfort**

> "The greatest method of praying is to pray the Rosary."  
> — **St. Francis de Sales**

### The Church's Mission

The Second Vatican Council teaches that all the faithful are called to holiness and to participate in the Church's evangelizing mission (*Lumen Gentium* 40-41). The Rosary serves as a practical means to:

- **Evangelize** — Share the Gospel through witness and prayer
- **Sanctify** — Grow in holiness through contemplation of Christ
- **Serve** — Intercede for the needs of the world and the Church

**Rosário Vivo** is a small but earnest response to this universal call—a digital tool to help modern Catholics live their faith more deeply in a distracted world.

## ✨ Highlights

### Available Today
- **Daily Check-ins** with mystery selection
- **Streak Tracking** for prayer consistency
- **Educational Content** on the Rosary, Mysteries, and history
- **Traditional Prayers** (full texts)

### In Progress
- **Interactive Rosary Guide** with timer and steps
- **Spiritual Journal** for intentions and reflections
- **Resource Library** (PDFs, documents)
- **Community Feed** for sharing and praying together

## 📁 Project Structure

```
├── frontend/               # Next.js (App Router)
│   ├── src/
│   │   ├── app/            # Pages
│   │   ├── components/     # UI components
│   │   ├── services/       # API client
│   │   └── hooks/          # Custom hooks
│   └── Dockerfile
│
├── backend/                # NestJS API
│   ├── src/
│   │   └── modules/
│   │       ├── auth/       # JWT auth
│   │       ├── users/      # User management
│   │       ├── checkins/   # Prayer check-ins
│   │       └── prayers/    # Prayer requests
│   ├── docker/             # Mongo init scripts
│   └── Dockerfile
│
├── docker-compose.yml      # Local dev
└── docker-compose.prod.yml # Production
```

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js 20+
- pnpm 10+
- Docker & Docker Compose

### 1) Install dependencies

```bash
pnpm install
```

### 2) Start MongoDB

```bash
docker-compose up -d mongodb
```

### 3) Run the apps

```bash
# Terminal 1
pnpm --filter backend start:dev

# Terminal 2
pnpm --filter frontend dev
```

### 4) Access

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| API | http://localhost:3001/api |
| Swagger | http://localhost:3001/api/docs |

## 🐳 Docker

### Local (full stack)

```bash
docker-compose up -d --build
```

### Production

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

## ☁️ Coolify Deployment

1. Create a **Docker Compose** resource in Coolify
2. Point it to `docker-compose.prod.yml`
3. Configure environment variables
4. Map domains:

| Service | Domain | Port |
|---------|--------|------|
| Frontend | yourdomain.com | 3000 |
| Backend | api.yourdomain.com | 3001 |

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

> ⚠️ Use strong passwords and never commit `.env` files.

## 📡 API Reference (Summary)

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |

### Check-ins
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/checkins` | Create check-in |
| GET | `/api/checkins/feed` | Community feed |
| GET | `/api/checkins/today` | Today's check-in |
| GET | `/api/checkins/my` | User history |
| POST | `/api/checkins/:id/amen` | Toggle Amen |
| POST | `/api/checkins/:id/comments` | Add comment |

### Prayer Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/prayers` | Create request |
| GET | `/api/prayers` | List requests |
| POST | `/api/prayers/:id/pray` | Mark praying |
| POST | `/api/prayers/:id/answered` | Mark answered |
| GET | `/api/prayers/testimonials` | Testimonials |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get profile |
| PUT | `/api/users/me` | Update profile |
| GET | `/api/users/me/stats` | Get stats |

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16, TypeScript, Tailwind CSS, TanStack Query |
| **Backend** | NestJS 10, Mongoose, Passport JWT, Swagger |
| **Database** | MongoDB 7 |
| **Deployment** | Docker, Coolify |

## 🔒 Security Checklist

- [ ] Set `JWT_SECRET` to a 32+ character secret
- [ ] Use strong MongoDB credentials
- [ ] Enable HTTPS in production
- [ ] Keep dependencies updated
- [ ] Never commit `.env` files

## 📄 License

MIT © 2024
