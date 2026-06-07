"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const plans = [
    {
        name: "Starter",
        tagline: "For businesses ready to compete.",
        price: "From 3.500",
        period: "one-time",
        description: "A focused, high-performance digital presence built for credibility and conversion.",
        features: [
            "Custom design (up to 8 pages)",
            "Next.js or WordPress development",
            "Mobile-first responsive",
            "Basic SEO setup",
            "Google Analytics 4",
            "Contact form + CRM integration",
            "3-month post-launch support",
        ],
        cta: "Start the conversation",
        featured: false,
    },
    {
        name: "Growth",
        tagline: "For businesses that scale seriously.",
        price: "From 8.500",
        period: "one-time + optional monthly",
        description: "Full digital system: design, development, automation, and performance optimization.",
        features: [
            "Everything in Starter",
            "AI lead qualification system",
            "Advanced integrations / e-commerce",
            "Full SEO architecture",
            "Conversion rate optimisation",
            "Monthly growth support (optional)",
            "Analytics & tracking setup",
            "Priority communication channel",
        ],
        cta: "Most ambitious brands choose this",
        featured: true,
    },
    {
        name: "Enterprise",
        tagline: "For long-term digital partnerships.",
        price: "Custom",
        period: "retainer",
        description: "We operate as your embedded digital team, focused on continuous growth and optimization.",
        features: [
            "Everything in Growth",
            "Dedicated team access",
            "Custom automation & AI systems",
            "Ongoing optimization",
            "Strategic advisory",
            "SLA-based support",
            "Monthly reporting",
            "Quarterly strategy reviews",
        ],
        cta: "Apply for partnership",
        featured: false,
    },
];

export function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-32 md:py-48 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto" ref={ref}>
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4"
          >
            — Investment
          </motion.div>
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase"
            >
              Fair Prices.
              <br />
              <span className="text-stroke">Unfair Results.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="max-w-sm text-gray-400 md:pt-24"
            >
              Not the cheapest. Not the most expensive. The only agency where the math actually makes sense.
            </motion.p>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col p-8 transition-all duration-500 ${
                plan.featured
                  ? "border-2 border-[#D6001C] bg-[#D6001C]/5"
                  : "border border-white/8 hover:border-white/15"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D6001C] to-transparent" />
              )}
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#D6001C] text-white text-xs font-bold tracking-widest uppercase px-4 py-1">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-xs text-gray-500 tracking-widest uppercase font-mono mb-2">{plan.name}</div>
                <div className="text-sm text-gray-400 mb-6">{plan.tagline}</div>
                <div className="flex items-baseline gap-2">
                  {plan.price === "Custom" ? (
                    <span className="text-4xl font-black">Custom</span>
                  ) : (
                    <>
                      <span className="text-2xl text-gray-500">€</span>
                      <span className="text-4xl font-black">{plan.price}</span>
                    </>
                  )}
                </div>
                <div className="text-xs text-gray-600 mt-1">{plan.period}</div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-8 pb-8 border-b border-white/5">
                {plan.description}
              </p>

              <div className="flex-1 space-y-3 mb-10">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 text-[#D6001C] shrink-0">→</span>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="#contact"
                className={`w-full py-4 font-bold text-sm tracking-widest uppercase text-center transition-all duration-300 ${
                  plan.featured
                    ? "bg-[#D6001C] text-white hover:bg-[#FF1A35]"
                    : "border border-white/15 text-white hover:border-[#D6001C]/40 hover:bg-[#D6001C]/5"
                }`}
                data-cursor-hover
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-12 text-center text-sm text-gray-600"
        >
          All projects include a discovery call. We only take on work we know we can win.
          <span className="text-gray-500 ml-2">No retainer lock-ins on Starter.</span>
        </motion.div>
      </div>
    </section>
  );
}
