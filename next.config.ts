import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

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

export default nextConfig;
