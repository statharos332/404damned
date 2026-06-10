"use client";

import Image from "next/image";

/**
 * Renders a project cover that can be EITHER an image or a video.
 * If `src` ends in .mp4 / .webm / .mov → autoplay muted looping video.
 * Otherwise → optimized next/image. Drop-in for the old <Image> covers.
 *
 * `poster` (optional) shows while a video loads / on reduced-motion.
 */
export function CoverMedia({
  src,
  alt,
  poster,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 700px",
  className = "object-cover w-full h-full",
}: {
  src: string;
  alt: string;
  poster?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const isVideo = /\.(mp4|webm|mov)$/i.test(src);

  if (isVideo) {
    return (
      <video
        className={className}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
