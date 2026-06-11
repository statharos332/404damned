# ⚡ Core Web Vitals — full pass

## Biggest wins applied

### 1. Media weight: 24 MB → 9.5 MB public folder
Compressed every heavy video (H.264, ≤1280px, audio stripped, faststart):
- skg clip-1: **13 MB → 1.8 MB**
- skg cover/shot-1, etsyboost shot-1/2: all 2–2.8 MB → ~1 MB each
- LCP poster (skg shot-2.webp): **184 KB → 64 KB**

### 2. Videos are now lazy (CoverMedia)
- `preload="none"` + IntersectionObserver: a video cover only downloads &
  plays when it scrolls into view, pauses when it leaves.
- Poster paints first, video fades in → protects LCP & INP, saves data.

### 3. Strip videos `preload="metadata"`
Inside expanded work rows, videos no longer fully download until played.

### 4. 3D hero off on mobile / data-saver / slow nets
The WebGL hero already deferred to idle + visibility-gated; now it's also
skipped on `max-width: 820px`, `prefers-reduced-motion`, <4 CPU cores,
`saveData`, and 2g. Phones (where CWV is hardest) get the light poster.

### 5. next.config tuned
- `deviceSizes`/`imageSizes` trimmed → fewer, smaller image variants.
- 1-year immutable cache on all static media (mp4/webm/webp/avif/img/3D).
- Added `X-Content-Type-Options`, `Referrer-Policy`, DNS-prefetch headers.

## What each metric should look like now
- **LCP** — light SVG/webp poster is the LCP element, video defers → fast.
- **CLS** — every media box has a fixed aspect ratio wrapper → ~0.
- **INP/TBT** — heavy WebGL skipped on mobile, deferred elsewhere; videos
  don't compete for the main thread on load.

## After deploy — verify
1. `npm install && rm -rf .next && npm run build && npm start` (prod build)
2. Run **pagespeed.web.dev** on the live URL (mobile + desktop tabs)
3. Watch **Vercel → Speed Insights** for real field data over a few days

## Optional further gains
- Serve a `.webm` (VP9/AV1) alongside each `.mp4` for ~30% smaller video.
- Replace the 1.5 MB hero `.exr` with drei's `preset="night"` (CDN, cached,
  ~0 download) if you ever want the desktop hero even lighter.
- Convert remaining `.svg` placeholders to real `.webp` screenshots.
