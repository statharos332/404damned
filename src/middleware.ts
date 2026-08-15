import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const LOCALE_COOKIE = "NEXT_LOCALE";
// Countries whose visitors get redirected to the Dutch version on their
// first, un-decided visit. Extend with "BE" if Flemish traffic should count.
const DUTCH_GEO_COUNTRIES = new Set(["NL"]);

export default function middleware(request: NextRequest) {
  const hasLocaleCookie = request.cookies.has(LOCALE_COOKIE);
  const pathname = request.nextUrl.pathname;
  // Skip the geo-redirect for ANY explicit locale prefix, not just /nl —
  // otherwise a fresh NL visitor hitting an explicit /en/... URL (e.g. from
  // a search result or shared link) gets double-prefixed to /nl/en/... and
  // 404s. An explicit locale in the URL is the visitor's own choice; the
  // geo-redirect only exists to pick a default for un-decided visitors.
  const alreadyHasLocalePrefix = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocaleCookie && !alreadyHasLocalePrefix) {
    const country = request.headers.get("x-vercel-ip-country");
    if (country && DUTCH_GEO_COUNTRIES.has(country)) {
      const url = request.nextUrl.clone();
      url.pathname = `/nl${pathname === "/" ? "" : pathname}`;
      const response = NextResponse.redirect(url, 307);
      response.cookies.set(LOCALE_COOKIE, "nl", { path: "/", maxAge: 60 * 60 * 24 * 365 });
      return response;
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
