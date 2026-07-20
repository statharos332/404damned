"use client";

import { useRef } from "react";
import { m, useInView, useScroll, useTransform } from "framer-motion";

const problems = [
  {
    agency: "Traditional agencies",
    problem: "Sell you a template, call it custom, then outsource the build.",
    solution: "Every project starts from a blank file — the same three people scope it, build it and ship it.",
  },
  {
    agency: "Cheap freelancers",
    problem: "Disappear the day the invoice clears.",
    solution: "We're still around for the redesign, the new feature, the thing that breaks two years from now.",
  },
  {
    agency: "Marketing agencies",
    problem: "Sell you a strategy deck, then outsource the actual build.",
    solution: "We build what we pitch — no hand-off to a dev shop you've never met.",
  },
  {
    agency: "Dev shops",
    problem: "Ship clean code with no opinion on whether it makes you money.",
    solution: "Every build decision gets weighed against one question: does this convert.",
  },
];

const boldStatements = [
  "If your website doesn't generate leads, it's a liability.",
  "Three people build this. Not fifteen you'll never meet.",
  "Templates are for brands that have given up.",
  "Growth is engineered. Not wished for.",
];

export function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section className="py-32 md:py-48 bg-[#080808] overflow-hidden">
      <div className="px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto" ref={ref}>
          {/* Header */}
          <div className="mb-20">
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4"
            >
              — Why We're Different
            </m.div>
            <m.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase"
            >
              The Agency
              <br />
              <span className="text-stroke">Industry is</span>
              <br />
              <span className="text-[#D6001C]">Broken.</span>
            </m.h2>
          </div>

          {/* Problem/Solution grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-24">
            {problems.map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.7 }}
                className="group border border-white/5 p-8 hover:border-[#D6001C]/20 transition-all duration-500"
              >
                <div className="text-xs text-gray-600 tracking-wider uppercase mb-4 font-mono">
                  {item.agency}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-red-600">✗</span>
                    <p className="text-gray-500 line-through decoration-red-900">{item.problem}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-[#D6001C]">→</span>
                    <p className="text-white font-medium">{item.solution}</p>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrolling bold statements */}
      <div className="relative py-16 border-y border-white/5 overflow-hidden">
        <m.div style={{ x }} className="flex gap-20 whitespace-nowrap will-change-transform">
          {[...boldStatements, ...boldStatements].map((s, i) => (
            <span
              key={i}
              className={`text-4xl md:text-6xl font-black tracking-tight shrink-0 ${
                i % 2 === 0 ? "text-white" : "text-stroke"
              }`}
            >
              {s}
              <span className="text-[#D6001C] mx-10">—</span>
            </span>
          ))}
        </m.div>
      </div>

      {/* Big statement */}
      <div className="px-6 md:px-12 mt-24">
        <div className="max-w-[1400px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="border-l-4 border-[#D6001C] pl-10 py-4"
          >
            <p className="text-3xl md:text-5xl font-black leading-tight">
              "Three people build
              <br />
              <span className="text-gray-500">everything here. </span>
              <span className="text-[#D6001C]">No account managers,</span>
              <span className="text-gray-500"> no hand-offs,</span>
              <br />
              <span className="text-stroke-red">no one you'll never meet.</span>"
            </p>
            <p className="text-gray-600 mt-6 text-sm tracking-wider uppercase">
              — How 404 DAMNED actually works
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
}
