/**
 * ============================================================
 *  404 DAMNED — Projects / Work data (Dutch)
 * ============================================================
 *  Dutch mirror of projects.ts — same slugs/order/assets/stats,
 *  translated prose fields. Keep in sync whenever projects.ts
 *  changes (add the same case study here, translated).
 * ============================================================
 */

import type { Project } from "./projects";

export const projectsNl: Project[] = [
  {
    slug: "skg-vip-transfers",
    title: "Een boekingsplatform met hoge conversie voor premium transfers",
    client: "SKG VIP Transfers",
    category: "Webontwikkeling",
    year: "2025",
    summary:
      "Een high-performance boekingsplatform voor een premium transferdienst, gericht op conversie, snelheid en mobile-first UX.",
    cover: "/work/skg-vip-transfers/cover.mp4",
    coverPoster: "/work/skg-vip-transfers/shot-2.webp",

    services: ["Webontwikkeling", "UI/UX-ontwerp", "Performance-optimalisatie"],

    stack: ["Next.js", "Tailwind", "Node.js", "Stripe / Booking API", "Vercel"],

    challenge:
      "SKG VIP Transfers had behoefte aan een moderne boekingservaring die veel mobiel verkeer aankon, het boekingsproces vereenvoudigde en directe reserveringen liet groeien zonder afhankelijkheid van externe platforms.",

    approach:
      "We ontwierpen en bouwden een boekingssysteem dat conversie voorop zet, met een mobile-first UX. De focus lag op het wegnemen van frictie in het boekingsproces, het vereenvoudigen van de dienstkeuze en het creëren van een snelle, vertrouwenwekkende ervaring. De architectuur werd herbouwd als een high-performance Next.js-applicatie met geoptimaliseerde API-afhandeling en directe paginaovergangen.",

    outcome:
      "Een snel, conversiegeoptimaliseerd boekingsplatform dat de flow van landing tot reserveringsbevestiging verbetert, drop-off op mobiel fors terugbrengt en directe boekingen laat toenemen.",

    results: [
      { label: "Boekingsconversie", value: "+185%" },
      { label: "Laadsnelheid", value: "0.9s" },
      { label: "Mobiele boekingen", value: "+140%" },
    ],

    media: [
      { type: "video", src: "/work/skg-vip-transfers/shot-1.mp4" },
      { type: "video", src: "/work/skg-vip-transfers/clip-1.mp4", poster: "/work/skg-vip-transfers/shot-2.webp" },
      { type: "image", src: "/work/skg-vip-transfers/shot-2.webp" },
      { type: "video", src: "/work/skg-vip-transfers/cover.mp4" },
    ],

    tags: ["Boekingssysteem", "CRO", "Performance", "UX"],

    gallery: [
      "/work/skg-vip-transfers/shot-1.webp",
      "/work/skg-vip-transfers/shot-2.webp",
    ],

    liveUrl: "https://skgviptransfers.com/en",
    featured: true,
  },

  {
    slug: "etsyboost-ai",
    title: "Een AI-gedreven SEO-listingmachine voor Etsy",
    client: "EtsyBoost AI",
    category: "AI-automatisering",
    year: "2026",
    summary:
      "Een AI-gedreven SEO-automatiseringssysteem dat ruwe productinput omzet in goed converterende Etsy-listings, geoptimaliseerd voor zoekverkeer en conversie.",
    cover: "/work/etsyboost-ai/cover.svg",
    services: ["AI-automatisering", "SEO-optimalisatie", "E-commerce tools"],
    stack: ["OpenAI", "Next.js", "Prompt Engineering"],
    challenge:
      "Etsy-verkopers hebben moeite met het schrijven van geoptimaliseerde titels, beschrijvingen en tags die daadwerkelijk scoren in zoekresultaten en bezoekers omzetten in kopers.",
    approach:
      "We bouwden een AI-automatiseringssysteem dat fungeert als Etsy SEO-specialist en gestructureerde, keyword-geoptimaliseerde listings genereert — inclusief titels, beschrijvingen en tags — op basis van productinput.",
    outcome:
      "Verkopers kunnen nu binnen enkele seconden volledig geoptimaliseerde Etsy-listings genereren, waarmee handmatig SEO-werk overbodig wordt en producten beter vindbaar worden.",
    results: [
      { label: "Tijd per listing", value: "-95%" },
      { label: "SEO-kwaliteit", value: "Hoog" },
      { label: "Handmatig werk", value: "Nihil" },
    ],
    media: [
      { type: "video", src: "/work/etsyboost-ai/shot-1.mp4", poster: "/work/etsyboost-ai/shot-1.webp" },
      { type: "video", src: "/work/etsyboost-ai/shot-3.mp4" },
      { type: "video", src: "/work/etsyboost-ai/shot-2.mp4" },
      { type: "image", src: "/work/etsyboost-ai/cover.svg" },
    ],
    tags: ["AI", "Automatisering", "SEO"],
    gallery: [
      "/work/etsyboost-ai/shot-1.svg",
      "/work/etsyboost-ai/shot-2.svg",
    ],
    liveUrl: "https://etsyboost-ai.vercel.app/",
    featured: true,
  },
];

export function getProjectNl(slug: string): Project | undefined {
  return projectsNl.find((p) => p.slug === slug);
}

export function getFeaturedProjectsNl(): Project[] {
  return projectsNl.filter((p) => p.featured);
}

export function getCategoriesNl(): string[] {
  const set = new Set<string>();
  projectsNl.forEach((p) => set.add(p.category));
  return ["Alles", ...Array.from(set)];
}
