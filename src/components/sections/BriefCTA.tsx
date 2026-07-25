"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useBooking } from "@/components/ui/BookingProvider";

export function BriefCTA() {
  const t = useTranslations("BriefCTA");
  const { openBooking } = useBooking();
  return (
    <section className="relative bg-[#050505] py-32 md:py-48 overflow-hidden border-t border-white/10 scanlines">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[50rem] h-[50rem] rounded-full bg-[#D6001C]/12 blur-[140px]" />
      </div>
      <div className="pointer-events-none absolute top-10 right-10 w-72 h-72 rounded-full bg-[#00E5FF]/12 blur-[100px]" />

      <div className="relative max-w-[1400px] mx-auto px-6 text-center">
        <div className="flex justify-center">
          <SectionLabel accent="red">{t("sectionLabel")}</SectionLabel>
        </div>

        <h2
          className="glitch mt-8 font-display font-black uppercase leading-[0.82] tracking-tight text-[clamp(3rem,11vw,10rem)] text-white"
          data-text={t("headline")}
        >
          {t("headline")}
        </h2>

        <p className="mt-8 max-w-md mx-auto text-gray-400 text-lg leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="#contact"
            className="group relative bg-[#D6001C] hover:bg-[#FF1A35] text-white px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-1"
          >
            {t("ctaBrief")}
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </Link>
          <button
            onClick={openBooking}
            className="border border-white/20 hover:border-[#00E5FF] hover:text-[#00E5FF] text-white px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase transition-all font-mono"
          >
            {t("ctaCall")}
          </button>
        </div>

        <p className="mt-10 font-mono text-xs text-gray-600">
          {t("footerLine")}
        </p>
      </div>
    </section>
  );
}
