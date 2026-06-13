# 🖼️ Work media — no more cropping + homepage expandable rows

## What changed
1. **Homepage featured work → expandable rows.** The homepage now uses the
   same expandable WorkExplorer as /work (featured projects only, no filter
   bar). Click a row → inline media strip, just like Lama Lama.
2. **Media strip is more striking** — hover scale, electric-blue border on
   hover, index tags, scanline sweep, custom thin scrollbar.
3. **No more cropping.** Each media tile sizes to the file's real shape.

## How to stop a video/photo from being cropped
In `src/data/projects.ts`, every media item can declare its EXACT aspect:

```ts
media: [
  // exact ratios — the tile matches the file perfectly, zero crop:
  { type: "video", src: "/work/x/reel.mp4", aspect: "16/9", poster: "..." },
  { type: "image", src: "/work/x/shot.jpg", aspect: "9/16" },
  { type: "image", src: "/work/x/square.jpg", aspect: "1/1" },

  // or just a rough bucket (4:5 portrait / 3:2 landscape) if you don't
  // know the exact ratio — may crop slightly:
  { type: "image", src: "/work/x/photo.jpg", ratio: "portrait" },
]
```

**Rule of thumb:** if you don't want ANY cropping, set `aspect` to the real
ratio of the file (width/height). Common values:
- Phone video / story: `9/16`
- Standard video: `16/9`
- Square: `1/1`
- Classic photo: `4/3` or `3/2`

The tile then has exactly that shape and the whole frame shows.

## Tip to find a file's ratio
- Image: it's just width / height (e.g. 1920×1080 → `16/9`).
- Video: same — check the file properties.
