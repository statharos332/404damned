import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CoverMedia } from "@/components/ui/CoverMedia";
import { projects, getProject } from "@/data/projects";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

// Pre-render every case study at build time (fast + SEO-friendly)
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };

  const title = `${project.client} — ${project.title}`;
  const description = project.summary;
  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${title} | 404 DAMNED`,
      description,
      url: `https://404damned.nl/work/${project.slug}`,
      images: [{ url: project.cover, width: 1600, height: 1000, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | 404 DAMNED`,
      description,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  // Structured data → eligible for rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    about: project.client,
    dateCreated: project.year,
    creator: {
      "@type": "Organization",
      name: "404 DAMNED",
      url: "https://404damned.nl",
    },
    keywords: [...project.services, ...project.stack].join(", "),
    image: `https://404damned.nl${project.cover}`,
    description: project.summary,
  };

  // index of current project for prev/next
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <header className="max-w-[1100px] mx-auto px-6 pt-40 pb-12">
        <Link
          href="/work"
          className="text-xs font-mono text-gray-500 hover:text-[#D6001C] transition-colors"
        >
          &larr; All Work
        </Link>
        <div className="flex items-center gap-3 text-xs font-mono text-[#D6001C]/70 mt-8 mb-4">
          <span>{project.client}</span>
          <span className="w-1 h-1 rounded-full bg-[#D6001C]/40" />
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-[#D6001C]/40" />
          <span>{project.year}</span>
        </div>
        <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight text-[clamp(2.4rem,6vw,5rem)] text-white">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-400 leading-relaxed">
          {project.summary}
        </p>
      </header>

      {/* Cover */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0c0c]">
          <CoverMedia
            src={project.cover}
            alt={`${project.client} — ${project.title}`}
            poster={project.coverPoster}
            priority
            sizes="(max-width: 1100px) 100vw, 1100px"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Results bar */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="grid grid-cols-3 gap-6 border-y border-white/10 py-10">
          {project.results.map((r) => (
            <div key={r.label} className="text-center">
              <div className="text-3xl md:text-5xl font-black text-[#D6001C]">
                {r.value}
              </div>
              <div className="mt-2 text-[0.65rem] md:text-xs tracking-wider uppercase text-gray-500">
                {r.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative */}
      <article className="max-w-[760px] mx-auto px-6 pb-12 space-y-12">
        {[
          { h: "The Challenge", b: project.challenge },
          { h: "Our Approach", b: project.approach },
          { h: "The Outcome", b: project.outcome },
        ].map((block) => (
          <div key={block.h}>
            <h2 className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4">
              {block.h}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">{block.b}</p>
          </div>
        ))}

        {/* meta: services + stack */}
        <div className="grid sm:grid-cols-2 gap-8 border-t border-white/10 pt-10">
          <div>
            <h3 className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-3">
              Services
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="text-xs border border-[#D6001C]/20 text-[#D6001C]/80 px-3 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-3">
              Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs border border-white/10 text-gray-300 px-3 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.15em] uppercase text-white hover:text-[#D6001C] transition-colors"
          >
            Visit Live Site <span className="text-[#D6001C]">&rarr;</span>
          </a>
        ) : null}
      </article>

      {/* Gallery */}
      {project.gallery?.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-6 py-12 space-y-6">
          {project.gallery.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[16/9] overflow-hidden bg-[#0c0c0c]"
            >
              <Image
                src={src}
                alt={`${project.client} screenshot ${i + 1}`}
                fill
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="object-cover"
              />
            </div>
          ))}
        </section>
      )}

      {/* Next project */}
      <section className="max-w-[1100px] mx-auto px-6 py-24 border-t border-white/10">
        <p className="text-xs text-gray-500 tracking-[0.3em] uppercase font-mono mb-4">
          Next Project
        </p>
        <Link href={`/work/${next.slug}`} className="group block">
          <h2 className="font-display font-black uppercase text-3xl md:text-5xl text-white group-hover:text-[#D6001C] transition-colors tracking-tight">
            {next.title}
          </h2>
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:gap-4 transition-all">
            View <span className="text-[#D6001C]">&rarr;</span>
          </span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
