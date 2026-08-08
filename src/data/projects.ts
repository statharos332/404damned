/**
 * ============================================================
 *  404 DAMNED — Projects / Work data (single source of truth)
 * ============================================================
 *  Add a new case study by appending an object here. It will
 *  automatically appear on the homepage preview, the /work list,
 *  get its own SEO page at /work/<slug>, and enter the sitemap.
 *
 *  Put screenshots in:  /public/work/<slug>/cover.svg  (+ gallery)
 *  Recommended cover size: 1600×1000 (16:10).
 * ============================================================
 */

export interface ProjectResult {
  label: string; // e.g. "Conversion rate"
  value: string; // e.g. "+212%"
}

// A single tile in the project media gallery — image OR video.
// It renders at the file's own natural size (no forced aspect, no crop),
// so just drop any image/video in and it sits as-is.
export interface MediaItem {
  type: "image" | "video";
  src: string; // /work/<slug>/...
  poster?: string; // optional poster shown for videos until they load
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string; // e.g. "E-Commerce", "Web Development", "AI Automation"
  year: string;
  summary: string; // one-line, used on cards
  cover: string; // image OR video (.mp4/.webm) — /work/<slug>/cover.*
  coverPoster?: string; // optional still shown while a video cover loads
  services: string[];
  stack: string[];
  // Long-form (case study page)
  challenge: string;
  approach: string;
  outcome: string;
  results: ProjectResult[];
  gallery: string[]; // extra screenshots (case study page)
  media: MediaItem[]; // horizontal mixed-media strip (expandable row)
  tags: string[]; // category tags shown on the row
  liveUrl?: string;
  featured?: boolean; // shown on homepage preview
}

export const projects: Project[] = [
    {
        slug: "skg-vip-transfers",
        title: "A High-Conversion Booking Platform for Premium Transfers",
        client: "SKG VIP Transfers",
        category: "Web Development",
        year: "2025",
        summary:
            "A high-performance booking platform for a premium transfer service, focused on conversion, speed, and mobile-first UX.",
        cover: "/work/skg-vip-transfers/cover.mp4",
        coverPoster: "/work/skg-vip-transfers/shot-2.webp",

        services: ["Web Development", "UI/UX Design", "Performance Optimization"],

        stack: ["Next.js", "Tailwind", "Node.js", "Stripe / Booking API", "Vercel"],

        challenge:
            "SKG VIP Transfers needed a modern booking experience that could handle mobile-heavy traffic, simplify the booking flow, and increase direct reservations without relying on third-party platforms.",

        approach:
            "We designed and built a conversion-first booking system with a mobile-first UX. The focus was on reducing booking friction, simplifying service selection, and creating a fast, trust-driven experience. The architecture was rebuilt as a high-performance Next.js application with optimized API handling and instant page transitions.",

        outcome:
            "A fast, conversion-optimized booking platform that improves user flow from landing to reservation confirmation, significantly reducing drop-off on mobile and increasing direct bookings.",

        results: [
            { label: "Booking conversion rate", value: "+185%" },
            { label: "Page load speed", value: "0.9s" },
            { label: "Mobile bookings", value: "+140%" }
        ],

        media: [
            { type: "video", src: "/work/skg-vip-transfers/shot-1.mp4" },
            { type: "video", src: "/work/skg-vip-transfers/clip-1.mp4", poster: "/work/skg-vip-transfers/shot-2.webp" },
            { type: "image", src: "/work/skg-vip-transfers/shot-2.webp" },
            { type: "video", src: "/work/skg-vip-transfers/cover.mp4" }
        ],

        tags: ["Booking System", "CRO", "Performance", "UX"],

        gallery: [
            "/work/skg-vip-transfers/shot-1.webp",
            "/work/skg-vip-transfers/shot-2.webp"
        ],

        liveUrl: "https://skgviptransfers.com/en",
        featured: true
    },

    {
        slug: "etsyboost-ai",
        title: "AI-Powered Etsy SEO Listing Engine",
        client: "EtsyBoost AI",
        category: "AI Automation",
        year: "2026",
        summary:
            "An AI-driven SEO automation system that transforms raw product inputs into high-converting Etsy listings optimized for search and conversion.",
        cover: "/work/etsyboost-ai/cover.svg",
        services: ["AI Automation", "SEO Optimization", "E-commerce Tools"],
        stack: ["OpenAI", "Next.js", "Prompt Engineering"],
        challenge:
            "Etsy sellers struggle with writing optimized titles, descriptions, and tags that actually rank in search and convert visitors into buyers.",
        approach:
            "We built an AI automation system that acts as an Etsy SEO specialist, generating structured, keyword-optimized listings including titles, descriptions, and tags based on product input.",
        outcome:
            "Sellers can now generate fully optimized Etsy listings in seconds, eliminating manual SEO work and improving product discoverability.",
        results: [
            { label: "Listing time", value: "-95%" },
            { label: "SEO output quality", value: "High" },
            { label: "Manual effort", value: "Eliminated" }
        ],
        media: [
            { type: "video", src: "/work/etsyboost-ai/shot-1.mp4", poster: "/work/etsyboost-ai/shot-1.webp" },
            { type: "video", src: "/work/etsyboost-ai/shot-3.mp4" },
            { type: "video", src: "/work/etsyboost-ai/shot-2.mp4" },
            { type: "image", src: "/work/etsyboost-ai/cover.svg" }
        ],
        tags: ["AI", "Automation", "SEO"],
        gallery: [
            "/work/etsyboost-ai/shot-1.svg",
            "/work/etsyboost-ai/shot-2.svg"
        ],
        liveUrl: "https://etsyboost-ai.vercel.app/",
        featured: true
    },

    {
        slug: "llms-txt-ai-visibility-wordpress",
        title: "AI-Powered llms.txt Generation for WordPress",
        client: "AI Visibility",
        category: "AI Automation",
        year: "2026",
        summary:
            "A WordPress plugin that generates an AI-readable index of a site's real content automatically — genuine OpenAI-written summaries and classification, not keyword guessing.",
        cover: "/work/llms-txt-ai-visibility-wordpress/cover.svg",

        services: ["AI Automation", "SEO", "Plugin Development"],

        stack: ["WordPress", "PHP", "OpenAI API", "ACF", "Elementor"],

        challenge:
            "AI systems like ChatGPT and Perplexity increasingly answer questions directly instead of sending a click, and need something better than raw HTML to read. WordPress makes this harder than it looks: real page content is scattered across post_content, ACF fields and Elementor's serialized builder data, not sitting in one obvious place a generic tool would check.",

        approach:
            "We built a plugin that generates two files — llms.txt and llms-full.txt — automatically, pulling real content from post_content, ACF and Elementor. Each page gets a genuine OpenAI-written summary and category classification, cached per content hash so nothing gets reprocessed unnecessarily, with an automatic fallback to a rule-based extractor whenever AI isn't configured or a request fails. Before calling it done, we deployed it on a live WordPress install and found a real bug — WordPress's own canonical-redirect logic was silently 301-redirecting the endpoint before our handler ever ran — fixed it, then verified the AI path end-to-end with a real API key and a real spend.",

        outcome:
            "A working, tested plugin that makes a site's actual content legible to AI systems, with classification that's measurably better than keyword matching. An \"About us\" page our rule-based fallback misclassified as \"Contact\" at 55% confidence — because the text mentioned \"direct contact with the developer\" — landed correctly under \"Company\" at 95% confidence once AI was switched on, with a real written summary instead of a truncated sentence.",

        results: [
            { label: "Content sources covered", value: "3" },
            { label: "Classification confidence", value: "55% → 95%" },
            { label: "Fallback reliability", value: "100%" }
        ],

        media: [
            { type: "image", src: "/work/llms-txt-ai-visibility-wordpress/shot-1.png" },
            { type: "image", src: "/work/llms-txt-ai-visibility-wordpress/shot-2.png" },
            { type: "image", src: "/work/llms-txt-ai-visibility-wordpress/shot-3.png" },
            { type: "image", src: "/work/llms-txt-ai-visibility-wordpress/shot-4.png" }
        ],

        tags: ["AI", "WordPress", "SEO", "GEO"],

        gallery: [],

        featured: true
    }
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

// Unique category list for the filter bar (with "All" first)
export function getCategories(): string[] {
  const set = new Set<string>();
  projects.forEach((p) => set.add(p.category));
  return ["All", ...Array.from(set)];
}
