import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/data/posts";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Insights — Web, E-Commerce & AI",
  description:
    "Practical writing on web performance, headless e-commerce, AI automation and growth from 404 DAMNED, a premium digital studio in Amsterdam.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights — 404 DAMNED",
    description:
      "Practical writing on web performance, e-commerce and AI automation from an Amsterdam digital studio.",
    url: "https://www.404damned.com/insights",
  },
};

export default function InsightsPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />

      <header className="max-w-[1100px] mx-auto px-6 pt-40 pb-16">
        <p className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4">
          [ Insights ]
        </p>
        <h1 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.8rem,7vw,6rem)] text-white">
          Field notes
          <br />
          <span className="text-[#D6001C]">from the build.</span>
        </h1>
        <p className="mt-6 max-w-xl text-gray-400 leading-relaxed">
          No fluff. Practical thinking on performance, e-commerce, AI and
          everything we use to build digital weapons that actually convert.
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
                  <span className="text-gray-600">{p.readMins} min read</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white group-hover:text-[#D6001C] transition-colors">
                  {p.title}
                </h2>
                <p className="mt-3 text-gray-400 leading-relaxed max-w-2xl">
                  {p.excerpt}
                </p>
              </div>
              <span className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white group-hover:gap-4 transition-all whitespace-nowrap">
                Read <span className="text-[#D6001C]">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
