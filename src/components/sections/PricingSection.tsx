"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface Plan {
  name: string;
  tagline: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  featured: boolean;
  isCustomPrice?: boolean;
}

export function PricingSection() {
  const t = useTranslations("Pricing");
  const plans = t.raw("plans") as Plan[];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-32 md:py-48 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto" ref={ref}>
        {/* Header */}
        <div className="mb-20">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4"
          >
            {t("kicker")}
          </m.div>
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <m.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase"
            >
              {t("heading1")}
              <br />
              <span className="text-stroke">{t("heading2")}</span>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="max-w-sm text-gray-400 md:pt-24"
            >
              {t("subtitle")}
            </m.p>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <m.div
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
                    {t("mostPopular")}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-xs text-gray-500 tracking-widest uppercase font-mono mb-2">{plan.name}</div>
                <div className="text-sm text-gray-400 mb-6">{plan.tagline}</div>
                <div className="flex items-baseline gap-2">
                  {plan.isCustomPrice ? (
                    <span className="text-4xl font-black">{plan.price}</span>
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
            </m.div>
          ))}
        </div>

        {/* Trust note */}
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-12 text-center text-sm text-gray-600"
        >
          {t("trustNote")}
          <span className="text-gray-500 ml-2">{t("trustNoteExtra")}</span>
        </m.div>
      </div>
    </section>
  );
}
