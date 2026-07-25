import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { posts } from "@/data/posts";
import { postsNl } from "@/data/posts.nl";
import { pickLocale } from "@/lib/utils";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { breadcrumbJsonLd, localizedPath, languageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "InsightsHub" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: localizedPath("/insights", locale),
      languages: languageAlternates("/insights"),
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `https://www.404damned.com${localizedPath("/insights", locale)}`,
    },
  };
}

export default async function InsightsPage() {
  const locale = await getLocale();
  const t = await getTranslations("InsightsHub");
  const localizedPosts = pickLocale(posts, postsNl, locale);
  const sorted = [...localizedPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const breadcrumbs = breadcrumbJsonLd(
    [{ name: t("breadcrumb"), path: "/insights" }],
    { locale, homeLabel: "Home" }
  );
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Navigation />

      <header className="max-w-[1100px] mx-auto px-6 pt-40 pb-16">
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

      <section className="max-w-[1100px] mx-auto px-6 pb-32">
        <div className="border-t border-white/10">
          {sorted.map((p, i) => (
            <Link
              key={p.slug}
              href={`/insights/${p.slug}`}
              className="group grid md:grid-cols-[auto_1fr_auto] gap-4 md:gap-10 items-baseline border-b border-white/10 py-10"
            >
              <span className="font-mono text-xs text-gray-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex items-center gap-3 mb-2 font-mono text-[0.65rem] uppercase tracking-widest">
                  <span className="text-[#00E5FF]">{p.category}</span>
                  <span className="text-gray-600">{t("minRead", { count: p.readMins })}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white group-hover:text-[#D6001C] transition-colors">
                  {p.title}
                </h2>
                <p className="mt-3 text-gray-400 leading-relaxed max-w-2xl">
                  {p.excerpt}
                </p>
              </div>
              <span className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white group-hover:gap-4 transition-all whitespace-nowrap">
                {t("read")} <span className="text-[#D6001C]">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
