# ⚡ TBT / Main-Thread Fix (the 4,730ms problem)

## What the Lighthouse run showed
- FCP 0.3s · LCP 0.5s · CLS 0.001 · SI 1.0s → **excellent** (already done)
- **TBT 4,730 ms** and **main-thread 44.7s / script eval 43.6s** → the
  one real issue. **Cause: the Three.js hero rendering non-stop.**

## What changed in `AmsterdamHero3D.tsx`
1. **VisibilityGate** — an IntersectionObserver watches the canvas and
   sets the R3F frameloop to **"never" when the hero scrolls off-screen**,
   "always" when it's back. While you read the rest of the page, the 3D
   scene stops consuming the main thread entirely. *(biggest win)*
2. **Reflection pass throttled to every other frame** — the mirrored
   render is the most expensive op; running it at 30fps instead of 60fps
   is visually identical on rippling water and ~halves its cost.
3. **Pixel ratio capped at 1.5** (was 2) — far fewer pixels to shade on
   high-DPI/retina screens, big GPU saving for no visible loss.

## Why this is the right fix
TBT measures main-thread blocking. A WebGL scene that renders every frame
forever is pure main-thread work. Gating it by visibility + cutting the
per-frame cost attacks the number directly. Expect TBT to drop from
~4,700ms toward a few hundred ms, and "minimize main-thread work" to fall
dramatically, since the scene no longer runs once you've scrolled past it.

## After deploy
- `npm install` (no new deps, but safe) → `rm -rf .next` → deploy
- Re-run PageSpeed. If TBT is still high on very weak CPUs, options:
  - lower `dpr` to `[1, 1]`
  - drop shadows on mobile
  - reduce house count / draw distance in `ProceduralCity`

## Note on accessibility (was 96)
Lighthouse flagged **contrast**: some low-opacity white text
(e.g. `text-white/40`) on dark sections may be under the 4.5:1 ratio.
Bumping those to `text-white/60`–`/70` clears it. Tell me and I'll sweep
the whole site for low-contrast text.
