# 🎯 404 DAMNED — SEO Action Plan

## ✅ What's now DONE in the code (technical SEO)
- **Metadata** — title, description, keywords, canonical, robots
- **Open Graph + Twitter cards** — dynamic branded image (`opengraph-image.tsx`)
- **JSON-LD structured data** — rich `ProfessionalService` (geo, hours,
  services, social links) → eligible for rich results in Google
- **sitemap.xml** — auto-generated at `/sitemap.xml`
- **robots.txt** — auto-generated at `/robots.txt`, points to the sitemap
- **favicon** — `icon.svg` (the red 404 badge)
- **1 clean H1**, semantic sections, fast Next.js rendering

> Verify after deploy: open `https://404damned.nl/robots.txt`,
> `https://404damned.nl/sitemap.xml`, and
> `https://404damned.nl/opengraph-image` — all three should load.

---

## ⚠️ The honest truth: code ≠ rankings
A brand-new site does **not** appear in Google automatically. Technical
SEO makes you *understandable*; the steps below make you *found*. Expect
**3–6 months** before meaningful organic traffic.

---

## 🚀 Do these NOW (30–60 min, biggest impact)

### 1. Google Search Console  ← most important
- Go to **search.google.com/search-console**
- Add property `404damned.nl` → verify (Vercel: add the TXT DNS record,
  or upload the HTML file)
- Submit your sitemap: paste `sitemap.xml` under **Sitemaps**
- Click **Request Indexing** on your homepage URL
- This is how Google *discovers* you. Without it you wait months longer.

### 2. Bing Webmaster Tools (5 min, free traffic most agencies ignore)
- **bing.com/webmasters** → add site → import from Search Console (1 click)

### 3. Google Business Profile (huge for "agency Amsterdam" searches)
- **google.com/business** → create profile for 404 DAMNED
- Category: *Website designer / Marketing agency*
- Add address, hours, photos → you appear in **Maps** + local pack
- This alone can drive local Amsterdam leads fast.

---

## 📝 Content — what actually ranks (ongoing)
Google ranks **text**. A visual-heavy site needs written content to compete.

### Add real pages (each = a new chance to rank)
- **Case studies** as individual pages: `/work/noord-fashion`,
  `/work/amstel-construction` — write 400–800 words each: the problem,
  what you built, the results. These rank for "[service] case study".
- **Service pages**: `/services/web-development`,
  `/services/ai-automation`, `/services/magento` — one per service, each
  targeting that keyword + "Amsterdam".
- **A blog**: `/blog/...` — answer questions your clients Google, e.g.
  "how much does a Magento webshop cost", "Next.js vs WordPress for
  business". 1–2 posts/month compounds over time.

> Tip: when you add these routes, add them to `sitemap.ts` so Google
> finds them.

### Target keywords (Dutch + English mix for Amsterdam market)
- "digital agency Amsterdam" / "digital bureau Amsterdam"
- "webdevelopment Amsterdam", "Magento bureau Nederland"
- "AI automatisering bedrijf", "Next.js developer Amsterdam"
- Long-tail converts best: "premium webshop laten maken Amsterdam"

---

## 🔗 Backlinks — the #1 ranking factor after content
Other sites linking to you = Google trust. Easy starts:
- List on **Dutch agency directories** (Clutch, DesignRush, Sortlist,
  The Manifest) — free profiles, real backlinks + lead flow
- **Partner/client sites**: ask clients for a "Website by 404 DAMNED"
  link in their footer (every project = a backlink)
- **Local**: Amsterdam business associations, KvK, startup hubs
- Guest posts / podcasts in the NL tech/startup scene

---

## 📊 Track it
- **Search Console** → see which queries show you, your clicks, position
- **Vercel Analytics** (free) → enable in Vercel dashboard for traffic
- Optional: **Plausible** or **GA4** for deeper analytics

---

## 90-day priority order
1. **Week 1**: Search Console + Bing + Google Business Profile, submit sitemap
2. **Week 1–2**: turn the 3 case studies into real pages with written copy
3. **Month 1–2**: 3–4 service pages, list on 3 agency directories
4. **Month 2–3**: start the blog (2 posts/mo), chase client-footer backlinks
5. **Ongoing**: watch Search Console, double down on queries you're near
   page 1 for.

The site is technically ready. Rankings now come from **content +
backlinks + time**, not more code.
