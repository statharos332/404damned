"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function BriefCTA() {
  return (
    <section className="relative bg-[#050505] py-32 md:py-48 overflow-hidden border-t border-white/10 scanlines">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[50rem] h-[50rem] rounded-full bg-[#D6001C]/12 blur-[140px]" />
      </div>
      <div className="pointer-events-none absolute top-10 right-10 w-72 h-72 rounded-full bg-[#00E5FF]/12 blur-[100px]" />

      <div className="relative max-w-[1400px] mx-auto px-6 text-center">
        <div className="flex justify-center">
          <SectionLabel accent="red">Open a channel</SectionLabel>
        </div>

        <h2
          className="glitch mt-8 font-display font-black uppercase leading-[0.82] tracking-tight text-[clamp(3rem,11vw,10rem)] text-white"
          data-text="PICK A FIGHT"
        >
          PICK A FIGHT
        </h2>

        <p className="mt-8 max-w-md mx-auto text-gray-400 text-lg leading-relaxed">
          Tell us who you&apos;re up against. We&apos;ll build the thing that
          ends the argument.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="#contact"
            className="group relative bg-[#D6001C] hover:bg-[#FF1A35] text-white px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-1"
          >
            Start the Brief
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </Link>
          <Link
            href="#contact"
            className="border border-white/20 hover:border-[#00E5FF] hover:text-[#00E5FF] text-white px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase transition-all font-mono"
          >
            [ book_a_call ]
          </Link>
        </div>

        <p className="mt-10 font-mono text-xs text-gray-600">
          AMSTERDAM · 52.3676&deg; N, 4.9041&deg; E · EST. RESPONSE &lt; 24H
        </p>
      </div>
    </section>
  );
}
