# 🎛️ Work Explorer — expandable rows + media strips + filters

Inspired by Lama Lama's case interaction, rebuilt in our own brutalist /
techno style.

## What it does
- **/work** now renders `WorkExplorer`: each project is an expandable ROW.
- Click a row → it opens an **inline horizontal media strip** that mixes
  **videos** (autoplay, muted, loop) + **portrait/landscape stills**.
- **Category filter bar** at the top (All / E-Commerce / Web Development /
  AI Automation …) with a live `[ NN ]` count.
- A `+` that rotates to `×` (electric blue) on open.
- Each open row shows result stats + "View case" + "[ live ]" buttons.

## Add media to a project (`src/data/projects.ts`)
Each project now has a `media: MediaItem[]` array and `tags: string[]`:
```ts
media: [
  { type: "image", src: "/work/<slug>/shot-1.jpg", ratio: "portrait" },
  { type: "video", src: "/work/<slug>/clip-1.mp4", ratio: "landscape",
    poster: "/work/<slug>/cover.jpg" },
],
tags: ["E-Commerce", "Magento", "CRO"],
```
- `ratio: "portrait"` → 4:5 tile · `"landscape"` → 3:2 tile. **Mix them**
  for that editorial gallery rhythm.
- Drop the files in `public/work/<slug>/`.

## Placeholders shipped
- `clip-1.mp4` in each project folder is a tiny 11 KB branded placeholder
  (says "REPLACE WITH PROJECT VIDEO"). Swap with real footage.
- Compress real clips for the web:
  ```
  ffmpeg -i in.mov -an -vf scale=1280:-2 -c:v libx264 -crf 24 \
    -movflags +faststart public/work/<slug>/clip-1.mp4
  ```
  Keep them short + muted; they autoplay in the strip.

## Filters
Categories come from each project's `category` field via `getCategories()`.
Add a project with a new category → it appears in the filter bar
automatically.

## Performance
- Videos are `playsInline muted loop` and only mount when a row is open
  (collapsed rows don't load video).
- Stills go through `next/image`.
