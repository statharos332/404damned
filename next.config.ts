import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import createNextIntlPlugin from "next-intl/plugin";
import { servicesNl } from "./src/data/services.nl";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Dutch service pages live at /nl/diensten/<nl-keyword-slug> instead of
// /nl/services/<slug> — real Dutch search terms in the URL, not a literal
// translation of the English route. The rewrite makes the pretty NL URL
// serve the existing /services/[slug] page internally; the redirect sends
// anyone (or Google) still holding the old /nl/services/* URL to the new
// canonical one instead of leaving two competing URLs for the same page.
const dienstenRewrites = servicesNl.map((s) => ({
  source: `/nl/diensten/${s.urlSlug ?? s.slug}`,
  destination: `/nl/services/${s.slug}`,
}));
const dienstenRedirects = servicesNl.map((s) => ({
  source: `/nl/services/${s.slug}`,
  destination: `/nl/diensten/${s.urlSlug ?? s.slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Pin the workspace root so Next stops inferring it from stray parent
  // lockfiles (was picking /Users/stathis/package-lock.json).
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),

  // Ship smaller, faster JS
  compiler: {
    // strip console.* in production (keeps errors)
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  // Tree-shake big libraries so only what you use is bundled
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  images: {
    // Modern formats = much smaller files
    formats: ["image/avif", "image/webp"],
    // Tighter, realistic breakpoints → fewer/smaller generated variants
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Allow the branded .svg placeholders to render via <Image>.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async redirects() {
    return [
      { source: "/nl/services", destination: "/nl/diensten", permanent: true },
      ...dienstenRedirects,
    ];
  },

  async rewrites() {
    return [
      { source: "/nl/diensten", destination: "/nl/services" },
      ...dienstenRewrites,
    ];
  },

  // Long-cache heavy static media + helpful security/perf headers
  async headers() {
    return [
      {
        source: "/:all*(mp4|webm|webp|avif|jpg|jpeg|png|svg)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
