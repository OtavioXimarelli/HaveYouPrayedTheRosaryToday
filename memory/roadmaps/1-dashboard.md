# 🏠 Dashboard Technical Roadmap (`/dashboard`)

## 📝 Description
The dashboard is the central hub for the user's spiritual journey. It displays daily progress, visualizes streaks, shows recent community/personal activity, and provides quick access to tools. Currently, it relies on mock UI; the goal is to make it fully dynamic using local storage until the backend is integrated.

## ✨ Planned Features
1. **Dynamic Streak Calculation**: Calculate and display the current and longest prayer streaks.
2. **Weekly Progress Visualization**: A circular or linear progress ring showing check-ins for the current week.
3. **Recent Activity Feed**: A list of the latest 5 journal entries or check-ins.
4. **Timezone-Aware Reset Logic**: Ensure streaks reset strictly at the user's local midnight.

## 🛠️ Implementation & Technical Approach
*   **State Management**: 
    *   Migrate from static `mockData.ts` to Zustand stores (`usePrayerStore`, `useJournalStore`).
    *   Use Zustand's `persist` middleware to save state to `localStorage` under keys like `rosary-prayer-storage`.
*   **Streak Algorithm**: 
    *   On hydration, compute the difference in days between `Date.now()` and `lastPrayedDate`.
    *   If `diffDays > 1` (accounting for local midnight), automatically reset `currentStreak = 0`.
*   **Progress Ring (`<ProgressBar />`)**: 
    *   Calculate `const completion = (checkInsThisWeek / 7) * 100`.
    *   Map this percentage to the `stroke-dashoffset` property of an SVG circle. Use Tailwind's `transition-all duration-1000 ease-out` to animate the ring filling up on load.
*   **Rehydration Handling**: Ensure Next.js doesn't cause hydration mismatches between the server (which doesn't know local time) and the client by using a custom `useStore` hook or a `useEffect` that sets an `isMounted` flag before rendering the dynamic data.

## 🚧 Difficulty
**Medium**

## 🔗 Dependencies
*   `zustand` (State management + Persist middleware)
*   `date-fns` (Optional, but highly recommended for robust timezone/midnight calculations)
*   `lucide-react` (Icons for the activity feed)
*   `next-intl` (For localized dates and strings)
