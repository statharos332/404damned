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
  About: "/about",
  "Privacy Policy": "/privacy-policy",
  "Terms of Service": "/terms-of-service",
  "Cookie Policy": "/cookie-policy",
  "Web Development": "/services/web-development",
  "E-Commerce": "/services/ecommerce",
  "AI Automation": "/services/ai-automation",
  Branding: "/services/branding",
  SEO: "/services/seo",
  "Social Media": "/services/social-media",
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
              <div className="flex gap-3 mt-6">
                {[
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/company/404damned",
                    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4V9z",
                  },
                  {
                    label: "Instagram",
                    href: "https://www.instagram.com/404_damned",
                    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.28.81-.32 1.71-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.38.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.33-.13-.81-.28-1.71-.32-1.24-.06-1.59-.07-4.74-.07zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96zm0 8.21a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46zm6.34-8.41a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0z",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 flex items-center justify-center border border-white/10 text-gray-500 hover:text-white hover:border-[#D6001C] transition-colors duration-300"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={social.path} />
                    </svg>
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
