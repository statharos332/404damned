# ⚡ 404 DAMNED — Performance Optimizations

## What changed & why

### 1. `next.config.ts`
- **Removed `images.unoptimized: true`** — this was the biggest win. It had
  disabled ALL of Next's image optimization. Now AVIF/WebP, resizing and
  lazy-loading work, so real `<Image>` images ship tiny.
- **`optimizePackageImports`** (framer-motion, lucide-react, drei) →
  tree-shakes huge libs so only used code is bundled.
- **`removeConsole` in production** → smaller JS, no leaked logs.
- **Immutable 1-year cache** on `glb/gltf/hdr/mp4/webm` + 30-day image cache
  → repeat visits are instant.

### 2. `page.tsx` — code-splitting
- Above-the-fold (Nav, Hero, Marquee, Services) load eagerly.
- Everything below (Case Studies, Why, Process, Testimonials, Pricing,
  Contact, Footer) is **dynamically imported** and streamed in on scroll.
- A skeleton reserves height → no layout shift (good CLS).
- Result: the initial JS bundle is much smaller → faster LCP & lower TBT.

### 3. `HeroSection.tsx` — defer the heavy WebGL
- The lightweight **poster paints first** (great LCP target).
- The Three.js canvas mounts **only after the browser is idle**
  (`requestIdleCallback`, 2s timeout) so it never blocks first paint.
- Still disabled entirely on reduced-motion / low-core devices.

### 4. `hero-poster.svg`
- New ~3 KB vector poster (red/black Amsterdam silhouette) so there's an
  instant LCP element behind the headline while 3D loads.

### 5. Fonts
- Already optimal: `next/font` self-hosts DM Sans + Space Grotesk with
  `display: swap` (auto preload, zero layout shift). No change needed.

### 6. Vercel Analytics + Speed Insights
- Added `@vercel/analytics` and `@vercel/speed-insights`.
- Enable them in the Vercel dashboard → see your real Core Web Vitals
  (LCP/CLS/INP) from actual visitors.

## After you deploy
1. `npm install` (pulls the 2 new Vercel packages)
2. Deploy to Vercel
3. Run **PageSpeed Insights** (pagespeed.web.dev) on your live URL
4. Check **Vercel → your project → Speed Insights** for field data

## Further wins (optional, if you want even more)
- Convert any `<img>` in sections to `next/image` `<Image>` (now that
  optimization is on) for automatic AVIF/WebP + lazy-load.
- Lower the 3D scene's geometry/pixel-ratio on mobile if INP dips.
- Add `loading="lazy"` to any below-fold media not already lazy.

The big rocks (image optimization, code-splitting, deferred WebGL,
caching) are done — these are what move the PageSpeed needle most.
