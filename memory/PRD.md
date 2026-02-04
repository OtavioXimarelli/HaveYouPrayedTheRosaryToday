# Rosário App - Product Requirements Document

## Original Problem Statement
Modern UI/UX redesign for a Catholic Rosary prayer tracking app with:
1. Real dark and light theme with personality using colors inspired by the Rosary theme (deep blues, purples, and golds)
2. Fully functional frontend with intuitive UI
3. Mix of ornate/rich decorative elements and glass-morphism
4. Universal accessibility for all ages (like the Catholic Church)
5. Pages to update: Landing page and "About Rosary" section pages
6. **All religious content must come from official sources (Vatican)**

## User Personas
- **Traditional Catholics**: Older users who appreciate the sacred aesthetic and need larger text/clear navigation
- **Young Catholics**: Tech-savvy users who appreciate modern design with smooth animations
- **Families**: Users who pray together and need accessible, welcoming design
- **New to Rosary**: Users learning about the Rosary who need clear guidance

## Core Requirements (Static)
- Next.js 14 frontend with TypeScript
- NestJS backend with MongoDB
- Dark/Light theme system with persistence
- Responsive design for all devices
- Accessibility compliance (WCAG AA)
- Portuguese (Brazilian) language
- **Official Vatican content sources**

## What's Been Implemented (January 2026)

### Theme System
- [x] ThemeProvider with system preference detection
- [x] Theme toggle component with sun/moon icons
- [x] LocalStorage persistence for theme preference
- [x] CSS variables for light/dark modes
- [x] "Sacred Cream" light theme (#FFFCF5)
- [x] "Cathedral Night" dark theme (#020617)

### Typography
- [x] Cinzel font for headings (sacred, traditional feel)
- [x] Manrope font for body text (modern readability)
- [x] Google Fonts integration

### Landing Page Redesign
- [x] Bento Grid layout with asymmetrical cards
- [x] Floating pill navbar at bottom (desktop)
- [x] Mobile header with hamburger menu
- [x] Hero section with rosary icon and CTA
- [x] "About Rosary" section with interactive cards
- [x] Community section with feature highlights
- [x] CTA section with gold accents
- [x] Redesigned footer with navigation links

### Content Pages (Vatican Sources)
- [x] /como-rezar - Step-by-step prayer guide
- [x] /historia - History timeline of the Rosary
- [x] /misterios-do-dia - Daily mysteries with official Vatican scripture references
- [x] /oracoes-tradicionais - Traditional prayers from Vatican sources

### Official Vatican Content Integration
- [x] All mysteries sourced from vatican.va/special/rosary
- [x] Scripture references from Rosarium Virginis Mariae (2002)
- [x] Official prayer texts following CNBB standards
- [x] Source attribution on all content pages
- [x] Latin prayer names included for reference

### Design System
- [x] Created STYLE_GUIDE.md with comprehensive design documentation
- [x] Color palette with Sacred Blue, Metallic Gold, Sacred Cream
- [x] Component specifications (buttons, cards, navigation)
- [x] Animation and effect guidelines
- [x] Accessibility requirements documented

### Components
- [x] PageHeader - Consistent header for content pages
- [x] ThemeToggle - Dark/light mode switcher
- [x] Navbar - Floating pill (desktop) + header (mobile)
- [x] Glass-morphism cards with sacred borders
- [x] Gold glow effects on buttons

## Backlog / Future Features

### P0 (Critical)
- [ ] Backend integration testing
- [ ] User authentication flow
- [ ] Check-in functionality

### P1 (High Priority)
- [ ] Dashboard page redesign
- [ ] Community feed styling
- [ ] Prayer request feature
- [ ] Streak counter enhancements

### P2 (Medium Priority)
- [ ] Audio prayers feature
- [ ] Push notifications
- [ ] Offline mode support
- [ ] Multiple language support

### P3 (Nice to Have)
- [ ] Rosary bead animation during prayer
- [ ] Dark mode auto-schedule
- [ ] Sharing to social media
- [ ] Family/group prayer sessions

## Branch Information
- Branch: `feature/ui-redesign-landing-pages`
- Created: January 2026
- Status: Complete - Ready for review

## Technical Notes
- All changes are on feature branch (not main)
- Frontend build compiles successfully
- All frontend tests passing
- Theme persistence working across reloads
- Mobile responsive design verified
- **Official Vatican content verified and attributed**

## Content Sources
- Vatican Holy See: https://www.vatican.va/special/rosary/
- Rosarium Virginis Mariae: Pope Saint John Paul II (October 16, 2002)
- CNBB (Conferência Nacional dos Bispos do Brasil) for Portuguese translations
