import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { COMPANY, type LegalDoc } from "@/data/legal";

/**
 * Shared renderer for the legal pages (privacy / terms / cookies).
 * Matches the studio's dark, editorial look used across insights.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <Navigation />

      <header className="max-w-[820px] mx-auto px-6 pt-40 pb-14">
        <p className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4">
          {doc.kicker}
        </p>
        <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight text-[clamp(2.4rem,6vw,4.75rem)] text-white">
          {doc.title}
          <br />
          <span className="text-[#D6001C]">{doc.titleAccent}</span>
        </h1>
        <p className="mt-6 text-lg text-gray-400 leading-relaxed">{doc.intro}</p>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-gray-600">
          Last updated: {COMPANY.updated}
        </p>
      </header>

      {/* Section index */}
      <nav className="max-w-[820px] mx-auto px-6 pb-12">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 border-y border-white/10 py-5">
          {doc.sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="font-mono text-xs text-gray-500 hover:text-[#D6001C] transition-colors"
              >
                {s.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <article className="max-w-[820px] mx-auto px-6 pb-24">
        {doc.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-32 border-b border-white/10 py-10 first:pt-0"
          >
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-5">
              {section.heading}
            </h2>
            <div className="space-y-5">
              {section.blocks.map((block, i) => {
                if (block.type === "sub") {
                  return (
                    <h3
                      key={i}
                      className="text-lg font-bold text-white pt-2"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={i} className="space-y-3">
                      {block.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-gray-300 leading-relaxed"
                        >
                          <span className="text-[#D6001C] font-mono shrink-0">
                            /
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-gray-300 leading-relaxed"
                  >
                    {block.text}
                  </p>
                );
              })}
            </div>
          </section>
        ))}

        {/* Contact / other policies */}
        <div className="mt-12">
          <p className="text-gray-400 mb-5">
            Questions about this document? Reach us at{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-[#D6001C] hover:text-[#FF1A35] transition-colors"
            >
              {COMPANY.email}
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest">
            <Link
              href="/privacy-policy"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookie-policy"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
