"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
}, []);

// Text mask reveal animation
export function useTextMaskReveal(
  selector: string,
  options?: { delay?: number; stagger?: number }
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const elements = ref.current.querySelectorAll(selector);

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 100,
        opacity: 0,
        stagger: options?.stagger ?? 0.1,
        duration: 1.2,
        delay: options?.delay ?? 0,
        ease: "power4.out",
      });
    }, ref);

    return () => ctx.revert();
  }, [selector, options?.delay, options?.stagger]);

  return ref;
}

// Parallax on scroll
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: `${speed * 100}%`,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

// Count-up animation
export function useCountUp(
  target: number,
  duration: number = 2,
  prefix: string = "",
  suffix: string = ""
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const obj = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        value: target,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [target, duration, prefix, suffix]);

  return ref;
}

// Floating ambient lights component
export function AmbientLights({ color = "#D6001C" }: { color?: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.04] animate-[float_8s_ease-in-out_infinite]"
        style={{ background: color }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full blur-[200px] opacity-[0.03] animate-[float_12s_ease-in-out_infinite_reverse]"
        style={{ background: color }}
      />
    </div>
  );
}

// Scroll-triggered fade-in
export function useFadeInOnScroll(delay: number = 0) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        delay,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, [delay]);

  return ref;
}

// Stagger children on scroll
export function useStaggerChildren(
  childSelector: string = "*",
  options?: { stagger?: number; y?: number }
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const children = ref.current.querySelectorAll(childSelector);

    const ctx = gsap.context(() => {
      gsap.from(children, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: options?.y ?? 30,
        stagger: options?.stagger ?? 0.08,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, [childSelector, options?.stagger, options?.y]);

  return ref;
}
