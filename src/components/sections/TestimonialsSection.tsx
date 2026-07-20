"use client";

import { useState, useRef } from "react";
import { m, AnimatePresence, useInView } from "framer-motion";

// Not wired into any page yet. Fill with real client quotes (name, title,
// company, a verifiable result) before rendering this anywhere — no
// placeholder/fictional testimonials.
const testimonials: {
  quote: string;
  name: string;
  title: string;
  company: string;
  result: string;
}[] = [];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto" ref={ref}>
        <div className="mb-20">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4"
          >
            — Client Victories
          </m.div>
          <m.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase"
          >
            What They
            <br />
            <span className="text-stroke">Actually Say.</span>
          </m.h2>
        </div>

        {/* Testimonial display */}
        <div className="relative border border-white/8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#D6001C]/60 via-transparent to-transparent" />

          <AnimatePresence mode="wait">
            <m.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 md:p-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
                <div>
                  {/* Quote mark */}
                  <div className="text-8xl text-[#D6001C]/20 font-serif leading-none mb-4">&ldquo;</div>
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-gray-200 mb-10">
                    {testimonials[active].quote}
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#D6001C]/10 border border-[#D6001C]/20 flex items-center justify-center">
                      <span className="text-[#D6001C] font-bold text-sm">{testimonials[active].company}</span>
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonials[active].name}</div>
                      <div className="text-sm text-gray-500">{testimonials[active].title}</div>
                    </div>
                  </div>
                </div>

                {/* Result card */}
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="w-full max-w-[240px] border border-[#D6001C]/20 bg-[#D6001C]/5 p-8 text-center">
                    <div className="text-xs text-[#D6001C]/60 tracking-widest uppercase mb-4">Result</div>
                    <div className="text-4xl font-black text-[#D6001C]">
                      {testimonials[active].result}
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="border-t border-white/5 px-10 md:px-16 py-6 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-8 h-px transition-all duration-300 ${
                    i === active ? "bg-[#D6001C] w-12" : "bg-white/20 hover:bg-white/40"
                  }`}
                  data-cursor-hover
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 border border-white/10 hover:border-[#D6001C]/40 flex items-center justify-center transition-all duration-300 group"
                data-cursor-hover
              >
                <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-white/10 hover:border-[#D6001C]/40 flex items-center justify-center transition-all duration-300 group"
                data-cursor-hover
              >
                <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
