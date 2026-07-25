import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WorkExplorer } from "@/components/sections/WorkExplorer";
import { breadcrumbJsonLd, localizedPath, languageAlternates } from "@/lib/seo";
import { projects } from "@/data/projects";
import { projectsNl } from "@/data/projects.nl";
import { pickLocale } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WorkHub" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: localizedPath("/work", locale),
      languages: languageAlternates("/work"),
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `https://www.404damned.com${localizedPath("/work", locale)}`,
    },
  };
}

export default async function WorkPage() {
  const locale = await getLocale();
  const t = await getTranslations("WorkHub");
  const localizedProjects = pickLocale(projects, projectsNl, locale);
  const breadcrumbs = breadcrumbJsonLd(
    [{ name: t("breadcrumb"), path: "/work" }],
    { locale, homeLabel: "Home" }
  );
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: localizedProjects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.client} — ${p.title}`,
      url: `https://www.404damned.com${localizedPath(`/work/${p.slug}`, locale)}`,
    })),
  };
  return (
    <main className="relative bg-[#050505] min-h-screen">
      {[breadcrumbs, itemList].map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <Navigation />

      {/* Header */}
      <header className="max-w-[1400px] mx-auto px-6 pt-40 pb-16">
        <p className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4">
          {t("kicker")}
        </p>
        <h1 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.8rem,7vw,6rem)] text-white">
          {t("heading1")}
          <br />
          <span className="text-[#D6001C]">{t("heading2")}</span>
        </h1>
        <p className="mt-6 max-w-xl text-gray-400 leading-relaxed">
          {t("intro")}
        </p>
      </header>

      {/* Interactive expandable project explorer with filters + media strips */}
      <WorkExplorer />

      {/* CTA */}
      <section className="max-w-[1500px] mx-auto px-6 pb-32">
        <div className="mt-28 text-center border-t border-white/10 pt-20">
          <h2 className="font-display font-black uppercase text-4xl md:text-6xl text-white tracking-tight">
            {t("ctaHeading")}
          </h2>
          <Link
            href="/#contact"
            className="mt-8 inline-block bg-[#D6001C] hover:bg-[#FF1A35] text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5"
          >
            {t("startConversation")} &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
