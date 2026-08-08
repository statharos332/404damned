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

/** An inline text segment: plain text, or a link. */
export type Inline = string | { text: string; href: string };
/** Block text: a plain string (legacy) or an array of inline segments. */
export type RichText = string | Inline[];

export type Block =
  | { type: "p"; text: RichText }
  | { type: "h2"; text: string }
  | { type: "list"; items: RichText[] }
  | { type: "image"; src: string; alt: string; caption?: string };

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
  /** Optional hero image for the article page + social share cards. /insights/<slug>/cover.svg */
  cover?: string;
}

export const posts: Post[] = [
  {
    slug: "nextjs-vs-wordpress-which-platform-converts-better",
    title: "Next.js vs WordPress: Which Platform Actually Converts Better for Growing European Businesses?",
    excerpt: "Next.js vs WordPress — real conversion data, speed benchmarks, TCO, and SEO impact to help European SMBs choose the platform that drives revenue.",
    category: "Web Development",
    readMins: 13,
    date: "2026-07-25",
    authorSlug: "stathis-papounidis",
    keywords: ["Next.js vs WordPress performance comparison", "WordPress to Next.js migration conversion rate", "headless WordPress Next.js ecommerce", "Core Web Vitals WordPress 2025", "best platform for ecommerce conversions Europe", "Next.js vs WordPress SEO ranking", "total cost of ownership WordPress vs Next.js", "Next.js SMB website conversions"],
    body: [
      { type: "h2", text: "The Conversion Question: Why Your Platform Choice Is a Revenue Decision" },
      { type: "p", text: "Most founders treat the choice between Next.js and WordPress as a technical detail — something to hand off to a developer and forget about. That's a mistake that compounds quietly in your analytics dashboard every single month." },
      { type: "p", text: "Your platform determines how fast your pages load, how reliably your site stays online, how many security patches you're racing to apply, and ultimately how many visitors actually convert into paying customers. This is a revenue decision disguised as a technology decision." },
      { type: "h2", text: "How a 1-Second Delay Silently Kills Your Sales Funnel" },
      { type: "p", text: ["The relationship between load time and revenue is not linear — it's brutal. ", { text: "Research from Portent", href: "https://portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm" }, " shows that e-commerce sites loading in one second convert 2.5 times higher than sites loading in five seconds. That's not a marginal difference. If your store is pulling in €50,000 a month at a five-second load time, a one-second site could theoretically double your revenue without touching your product, pricing, or ad spend."] },
      { type: "p", text: ["The scale compounds from there. ", { text: "Google's collaborative research with NitroPack", href: "https://nitropack.io/blog/how-page-speed-affects-conversion/" }, " found that a 0.1-second improvement in load time lifts e-commerce conversions by 8.4%. Shaving half a second off your product pages can be worth more than an entire paid media campaign."] },
      { type: "p", text: "Your platform is either helping you win those fractions of a second or costing you them." },
      { type: "h2", text: "The Metric That Matters More Than Aesthetics: Core Web Vitals and Revenue" },
      { type: "p", text: "Core Web Vitals — Google's standardized set of user experience signals covering loading, interactivity, and visual stability — are no longer just SEO signals. They're direct proxies for conversion rate. A page that passes CWV thresholds loads fast, responds immediately to user input, and doesn't jump around as it renders. Pages that fail these checks frustrate users and bleed revenue. For European SMB founders, the question is straightforward: does your current platform help you pass or fail?" },
      { type: "h2", text: "How WordPress and Next.js Actually Work (and Why It Changes Everything)" },
      { type: "h2", text: "WordPress: A Dynamic, PHP-Generated Page Model" },
      { type: "p", text: "WordPress processes each page request by querying a database, running PHP, assembling the page, and sending it to the browser. Out of the box, every visitor triggers this chain. Caching plugins like WP Rocket or LiteSpeed Cache can short-circuit parts of this, but they're mitigations, not solutions. The underlying architecture was designed in 2003 for blogs, not for high-throughput e-commerce experiences at the edge." },
      { type: "h2", text: "Next.js: Static Generation, SSR, and Edge Delivery Explained Simply" },
      { type: "p", text: "Next.js, built on React, gives developers three rendering modes: Static Site Generation (SSG), Server-Side Rendering (SSR), and Incremental Static Regeneration (ISR). For most e-commerce use cases, pages are pre-built at deploy time and served from a CDN edge node physically close to the visitor. There is no database query when someone lands on your product page. The HTML is already waiting. This architectural difference is why Next.js consistently produces faster Time to First Byte and Largest Contentful Paint scores than server-rendered WordPress." },
      { type: "h2", text: "The Headless Middle Ground: WordPress as CMS, Next.js as Frontend" },
      { type: "p", text: "You don't have to abandon WordPress content workflows entirely. Headless WordPress means your editorial team keeps the familiar wp-admin interface for writing and publishing content, while the frontend is decoupled and rebuilt in Next.js. Data flows via the WordPress REST API or WPGraphQL. Your content team is happy. Your users get Next.js performance. This is the architecture behind many successful migrations — but it comes with its own complexity, which we'll address later." },
      { type: "h2", text: "Speed Benchmarks: What Real Data Says About Load Times in 2025" },
      { type: "h2", text: "Core Web Vitals Pass Rates: WordPress vs Next.js in the Field" },
      { type: "p", text: ["The numbers here should concern any WordPress-dependent business. According to the ", { text: "HTTP Archive Web Almanac 2024 CMS chapter", href: "https://almanac.httparchive.org/en/2024/cms" }, ", only 40% of WordPress origins pass all three mobile Core Web Vitals. That means six out of every ten WordPress sites are delivering a measurably poor user experience on mobile — the dominant browsing device for most European e-commerce audiences."] },
      { type: "p", text: "Next.js sites built on modern deployment infrastructure consistently outperform this benchmark, particularly on Largest Contentful Paint and Cumulative Layout Shift, because static assets served from the edge simply arrive faster." },
      { type: "h2", text: "What 40% Mobile CWV Pass Rate Means for Your Organic Rankings" },
      { type: "p", text: "Google uses Core Web Vitals as a ranking signal. A site failing mobile CWV is competing with a structural disadvantage baked into its architecture. Your competitor running a well-optimized Next.js frontend can outrank you without writing a single extra blog post — simply because Google's crawlers and users both get a faster, more stable experience. In competitive e-commerce niches across the Netherlands, Germany, and the Nordics, that advantage compounds over months and years." },
      { type: "h2", text: "Real-World Load Time Ranges and What Moves the Needle" },
      { type: "p", text: "A stock WordPress install with WooCommerce and twelve plugins will typically score Largest Contentful Paint between 3.5 and 6 seconds on mobile without aggressive optimization. A Next.js site serving pre-rendered pages from Vercel's edge network regularly achieves LCP under 1.5 seconds on the same connection. The delta is real, consistent, and directly attributable to architecture — not just developer skill." },
      { type: "h2", text: "SEO Impact: Which Platform Ranks Higher and Earns More Organic Traffic?" },
      { type: "h2", text: "Crawlability, Indexability, and Rendering Differences" },
      { type: "p", text: "WordPress serves fully rendered HTML to Googlebot by default, which is a genuine advantage. React-based Next.js sites using SSG or SSR also deliver pre-rendered HTML, so crawlability is not the concern it once was with client-side-only React. The rendering advantage WordPress once held has largely dissolved." },
      { type: "h2", text: "SEO Plugins vs Full Technical Control: Pros, Cons, and Trade-Offs" },
      { type: "p", text: "WordPress's SEO plugin ecosystem — Yoast, Rank Math, All in One SEO — lowers the barrier to managing meta tags, sitemaps, and structured data. For a marketing team without developer access, this matters. Next.js offers no equivalent out-of-the-box, but developers have full programmatic control over every meta tag, canonical, and structured data block. In skilled hands, Next.js gives you more precise technical SEO implementation. In unskilled hands, it can ship an improperly indexed site. The platform is more powerful; the margin for error is higher too." },
      { type: "h2", text: "How Platform Speed Compounds Into Long-Term SEO Gains" },
      { type: "p", text: "Speed improvements don't just affect ranking signals directly. Faster pages reduce bounce rates, increase pages per session, and improve engagement metrics that indirectly signal content quality to search engines. A site that loads in 1.2 seconds earns more qualified dwell time than one that loads in 4 seconds, and that behavioral data accumulates. The platform that delivers the best conversion experience is, almost by definition, the one that wins the SEO long game." },
      { type: "h2", text: "Security, Stability, and Uptime: The Hidden Conversion Killers" },
      { type: "h2", text: "WordPress Plugin Vulnerabilities: 7,966 New Flaws in 2024" },
      { type: "p", text: ["Security rarely gets factored into platform conversion discussions, but a hacked or defaced store converts at zero percent. The ", { text: "Patchstack State of WordPress Security 2025", href: "https://patchstack.com/whitepaper/state-of-wordpress-security-in-2025/" }, " report is sobering: 7,966 new vulnerabilities were disclosed in 2024, a 34% increase year-over-year, with 96% of those flaws residing in third-party plugins. If your WordPress site runs WooCommerce plus ten plugins — and virtually every serious WooCommerce store does — you are managing a substantial, constantly evolving attack surface."] },
      { type: "h2", text: "How Next.js Architecture Reduces the Attack Surface" },
      { type: "p", text: "A Next.js frontend served as static files or edge functions has no publicly accessible database, no plugin system to exploit, and no wp-admin login page for bots to hammer with brute-force attacks. Your attack surface is dramatically smaller. Backend integrations — payment processors, inventory systems, CRMs — connect via secure APIs with scoped credentials. Compromising your frontend does not mean compromising your customer data." },
      { type: "h2", text: "What Downtime or a Hack Actually Costs an E-Commerce Brand" },
      { type: "p", text: "If your store generates €5,000 per day in revenue and a plugin vulnerability takes you offline for eight hours during peak hours, that's a five-figure incident — before you factor in emergency developer costs, customer trust erosion, and potential GDPR notification obligations. Security is not a theoretical concern. It's a revenue protection mechanism." },
      { type: "h2", text: "Total Cost of Ownership: Upfront Investment vs Long-Term ROI" },
      { type: "h2", text: "WordPress: Lower Entry Cost, Higher Ongoing Maintenance Bill" },
      { type: "p", text: "A well-built WooCommerce store can be commissioned for €5,000–€15,000. The sticker price looks attractive. But factor in: ongoing plugin license renewals (€500–€2,000/year), a security and maintenance retainer (€200–€500/month), hosting that can handle traffic spikes without crashing (€100–€400/month), and periodic performance optimization work. Over three years, a €10,000 WordPress build often runs to €25,000–€35,000 in total cost of ownership." },
      { type: "h2", text: "Next.js: Higher Build Cost, Lower Hosting and Maintenance Over Time" },
      { type: "p", text: "A custom Next.js build from a competent European development partner starts at €15,000–€40,000 depending on complexity. Hosting on Vercel, Netlify, or Cloudflare Pages is typically cheaper than equivalent managed WordPress hosting for high-traffic sites. No plugin licenses. No weekly core updates. No monthly patch reviews. Developer intervention for routine maintenance is rare. Over three years, the TCO often converges — and the performance dividend makes the investment economically rational for any store with meaningful transaction volume." },
      { type: "h2", text: "A 3-Year TCO Comparison for European SMBs" },
      { type: "p", text: "For a Dutch e-commerce brand doing €500,000 in annual revenue, the math is clear. A 10% conversion rate improvement — realistic given the speed benchmarks above — generates €50,000 in additional annual revenue. Against a €20,000 Next.js migration cost with lower ongoing overhead, the payback period is measured in months, not years. The question is never just \"what does the build cost?\" but \"what does the build earn?\"" },
      { type: "h2", text: "Real Migration Case Studies: Businesses That Switched and Measured the Results" },
      { type: "h2", text: "E-Commerce Brand Cuts Load Time 52% After WordPress-to-Next.js Migration" },
      { type: "p", text: ["In a ", { text: "documented migration case study from Last Rev", href: "https://lastrev.com/blog/headless-cms-migration-ecommerce-case-study" }, ", a regional e-commerce brand moved from WordPress to a Next.js headless architecture and cut page load times by 52%. This wasn't a minor tweak — it was a structural transformation that changed how customers experienced the brand from the first millisecond of a page load."] },
      { type: "h2", text: "PAIGE Fashion: 76% Conversion Rate Lift With Next.js and Shopify" },
      { type: "p", text: ["Fashion brand PAIGE rebuilt their storefront using a headless Next.js and Shopify stack deployed on Vercel. The ", { text: "documented outcome", href: "https://vercel.com/blog/how-paige-grew-revenue-by-22-with-shopify-next-js-and-vercel" }, " was a 76% lift in conversion rates and a 22% increase in overall revenue. Not theoretical projections — measured business outcomes from the Next.js vs WordPress performance comparison playing out in a real commercial context."] },
      { type: "h2", text: "When the Migration Backfired: Lessons From Headless Projects Gone Wrong" },
      { type: "p", text: "Headless Next.js projects fail when they're underscoped, under-resourced, or handed to teams without genuine Next.js expertise. Common failure modes include: content editors losing CMS access mid-migration, API integrations breaking during product catalog updates, and inadequate redirect mapping that wipes out years of accumulated SEO equity. The architecture is powerful; it requires proportionally skilled execution. Due diligence on your development partner is not optional." },
      { type: "h2", text: "How to Decide: The Right Platform for Your Business Stage and Goals" },
      { type: "h2", text: "Choose WordPress If…" },
      { type: "p", text: "You're pre-revenue or early-stage and need to move fast with a limited budget. Your content team is non-technical and needs an out-of-the-box editorial interface. Your conversion volumes are low enough that a 10–20% performance gap doesn't meaningfully impact monthly revenue. You have reliable, affordable WordPress maintenance support already in place." },
      { type: "h2", text: "Choose Next.js If…" },
      { type: "p", text: "You're running a store with meaningful transaction volume where a 5–10% conversion improvement is worth €10,000+ annually. You've hit the ceiling of what WordPress optimization can deliver. You need a frontend that can integrate cleanly with modern e-commerce stacks — Shopify, Medusa, Commercetools, Mollie, or custom ERP systems. You want to build a digital asset that doesn't require monthly emergency maintenance." },
      { type: "h2", text: "The Hybrid Path: Headless WordPress With a Next.js Frontend" },
      { type: "p", text: "For brands with established WordPress content workflows, the headless approach lets you retain editorial familiarity while dramatically upgrading frontend performance. Your writers keep WordPress. Your customers get Next.js speed. The architecture requires a developer who understands both systems deeply — but it's the most pragmatic migration path for content-heavy European e-commerce brands who can't afford to rebuild their content library from scratch." },
      { type: "h2", text: "Action Plan: Next Steps for Ambitious SMB Founders in the Netherlands and Europe" },
      { type: "h2", text: "Questions to Ask Before Commissioning a Build or Rebuild" },
      { type: "p", text: "Before signing any contract, ask: What is my current average page load time on mobile? What is my store's Core Web Vitals pass rate today? What is the monthly revenue impact of a 10% conversion improvement? Can my current platform deliver LCP under 2.5 seconds without significant ongoing engineering effort? These questions shift the conversation from \"which platform do I prefer?\" to \"which platform makes me money?\"" },
      { type: "h2", text: "How to Evaluate a Development Partner's Next.js Track Record" },
      { type: "p", text: "Ask for Core Web Vitals scores from live sites they've built — not staging environments. Request Lighthouse reports. Ask how they handle ISR for large product catalogs. Ask specifically how they've implemented structured data for e-commerce in Next.js. Vague answers about \"using modern tech\" are red flags. Specific, measurable outcomes from past clients are the signal you need." },
      { type: "h2", text: "Measuring Conversion Impact After Launch: KPIs and Timelines" },
      { type: "p", text: "Set a 90-day measurement window post-launch. Track: conversion rate by device (mobile separately from desktop), LCP and CLS scores in Google Search Console, organic click-through rate changes, and revenue per session. Core Web Vitals improvements typically surface in rankings within 60–90 days. Conversion rate changes from speed improvements are often visible within the first 30 days of live traffic. Build a pre-launch benchmark report so you have a clean baseline for comparison." },
      { type: "h2", text: "Frequently Asked Questions" },
      { type: "h2", text: "Does Next.js rank better on Google than WordPress?" },
      { type: "p", text: "Platform alone doesn't determine rankings — but speed and Core Web Vitals do influence them, and Next.js consistently delivers better performance scores than unoptimized WordPress installations. Given that only 40% of WordPress sites pass all three mobile Core Web Vitals, a well-built Next.js site has a structural ranking advantage in competitive search results." },
      { type: "h2", text: "Can I keep using WordPress to write content if I switch to Next.js?" },
      { type: "p", text: "Yes. The headless WordPress architecture decouples the CMS backend from the frontend. Your editorial team continues using the familiar WordPress dashboard, while the Next.js frontend pulls content via API and serves it at edge speed. This is the most common migration path for content-rich brands who don't want to disrupt publishing workflows." },
      { type: "h2", text: "How much does it cost to migrate from WordPress to a Next.js site in Europe?" },
      { type: "p", text: "A credible Next.js migration from a European development partner typically ranges from €15,000 to €60,000+ depending on the complexity of your product catalog, integrations, custom functionality, and content volume. Simpler brochure sites or smaller stores sit at the lower end; complex multi-language e-commerce builds with ERP integrations sit at the higher end." },
      { type: "h2", text: "Is Next.js overkill for a small business website or online shop?" },
      { type: "p", text: "For a pre-revenue startup or a store doing fewer than €5,000 per month, the engineering overhead of Next.js probably outweighs the performance dividend. WordPress is a rational choice at that scale. Once your store reaches a point where conversion rate improvements translate to meaningful monthly revenue gains, the calculus shifts in Next.js's favor." },
      { type: "h2", text: "How long does a WordPress-to-Next.js migration typically take?" },
      { type: "p", text: "A straightforward migration with limited custom functionality typically takes 8–16 weeks from project kickoff to production launch. Complex builds with custom integrations, multi-language support, or large product catalogs can run 4–6 months. Rushing the timeline is the primary cause of failed headless migrations — adequate QA, redirect mapping, and content editor training are non-negotiable." },
      { type: "h2", text: "Will switching platforms hurt my existing SEO rankings?" },
      { type: "p", text: "Any platform migration carries SEO risk if handled poorly. Properly executed — with comprehensive redirect mapping from old URLs to new, preserved canonical structures, maintained XML sitemaps, and a clean crawl validation post-launch — migrations do not need to result in ranking losses. Brands that migrate to a faster Next.js frontend often see ranking improvements within 60–90 days as Core Web Vitals improvements register in Google's systems." }
    ],
  },
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
  {
    slug: "llms-txt-ai-visibility-wordpress",
    title: "AI Visibility for WordPress: What llms.txt Actually Does",
    excerpt:
      "ChatGPT, Claude and Perplexity are starting to answer questions directly instead of sending a click — and most WordPress sites are unreadable to them. We built a plugin that generates a real, AI-summarized llms.txt automatically, then tested it against a live install to make sure it actually works.",
    category: "AI Automation",
    readMins: 7,
    date: "2026-08-06",
    authorSlug: "stathis-papounidis",
    cover: "/insights/llms-txt-ai-visibility-wordpress/cover.svg",
    keywords: [
      "llms.txt",
      "AI visibility WordPress",
      "generative engine optimization",
      "llms.txt WordPress plugin",
      "AI crawler visibility",
      "GEO",
    ],
    body: [
      { type: "p", text: "A growing share of search doesn't end in a click anymore. Someone asks ChatGPT, Claude or Perplexity a question, gets a direct answer, and never visits a website at all. Being the source behind that answer is starting to matter as much as ranking on page one — and most sites, WordPress ones especially, are genuinely hard for an AI system to read." },
      { type: "h2", text: "What llms.txt actually is" },
      { type: "p", text: ["In September 2024, Jeremy Howard (Answer.AI) proposed ", { text: "llms.txt", href: "https://llmstxt.org/" }, " — a plain-text, markdown-formatted file at the root of a site, the same idea as robots.txt or sitemap.xml but written for language models instead of search crawlers. A model has a limited context window and no patience for a page built from navigation menus, cookie banners, ads and three levels of nested divs around the actual sentence it needs. llms.txt skips straight to a clean list of what the site actually contains."] },
      { type: "p", text: "The convention defines two files: llms.txt, a short index of the site's key pages with one-line descriptions, and llms-full.txt, a fuller export with real page content included. Neither is confirmed to be read by every AI crawler yet — this is still an emerging convention, not an official web standard — but it costs nothing to publish and it's exactly the kind of thing that compounds if you're early." },
      { type: "h2", text: "Why WordPress sites specifically have a problem" },
      { type: "p", text: "On a typical WordPress site, the content a visitor actually reads rarely lives cleanly in one field. Page builders like Elementor store real page copy as serialized JSON, not as post_content. ACF fields hold product specs, service descriptions and FAQ answers in custom field structures a generic crawler has no reason to look inside. A plugin that only reads post_content misses most of the site." },
      { type: "h2", text: "What we built" },
      { type: "p", text: "We built a WordPress plugin that generates both files automatically and keeps them current as content changes. The mechanical part extracts and cleans text from post_content, ACF fields and Elementor's stored data, filtering out filenames, URLs and layout noise that would otherwise pollute the output." },
      { type: "p", text: "The part that makes it genuinely AI-powered: each page is sent to OpenAI once, with the extracted text, and comes back with a real classification (Services, Products, Contact, Blog, Careers, and so on) and a natural-language summary — not a keyword-frequency guess. That result is cached against the page's content hash, so a page that hasn't changed doesn't get re-summarized (and doesn't cost anything) the next time the file regenerates. If there's no API key configured, or a request fails, it falls back to a solid rule-based extractor automatically — the public file never breaks because an API call didn't go through." },
      { type: "list", items: [
        "Two auto-generated endpoints: /llms.txt (short index) and /llms-full.txt (full content, grouped by category with confidence scores)",
        "Real content extraction from post_content, ACF fields and Elementor builder data",
        "AI-generated summaries and classification per page, cached per content hash so nothing gets re-processed unnecessarily",
        "Automatic fallback to a rule-based extractor whenever AI isn't configured or a request fails",
        "Regenerates automatically when content is published, edited or trashed",
      ]},
      { type: "image", src: "/insights/llms-txt-ai-visibility-wordpress/screenshot-admin.png", alt: "The AI Visibility plugin settings screen in WordPress admin, showing AI Generation Active", caption: "The actual settings screen, screenshotted from a live WordPress install — not a mockup." },
      { type: "h2", text: "We didn't just assume it works" },
      { type: "p", text: "Code that looks right and code that works are two different claims, so before writing any of this up we deployed the plugin on a clean, throwaway WordPress install and hit the actual endpoints. That caught something a code review alone wouldn't have: WordPress's own canonical-redirect logic was silently 301-redirecting /llms.txt to /llms.txt/ before our handler ever ran — harmless in a browser, but the kind of thing that quietly breaks a crawler that doesn't follow redirects. We fixed it, then re-tested with a deliberately invalid API key to confirm the AI failure path falls back cleanly instead of breaking the page. Both checked out." },
      { type: "p", text: "Then we tested it with a real key. The difference showed immediately: our rule-based fallback had classified an \"About us\" page as \"Contact\" — because the text happened to mention \"direct contact with the developer\" — at 55% confidence. With AI switched on, the same page landed correctly under \"Company\" at 95% confidence, with a genuinely written summary instead of a truncated sentence." },
      { type: "image", src: "/insights/llms-txt-ai-visibility-wordpress/screenshot-preview.png", alt: "Real AI-generated llms.txt preview showing natural-language Dutch summaries", caption: "Real output from that test, live-generated — not sample copy written for this article." },
      { type: "h2", text: "The honest caveat" },
      { type: "p", text: "We're not going to tell you llms.txt is a guaranteed ranking factor, because nobody can say that truthfully yet — it's an emerging convention, not an established one, and adoption among the major AI crawlers is still uneven. What we can say is that publishing a clean, accurate, machine-readable index of your site costs nothing to have and matters more the earlier you're one of the sites that already has it." },
      { type: "p", text: "If you run a WordPress site and want an AI-readable index of what's actually on it — set up properly, not bolted on — that's exactly what we do." },
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
