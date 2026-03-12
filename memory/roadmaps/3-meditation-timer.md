# ⏳ Meditation Timer Technical Roadmap (`/ferramentas/temporizador`)

## 📝 Description
A focused, distraction-free timer specifically designed for silent meditation on the Rosary mysteries. It ensures accurate timing and gentle notifications when the meditation period ends.

## ✨ Planned Features
1. **Drift-Proof Countdown**: A highly accurate timer that doesn't lose seconds if the browser throttles background tabs.
2. **Mystery Selection Integration**: Pre-configure the timer based on a selected mystery.
3. **Audio Chime Notification**: A gentle, sacred chime that plays when the timer reaches zero.
4. **Screen WakeLock**: Keep the screen alive during meditation.

## 🛠️ Implementation & Technical Approach
*   **Timer Hook Architecture (`useTimer`)**: 
    *   **Anti-Drift Logic**: Do NOT use `setInterval` to simply subtract `1` every second. Browsers throttle inactive tabs to 1 execution per minute.
    *   Instead, on start, calculate: `const targetEndTime = Date.now() + durationMs;`
    *   Use `requestAnimationFrame` or a 100ms `setInterval` to constantly calculate: `const remaining = Math.max(0, targetEndTime - Date.now());`
    *   Update the React state with the calculated `remaining` time.
*   **Audio API**: 
    *   Preload the audio file (e.g., `/sounds/sacred-chime.mp3`) on mount to avoid fetch delays.
    *   When `remaining === 0`, execute `audioContext.play()`. Ensure the audio context is unlocked by requiring the user to click a "Start Meditation" button first (browsers block autoplay).
*   **UI/UX**: 
    *   A large, clean circular SVG countdown. Map the remaining time to the `stroke-dashoffset` of a circle.
    *   "Glass-morphism" backdrop with a subtle glowing gold accent for the "Modern Cathedral" aesthetic.

## 🚧 Difficulty
**Medium**

## 🔗 Dependencies
*   Web Audio API (or simple HTML5 `<audio>` element)
*   Screen Wake Lock API helper utility (shared with the Interactive Rosary)
*   Zustand `usePrayerStore` (Optional: log the meditation time as a check-in upon completion)
