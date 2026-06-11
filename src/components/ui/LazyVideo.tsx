"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A self-lazy video: loads (preload=none) and plays only when scrolled
 * into view, pauses when it leaves, and fades in over its poster.
 * Works for both vertical and horizontal (overflow) scrolling.
 *
 * Supports an optional HLS `.m3u8` source via hls.js IF you add it later
 * (see note in code) — today it just plays a local .mp4/.webm.
 */
export function LazyVideo({
  src,
  poster,
  className = "w-full h-full object-cover",
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = videoRef.current;
          setActive(e.isIntersecting);
          if (!v) return;
          if (e.isIntersecting) {
            if (v.preload !== "auto") v.preload = "auto";
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { root: null, rootMargin: "150px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className={className}
          style={{
            position: "absolute",
            inset: 0,
            opacity: active ? 0 : 1,
            transition: "opacity .4s",
          }}
        />
      )}
      <video
        ref={videoRef}
        className={className}
        src={active ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        style={{ opacity: active ? 1 : 0, transition: "opacity .4s" }}
      />
    </div>
  );
}
