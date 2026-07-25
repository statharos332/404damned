"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fades its children out as you scroll down through the ancestor `.hero-root`
 * container. Pure progressive enhancement — children are server-rendered
 * markup (passed straight through from HeroSection), so the hero text is
 * fully painted before this client island even hydrates; it only ever
 * *adds* the fade-on-scroll behaviour on top.
 */
export function HeroScrollFade({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const copyRef = useRef<HTMLDivElement>(null);

  // Write opacity straight to the DOM (rAF-throttled) so we never trigger a
  // React re-render per scroll frame — keeps the main thread free (Law 9).
  useEffect(() => {
    const copy = copyRef.current;
    const el = copy?.closest<HTMLElement>(".hero-root");
    if (!el || !copy) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const max = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(max, Math.max(0, -el.getBoundingClientRect().top));
      const p = max > 0 ? scrolled / max : 0;
      copy.style.opacity = String(Math.max(0, 1 - p / 0.5));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={copyRef} className={className}>
      {children}
    </div>
  );
}
