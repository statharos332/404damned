import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { services } from "@/data/services";
import { languageAlternates, localizedPath } from "@/lib/seo";
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

  // Service landing pages — the commercial money pages
  const servicePages = services.flatMap((s) =>
    entries(`/services/${s.slug}`, { lastModified: now, changeFrequency: "monthly", priority: 0.9 })
  );

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

  return [
    ...entries("/", { lastModified: now, changeFrequency: "weekly", priority: 1 }),
    ...entries("/about", { lastModified: now, changeFrequency: "monthly", priority: 0.6 }),
    ...entries("/services", { lastModified: now, changeFrequency: "monthly", priority: 0.9 }),
    ...servicePages,
    ...entries("/work", { lastModified: now, changeFrequency: "weekly", priority: 0.9 }),
    ...workPages,
    ...entries("/insights", { lastModified: now, changeFrequency: "weekly", priority: 0.8 }),
    ...postPages,
    ...legalPages,
  ];
}
