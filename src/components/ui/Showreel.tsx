"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useShowreel } from "./ShowreelProvider";

const REEL_MP4 = "/video/showreel_preview.mp4";
const REEL_WEBM = "/video/showreel_preview.webm";
const REEL_POSTER = "/video/showreel_poster.webp";

/**
 * Small brutalist showreel preview that sits UNDER THE LOGO (top-left) on
 * desktop. Hidden on mobile (md:block) — on mobile it lives inside the menu
 * instead. Clicking it opens the shared fullscreen player (with sound).
 */
export function Showreel() {
  const { openShowreel } = useShowreel();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  // The widget is desktop-only (hidden md:block). Gate it in JS too so mobile
  // never downloads the preview video for an element it can't even see.
  const [isDesktop, setIsDesktop] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Show the widget only while we're over the hero (near the top). When you
  // scroll down past the hero it hides; scrolling back up reveals it again.
  useEffect(() => {
    let revealed = false;
    const t = window.setTimeout(() => {
      revealed = true;
      update();
    }, 1200);

    const update = () => {
      if (!revealed) return;
      // hero is ~one viewport tall; hide once we've scrolled most of it away
      const threshold = window.innerHeight * 0.6;
      const overHero = window.scrollY < threshold;
      setVisible(overHero);
      const v = previewRef.current;
      if (v) {
        if (overHero) v.play().catch(() => {});
        else v.pause();
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", update);
    };
  }, []);

  // Only show the floating widget on the homepage, desktop only.
  if (pathname !== "/" || !isDesktop) return null;

  return (
    /* hidden on mobile, fixed under the logo on desktop.
       Visibility toggles via CSS (no framer-motion). */
    <div
      className={`hidden md:block fixed z-[60] top-24 left-6 lg:left-10 w-[200px] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-4 scale-90 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <button
        onClick={openShowreel}
        className="group relative block w-full text-left"
        aria-label="Play showreel"
      >
            <span className="absolute inset-0 border border-[#D6001C] translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />

            <div className="relative border border-white/20 bg-[#050505] overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10">
                <span className="flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-widest text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6001C] animate-pulse" />
                  REC
                </span>
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-white/40">
                  showreel
                </span>
              </div>

              <div className="relative aspect-video overflow-hidden">
                <video
                  ref={previewRef}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  poster={REEL_POSTER}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                >
                  <source src={REEL_WEBM} type="video/webm" />
                  <source src={REEL_MP4} type="video/mp4" />
                </video>

                <div className="absolute inset-0 scanlines pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/20 px-3 py-1.5 group-hover:border-[#00E5FF] transition-colors">
                    <span className="text-[#00E5FF] text-xs">▶</span>
                    <span className="font-mono text-[0.55rem] uppercase tracking-widest text-white">
                      play
                    </span>
                  </span>
                </div>
              </div>

              <div className="px-3 py-1.5 border-t border-white/10">
                <span className="font-mono text-[0.55rem] uppercase tracking-widest text-white/50">
                  [ this_is_us ] →
                </span>
              </div>
            </div>
          </button>
    </div>
  );
}
