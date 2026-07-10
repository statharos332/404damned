import Link from "next/link";

const footerLinks = {
  Services: [
    "Web Development",
    "E-Commerce",
    "AI Automation",
    "Branding",
    "SEO",
    "Social Media",
  ],
  Company: ["About", "Process", "Case Studies", "Pricing", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

// Live pages — everything else is still an in-page anchor placeholder.
const linkHrefs: Record<string, string> = {
  "Privacy Policy": "/privacy-policy",
  "Terms of Service": "/terms-of-service",
  "Cookie Policy": "/cookie-policy",
};

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      {/* Big CTA */}
      <div className="px-6 md:px-12 py-20 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <div className="text-xs text-[#D6001C] tracking-[0.3em] uppercase font-mono mb-4">
              Ready to stop losing market share?
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[0.95]">
              Let&apos;s build your
              <br />
              <span className="text-[#D6001C]">digital weapon.</span>
            </h2>
          </div>
          <Link
            href="#contact"
            className="group relative inline-flex items-center gap-3 bg-[#D6001C] text-white px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-[#FF1A35] transition-colors duration-300 shrink-0"
          >
            Book a Strategy Call
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Links grid */}
      <div className="px-6 md:px-12 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#D6001C] flex items-center justify-center">
                  <span className="text-white text-xs font-bold font-mono">404</span>
                </div>
                <span className="text-white font-bold text-sm tracking-[0.2em] uppercase">DAMNED</span>
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                Premium digital agency in Amsterdam. We build digital weapons for ambitious brands.
              </p>
              <div className="flex gap-4 mt-6">
                {[
                  { label: "LinkedIn", href: "https://www.linkedin.com/company/404damned" },
                  { label: "Instagram", href: "https://www.instagram.com/404_damned" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-600 hover:text-[#D6001C] tracking-wider uppercase transition-colors duration-300"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <div className="text-xs text-gray-600 tracking-[0.2em] uppercase font-medium mb-4">
                  {category}
                </div>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href={linkHrefs[link] ?? "#"}
                        className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-12 py-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-700">
            © {new Date().getFullYear()} 404 DAMNED — KVK 42082502 — Amsterdam, Netherlands
          </div>
          <div className="text-xs text-gray-700">
            Designed & built in Amsterdam with intention.
          </div>
        </div>
      </div>
    </footer>
  );
}
