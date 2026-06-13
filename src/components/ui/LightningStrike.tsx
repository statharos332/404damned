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
  onVideo?: boolean;
}

// Builds several jagged "electric arm" paths radiating from an impact point,
// used when lightning strikes the video so it looks like current crawling
// across the footage.
function makeTendrils(cx: number, cy: number): string[] {
  const arms = 7;
  const out: string[] = [];
  for (let a = 0; a < arms; a++) {
    const baseAngle = (a / arms) * Math.PI * 2 + Math.random() * 0.5;
    const segs = 4 + Math.floor(Math.random() * 3);
    let x = cx;
    let y = cy;
    let d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    let angle = baseAngle;
    for (let s = 1; s <= segs; s++) {
      const len = 18 + Math.random() * 34;
      angle += (Math.random() - 0.5) * 1.1; // wander
      x += Math.cos(angle) * len;
      y += Math.sin(angle) * len;
      d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    out.push(d);
  }
  return out;
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
      if (btn) {
        // interactive element → full electric shell (box glow + shake)
        target.classList.add("electrified");
      } else {
        // heading/word → ONLY the letters flicker, no box glow
        target.classList.add("electric-text");
      }
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

      // Did the bolt land on a video? If so, fire an extra "electric impact"
      // burst at that point so it looks like real lightning hit the footage.
      const onVideo = !!(e.target as HTMLElement)?.closest?.(
        "video, .lightning-impact-surface"
      );

      setBolts((b) => [...b, { id, x, y, path: main, forks, onVideo }]);
      electrify(e.target as Element);

      window.setTimeout(() => {
        setBolts((b) => b.filter((bolt) => bolt.id !== id));
      }, 900);
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

          {/* extra electric burst when the bolt strikes a video */}
          {bolt.onVideo && (
            <g className="video-impact">
              {/* hot radial glow at the point of impact */}
              <circle
                cx={bolt.x}
                cy={bolt.y}
                r="2"
                className="video-impact-glow"
              />
              {/* electric tendrils crawling out across the footage */}
              {makeTendrils(bolt.x, bolt.y).map((d, i) => (
                <path
                  key={i}
                  d={d}
                  className="video-impact-tendril"
                  fill="none"
                  style={{ animationDelay: `${i * 0.015}s` }}
                />
              ))}
              {/* third expanding shock ring */}
              <circle
                cx={bolt.x}
                cy={bolt.y}
                r="6"
                className="impact-ring video-shock-ring"
                fill="none"
              />
            </g>
          )}
        </svg>
      ))}
    </div>
  );
}
