"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WorkExplorer } from "@/components/sections/WorkExplorer";

/**
 * Homepage featured-work section: same expandable rows + media strips as
 * /work, but limited to featured projects and without the filter bar.
 */
export function WorkExplorerHome() {
  const t = useTranslations("WorkPreview");
  return (
    <section id="work" className="bg-[#050505] pt-28 md:pt-36">
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
          <div>
            <p className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4">
              {t("kicker")}
            </p>
            <h2 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.4rem,5.5vw,5rem)] text-white">
              {t("heading1")}
              <br />
              <span className="text-[#D6001C]">{t("heading2")}</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="font-mono inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white hover:gap-4 transition-all border-b border-[#D6001C] pb-2"
          >
            {t("seeAll")} <span className="text-[#D6001C]">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* expandable rows (featured only, no filter bar) */}
      <WorkExplorer featuredOnly showFilters={false} />
    </section>
  );
}
