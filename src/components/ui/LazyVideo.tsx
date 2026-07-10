"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A self-lazy video that renders at the file's OWN natural aspect ratio —
 * no forced dimensions, no cropping. Whatever you drop in just sits as it
 * is. Sizing is entirely controlled by the `className` you pass (e.g.
 * `w-full h-auto` or `max-h-[400px] w-auto`).
 *
 * It loads (preload=none) and plays only when scrolled into view, pauses
 * when it leaves. Once it has entered the viewport the source stays mounted
 * forever — we only toggle play/pause after that — so videos always resume
 * after a scroll (vertical or horizontal).
 */
export function LazyVideo({
  src,
  poster,
  className = "w-full h-auto",
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  // Latches true the first time we come into view and never reverts, so the
  // src stays mounted and playback can resume every time we scroll back.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      setLoaded(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          setInView(e.isIntersecting);
          if (e.isIntersecting) setLoaded(true);
        });
      },
      { root: null, rootMargin: "150px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Drive playback in an effect — runs AFTER the src is committed to the DOM,
  // so play() never races an undefined source.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !loaded) return;
    if (inView) {
      if (v.preload !== "auto") v.preload = "auto";
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView, loaded]);

  return (
    // The <video> is in normal flow and defines the box at its true aspect;
    // the poster overlays it and fades out once the video is loaded.
    <div ref={wrapRef} className="relative">
      <video
        ref={videoRef}
        className={`block ${className}`}
        src={loaded ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity .4s" }}
      />
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: loaded ? 0 : 1, transition: "opacity .4s" }}
        />
      )}
    </div>
  );
}
