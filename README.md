# 🙏 Você Já Rezou o Terço Hoje?

A prayer tracking application with community features.

## Project Structure

```
├── frontend/          # Next.js 14 frontend
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── backend/           # NestJS API
│   ├── src/
│   ├── docker/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Local development
├── docker-compose.prod.yml # Production (Coolify)
└── .env.example
```

## Local Development

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- MongoDB (via Docker)

### Quick Start

1. **Start MongoDB:**
```bash
cd backend
docker-compose up -d
```

2. **Start Backend:**
```bash
cd backend
npm install
npm run start:dev
```

3. **Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Swagger Docs: http://localhost:3001/api/docs
- Mongo Express: http://localhost:8081

---

## 🚀 Coolify Deployment Guide

### Option 1: Docker Compose (Recommended)

1. **In Coolify Dashboard:**
   - Go to **Projects** → Create new project
   - Add **Resource** → **Docker Compose**
   - Connect your Git repository
   - Set compose file: `docker-compose.prod.yml`

2. **Configure Environment Variables:**
   ```
   MONGO_ROOT_USER=rosary_admin
   MONGO_ROOT_PASSWORD=<generate-secure-password>
   MONGO_APP_USER=rosary_user
   MONGO_APP_PASSWORD=<generate-secure-password>
   JWT_SECRET=<generate-32-char-secret>
   FRONTEND_URL=https://your-domain.com
   NEXT_PUBLIC_API_URL=https://api.your-domain.com/api
   ```

3. **Configure Domains:**
   - Frontend: `your-domain.com` → port 3000
   - Backend: `api.your-domain.com` → port 3001

4. **Enable SSL** via Let's Encrypt

### Option 2: Separate Services

Deploy each service individually for more control:

#### MongoDB
1. Add Resource → **Database** → **MongoDB**
2. Note the connection string

#### Backend (NestJS)
1. Add Resource → **Dockerfile**
2. Build path: `./backend`
3. Dockerfile: `Dockerfile`
4. Environment variables:
   ```
   NODE_ENV=production
   PORT=3001
   MONGODB_URI=<from-step-1>
   JWT_SECRET=<your-secret>
   FRONTEND_URL=https://your-domain.com
   ```
5. Domain: `api.your-domain.com`

#### Frontend (Next.js)
1. Add Resource → **Dockerfile**
2. Build path: `./frontend`
3. Dockerfile: `Dockerfile`
4. Build args:
   ```
   NEXT_PUBLIC_API_URL=https://api.your-domain.com/api
   ```
5. Domain: `your-domain.com`

---

## Environment Variables Reference

### Backend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (production/development) | Yes |
| `PORT` | Server port (default: 3001) | No |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret for JWT tokens (min 32 chars) | Yes |
| `JWT_EXPIRES_IN` | Token expiration (default: 7d) | No |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |
| `THROTTLE_TTL` | Rate limit window in seconds | No |
| `THROTTLE_LIMIT` | Max requests per window | No |

### Frontend
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Check-ins
- `POST /api/checkins` - Create prayer check-in
- `GET /api/checkins/feed` - Public feed
- `GET /api/checkins/my` - User's check-ins
- `GET /api/checkins/today` - Today's check-in
- `POST /api/checkins/:id/amen` - Toggle Amen
- `POST /api/checkins/:id/comments` - Add comment

### Prayer Requests
- `POST /api/prayers` - Create prayer request
- `GET /api/prayers` - List active requests
- `POST /api/prayers/:id/pray` - Mark praying for
- `POST /api/prayers/:id/answered` - Mark as answered

### Users
- `GET /api/users/me` - Current user profile
- `GET /api/users/me/stats` - User statistics
- `PUT /api/users/me` - Update profile

---

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query
- Shadcn/UI patterns

**Backend:**
- NestJS 10
- MongoDB + Mongoose
- Passport JWT
- Swagger/OpenAPI

**Infrastructure:**
- Docker
- Coolify (self-hosted PaaS)

---

## Security Notes

1. **Always change JWT_SECRET in production**
2. **Use strong MongoDB passwords**
3. **Enable HTTPS via Coolify/Let's Encrypt**
4. **Keep dependencies updated**

---

## License

MIT
