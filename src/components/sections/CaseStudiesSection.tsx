"use client";

import { useRef, useState } from "react";
import { m, useInView } from "framer-motion";

const capabilities = [
    {
        id: "01",
        title: "High-Performance Websites",
        category: "Design + Development",
        description:
            "Custom-built websites designed for credibility, speed, and conversion. Every project starts with strategy and ends with a digital asset that supports measurable business growth.",
        highlights: [
            "Custom UI/UX Design",
            "Next.js Development",
            "WordPress Development",
        ],
        tags: ["Next.js", "WordPress", "Performance", "SEO"],
    },
    {
        id: "02",
        title: "E-Commerce Platforms",
        category: "Commerce Infrastructure",
        description:
            "Scalable e-commerce experiences built for ambitious brands. From product architecture to checkout optimisation, every detail is engineered for growth.",
        highlights: [
            "Magento Development",
            "WooCommerce Solutions",
            "Headless Commerce",
        ],
        tags: ["Magento", "WooCommerce", "Headless", "CRO"],
    },
    {
        id: "03",
        title: "AI & Automation Systems",
        category: "Digital Operations",
        description:
            "Automation solutions that eliminate repetitive work, improve lead handling, and create more efficient business processes.",
        highlights: [
            "Lead Qualification",
            "CRM Automation",
            "Workflow Optimisation",
        ],
        tags: ["AI", "Automation", "CRM", "Integrations"],
    },
];

export function CaseStudiesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, {
        once: true,
        margin: "-100px",
    });

    return (
        <section
            id="capabilities"
            className="py-32 md:py-48 px-6 md:px-12 bg-[#050505]"
        >
            <div className="max-w-[1400px] mx-auto" ref={sectionRef}>
                <div className="mb-20">
                    <m.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4"
                    >
                        — Core Expertise
                    </m.div>

                    <m.h2
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase"
                    >
                        Digital
                        <br />
                        <span className="text-stroke">Capabilities.</span>
                    </m.h2>
                </div>

                <div className="space-y-4">
                    {capabilities.map((item, index) => (
                        <CapabilityCard
                            key={item.id}
                            capability={item}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CapabilityCard({
                            capability,
                            index,
                        }: {
    capability: (typeof capabilities)[0];
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const isInView = useInView(ref, {
        once: true,
        margin: "-80px",
    });

    const [expanded, setExpanded] = useState(false);

    return (
        <m.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
            }}
            onClick={() => setExpanded(!expanded)}
            className="group border border-white/8 hover:border-[#D6001C]/30 cursor-pointer transition-all duration-500"
        >
            <div className="p-8 md:p-10">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                    <div className="flex items-start gap-6">
            <span className="text-xs font-mono text-[#D6001C]/60 pt-1">
              {capability.id}
            </span>

                        <div>
                            <div className="text-xs text-gray-500 tracking-wider uppercase mb-2">
                                {capability.category}
                            </div>

                            <h3 className="text-2xl md:text-4xl font-black tracking-tight group-hover:text-[#D6001C] transition-colors duration-300">
                                {capability.title}
                            </h3>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {capability.highlights.map((item) => (
                            <div
                                key={item}
                                className="border border-white/10 px-3 py-2 text-xs uppercase tracking-wider text-gray-300"
                            >
                                {item}
                            </div>
                        ))}
                    </div>

                    <div
                        className={`transition-transform duration-300 ${
                            expanded ? "rotate-45" : ""
                        }`}
                    >
                        <svg
                            className="w-6 h-6 text-gray-600 group-hover:text-[#D6001C]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </div>
                </div>

                <m.div
                    initial={false}
                    animate={{
                        height: expanded ? "auto" : 0,
                        opacity: expanded ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                >
                    <div className="pt-8 border-t border-white/5 mt-8">
                        <div className="flex flex-col md:flex-row gap-10">
                            <p className="text-gray-400 leading-relaxed flex-1 max-w-3xl">
                                {capability.description}
                            </p>

                            <div className="flex flex-wrap gap-2 md:justify-end h-fit">
                                {capability.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs border border-[#D6001C]/20 text-[#D6001C]/70 px-3 py-1"
                                    >
                    {tag}
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </m.div>
            </div>
        </m.div>
    );
}