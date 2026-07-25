const BASE_URL = "https://www.404damned.com";

/** Prefix a path with /nl for the Dutch locale; English stays unprefixed. */
export function localizedPath(path: string, locale: string): string {
  const clean = path === "/" ? "" : path;
  return locale === "nl" ? `/nl${clean}` : clean || "/";
}

/** Full en/nl/x-default alternates.languages map for a canonical (unprefixed) path. */
export function languageAlternates(path: string) {
  const clean = path === "/" ? "" : path;
  return {
    en: `${BASE_URL}${clean || "/"}`,
    nl: `${BASE_URL}/nl${clean}`,
    "x-default": `${BASE_URL}${clean || "/"}`,
  };
}

/**
 * Build a BreadcrumbList JSON-LD object for a sub-page. Google renders these as
 * the breadcrumb trail in search results, which lifts CTR and clarifies site
 * structure. Pass the trail from the top level down, e.g.:
 *   breadcrumbJsonLd([{ name: "Insights", path: "/insights" }, { name: post.title, path: `/insights/${slug}` }])
 * "Home" is prepended automatically.
 */
export function breadcrumbJsonLd(
  trail: { name: string; path: string }[],
  opts: { locale: string; homeLabel: string }
) {
  const prefix = opts.locale === "nl" ? "/nl" : "";
  const items = [{ name: opts.homeLabel, path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${prefix}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
