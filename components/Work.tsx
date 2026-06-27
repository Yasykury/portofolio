"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";

export function Work({
  thumbs = {},
}: {
  /** slug → first image in public/work/<slug>/ (or null). */
  thumbs?: Record<string, string | null>;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const hoveredThumb =
    hovered !== null ? thumbs[projects[hovered].slug] : null;

  return (
    <section
      id="work"
      className="relative scroll-mt-24 py-24 md:py-32"
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
    >
      <div className="shell container-px">
        <Reveal>
          <p className="mono-label">Work // 00:21</p>
          <h2 className="mt-4 max-w-3xl font-display text-[12vw] font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Selected work
          </h2>
        </Reveal>

        <ul className="mt-12 border-t border-line md:mt-16">
          {projects.map((p, i) => {
            const thumb = thumbs[p.slug];
            return (
              <li
                key={p.title}
                className="group border-b border-line"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  href={`/work/${p.slug}`}
                  className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between md:py-8"
                >
                  <div className="flex items-baseline gap-4 md:gap-7">
                    <span className="font-mono text-xs text-ink-muted">
                      {p.year}
                    </span>
                    <h3 className="font-display text-3xl font-extrabold tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-warm sm:text-4xl md:text-5xl">
                      {p.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
                      {p.category}
                    </span>
                    <ArrowUpRight className="h-6 w-6 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-warm" />
                  </div>
                </Link>

                {/* Mobile inline preview */}
                {thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumb}
                    alt={p.title}
                    loading="lazy"
                    className="mb-6 h-40 w-full overflow-hidden rounded-xl border border-line object-cover md:hidden"
                  />
                ) : (
                  <div
                    className={`mb-6 h-32 overflow-hidden rounded-xl bg-gradient-to-br md:hidden ${p.cover}`}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Desktop: preview follows the cursor */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            className="pointer-events-none fixed z-40 hidden md:block"
            style={{ left: pos.x, top: pos.y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18 }}
          >
            {hoveredThumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hoveredThumb}
                alt=""
                className="h-[210px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 object-cover shadow-lift"
              />
            ) : (
              <div
                className={`h-[210px] w-[320px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br shadow-lift ${projects[hovered].cover}`}
              >
                <div className="flex h-full items-center justify-center p-6">
                  <div className="w-3/4 rounded-lg bg-white/15 p-3 ring-1 ring-white/25 backdrop-blur-md">
                    <div className="mb-2 h-2 w-1/2 rounded-full bg-white/70" />
                    <div className="h-1.5 w-3/4 rounded-full bg-white/40" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
