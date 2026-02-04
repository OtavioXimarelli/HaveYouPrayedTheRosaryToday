# Rosário App - Design Style Guide

> **Version:** 1.0  
> **Last Updated:** January 2026  
> **Branch:** `feature/ui-redesign-landing-pages`

---

## 1. Brand Identity

### Name
**Terço Hoje** (Portuguese) / **Rosary Today** (English)

### Tagline
*"Você já rezou o Terço hoje?"* — "Have you prayed the Rosary today?"

### Tone
- **Reverent** — Respectful of Catholic traditions
- **Welcoming** — Accessible to all ages and backgrounds
- **Peaceful** — Encourages contemplation and prayer
- **Community-driven** — Fostering connection among faithful

### Aesthetic
**"Modern Cathedral"** — Sacred tradition meets contemporary design through glass-morphism effects and ornate gold accents

---

## 2. Color Palette

### Primary Colors

| Name | Hex | HSL | Usage |
|------|-----|-----|-------|
| **Sacred Blue** | `#0F172A` | 222° 47% 11% | Primary dark backgrounds, text on light |
| **Metallic Gold** | `#D4AF37` | 43° 74% 53% | Accents, CTAs, highlights |
| **Sacred Cream** | `#FFFCF5` | 45° 50% 98% | Light mode background |

### Extended Gold Scale

```css
--gold-50:  #FEF9E7;
--gold-100: #FCF3CF;
--gold-200: #F9E79F;
--gold-300: #F7DC6F;
--gold-400: #F4D03F;
--gold-500: #D4AF37;  /* Primary */
--gold-600: #B7950B;
--gold-700: #9A7B0A;
--gold-800: #7D6608;
--gold-900: #5F4A06;
```

### Theme Variables

#### Light Mode
```css
--background: #FFFCF5;      /* Sacred Cream */
--foreground: #0F172A;      /* Sacred Blue */
--card: #FFFFFF;
--muted: #F5F0E6;
--border: #E8E0D0;
--primary: #D4AF37;         /* Gold */
```

#### Dark Mode
```css
--background: #020617;      /* Deepest Midnight */
--foreground: #F8FAFC;
--card: #1E293B;
--muted: #1E293B;
--border: #334155;
--primary: #D4AF37;         /* Gold */
```

### Semantic Colors

| Purpose | Light Mode | Dark Mode |
|---------|------------|-----------|
| Success | `#22C55E` | `#4ADE80` |
| Warning | `#F59E0B` | `#FBBF24` |
| Error | `#EF4444` | `#F87171` |
| Info | `#3B82F6` | `#60A5FA` |

---

## 3. Typography

### Font Families

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| **Headings** | Cinzel | 400, 700 | Georgia, serif |
| **Body** | Manrope | 400, 500, 600 | system-ui, sans-serif |

### Import
```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Manrope:wght@400;500;600&display=swap');
```

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| H1 | 3rem - 4.5rem | 700 | 1.1 | tight |
| H2 | 2rem - 3rem | 700 | 1.2 | tight |
| H3 | 1.5rem - 2rem | 700 | 1.3 | normal |
| H4 | 1.25rem | 700 | 1.4 | normal |
| Body Large | 1.125rem | 400 | 1.7 | normal |
| Body | 1rem | 400 | 1.6 | normal |
| Small | 0.875rem | 400 | 1.5 | normal |
| Caption | 0.75rem | 500 | 1.4 | wide |

### Usage Rules
- **Cinzel**: Headlines, section titles, CTAs, important labels
- **Manrope**: Body text, UI elements, descriptions, navigation

---

## 4. Spacing System

Based on 4px grid:

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight spacing, icon gaps |
| `sm` | 8px | Component internal spacing |
| `md` | 16px | Default spacing |
| `lg` | 24px | Section spacing |
| `xl` | 32px | Major section gaps |
| `2xl` | 48px | Page sections |
| `3xl` | 64px | Hero sections |

### Generous Spacing Rule
Use **2-3x more spacing than feels comfortable**. Cramped designs diminish the sacred aesthetic.

---

## 5. Components

### Buttons

#### Primary (Gold CTA)
```css
.btn-primary {
  background: linear-gradient(to right, #D4AF37, #B7950B);
  color: #0F172A;
  font-family: 'Cinzel', serif;
  font-weight: 700;
  border-radius: 9999px; /* Pill shape */
  padding: 16px 32px;
  letter-spacing: 0.025em;
  box-shadow: 0 0 20px -5px rgba(212, 175, 55, 0.4);
}
.btn-primary:hover {
  box-shadow: 0 0 30px -5px rgba(212, 175, 55, 0.6);
}
```

#### Secondary (Outline)
```css
.btn-secondary {
  background: transparent;
  border: 2px solid rgba(212, 175, 55, 0.3);
  color: currentColor;
  border-radius: 9999px;
  padding: 16px 32px;
}
.btn-secondary:hover {
  background: rgba(212, 175, 55, 0.1);
}
```

### Cards

#### Glass Card
```css
.card-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dark mode */
.dark .card-glass {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(212, 175, 55, 0.1);
}
```

#### Sacred Border
```css
.sacred-border {
  border: 1px solid rgba(212, 175, 55, 0.2);
}
```

### Navigation

#### Floating Pill Navbar (Desktop)
- Position: `fixed bottom-24px center`
- Background: `rgba(15, 23, 42, 0.9)` with `backdrop-blur-xl`
- Border: `1px solid rgba(255, 255, 255, 0.1)`
- Border-radius: `9999px`
- Shadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5)`

#### Mobile Header
- Position: `fixed top-0`
- Transparent by default, solid on scroll
- Hamburger menu with slide-down panel

---

## 6. Effects & Animations

### Gold Glow
```css
.gold-glow {
  box-shadow: 0 0 20px -5px rgba(212, 175, 55, 0.4);
}
.gold-glow-lg {
  box-shadow: 0 0 40px -5px rgba(212, 175, 55, 0.5);
}
```

### Pulse Gold Animation
```css
@keyframes pulse-gold {
  0%, 100% { box-shadow: 0 0 20px -5px rgba(212, 175, 55, 0.3); }
  50% { box-shadow: 0 0 40px -5px rgba(212, 175, 55, 0.5); }
}
```

### Fade Up Entrance
```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
/* Use with staggered delays: 100ms, 200ms, 300ms... */
```

### Hover Lift
```css
.hover-lift {
  transition: transform 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
}
```

### Transition Rules
- **DO**: Apply transitions to specific properties (`opacity`, `transform`, `background-color`)
- **DON'T**: Use `transition: all` — breaks transforms

---

## 7. Layout Patterns

### Bento Grid (Landing Page)
Asymmetrical card layout for visual interest:
```
┌──────────────────┬─────────┐
│    Large Card    │  Small  │
│    (2 cols)      │   Card  │
├─────────┬────────┼─────────┤
│  Card   │  Card  │  Card   │
└─────────┴────────┴─────────┘
```

### Content Pages
- Max-width: `max-w-4xl` (896px)
- Centered with generous padding
- Step-by-step layouts with numbered indicators

### Section Spacing
- Hero: `py-20` to `py-32`
- Content sections: `py-16` to `py-24`
- Cards gap: `gap-6` to `gap-8`

---

## 8. Iconography

### Allowed Icons
- **Lucide React** icons (already installed)
- Sacred symbols: ✝ (cross), 📿 (rosary)

### Prohibited
- Emoji icons for UI elements (🤖🧠💡 etc.)
- Generic clipart

### Icon Sizing
| Context | Size |
|---------|------|
| Inline text | 16px |
| Button icon | 20px |
| Card header | 24-32px |
| Feature icon | 40-48px |
| Hero icon | 64-80px |

---

## 9. Imagery

### Style
- High contrast
- Warm tones preferred
- Sacred/religious context
- No stock photo "corporate" feel

### Recommended Sources
- Unsplash (search: rosary, cathedral, prayer, catholic)
- Custom illustrations with gold/blue palette

### Treatment
- Subtle overlay gradients
- Low opacity for backgrounds
- Never obstruct text readability

---

## 10. Accessibility

### Minimum Requirements
- WCAG AA compliance
- Color contrast ratio: 4.5:1 for text
- Touch targets: minimum 44x44px
- Font size: minimum 16px for body

### Gold on Light Warning
Gold text (`#D4AF37`) on white fails contrast. Use darker gold (`#B49020`) for text on light backgrounds.

### Focus States
```css
*:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

---

## 11. Responsive Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large |

### Mobile-First Approach
Design for mobile first, enhance for larger screens.

---

## 12. Dark Mode Guidelines

### Do's
- Use solid dark backgrounds (no dark gradients)
- Reduce brightness of images (opacity: 0.9)
- Increase gold glow intensity
- Add subtle star/particle effects

### Don'ts
- Don't invert all colors mechanically
- Don't use pure black (#000000)
- Don't reduce gold saturation

---

## 13. Code Conventions

### CSS Classes
```
.glass          → Glass-morphism effect
.sacred-border  → Gold-tinted border
.gold-glow      → Gold shadow effect
.font-cinzel    → Heading font
.font-manrope   → Body font
```

### Data Test IDs
Every interactive element must have `data-testid`:
```jsx
<Button data-testid="hero-pray-button">Vamos Rezar</Button>
<nav data-testid="navbar-desktop">...</nav>
```

### Component Exports
- Components: Named exports (`export const Button = ...`)
- Pages: Default exports (`export default function Page()`)

---

## Quick Reference Card

```
COLORS
├─ Primary: #0F172A (Sacred Blue)
├─ Accent: #D4AF37 (Metallic Gold)
├─ Light BG: #FFFCF5 (Sacred Cream)
└─ Dark BG: #020617 (Midnight)

FONTS
├─ Headings: Cinzel, serif
└─ Body: Manrope, sans-serif

RADIUS
├─ Cards: 24px
├─ Buttons: 9999px (pill)
└─ Inputs: 12px

SHADOWS
├─ Glass: 0 8px 32px rgba(0,0,0,0.1)
└─ Gold Glow: 0 0 20px -5px rgba(212,175,55,0.4)
```

---

*This guide ensures visual consistency across the Rosário app while honoring Catholic tradition through a modern, accessible design.*
