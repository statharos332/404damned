# 404 DAMNED — Photorealistic 3D Hero: Asset & Build Guide

## ✅ IT RUNS RIGHT NOW — zero downloads needed

The hero works immediately after `npm install && npm run dev`:
- **Lighting + reflections** use drei's built-in `preset="night"`, which
  streams a small HDR from a CDN automatically. No local file required.
- **The city** is generated procedurally (canal houses + lit windows) so
  the scene is never empty.

You only add asset files when you want to push from "great" to
"photoreal". Everything below is the **upgrade path**, not a requirement.

> ⚠️ The previous 404 error happened because the code pointed at
> `/hdr/amsterdam_night_1k.hdr` before that file existed. That's now
> replaced with the built-in preset, so the error is gone.

---

## Upgrade to FULL photorealism (optional)

### 1. The 3D city model → `/public/models/amsterdam_canal.glb`
Drop a real GLB here and the component **auto-detects and loads it**
(falling back to procedural if it's missing). Sources:

### Option A — Buy a ready-made model (fastest, ~€20–150)
Search these marketplaces for **"Amsterdam canal houses"** / **"Dutch
canal street"** / **"European old town night"**:
- **Sketchfab** (sketchfab.com) — filter by *Downloadable* + *glTF*. Many
  photoscanned, PBR-textured canal-house packs. Buy, download the `.glb`.
- **CGTrader** (cgtrader.com) — search "Amsterdam canal house", filter
  format = glTF/GLB. High-detail PBR models.
- **TurboSquid** (turbosquid.com) — premium, "check mark" = clean topology.
- **Quixel Megascans** (now free via Fab.com) — photoscanned building
  facades + props; assemble a street in Blender.

Pick a model under ~30 MB (compressed) for web. If it's `.fbx`/`.obj`,
convert to `.glb` in Blender (File → Export → glTF 2.0).

### Option B — Build it in Blender (best quality, full control)
1. Block out 8–12 canal houses (the step-gable silhouette is the icon).
2. Apply **Quixel Megascans** brick / plaster / roof-tile PBR materials.
3. Add emissive planes behind windows; name them `window_lit` so the
   component auto-glows them through Bloom. Name any neon mesh `neon_red`.
4. Export glTF 2.0, **+Y up**, apply modifiers, include textures.

### Option C — AI 3D generation (experimental, fast iteration)
- **Luma Genie**, **Meshy.ai**, **Tripo3D** — type "Amsterdam canal house
  at night, photorealistic" → export `.glb`. Quality varies; good for a
  hero centerpiece, less for a full street.

### Option D — Photogrammetry (if you want the *actual* building)
Shoot 80–150 photos of a real Amsterdam facade → process in
**RealityCapture** (free) or **Polycam** → export decimated `.glb`.

### Compress before shipping (do this always)
```bash
npx gltf-transform optimize amsterdam_canal.glb amsterdam_canal.glb \
  --texture-compress webp --simplify
# or Draco:
npx gltfpack -i raw.glb -o amsterdam_canal.glb -cc
```
Target: **< 25 MB**. Use `<meshopt>` or Draco; R3F/drei decode both.

---

### 2. (Optional) Custom HDR → swap the preset for your own
The built-in `preset="night"` already works. To use a specific Amsterdam
night sky, download a 1K `.hdr` from **Poly Haven** (free, CC0 —
polyhaven.com/hdris, search "night"), drop it in `/public/hdr/`, and in
`AmsterdamHero3D.tsx` change:
```tsx
<Environment preset="night" background={false} />
// to:
<Environment files="/hdr/your_night_1k.hdr" background={false} />
```

---

### 3. (Optional) Water normal map for extra ripple detail
The canal already reflects via `MeshReflectorMaterial`. For finer surface
ripples, download a **Normal (GL)** water map from Poly Haven, save as
`/public/textures/water_normals.jpg`, then add a `normalMap` prop to the
`<MeshReflectorMaterial>` in `CanalWater`.

---

## 4. Optional: a poster fallback → `/public/hero-poster.jpg`

Render one beautiful still of your scene (or screenshot it once it runs)
at ~1920×1080, save as `hero-poster.jpg`. It shows on mobile, low-power
GPUs, reduced-motion users, and during the first paint — so the hero is
never empty. Performance + accessibility win.

---

## 5. Install & run

```bash
npm install
# the 3D stack is already in package.json:
#   three, @react-three/fiber, @react-three/drei,
#   @react-three/postprocessing, postprocessing, @types/three
npm run dev
```

Place the three asset files, reload, and the hero is photorealistic.

---

## 6. Performance checklist (so it stays Awwwards-fast)

- [ ] Model **< 25 MB**, textures WebP/Draco compressed
- [ ] HDR at **1K**, not 4K
- [ ] `dpr={[1, 2]}` cap (already set) — never render above 2×
- [ ] `<AdaptiveDpr>` drops resolution if FPS sags (already wired)
- [ ] 3D disabled automatically on `prefers-reduced-motion` + weak GPUs
      (already in `HeroSection.tsx`)
- [ ] Lazy-load: the canvas is `dynamic(..., { ssr: false })` (already done)
- [ ] Lighthouse: keep hero JS chunk lazy so LCP stays on the poster image

---

## 7. How the realism is achieved (what the code already does)

| Technique | Where | Effect |
|---|---|---|
| ACES Filmic tone mapping | `Canvas gl` + `ToneMapping` | film-grade color, no blown highlights |
| HDR environment | `<Environment>` | real reflections + soft ambient |
| Selective Bloom | `<Bloom luminanceThreshold>` | only window/neon glow blooms |
| Depth of Field | `<DepthOfField>` | shallow cinematic focus |
| MeshReflector water | `<CanalWater>` | true screen-space canal reflections |
| Emissive material convention | `window_lit` / `neon_red` mesh names | windows + neon glow on their own |
| Exponential fog | `<fogExp2>` | atmospheric depth down the canal |
| Cinematic camera rig | `<CameraRig>` | dolly + mouse parallax + scroll drive |
| Sparkles + Cloud | `<Atmosphere>` | embers + drifting night fog |

You supply the assets; the lighting/grading/motion pipeline is done.
