"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Loads only the DOM animation feature set of Framer Motion, lazily, instead of
 * the full `motion` bundle. Every component uses the lightweight `m.*` API, so
 * the heavy feature code is code-split out of the initial JS (smaller bundle,
 * less main-thread work on first load). `strict` makes any stray `motion.*`
 * throw, keeping the whole app on the lazy path.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
