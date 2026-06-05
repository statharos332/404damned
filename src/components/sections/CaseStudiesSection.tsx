"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const cases = [
  {
    id: "01",
    client: "NOORD Fashion House",
    category: "E-Commerce + Branding",
    description:
      "Complete digital transformation for Amsterdam's premier luxury streetwear brand. Rebuilt their Magento store from the ground up with AI-powered recommendations and a headless architecture.",
    metrics: [
      { value: 487, suffix: "%", label: "Revenue Growth" },
      { value: 312, suffix: "%", label: "Lead Increase" },
      { value: 2.1, suffix: "s", label: "Page Load Time" },
    ],
    tags: ["Magento", "AI", "Branding", "SEO"],
    year: "2024",
    color: "#D6001C",
  },
  {
    id: "02",
    client: "Amstel Construction Group",
    category: "Web Development + Lead Gen",
    description:
      "Next.js website with integrated lead qualification AI. Automated follow-up sequences reduced sales cycle from 3 weeks to 4 days. New leads arrive pre-qualified and ready to sign.",
    metrics: [
      { value: 890, suffix: "%", label: "Organic Traffic" },
      { value: 120, suffix: "%", label: "Conversion Rate" },
      { value: 68, suffix: "%", label: "Cost Per Lead Reduction" },
    ],
    tags: ["Next.js", "AI Automation", "SEO", "CRM"],
    year: "2024",
    color: "#D6001C",
  },
  {
    id: "03",
    client: "CANAL Restaurant Group",
    category: "Brand + Digital Ecosystem",
    description:
      "Three-restaurant group needed a cohesive brand identity and reservation system. We built the brand, the website, and an automated marketing engine that fills tables on autopilot.",
    metrics: [
      { value: 244, suffix: "%", label: "Online Reservations" },
      { value: 178, suffix: "%", label: "Social Following" },
      { value: 94, suffix: "%", label: "Seat Occupancy" },
    ],
    tags: ["Branding", "WordPress", "Social Media", "Automation"],
    year: "2023",
    color: "#D6001C",
  },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (value / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplayed(value);
        clearInterval(timer);
      } else {
        setDisplayed(parseFloat(start.toFixed(1)));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      +{value === displayed ? value : Math.floor(displayed)}
      {suffix}
    </span>
  );
}

export function CaseStudiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-32 md:py-48 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto" ref={sectionRef}>
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4"
          >
            — Proof of Warfare
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase"
          >
            Case
            <br />
            <span className="text-stroke">Studies.</span>
          </motion.h2>
        </div>

        {/* Cases */}
        <div className="space-y-4">
          {cases.map((c, caseIndex) => (
            <CaseCard key={c.id} caseStudy={c} index={caseIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ caseStudy, index }: { caseStudy: typeof cases[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setExpanded(!expanded)}
      className="group border border-white/8 hover:border-[#D6001C]/30 cursor-pointer transition-all duration-500"
      data-cursor-hover
    >
      {/* Top bar */}
      <div className="p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-6">
            <span className="text-xs font-mono text-[#D6001C]/60 pt-1">{caseStudy.id}</span>
            <div>
              <div className="text-xs text-gray-500 tracking-wider uppercase mb-2">
                {caseStudy.category} · {caseStudy.year}
              </div>
              <h3 className="text-2xl md:text-4xl font-black tracking-tight group-hover:text-[#D6001C] transition-colors duration-300">
                {caseStudy.client}
              </h3>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap gap-8">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[#D6001C]">
                  {isInView ? (
                    <AnimatedNumber value={metric.value} suffix={metric.suffix} inView={isInView} />
                  ) : (
                    `+0${metric.suffix}`
                  )}
                </div>
                <div className="text-xs text-gray-500 tracking-wider uppercase mt-1">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className={`transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}>
            <svg className="w-6 h-6 text-gray-600 group-hover:text-[#D6001C] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>

        {/* Expandable */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-8 border-t border-white/5 mt-8">
            <div className="flex flex-col md:flex-row gap-10">
              <p className="text-gray-400 leading-relaxed flex-1">{caseStudy.description}</p>
              <div className="flex flex-wrap gap-2 md:justify-end h-fit">
                {caseStudy.tags.map((tag) => (
                  <span key={tag} className="text-xs border border-[#D6001C]/20 text-[#D6001C]/70 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
