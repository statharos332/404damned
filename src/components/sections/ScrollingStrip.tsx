"use client";

/**
 * Big infinite scrolling marquee strip (Lama Lama signature).
 * Alternating words in red + electric, with outlined + filled mix.
 */
export function ScrollingStrip({
  words = ["CODE", "CREATE", "DOMINATE"],
  reverse = false,
}: {
  words?: string[];
  reverse?: boolean;
}) {
  // duplicate enough times for a seamless loop
  const items = Array.from({ length: 4 }).flatMap(() => words);

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[#050505] py-6">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} 22s linear infinite`,
          width: "max-content",
        }}
      >
        {items.map((word, i) => (
          <span key={i} className="flex items-center">
            <span
              className={
                i % 3 === 0
                  ? "text-white"
                  : i % 3 === 1
                  ? "text-[#D6001C]"
                  : "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.3)]"
              }
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.5rem,7vw,6rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                padding: "0 2rem",
              }}
            >
              {word}
            </span>
            <span
              className="text-[#00E5FF] px-2"
              style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(1.5rem,4vw,3rem)" }}
            >
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
