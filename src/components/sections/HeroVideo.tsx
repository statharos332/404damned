"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Looping background video, deferred until after load + idle so it never
 * competes for bandwidth during first paint. Until then the poster image
 * carries the hero — this is a client island scoped to just the video,
 * kept out of the text's render/hydration path (see HeroSection.tsx).
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  // Load the background video only after the page is done loading and the main
  // thread is idle — so it never blocks LCP. Honour reduced-motion (poster only).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const idle = () => {
      type RIC = (cb: () => void) => number;
      const ric = (window as unknown as { requestIdleCallback?: RIC })
        .requestIdleCallback;
      if (ric) ric(() => setShowVideo(true));
      else setTimeout(() => setShowVideo(true), 200);
    };
    if (document.readyState === "complete") idle();
    else {
      window.addEventListener("load", idle, { once: true });
      return () => window.removeEventListener("load", idle);
    }
  }, []);

  // Once the video exists, kick off playback and pause it when the hero scrolls
  // off-screen (saves CPU/battery). Keeps Core Web Vitals clean.
  useEffect(() => {
    const v = videoRef.current;
    if (!showVideo || !v) return;
    v.load();
    v.play().catch(() => {});
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.05 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [showVideo]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      poster="/video/hero_poster.webp"
      loop
      muted
      playsInline
      preload="none"
    >
      {showVideo && <source src="/video/hero_opt.mp4" type="video/mp4" />}
    </video>
  );
}
