# Plan: Abhay Chaudhary Portfolio

The uploaded `portfolio-main.zip` is a complete Vite + React portfolio for Abhay Chaudhary (UI/UX Developer). I'll port it into this project's TanStack Start stack — keeping the design, copy, assets, and interactions, but restructured to follow the project's conventions (file-based routing, Tailwind v4 tokens, separate routes per section for SSR/SEO).

## What ships

**Brand & identity**
- Name: Abhay Chaudhary, role "UI/UX Developer"
- Logo mark: "AC" pill in nav
- Resume download (`Abhay_Chaudhary_Resume.pdf`)
- Social: GitHub (`Abhay122710`), LinkedIn (`abhay5100`)
- Hero portrait + "vendor coming soon" image from the zip

**Visual style** (from the source's `index.css`)
- Dark cinematic theme, glow spots (blue + orange), animated float
- Cinematic gradient overlay on hero, parallax + zoom + blur on scroll
- "Text glow", uppercase tracked microcopy, blurred sticky nav
- Custom keyframes: `hero-zoom`, `fade-up`, `fade-in`, `scroll-bounce`, `float`

**Pages / routes**
Per project rules, each major section becomes its own route with unique `head()` metadata, plus the home page combining a hero + condensed highlights.

```
/             Home — hero, brief intro, links to all sections
/services     Services offered
/work         Selected work / case studies (with Coming Soon modal for locked items)
/about        About Abhay
/experience   Experience timeline
/contact      Contact form + socials
```

A shared `Navbar` (in `__root.tsx`) uses `<Link to="/services">` etc. instead of hash anchors.

**Components ported**
- `Navbar`, `NavLink`, `HeroSection`, `ServicesSection`, `WorkSection`, `AboutSection`, `ExperienceSection`, `ContactSection`, `ComingSoonModal`

## Technical notes

- Move assets to `src/assets/` (`hero-portrait.jpg`, `vendor-coming-soon.jpg`) and `public/` (`Abhay_Chaudhary_Resume.pdf`, `favicon.ico`).
- Translate the source's `tailwind.config.ts` HSL tokens + custom utilities (`glow-spot-blue`, `cinematic-gradient`, `hero-overlay`, `nav-blur`, `text-glow`, `animate-*`) into `src/styles.css` using Tailwind v4 `@theme` + `@layer utilities` with `oklch` color values.
- Replace `react-router` `<Link>` and hash `<a href="#section">` with TanStack `<Link to="/...">`. Drop the old `src/App.tsx` / `src/pages/` structure.
- Each route file sets `head()` with route-specific `title`, `description`, `og:title`, `og:description`. Hero portrait wired as `og:image` on `/` and `/about`.
- Contact form: client-side only for now (shows a sonner toast on submit). No Lovable Cloud / email backend unless you want it.
- 404 already handled by `__root.tsx`.

## Open questions (optional — defaults shown)

- **Contact form behavior**: default = toast only (no email send). Say the word if you want real email delivery (would need Lovable Cloud + a server function).
- **Work items**: the original keeps several projects behind a "Coming Soon" modal. I'll preserve that as-is unless you want real project entries swapped in.
