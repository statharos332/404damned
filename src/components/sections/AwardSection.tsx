"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { m, useInView } from "framer-motion";

const CSSDA_URL = "https://www.cssdesignawards.com/sites/404-damned/50030";
const BADGES = [
  { src: "/badges/cssda-best-ui.svg", label: "Best UI" },
  { src: "/badges/cssda-best-ux.svg", label: "Best UX" },
  { src: "/badges/cssda-best-innovation.svg", label: "Best Innovation" },
];

/**
 * A real, verified award (CSSDA Special Kudos) — given hero-level visual
 * weight on purpose. This isn't a generic "as seen in" strip; it's the one
 * external, independent signal on the whole site that judges an outsider
 * would trust, so it gets a dedicated section instead of a small tile.
 */
export function AwardSection() {
  const t = useTranslations("Award");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-[#050505] py-28 md:py-36 border-t border-white/10 overflow-hidden">
      {/* faint ambient glow so the section reads as a moment, not a list item */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] rounded-full bg-[#00E5FF]/[0.06] blur-[140px]"
      />

      <div className="relative max-w-[1400px] mx-auto px-6" ref={ref}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-16">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-xs text-[#00E5FF] tracking-[0.3em] uppercase font-mono mb-6">
              {t("kicker")}
            </p>
            <h2 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.8rem,6vw,6rem)] text-white text-balance">
              {t("heading1")}
              <br />
              <span className="text-[#D6001C]">{t("heading2")}</span>
            </h2>
            <p className="mt-8 text-gray-400 leading-relaxed max-w-lg">
              {t("body")}
            </p>
            <a
              href={CSSDA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white hover:gap-4 transition-all border-b border-[#D6001C] pb-2 font-mono"
            >
              {t("linkLabel")}{" "}
              <span className="text-[#D6001C] transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </m.div>

          <div className="flex items-end gap-6 md:gap-10 shrink-0">
            {BADGES.map((b, i) => (
              <m.div
                key={b.src}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className="flex flex-col items-center gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size static badge SVG, not worth next/image overhead */}
                <img
                  src={b.src}
                  alt={`CSS Design Awards — ${b.label}, awarded`}
                  className="w-20 h-20 md:w-28 md:h-28"
                />
                <span className="text-[0.6rem] tracking-[0.15em] uppercase text-gray-500 font-mono text-center">
                  {b.label}
                </span>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
