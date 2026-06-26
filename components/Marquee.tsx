"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Placeholder "work preview" tiles (swap for real reels/screens later).
const row1Tiles = [
  "from-violet-500 via-fuchsia-500 to-pink-500",
  "from-blue-500 via-indigo-500 to-violet-600",
  "from-emerald-400 via-teal-500 to-cyan-600",
  "from-amber-400 via-orange-500 to-red-500",
  "from-rose-400 via-pink-500 to-fuchsia-600",
  "from-sky-400 via-blue-500 to-indigo-600",
];
const row2Tiles = [
  "from-fuchsia-500 via-purple-500 to-indigo-600",
  "from-teal-400 via-emerald-500 to-green-600",
  "from-orange-400 via-rose-500 to-pink-600",
  "from-indigo-400 via-violet-500 to-purple-600",
  "from-cyan-400 via-sky-500 to-blue-600",
  "from-pink-400 via-fuchsia-500 to-purple-600",
];

function Tile({ gradient }: { gradient: string }) {
  return (
    <div className="h-[160px] w-[250px] shrink-0 overflow-hidden rounded-2xl border border-line sm:h-[210px] sm:w-[330px] md:h-[270px] md:w-[420px]">
      <div className={`relative h-full w-full bg-gradient-to-br ${gradient}`}>
        {/* faux UI preview */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-3/4 rounded-xl bg-white/15 p-3 ring-1 ring-white/25 backdrop-blur-md">
            <div className="mb-2 h-2 w-1/2 rounded-full bg-white/70" />
            <div className="mb-1.5 h-1.5 w-3/4 rounded-full bg-white/40" />
            <div className="h-1.5 w-2/3 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const o = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(o);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  const row1 = [...row1Tiles, ...row1Tiles, ...row1Tiles];
  const row2 = [...row2Tiles, ...row2Tiles, ...row2Tiles];

  return (
    <section
      ref={ref}
      aria-label="Selected visuals"
      className="overflow-hidden pt-24 pb-10 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex w-max gap-3"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: "transform",
          }}
        >
          {row1.map((g, i) => (
            <Tile key={`r1-${i}`} gradient={g} />
          ))}
        </div>
        <div
          className="flex w-max gap-3"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: "transform",
          }}
        >
          {row2.map((g, i) => (
            <Tile key={`r2-${i}`} gradient={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
