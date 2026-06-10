"use client";

/** Lama-Lama style bracketed section label: [ our vibe ] */
export function SectionLabel({
  children,
  accent = "red",
}: {
  children: React.ReactNode;
  accent?: "red" | "electric" | "lime";
}) {
  const color =
    accent === "electric"
      ? "text-[#00E5FF]"
      : accent === "lime"
      ? "text-[#C6FF00]"
      : "text-[#D6001C]";
  return (
    <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] ${color}`}>
      <span className="opacity-60">[</span>
      <span>{children}</span>
      <span className="opacity-60">]</span>
    </div>
  );
}
