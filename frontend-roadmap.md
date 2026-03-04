# 🗺️ Rosário Vivo - Page-by-Page Technical Frontend Roadmap

This document outlines the Pure Frontend implementation strategy mapped out **page by page**. Every feature relies on `localStorage` acting as the database, validated safely by Zod schemas and managed by Zustand.

---

## 1. 🏠 `/dashboard` (The Heart of the App)
The dashboard is where a user sees their daily spiritual progress. It must transition from pure mock-UI to dynamically reading the local state.

### Technical Implementation:
- **State Source**: Reads from `usePrayerStore` and `useJournalStore`.
- **Zustand Schema (`usePrayerStore`)**:
  ```typescript
  interface PrayerState {
    checkIns: string[]; // Array of ISO dates ['2026-02-26', ...]
    lastPrayedDate: string | null;
    currentStreak: number;
    longestStreak: number;
    totalPrayers: number;
    addCheckIn: (date: string) => void;
  }
  ```
- **Streak Algorithm Logic**: 
  - On render, calculate if `today - lastPrayedDate > 1 day`. If true, reset `currentStreak = 0`. This calculation must be strictly mapped to the user's local timezone midnight.
- **Data Visualizations (Must-Haves)**:
  - **Weekly Ring Progress (`<ProgressBar />`)**: Dynamically calculate `(checkInsThisWeek / 7) * 100` and map it to SVG `stroke-dashoffset` for a circular ring animation.
  - **Recent Activity Feed**: Pull the last 5 entries from `useJournalStore` to render the mini-cards in the Activity tab.
  - **Contribution Heatmap (Optional/Advanced)**: A 7-row by 4-week grid mapping historical check-ins to CSS opacity blocks (similar to GitHub contributions).

---

## 2. 📿 `/ferramentas/guia-interativo` (The Interactive Rosary)
This tool guides the user bead-by-bead through the Rosary.

### Technical Implementation:
- **State Source**: Component Local State (`useState`) for tracking beads, synced to `localStorage` on every bead advance.
- **Mystery Calculation Logic**:
  - The component MUST use `new Date().getDay()` to automatically load the correct mystery string for that specific day of the week (0 = Sunday/Glorious, 1 = Monday/Joyful, etc.).
- **User Experience (Must-Haves)**:
  - **Bead Visualizer Array**: Render an SVG or Flexbox array mapping all 59 beads. Apply a `scale-110` class and highlight the *current* step dynamically based on `currentStepIndex`.
  - **Haptic API**: Fire `navigator.vibrate(50)` when a user explicitly taps "Next Bead", providing satisfying physical feedback without looking at the screen.
  - **WakeLock API**: Call `navigator.wakeLock.request('screen')` on mount to prevent the screen from falling asleep while praying.

---

## 3. ⏳ `/ferramentas/temporizador` (Meditation Timer)
A focused tool exclusively for silent meditation of the Rosary mysteries.

### Technical Implementation:
- **State Source**: Custom `useTimer` hook utilizing `Date.now()`.
- **Clock Drift Mitigation Logic**:
  - Do NOT rely entirely on `setInterval` ticking down seconds (browsers throttle intervals in background tabs). 
  - Instead, save `targetEndTime = Date.now() + durationMs`. On every tick, calculate `remaining = targetEndTime - Date.now()`.
- **Hardware Integrations (Must-Haves)**:
  - **WakeLock API**: Strongly required here to keep the screen alive.
  - **Audio API**: When `remaining <= 0`, play a gentle chime using `new Audio('/sounds/chime.mp3').play()`.

---

## 4. ✨ `/ferramentas/mural-intencoes` (Intentions Wall)
A place where users pin specific intentions (health, family, etc.) and track how many Rosaries they have offered for them.

### Technical Implementation:
- **State Source**: `useIntentionsStore` (Zustand + `localStorage`).
- **Data Schema (`Intention`)**:
  ```typescript
  type Intention = {
    id: string; // crypto.randomUUID()
    title: string;
    category: "familia" | "saude" | "conversao" | "almas" | "outros";
    createdAt: number; 
    prayedCount: number; // Ticks up when clicking "+1 Terço"
    status: "active" | "answered"; // Answers move to a golden 'Graças Alcançadas' list
  }
  ```
- **UI/UX Requirements (Must-Haves)**:
  - **Masonry Layout**: Use CSS Multi-column layout (`columns-1 md:columns-2 gap-6`) for a staggered, organic pinboard feel.
  - **Increment Animation**: When clicking the "+1 Terço" button, trigger a micro-animation (e.g., Framer Motion pop) or trigger `canvas-confetti` to celebrate the prayer offering.
  - **Filtering System**: Instant client-side filtering buttons (Pills) that map the array memory through a `filter(i => i.category === activeCat)`.

---

## 5. 📖 `/ensinamentos` & Content Pages (The Library)
The canonical reading hub. *(Note: Dynamic MDX is completed!)*

### Technical Implementation:
- **State Source**: Static Site Generation (SSG). Markdown files loaded via `fs` at build-time.
- **Reading UX Enhancements (Must-Haves)**:
  - **Scroll Progress Bar**: A fixed topmost SVG bar that fills up based on `(window.scrollY / document.body.scrollHeight)`.
  - **Intersection Observers**: Use Framer Motion or `useIntersectionObserver` to trigger `fade-up` animations when the user scrolls down to related articles at the bottom of the page.

---

## 6. 📂 `/recursos` (External References Library)
A clean layout to offer official external Catholic documentation.

### Technical Implementation:
- **State Source**: Hardcoded structured array inside the component.
- **Data Schema**:
  ```typescript
  type Resource = {
    title: string;
    description: string;
    author: string; // e.g. "São João Paulo II", "CNBB" 
    type: "pdf" | "link";
    url: string;
    badge?: string; // e.g., "Carta Apostólica"
  }
  ```
- **Requirements**:
  - Render as a sleek list or grid with outbound link icons (`<ExternalLink />`).
  - No dynamic database required.

---

## 🛠️ Global Execution Priorities (The Task Checklist)

To execute this page-by-page roadmap efficiently, we will build out the application in this exact order:

1. **Global Base**: Set up the `usePrayerStore` and `useJournalStore` Zustand logics so that we have a real "database" API ready to use everywhere.
2. **Dashboard Overview**: Overhaul `/dashboard` to read from the newly instantiated Zustand stores. Implement the Streak algorithm logic.
3. **Mural de Intenções**: Build the schema, UI masonry board, and interactions.
4. **Temporizador**: Build the highly accurate timer hook with WakeLock and Chime features.
5. **Guia Interativo Core UI Polish**: Upgrade the existing Rosary Guide to auto-resolve today's particular mystery.
6. **Recursos Page**: Create the final static library mapping.
7. **PWA & Performance Audit**: Verify everything runs flawlessly in airplane mode on mobile devices.
