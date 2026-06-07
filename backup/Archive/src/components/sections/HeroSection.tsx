"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";

// Three.js must be client-only — never SSR a WebGL canvas.
const AmsterdamHero3D = dynamic(
  () => import("@/components/three/AmsterdamHero3D"),
  { ssr: false, loading: () => <HeroPoster /> }
);

function HeroPoster() {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(4,6,12,.4), rgba(4,6,12,.95)), url('/hero-poster.jpg')",
      }}
    />
  );
}

export function HeroSection() {
  const scrollProgress = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [allow3D, setAllow3D] = useState(true);
  const [textFade, setTextFade] = useState(1);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency < 4
      : false;
    if (reduced || lowPower) setAllow3D(false);

    const onScroll = () => {
      if (!heroRef.current) return;
      const el = heroRef.current;
      const max = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(max, Math.max(0, -el.getBoundingClientRect().top));
      const p = max > 0 ? scrolled / max : 0;
      scrollProgress.current = p;
      // text fades out over the first 35% of the journey
      setTextFade(Math.max(0, 1 - p / 0.35));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Tall scroll container — gives room to "sail" down the canal
    <div ref={heroRef} className="relative h-[300vh] bg-[#04060c]">
      {/* Sticky viewport that holds the 3D canvas + copy */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {allow3D ? (
          <AmsterdamHero3D scrollProgress={scrollProgress} />
        ) : (
          <HeroPoster />
        )}

        {/* Cinematic gradient mask */}
        <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-[#04060c]/45 via-transparent via-50% to-[#04060c]" />

        {/* Hero copy — fades out as you sail forward */}
        <div
          className="absolute inset-0 z-[3] flex flex-col items-center justify-center text-center px-6 -mt-12 pointer-events-none transition-opacity duration-200"
          style={{ opacity: textFade }}
        >
          <div className="inline-flex items-center gap-3 border border-white/8 bg-[#04060c]/40 backdrop-blur px-5 py-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6001C] animate-pulse" />
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 font-bold">
              Amsterdam &middot; Digital Weapons Manufacturer
            </span>
          </div>

          <h1 className="font-display font-black uppercase leading-[0.87] tracking-tight text-[clamp(3.9rem,7vw,11rem)]">
            <span className="block text-white">We Don&apos;t Build</span>
            <span className="block text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.15)]">
              Websites.
            </span>
            <span className="block text-[#D6001C] [text-shadow:0_0_100px_rgba(214,0,28,0.6)]">
              We Build
            </span>
            <span className="block text-white">Digital Weapons.</span>
          </h1>

          <p className="mt-8 max-w-md text-white/40 leading-relaxed">
            Premium development, automation &amp; growth systems for{" "}
            <strong className="text-white/90 font-semibold">ambitious Dutch businesses</strong>.
            Not templates. Weapons.
          </p>

          <div className="mt-10 flex items-center gap-6 pointer-events-auto">
            <a
              href="#contact"
              className="bg-[#D6001C] hover:bg-[#FF1A35] text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5"
            >
              Book a Strategy Call &rarr;
            </a>
            <a
              href="#work"
              className="text-white/40 hover:text-white text-xs font-bold tracking-[0.18em] uppercase transition-colors flex items-center gap-2"
            >
              <span className="w-8 h-px bg-current" />
              View Our Work
            </a>
          </div>
        </div>

        {/* scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-200"
          style={{ opacity: textFade }}
        >
          <span className="text-[0.5rem] tracking-[0.4em] uppercase text-white/30 font-bold">
            Scroll to sail
          </span>
          <span className="w-px h-10 bg-gradient-to-b from-[#D6001C] to-transparent" />
        </div>
      </div>
    </div>
  );
}
