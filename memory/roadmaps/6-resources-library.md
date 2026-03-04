# 📂 Resources Library Technical Roadmap (`/recursos`)

## 📝 Description
A streamlined, static directory offering external Catholic documentation, Vatican links, PDF downloads, and encyclicals. It requires no backend and acts as a curated gateway to official Church resources.

## ✨ Planned Features
1. **Static Categorized Lists**: Resources divided cleanly into categories (Vatican Docs, CNBB, Prayers).
2. **External Link Safety Indicators**: Clear visual distinction between internal pages and outbound external links.
3. **Asset Badging**: Visual tags differentiating between "PDF Download", "Web Article", and "Official Document".

## 🛠️ Implementation & Technical Approach
*   **Data Structure**:
    *   Define a hardcoded TypeScript schema in `src/lib/resources.ts`:
        ```typescript
        export type Resource = {
          id: string;
          title: string;
          description: string;
          author: string; // e.g., "São João Paulo II", "CNBB"
          type: "pdf" | "link";
          url: string;
          badge?: string; // e.g., "Carta Apostólica"
        };
        ```
*   **UI/UX Component**:
    *   Render a sleek, responsive grid or list.
    *   Create an `<ExternalResourceCard />` component. Ensure that any `type="link"` has the attributes `target="_blank"` and `rel="noopener noreferrer"` for security.
    *   Append a small `<ExternalLink size={14} />` icon from `lucide-react` next to the title to indicate an outbound click.
*   **Styling**:
    *   Adhere to the "Modern Cathedral" design: use `bg-card` with `sacred-border` (gold-tinted borders at low opacity).
    *   On hover, apply a subtle `translate-y-[-2px]` and increase border opacity.

## 🚧 Difficulty
**Easy**

## 🔗 Dependencies
*   `lucide-react` (External link and file icons)
*   `next-intl` (Ensure static descriptions are localized for EN and PT-BR)
