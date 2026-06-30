"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

// 404 DAMNED's own operating principles — mysterious, weighty, ours.
const doctrine = [
  {
    n: "001",
    t: "Refuse the template",
    d: "A site that looks like everyone else's performs like everyone else's. We start from zero, every time.",
    accent: "red",
  },
  {
    n: "002",
    t: "Engineer the obsession",
    d: "Speed, motion, weight — tuned until a visitor can't look away. Attention is the only currency that converts.",
    accent: "electric",
  },
  {
    n: "003",
    t: "Ship weapons, not decor",
    d: "Pretty is the floor. Everything we build is aimed at a number: revenue, leads, dominance.",
    accent: "lime",
  },
  {
    n: "004",
    t: "Leave no survivors",
    d: "Your competitors are the benchmark. We build the thing that makes their site feel like a relic.",
    accent: "red",
  },
] as const;

export function VibeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-[#050505] py-28 md:py-40 overflow-hidden scanlines">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full bg-[#D6001C]/8 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[35rem] h-[35rem] rounded-full bg-[#00E5FF]/8 blur-[120px]" />

      <div className="relative max-w-[1400px] mx-auto px-6" ref={ref}>
        <SectionLabel accent="electric">The Doctrine</SectionLabel>
        <h2 className="mt-6 font-display font-black uppercase leading-[0.88] tracking-tight text-[clamp(2.6rem,6vw,6rem)] text-white max-w-4xl">
          Four rules.
          <br />
          <span className="text-stroke">No exceptions.</span>
        </h2>
        <p className="mt-6 max-w-lg text-gray-400 text-lg leading-relaxed font-mono text-sm">
          {"// how we operate when the lights go down in Amsterdam"}
        </p>

        <div className="mt-20 grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {doctrine.map((v, i) => {
            const dot =
              v.accent === "electric"
                ? "bg-[#00E5FF]"
                : v.accent === "lime"
                ? "bg-[#C6FF00]"
                : "bg-[#D6001C]";
            const hov =
              v.accent === "electric"
                ? "group-hover:text-[#00E5FF]"
                : v.accent === "lime"
                ? "group-hover:text-[#C6FF00]"
                : "group-hover:text-[#D6001C]";
            return (
              <m.div
                key={v.n}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-[#050505] p-10 md:p-14 hover:bg-[#0a0a0a] transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-gray-600 tracking-widest">
                    RULE_{v.n}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                </div>
                <h3 className={`text-2xl md:text-3xl font-black tracking-tight text-white transition-colors ${hov}`}>
                  {v.t}
                </h3>
                <p className="mt-4 text-gray-400 leading-relaxed">{v.d}</p>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
