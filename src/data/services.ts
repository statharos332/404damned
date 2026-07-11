/**
 * ============================================================
 *  404 DAMNED — Service landing pages (SEO)
 * ============================================================
 *  Each service gets its own indexable, keyword-targeted page at
 *  /services/<slug>, plus an entry on the /services hub and the
 *  sitemap. This is the on-page foundation for ranking on the
 *  commercial "<service> Amsterdam" searches — the homepage's
 *  #services anchor could never rank on its own.
 *
 *  Keep copy specific and genuinely useful. Thin or duplicated
 *  service pages get filtered by Google's helpful-content system;
 *  substance is what ranks.
 * ============================================================
 */

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface Service {
  slug: string;
  /** short name for nav / cards, e.g. "Web Development" */
  name: string;
  /** page H1, keyword-led, e.g. "Web Development in Amsterdam" */
  h1: string;
  /** one-line pitch used on the hub + card */
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  sections: ServiceSection[];
  deliverables: string[];
  stack: string[];
  faqs: ServiceFAQ[];
  /** other service slugs to cross-link for internal-linking authority */
  related: string[];
}

export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    h1: "Web Development in Amsterdam",
    tagline: "Fast, custom websites and web apps engineered to convert.",
    metaTitle: "Web Development Amsterdam — Custom Next.js Websites",
    metaDescription:
      "Premium web development in Amsterdam. We build fast, custom Next.js websites and web apps engineered for conversion, speed and search. Book a strategy call.",
    keywords: [
      "web development Amsterdam",
      "web developer Amsterdam",
      "Next.js development Netherlands",
      "custom website Amsterdam",
      "web development agency Amsterdam",
    ],
    intro:
      "We build websites that load in under a second and turn visitors into customers — not templates dressed up as bespoke work. Every build is custom-coded on a modern stack, tuned for Core Web Vitals, and structured so it can rank and scale.",
    sections: [
      {
        heading: "Built to perform, not just to look good",
        body: "A beautiful site that loads slowly loses money. We engineer for the metrics that move revenue: sub-1.5s LCP, near-zero layout shift, and a conversion path with no dead ends. Speed is a feature, and we treat it like one from the first commit.",
      },
      {
        heading: "Custom-coded, never a template",
        body: "We don't stretch a theme to fit your brand. We design and build from scratch in React and Next.js, so the site is exactly as fast, flexible and distinctive as your business needs — with clean code your team (or ours) can extend later.",
      },
      {
        heading: "Engineered to rank and scale",
        body: "Semantic markup, server-side rendering, structured data and a clean information architecture come standard, so search engines understand the site and it grows with you instead of being rebuilt every two years.",
      },
    ],
    deliverables: [
      "Custom UI/UX design & build",
      "Next.js / React application",
      "Headless CMS integration",
      "Core Web Vitals & speed optimization",
      "Technical SEO foundation",
      "Analytics & conversion tracking",
      "Ongoing support & iteration",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Headless CMS", "Vercel"],
    faqs: [
      {
        q: "How much does a website cost in Amsterdam?",
        a: "A custom marketing site typically starts around €5,000, while larger web apps and platforms scale from there based on scope. We quote per project after a short strategy call so the price reflects what you actually need — no padded retainers.",
      },
      {
        q: "How long does it take to build a website?",
        a: "Most custom sites go live in 4–8 weeks depending on scope and how quickly content and feedback come back. We share a clear timeline in the proposal and stick to it.",
      },
      {
        q: "Do you use WordPress or custom code?",
        a: "We build custom in Next.js and React for speed, security and control. When a project genuinely benefits from a CMS, we wire in a fast headless CMS so your team can edit content without touching code.",
      },
      {
        q: "Will my website actually rank on Google?",
        a: "The build ships SEO-ready — fast, crawlable, structured — which is the foundation ranking requires. Rankings themselves also depend on content and authority over time, and we can help with both.",
      },
    ],
    related: ["ecommerce", "seo", "ai-automation"],
  },

  {
    slug: "ecommerce",
    name: "E-Commerce",
    h1: "E-Commerce Development in Amsterdam",
    tagline: "High-converting online stores on Shopify, Magento & headless.",
    metaTitle: "E-Commerce Development Amsterdam — Shopify & Magento",
    metaDescription:
      "E-commerce development in Amsterdam. High-converting online stores on Shopify, Magento and headless commerce, built for speed, scale and revenue. Book a call.",
    keywords: [
      "e-commerce development Amsterdam",
      "Magento agency Netherlands",
      "Shopify agency Amsterdam",
      "headless commerce Netherlands",
      "online store development Amsterdam",
    ],
    intro:
      "We build online stores that sell — fast, frictionless and tuned around your margins. Whether you're launching on Shopify, scaling on Magento, or going headless for total control, the build is engineered around one number: conversion rate.",
    sections: [
      {
        heading: "The right platform for your stage",
        body: "Shopify to move fast, Magento (Adobe Commerce) for complex catalogues and B2B, or a headless build when performance and flexibility matter most. We recommend the platform that fits your business — not the one that's easiest for us.",
      },
      {
        heading: "Conversion is the whole point",
        body: "A store is a machine for turning traffic into orders. We obsess over the checkout, product pages, page speed and mobile experience, because a one-second delay and a clumsy checkout are where revenue quietly leaks away.",
      },
      {
        heading: "Migrations without the drama",
        body: "Replatforming or moving off a slow, dated store? We migrate catalogues, customers, orders and SEO equity carefully, so you keep your rankings and traffic instead of starting from zero.",
      },
    ],
    deliverables: [
      "Store design & custom build",
      "Shopify / Magento / headless setup",
      "Checkout & conversion optimization",
      "Platform migration",
      "Payment & shipping integrations",
      "Speed & Core Web Vitals tuning",
      "Analytics & tracking setup",
    ],
    stack: ["Shopify", "Magento / Adobe Commerce", "Next.js", "Headless commerce", "Stripe", "Vercel"],
    faqs: [
      {
        q: "Which is better, Shopify or Magento?",
        a: "Shopify wins for speed to launch and simplicity; Magento (Adobe Commerce) wins for large catalogues, complex pricing and B2B. On a strategy call we'll match the platform to your catalogue, team and growth plan.",
      },
      {
        q: "Can you migrate my existing store without losing rankings?",
        a: "Yes. We map old URLs to new ones, preserve structured data and metadata, and migrate content carefully so your SEO equity carries over rather than resetting.",
      },
      {
        q: "Do you build headless e-commerce?",
        a: "We do — a headless front end (Next.js) on top of Shopify or a commerce backend gives you the fastest possible store and full design freedom. It's the right call when speed and UX are competitive advantages.",
      },
      {
        q: "How do you increase conversion rate?",
        a: "We remove friction: faster pages, a shorter checkout, clearer product pages, better mobile UX and trust signals — then measure and iterate against real analytics rather than guessing.",
      },
    ],
    related: ["web-development", "seo", "branding"],
  },

  {
    slug: "ai-automation",
    name: "AI Automation",
    h1: "AI Automation for Business in Amsterdam",
    tagline: "Custom AI systems that do the repetitive work for you.",
    metaTitle: "AI Automation Amsterdam — Custom Business AI Systems",
    metaDescription:
      "AI automation in Amsterdam. We build custom AI systems and workflows that eliminate repetitive work, cut costs and scale your operations. Book a strategy call.",
    keywords: [
      "AI automation Amsterdam",
      "AI automation agency Netherlands",
      "business AI Amsterdam",
      "workflow automation Netherlands",
      "custom AI solutions Amsterdam",
    ],
    intro:
      "We build AI systems that quietly do the work no one should be doing by hand — writing, sorting, replying, summarising, generating. Not a chatbot bolted onto your site, but automations wired into your real workflows that save hours every week.",
    sections: [
      {
        heading: "Automate the work that eats your week",
        body: "Lead handling, content generation, data entry, support triage, reporting — the repetitive tasks that drain your team's time are exactly what modern AI does well. We identify them, then build systems that handle them reliably.",
      },
      {
        heading: "Wired into your actual tools",
        body: "Automation only pays off when it lives where you work. We integrate with your CRM, inbox, spreadsheets, store and internal tools, so the AI acts inside your real process instead of being a novelty on the side.",
      },
      {
        heading: "Custom, measured, and yours",
        body: "We build to your workflow, not a generic template, and we measure the outcome — time saved, cost cut, output shipped — so the system earns its place. You own it; we make it work.",
      },
    ],
    deliverables: [
      "Workflow audit & opportunity map",
      "Custom AI automation build",
      "LLM & API integrations",
      "CRM / inbox / tooling connections",
      "Content generation systems",
      "Testing, monitoring & handover",
    ],
    stack: ["OpenAI / Claude", "Next.js", "Node.js", "Vercel", "Automation APIs", "Vector search"],
    faqs: [
      {
        q: "What can AI automation actually do for my business?",
        a: "Anything repetitive and rule-based or language-based: drafting content, qualifying leads, answering routine questions, summarising documents, generating listings, moving data between tools. We start by mapping where you lose the most time.",
      },
      {
        q: "Is this just a chatbot?",
        a: "No. Chatbots are one small use case. We build automations that run inside your workflows — often with no interface at all — doing tasks end to end so your team can focus on higher-value work.",
      },
      {
        q: "Will it integrate with the tools we already use?",
        a: "Yes. We connect to your CRM, email, spreadsheets, store and internal systems via their APIs, so the automation fits your process rather than forcing you to change it.",
      },
      {
        q: "How do we know it's worth it?",
        a: "We scope every automation around a measurable outcome — hours saved or cost removed — and start with the highest-ROI task so you see the return quickly.",
      },
    ],
    related: ["web-development", "ecommerce", "seo"],
  },

  {
    slug: "branding",
    name: "Branding",
    h1: "Branding & Identity in Amsterdam",
    tagline: "Sharp, distinctive brands that don't look like everyone else.",
    metaTitle: "Branding Amsterdam — Brand Identity & Design Agency",
    metaDescription:
      "Branding and identity design in Amsterdam. We craft distinctive brands — strategy, logo, visual system and voice — that command attention and premium pricing.",
    keywords: [
      "branding Amsterdam",
      "brand identity Amsterdam",
      "branding agency Netherlands",
      "logo design Amsterdam",
      "visual identity Netherlands",
    ],
    intro:
      "Most brands look like their competitors with a different logo. We build identities that are impossible to confuse with anyone else — strategy first, then a visual system and voice that let you charge more and be remembered.",
    sections: [
      {
        heading: "Strategy before decoration",
        body: "A strong brand is a decision, not a mood board. We start with positioning — who you're for, what you stand against, why you win — so every visual choice afterwards has a reason behind it.",
      },
      {
        heading: "A complete visual system",
        body: "Logo, type, colour, motion, imagery and the rules that hold them together. You get a system that stays coherent across a website, a deck, an ad and a business card — not a single logo file and good luck.",
      },
      {
        heading: "A voice that sounds like you",
        body: "How you say it matters as much as how it looks. We define a tone and messaging that carries your positioning into every headline, so the brand feels consistent everywhere it shows up.",
      },
    ],
    deliverables: [
      "Brand strategy & positioning",
      "Logo & wordmark design",
      "Full visual identity system",
      "Typography & colour system",
      "Brand guidelines",
      "Messaging & tone of voice",
      "Launch assets",
    ],
    stack: ["Brand strategy", "Identity design", "Design systems", "Art direction", "Motion", "Copywriting"],
    faqs: [
      {
        q: "What's included in a branding project?",
        a: "Typically positioning and strategy, a logo and full visual identity (type, colour, imagery), brand guidelines, and messaging. We scope it to your stage — a startup launch and a rebrand need different things.",
      },
      {
        q: "How is branding different from a logo?",
        a: "A logo is one asset. A brand is the whole system — how you're positioned, how you look, sound and feel across every touchpoint. The logo is the tip; the strategy underneath is what makes it work.",
      },
      {
        q: "Do you design the brand and the website together?",
        a: "Often, yes — and it's the strongest combination. When the same team builds the identity and the site, the brand shows up fully realised online instead of being watered down in translation.",
      },
    ],
    related: ["web-development", "social-media", "ecommerce"],
  },

  {
    slug: "seo",
    name: "SEO",
    h1: "SEO Services in Amsterdam",
    tagline: "Technical, honest SEO that compounds into real traffic.",
    metaTitle: "SEO Amsterdam — Technical SEO & Search Growth Agency",
    metaDescription:
      "SEO services in Amsterdam. Technical SEO, content and search strategy that compound into rankings and qualified traffic — no gimmicks, no keyword stuffing.",
    keywords: [
      "SEO Amsterdam",
      "SEO agency Amsterdam",
      "SEO services Netherlands",
      "technical SEO Amsterdam",
      "search engine optimization Netherlands",
    ],
    intro:
      "SEO isn't magic and it isn't overnight — it's technical foundations, useful content and authority, compounding over time. We do the unglamorous work that actually moves rankings, and we're honest about what it takes.",
    sections: [
      {
        heading: "Technical foundations first",
        body: "A fast, crawlable, well-structured site is the prerequisite for everything else. We fix Core Web Vitals, indexing, structured data and site architecture so search engines can actually understand and rank your pages.",
      },
      {
        heading: "Content that answers real searches",
        body: "We target the queries your customers actually type and build pages that genuinely answer them. Helpful, specific content earns rankings; thin, keyword-stuffed pages get filtered out. We build the former.",
      },
      {
        heading: "Measured, not mystical",
        body: "We track impressions, positions and clicks in Search Console and report on what's moving. No vanity metrics, no 'trust us' — just the numbers and the next move.",
      },
    ],
    deliverables: [
      "Technical SEO audit & fixes",
      "Core Web Vitals optimization",
      "Keyword & search strategy",
      "On-page optimization",
      "Structured data / schema",
      "Content strategy & landing pages",
      "Search Console reporting",
    ],
    stack: ["Technical SEO", "Search Console", "Schema.org", "Content strategy", "Core Web Vitals", "Analytics"],
    faqs: [
      {
        q: "How long does SEO take to work?",
        a: "Technical fixes can show up in weeks; competitive commercial rankings usually take several months of consistent content and authority-building. Anyone promising page one in days isn't being honest with you.",
      },
      {
        q: "Do you guarantee first-page rankings?",
        a: "No one credible can guarantee a specific position — Google controls the results. What we guarantee is the right work: sound technical foundations, genuinely useful content, and transparent reporting so you see progress.",
      },
      {
        q: "What's the difference between technical SEO and content?",
        a: "Technical SEO makes your site fast and understandable to search engines; content gives them something worth ranking. You need both — a perfect technical site with nothing to say won't rank, and great content on a broken site won't either.",
      },
    ],
    related: ["web-development", "ecommerce", "ai-automation"],
  },

  {
    slug: "social-media",
    name: "Social Media",
    h1: "Social Media Management in Amsterdam",
    tagline: "Content and social that builds a brand, not just posts.",
    metaTitle: "Social Media Management Amsterdam — Content & Strategy",
    metaDescription:
      "Social media management in Amsterdam. Strategy, content and management for Instagram, LinkedIn and beyond — building a brand people actually follow.",
    keywords: [
      "social media management Amsterdam",
      "social media agency Netherlands",
      "content creation Amsterdam",
      "Instagram marketing Amsterdam",
      "LinkedIn marketing Netherlands",
    ],
    intro:
      "Posting for the sake of posting is a waste of everyone's time. We run social as a brand channel — a clear strategy, content people actually stop for, and consistent execution that turns followers into a business asset.",
    sections: [
      {
        heading: "Strategy before you post",
        body: "We define who you're talking to, what you stand for and what 'good' looks like on each platform — so the content has a point and a direction instead of chasing whatever's trending this week.",
      },
      {
        heading: "Content worth stopping for",
        body: "Feeds are ruthless. We create scroll-stopping visuals, video and copy that match your brand and earn attention — the kind of content that gets saved and shared, not skipped.",
      },
      {
        heading: "Consistent execution",
        body: "The brands that win on social show up consistently. We handle the calendar, production and posting so your presence stays sharp and regular without eating your week.",
      },
    ],
    deliverables: [
      "Social strategy & channel plan",
      "Content creation (video & static)",
      "Content calendar & scheduling",
      "Community management",
      "Profile & bio optimization",
      "Performance reporting",
    ],
    stack: ["Instagram", "LinkedIn", "TikTok", "Content production", "Copywriting", "Analytics"],
    faqs: [
      {
        q: "Which platforms should my business be on?",
        a: "The ones your customers actually use — usually one or two done well beats five done badly. For most brands that's Instagram plus LinkedIn or TikTok; we recommend based on your audience, not on hype.",
      },
      {
        q: "Do you create the content or just schedule it?",
        a: "Both. We can produce the visuals, video and copy end to end, or work with your existing assets and handle strategy, calendar and management. It scales to what you need.",
      },
      {
        q: "How do you measure social media success?",
        a: "By outcomes that matter — reach, engagement, follower growth and, where relevant, traffic and leads — reported clearly, rather than vanity numbers with no business meaning.",
      },
    ],
    related: ["branding", "web-development", "seo"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
