import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { breadcrumbJsonLd } from "@/lib/seo";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services — Digital Agency in Amsterdam",
  description:
    "Web development, e-commerce, AI automation, branding, SEO and social media — the full arsenal of a premium digital agency in Amsterdam. See what we build.",
  keywords: [
    "digital agency Amsterdam",
    "digital agency services Amsterdam",
    "web design agency Netherlands",
    "creative agency Amsterdam",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — 404 DAMNED, Digital Agency Amsterdam",
    description:
      "Web development, e-commerce, AI automation, branding, SEO and social media from a premium Amsterdam digital agency.",
    url: "https://www.404damned.com/services",
  },
};

export default function ServicesHub() {
  const breadcrumbs = breadcrumbJsonLd([{ name: "Services", path: "/services" }]);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `https://www.404damned.com/services/${s.slug}`,
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
          [ Services ]
        </p>
        <h1 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.6rem,7vw,6rem)] text-white text-balance">
          One agency.
          <br />
          <span className="text-[#D6001C]">The whole arsenal.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-gray-400 leading-relaxed">
          404 DAMNED is a premium digital agency in Amsterdam. From custom web
          development and e-commerce to AI automation, branding, SEO and social —
          everything an ambitious business needs to dominate its market, built by
          one team that actually talks to each other.
        </p>
      </header>

      <section className="max-w-[1100px] mx-auto px-6 pb-32">
        <div className="border-t border-white/10">
          {services.map((s, i) => (
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
                Explore <span className="text-[#D6001C]">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
