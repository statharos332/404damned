import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,



    images: {
        formats: ["image/avif", "image/webp"],
        unoptimized: true, // 🔥 IMPORTANT για HDR / GLB / textures
    },

    webpack: (config) => {
        // 🔥 important για three.js + HDR + GLTF imports stability
        config.module.rules.push({
            test: /\.(glb|gltf|hdr|exr)$/i,
            type: "asset/resource",
        });

        return config;
    },
};

export default nextConfig;