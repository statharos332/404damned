/**
 * ============================================================
 *  404 DAMNED — Insights / Blog (single source of truth)
 * ============================================================
 *  Each post is a full SEO article. Add one by appending here:
 *  it auto-appears on /insights, gets its own /insights/<slug>
 *  page with metadata + Article structured data, and enters the
 *  sitemap. Body is simple block content (h2 / p / list).
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
  author: string;
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
    author: "404 DAMNED",
    keywords: [
      "website performance",
      "core web vitals",
      "fast website",
      "web development Amsterdam",
      "conversion optimization",
    ],
    body: [
      { type: "p", text: "Speed is not a vanity metric. A website that loads in under a second keeps people in, while a three-second load pushes a large share of visitors straight back to the search results. For an e-commerce store or a lead-driven business, that gap is the difference between growth and stagnation. This is how we think about speed when we build digital products." },
      { type: "h2", text: "Core Web Vitals, in plain language" },
      { type: "p", text: "Google measures three things that matter to real users. Largest Contentful Paint (LCP) is how long until the main content appears. Cumulative Layout Shift (CLS) is how much the page jumps around as it loads. Interaction to Next Paint (INP) is how quickly the page responds when someone taps or clicks. Win all three and you have a site that feels instant." },
      { type: "h2", text: "The decisions that move the needle" },
      { type: "list", items: [
        "Ship less JavaScript. Every kilobyte of script blocks the main thread. Code-splitting and loading non-critical sections only when they scroll into view keeps the initial bundle tiny.",
        "Optimize images and video. Modern formats like AVIF and WebP, correct sizing, and lazy-loading anything below the fold cut megabytes without losing quality.",
        "Reserve space for media. Fixed aspect-ratio containers stop the layout from jumping, which keeps CLS near zero.",
        "Defer the heavy stuff. 3D scenes, animations and embeds should mount after the page is interactive, never before the first paint.",
      ]},
      { type: "h2", text: "Why this sells more" },
      { type: "p", text: "Faster pages convert better, rank higher, and cost less to advertise to, because quality scores improve when landing pages are quick. Speed compounds: it lifts SEO, paid performance and user trust at the same time. That is why we treat performance as a feature, not an afterthought." },
      { type: "p", text: "If your current site feels sluggish, the fix is rarely a single switch. It is a series of deliberate engineering choices, applied consistently. That is the work we do." },
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
    author: "404 DAMNED",
    keywords: [
      "headless ecommerce",
      "Magento",
      "Next.js ecommerce",
      "online store development",
      "ecommerce performance",
    ],
    body: [
      { type: "p", text: "Headless commerce gets talked about like a magic upgrade. It is not magic, but for the right store it is a serious advantage. Here is an honest breakdown of when it pays off and when a traditional setup is the smarter call." },
      { type: "h2", text: "What headless actually means" },
      { type: "p", text: "In a traditional store, the back end that manages products and orders is tightly bound to the front end that customers see. Going headless splits them apart: a commerce engine such as Magento or Shopify handles the data, while a separate, custom front end built in a framework like Next.js renders the experience. The two talk through an API." },
      { type: "h2", text: "When it is worth it" },
      { type: "list", items: [
        "Performance matters to your revenue. A custom front end can hit load times a templated theme simply cannot, and faster stores convert more.",
        "Your brand needs to feel unique. Headless removes the design ceiling of off-the-shelf themes, so the storefront looks like you and nobody else.",
        "You sell across channels. One commerce back end can feed a website, an app, kiosks and marketplaces from a single source of truth.",
        "You have traffic to justify it. The investment makes sense when small conversion gains translate into meaningful money.",
      ]},
      { type: "h2", text: "When it is not" },
      { type: "p", text: "If you are early, low-traffic, or need to ship next month on a tight budget, a well-built traditional store is often the right move. Headless adds engineering complexity, and complexity has a cost. The goal is the best outcome for your business, not the trendiest architecture." },
      { type: "h2", text: "How to decide" },
      { type: "p", text: "Start from the money. If a one-second speed improvement or a higher-converting custom checkout would noticeably grow revenue, headless usually pays for itself. If not, keep it simple. We are happy to build either, and we will tell you which one your situation actually needs." },
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
    author: "404 DAMNED",
    keywords: [
      "AI automation",
      "small business automation",
      "workflow automation",
      "AI for business",
      "lead automation",
    ],
    body: [
      { type: "p", text: "Most small businesses do not need a grand AI strategy. They need a handful of repetitive tasks to quietly disappear. Done right, automation gives a small team the leverage of a much bigger one. Here is where to start without over-engineering it." },
      { type: "h2", text: "Start with the work nobody wants to do" },
      { type: "p", text: "The best first automations are the boring, repeating ones: copying data between tools, sending the same follow-up emails, qualifying inbound leads, generating routine reports. These eat hours and add zero creative value, which makes them perfect candidates." },
      { type: "h2", text: "High-impact, low-risk automations" },
      { type: "list", items: [
        "Lead capture and routing. Every enquiry is captured, enriched, qualified by AI, and dropped into your CRM with the right priority and a draft reply ready.",
        "Follow-up sequences. No lead goes cold because a human forgot. The system nudges at the right moments and stops when someone replies.",
        "Content and reporting drafts. AI produces a first draft of recurring reports, summaries or posts that a person reviews, instead of writing from scratch.",
        "Internal Q&A. A private assistant trained on your own documents answers staff questions instantly instead of digging through folders.",
      ]},
      { type: "h2", text: "Roll it out without breaking things" },
      { type: "p", text: "Automate one workflow at a time. Keep a human in the loop for anything customer-facing until you trust the output. Measure the hours saved so the value is obvious. The point is not to replace your team, it is to free them from the busywork so they can do the work that actually grows the business." },
      { type: "p", text: "If you are not sure which process to automate first, look for the task your team complains about most. That is usually where the fastest win is hiding." },
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
