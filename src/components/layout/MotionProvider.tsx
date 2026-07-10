"use client";

import { LazyMotion } from "framer-motion";

// Dynamically import the DOM animation feature set so it is only fetched when a
// page actually renders an `m.*` component. Pages with no motion (legal,
// insights, 404) never download the framer feature bundle at all.
const loadFeatures = () =>
  import("framer-motion").then((mod) => mod.domAnimation);

/**
 * Loads only the DOM animation feature set of Framer Motion, lazily, instead of
 * the full `motion` bundle. Every component uses the lightweight `m.*` API, so
 * the heavy feature code is code-split out of the initial JS (smaller bundle,
 * less main-thread work on first load). `strict` makes any stray `motion.*`
 * throw, keeping the whole app on the lazy path.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
