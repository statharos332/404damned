import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEur(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(amount);
}

/** Picks the English or Dutch variant of a parallel data array/object by locale. */
export function pickLocale<T>(en: T, nl: T, locale: string): T {
  return locale === "nl" ? nl : en;
}
