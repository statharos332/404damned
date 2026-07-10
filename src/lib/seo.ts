const BASE_URL = "https://www.404damned.com";

/**
 * Build a BreadcrumbList JSON-LD object for a sub-page. Google renders these as
 * the breadcrumb trail in search results, which lifts CTR and clarifies site
 * structure. Pass the trail from the top level down, e.g.:
 *   breadcrumbJsonLd([{ name: "Insights", path: "/insights" }, { name: post.title, path: `/insights/${slug}` }])
 * "Home" is prepended automatically.
 */
export function breadcrumbJsonLd(
  trail: { name: string; path: string }[]
) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
