## Goal

Make the existing hero portrait feel like a real 3D head that turns toward the cursor, **without changing the face**. Combine two techniques:

1. **Multi-angle frame swap** — pre-generate 5 slight head turns from the existing photo
2. **Depth-map parallax** — separate foreground (face) from background and shift them in opposite directions

## How it works

```text
cursor X (-1 → +1) ──► pick frame:  [far-left | left | center | right | far-right]
cursor X/Y ──────────► foreground translate(+) / background translate(-) → parallax depth
```

All 5 frames preload, then the closest one to the cursor's horizontal position is shown. Tiny depth parallax adds layered motion on top so it doesn't look like a flipbook.

## Step 1 — Generate the angle frames (one-time, agent-side)

Use `imagegen--edit_image` with `src/assets/hero-portrait.jpg` as input, 5 prompts:

- `hero-portrait-far-left.jpg`  — "head turned ~15° to the viewer's left, same face, same lighting, same crop, same clothing, photorealistic"
- `hero-portrait-left.jpg`      — "head turned ~7° to the viewer's left, …"
- `hero-portrait-center.jpg`    — copy original (no edit)
- `hero-portrait-right.jpg`     — "head turned ~7° to the viewer's right, …"
- `hero-portrait-far-right.jpg` — "head turned ~15° to the viewer's right, …"

Then generate one depth/foreground cutout:
- `hero-portrait-fg.png` — background removed (transparent), kept aligned with center frame, used for the parallax foreground layer

QA: open each generated frame and verify the face still resembles the original. Re-prompt if drift is too large. **The original `hero-portrait.jpg` is never overwritten.**

## Step 2 — Hero rendering (`HeroSection.tsx`)

Replace the single `<img>` with a stack:

```text
[ background frame layer ]   ← swaps based on cursor.x, shifts opposite to cursor
[ foreground PNG (fg)    ]   ← shifts with cursor, slightly larger
[ existing grain + lights ]
```

- Preload all 5 frames on mount with `<link rel="preload">` so the swap is instant.
- Map `mouse.x ∈ [-1, 1]` to one of the 5 frame indices (thresholds at ±0.6, ±0.2).
- Foreground translateX/Y = `mouse * 14px`, rotateY up to ~4°.
- Background translateX/Y = `mouse * -6px` (opposite direction → parallax).
- Cross-fade frames over 120ms so transitions are smooth, not jumpy.
- Disable everything on touch devices and `prefers-reduced-motion`; fall back to the original single image.

## Step 3 — Performance & fallback

- Total added weight: ~5× ~150 KB JPEGs + 1 PNG ≈ ~1 MB — preloaded but lazy-decoded.
- If any frame fails to load, the layer falls back to the center/original image silently.

## Out of scope

- ❌ No Three.js / WebGL / real 3D mesh.
- ❌ No copy, layout, palette, or font changes.
- ❌ Original `hero-portrait.jpg` is not modified.

## Files touched

- `src/assets/hero-portrait-far-left.jpg` *(new, AI-generated)*
- `src/assets/hero-portrait-left.jpg` *(new)*
- `src/assets/hero-portrait-right.jpg` *(new)*
- `src/assets/hero-portrait-far-right.jpg` *(new)*
- `src/assets/hero-portrait-fg.png` *(new, transparent foreground)*
- `src/components/portfolio/HeroSection.tsx` — frame swap + parallax layers
- `src/styles.css` — small additions for layer transitions (if needed)

## Risk note

AI-edited side angles may drift slightly from your real face. After generation I'll show you each frame; if any looks off, we re-roll just that one or drop it (e.g. keep only 3 frames).
