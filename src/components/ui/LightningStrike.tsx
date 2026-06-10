"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ⚡ Global lightning-on-click.
 * On any click, a jagged bolt strikes from the top of the screen down to
 * the cursor, a flash + impact ring fire at the point, and the clicked
 * interactive element briefly "electrifies".
 *
 * Pure DOM/SVG + CSS — no deps. Respects reduced-motion. Skips clicks on
 * inputs/textareas so typing/scrolling stays clean.
 */

interface Bolt {
  id: number;
  x: number;
  y: number;
  path: string;
  forks: string[];
}

export function LightningStrike() {
  const [bolts, setBolts] = useState<Bolt[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Build a jagged main path from top (y=0) to the impact point,
    // and return the vertex points so we can sprout branches off them.
    const makeBolt = (x: number, y: number) => {
      const segments = Math.max(7, Math.round(y / 42));
      const pts: { x: number; y: number }[] = [{ x, y: -20 }];
      let prevX = x;
      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const py = y * t;
        const jitter = (1 - t) * 70 + 14;
        const px = i === segments ? x : prevX + (Math.random() - 0.5) * jitter;
        pts.push({ x: px, y: py });
        prevX = px;
      }
      const toPath = (arr: { x: number; y: number }[]) =>
        arr
          .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
          .join(" ");

      const main = toPath(pts);

      // sprout 2–4 short jagged forks off random mid vertices
      const forks: string[] = [];
      const forkCount = 2 + Math.floor(Math.random() * 3);
      for (let f = 0; f < forkCount; f++) {
        const start = pts[2 + Math.floor(Math.random() * (pts.length - 3))];
        if (!start) continue;
        const len = 3 + Math.floor(Math.random() * 3);
        const dir = Math.random() > 0.5 ? 1 : -1;
        const fpts = [start];
        let fx = start.x;
        let fy = start.y;
        for (let s = 1; s <= len; s++) {
          fx += dir * (12 + Math.random() * 26);
          fy += 10 + Math.random() * 24;
          fpts.push({ x: fx, y: fy });
        }
        forks.push(toPath(fpts));
      }
      return { main, forks };
    };

    const electrify = (el: Element | null) => {
      if (!el) return;
      // interactive elements get the full electric shell
      const btn = el.closest(
        "button, a, [role='button'], input[type='submit'], .electrify"
      );
      // headings / words get the text-zap flicker
      const text = el.closest(
        "h1, h2, h3, h4, .electric-text"
      );
      const target = (btn || text) as HTMLElement | null;
      if (!target) return;
      target.classList.remove("electrified", "electric-text");
      void target.offsetWidth;
      target.classList.add("electrified");
      if (text && !btn) target.classList.add("electric-text");
      window.setTimeout(
        () => target.classList.remove("electrified", "electric-text"),
        900
      );
    };

    const onClick = (e: MouseEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      // clientX/Y are viewport-relative — correct for our position:fixed layer
      const x = e.clientX;
      const y = e.clientY;
      if (x === 0 && y === 0) return; // ignore synthetic/keyboard clicks

      const id = idRef.current++;
      const { main, forks } = makeBolt(x, y);

      setBolts((b) => [...b, { id, x, y, path: main, forks }]);
      electrify(e.target as Element);

      window.setTimeout(() => {
        setBolts((b) => b.filter((bolt) => bolt.id !== id));
      }, 700);
    };

    // capture phase on window → fires even if something stops propagation
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  return (
    <div className="lightning-layer" aria-hidden="true">
      {bolts.map((bolt) => (
        <svg
          key={bolt.id}
          className="lightning-svg"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        >
          {/* screen flash on strike */}
          <rect x="0" y="0" width="100%" height="100%" className="screen-flash" />
          {/* red ambient glow — widest, lowest opacity */}
          <path d={bolt.path} className="bolt bolt-glow-red" fill="none" />
          {/* electric-blue glow underlay */}
          <path d={bolt.path} className="bolt bolt-glow" fill="none" />
          {/* forks / branches */}
          {bolt.forks.map((f, i) => (
            <path key={i} d={f} className="bolt bolt-fork" fill="none" />
          ))}
          {/* core bolt */}
          <path d={bolt.path} className="bolt bolt-core" fill="none" />
          {/* impact flash + double ring */}
          <circle cx={bolt.x} cy={bolt.y} r="4" className="impact-flash" />
          <circle cx={bolt.x} cy={bolt.y} r="6" className="impact-ring" fill="none" />
          <circle cx={bolt.x} cy={bolt.y} r="6" className="impact-ring impact-ring-2" fill="none" />
        </svg>
      ))}
    </div>
  );
}
