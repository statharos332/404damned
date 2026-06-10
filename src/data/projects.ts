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
  cover: string; // /work/<slug>/cover.svg
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
    slug: "noord-fashion",
    title: "A Conversion-First Fashion Storefront",
    client: "Noord Fashion",
    category: "E-Commerce",
    year: "2025",
    summary:
      "A headless Magento rebuild that turned a slow catalogue into a fast, conversion-engineered storefront.",
    cover: "/work/noord-fashion/cover.svg",
    services: ["E-Commerce", "UI/UX Design", "Performance"],
    stack: ["Magento", "Next.js", "Tailwind", "Vercel"],
    challenge:
      "Noord Fashion's legacy store was slow, hard to manage, and leaking revenue at checkout. Mobile conversion was especially weak.",
    approach:
      "We moved them to a headless architecture — Magento for commerce, a Next.js storefront for speed. We rebuilt the product and checkout flows around a single goal: remove every gram of friction between interest and purchase.",
    outcome:
      "A storefront that loads in under a second, ranks better, and converts dramatically more traffic — without changing their ad spend.",
    results: [
      { label: "Conversion rate", value: "+212%" },
      { label: "Page load", value: "0.8s" },
      { label: "Mobile revenue", value: "+167%" },
    ],
    media: [
      { type: "image", src: "/work/noord-fashion/shot-1.svg", ratio: "portrait" },
      { type: "video", src: "/work/noord-fashion/clip-1.mp4", ratio: "landscape", poster: "/work/noord-fashion/cover.svg" },
      { type: "image", src: "/work/noord-fashion/shot-2.svg", ratio: "landscape" },
      { type: "image", src: "/work/noord-fashion/cover.svg", ratio: "portrait" },
    ],
    tags: ["E-Commerce", "Magento", "CRO"],
    gallery: [
      "/work/noord-fashion/shot-1.svg",
      "/work/noord-fashion/shot-2.svg",
    ],
    liveUrl: "",
    featured: true,
  },
  {
    slug: "amstel-construction",
    title: "A Premium Brand for a Premium Builder",
    client: "Amstel Construction",
    category: "Web Development",
    year: "2025",
    summary:
      "A credibility-first website that positioned a construction firm as the premium choice in Amsterdam.",
    cover: "/work/amstel-construction/cover.svg",
    services: ["Web Development", "Branding", "SEO"],
    stack: ["Next.js", "Sanity CMS", "Tailwind", "Vercel"],
    challenge:
      "Amstel competed on quality but their old site looked like everyone else's. They were losing high-value tenders before the first meeting.",
    approach:
      "We rebuilt their brand presence around proof: a cinematic project portfolio, clear process, and fast, SEO-ready pages they can update themselves through a CMS.",
    outcome:
      "A site that wins trust before the first call — and now ranks for the local terms that bring in serious project enquiries.",
    results: [
      { label: "Qualified leads", value: "+140%" },
      { label: "Avg. project value", value: "+38%" },
      { label: "Organic traffic", value: "+95%" },
    ],
    media: [
      { type: "image", src: "/work/amstel-construction/shot-1.svg", ratio: "landscape" },
      { type: "image", src: "/work/amstel-construction/shot-2.svg", ratio: "portrait" },
      { type: "video", src: "/work/amstel-construction/clip-1.mp4", ratio: "landscape", poster: "/work/amstel-construction/cover.svg" },
      { type: "image", src: "/work/amstel-construction/cover.svg", ratio: "portrait" },
    ],
    tags: ["Web", "Branding", "SEO"],
    gallery: [
      "/work/amstel-construction/shot-1.svg",
      "/work/amstel-construction/shot-2.svg",
    ],
    liveUrl: "",
    featured: true,
  },
  {
    slug: "kanaal-automation",
    title: "Automating a Studio's Busywork Away",
    client: "Kanaal Studio",
    category: "AI Automation",
    year: "2024",
    summary:
      "An AI lead-handling and CRM automation system that gave a creative studio back its week.",
    cover: "/work/kanaal-automation/cover.svg",
    services: ["AI Automation", "Integrations"],
    stack: ["OpenAI", "Make", "HubSpot", "Next.js"],
    challenge:
      "Kanaal's team spent hours every day qualifying leads, copying data between tools, and chasing follow-ups by hand.",
    approach:
      "We built an automation layer that captures every lead, qualifies it with AI, routes it into their CRM, and triggers the right follow-up — with zero manual steps.",
    outcome:
      "The studio reclaimed roughly a day per week per person, and no lead slips through the cracks anymore.",
    results: [
      { label: "Time saved", value: "32 hrs/wk" },
      { label: "Lead response", value: "<2 min" },
      { label: "Follow-up rate", value: "100%" },
    ],
    media: [
      { type: "video", src: "/work/kanaal-automation/clip-1.mp4", ratio: "landscape", poster: "/work/kanaal-automation/cover.svg" },
      { type: "image", src: "/work/kanaal-automation/shot-1.svg", ratio: "portrait" },
      { type: "image", src: "/work/kanaal-automation/shot-2.svg", ratio: "landscape" },
      { type: "image", src: "/work/kanaal-automation/cover.svg", ratio: "portrait" },
    ],
    tags: ["AI", "Automation"],
    gallery: [
      "/work/kanaal-automation/shot-1.svg",
      "/work/kanaal-automation/shot-2.svg",
    ],
    liveUrl: "",
    featured: true,
  },
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
