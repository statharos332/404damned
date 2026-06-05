# Build Your Own Amsterdam — No Downloads, No Licenses

You own this 3D city 100%. No CC attribution, no marketplace, nothing to
credit. A script builds it; you tweak it; you export it.

## Steps (5 minutes)

1. **Get Blender** — free at [blender.org](https://blender.org) (3.6+ or 4.x).
2. Open Blender → top tabs → **Scripting**.
3. Click **New**, open `blender_amsterdam_generator.py`, paste it all in
   (or **Text → Open** the file directly).
4. Hit **Run Script** (▶). The canal city appears in the viewport and a
   file is written next to your .blend (or `/tmp`):
   `amsterdam_canal.glb`
5. Copy that file to:
   `your-project/public/models/amsterdam_canal.glb`
6. Reload the website. The hero **auto-detects** the model and loads it
   instead of the procedural fallback. Done. 🔥

## Make it yours (edit the CONFIG block at the top)

```python
SEED            = 404   # any number → totally different street layout
HOUSES_PER_SIDE = 14    # more/fewer houses per canal bank
DISTANT_HOUSES  = 18    # the hazy background skyline
CANAL_WIDTH     = 14.0  # how wide the water is
```

Change `SEED` and re-run for infinite variations until one looks perfect.

## What the script gives you

- Two banks of Dutch canal houses with **3 authentic gable styles**
  (triangular, stepped, bell) — randomized heights, widths, brick colors
- **Lit + dark windows** (front & back) — lit ones are emissive and named
  `window_lit`, so the website makes them **glow through Bloom** automatically
- **Two stone bridges** with glowing lamps (some red — 404 DAMNED signature)
- A **boat** on the canal with a red lamp (`neon_red`)
- A reflective **water plane**
- **Draco-compressed** GLB export → small + web-fast out of the box

## Want it even more polished? (optional, in Blender)

- Select all houses → add a **Bevel** modifier for softer edges
- Drop free **Quixel Megascans** brick textures (fab.com, free) onto the
  body material for photoreal facades
- Add an **Area light** above the canal for softer global illumination
  before export

The website's lighting, bloom, reflections and camera already do the
heavy lifting — even the raw script output looks cinematic once it's in
the scene.
