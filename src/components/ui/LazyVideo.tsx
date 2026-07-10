"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A self-lazy video: loads (preload=none) and plays only when scrolled
 * into view, pauses when it leaves, and fades in over its poster.
 * Works for both vertical and horizontal (overflow) scrolling.
 *
 * Once it has entered the viewport the <source> is kept mounted forever —
 * we only toggle play/pause after that. (Previously the src was removed
 * when the video scrolled out, and re-adding it raced with the play()
 * call, so videos never resumed after a horizontal scroll.)
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
            opacity: loaded ? 0 : 1,
            transition: "opacity .4s",
          }}
        />
      )}
      <video
        ref={videoRef}
        className={className}
        src={loaded ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity .4s" }}
      />
    </div>
  );
}
