"use client";

import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Replace with real names as you win them.
const clients = [
  "NOORD", "AMSTEL", "KANAAL", "DE PIJP", "JORDAAN",
  "WESTERPARK", "OUD-ZUID", "CENTRUM",
];

interface Recognition {
  org: string;
  label: string;
  count: string;
}

export function ClientsStrip() {
  const t = useTranslations("Clients");
  const recognition = t.raw("recognition") as Recognition[];
  const row = [...clients, ...clients];
  return (
    <section className="relative bg-[#050505] py-20 border-t border-white/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 mb-10">
        <SectionLabel accent="lime">{t("sectionLabel")}</SectionLabel>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex whitespace-nowrap items-center"
          style={{ animation: "marquee 28s linear infinite", width: "max-content" }}
        >
          {row.map((c, i) => (
            <span key={i} className="flex items-center">
              <span className="px-10 text-3xl md:text-5xl font-black tracking-tight text-white/25 hover:text-white transition-colors font-display uppercase">
                {c}
              </span>
              <span className="text-[#D6001C] font-mono">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-20">
        <p className="text-gray-400 max-w-xl leading-relaxed mb-10 font-mono text-sm">
          {t("metricNote")}
        </p>
        <div className="grid sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {recognition.map((a) => (
            <div key={a.org} className="bg-[#050505] p-8 group hover:bg-[#0a0a0a] transition-colors">
              <div className="text-4xl font-black text-[#00E5FF] font-mono">{a.count}</div>
              <div className="mt-2 font-bold text-white tracking-wide">{a.org}</div>
              <div className="text-sm text-gray-500">{a.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-600 font-mono">
          {t("recognitionNote")}
        </p>
      </div>
    </section>
  );
}
