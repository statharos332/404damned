# 🎉 Lama-Lama-Inspired Homepage Redesign

Party-energy, high-tech, Amsterdam-after-dark feel — kept on YOUR
dark-luxury base (red/black) with an **electric blue (#00E5FF)** +
**lime (#C6FF00)** explosion accent for the playful pop.

## New components
- **`ui/SectionLabel.tsx`** — the `[ our vibe ]` bracket labels (red/electric/lime)
- **`sections/ScrollingStrip.tsx`** — signature big infinite marquee
  ("CODE · CREATE · DOMINATE"), used twice on the home, one reversed
- **`sections/VibeSection.tsx`** — "Rock 'n roll minds with warm hearts"
  + 4 core-value cards with colored glow blobs
- **`sections/ClientsStrip.tsx`** — scrolling client names + awards flex
- **`sections/BriefCTA.tsx`** — big "It's a match / we'll bring the snacks" CTA

## New homepage order (`app/page.tsx`)
Hero → **strip** → Services → Capabilities → **strip (reversed)** →
Work preview → Vibe → Why → Process → Clients+Awards → Pricing →
Brief CTA → Contact → Footer

## New theme tokens (`globals.css`)
- `--color-electric` #00E5FF, `--color-lime` #C6FF00
- `marquee-reverse`, `marquee-fast`, `spin-slow` animations

## Make it yours
- **Client names** → edit the `clients` array in `ClientsStrip.tsx`
- **Awards** → fill the `awards` array (placeholders now)
- **Strip words** → change the `words={[...]}` props in `page.tsx`
- **Copy tone** → it's intentionally bold/playful; tweak to taste
- The colored glow blobs are pure CSS (no perf cost)

## Performance kept intact
Every below-fold section is still code-split. The strips are pure CSS
animation (GPU, no JS). The 3D hero still has its visibility-gate.

## Want next
- Apply the same energy to `/work` and `/services` pages
- Add a marquee of real client logos (drop PNGs in /public/clients)
- A playful custom cursor that reacts to the accent colors
