# ✨ Intentions Wall Technical Roadmap (`/ferramentas/mural-intencoes`)

## 📝 Description
A digital pinboard where users can write down specific prayer intentions (family, health, peace) and track how many Rosaries they have offered for each one. Completed intentions can be marked as "Graça Alcançada" (Grace Received).

## ✨ Planned Features
1. **Intention CRUD**: Create, read, update, and delete custom intentions.
2. **Prayer Offering Incrementer**: A button to quickly add "+1 Terço" (Rosary) to a specific intention.
3. **Masonry Layout**: An organic, staggered grid layout resembling a real pinboard.
4. **Client-Side Filtering**: Filter intentions by categories (e.g., Health, Family, Conversion).
5. **Milestone Animations**: Micro-animations (like confetti) when incrementing prayers or marking as answered.

## 🛠️ Implementation & Technical Approach
*   **Data Schema & State (Zustand)**:
    ```typescript
    type Intention = {
      id: string; // crypto.randomUUID()
      title: string;
      category: "familia" | "saude" | "conversao" | "almas" | "outros";
      createdAt: number; 
      prayedCount: number; 
      status: "active" | "answered"; 
    }
    ```
    *   Store in `useIntentionsStore` with `persist` middleware.
*   **UI/UX Masonry**: 
    *   Use pure CSS multi-column layout for performance: `columns-1 sm:columns-2 lg:columns-3 gap-6`.
    *   Ensure child cards have `break-inside-avoid` to prevent cards from being split across columns.
*   **Filtering Logic**: 
    *   Maintain an `activeCategory` state (or URL param).
    *   Render `intentions.filter(i => activeCategory === 'all' || i.category === activeCategory)`.
*   **Animations**: 
    *   Use `framer-motion` `<AnimatePresence>` for smooth entrance/exit of cards when filtering.
    *   Integrate `canvas-confetti` to fire a brief, golden burst from the button coordinates when clicking "+1 Terço" or marking as "Answered".

## 🚧 Difficulty
**Medium**

## 🔗 Dependencies
*   `zustand` (State management)
*   `framer-motion` (Layout animations and card enter/exit)
*   `canvas-confetti` (Milestone celebrations)
*   `lucide-react` (Icons for categories)
