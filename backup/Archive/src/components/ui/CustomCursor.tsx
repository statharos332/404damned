"use client";

import { useEffect, useRef } from "react";

/**
 * 404 DAMNED — brushstroke "X" cursor (from the business card).
 * A rough red SVG X that follows the mouse with smooth lag, tilts
 * with velocity, grows on hover, shrinks on click.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    const svg = svgRef.current;
    if (!el || !svg) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let lastX = mx;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover]")) {
        el.classList.add("cursor-hovering");
      } else {
        el.classList.remove("cursor-hovering");
      }
    };
    const onDown = () => el.classList.add("cursor-click");
    const onUp = () => el.classList.remove("cursor-click");

    const loop = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      const vel = mx - lastX;
      lastX = mx;
      const rot = Math.max(-18, Math.min(18, vel * 0.6));
      el.style.left = cx + "px";
      el.style.top = cy + "px";
      svg.style.transform = `rotate(${rot}deg)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div ref={ref} className="x-cursor" aria-hidden>
      <svg ref={svgRef} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="x-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="6" />
          </filter>
        </defs>
        <g filter="url(#x-rough)" fill="#D6001C">
          <path d="M18 12 L30 8 L88 78 L80 92 L70 90 L14 22 Z" />
          <path d="M82 10 L92 20 L34 90 L22 94 L12 86 L70 16 Z" />
          <circle cx="90" cy="14" r="3" />
          <circle cx="8" cy="88" r="2.5" />
          <circle cx="95" cy="82" r="2" />
          <circle cx="6" cy="20" r="2" />
        </g>
      </svg>
    </div>
  );
}
