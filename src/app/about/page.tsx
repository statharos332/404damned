import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { breadcrumbJsonLd } from "@/lib/seo";
import { team } from "@/data/team";

const BASE = "https://www.404damned.com";

export const metadata: Metadata = {
  title: "About — The Team Behind 404 DAMNED",
  description:
    "404 DAMNED is three people, not a faceless agency: Nick Grigoriadis, Stathis Papounidis and Tatiana Petsiou. Real names, real LinkedIn profiles, real work.",
  keywords: [
    "404 DAMNED team",
    "digital agency Amsterdam founders",
    "who is 404 damned",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — The Team Behind 404 DAMNED",
    description:
      "404 DAMNED is three people, not a faceless agency. Meet the team.",
    url: `${BASE}/about`,
  },
};

export default function AboutPage() {
  const breadcrumbs = breadcrumbJsonLd([{ name: "About", path: "/about" }]);

  const peopleLd = team.map((p) => ({
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
          [ About ]
        </p>
        <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight text-[clamp(2.4rem,6vw,4.75rem)] text-white text-balance">
          This is who you&apos;re
          <br />
          <span className="text-[#D6001C]">actually hiring.</span>
        </h1>
        <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
          404 DAMNED isn&apos;t a faceless agency with a rotating cast of
          account managers. It&apos;s three people — Nick, Stathis and Tatiana
          — who work on your project directly. No hand-offs, no anonymous
          &ldquo;team&rdquo;.
        </p>
      </header>

      {/* Founding story */}
      <section className="max-w-[900px] mx-auto px-6 pb-4">
        <div className="border-t border-white/10 py-10">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-4">
            The name is newer than the work
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-2xl">
            404 DAMNED as a studio is the result of experience that goes back
            to 2017 — years of freelance work and time inside other companies
            and agencies, long before this name existed. Nick brought company
            and project management, Stathis brought web development and
            e-commerce, and Tatiana brought web development and digital
            marketing. At some point the three of us realised we were better
            off building under one name than separately, so we did.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[900px] mx-auto px-6 py-10 border-t border-white/10">
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E5FF] mb-8">
          The team
        </h2>
        <div className="grid sm:grid-cols-1 gap-6">
          {team.map((p) => {
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
            Talk to the people
            <br />
            <span className="text-[#D6001C]">who&apos;ll do the work.</span>
          </h2>
          <a
            href="/#contact"
            className="mt-8 inline-block bg-[#D6001C] hover:bg-[#FF1A35] text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5"
          >
            Book a Strategy Call &rarr;
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
