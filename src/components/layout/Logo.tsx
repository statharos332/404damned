"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * 404 DAMNED logo with a scroll-triggered lightning strike.
 * Scroll down → a huge, thick, realistic bolt rips from the BOTTOM-RIGHT
 * corner of the screen up to the logo, which jolts and electrifies.
 * Scroll back to top → resets. Repeats each time you leave / return.
 */
export function Logo() {
  const [zap, setZap] = useState(false);
  const [boltPath, setBoltPath] = useState("");
  const struckRef = useRef(false);

  // Build a thick, jagged bolt from the bottom-right corner to the logo.
  // Coordinates are in the 0..100 viewBox (scaled to the viewport).
  const buildBolt = () => {
    // start: bottom-right corner (105, 105) → end: logo (~6, 6)
    const start = { x: 105, y: 105 };
    const end = { x: 6, y: 6 };
    const segs = 9;
    let d = `M ${start.x} ${start.y}`;
    for (let i = 1; i < segs; i++) {
      const t = i / segs;
      // straight-line point between start and end
      const lx = start.x + (end.x - start.x) * t;
      const ly = start.y + (end.y - start.y) * t;
      // perpendicular jitter that shrinks near the target
      const amp = (1 - t) * 14 + 3;
      const nx = lx + (Math.random() - 0.5) * amp;
      const ny = ly + (Math.random() - 0.5) * amp;
      d += ` L ${nx.toFixed(1)} ${ny.toFixed(1)}`;
    }
    d += ` L ${end.x} ${end.y}`;
    return d;
  };

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 60;
      if (past && !struckRef.current) {
        struckRef.current = true;
        setBoltPath(buildBolt());
        setZap(true);
        window.setTimeout(() => setZap(false), 900);
      } else if (!past && struckRef.current) {
        struckRef.current = false;
        setZap(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link href="/" className="group relative block" aria-label="404 DAMNED — home">
      {/* HUGE thick bolt from the bottom-right corner up to the logo */}
      {zap && boltPath && (
        <svg
          className="fixed inset-0 pointer-events-none z-[9997]"
          style={{ width: "100vw", height: "100vh", overflow: "visible" }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect x="0" y="0" width="100" height="100" className="logo-screen-flash" />
          <path d={boltPath} className="logo-bolt logo-bolt-glow-red" fill="none" vectorEffect="non-scaling-stroke" />
          <path d={boltPath} className="logo-bolt logo-bolt-glow" fill="none" vectorEffect="non-scaling-stroke" />
          <path d={boltPath} className="logo-bolt logo-bolt-core" fill="none" vectorEffect="non-scaling-stroke" />
          {/* bright impact head at the logo */}
          <circle cx="6" cy="6" r="0.5" className="logo-impact-flash" />
          <circle cx="6" cy="6" r="1" className="logo-impact-ring" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
      )}

      {/* the logo — jolts + electrifies on strike */}
      <div className={`relative flex items-center gap-3 ${zap ? "logo-zap logo-jolt" : ""}`}>
        <div className="w-8 h-8 bg-[#D6001C] flex items-center justify-center">
          <span className="text-white text-xs font-bold font-mono">404</span>
        </div>
        <span className="text-white font-bold text-sm tracking-[0.2em] uppercase">
          DAMNED
        </span>
      </div>
    </Link>
  );
}
