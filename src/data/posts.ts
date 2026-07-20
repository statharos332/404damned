/**
 * ============================================================
 *  404 DAMNED — Insights / Blog (single source of truth)
 * ============================================================
 *  Each post is a full SEO article. Add one by appending here:
 *  it auto-appears on /insights, gets its own /insights/<slug>
 *  page with metadata + Article structured data, and enters the
 *  sitemap. Body is simple block content (h2 / p / list).
 *
 *  authorSlug must match a slug in src/data/team.ts — bylines are
 *  real people, not the brand. Pick whoever actually has the
 *  background for the topic.
 * ============================================================
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  excerpt: string; // meta description + card
  category: string;
  readMins: number;
  date: string; // ISO
  authorSlug: string; // src/data/team.ts slug
  keywords: string[];
  body: Block[];
}

export const posts: Post[] = [
  {
    slug: "what-makes-a-website-actually-fast",
    title: "What Actually Makes a Website Fast (and Why It Sells More)",
    excerpt:
      "Core Web Vitals, real-world load times and the engineering decisions that turn a slow site into a conversion machine. A practical guide from an Amsterdam web development studio.",
    category: "Performance",
    readMins: 7,
    date: "2026-02-10",
    authorSlug: "stathis-papounidis",
    keywords: [
      "website performance",
      "core web vitals",
      "fast website",
      "web development Amsterdam",
      "conversion optimization",
    ],
    body: [
      { type: "p", text: "Speed isn't a vanity metric, it's revenue. A site that loads in under a second keeps people in; a three-second load sends a large share of visitors straight back to the search results. For an e-commerce store or a lead-driven business, that gap is the difference between growth and stagnation — and it's the first thing I check on every project." },
      { type: "h2", text: "Core Web Vitals, in plain language" },
      { type: "p", text: "Google measures three things that matter to real users. Largest Contentful Paint (LCP) is how long until the main content shows up. Cumulative Layout Shift (CLS) is how much the page jumps around while it loads. Interaction to Next Paint (INP) is how fast the page responds when someone taps or clicks. Get all three right and the site feels instant, not just fast on paper." },
      { type: "h2", text: "The decisions that actually move the needle" },
      { type: "list", items: [
        "Ship less JavaScript. Every kilobyte of script blocks the main thread, so code-splitting and loading non-critical sections only when they scroll into view keeps the initial bundle small.",
        "Optimise images and video properly. Modern formats like AVIF and WebP, correct sizing, and lazy-loading anything below the fold cut megabytes without visibly losing quality.",
        "Reserve space for media before it loads. Fixed aspect-ratio containers stop the layout jumping around, which is most of what keeps CLS near zero.",
        "Defer the heavy stuff. 3D scenes, animations and embeds mount after the page is interactive — never before the first paint.",
      ]},
      { type: "h2", text: "Why it actually sells more" },
      { type: "p", text: "Faster pages convert better and rank higher, and they cost less to advertise to because ad quality scores improve when landing pages are quick. Speed compounds across SEO, paid performance and plain user trust at the same time, which is why I treat it as a feature to build for from the first commit, not a fix to bolt on afterwards." },
      { type: "p", text: "If your site feels sluggish, the fix is rarely one switch you can flip. It's a series of deliberate choices applied consistently — which is most of what this work actually is." },
    ],
  },
  {
    slug: "headless-ecommerce-worth-it",
    title: "Headless E-Commerce: Is It Worth It for Your Store?",
    excerpt:
      "When a headless build genuinely outperforms a traditional store, what it costs you, and how to decide. Straight talk from a studio that ships both.",
    category: "E-Commerce",
    readMins: 8,
    date: "2026-01-22",
    authorSlug: "stathis-papounidis",
    keywords: [
      "headless ecommerce",
      "Magento",
      "Next.js ecommerce",
      "online store development",
      "ecommerce performance",
    ],
    body: [
      { type: "p", text: "Headless commerce gets talked about like a magic upgrade. It isn't, but for the right store it's a genuine advantage. This is the honest version: when it pays off, when it doesn't, and how I'd actually decide for your store." },
      { type: "h2", text: "What headless actually means" },
      { type: "p", text: "In a traditional store, the back end that manages products and orders is tightly bound to the front end customers see. Going headless splits the two apart: a commerce engine like Magento or Shopify handles the data, while a separate, custom front end — usually Next.js — renders the experience. They talk to each other through an API." },
      { type: "h2", text: "When it's worth it" },
      { type: "list", items: [
        "Performance matters to your revenue. A custom front end reaches load times a templated theme can't touch, and faster stores convert more.",
        "Your brand needs to feel distinct. Headless removes the design ceiling of off-the-shelf themes, so the storefront looks like you and nobody else.",
        "You're selling across channels. One commerce back end can feed a website, an app, kiosks and marketplaces from a single source of truth.",
        "You have the traffic to justify it. The investment makes sense once small conversion gains translate into real money.",
      ]},
      { type: "h2", text: "When it isn't" },
      { type: "p", text: "If you're early, low-traffic, or need to ship next month on a tight budget, a well-built traditional store is usually the right move. Headless adds engineering complexity, and complexity has a cost. The goal is the best outcome for your business, not the trendiest architecture on your stack." },
      { type: "h2", text: "How to decide" },
      { type: "p", text: "Start from the money. If a one-second speed improvement or a higher-converting custom checkout would noticeably grow revenue, headless usually pays for itself. If not, keep it simple — I build both, and on a call I'll tell you which one your store actually needs, not the one that's more interesting to build." },
    ],
  },
  {
    slug: "ai-automation-for-small-business",
    title: "AI Automation for Small Business: Where to Actually Start",
    excerpt:
      "Skip the hype. Here are the practical automations that save real hours every week for small teams, and how to roll them out without breaking what works.",
    category: "AI Automation",
    readMins: 6,
    date: "2026-01-08",
    authorSlug: "stathis-papounidis",
    keywords: [
      "AI automation",
      "small business automation",
      "workflow automation",
      "AI for business",
      "lead automation",
    ],
    body: [
      { type: "p", text: "Most small businesses don't need a grand AI strategy. They need a handful of repetitive tasks to quietly disappear. Done right, automation gives a small team the leverage of a much bigger one — this is where I'd actually start." },
      { type: "h2", text: "Start with the work nobody wants to do" },
      { type: "p", text: "The best first automations are the boring, repeating ones: copying data between tools, sending the same follow-up emails, qualifying inbound leads, generating routine reports. They eat hours, add no creative value, and are exactly what current AI handles well." },
      { type: "h2", text: "High-impact, low-risk automations" },
      { type: "list", items: [
        "Lead capture and routing. Every enquiry gets captured, enriched, qualified and dropped into your CRM with the right priority and a draft reply ready to send.",
        "Follow-up sequences. No lead goes cold because someone forgot — the system nudges at the right moments and stops the moment someone replies.",
        "Content and reporting drafts. AI produces a first draft of recurring reports, summaries or posts, and a person reviews it instead of starting from a blank page.",
        "Internal Q&A. A private assistant trained on your own documents answers staff questions instantly instead of someone digging through folders.",
      ]},
      { type: "h2", text: "Roll it out without breaking things" },
      { type: "p", text: "Automate one workflow at a time. Keep a human in the loop for anything customer-facing until you trust the output. Measure the hours saved so the value is obvious rather than assumed. The point isn't replacing your team — it's freeing them from the busywork so they can do the parts of the job that actually grow the business." },
      { type: "p", text: "If you're not sure which process to automate first, look for the task your team complains about most. That's usually where the fastest win is hiding." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostCategories(): string[] {
  const set = new Set<string>();
  posts.forEach((p) => set.add(p.category));
  return ["All", ...Array.from(set)];
}
