# 📚 Teachings Hub Technical Roadmap (`/ensinamentos` & Content Pages)

## 📝 Description
The canonical reading hub serving as a digital Catholic compendium. It dynamically renders MDX articles from the local filesystem, providing a beautiful reading experience with progress tracking and URL-synced filtering.

## ✨ Planned Features
1. **URL-Synced Pill Filters**: Filter content categories via URL parameters (e.g., `?tema=santos`) so users can share specific views.
2. **Scroll Progress Tracking**: A visual indicator at the top of the screen showing how far the user has read.
3. **Intersection Animations**: Related articles and bottom elements fade in seamlessly as the user scrolls to them.
4. **MDX Rendering Pipeline**: (Already partially complete) Full support for rich Markdown with injected React components.

## 🛠️ Implementation & Technical Approach
*   **Routing & Filtering**:
    *   In `/ensinamentos/page.tsx`, use Next.js `useSearchParams` to read the `tema` query parameter.
    *   Update filters using `router.push('?tema=novo_tema', { scroll: false })` to prevent jumping to the top of the page during client-side navigation.
*   **Scroll Progress Bar (`<ScrollProgress />`)**:
    *   Attach an event listener to `window` for the `scroll` event.
    *   Calculate: `const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;`
    *   Apply this to an SVG `<line>` or a fixed `<div>` with `width: ${scrolled}%`. Throttle the scroll listener using `requestAnimationFrame` for 60fps performance.
*   **Scroll Animations**:
    *   Use `framer-motion`'s `whileInView={{ opacity: 1, y: 0 }}` and `viewport={{ once: true, margin: "-100px" }}` on the `<RelatedArticles />` and `<ArticleSidebar />` components to trigger entrance animations naturally.
*   **SEO & Metadata**:
    *   Ensure dynamic `generateMetadata` exports in `[slug]/page.tsx` that read the `gray-matter` frontmatter from the MDX file to populate `<title>`, `<meta name="description">`, and OpenGraph tags.

## 🚧 Difficulty
**Easy to Medium** (Mostly UI polish and React hooks, as the complex MDX parsing pipeline is already built)

## 🔗 Dependencies
*   `next/navigation` (`useRouter`, `useSearchParams`)
*   `framer-motion` (Scroll-linked animations)
*   `@next/mdx`, `next-mdx-remote`, `gray-matter` (Already installed for the pipeline)
