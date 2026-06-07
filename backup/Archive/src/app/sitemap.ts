import type { MetadataRoute } from "next";

const BASE_URL = "https://404damned.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Single-page site: the homepage plus its in-page section anchors.
  // When you add real routes (e.g. /work/noord, /blog/...), add them here.
  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/#services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/#work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/#process`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/#pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/#contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    },
  ];
}
