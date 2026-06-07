export function MarqueeBar() {
  const items = [
    "Web Development",
    "E-Commerce",
    "AI Automation",
    "Next.js",
    "Magento",
    "WordPress",
    "Branding",
    "SEO",
    "Social Media",
    "Digital Strategy",
  ];

  return (
    <div className="relative py-5 border-y border-white/5 bg-[#D6001C]/5 overflow-hidden">
      <div className="flex overflow-hidden">
        <div className="marquee-track flex items-center gap-0 whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors px-6">
                {item}
              </span>
              <span className="text-[#D6001C] text-lg">×</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
