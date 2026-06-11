import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";

const BASE_URL = "https://404damned.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Each case study gets its own indexable URL
  const workPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Each insight/blog article
  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/insights/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...workPages,
    {
      url: `${BASE_URL}/insights`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postPages,
    {
      url: `${BASE_URL}/#services`,
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
