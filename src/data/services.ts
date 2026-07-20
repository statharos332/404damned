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
      "Stathis has been building for the web — for agencies, for large clients, for himself — since long before 404 DAMNED existed. Every site we ship comes out of that background: custom-coded in Next.js and React, tuned until it loads in under a second, and structured so Google can actually read it instead of guessing.",
    sections: [
      {
        heading: "Speed decides more than most people budget for",
        body: "A landing page with a three-second load loses a meaningful share of visitors before they've read a word. We build for sub-1.5s LCP and near-zero layout shift from the first commit, because fixing speed after launch always costs more than building for it from day one.",
      },
      {
        heading: "No theme gets stretched to fit your brand",
        body: "Every build starts from a blank file in React and Next.js. That takes longer than installing a theme and swapping the colours, but it means the site is exactly as fast and distinctive as your business needs — and the code stays clean enough for your team, or ours, to extend two years from now without a rebuild.",
      },
      {
        heading: "Built so Google understands it, not just people",
        body: "Semantic markup, server-side rendering, structured data and a clean URL structure aren't bolted on at the end — they're part of the same build. A site search engines can parse easily is also, not coincidentally, one that's easier to maintain as you grow.",
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
        a: "A custom marketing site usually starts around €5,000; larger web apps and platforms scale up from there depending on scope. We quote after a short call, once we actually know what you need — not a fixed package that pads the invoice.",
      },
      {
        q: "How long does it take to build a website?",
        a: "Most custom builds go live in 4–8 weeks. The main variables are scope and how quickly content and feedback come back from your side — we lay out the timeline in the proposal and hold to it.",
      },
      {
        q: "Do you use WordPress or custom code?",
        a: "Custom, in Next.js and React — that's where the speed and control come from. If a project genuinely needs a CMS, we wire in a fast headless one so your team can edit content without touching code.",
      },
      {
        q: "Will my website actually rank on Google?",
        a: "The build itself ships fast, crawlable and structured — that's the foundation ranking needs. Whether it actually ranks also depends on content and backlinks over time, which we can help with separately.",
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
      "Tatiana and Stathis have built e-commerce stores on Shopify, Magento and WooCommerce for years between them — from small catalogues to complex B2B pricing. Whatever platform fits your stage, the build gets engineered around one number: conversion rate, not how the demo looked in a pitch.",
    sections: [
      {
        heading: "The right platform for your stage",
        body: "Shopify gets you live fast. Magento (Adobe Commerce) handles complex catalogues and B2B pricing rules that Shopify struggles with. A headless build makes sense when performance and design freedom matter more than launch speed. We'll tell you which one fits your business, even when it's not the one that's easiest for us to build.",
      },
      {
        heading: "Conversion is the whole point",
        body: "A store is a machine for turning traffic into orders, and most of the leaks are boring: a checkout with one extra step, product pages that load slowly, a mobile experience that was clearly an afterthought. We go after those first, because that's where the money actually is.",
      },
      {
        heading: "Migrations without the drama",
        body: "Moving off a slow, dated store is where a lot of sites lose their rankings overnight. We map every old URL to its new one, carry structured data and metadata across, and migrate catalogues and customers carefully enough that you keep the SEO equity you already earned.",
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
        a: "Shopify wins on speed to launch and simplicity. Magento (Adobe Commerce) wins once your catalogue, pricing rules or B2B requirements get complex. We'll match the platform to your catalogue and team on a call, not before.",
      },
      {
        q: "Can you migrate my existing store without losing rankings?",
        a: "Yes — that's most of the risk in a migration, and most of the work. Old URLs get mapped to new ones, structured data and metadata carry over, and content moves carefully enough that your SEO equity doesn't reset to zero.",
      },
      {
        q: "Do you build headless e-commerce?",
        a: "We do. A custom Next.js front end on top of Shopify or a commerce backend gets you the fastest possible store with no design ceiling. It's worth the extra engineering when speed and a distinctive storefront are actually a competitive advantage for you.",
      },
      {
        q: "How do you increase conversion rate?",
        a: "By removing friction, in order: page speed, checkout length, product page clarity, mobile UX, trust signals. Then we measure against real analytics instead of guessing what to fix next.",
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
      "Most 'AI automation' pitches turn out to be a chatbot bolted onto a website. What we build instead is wired into your actual workflows — the inbox, the CRM, the spreadsheet you dread opening — doing the writing, sorting, replying and summarising that's quietly eating hours out of your week.",
    sections: [
      {
        heading: "Automate the work that eats your week",
        body: "Lead handling, content drafts, data entry, support triage, recurring reports — these are the tasks that drain a team's time without needing much real judgment. We map where your week actually goes, then build systems for the parts that don't need a human doing them by hand.",
      },
      {
        heading: "Wired into your actual tools",
        body: "An automation that lives off to the side, disconnected from where you work, doesn't get used. We connect into your CRM, inbox, spreadsheets and store directly, so the system acts inside your existing process instead of asking you to adopt a new one.",
      },
      {
        heading: "Custom, measured, and yours",
        body: "We build to your workflow, not a template, and we track the outcome that matters — hours saved, cost cut, output shipped — so it's obvious whether the system earned its place. You own what we build; we're just the ones who built it.",
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
        a: "Anything repetitive that's rule-based or language-based: drafting content, qualifying leads, answering routine questions, summarising documents, moving data between tools. We start by mapping where you're losing the most time, then build for that first.",
      },
      {
        q: "Is this just a chatbot?",
        a: "No — a chatbot is one small use case among many. Most of what we build has no interface at all: it runs inside a workflow, does the task end to end, and your team never has to think about it.",
      },
      {
        q: "Will it integrate with the tools we already use?",
        a: "Yes, through their APIs — your CRM, email, spreadsheets, store, internal systems. The automation is built to fit your process, not the other way round.",
      },
      {
        q: "How do we know it's worth it?",
        a: "Every automation gets scoped around a measurable outcome before we build it — hours saved or cost removed — and we start with whichever task has the highest return, so you see it working quickly rather than taking it on faith.",
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
      "Most brands look like their competitors with a different logo swapped in. We start with positioning — who you're actually for, what you're against — before a single visual gets made, so the identity that comes out the other end is hard to confuse with anyone else's.",
    sections: [
      {
        heading: "Strategy before decoration",
        body: "A brand is a decision about who you're for and who you're not, made before the mood board gets opened. Skip that step and you end up with a logo that looks nice and says nothing. We start with positioning so every visual choice afterwards has a reason behind it.",
      },
      {
        heading: "A complete visual system",
        body: "Logo, type, colour, motion, imagery, and the rules that hold them together across a website, a deck, an ad and a business card. What you get is a system, not a single logo file and a shrug about how to use it everywhere else.",
      },
      {
        heading: "A voice that sounds like you",
        body: "The words matter as much as the visuals. We write the tone and messaging that carries your positioning into every headline, so the brand still feels like itself whether it's on your homepage or in a client's inbox.",
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
        a: "Usually positioning and strategy, a logo and full visual identity — type, colour, imagery — brand guidelines, and messaging. A startup launch and a rebrand need different things, so we scope it to your stage rather than sell a fixed package.",
      },
      {
        q: "How is branding different from a logo?",
        a: "A logo is one asset. A brand is the whole system: how you're positioned, how you look and sound everywhere you show up. The logo is what people see first; the strategy underneath is what makes it hold together.",
      },
      {
        q: "Do you design the brand and the website together?",
        a: "Often, and it's the stronger combination. When the same team builds the identity and the site, the brand shows up fully realised online instead of getting watered down somewhere in the handoff between two agencies.",
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
      "SEO is mostly unglamorous: fixing what's broken technically, writing content that actually answers what people search, and earning the kind of links that take longer than anyone wants to hear. We'd rather tell you that upfront than sell you a shortcut that doesn't exist.",
    sections: [
      {
        heading: "Technical foundations first",
        body: "None of the rest works if the site is slow or search engines can't crawl it properly. We fix Core Web Vitals, indexing issues, structured data and site architecture first, because that's the floor everything else gets built on.",
      },
      {
        heading: "Content that answers real searches",
        body: "We target the exact queries your customers type and build pages that actually answer them — not pages stuffed with the keyword and padded to a word count. Thin content gets filtered out by Google's own systems now; substance is what survives.",
      },
      {
        heading: "Measured, not mystical",
        body: "Impressions, positions and clicks, tracked in Search Console and reported on plainly. No vanity metrics, no 'trust the process' — just what's moving, what isn't, and what we're doing about it next.",
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
        a: "Technical fixes can show up within weeks. Competitive commercial rankings usually take several months of consistent content and link-building on top of that. Anyone promising page one in days isn't being straight with you.",
      },
      {
        q: "Do you guarantee first-page rankings?",
        a: "No one credible can guarantee a specific ranking — Google controls that, not us. What we can guarantee is the right work: solid technical foundations, genuinely useful content, and reporting you can actually see.",
      },
      {
        q: "What's the difference between technical SEO and content?",
        a: "Technical SEO makes the site fast and legible to search engines. Content gives them something worth ranking. A flawless technical site with nothing to say won't rank, and great content on a broken site won't either — you need both.",
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
      "Posting for the sake of posting wastes everyone's time, including yours. We treat social as a brand channel with an actual strategy behind it — not a content calendar that exists because someone said you should be posting more.",
    sections: [
      {
        heading: "Strategy before you post",
        body: "Who you're talking to, what you stand for, what 'good' looks like on each platform — decided before the first post goes up, so the content has a direction instead of chasing whatever's trending that week.",
      },
      {
        heading: "Content worth stopping for",
        body: "Feeds don't reward mediocre content, they just scroll past it. We make visuals, video and copy built to earn a stop and a save, not just to fill a slot in the calendar.",
      },
      {
        heading: "Consistent execution",
        body: "The accounts that win on social show up reliably, not in bursts. We handle the calendar, production and posting so your presence stays sharp without it eating your week.",
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
        a: "Whichever ones your customers actually use — usually one or two done well beats five done badly. For most brands that's Instagram plus LinkedIn or TikTok, chosen based on your audience, not on what's trending.",
      },
      {
        q: "Do you create the content or just schedule it?",
        a: "Both, depending what you need. We can produce the visuals, video and copy end to end, or work from your existing assets and just handle strategy, calendar and management.",
      },
      {
        q: "How do you measure social media success?",
        a: "By outcomes that actually matter to the business — reach, engagement, follower growth and, where it applies, traffic and leads. Reported clearly, not as vanity numbers with nothing behind them.",
      },
    ],
    related: ["branding", "web-development", "seo"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
