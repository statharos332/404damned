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

// A single tile in the horizontal media strip — image OR video.
export interface MediaItem {
  type: "image" | "video";
  src: string; // /work/<slug>/...
  // portrait tiles read as 4:5, landscape as 3:2 — mix them like Lama Lama
  ratio?: "portrait" | "landscape";
  poster?: string; // optional poster for videos
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
            { type: "video", src: "/work/skg-vip-transfers/shot-1.mp4", ratio: "portrait" },
            { type: "video", src: "/work/skg-vip-transfers/clip-1.mp4", ratio: "landscape", poster: "/work/skg-vip-transfers/shot-2.webp" },
            { type: "image", src: "/work/skg-vip-transfers/shot-2.webp", ratio: "landscape" },
            { type: "video", src: "/work/skg-vip-transfers/cover.mp4", ratio: "portrait" }
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
            { type: "video", src: "/work/etsyboost-ai/shot-1.mp4", ratio: "portrait", poster: "/work/etsyboost-ai/shot-1.webp" },
            { type: "video", src: "/work/etsyboost-ai/shot-3.mp4", ratio: "portrait" },
            { type: "video", src: "/work/etsyboost-ai/shot-2.mp4", ratio: "landscape" },
            { type: "image", src: "/work/etsyboost-ai/cover.svg", ratio: "portrait" }
        ],
        tags: ["AI", "Automation", "SEO"],
        gallery: [
            "/work/etsyboost-ai/shot-1.svg",
            "/work/etsyboost-ai/shot-2.svg"
        ],
        liveUrl: "https://etsyboost-ai.vercel.app/",
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
