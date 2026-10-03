"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useRouter as useNextRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";
import { servicesNl } from "@/data/services.nl";

const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Service pages carry a genuinely different URL per locale
 * (/services/ecommerce vs /nl/diensten/webshop-laten-maken — see
 * serviceHref() in lib/seo), so the generic "swap the locale, keep the
 * same pathname" switch below can't translate them. Resolve explicitly
 * when the current path is a services/diensten page.
 */
function resolveServiceSwitch(fromLocale: string, pathname: string) {
  if (fromLocale === "nl" && (pathname === "/diensten" || pathname.startsWith("/diensten/"))) {
    if (pathname === "/diensten") return { en: "/services", nl: "/diensten" };
    const urlSlug = pathname.slice("/diensten/".length);
    const service = servicesNl.find((s) => (s.urlSlug ?? s.slug) === urlSlug);
    return service ? { en: `/services/${service.slug}`, nl: pathname } : null;
  }
  if (fromLocale === "en" && (pathname === "/services" || pathname.startsWith("/services/"))) {
    if (pathname === "/services") return { en: "/services", nl: "/diensten" };
    const slug = pathname.slice("/services/".length);
    const nlService = servicesNl.find((s) => s.slug === slug);
    const known = services.some((s) => s.slug === slug);
    return known ? { en: pathname, nl: `/diensten/${nlService?.urlSlug ?? slug}` } : null;
  }
  return null;
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const nextRouter = useNextRouter();
  const pathname = usePathname();

  function switchTo(nextLocale: "en" | "nl") {
    if (nextLocale === locale) return;

    const target = resolveServiceSwitch(locale, pathname);
    if (target) {
      document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000`;
      nextRouter.push(nextLocale === "nl" ? `/nl${target.nl}` : target.en);
      return;
    }

    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center border border-white/15 shrink-0",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {(["en", "nl"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          aria-current={locale === code ? "true" : undefined}
          className={cn(
            "px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-colors duration-300",
            locale === code
              ? "bg-[#D6001C] text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
