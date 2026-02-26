# Rosário App - Product Requirements Document (PRD)

## 1. Project Overview
Rosário Vivo / Living Rosary is a high-performance Catholic spirituality platform designed to help users track their spiritual journey, specifically the Rosary prayer, while providing deep theological content and community connection. It blends traditional sacred aesthetics ("Modern Cathedral") with modern web technology.

## 2. Core Pillars

### 2.1 Full Bilingual Localization (EN & PT-BR)
*   **Complete Content Coverage**: 100% of the site (UI, metadata/SEO, articles, prayers, and community content) must be available in both English (EN) and Brazilian Portuguese (PT-BR).
*   **Infrastructure**: Managed via `next-intl` for routing and UI strings. Articles use a structured `/content/[locale]/` directory.
*   **Official Sources**: 
    *   **Vatican**: All religious content must follow official Vatican standards (vatican.va).
    *   **PT-BR**: Follow CNBB (Conferência Nacional dos Bispos do Brasil) standards.
    *   **EN**: Follow USCCB or official Catholic Bible/Vatican English translations.

### 2.2 Style Consistency & Layout Integrity
*   **Sacred Modern Aesthetic**: Strict adherence to "Modern Cathedral" style (Glass-morphism + Ornate Gold).
*   **Responsive Design**: Zero broken styles across all breakpoints (Mobile, Tablet, Desktop).
*   **Design System Consistency**:
    *   **Typography**: Cinzel for headings (Sacred), Manrope for body (Modern).
    *   **Color Palette**: Sacred Blue (#0F172A), Metallic Gold (#D4AF37), Sacred Cream (#FFFCF5).
    *   **Spacing**: Generous spacing (2-3x default) to avoid "cheap" cramped looks.
*   **Theme Continuity**: Dark and Light modes must be perfectly balanced for WCAG AA contrast.

### 2.3 Performance Optimization
*   **Performance Targets**: 90+ Lighthouse scores for Performance, Accessibility, Best Practices, and SEO.
*   **Core Web Vitals**: Minimize LCP and CLS through image optimization and proper font loading.
*   **Technical Implementation**:
    *   Next.js `standalone` output for efficient containerization.
    *   Offline capability via PWA (`next-pwa`).
    *   Aggressive caching and lazy loading of components/images.

### 2.4 Concise & User-Friendly UI/UX
*   **Navigation**: Floating pill navbar (desktop) and optimized mobile header.
*   **Interaction Design**: Intuitive modals with gold glow effects and micro-animations (Framer Motion).
*   **Simplicity**: Focus on ease of use for all ages (Youth to Elderly).
*   **Accessibility**: WCAG AA compliance, 44px minimum touch targets, and keyboard navigation.

### 2.5 Content Philosophy: Guide, Not a Course
*   **No Formal Classes**: Content must not be structured as classical sequential courses with "lessons" (e.g., beginner, intermediate, advanced) or academic classes.
*   **Terminology**: 
    *   Avoid terms like "Lesson" (Aula), "Course" (Curso), or levels ("Iniciante", "Avançado").
    *   Use spiritual/journey terms like "Reflection" (Reflexão), "Teaching" (Ensinamento), "Step" (Passo), or "Meditation" (Meditação).
    *   Paths should be thematic (e.g., "Primeiros Passos" / "Fundamentos", "Aprofundando o Mistério") rather than skill-based.
*   **Official Teachings**: The content represents teachings directly from the Holy See, the Catechism, and official Catholic doctrine, rather than a formal curriculum or certification.
*   **Self-Paced Exploration**: The platform acts as a digital Catholic compendium and companion guide where users browse topics freely based on their current spiritual needs.

## 3. User Personas
*   **Traditional Catholics**: Older users who appreciate sacred aesthetics and need large text/clear navigation.
*   **Young Catholics**: Tech-savvy users who appreciate modern design and smooth animations.
*   **Families**: Users who pray together and need welcoming design.
*   **New to Rosary**: Users learning the faith who need clear, step-by-step guidance.

## 4. Technical Requirements
*   **Frontend**: Next.js 14/15, TypeScript, Tailwind CSS, Shadcn UI (customized).
*   **Backend**: NestJS, MongoDB (Mongoose).
*   **State/Data**: React Query for data fetching, LocalStorage for theme persistence.
*   **Deployment**: Docker-based, standalone output.

## 5. Implementation Roadmap

### P0 (Critical)
- [ ] Full English content translation for all existing PT-BR pages.
- [ ] Backend integration and authentication flow.
- [ ] Check-in and Rosary tracking functionality.
- [ ] Ensure all Vatican sources are attributed and localized.

### P1 (High Priority)
- [ ] Dashboard redesign with high performance and clean UI.
- [ ] Community feed styling following "Modern Cathedral" aesthetic.
- [ ] Prayer request feature.
- [ ] PWA offline support for prayers.

### P2 (Medium Priority)
- [ ] Audio prayers feature.
- [ ] Push notifications for prayer reminders.
- [ ] Teaching Hub (/ensinamentos) expansion with 7 categories.

### P3 (Nice to Have)
- [ ] Rosary bead animation during prayer (Framer Motion).
- [ ] Dark mode auto-schedule.
- [ ] Family/group prayer sessions.

## 6. Content Sources
- Vatican Holy See: [vatican.va/special/rosary/](https://www.vatican.va/special/rosary/)
- Rosarium Virginis Mariae: Pope Saint John Paul II (2002)
- CNBB (Conferência Nacional dos Bispos do Brasil) for PT-BR
- Official Vatican English translations for EN

## 7. Design Guidelines Ref (from STYLE_GUIDE.md)
*   **Borders**: `sacred-border` (Gold-tinted, 20% opacity).
*   **Effects**: Glass-morphism (backdrop-blur 12-24px), Gold Glow.
*   **Buttons**: Pill-shaped with gold gradients and micro-animations.
*   **Transitions**: Never use `transition: all` (breaks transforms). Specific properties only.
