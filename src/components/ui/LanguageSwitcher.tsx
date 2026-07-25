"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(nextLocale: "en" | "nl") {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center border border-white/15 shrink-0",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {(["en", "nl"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          aria-current={locale === code ? "true" : undefined}
          className={cn(
            "px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-colors duration-300",
            locale === code
              ? "bg-[#D6001C] text-white"
              : "text-gray-400 hover:text-white"
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
