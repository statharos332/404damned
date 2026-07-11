"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MediaGallery } from "@/components/sections/MediaGallery";
import { AnimatePresence, m } from "framer-motion";
import { projects, getCategories, type Project } from "@/data/projects";

/**
 * Expandable work rows (brutalist). Click a row → it opens an inline
 * horizontal media strip mixing videos + portrait/landscape stills.
 * Category filter bar with a live count. Our own techno/terminal styling.
 */
export function WorkExplorer({
  featuredOnly = false,
  showFilters = true,
}: {
  featuredOnly?: boolean;
  showFilters?: boolean;
} = {}) {
  const categories = useMemo(() => getCategories(), []);
  const [filter, setFilter] = useState("All");

  const base = useMemo(
    () => (featuredOnly ? projects.filter((p) => p.featured) : projects),
    [featuredOnly]
  );
  const [open, setOpen] = useState<string | null>(base[0]?.slug ?? null);

  const filtered = useMemo(
    () => (filter === "All" ? base : base.filter((p) => p.category === filter)),
    [filter, base]
  );

  return (
    <section className="bg-[#050505]">
      {/* Filter bar */}
      {showFilters && (
      <div className="max-w-[1500px] mx-auto px-6 py-10 flex flex-wrap items-center gap-3 border-b border-white/10">
        <span className="font-mono text-xs text-gray-600 mr-2">
          [ {String(filtered.length).padStart(2, "0")} ] filter:
        </span>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-all ${
              filter === c
                ? "border-[#D6001C] text-white bg-[#D6001C]/10"
                : "border-white/15 text-gray-500 hover:text-white hover:border-white/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      )}

      {/* Rows */}
      <div className="max-w-[1500px] mx-auto px-6">
        {filtered.map((p, i) => (
          <WorkRow
            key={p.slug}
            project={p}
            index={i}
            isOpen={open === p.slug}
            onToggle={() => setOpen(open === p.slug ? null : p.slug)}
          />
        ))}
      </div>
    </section>
  );
}

function WorkRow({
  project,
  index,
  isOpen,
  onToggle,
}: {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/10 group">
      {/* Row header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-6 py-8 md:py-10 text-left"
      >
        <span className="font-mono text-xs text-gray-600 w-10 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[#D6001C]">
              {project.client}
            </span>
            <span className="hidden md:flex gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[0.6rem] uppercase tracking-wider text-gray-600 border border-white/10 px-2 py-0.5"
                >
                  {t}
                </span>
              ))}
            </span>
          </div>
          <h3
            className={`font-display font-black uppercase tracking-tight text-2xl md:text-5xl transition-colors ${
              isOpen ? "text-[#D6001C]" : "text-white group-hover:text-[#D6001C]"
            }`}
          >
            {project.title}
          </h3>
        </div>
        {/* +/- indicator */}
        <span
          className={`font-mono text-2xl md:text-3xl shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-45 text-[#00E5FF]" : "text-gray-500"
          }`}
        >
          +
        </span>
      </button>

      {/* Expandable media strip */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10">
              <p className="max-w-2xl text-gray-400 leading-relaxed mb-6">
                {project.summary}
              </p>

              {/* Contact-sheet gallery: a row of small living thumbnails that
                  expand into a cinematic lightbox on click. */}
              <MediaGallery project={project} />

              {/* result chips + CTAs */}
              <div className="flex flex-wrap items-end justify-between gap-6 mt-6">
                <div className="flex flex-wrap gap-8">
                  {project.results.map((r) => (
                    <div key={r.label}>
                      <div className="text-2xl md:text-3xl font-black text-white font-mono">
                        {r.value}
                      </div>
                      <div className="text-[0.6rem] tracking-wider uppercase text-gray-500">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="font-mono text-xs uppercase tracking-widest bg-[#D6001C] hover:bg-[#FF1A35] text-white px-6 py-3 transition-colors"
                  >
                    View case &rarr;
                  </Link>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-widest border border-white/20 hover:border-[#00E5FF] hover:text-[#00E5FF] text-white px-6 py-3 transition-colors"
                    >
                      [ live ]
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
