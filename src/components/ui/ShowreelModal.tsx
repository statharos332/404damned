"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";

const REEL_MP4 = "/video/showreel.mp4";
const REEL_POSTER = "/video/showreel_poster.webp";

/**
 * The heavy fullscreen showreel player — split out of ShowreelProvider so
 * its framer-motion markup only loads once openShowreel() is first called,
 * instead of being part of every page's initial JS bundle.
 */
export function ShowreelModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const fullRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const v = fullRef.current;
      if (v) {
        v.currentTime = 0;
        v.muted = false;
        v.volume = 1;
        v.play().catch(() => {});
      }
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[10001] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/70">
              <span className="w-2 h-2 rounded-full bg-[#D6001C] animate-pulse" />
              404 DAMNED · showreel
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="font-mono text-2xl text-white/70 hover:text-[#D6001C] w-10 h-10 flex items-center justify-center border border-white/15 hover:border-[#D6001C] transition-colors"
            >
              ×
            </button>
          </div>

          <m.div
            className="relative w-full max-w-6xl mx-4 aspect-video bg-black border border-white/15"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <video
              ref={fullRef}
              className="w-full h-full object-cover"
              poster={REEL_POSTER}
              controls
              loop
              playsInline
              preload="metadata"
            >
              <source src={REEL_MP4} type="video/mp4" />
            </video>
          </m.div>

          <div className="absolute bottom-6 left-0 right-0 text-center">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/30">
              esc / click outside to close
            </span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
