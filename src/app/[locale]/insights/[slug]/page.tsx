import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { posts, getPost, type RichText } from "@/data/posts";
import { postsNl, getPostNl } from "@/data/posts.nl";
import { getTeamMember } from "@/data/team";
import { getTeamMemberNl } from "@/data/team.nl";
import { pickLocale } from "@/lib/utils";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { breadcrumbJsonLd, localizedPath, languageAlternates } from "@/lib/seo";
import { routing } from "@/i18n/routing";

/** Render block text that may contain inline links. */
function renderRich(rt: RichText) {
  if (typeof rt === "string") return rt;
  return rt.map((seg, k) =>
    typeof seg === "string" ? (
      seg
    ) : (
      <a
        key={k}
        href={seg.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#D6001C] underline underline-offset-2 hover:text-[#FF1A35]"
      >
        {seg.text}
      </a>
    ),
  );
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = pickLocale(getPost(slug), getPostNl(slug), locale);
  if (!post) return { title: "Insights" };
  const path = `/insights/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: localizedPath(path, locale),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: `${post.title} | 404 DAMNED`,
      description: post.excerpt,
      url: `https://www.404damned.com${localizedPath(path, locale)}`,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("InsightsDetail");
  const post = pickLocale(getPost(slug), getPostNl(slug), locale);
  if (!post) notFound();
  const author = pickLocale(getTeamMember(post.authorSlug), getTeamMemberNl(post.authorSlug), locale);
  const localizedPosts = pickLocale(posts, postsNl, locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: author
      ? {
          "@type": "Person",
          "@id": `https://www.404damned.com/about#${author.slug}`,
          name: author.name,
          url: `https://www.404damned.com/about#${author.slug}`,
          sameAs: [author.linkedin],
        }
      : { "@type": "Organization", name: "404 DAMNED", url: "https://www.404damned.com" },
    publisher: {
      "@type": "Organization",
      name: "404 DAMNED",
      logo: { "@type": "ImageObject", url: "https://www.404damned.com/icon.svg" },
    },
    mainEntityOfPage: `https://www.404damned.com/insights/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  const idx = localizedPosts.findIndex((p) => p.slug === post.slug);
  const next = localizedPosts[(idx + 1) % localizedPosts.length];

  const breadcrumbs = breadcrumbJsonLd(
    [
      { name: t("breadcrumbInsights"), path: "/insights" },
      { name: post.title, path: `/insights/${post.slug}` },
    ],
    { locale, homeLabel: "Home" }
  );

  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <article className="max-w-[760px] mx-auto px-6 pt-40 pb-24">
        <Link
          href="/insights"
          className="font-mono text-xs text-gray-500 hover:text-[#D6001C] transition-colors"
        >
          &larr; {t("allInsights")}
        </Link>

        <div className="flex items-center gap-3 mt-8 mb-4 font-mono text-[0.65rem] uppercase tracking-widest">
          <span className="text-[#00E5FF]">{post.category}</span>
          <span className="text-gray-600">{t("minRead", { count: post.readMins })}</span>
          <span className="text-gray-600">
            {new Date(post.date).toLocaleDateString(locale === "nl" ? "nl-NL" : "en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <h1 className="font-display font-black uppercase leading-[0.95] tracking-tight text-[clamp(2.2rem,5vw,4rem)] text-white">
          {post.title}
        </h1>

        <p className="mt-6 text-xl text-gray-400 leading-relaxed">
          {post.excerpt}
        </p>

        {author && (
          <Link
            href={`/about#${author.slug}`}
            className="mt-8 inline-flex items-center gap-3 group"
          >
            <span className="w-9 h-9 shrink-0 bg-[#D6001C]/10 border border-[#D6001C]/30 flex items-center justify-center text-[#D6001C] font-bold text-xs">
              {author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest">
              <span className="text-gray-500">{t("writtenBy")} </span>
              <span className="text-white group-hover:text-[#D6001C] transition-colors">
                {author.name}
              </span>
            </span>
          </Link>
        )}

        <div className="mt-12 space-y-6">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="text-2xl md:text-3xl font-black tracking-tight text-white pt-6"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="space-y-3 pl-1">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-gray-300 leading-relaxed">
                      <span className="text-[#D6001C] font-mono shrink-0">/</span>
                      <span>{renderRich(item)}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-lg text-gray-300 leading-relaxed">
                {renderRich(block.text)}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="text-gray-400 mb-5">
            {t("ctaPrompt")}
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-[#D6001C] hover:bg-[#FF1A35] text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5"
          >
            {t("startProject")} &rarr;
          </Link>
        </div>
      </article>

      {/* Next post */}
      <section className="max-w-[760px] mx-auto px-6 pb-24 border-t border-white/10">
        <p className="mt-10 font-mono text-xs text-gray-600 uppercase tracking-widest mb-3">
          {t("nextRead")}
        </p>
        <Link href={`/insights/${next.slug}`} className="group block">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white group-hover:text-[#D6001C] transition-colors">
            {next.title}
          </h2>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
