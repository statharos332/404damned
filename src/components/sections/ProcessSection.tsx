"use client";

import { useState, useRef } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    duration: "Week 1",
    description:
      "Deep dive into your business, market position, competitors and growth ambitions. We don't touch a pixel until we understand your commercial reality.",
    activities: [
      "Stakeholder interviews",
      "Competitive audit",
      "Technical assessment",
      "Goal definition",
    ],
    output: "Strategy Brief",
  },
  {
    number: "02",
    title: "Strategy",
    duration: "Week 1-2",
    description:
      "We architect the complete digital system — from user journeys to conversion paths to technical infrastructure. Every decision is documented and justified.",
    activities: [
      "User journey mapping",
      "Conversion architecture",
      "Tech stack decision",
      "KPI framework",
    ],
    output: "Project Blueprint",
  },
  {
    number: "03",
    title: "Design",
    duration: "Week 2-3",
    description:
      "Visual systems that command attention and drive action. We design in high fidelity from day one. No wireframe games.",
    activities: [
      "Brand direction",
      "UI/UX design",
      "Motion design",
      "Design system",
    ],
    output: "Complete Design System",
  },
  {
    number: "04",
    title: "Development",
    duration: "Week 3-6",
    description:
      "Pixel-perfect implementation with obsessive attention to performance, accessibility and scalability. Clean code. Zero tech debt.",
    activities: [
      "Frontend development",
      "Backend integration",
      "AI implementation",
      "QA testing",
    ],
    output: "Production-Ready Build",
  },
  {
    number: "05",
    title: "Growth",
    duration: "Ongoing",
    description:
      "Launch is the starting line, not the finish. We run continuous optimisation, A/B testing and growth experiments to compound your results over time.",
    activities: [
      "A/B testing",
      "SEO compounding",
      "Performance monitoring",
      "Monthly growth reports",
    ],
    output: "Monthly Growth System",
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-32 md:py-48 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto" ref={ref}>
        {/* Header */}
        <div className="mb-20">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4"
          >
            — How We Work
          </m.div>
          <m.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase"
          >
            The War
            <br />
            <span className="text-stroke">Room Process.</span>
          </m.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Step selector */}
          <div className="space-y-2">
            {steps.map((step, i) => (
              <m.button
                key={step.number}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left p-6 border transition-all duration-300 group ${
                  activeStep === i
                    ? "border-[#D6001C] bg-[#D6001C]/5"
                    : "border-white/5 hover:border-white/15"
                }`}
                data-cursor-hover
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <span className={`text-xs font-mono ${activeStep === i ? "text-[#D6001C]" : "text-gray-600"}`}>
                      {step.number}
                    </span>
                    <div>
                      <div className={`text-xl font-black tracking-tight ${activeStep === i ? "text-white" : "text-gray-400"}`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-600 tracking-wider uppercase mt-1">{step.duration}</div>
                    </div>
                  </div>
                  <m.div
                    animate={{ rotate: activeStep === i ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className={`w-4 h-4 ${activeStep === i ? "text-[#D6001C]" : "text-gray-700"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </m.div>
                </div>
              </m.button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <m.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="border border-white/8 p-10"
              >
                <div className="text-7xl font-black text-[#D6001C]/10 font-mono mb-4">
                  {steps[activeStep].number}
                </div>
                <h3 className="text-4xl font-black tracking-tight mb-6">
                  {steps[activeStep].title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  {steps[activeStep].description}
                </p>

                <div className="mb-8">
                  <div className="text-xs text-gray-600 tracking-wider uppercase mb-4">Activities</div>
                  <div className="grid grid-cols-2 gap-2">
                    {steps[activeStep].activities.map((activity) => (
                      <div key={activity} className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-1 h-1 rounded-full bg-[#D6001C]" />
                        {activity}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6">
                  <div className="text-xs text-gray-600 tracking-wider uppercase mb-2">Output</div>
                  <div className="text-lg font-bold text-white">{steps[activeStep].output}</div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
