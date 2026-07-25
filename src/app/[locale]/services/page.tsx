import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { breadcrumbJsonLd, localizedPath, languageAlternates } from "@/lib/seo";
import { services } from "@/data/services";
import { servicesNl } from "@/data/services.nl";
import { pickLocale } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesHub" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: t.raw("keywords") as string[],
    alternates: {
      canonical: localizedPath("/services", locale),
      languages: languageAlternates("/services"),
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `https://www.404damned.com${localizedPath("/services", locale)}`,
    },
  };
}

export default async function ServicesHub() {
  const locale = await getLocale();
  const t = await getTranslations("ServicesHub");
  const localizedServices = pickLocale(services, servicesNl, locale);
  const breadcrumbs = breadcrumbJsonLd(
    [{ name: t("breadcrumb"), path: "/services" }],
    { locale, homeLabel: "Home" }
  );
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: localizedServices.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `https://www.404damned.com${localizedPath(`/services/${s.slug}`, locale)}`,
    })),
  };

  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      {[breadcrumbs, itemList].map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      <header className="max-w-[1100px] mx-auto px-6 pt-40 pb-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D6001C] mb-4">
          {t("kicker")}
        </p>
        <h1 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.6rem,7vw,6rem)] text-white text-balance">
          {t("heading1")}
          <br />
          <span className="text-[#D6001C]">{t("heading2")}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-gray-400 leading-relaxed">
          {t("intro")}
        </p>
      </header>

      <section className="max-w-[1100px] mx-auto px-6 pb-32">
        <div className="border-t border-white/10">
          {localizedServices.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group grid md:grid-cols-[auto_1fr_auto] gap-4 md:gap-10 items-baseline border-b border-white/10 py-10"
            >
              <span className="font-mono text-xs text-gray-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-[#D6001C] transition-colors">
                  {s.name}
                </h2>
                <p className="mt-2 text-gray-400 leading-relaxed max-w-2xl">
                  {s.tagline}
                </p>
              </div>
              <span className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white group-hover:gap-4 transition-all whitespace-nowrap">
                {t("explore")} <span className="text-[#D6001C]">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
