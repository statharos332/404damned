"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Renders a project cover that can be EITHER an image or a video.
 * VIDEO: lazy — only starts loading/playing when it scrolls into view
 * (IntersectionObserver), pauses when off-screen. Saves bandwidth and
 * protects LCP/INP. Shows the poster until then.
 * IMAGE: optimized next/image.
 */
export function CoverMedia({
  src,
  alt,
  poster,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 700px",
  className = "object-cover w-full h-full",
}: {
  src: string;
  alt: string;
  poster?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const isVideo = /\.(mp4|webm|mov)$/i.test(src);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!isVideo) return;
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          setInView(e.isIntersecting);
          const v = videoRef.current;
          if (!v) return;
          if (e.isIntersecting) {
            // load + play only when visible
            if (v.preload !== "auto") v.preload = "auto";
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { rootMargin: "200px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isVideo]);

  if (isVideo) {
    return (
      <div ref={wrapRef} className="absolute inset-0">
        {/* poster paints instantly; video fades in when in view */}
        {poster && (
          <Image
            src={poster}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={className}
            style={{ opacity: inView ? 0 : 1, transition: "opacity .4s" }}
          />
        )}
        <video
          ref={videoRef}
          className={className}
          src={inView ? src : undefined}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          style={{ opacity: inView ? 1 : 0, transition: "opacity .4s" }}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
