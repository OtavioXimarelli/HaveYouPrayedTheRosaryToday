# 🙏 Have You Prayed the Rosary Today?

> A community-driven prayer tracking app that helps Catholics maintain their daily Rosary practice with streaks, reflections, and social features.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)

## ✨ Features

- **Daily Check-ins** - Log your Rosary prayers with mystery selection
- **Streak Tracking** - Maintain and visualize your prayer consistency
- **Community Feed** - Share reflections and support others with "Amen"
- **Prayer Requests** - Post intentions and mark answered prayers
- **Testimonials** - Share graces received with the community

## 📁 Project Structure

```
├── frontend/              # Next.js 14 (React)
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # UI components
│   │   ├── services/     # API client
│   │   └── hooks/        # Custom React hooks
│   └── Dockerfile
│
├── backend/               # NestJS API
│   ├── src/
│   │   └── modules/
│   │       ├── auth/     # JWT authentication
│   │       ├── users/    # User management
│   │       ├── checkins/ # Prayer check-ins
│   │       └── prayers/  # Prayer requests
│   ├── docker/           # MongoDB init scripts
│   └── Dockerfile
│
├── docker-compose.yml      # Local development
└── docker-compose.prod.yml # Production deployment
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose

### 1. Clone and Install

```bash
git clone https://github.com/your-username/HaveYouPrayedTheRosaryToday.git
cd HaveYouPrayedTheRosaryToday

# Install all dependencies
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

### 2. Start MongoDB

```bash
cd backend
docker-compose up -d
```

### 3. Run the Application

**Backend** (Terminal 1):
```bash
cd backend
npm run start:dev
```

**Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

### 4. Access

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| API | http://localhost:3001/api |
| Swagger Docs | http://localhost:3001/api/docs |
| Mongo Express | http://localhost:8081 |

---

## 🐳 Docker Deployment

### Local (Full Stack)

```bash
docker-compose up -d --build
```

### Production

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## ☁️ Coolify Deployment

[Coolify](https://coolify.io) is a self-hosted PaaS alternative to Heroku/Vercel.

### Step-by-Step Guide

1. **Create Project** in Coolify Dashboard

2. **Add Resource** → Select **Docker Compose**

3. **Connect Repository** → Your Git repo

4. **Configure:**
   - Compose file: `docker-compose.prod.yml`
   - Add environment variables (see below)

5. **Set Domains:**
   | Service | Domain | Port |
   |---------|--------|------|
   | Frontend | `yourdomain.com` | 3000 |
   | Backend | `api.yourdomain.com` | 3001 |

6. **Enable SSL** → Let's Encrypt

### Required Environment Variables

```env
# MongoDB
MONGO_ROOT_USER=rosary_admin
MONGO_ROOT_PASSWORD=<secure-password>
MONGO_APP_USER=rosary_user
MONGO_APP_PASSWORD=<secure-password>

# Authentication
JWT_SECRET=<min-32-character-secret>

# URLs
FRONTEND_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

> ⚠️ **Security:** Always use strong, unique passwords in production.

---

## 📡 API Reference

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
| GET | `/api/checkins/my` | User's history |
| POST | `/api/checkins/:id/amen` | Toggle Amen |
| POST | `/api/checkins/:id/comments` | Add comment |

### Prayer Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/prayers` | Create request |
| GET | `/api/prayers` | List requests |
| POST | `/api/prayers/:id/pray` | Mark praying |
| POST | `/api/prayers/:id/answered` | Mark answered |
| GET | `/api/prayers/testimonials` | View testimonials |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get profile |
| PUT | `/api/users/me` | Update profile |
| GET | `/api/users/me/stats` | Get statistics |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS, TanStack Query |
| **Backend** | NestJS 10, Mongoose, Passport JWT, Swagger |
| **Database** | MongoDB 7.0 |
| **Deployment** | Docker, Coolify |

---

## 🔒 Security Checklist

- [ ] Change `JWT_SECRET` to a unique 32+ character string
- [ ] Use strong MongoDB passwords
- [ ] Enable HTTPS in production
- [ ] Keep dependencies updated
- [ ] Never commit `.env` files

---

## 📄 License

MIT © 2024
