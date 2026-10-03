"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import { useBooking } from "@/components/ui/BookingProvider";
import { useShowreel } from "@/components/ui/ShowreelProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Navigation() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBooking();
  const { openShowreel } = useShowreel();

  // The services hub has a genuinely different path per locale (/services
  // vs /nl/diensten, not just a /nl prefix) — see serviceHref() in lib/seo
  // for why — so it can't go through the generic i18n-prefixed Link below.
  const navLinks = [
    { key: "services", label: t("services"), href: locale === "nl" ? "/nl/diensten" : "/services", plain: true },
    { key: "work", label: t("work"), href: "/work" },
    { key: "about", label: t("about"), href: "/about" },
    { key: "insights", label: t("insights"), href: "/insights" },
    { key: "pricing", label: t("pricing"), href: "/#pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Entrance is CSS (.nav-enter) — no framer-motion on every page */}
      <nav
        className={`nav-enter fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-5 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5"
            : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" prefetch={false} className="group flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D6001C] flex items-center justify-center">
              <span className="text-white text-xs font-bold font-mono">404</span>
            </div>
            <span className="text-white font-bold text-sm tracking-[0.2em] uppercase">
              DAMNED
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const className =
                "text-sm text-gray-400 hover:text-white transition-colors duration-300 tracking-wider uppercase font-medium";
              return link.plain ? (
                <NextLink key={link.href} href={link.href} prefetch={false} className={className}>
                  {link.label}
                </NextLink>
              ) : (
                <Link key={link.href} href={link.href} prefetch={false} className={className}>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Language switcher + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <LanguageSwitcher />
            <button
              onClick={openBooking}
              className="relative text-sm font-bold tracking-wider uppercase bg-[#D6001C] text-white px-6 py-3 hover:bg-[#FF1A35] transition-all duration-300 group"
            >
              <span>{t("bookCall")}</span>
              <div className="absolute inset-0 border border-[#D6001C] translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative z-50 w-8 h-6 flex flex-col justify-between"
            aria-label={t("toggleMenu")}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-full h-px bg-white origin-left transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block w-full h-px bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-full h-px bg-white origin-left transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu — always mounted, slides via CSS (.mobile-menu).
          justify-start + top padding (not justify-center) so it never
          collides with the fixed logo/close button above it — real mobile
          Safari's visible toolbar chrome leaves less height than the full
          screen size, and this menu's content is tall enough to be flush
          against the top there. overflow-y-auto is the fallback for even
          shorter viewports (landscape, older phones). */}
      <div
        data-lenis-prevent
        className="mobile-menu lg:hidden fixed inset-0 z-[90] bg-[#050505] flex flex-col justify-start overflow-y-auto px-8 pt-28 pb-10"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col gap-8 m-auto">
          {navLinks.map((link, i) => (
            <div
              key={link.href}
              className="mobile-menu-item"
              style={{ transitionDelay: menuOpen ? `${0.1 + i * 0.08}s` : "0s" }}
            >
              {link.plain ? (
                <NextLink
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-5xl font-bold tracking-tight hover:text-[#D6001C] transition-colors duration-300"
                >
                  {link.label}
                </NextLink>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-5xl font-bold tracking-tight hover:text-[#D6001C] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          <div
            className="mobile-menu-item"
            style={{ transitionDelay: menuOpen ? "0.45s" : "0s" }}
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                openShowreel();
              }}
              className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white hover:text-[#00E5FF] transition-colors"
            >
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D6001C]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6001C] animate-pulse" />
                REC
              </span>
              {t("watchShowreel")}
              <span className="text-[#00E5FF]">▶</span>
            </button>
          </div>
          <div
            className="mobile-menu-item mt-8"
            style={{ transitionDelay: menuOpen ? "0.5s" : "0s" }}
          >
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-block text-sm font-bold tracking-wider uppercase bg-[#D6001C] text-white px-8 py-4"
            >
              {t("bookStrategyCall")}
            </Link>
          </div>
          <div
            className="mobile-menu-item mt-8"
            style={{ transitionDelay: menuOpen ? "0.55s" : "0s" }}
          >
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
