"use client";

import Link from "next/link";
import { CoverMedia } from "@/components/ui/CoverMedia";
import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { getFeaturedProjects } from "@/data/projects";

export function WorkPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const featured = getFeaturedProjects();

  return (
    <section id="work" className="bg-[#050505] py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6" ref={ref}>
        {/* heading */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4">
              [ Recent kills ]
            </p>
            <h2 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.4rem,5.5vw,5rem)] text-white">
              Proof in the
              <br />
              <span className="text-[#D6001C]">wreckage.</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white hover:gap-4 transition-all border-b border-[#D6001C] pb-2 font-mono"
          >
            See all work <span className="text-[#D6001C]">&rarr;</span>
          </Link>
        </div>

        {/* featured grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <m.div
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link href={`/work/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0c0c0c]">
                  <CoverMedia
                    src={p.cover}
                    alt={`${p.client} — ${p.title}`}
                    poster={p.coverPoster}
                    sizes="(max-width: 768px) 100vw, 440px"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-xs font-mono text-white/70 bg-black/50 backdrop-blur px-3 py-1">
                    {p.category}
                  </span>
                </div>
                <div className="mt-5">
                  <div className="text-xs font-mono text-[#D6001C]/70 mb-2">
                    {p.client}
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-white group-hover:text-[#D6001C] transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-2">
                    {p.summary}
                  </p>
                  {/* top result */}
                  {p.results[0] && (
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">
                        {p.results[0].value}
                      </span>
                      <span className="text-[0.65rem] tracking-wider uppercase text-gray-500">
                        {p.results[0].label}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
