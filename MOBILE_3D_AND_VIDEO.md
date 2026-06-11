# 📱 3D on mobile + lazy video everywhere

## 3D now runs on mobile AND desktop — without hurting CWV
The WebGL hero used to be fully OFF on phones. Now it runs everywhere,
but mobile (and very weak devices) get an automatic **"lite" quality tier**:

| Setting            | Desktop      | Mobile (lite) |
|--------------------|--------------|---------------|
| Pixel ratio (dpr)  | up to 1.5    | 1             |
| Shadows            | on           | off           |
| HDR env resolution | 1024         | 256           |
| Reflection render  | every 2nd fr | every 3rd fr  |
| Reflection texture | 1024²        | 512²          |
| Post-processing    | on           | off           |
| Sparkles           | 80           | 30            |

Plus the protections already in place, untouched:
- Mounts only after the browser is idle (poster paints first → fast LCP).
- `VisibilityGate` pauses ALL rendering when the hero scrolls off-screen.
- Still skipped only for `prefers-reduced-motion` and data-saver / 2g.

Net effect: phones get the real 3D canal, but at a weight that keeps
Largest Contentful Paint, INP and Total Blocking Time healthy.

> If you ever want it even lighter on the oldest phones, lower the mobile
> branch: set `lite` dpr stays 1, or drop `<Sparkles>` entirely when lite.

## Lazy video everywhere (the Lama-Lama load pattern, locally)
What you saw on lamalama.com was **HLS streaming** (`.m3u8` + a `blob:` URL)
served from a paid video CDN (Bunny). For your compressed 1–2 MB clips the
practical win is the **lazy + fade-in** behaviour, which we now do natively:

- New **`LazyVideo`** component: `preload="none"`, loads & plays only when
  it scrolls into view (IntersectionObserver), pauses off-screen, and fades
  in over its poster — exactly the perceived effect Lama Lama gives.
- Used by the **work media strips** (`WorkExplorer`) and the cover system
  (`CoverMedia`) — so no video downloads until it's actually seen.

### Want true HLS later?
If you move videos to a CDN (Bunny Stream / Cloudflare Stream / Mux):
1. Upload the clip there → you get a `playlist.m3u8` URL.
2. `npm i hls.js`.
3. In `LazyVideo`, when `src` ends in `.m3u8`, attach hls.js:
   ```ts
   import Hls from "hls.js";
   if (src.endsWith(".m3u8") && Hls.isSupported()) {
     const hls = new Hls(); hls.loadSource(src); hls.attachMedia(video);
   }
   ```
That's the only code change — the lazy/fade logic stays the same. For now,
local MP4 is simpler, free, and fast enough at your file sizes.
