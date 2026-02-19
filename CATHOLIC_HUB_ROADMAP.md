# 🙏 Catholic Hub - MVP Roadmap & Implementation Plan

**Last Updated:** February 18, 2026  
**Status:** Frontend MVP - Content Architecture Complete, Backend Not Started  
**Vision:** Digital companion for Catholic spiritual life - prayer tracking + accessible Church teachings

---

## 🏗️ Architecture Overview

### Tech Stack

**Frontend (Implemented):**
- Next.js 16 (App Router) + React 19 + TypeScript
- React Query (TanStack Query) for future API integration
- Tailwind CSS + Radix UI + shadcn/ui components
- PWA support (next-pwa with service worker & manifest)
- **Current State**: Mock data + localStorage only

**Backend (Planned - NOT IMPLEMENTED):**
- NestJS boilerplate exists but NOT connected/functional
- Planned: MongoDB + Passport JWT
- **Current State**: Code structure only, no working endpoints

### Deployment Status
- Docker Compose files exist but backend is NOT functional
- Frontend can run standalone with mock data
- No database integration yet

---

## 🎯 MVP Definition - "Catholic Hub" Validation

### Goal
Validate that users want accessible Church teachings alongside prayer tracking—**no formal courses**, just a practical guide to Catholic faith.

### Core Philosophy
- **NOT a course platform** - No formal classes, lessons, or certificates
- **IS a companion guide** - Synthesized Church teachings you explore at your own pace
- **NOT sequential learning** - Browse topics freely like a digital Catholic compendium
- **IS practical spirituality** - Prayer tracking + teachings + tools in one place

### Success Metrics
- [ ] Time spent on teachings content (not just tracking)
- [ ] Return visits to browse different topics
- [ ] Engagement with prayer tools (when built)
- [ ] Daily check-in consistency
- [ ] User retention (7-day and 30-day)

---

## 📋 Content Architecture

### Current Approach: "Guide, Not Course"

Rosário Vivo synthesizes Church teachings into accessible content—think digital Catholic compendium, not online university.

### 1. `/ensinamentos` - Teachings Hub 📚
**What it is**: Browse Catholic teachings by topic - like a reference library

**Categories (structure exists, content minimal):**
- **Santos** (Saints & Church Fathers)
- **Teologia** (Catholic Theology)
- **História** (Church History)
- **Escritura** (Sacred Scripture)
- **Maria** (Mariology)
- **Sacramentos** (Sacraments)
- **Orações** (Prayers & Devotions)

**User Experience**: Click any topic → read → explore related topics. No progress tracking, no required order.

### 2. `/formacao` - Spiritual Formation Guide 🌱
**What it is**: Organized pathways through teachings (NOT formal courses)

**Paths (structure exists, minimal content):**
- **Iniciante** - Basic Rosary & Marian devotion guide
- **Intermediário** - Deeper contemplative practices
- **Avançado** - Advanced theology and consecration
- **Santos** - Learn from saints' spiritual methods

**User Experience**: Suggested reading order with optional progress tracking. Still exploratory, just more organized.

**Key Difference from Ensinamentos**: Same teachings, different organization. Think "suggested path" vs "browse freely."

### 3. `/ferramentas` - Prayer Tools (Future)
**What it will be**: Practical digital prayer aids

**Planned Tools:**
- Interactive Rosary Guide
- Prayer Journal
- Meditation Timer
- Intention Board

**Current Status**: Placeholder page only

### 4. `/recursos` - Resources Library (Future)
**What it will be**: Downloadable materials

**Planned:**
- Prayer cards (PDF)
- Links to Vatican documents
- Curated reading lists

**Current Status**: Placeholder page only

---

## 📊 Implementation Status

### ✅ Completed (Frontend Only with Mock Data)

**Frontend Core:**
- [x] Next.js 16 with App Router + React 19 + TypeScript
- [x] PWA configuration (manifest, service worker)
- [x] Theme system (dark/light mode with next-themes)
- [x] Page transitions (GSAP animations)
- [x] Component library (shadcn/ui + Radix UI)
- [x] Mock data service layer (ready to swap with real API)
- [x] localStorage for check-ins and stats
- [x] Responsive design (mobile-first)

**Pages (Implemented with Mock Data):**
- [x] Landing page - Feature showcase, public vs member comparison
- [x] About page - Mission, principles, timeline, FAQ
- [x] Dashboard - Check-in system with streak tracking (localStorage)
- [x] Como Rezar - St. Louis de Montfort method page
- [x] Mistérios do Dia - Daily mysteries overview
- [x] História - Rosary history page
- [x] Orações Tradicionais - Traditional prayers
- [x] `/ensinamentos` - Hub page with 7 category cards
- [x] `/ensinamentos/santos` - Saints category page (structure, minimal content)
- [x] `/ensinamentos/teologia` - Theology category page (structure, minimal content)
- [x] `/ensinamentos/historia` - History category page (structure, minimal content)
- [x] `/formacao` - Hub page with 4 learning paths
- [x] `/formacao/iniciante` - Beginner path page with 5 lesson cards
- [x] `/formacao/santos` - Saints path page
- [x] `/ferramentas` - Tools placeholder page
- [x] `/recursos` - Resources placeholder page

**Reusable Components:**
- [x] `PageHeader` - Consistent headers with icon, title, subtitle
- [x] `PageTransition` - Smooth GSAP page transitions
- [x] `BreadcrumbNav` - Breadcrumb navigation
- [x] `LockedContent` - Content gating UI (non-functional, visual only)
- [x] `ProgressBar` - Visual progress indicator
- [x] `LessonCard` - Lesson preview cards
- [x] `AuthModal` - Login/signup modal (UI only, no backend)
- [x] `CheckInModal` - Daily check-in modal (localStorage)
- [x] `StreakCounter` - Streak visualization
- [x] `HeroSection` - Landing hero with animations
- [x] `NavigationWrapper` - Responsive nav system
- [x] UI components from shadcn (Button, Card, Dialog, etc.)

### ❌ NOT Implemented (Exists as Code Structure Only)

**Backend:**
- ❌ NestJS code exists but NOT running/connected
- ❌ MongoDB - No database setup
- ❌ Authentication - No real auth (AuthModal is UI only)
- ❌ API endpoints - None functional
- ❌ User accounts - No real persistence
- ❌ Check-ins persistence - Only localStorage (not synced)

**Docker/Deployment:**
- ❌ Docker Compose exists but backend doesn't work
- ❌ Only frontend container is functional

### 🔄 In Progress / Next Priority

**Content Writing (Highest Priority):**
- [ ] Write actual articles for `/ensinamentos` categories
- [ ] Write actual lessons for `/formacao` paths
- [ ] Implement `[slug]` dynamic routes to display content
- [ ] Add markdown/MDX support for rich content

**Tools Development (Frontend Only - localStorage):**
- [ ] Interactive Rosary Guide with bead tracker
- [ ] Prayer Journal (localStorage)
- [ ] Meditation Timer
- [ ] All without backend - pure frontend

**Backend Implementation (Future):**
- [ ] Actually implement NestJS backend
- [ ] Connect MongoDB
- [ ] Implement real authentication
- [ ] Migrate from mock data to real API calls
- [ ] User account system

---

## 📅 Realistic Timeline (Next 8 Weeks)

### Weeks 1-3: Content Creation (Frontend MVP)
**Goal**: Fill ensinamentos and formacao with actual content

- [ ] Write 20+ articles for Ensinamentos (Santos, Teologia, Maria priority)
- [ ] Write 5 Iniciante lessons with full content
- [ ] Write 3 Intermediário lessons
- [ ] Implement `[slug]` dynamic routing for content pages
- [ ] Add MDX or markdown rendering
- [ ] Content metadata (reading time, related topics, tags)

**Content Structure:**
```
content/
├── ensinamentos/
│   ├── santos/
│   │   ├── sao-domingo.md
│   │   ├── sao-luis-de-montfort.md
│   │   └── ... (10+ more)
│   ├── teologia/
│   ├── maria/
│   └── ...
└── formacao/
    ├── iniciante/
    │   ├── 01-o-que-e-rosario.md
    │   ├── 02-papel-de-maria.md
    │   └── ... (5 total)
    └── ...
```

### Weeks 4-5: Prayer Tools (Frontend Only)
**Goal**: Build interactive prayer features without backend

- [ ] Interactive Rosary Guide (`/ferramentas/guia-interativo`)
  - Visual bead tracker (SVG or CSS)
  - Step-by-step prayer text
  - Timer for pacing
  - localStorage for preferences
- [ ] Prayer Journal (`/ferramentas/diario`)
  - Simple form for reflections
  - Save to localStorage
  - Calendar view of past entries
  - Export as text/JSON
- [ ] Meditation Timer (`/ferramentas/temporizador`)
  - Countdown timer
  - Mystery selection
  - Audio notification (optional)
- [ ] Enhanced Dashboard
  - Widget showing tools usage
  - Quick access to recent entries

### Weeks 6-8: Backend Implementation
**Goal**: Make the backend actually work

- [ ] **Week 6**: Get NestJS backend running
  - Fix Docker Compose configuration
  - Get MongoDB connected
  - Health check endpoints working
  - CORS configured correctly
- [ ] **Week 7**: Implement Authentication
  - JWT auth working
  - Register/login endpoints
  - Password hashing (bcrypt)
  - Frontend integration with auth
- [ ] **Week 8**: Migrate Features to Backend
  - Check-ins API (POST, GET)
  - User stats API
  - Replace localStorage with API calls
  - Data migration strategy for existing users

---

## 🏗️ Technical Implementation Details

### Route Structure (Current)

```
frontend/src/app/
├── page.tsx                      # Landing page
├── about/page.tsx                # About page
├── dashboard/page.tsx            # Dashboard (mock data)
├── como-rezar/page.tsx           # How to pray
├── misterios-do-dia/page.tsx     # Daily mysteries
├── historia/page.tsx             # Rosary history
├── oracoes-tradicionais/page.tsx # Traditional prayers
├── ensinamentos/
│   ├── page.tsx                  # Hub page
│   ├── santos/page.tsx           # Santos category
│   ├── teologia/page.tsx         # Theology category
│   ├── historia/page.tsx         # History category
│   ├── escritura/page.tsx        # Scripture category (minimal)
│   ├── maria/page.tsx            # Mary category (minimal)
│   ├── sacramentos/page.tsx      # Sacraments category (minimal)
│   └── oracoes/page.tsx          # Prayers category (minimal)
├── formacao/
│   ├── page.tsx                  # Hub page
│   ├── iniciante/
│   │   ├── page.tsx              # Path overview
│   │   └── [slug]/page.tsx       # NOT YET IMPLEMENTED
│   ├── intermediario/page.tsx    # Path overview
│   ├── avancado/page.tsx         # Path overview
│   └── santos/page.tsx           # Saints path overview
├── ferramentas/page.tsx          # Tools placeholder
└── recursos/page.tsx             # Resources placeholder
```

### Data Flow (Current vs Future)

**Current State:**
```
User Action → Component → MockData Service → localStorage
                                           ↓
                                    Component Re-render
```

**Future State:**
```
User Action → Component → API Service → Backend API → MongoDB
                             ↓            ↓
                        React Query   JWT Auth
                             ↓
                      Component Re-render
```

### State Management Strategy

**Current (Mock Data):**
- `services/mockData.ts` - Static mock data
- `services/api.ts` - Service layer with simulated delays
- `localStorage` - Persistence for check-ins and stats
- No global state - everything in components or React Query

**Future (Real Backend):**
- Keep same service layer structure
- Replace mock implementations with fetch/axios calls
- React Query for caching and synchronization
- JWT token in httpOnly cookies or localStorage
- Optional: Zustand for global UI state (modals, theme, etc.)

---

## 📝 Content Strategy

### Writing Guidelines

**Tone:**
- Reverent but accessible
- No theological jargon without explanation
- Personal but rooted in Church teaching
- Practical application focus

**Structure for Ensinamentos Articles:**
```markdown
---
title: "Article Title"
category: "santos" | "teologia" | etc.
readingTime: "10 min"
tags: ["rosary", "prayer", "saints"]
---

# Title

## Introduction
Brief hook and context

## Main Content
2-3 sections with clear headers

## Practical Application
How this applies to daily life

## Further Reading
Related articles and official Church documents
```

**Structure for Formação Lessons:**
```markdown
---
path: "iniciante" | "intermediario" | "avancado"
number: 1
title: "Lesson Title"
duration: "15 min"
---

# Lesson Title

## Learning Goals
What you'll understand after this lesson

## Content
Main teaching with examples

## Reflection Questions
Prompts for personal meditation

## Practice
Concrete action steps

## Next Lesson
Preview of next topic
```

### Content Priorities

**Phase 1 (Weeks 1-2):**
1. Write 5 complete Iniciante lessons
2. Write 10 Santos articles (most popular saints)
3. Write 5 Maria articles (role in salvation, apparitions)

**Phase 2 (Week 3):**
1. Write 5 Teologia articles (Trinity, Incarnation, etc.)
2. Write 5 História articles (Early Church, Vatican II, etc.)
3. Start Intermediário lessons

**Phase 3 (Ongoing):**
1. Fill out remaining categories
2. Add related content links
3. Implement search functionality

---

## 🎨 Design System Notes

### Components to Build (Tools Phase)

**Rosary Bead Tracker:**
```tsx
<RosaryBeads
  currentBead={15}
  totalBeads={59}
  onBeadClick={(index) => handleBeadClick(index)}
  variant="circle" | "chain"
/>
```

**Prayer Step Display:**
```tsx
<PrayerStep
  number={1}
  prayer="Pai Nosso"
  text="Pai nosso que estais no céu..."
  isActive={true}
  onComplete={() => handleComplete()}
/>
```

**Journal Entry Form:**
```tsx
<JournalForm
  mystery={selectedMystery}
  onSave={(entry) => saveToLocalStorage(entry)}
  defaultIntentions={[]}
/>
```

---

## 🚀 MVP Launch Checklist

### Must Have for Launch
- [ ] 5 complete Iniciante lessons with rich content
- [ ] 20+ Ensinamentos articles across categories
- [ ] Dynamic routing working for all content
- [ ] Mobile-responsive design tested
- [ ] Basic SEO (meta tags, sitemap)
- [ ] Privacy policy and terms
- [ ] Working check-in system (even if localStorage)
- [ ] At least 1 interactive tool (Rosary guide OR journal)

### Nice to Have
- [ ] Backend authentication working
- [ ] All 4 formação paths with content
- [ ] All prayer tools implemented
- [ ] Search functionality
- [ ] Social sharing buttons

### Future Features (Post-Launch)
- [ ] Community features (intentions, testimonies)
- [ ] Native mobile apps
- [ ] Offline mode (full PWA)
- [ ] Audio guides for prayers
- [ ] Multiple languages (Spanish, English)

---

## 📈 Success Metrics

### Technical Metrics
- [ ] Page load time < 2s (Lighthouse score > 90)
- [ ] Mobile responsive (tested on 3+ devices)
- [ ] Accessibility score > 85
- [ ] Zero console errors in production

### User Engagement (Post-Launch)
- Average session duration
- Pages per session
- Return visitor rate (7-day, 30-day)
- Most read articles/lessons
- Tool usage frequency
- Check-in consistency rate

### Content Performance
- Time spent per article
- Lesson completion rate
- Most shared content
- Search queries (when implemented)

---

## 🤝 Backend Integration Plan (Detailed)

### Phase 1: Infrastructure (Week 6)

**Docker Setup:**
```bash
# Get MongoDB actually running
docker-compose up mongodb

# Fix NestJS connection
# Update connection string
# Test health endpoint
```

**Database Schema:**
```typescript
// User
{
  _id: ObjectId,
  email: string,
  password: string (hashed),
  name: string,
  createdAt: Date,
  currentStreak: number,
  longestStreak: number,
  totalCheckIns: number
}

// CheckIn
{
  _id: ObjectId,
  userId: ObjectId,
  mystery: string,
  reflection: string,
  intentions: string[],
  createdAt: Date,
  isPublic: boolean
}
```

### Phase 2: Authentication (Week 7)

**Endpoints to Implement:**
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me (verify token)
POST /api/auth/logout
```

**Frontend Integration:**
```typescript
// Update api.ts
export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const { accessToken, user } = await response.json();
  localStorage.setItem('token', accessToken);
  return user;
}
```

### Phase 3: Data Migration (Week 8)

**Migrate localStorage to Backend:**
```typescript
// Migration helper
async function migrateLocalDataToBackend() {
  const localCheckIns = getStoredCheckIns();
  const localStats = getStoredStats();
  
  // Send to backend if user logged in
  if (isAuthenticated) {
    await bulkCreateCheckIns(localCheckIns);
    await updateUserStats(localStats);
    // Clear localStorage
  }
}
```

---

## 📞 Current Status Summary

**What We Have:**
- ✅ Beautiful frontend with all page structures
- ✅ Mock data system that works perfectly
- ✅ Component library ready to go
- ✅ Content architecture decided
- ✅ PWA configuration for mobile

**What We DON'T Have:**
- ❌ Backend is NOT working (just code structure)
- ❌ No database connected
- ❌ No real user accounts
- ❌ No actual content (just placeholders)
- ❌ Tools are just placeholder pages

**Next Steps (This Week):**
1. Start writing actual content for Ensinamentos
2. Implement `[slug]` routing for dynamic pages
3. Add markdown rendering (MDX or react-markdown)
4. Test on mobile devices

**This Month:**
1. Complete 20+ articles
2. Complete 5 Iniciante lessons
3. Build one interactive tool (Rosary guide)

**Within 2 Months:**
1. Get backend actually working
2. Connect to database
3. Launch MVP with real users

---

*Last Updated: February 18, 2026*  
*This is a living document - update as we make real progress*
