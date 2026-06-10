import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Ship smaller, faster JS
  compiler: {
    // strip console.* in production (keeps errors)
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  // Tree-shake big libraries so only what you use is bundled
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@react-three/drei",
    ],
  },

  images: {
    // Modern formats = much smaller files
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Allow the branded .svg placeholders to render via <Image>.
    // (When you replace them with .jpg/.png screenshots this is harmless.)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Long-cache the heavy 3D assets (they rarely change)
  async headers() {
    return [
      {
        source: "/:all*(glb|gltf|hdr|exr|mp4|webm)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  webpack: (config) => {
    // three.js + HDR + GLTF imports stability
    config.module.rules.push({
      test: /\.(glb|gltf|hdr|exr)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
