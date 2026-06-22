import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts, getPost } from "@/data/posts";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Insights" };
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: `${post.title} | 404 DAMNED`,
      description: post.excerpt,
      url: `https://www.404damned.com/insights/${post.slug}`,
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "404 DAMNED", url: "https://www.404damned.com" },
    publisher: {
      "@type": "Organization",
      name: "404 DAMNED",
      logo: { "@type": "ImageObject", url: "https://www.404damned.com/icon.svg" },
    },
    mainEntityOfPage: `https://www.404damned.com/insights/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  const idx = posts.findIndex((p) => p.slug === post.slug);
  const next = posts[(idx + 1) % posts.length];

  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-[760px] mx-auto px-6 pt-40 pb-24">
        <Link
          href="/insights"
          className="font-mono text-xs text-gray-500 hover:text-[#D6001C] transition-colors"
        >
          &larr; All insights
        </Link>

        <div className="flex items-center gap-3 mt-8 mb-4 font-mono text-[0.65rem] uppercase tracking-widest">
          <span className="text-[#00E5FF]">{post.category}</span>
          <span className="text-gray-600">{post.readMins} min read</span>
          <span className="text-gray-600">
            {new Date(post.date).toLocaleDateString("en-GB", {
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
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-lg text-gray-300 leading-relaxed">
                {block.text}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="text-gray-400 mb-5">
            Got a project where this matters? Let&apos;s talk.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-[#D6001C] hover:bg-[#FF1A35] text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5"
          >
            Start a Project &rarr;
          </Link>
        </div>
      </article>

      {/* Next post */}
      <section className="max-w-[760px] mx-auto px-6 pb-24 border-t border-white/10">
        <p className="mt-10 font-mono text-xs text-gray-600 uppercase tracking-widest mb-3">
          Next read
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
