# Evangelizae Development Checkpoint

**Date:** 2026-09-07  
**Status:** Phase A complete, Design Refinement Phase 1-3 complete, Phases B and C pending

---

## Phase A: Refine Beta Core ✅ COMPLETE

All items completed and verified with `pnpm check`.

### Changes Made

**A.1 Sanctuary** (`src/app/[locale]/sanctuary/page.tsx`)
- Loading skeleton with `aria-busy` instead of empty div
- Empty state for first-time users (no completions) with distinct copy
- `aria-label` on week-strip section
- New i18n keys: `emptyTitle`, `emptyBody`, `emptyAction`, `loading`

**A.2 Rosary** (`src/app/[locale]/rosary/page.tsx`)
- `beforeunload` guard during active prayer sessions
- Focus trap for intentions panel (Tab/Shift+Tab/Escape)
- Focus restore to trigger button on close
- `aria-live="polite"` on prayer step for screen reader announcements
- `aria-controls` linking trigger to panel

**A.3 Settings** (`src/app/[locale]/settings/page.tsx`)
- Export shape now matches `MigrateRequest` contract: `{version: 2, prayerState, preferences, completions}`
- Includes `activeMysteryType`, `currentStepIndex`, `furthestStepIndex`, `sessionStartedAt`, `isCompleted`, `intentions`, `reflection`

**A.4 Accessibility**
- Added `.sr-only` class to `globals.css` (was missing, used by WeekDots)
- `role="alert"` on liturgy error state
- `role="status"` on liturgy loading state

---

## Design Refinement Phase ✅ COMPLETE (Phases 1-3)

### Phase 1: Layout Foundations ✅

**Spacing & Design Tokens** (`src/app/globals.css`)
- Added unified spacing scale: `--space-xs` (0.5rem) through `--space-2xl` (4rem)
- Added border-radius tokens: `--radius-sm` (0.25rem) through `--radius-xl` (1.35rem)

**Skip-to-Content Link** (`src/components/layout/SiteShell.tsx`)
- Added skip link for keyboard users
- Added `id="main-content"` to main element
- Skip link styles in `globals.css` (hidden until focused)

**Theme Toggle Consolidation**
- Removed duplicate theme toggle from header actions
- Added theme toggle to mobile menu footer
- Added `.mobile-menu-footer` styles

### Phase 2: Sanctuary Refinement ✅

**Reorganized Layout** (`src/app/[locale]/sanctuary/page.tsx`)
- Moved week strip above prayer invitation (establishes context before action)
- Improved visual hierarchy

**Enhanced Liturgy Promo** (`src/app/redesign.css`)
- Increased icon size from 2.4rem to 2.8rem
- Added structured grid layout with proper content grouping
- Added `.liturgy-promo-content`, `.liturgy-promo-title`, `.liturgy-promo-body` classes
- Improved mobile responsive styles

### Phase 3: Rosary Polish ✅

**Increased Touch Targets** (`src/app/redesign.css`)
- Increased decade bead size from 1rem to 1.5rem (better mobile usability)

**Completion Screen Enhancement** (`src/app/[locale]/rosary/page.tsx`)
- Added reflection prompt textarea after completion
- New i18n keys: `reflectionPrompt`, `reflectionPlaceholder`
- Reflection saved to prayer store via `setReflection()`
- Added `.completion-reflection` styles

**Progress Indicator** (`src/app/[locale]/rosary/page.tsx`)
- Added progress percentage display in toolbar
- Added `.prayer-toolbar-progress` styles
- Progress calculated and displayed as rounded percentage

---

## Phase B: Liturgy Live API ⏳ PENDING

Replace provisional embedded liturgy with live backend API.

### Tasks

1. **API Client** (`src/services/liturgyApi.ts`)
   - Create client for `GET /liturgy/today?timezone=America/Sao_Paulo&locale=pt-BR`
   - Handle `LIVE`, `CACHED`, `UNAVAILABLE` states
   - Never serve yesterday as today
   - Keep `America/Sao_Paulo` day logic

2. **Liturgy Page** (`src/app/[locale]/liturgy/page.tsx`)
   - Replace `embeddedDailyLiturgy.ts` import with API call
   - Show freshness indicator (LIVE/CACHED)
   - Show 503 UNAVAILABLE state with CNBB link
   - Keep existing UI structure

3. **Sanctuary Page** (`src/app/[locale]/sanctuary/page.tsx`)
   - Add liturgy promo with live data preview (optional)

4. **Cleanup**
   - Remove `src/data/embeddedDailyLiturgy.ts` after 7 days green
   - Remove `embeddedNotice` i18n key
   - Update privacy copy for liturgy API

5. **Testing**
   - Provider down with cache → 200 CACHED
   - Provider down no cache → 503 UNAVAILABLE
   - Timezone edge cases

---

## Phase C: Accounts-First Gate ⏳ PENDING

Major scope change: require login before sanctuary/rosary.

### Documentation Updates Required

1. **README.md**
   - Update beta boundary: accounts required
   - Remove "account-free" language
   - Update privacy section

2. **BETA_LAUNCH_CHECKLIST.md**
   - Update gates for accounts
   - Add auth verification steps

3. **Privacy Page** (`src/app/[locale]/privacy/page.tsx`)
   - Add server storage description
   - Retention policy (completions until delete, idempotency 24h, logs 30d)
   - Export/delete paths

### New Routes

1. **Login** (`/pt/entrar`)
   - `POST /auth/login`
   - Handle 401, 429 errors
   - Link to password recovery

2. **Register** (`/pt/criar-conta`)
   - `POST /auth/register`
   - Handle 409 EMAIL_TAKEN
   - Migration prompt: keep local history?

3. **Password Recovery** (`/pt/recuperar-senha`)
   - `POST /auth/forgot-password`
   - Always-204 response to prevent enumeration

4. **Password Reset** (`/pt/redefinir-senha?token=`)
   - `POST /auth/reset-password`

5. **Email Verification** (`/pt/verificar-email`)
   - `POST /auth/verify-email`
   - 24h expiry state

6. **Account Page** (`/pt/conta`)
   - `GET /users/me` profile
   - Stats from server
   - `GET /spiritual-plans/current`
   - Export (server), Delete account (LGPD), Logout

7. **Spiritual Plan** (`/pt/plano`)
   - `POST /spiritual-plans`
   - `GET /current`, `PATCH status`
   - Progress bar from completions window
   - Goals: HABIT_FORMATION / DEEPEN_FAITH / RETURN_TO_CHURCH

### Auth Infrastructure

1. **API Client** (`src/services/authApi.ts`)
   - Login, register, refresh, logout
   - Token storage (memory + httpOnly cookie)
   - No secrets in `NEXT_PUBLIC_*`

2. **Sync Client** (`src/services/syncApi.ts`)
   - `POST /prayer/checkin` with Idempotency-Key
   - `GET /prayer/history`, `GET /prayer/stats`
   - `GET /users/me/state` for reconciliation

3. **Middleware** (`src/middleware.ts`)
   - Route guard for `/sanctuary`, `/rosary`, `/conta`, `/plano`
   - Redirect to `/entrar?next=` if unauthenticated

4. **State Migration**
   - Zustand migration v2 → v3
   - Add `pendingSync[]`, `lastSyncAt`
   - Offline-first queue with retry

5. **Sanctuary Updates**
   - Sync state indicator (sincronizado/pendente/offline)
   - Server PrayerStats over local
   - WeekDots from `GET /prayer/history`

6. **Rosary Updates**
   - Fire `POST /prayer/checkin` on completion
   - Never block prayer on network
   - Queue for offline retry

7. **Settings Updates**
   - Split Local vs Conta sections
   - Profile/preferences push to server via `PATCH /users/me`

---

## Verification Commands

```bash
pnpm check          # lint + typecheck + unit + build
pnpm test:e2e       # E2E tests (requires pnpm start)
```

---

## Next Steps

1. **Phase B first** (lower risk, unblocks backend work)
2. **Phase C second** (major scope change, requires documentation updates)

Phase C should be behind a feature flag initially to keep beta shippable.
