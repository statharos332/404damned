import type { Service } from "@/data/services";
import { servicesNl } from "@/data/services.nl";

const BASE_URL = "https://www.404damned.com";

/**
 * Service detail pages get a genuinely different URL structure per locale
 * (/services/ecommerce vs /nl/diensten/webshop-laten-maken, not just a /nl
 * prefix) so Dutch URLs carry the keyword Dutch searchers actually type.
 * The mapping is handled by rewrites/redirects in next.config.ts — these
 * helpers just build the matching href/alternates consistently wherever a
 * service page is linked to or declares its own metadata.
 */
export function serviceUrlSlug(service: Service, locale: string): string {
  return locale === "nl" ? service.urlSlug ?? service.slug : service.slug;
}

/** Locale-correct relative href to a service page, already including the
 *  /nl prefix where needed — use directly as a (plain, non-i18n) Link href. */
export function serviceHref(service: Service, locale: string): string {
  return locale === "nl"
    ? `/nl/diensten/${serviceUrlSlug(service, locale)}`
    : `/services/${service.slug}`;
}

/**
 * en/nl/x-default alternates.languages map for a service page. Resolves the
 * NL urlSlug itself (via the shared canonical `slug`) rather than trusting
 * the passed-in `service` to carry it — the EN dataset never sets urlSlug,
 * so building this from whichever locale's object happened to be in hand
 * silently produced the wrong (untranslated) NL alternate.
 */
export function serviceLanguageAlternates(service: Service) {
  const nlService = servicesNl.find((s) => s.slug === service.slug) ?? service;
  return {
    en: `${BASE_URL}/services/${service.slug}`,
    nl: `${BASE_URL}/nl/diensten/${nlService.urlSlug ?? nlService.slug}`,
    "x-default": `${BASE_URL}/services/${service.slug}`,
  };
}

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
