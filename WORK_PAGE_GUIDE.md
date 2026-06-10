# 🗂️ Work / Portfolio — how it's wired & how to add projects

## What you got
- **`/work`** — full case-study listing (server-rendered, SEO metadata)
- **`/work/<slug>`** — a dedicated page per project (own title, description,
  OG image, JSON-LD structured data, prev/next) — great for ranking
- **Homepage preview** — `WorkPreview` section (`#work`) shows the
  `featured` projects with a "View All Work" link to `/work`
- **Sitemap** — `/work` and every case study auto-added
- All projects come from ONE file: **`src/data/projects.ts`**

## Add a new project (2 minutes)
1. Open **`src/data/projects.ts`** and append a new object to `projects`.
   Copy an existing one and edit the fields. `slug` must be unique and
   URL-safe (e.g. `acme-webshop`).
2. Set `featured: true` if you want it on the homepage preview.
3. Drop screenshots in **`public/work/<slug>/`**:
   - `cover.svg` (or `.jpg`) — 1600×1000 recommended
   - `shot-1`, `shot-2` … for the gallery
4. That's it — the list page, the `/work/<slug>` page, and the sitemap
   update automatically.

## Swap placeholders for real screenshots
The repo ships branded **.svg placeholders** so it builds immediately.
To use real screenshots:
1. Add e.g. `public/work/noord-fashion/cover.jpg`
2. In `src/data/projects.ts`, change that project's `cover` (and gallery
   paths) from `.svg` to `.jpg`.
3. Once ALL placeholders are replaced with raster images, you can remove
   `dangerouslyAllowSVG` from `next.config.ts` (optional).

## Fields explained
- `summary` — one line, shown on cards
- `challenge / approach / outcome` — the story on the case study page
- `results` — the big stat numbers (keep to 3 for a clean grid)
- `services` / `stack` — chips shown on the detail page
- `liveUrl` — optional; shows a "Visit Live Site" button when set

## SEO note
Each case study is a real indexable URL with its own metadata + structured
data. Write the `challenge/approach/outcome` in real sentences with the
words clients search ("Magento webshop", "Amsterdam") — that's what ranks.
