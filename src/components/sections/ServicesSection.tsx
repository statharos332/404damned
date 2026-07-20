"use client";

import { useRef, useState } from "react";
import { m, useInView } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Web Development",
    description: "Custom Next.js, React and WordPress builds engineered for performance, conversion and scale. No templates. Pure code.",
    tags: ["Next.js", "React", "TypeScript", "Performance"],
  },
  {
    number: "02",
    title: "E-Commerce",
    description: "Magento & custom e-commerce ecosystems that turn browsers into buyers. Revenue-first architecture.",
    tags: ["Magento", "WooCommerce", "Checkout Optimization"],
  },
  {
    number: "03",
    title: "AI Automation",
    description: "Intelligent systems that replace repetitive work, qualify leads 24/7 and scale your operations without scaling headcount.",
    tags: ["GPT-4o", "Automation", "CRM", "Lead Scoring"],
  },
  {
    number: "04",
    title: "Social Media",
    description: "Content systems and growth architecture for brands that refuse to blend in.",
    tags: ["Strategy", "Content", "Paid Ads", "Analytics"],
  },
  {
    number: "05",
    title: "Branding",
    description: "Visual identities that make instant emotional impact. From strategy to complete brand systems.",
    tags: ["Identity", "Design System", "Motion", "Brand Strategy"],
  },
  {
    number: "06",
    title: "SEO",
    description: "Technical SEO and content infrastructure that compounds. We build assets, not campaigns.",
    tags: ["Technical SEO", "Content", "Link Building", "Analytics"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = -(e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    setRotation({ x: x * 8, y: y * 8 });
  };

  return (
    <m.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotation({ x: 0, y: 0 }); }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(20px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        transition: isHovered ? "transform 0.1s ease" : "transform 0.5s ease",
      }}
      className="group relative cursor-pointer"
      data-cursor-hover
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-px rounded-sm bg-gradient-to-br from-[#D6001C]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
      />

      {/* Card */}
      <div className="relative border border-white/8 hover:border-[#D6001C]/40 bg-[#0a0a0a] hover:bg-[#0d0d0d] p-8 h-full transition-all duration-500 group">
        {/* Animated border top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D6001C] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

        {/* Number */}
        <div className="mb-8">
          <span className="text-xs text-[#D6001C]/60 font-mono tracking-widest">{service.number}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-[#D6001C] transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-500 border border-white/5 px-3 py-1 group-hover:border-[#D6001C]/20 group-hover:text-gray-400 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <svg className="w-5 h-5 text-[#D6001C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>
    </m.div>
  );
}

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 md:py-48 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row items-start justify-between mb-20 gap-8">
          <div>
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4"
            >
              — What We Do
            </m.div>
            <m.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] uppercase"
            >
              Digital
              <br />
              <span className="text-stroke">Arsenal.</span>
            </m.h2>
          </div>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-md text-gray-400 text-lg leading-relaxed md:text-right md:pt-20"
          >
            Six disciplines. One mission: making your competitors irrelevant.
          </m.p>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
