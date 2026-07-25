import { getTranslations } from "next-intl/server";
import { HeroVideo } from "./HeroVideo";
import { HeroScrollFade } from "./HeroScrollFade";

/**
 * Server-rendered on purpose: the badge/h1/CTAs below need zero client JS to
 * paint, so the LCP text ships as plain HTML with nothing to hydrate first.
 * The video background and the fade-on-scroll behaviour are split out into
 * their own small client islands (HeroVideo, HeroScrollFade) instead of
 * making the whole hero a client component.
 */
export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    // Tall scroll container so the copy can fade as you move down.
    // `.hero-root` is a stable hook HeroScrollFade uses to find this
    // ancestor at runtime — see that component for why.
    <div className="hero-root relative h-[180vh] bg-[#04060c]">
      {/* Sticky viewport holds the looping video + copy */}
      <div className="sticky top-0 h-screen overflow-hidden lightning-impact-surface">
        {/* Looping background video — muted, deferred until after load (idle).
            Until then the poster carries the hero as the LCP element. */}
        <HeroVideo />

        {/* Cinematic gradient mask for text legibility */}
        <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-[#04060c] via-[#04060c]/30 via-40% to-[#04060c]/40" />

        {/* Hero copy — bottom-left text, bottom-right buttons. Fades on scroll. */}
        <HeroScrollFade className="absolute inset-x-0 bottom-0 z-[3] px-6 sm:px-10 lg:px-16 pb-14 sm:pb-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            {/* Left: badge + headline */}
            <div className="max-w-xl pointer-events-none">
              <div className="inline-flex items-center gap-3 border border-white/10 bg-[#04060c]/40 backdrop-blur px-4 py-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6001C] animate-pulse" />
                <span className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.3em] uppercase text-white/45 font-bold">
                  {t("badge")}
                </span>
              </div>

              <h1 className="font-display font-black uppercase leading-[0.9] tracking-tight text-[clamp(2.6rem,6vw,6rem)] text-white">
                <span className="block">{t("headline1")}</span>
                <span className="block text-[#D6001C] [text-shadow:0_0_80px_rgba(214,0,28,0.5)]">
                  {t("headline2")}
                </span>
                <span className="block text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.2)]">
                  {t("headline3")}
                </span>
              </h1>
            </div>

            {/* Right: actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 sm:gap-5 lg:gap-4 shrink-0">
              <a
                href="#contact"
                className="w-full sm:w-auto text-center bg-[#D6001C] hover:bg-[#FF1A35] text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all hover:-translate-y-0.5"
              >
                {t("ctaBook")} &rarr;
              </a>
              <a
                href="#work"
                className="w-full sm:w-auto text-center lg:text-right text-white/50 hover:text-white text-xs font-bold tracking-[0.18em] uppercase transition-colors flex items-center justify-center lg:justify-end gap-2"
              >
                <span className="w-8 h-px bg-current" />
                {t("ctaWork")}
              </a>
            </div>
          </div>
        </HeroScrollFade>
      </div>
    </div>
  );
}
