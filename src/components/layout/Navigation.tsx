"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useBooking } from "@/components/ui/BookingProvider";
import { useShowreel } from "@/components/ui/ShowreelProvider";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Pricing", href: "#pricing" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBooking();
  const { openShowreel } = useShowreel();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <m.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-5 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/90 backdrop-blur-xl border-b border-white/5"
            : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D6001C] flex items-center justify-center">
              <span className="text-white text-xs font-bold font-mono">404</span>
            </div>
            <span className="text-white font-bold text-sm tracking-[0.2em] uppercase">
              DAMNED
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300 tracking-wider uppercase font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={openBooking}
              className="relative text-sm font-bold tracking-wider uppercase bg-[#D6001C] text-white px-6 py-3 hover:bg-[#FF1A35] transition-all duration-300 group"
            >
              <span>Book a Call</span>
              <div className="absolute inset-0 border border-[#D6001C] translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 w-8 h-6 flex flex-col justify-between"
            aria-label="Toggle menu"
          >
            <m.span
              animate={menuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
              className="block w-full h-px bg-white origin-left"
            />
            <m.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-full h-px bg-white"
            />
            <m.span
              animate={menuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
              className="block w-full h-px bg-white origin-left"
            />
          </button>
        </div>
      </m.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#050505] flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-5xl font-bold tracking-tight hover:text-[#D6001C] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
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
                  Watch Showreel
                  <span className="text-[#00E5FF]">▶</span>
                </button>
              </m.div>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block text-sm font-bold tracking-wider uppercase bg-[#D6001C] text-white px-8 py-4"
                >
                  Book a Strategy Call
                </Link>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
