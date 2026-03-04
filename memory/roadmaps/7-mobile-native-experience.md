# 📱 Mobile Native Experience Technical Roadmap

## 📝 Description
Transformation of the PWA into a high-fidelity experience that feels native on iOS and Android. Focus on gesture-based navigation, system integration, and advanced haptics.

## ✨ Planned Features
1. **Vaul Bottom Sheets**: Replace all simplistic div-overlays with draggable, accessible bottom sheets.
2. **Adaptive Page Transitions**: Smooth, direction-aware slide animations between pages.
3. **Centralized Haptics Service**: A robust hook providing consistent tactile feedback across the entire app.
4. **Advanced PWA Shortcuts**: Dynamic integration with the OS application icon menu.
5. **Offline Dashboard**: A full indicator of cache status and data synchronization.

## 🛠️ Implementation & Technical Approach
*   **Navigation & Overlays**: Use `vaul` (or a similar lightweight library) for Drawer components on mobile. Bind `framer-motion` to history changes to animate slide-left or slide-right transitions.
*   **Haptic API**: Create a `useHapticFeedback` hook that encapsulates pattern logic (success, error, warning, tap).
*   **Manifest & Icons**: Add more granular icons and apple-touch icons to the public folder. Sync the `theme-color` in `manifest.json` with the user's selected mode (dark/light).
*   **Skeleton Screens**: Implement with Tailwind `animate-pulse` on all SSG content loaders.

## 🚧 Difficulty
**Medium-Hard** (Due to iOS Safari's inconsistent support for certain PWA features like Web Push and Splash screens)

## 🔗 Dependencies
*   `vaul` (For drawers)
*   `framer-motion` (For transitions)
*   Service Worker (For offline management and push notifications)
