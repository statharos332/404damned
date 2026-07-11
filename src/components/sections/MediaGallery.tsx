"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { LazyVideo } from "@/components/ui/LazyVideo";
import type { Project } from "@/data/projects";

/**
 * Contact-sheet media gallery.
 *
 * A single left-aligned row of small "film cells" (videos stay alive). Click
 * one and it expands into a cinematic lightbox stage: the media at its own
 * natural size, a mono HUD counter, a filmstrip to jump between shots, and
 * keyboard nav. Nothing is cropped or forced — whatever media you drop in
 * just sits, small in the row and large on the stage.
 */
export function MediaGallery({ project }: { project: Project }) {
  const media = project.media;
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((i) =>
        i === null ? i : (i + dir + media.length) % media.length
      ),
    [media.length]
  );

  // Lock scroll + wire keyboard while the lightbox is open.
  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <>
      {/* ── Contact sheet: one left-aligned row of small cells ── */}
      <div
        className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-thin"
        aria-hidden={open !== null}
      >
        {media.map((mi, idx) => (
          <button
            key={idx}
            onClick={() => setOpen(idx)}
            aria-label={`Open ${project.client} media ${idx + 1} of ${media.length}`}
            className="group/cell relative shrink-0 h-24 sm:h-28 overflow-hidden border border-white/10 bg-[#0a0a0a] transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#00E5FF] focus-visible:outline-none focus-visible:border-[#00E5FF] cursor-pointer"
          >
            {mi.type === "video" ? (
              <LazyVideo
                src={mi.src}
                poster={mi.poster}
                className="h-24 sm:h-28 w-auto object-cover opacity-80 transition-opacity duration-300 group-hover/cell:opacity-100"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mi.src}
                alt={`${project.client} ${idx + 1}`}
                loading="lazy"
                decoding="async"
                className="block h-24 sm:h-28 w-auto object-cover opacity-80 transition-opacity duration-300 group-hover/cell:opacity-100"
              />
            )}
            {/* index tag */}
            <span className="absolute top-1 left-1 font-mono text-[0.5rem] leading-none text-white/70 bg-black/40 px-1 py-0.5">
              {String(idx + 1).padStart(2, "0")}
            </span>
            {/* type + expand affordance */}
            <span className="absolute bottom-1 right-1 font-mono text-[0.5rem] leading-none text-[#00E5FF] opacity-0 group-hover/cell:opacity-100 transition-opacity">
              {mi.type === "video" ? "▶" : "⤢"}
            </span>
            <span className="pointer-events-none absolute inset-0 scanlines opacity-0 group-hover/cell:opacity-100 transition-opacity" />
          </button>
        ))}
        <span className="self-center pl-1 font-mono text-[0.6rem] uppercase tracking-widest text-gray-600 whitespace-nowrap">
          {String(media.length).padStart(2, "0")} shots · tap to enlarge
        </span>
      </div>

      {/* ── Lightbox stage ── */}
      <AnimatePresence>
        {open !== null && (
          <m.div
            className="fixed inset-0 z-[10000] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.client} media viewer`}
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* backdrop: near-black + blur + faint red brand glow */}
            <div
              className="absolute inset-0 bg-[#050505]/92 backdrop-blur-md"
              style={{
                backgroundImage:
                  "radial-gradient(720px 480px at 50% 30%, rgba(214,0,28,0.14), transparent 65%)",
              }}
              onClick={close}
            />

            {/* HUD top bar */}
            <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5">
              <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.3em]">
                <span className="w-2 h-2 rounded-full bg-[#D6001C] animate-pulse" />
                <span className="text-white/80">{project.client}</span>
              </div>
              <div className="flex items-center gap-5">
                <span className="font-mono text-xs text-white/60 tabular-nums">
                  <span className="text-[#00E5FF]">
                    {String(open + 1).padStart(2, "0")}
                  </span>{" "}
                  / {String(media.length).padStart(2, "0")}
                </span>
                <button
                  ref={closeBtnRef}
                  onClick={close}
                  aria-label="Close"
                  className="w-10 h-10 flex items-center justify-center border border-white/15 text-white/70 hover:text-[#D6001C] hover:border-[#D6001C] transition-colors font-mono text-xl focus-visible:outline-none focus-visible:border-[#00E5FF]"
                >
                  ×
                </button>
              </div>
            </div>

            {/* body: stage + filmstrip (vertical on the right, bottom on mobile) */}
            <div className="relative z-10 flex-1 min-h-0 flex flex-col sm:flex-row">
              {/* stage */}
              <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-8 py-2">
                {/* prev / next */}
                {media.length > 1 && (
                  <>
                    <button
                      onClick={() => go(-1)}
                      aria-label="Previous"
                      className="absolute left-2 sm:left-4 z-20 w-11 h-11 flex items-center justify-center border border-white/15 bg-black/30 text-white/70 hover:text-[#00E5FF] hover:border-[#00E5FF] transition-colors font-mono text-lg focus-visible:outline-none focus-visible:border-[#00E5FF]"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => go(1)}
                      aria-label="Next"
                      className="absolute right-2 sm:right-4 z-20 w-11 h-11 flex items-center justify-center border border-white/15 bg-black/30 text-white/70 hover:text-[#00E5FF] hover:border-[#00E5FF] transition-colors font-mono text-lg focus-visible:outline-none focus-visible:border-[#00E5FF]"
                    >
                      ›
                    </button>
                  </>
                )}

                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={open}
                    className="relative border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden"
                    initial={
                      reduce
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.94, y: 10 }
                    }
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    {/* electric frame accent */}
                    <span className="pointer-events-none absolute inset-0 z-10 border border-[#00E5FF]/0 [box-shadow:inset_0_0_0_1px_rgba(0,229,255,0.15)]" />
                    {media[open].type === "video" ? (
                      <LazyVideo
                        src={media[open].src}
                        poster={media[open].poster}
                        className="max-h-[56vh] sm:max-h-[80vh] max-w-[92vw] sm:max-w-[70vw] w-auto h-auto"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={media[open].src}
                        alt={`${project.client} ${open + 1}`}
                        className="block max-h-[56vh] sm:max-h-[80vh] max-w-[92vw] sm:max-w-[70vw] w-auto h-auto"
                      />
                    )}
                  </m.div>
                </AnimatePresence>
              </div>

              {/* filmstrip — horizontal bottom on mobile, vertical column on the right on desktop */}
              <div className="shrink-0 flex sm:flex-col gap-2 items-center justify-center sm:justify-center px-5 py-4 sm:px-4 sm:py-6 sm:w-28 lg:w-32 overflow-x-auto sm:overflow-x-hidden sm:overflow-y-auto scrollbar-thin">
                {media.map((mi, idx) => (
                  <button
                    key={idx}
                    onClick={() => setOpen(idx)}
                    aria-label={`Go to media ${idx + 1}`}
                    aria-current={idx === open}
                    className={`relative shrink-0 h-12 w-16 sm:w-full sm:h-16 lg:h-20 overflow-hidden border transition-all duration-300 ${
                      idx === open
                        ? "border-[#00E5FF] opacity-100"
                        : "border-white/10 opacity-50 hover:opacity-90"
                    }`}
                  >
                    {mi.poster || mi.type === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mi.poster ?? mi.src}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center bg-[#0a0a0a] font-mono text-[0.55rem] text-white/50">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
