# Rosary App - Product Requirements Document (PRD)

## 1. Project Overview & Architecture
Living Rosary is a high-performance, Offline-First/Local-First web application designed to track and facilitate Catholic spiritual practices. Built entirely on a pure frontend architecture (for the MVP phase), it relies exclusively on browser-native storage mechanisms paired with modern React state management.

### 1.1 Core Technological Stack
*   **Framework**: Next.js 14/15 (App Router), deployed via standalone output or edge network.
*   **Language**: Strict TypeScript.
*   **State Management**: Zustand (Global state), React `useState`/`useReducer` (Component state).
*   **Data Persistence**: `localStorage` as the primary database, interfaced via custom hooks.
*   **Data Validation**: Zod schemas enforcing strict invariant checks before any storage write.
*   **Styling**: Tailwind CSS + shadcn/ui (customized for "Modern Cathedral" aesthetics with Glass-morphism and Gold-tinted borders).
*   **Internationalization (i18n)**: `next-intl` handling dual locale rendering without distinct deployment artifacts.
*   **Offline Capabilities**: PWA configured via `next-pwa` mapping aggressive service worker caching strategies.

## 2. Technical Specifications by Module

### 2.1 Global Data Stores (Zustand)
The application architecture relies on deeply typed decoupled stores mimicking a relational database setup.

#### Prayer State (`usePrayerStore`)
Handles the core quantitative metrics of user engagement.
*   **Schema Requirements**: 
    *   `checkIns`: Array of ISO 8601 UTC-normalized date strings.
    *   `lastPrayedDate`: ISO string or null.
    *   `currentStreak`: Integer (calculated dynamically against user timezone midnight).
    *   `longestStreak`: Integer.
    *   `totalPrayers`: Integer.
*   **Algorithmic constraints**: Streak calculation must run upon component mount to automatically reset `currentStreak = 0` if `Date.now() - midnight(lastPrayedDate) > 86400000ms`.

#### Journal State (`useJournalStore`)
Handles rich text or strings associated with specific dates/mysteries.
*   **Schema Requirements**:
    *   `entries`: Array of objects containing `id` (UUIDv4), `date` (ISO string), `content` (string), `mysteryType` (Enum: Joyful, Luminous, Sorrowful, Glorious).

#### Intentions State (`useIntentionsStore`)
Handles discrete prayer targets.
*   **Schema Requirements**:
    *   `intentions`: Array of objects containing `id` (UUIDv4), `title` (string), `category` (Enum), `createdAt` (epoch timestamp), `prayedCount` (integer), `status` (Enum: active | answered).

### 2.2 Core Application Tools

#### Dashboard Overview (`/dashboard`)
*   **Data Visualization Engine**: SVG-based ring progress maps binding `stroke-dashoffset` dynamically to `(checkInsThisWeek / 7) * 100`.
*   **Hydration safety**: Must strictly use `useEffect` or Next.js `dynamic` imports with `ssr: false` to prevent hydration mismatches during `localStorage` reading.

#### Interactive Guide (`/ferramentas/guia-interativo`)
*   **Mystery Resolution**: Auto-calculates the correct mystery by reading `new Date().getDay()`.
*   **Hardware APIs**: 
    *   **WakeLock API**: Requests screen keep-alive via `navigator.wakeLock.request('screen')`.
    *   **Haptic API**: Triggers device vibration upon bead state transitions via `navigator.vibrate(50)`.
*   **State Machine**: 59-node deterministic sequence array mapping exact bead positions to UI focus states.

#### Meditation Timer (`/ferramentas/temporizador`)
*   **Clock Drift Mitigation Strategy**: Forgoes raw `setInterval` decrements due to browser background throttling policies. Implementations must store absolute `targetEndTime = Date.now() + durationMs` and calculate `delta` per animation frame or interval tick.
*   **Audio Context**: Leverages Web Audio API or pure HTML5 `<audio>` references to trigger a chime (e.g., `chime.mp3`) when the calculated `delta` hits `<= 0`.

#### Intentions Wall (`/ferramentas/mural-intencoes`)
*   **Layout Algorithm**: Pure CSS Multi-column layout (`columns-X` based on responsive breakpoints) bypassing JS-heavy masonry computational libraries (like Masonry.js) to preserve main thread performance.
*   **Interaction Engine**: Optimistic UI updates on state modification (e.g., incrementing `prayedCount`).

### 2.3 Static Content Hubs (Teachings & Resources)
*   **Markdown Engine**: Next.js SSG parsing `.md` or `.mdx` files via `fs/promises`.
*   **Scroll Interceptors**: Custom hooks mapping `window.scrollY` to fixed SVG progress bars.
*   **Intersection Observers**: Native `IntersectionObserver` mapping to component fade-in sequences.

## 3. Strict Development Constraints

*   **PWA Compliance**: The Service Worker MUST cache all core assets (fonts, SVGs, critical CSS/JS) and provide fallback boundaries. The core functionality must not drop when standard network fetch yields `TypeError` (offline).
*   **Animations**: Strict restriction against using `transition: all`. UI modifications must exclusively transition targeted CSS properties (`transform`, `opacity`, `background-color`) to prevent paint bottlenecks. Layout-altering animations should be delegated to Framer Motion using `layout` props.
*   **Timezones**: All Date objects written to the store must normalize against UTC limits or utilize rigid ISO 8601 formatting. Daily streak validation logic must strictly compute delta against the user's local timezone midnight.
*   **i18n Fallbacks**: Missing translation keys must gracefully fallback or log a CI/CD build failure. All keys map strictly between English (`en`) and Portuguese (`pt-BR`).

## 4. Implementation Priorities

1.  **State Infrastructure**: Instantiate Zustand stores, typed interfaces, and Zod parsers for local storage marshaling.
2.  **Dashboard Hooks**: Bind the dashboard to the read layer of the state architecture.
3.  **Hardware Integrations**: Deploy the WakeLock/Haptic contexts on the Interactive Guide and Timer.
4.  **Static Data Grids**: Model the Intentions Wall UI and bind to its respective Zustand store.
5.  **Audit**: Run Lighthouse PWA sweeps ensuring Offline caching configurations are correct.

## 5. Mobile Native Excellence & PWA 2.0

### 5.1 Native UI Patterns
*   **Bottom Sheets**: All mobile overlays (Language selection, Exploration menu, Quick settings) MUST utilize draggable bottom sheets instead of static centered modals.
*   **Gestures**: Implement swipe-to-dismiss for all overlays and cards where appropriate.
*   **Haptic Patterns**:
    *   `Light Tap`: Selection and tab changes.
    *   `Success (Medium-Double)`: Finishing a Rosary or reaching a goal.
    *   `Error (Long-Single)`: Failed actions.

### 5.2 System Integration
*   **Push Notifications (Web Push)**: Reminders for daily prayers (configurable in User Settings).
*   **App Shortcuts**: Long-press icon menu for "Pray Now", "Mysteries of the Day", and "Journal Entry".
*   **Splash Screen**: Optimized per platform (iOS `apple-touch-startup-image` and Android manifest).

### 5.3 Offline Experience 2.0
*   **Sync Status**: UI indicator showing "Offline Mode - Syncing when back online".
*   **Manual Cache**: Allow users to "Download all teachings for offline use" via a single toggle.

### 5.4 Performance for Mobile
*   **Over-scroll**: Prevent vertical over-scroll bounce on iOS via `overscroll-behavior-y: contain` on fixed containers.
*   **Skeleton Screens**: Mandatory for all dynamic/markdown-heavy pages to prevent CLS (Cumulative Layout Shift).
