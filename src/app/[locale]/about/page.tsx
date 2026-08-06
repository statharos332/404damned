import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { breadcrumbJsonLd, localizedPath, languageAlternates } from "@/lib/seo";
import { team } from "@/data/team";
import { teamNl } from "@/data/team.nl";
import { pickLocale } from "@/lib/utils";

const BASE = "https://www.404damned.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: t.raw("keywords") as string[],
    alternates: {
      canonical: localizedPath("/about", locale),
      languages: languageAlternates("/about"),
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("ogDescription"),
      url: `${BASE}${localizedPath("/about", locale)}`,
    },
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getTranslations("About");
  const localizedTeam = pickLocale(team, teamNl, locale);
  const breadcrumbs = breadcrumbJsonLd(
    [{ name: t("breadcrumb"), path: "/about" }],
    { locale, homeLabel: "Home" }
  );

  const peopleLd = localizedTeam
    .filter((p) => !p.comingSoon)
    .map((p) => ({
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${BASE}/about#${p.slug}`,
      name: p.name,
      jobTitle: p.role,
      worksFor: { "@id": `${BASE}/#organization` },
      url: `${BASE}/about#${p.slug}`,
      sameAs: [p.linkedin],
    }));

  const aboutLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE}/about`,
    url: `${BASE}/about`,
    name: "About 404 DAMNED",
    mainEntity: { "@id": `${BASE}/#organization` },
  };

  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      {[breadcrumbs, aboutLd, ...peopleLd].map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      {/* Hero */}
      <header className="max-w-[900px] mx-auto px-6 pt-40 pb-14">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D6001C] mb-4">
          {t("kicker")}
        </p>
        <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight text-[clamp(2.4rem,6vw,4.75rem)] text-white text-balance">
          {t("heading1")}
          <br />
          <span className="text-[#D6001C]">{t("heading2")}</span>
        </h1>
        <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
          {t("intro")}
        </p>
      </header>

      {/* Founding story */}
      <section className="max-w-[900px] mx-auto px-6 pb-4">
        <div className="border-t border-white/10 py-10">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-4">
            {t("storyHeading")}
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-2xl">
            {t("storyBody")}
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[900px] mx-auto px-6 py-10 border-t border-white/10">
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E5FF] mb-8">
          {t("teamHeading")}
        </h2>
        <div className="grid sm:grid-cols-1 gap-6">
          {localizedTeam.map((p) => {
            const initials = p.name
              .split(" ")
              .map((n) => n[0])
              .join("");
            return (
              <div
                key={p.slug}
                id={p.slug}
                className="scroll-mt-32 border border-white/10 p-8 flex flex-col sm:flex-row gap-6 sm:items-start"
              >
                <div className="w-16 h-16 shrink-0 bg-[#D6001C]/10 border border-[#D6001C]/30 flex items-center justify-center overflow-hidden">
                  {p.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[#D6001C] font-bold text-lg">
                      {initials}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-xl font-black text-white tracking-tight">
                      {p.name}
                    </h3>
                    {p.comingSoon && (
                      <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[#00E5FF] border border-[#00E5FF]/30 px-2 py-0.5">
                        {t("comingSoon")}
                      </span>
                    )}
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-widest text-gray-500 hover:text-[#D6001C] transition-colors"
                    >
                      LinkedIn &#8599;
                    </a>
                  </div>
                  <p className="mt-1 text-sm text-[#D6001C] font-mono uppercase tracking-wider">
                    {p.role}
                  </p>
                  <p className="mt-4 text-gray-300 leading-relaxed max-w-xl">
                    {p.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[900px] mx-auto px-6 py-20">
        <div className="border-t border-white/10 pt-14 text-center">
          <h2 className="font-display font-black uppercase text-3xl md:text-5xl text-white tracking-tight text-balance">
            {t("ctaHeading1")}
            <br />
            <span className="text-[#D6001C]">{t("ctaHeading2")}</span>
          </h2>
          <a
            href="/#contact"
            className="mt-8 inline-block bg-[#D6001C] hover:bg-[#FF1A35] text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5"
          >
            {t("ctaBookCall")} &rarr;
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
