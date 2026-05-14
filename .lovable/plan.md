## Goal
Make the portfolio feel **realistic and three-dimensional** — depth, light, material, motion — while **keeping the existing hero portrait image and all current content/copy unchanged**. The portrait stays exactly as-is; depth is layered around and on top of it.

## Hero portrait — kept, but presented in 3D
- **Same image, same crop.** No replacement, no AI edit.
- Add **mouse-driven parallax**: portrait translates a few pixels and tilts subtly (rotateX/Y up to ~3°) following the cursor — gives the feel of a real photograph behind glass.
- **Layered depth lighting**: a soft volumetric blue light from the left and warm orange rim light from the right (existing palette), drifting slowly behind the portrait.
- **Filmic grain overlay** (subtle SVG noise, ~4% opacity) on top of the image for realism.
- **Foreground/background separation**: the title text moves slightly faster than the portrait on scroll → real parallax depth.
- Disabled on touch devices and when `prefers-reduced-motion` is set.

## Global theme upgrades (`src/styles.css`)
- New material tokens: `--shadow-elevated`, `--shadow-inset`, `--shadow-glow-blue/orange`, `--gradient-card`, `--gradient-border`.
- Utilities: `.grain` (filmic noise), `.vignette` (section edge darkening), `.glass` (frosted card surface).
- Keyframes: `tilt-float`, `shimmer`, `pulse-glow`.

## Section-by-section depth pass

### Navbar
- Glass hairline: thin gradient border + 1px top highlight on scroll, so the bar reads as real glass.

### Services cards
- **Tilt-on-hover** (perspective + rotateX/Y from cursor); icon lifts on Z-axis.
- Animated gradient border + soft drop shadow that intensifies on hover.

### Work carousel cards
- Same tilt-on-hover treatment.
- Tech chips get inset shadow (pressed-in feel).
- ExternalLink icon lifts and rotates on hover.

### About — stats grid
- Each stat becomes a **floating glass tile** with top highlight + soft cast shadow; staggered slow float animation.

### Experience timeline
- Flat circle markers → **3D orbs** (radial gradient highlight + cast shadow on the timeline).
- Vertical line → gradient (primary → transparent).
- Each entry sits on an elevated card; lifts on hover.

### Contact
- Buttons → **3D pills**: top highlight, bottom shadow, press-down on `:active`.
- Social icons lift + glow on hover.

### Scroll-triggered reveals
- Tiny `useInView` hook → fade-up + slight rotateX on entry for section headings and cards. Adds layered, sequential depth as you scroll.

## Technical notes
- **No new dependencies.** All effects are CSS + small React hooks (mouse position, in-view). No WebGL / Three.js, so bundle and load time stay the same.
- All depth comes from `transform: perspective(...) rotateX/Y/Z`, layered `box-shadow`, `radial-gradient`, and `color-mix`.
- Existing semantic tokens reused; new tokens added in `src/styles.css` only.
- Respects `prefers-reduced-motion`; mobile disables tilt.

## Out of scope
- ❌ No changes to the hero portrait image, crop, or framing.
- ❌ No copy, content, or section reordering changes.
- ❌ No font changes.
- ❌ No literal 3D models / Three.js.

## Files touched
- `src/styles.css` — tokens, utilities, keyframes
- `src/components/portfolio/HeroSection.tsx` — parallax, light, grain (image untouched)
- `src/components/portfolio/Navbar.tsx` — glass hairline
- `src/components/portfolio/ServicesSection.tsx` — tilt cards
- `src/components/portfolio/WorkSection.tsx` — tilt cards
- `src/components/portfolio/AboutSection.tsx` — floating stat tiles
- `src/components/portfolio/ExperienceSection.tsx` — 3D orbs, gradient timeline
- `src/components/portfolio/ContactSection.tsx` — 3D buttons
- `src/hooks/use-tilt.ts` *(new)* — reusable mouse-tilt hook
- `src/hooks/use-in-view.ts` *(new)* — reveal-on-scroll hook
