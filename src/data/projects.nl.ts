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
    clientWork: true,
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
    clientWork: false,
  },

  {
    slug: "llms-txt-ai-visibility-wordpress",
    title: "AI-gedreven llms.txt-generatie voor WordPress",
    client: "AI Visibility",
    category: "AI-automatisering",
    year: "2026",
    summary:
      "Een WordPress-plugin die automatisch een AI-leesbare index van de echte content van een site genereert — oprechte OpenAI-samenvattingen en classificatie, geen gok op keywords.",
    cover: "/work/llms-txt-ai-visibility-wordpress/cover.svg",

    services: ["AI-automatisering", "SEO", "Plugin-ontwikkeling"],

    stack: ["WordPress", "PHP", "OpenAI API", "ACF", "Elementor"],

    challenge:
      "AI-systemen als ChatGPT en Perplexity beantwoorden steeds vaker vragen direct in plaats van een klik door te sturen, en hebben iets beters nodig dan ruwe HTML om te lezen. WordPress maakt dat lastiger dan het lijkt: echte pagina-inhoud staat verspreid over post_content, ACF-velden en de geserialiseerde builder-data van Elementor, niet op één voor de hand liggende plek die een generieke tool zou checken.",

    approach:
      "Wij bouwden een plugin die automatisch twee bestanden genereert — llms.txt en llms-full.txt — en haalt echte content op uit post_content, ACF en Elementor. Elke pagina krijgt een oprecht door OpenAI geschreven samenvatting en categorie-classificatie, gecachet per content-hash zodat niets onnodig opnieuw wordt verwerkt, met een automatische terugval op een regelgebaseerde extractor zodra AI niet is ingesteld of een aanvraag mislukt. Voordat we het klaar noemden, zetten we hem op een live WordPress-installatie en vonden we een echte bug — WordPress' eigen canonical-redirect-logica stuurde het endpoint stilletjes met een 301 door voordat onze handler ooit werd aangeroepen — losten we op, en verifieerden daarna het AI-pad van begin tot eind met een echte API-key en echte kosten.",

    outcome:
      "Een werkende, geteste plugin die de echte content van een site leesbaar maakt voor AI-systemen, met classificatie die meetbaar beter is dan keyword-matching. Een 'Over ons'-pagina die onze regelgebaseerde fallback verkeerd classificeerde als 'Contact' met 55% confidence — omdat de tekst 'rechtstreeks contact met de developer' noemde — kwam correct onder 'Company' terecht met 95% confidence zodra AI werd aangezet, met een echte geschreven samenvatting in plaats van een afgekapte zin.",

    results: [
      { label: "Content-bronnen gedekt", value: "3" },
      { label: "Classificatie-confidence", value: "55% → 95%" },
      { label: "Betrouwbaarheid bij AI-uitval", value: "100%" },
    ],

    media: [
      { type: "image", src: "/work/llms-txt-ai-visibility-wordpress/shot-1.png" },
      { type: "image", src: "/work/llms-txt-ai-visibility-wordpress/shot-2.png" },
      { type: "image", src: "/work/llms-txt-ai-visibility-wordpress/shot-3.png" },
      { type: "image", src: "/work/llms-txt-ai-visibility-wordpress/shot-4.png" },
    ],

    tags: ["AI", "WordPress", "SEO", "GEO"],

    gallery: [],

    featured: true,
    clientWork: false,
  },

  {
    slug: "magento-1-to-headless-wordpress-migration",
    title: "Een catalogus van 44.769 SKU's migreren van een falende Magento 1-server",
    client: "Griekse e-commerce retailer",
    category: "E-commerce",
    year: "2026",
    summary:
      "Een catalogus van 44.769 SKU's gemigreerd van Magento 1 naar een headless WordPress-build met nul downtime, nadat reindexen en feed-exports de oude server onderuit haalden.",
    cover: "/work/magento-1-to-headless-wordpress-migration/cover.svg",

    services: ["E-commerce", "Webontwikkeling", "Platformmigratie"],

    stack: ["WordPress", "Next.js", "Custom MU-plugin", "Headless"],

    challenge:
      "De webshop van de klant draaide 44.769 SKU's op Magento 1 — al lang voorbij het einde van de levensduur, zonder security-patches sinds 2020. Het was niet alleen een compliance-risico: de basisarchitectuur van het platform kraakte onder zijn eigen catalogus, en een reindex tegelijk met de feed-exporter draaien overbelastte de server ronduit. De zoekfunctie in de shop was daarbovenop onbetrouwbaar. De catalogus was groter geworden dan de opzet daadwerkelijk kon dragen.",

    approach:
      "Wij bouwden de webshop opnieuw op als headless WordPress-platform met een custom must-use-plugin, en een Next.js-front-end — waarbij we bewust zo dicht mogelijk bij hoe de site zich gedroeg voor redacteuren en klanten bleven, zodat de migratie het fundament veranderde zonder de ervaring onder iemand vandaan te veranderen. De volledige catalogus, alle 44.769 SKU's, werd gemigreerd samen met bestellingen en klantaccounts, met elke oude URL vooruit gemapt. De overstap werd gefaseerd zodat de webshop tijdens de wissel nooit plat lag.",

    outcome:
      "De webshop verliet Magento 1 in ongeveer twee weken, met nul downtime tijdens de overstap. De reindex-en-export-overbelasting die de server altijd bedreigde, is sindsdien niet meer teruggekomen — de architectuur die het veroorzaakte bestaat niet meer. We mapten elke oude URL naar zijn nieuwe adres als onderdeel van de migratie zelf; we hebben voor deze klant geen ranking-data ná de migratie bijgehouden, dus we gaan geen specifiek SEO-resultaat claimen dat we niet kunnen onderbouwen.",

    results: [
      { label: "Producten gemigreerd", value: "44.769 SKU's" },
      { label: "Downtime tijdens overstap", value: "0" },
      { label: "Migratietijdlijn", value: "~2 weken" },
    ],

    media: [
      { type: "image", src: "/work/magento-1-to-headless-wordpress-migration/cover.svg" },
    ],

    tags: ["Migratie", "Headless", "WordPress", "Magento"],

    gallery: [],

    featured: false,
    clientWork: true,
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
