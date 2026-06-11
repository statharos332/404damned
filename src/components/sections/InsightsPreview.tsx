"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { posts } from "@/data/posts";

export function InsightsPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const latest = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

  return (
    <section className="bg-[#050505] py-28 md:py-36 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6" ref={ref}>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4">
              [ Insights ]
            </p>
            <h2 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.2rem,5vw,4.5rem)] text-white">
              Field notes.
            </h2>
          </div>
          <Link
            href="/insights"
            className="font-mono inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white hover:gap-4 transition-all border-b border-[#D6001C] pb-2"
          >
            All insights <span className="text-[#D6001C]">&rarr;</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {latest.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#050505]"
            >
              <Link
                href={`/insights/${p.slug}`}
                className="group block p-8 md:p-10 hover:bg-[#0a0a0a] transition-colors h-full"
              >
                <div className="flex items-center gap-3 mb-4 font-mono text-[0.6rem] uppercase tracking-widest">
                  <span className="text-[#00E5FF]">{p.category}</span>
                  <span className="text-gray-600">{p.readMins} min</span>
                </div>
                <h3 className="text-xl font-black tracking-tight text-white group-hover:text-[#D6001C] transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed line-clamp-3">
                  {p.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                  Read <span className="text-[#D6001C]">&rarr;</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
