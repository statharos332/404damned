import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

/**
 * Branded 404 — the signature moment for a studio literally called
 * "404 DAMNED". Framer-free (pure CSS glitch) so it stays instant.
 */
export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="relative bg-[#050505] min-h-screen flex flex-col overflow-hidden">
      {/* Old-TV analog noise: snow + scanlines + rolling sync bar */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="tv-static absolute inset-0" />
        <div className="tv-scanlines absolute inset-0" />
        <div className="tv-rollbar absolute inset-x-0 top-0" />
      </div>

      <Navigation />

      <section className="tv-flicker relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-40">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#D6001C] mb-8">
          {t("eyebrow")}
        </p>

        <h1
          className="glitch-404 font-display font-black uppercase leading-none tracking-tighter text-[clamp(6rem,26vw,20rem)]"
          data-text="404"
        >
          404
        </h1>

        <h2 className="mt-4 font-display font-black uppercase tracking-tight text-2xl sm:text-4xl text-white">
          {t("headingStart")} <span className="text-[#D6001C]">{t("headingHighlight")}</span>
        </h2>

        <p className="mt-6 max-w-md text-gray-400 leading-relaxed">
          {t("body")}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto text-center bg-[#D6001C] hover:bg-[#FF1A35] text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5"
          >
            {t("backToBase")} &rarr;
          </Link>
          <Link
            href="/work"
            className="w-full sm:w-auto text-center border border-white/15 hover:border-white/40 text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors"
          >
            {t("seeWork")}
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest">
          {[
            { label: t("insights"), href: "/insights" },
            { label: t("services"), href: "/#services" },
            { label: t("contact"), href: "/#contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-500 hover:text-[#D6001C] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
