# 📿 Interactive Rosary Guide Technical Roadmap (`/ferramentas/guia-interativo`)

## 📝 Description
A step-by-step digital guide that walks the user bead-by-bead through the Rosary. It automatically selects the correct mystery for the day and provides physical (haptic) feedback so users can pray without looking at the screen.

## ✨ Planned Features
1. **Daily Mystery Auto-Resolver**: Automatically load the correct mystery string based on the current day of the week.
2. **Bead Visualizer Map**: A visual representation of the 59 Rosary beads, highlighting the current step.
3. **Haptic Feedback**: Subtle physical vibrations when advancing to the next bead.
4. **Screen WakeLock**: Prevent the user's phone screen from turning off while praying.
5. **Session Persistence**: Remember the user's place if they accidentally close the tab.

## 🛠️ Implementation & Technical Approach
*   **Mystery Calculation Logic**: 
    *   Use `const dayOfWeek = new Date().getDay();` (0 = Sunday/Glorious, 1 = Monday/Joyful, etc.) to fetch the correct mystery data array.
*   **State Management**: 
    *   Use React `useState` for `currentStepIndex`.
    *   Sync `currentStepIndex` to `localStorage` (or Zustand) via `useEffect` to enable session recovery. Add a "Reset Session" button if the stored session is older than 12 hours.
*   **UI/UX Map**: 
    *   Render the 59 beads using an SVG path or a Flexbox grid.
    *   The active bead should receive classes like `scale-110`, `ring-2`, and `ring-amber-400` (Modern Cathedral gold glow). Use `framer-motion` for smooth layout transitions between active states.
*   **Web APIs Integration**:
    *   **Haptic**: `if ('vibrate' in navigator) navigator.vibrate(50);` triggered on the "Next" button click.
    *   **WakeLock**: Use the Screen Wake Lock API. Request it on mount `navigator.wakeLock.request('screen')` and listen for `visibilitychange` to re-request if the user switches tabs and returns.

## 🚧 Difficulty
**Hard** (Due to managing the SVG map state and ensuring Web APIs degrade gracefully across iOS/Android browsers)

## 🔗 Dependencies
*   `framer-motion` (For bead transitions and step-by-step text animations)
*   Zustand `usePrayerStore` (To automatically dispatch a "Check-in" when bead 59 is reached)
*   Browser Support: Requires polyfills or graceful degradation for WakeLock on older Safari versions.
