## Plan: Use the uploaded GLB as the hero 3D model

### 1. Add the asset
- Copy `user-uploads://polywork_scene.glb` → `public/models/polywork_scene.glb` (public so drei's `useGLTF` can fetch it at runtime; large binaries shouldn't go through Vite's import pipeline).

### 2. Rebuild `Hero3DModel.tsx`
- Replace the hand-built primitives character with a `<PolyworkScene />` component using `useGLTF("/models/polywork_scene.glb")`.
- Render `<primitive object={scene} />` inside a `<group>` so we can:
  - Apply cursor-driven rotation on Y (and a touch on X) — same smooth lerp as today.
  - Auto-center & scale the model to fit the hero canvas (compute bounding box once on load).
- Preload with `useGLTF.preload("/models/polywork_scene.glb")`.
- Wrap in `<Suspense fallback={null}>`.

### 3. Animation playback (live → pause on scroll)
- If the GLB ships with embedded animations, drive them via drei's `useAnimations(animations, group)`:
  - On mount: play all clips.
  - When `typing` prop becomes false (user scrolled), call `action.paused = true` (smoothly via `fadeOut(0.4)`).
  - When `typing` becomes true again: `reset().fadeIn(0.4).play()`.
- If the GLB has no clips, fall back to a gentle idle wobble via `useFrame` (subtle Y rotation + breathing scale) that we similarly damp to zero when scrolled.

### 4. Lighting & environment
- Keep `ambientLight` + key/fill directional lights, plus `<Environment preset="city" />` for PBR materials baked into the GLB.
- Keep `<ContactShadows>` under the model for grounding.
- Tune camera (`position`, `fov`) after first render based on the model's bounding box.

### 5. Wiring
- `HeroSection.tsx` already passes `mouseX`, `mouseY`, `typing={scrollProgress < 0.05}` — no changes needed there.
- Keep the `lazy()` import so the GLB only downloads when the hero mounts.

### Notes
- I won't know the exact scale/orientation of your GLB until it loads — I'll center/normalize it programmatically and then nudge camera distance if it looks off.
- If you'd later prefer tighter file size, we can convert to Draco/Meshopt-compressed GLB; for now we'll load it as-is.
