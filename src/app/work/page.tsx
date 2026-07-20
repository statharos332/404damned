import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WorkExplorer } from "@/components/sections/WorkExplorer";
import { breadcrumbJsonLd } from "@/lib/seo";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Case Studies — Web Development, E-Commerce & AI Work",
  description:
    "Real client work: a high-conversion booking platform, an AI-powered Etsy SEO engine, and more as projects wrap. See what 404 DAMNED actually builds.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Case Studies — 404 DAMNED",
    description:
      "Real client work from an Amsterdam studio: booking platforms, e-commerce and AI automation, not a pitch deck.",
    url: "https://www.404damned.com/work",
  },
};

export default function WorkPage() {
  const breadcrumbs = breadcrumbJsonLd([{ name: "Work", path: "/work" }]);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${p.client} — ${p.title}`,
      url: `https://www.404damned.com/work/${p.slug}`,
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
          Our Work
        </p>
        <h1 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.8rem,7vw,6rem)] text-white">
          Proof, not
          <br />
          <span className="text-[#D6001C]">promises.</span>
        </h1>
        <p className="mt-6 max-w-xl text-gray-400 leading-relaxed">
          Two builds so far, each solving a different problem: a
          high-conversion booking platform for a transfer service, and an AI
          engine that writes Etsy listings. More lands here as projects wrap.
        </p>
      </header>

      {/* Interactive expandable project explorer with filters + media strips */}
      <WorkExplorer />

      {/* CTA */}
      <section className="max-w-[1500px] mx-auto px-6 pb-32">
        <div className="mt-28 text-center border-t border-white/10 pt-20">
          <h2 className="font-display font-black uppercase text-4xl md:text-6xl text-white tracking-tight">
            Your project is next.
          </h2>
          <Link
            href="/#contact"
            className="mt-8 inline-block bg-[#D6001C] hover:bg-[#FF1A35] text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5"
          >
            Start a Conversation &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
