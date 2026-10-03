import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import { servicesNl } from "@/data/services.nl";
import { languageAlternates, localizedPath, serviceHref, serviceLanguageAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.404damned.com";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

// One sitemap entry per locale for a given (unprefixed) path, each pointing
// at the others via alternates.languages so Google understands they're
// translations of the same page rather than duplicate content.
function entries(
  path: string,
  opts: { lastModified: Date; changeFrequency: ChangeFrequency; priority: number }
): MetadataRoute.Sitemap {
  const languages = languageAlternates(path);
  return routing.locales.map((locale) => ({
    url: `${BASE_URL}${localizedPath(path, locale)}`,
    lastModified: opts.lastModified,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Service landing pages — the commercial money pages. NL URLs use a
  // Dutch keyword slug (/nl/diensten/webshop-laten-maken), a genuinely
  // different path from EN (not just a /nl prefix), so these can't go
  // through the generic entries() helper — see serviceHref() in lib/seo.
  const servicePages: MetadataRoute.Sitemap = services.flatMap((s) => {
    const nlService = servicesNl.find((n) => n.slug === s.slug) ?? s;
    const languages = serviceLanguageAlternates(s);
    return routing.locales.map((locale) => ({
      url: `${BASE_URL}${serviceHref(locale === "nl" ? nlService : s, locale)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: { languages },
    }));
  });

  // Each case study gets its own indexable URL
  const workPages = projects.flatMap((p) =>
    entries(`/work/${p.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.8 })
  );

  // Each insight/blog article
  const postPages = posts.flatMap((p) =>
    entries(`/insights/${p.slug}`, { lastModified: new Date(p.date), changeFrequency: "monthly", priority: 0.7 })
  );

  const legalPages = ["privacy-policy", "terms-of-service", "cookie-policy"].flatMap((slug) =>
    entries(`/${slug}`, { lastModified: now, changeFrequency: "yearly", priority: 0.3 })
  );

  const servicesHubLanguages = {
    en: `${BASE_URL}/services`,
    nl: `${BASE_URL}/nl/diensten`,
    "x-default": `${BASE_URL}/services`,
  };
  const servicesHubPages: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${BASE_URL}${locale === "nl" ? "/nl/diensten" : "/services"}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
    alternates: { languages: servicesHubLanguages },
  }));

  return [
    ...entries("/", { lastModified: now, changeFrequency: "weekly", priority: 1 }),
    ...entries("/about", { lastModified: now, changeFrequency: "monthly", priority: 0.6 }),
    ...servicesHubPages,
    ...servicePages,
    ...entries("/work", { lastModified: now, changeFrequency: "weekly", priority: 0.9 }),
    ...workPages,
    ...entries("/insights", { lastModified: now, changeFrequency: "weekly", priority: 0.8 }),
    ...postPages,
    ...legalPages,
  ];
}
