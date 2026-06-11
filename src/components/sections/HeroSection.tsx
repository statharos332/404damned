"use client";

import { useRef, useEffect, useState } from "react";

export function HeroSection() {
    const heroRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [textFade, setTextFade] = useState(1);

    // Fade the copy out as you scroll down through the hero.
    useEffect(() => {
        const onScroll = () => {
            if (!heroRef.current) return;
            const el = heroRef.current;
            const max = el.offsetHeight - window.innerHeight;
            const scrolled = Math.min(max, Math.max(0, -el.getBoundingClientRect().top));
            const p = max > 0 ? scrolled / max : 0;
            setTextFade(Math.max(0, 1 - p / 0.5));
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Pause the video when the hero scrolls off-screen (saves CPU/battery),
    // resume when it returns. Keeps Core Web Vitals clean.
    useEffect(() => {
        const v = videoRef.current;
        if (!v || typeof IntersectionObserver === "undefined") return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) v.play().catch(() => {});
                    else v.pause();
                });
            },
            { threshold: 0.05 }
        );
        io.observe(v);
        return () => io.disconnect();
    }, []);

    return (
        // Tall scroll container so the copy can fade as you move down.
        <div ref={heroRef} className="relative h-[180vh] bg-[#04060c]">
            {/* Sticky viewport holds the looping video + copy */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Looping background video — muted, no controls, autoplay */}
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    poster="/video/hero_poster.webp"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                >
                    <source src="/video/hero_opt.webm" type="video/webm" />
                    <source src="/video/hero_opt.mp4" type="video/mp4" />
                </video>

                {/* Cinematic gradient mask for text legibility */}
                <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-[#04060c] via-[#04060c]/30 via-40% to-[#04060c]/40" />

                {/* Hero copy — bottom-left text, bottom-right buttons. Fades on scroll. */}
                <div
                    className="absolute inset-x-0 bottom-0 z-[3] px-6 sm:px-10 lg:px-16 pb-14 sm:pb-16 transition-opacity duration-200"
                    style={{ opacity: textFade }}
                >
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        {/* Left: badge + headline */}
                        <div className="max-w-xl pointer-events-none">
                            <div className="inline-flex items-center gap-3 border border-white/10 bg-[#04060c]/40 backdrop-blur px-4 py-2 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D6001C] animate-pulse" />
                                <span className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.3em] uppercase text-white/45 font-bold">
                  Amsterdam &middot; Digital Weapons Manufacturer
                </span>
                            </div>

                            <h1 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.6rem,6vw,6rem)] text-white">
                                <span className="block">Code.</span>
                                <span className="block text-[#D6001C] [text-shadow:0_0_80px_rgba(214,0,28,0.5)]">
                  Create.
                </span>
                                <span className="block text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.2)]">
                  Dominate.
                </span>
                            </h1>
                        </div>

                        {/* Right: actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 sm:gap-5 lg:gap-4 shrink-0">
                            <a
                                href="#contact"
                                className="w-full sm:w-auto text-center bg-[#D6001C] hover:bg-[#FF1A35] text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5"
                            >
                                Book a Strategy Call &rarr;
                            </a>
                            <a
                                href="#work"
                                className="w-full sm:w-auto text-center lg:text-right text-white/50 hover:text-white text-xs font-bold tracking-[0.18em] uppercase transition-colors flex items-center justify-center lg:justify-end gap-2"
                            >
                                <span className="w-8 h-px bg-current" />
                                View Our Work
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
