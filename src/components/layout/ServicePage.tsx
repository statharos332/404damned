import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getService, type Service } from "@/data/services";

const BASE = "https://www.404damned.com";

/**
 * Shared renderer for the SEO service landing pages. Carries the visible,
 * useful content Google needs plus Service + FAQPage + BreadcrumbList JSON-LD.
 */
export function ServicePage({ service }: { service: Service }) {
  const url = `${BASE}/services/${service.slug}`;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url,
    provider: { "@id": `${BASE}/#organization` },
    areaServed: [
      { "@type": "City", name: "Amsterdam" },
      { "@type": "Country", name: "Netherlands" },
    ],
    audience: { "@type": "BusinessAudience", name: "Businesses in the Netherlands" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ]);

  const related = service.related
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));

  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />
      {[serviceLd, faqLd, breadcrumbs].map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      {/* Hero */}
      <header className="max-w-[900px] mx-auto px-6 pt-40 pb-14">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D6001C] mb-4">
          [ {service.name} · Amsterdam ]
        </p>
        <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight text-[clamp(2.4rem,6vw,4.75rem)] text-white text-balance">
          {service.h1}
        </h1>
        <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-2xl">
          {service.intro}
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/#contact"
            className="bg-[#D6001C] hover:bg-[#FF1A35] text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5"
          >
            Book a Strategy Call &rarr;
          </Link>
          <Link
            href="/work"
            className="border border-white/15 hover:border-white/40 text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors"
          >
            See the Work
          </Link>
        </div>
      </header>

      {/* Sections */}
      <section className="max-w-[900px] mx-auto px-6 pb-4">
        {service.sections.map((s) => (
          <div key={s.heading} className="border-t border-white/10 py-10">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-4">
              {s.heading}
            </h2>
            <p className="text-gray-300 leading-relaxed max-w-2xl">{s.body}</p>
            {s.bullets && (
              <ul className="mt-5 space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-gray-300 leading-relaxed">
                    <span className="text-[#D6001C] font-mono shrink-0">/</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* Deliverables + stack */}
      <section className="max-w-[900px] mx-auto px-6 py-10 border-t border-white/10 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E5FF] mb-6">
            What&apos;s included
          </h2>
          <ul className="space-y-3">
            {service.deliverables.map((d) => (
              <li key={d} className="flex gap-3 text-gray-300 leading-relaxed">
                <span className="text-[#D6001C] font-mono shrink-0">/</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E5FF] mb-6">
            Stack &amp; tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.stack.map((t) => (
              <span
                key={t}
                className="font-mono text-xs uppercase tracking-wider text-gray-300 border border-white/10 px-3 py-2"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[900px] mx-auto px-6 py-10 border-t border-white/10">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-8">
          Frequently asked questions
        </h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {service.faqs.map((f) => (
            <div key={f.q} className="py-7">
              <h3 className="text-lg font-bold text-white mb-3">{f.q}</h3>
              <p className="text-gray-400 leading-relaxed max-w-2xl">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="max-w-[900px] mx-auto px-6 py-10 border-t border-white/10">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">
            Related services
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/services/${r.slug}`}
                className="group border border-white/10 hover:border-[#D6001C] p-6 transition-colors"
              >
                <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#D6001C] transition-colors">
                  {r.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {r.tagline}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-[900px] mx-auto px-6 py-20">
        <div className="border-t border-white/10 pt-14 text-center">
          <h2 className="font-display font-black uppercase text-3xl md:text-5xl text-white tracking-tight text-balance">
            Let&apos;s build your{" "}
            <span className="text-[#D6001C]">digital weapon.</span>
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
