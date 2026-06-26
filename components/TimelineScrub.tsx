"use client";

import { useEffect, useState } from "react";

// The page framed as an editing timeline. Each section is a keyframe with a
// timecode; scrolling scrubs the playhead and advances the live timecode.
const MARKERS = [
  { id: "top", label: "Intro", tc: "00:00" },
  { id: "reel", label: "Reel", tc: "00:08" },
  { id: "work", label: "Work", tc: "00:21" },
  { id: "about", label: "About", tc: "00:42" },
  { id: "services", label: "Craft", tc: "00:58" },
  { id: "contact", label: "Contact", tc: "01:15" },
];

const TOTAL_SECONDS = 95; // 01:35 total "runtime"

function formatTC(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function TimelineScrub() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        setProgress(p);
        // active section = last one whose top passed 45% of viewport
        let idx = 0;
        MARKERS.forEach((m, i) => {
          const el = document.getElementById(m.id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
            idx = i;
          }
        });
        setActive(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const liveTC = formatTC(progress * TOTAL_SECONDS);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile: slim top playhead bar + corner timecode */}
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-line lg:hidden">
        <div
          className="h-full bg-warm"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="mono-label fixed bottom-3 left-3 z-50 flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 backdrop-blur lg:hidden">
        <span className="h-1.5 w-1.5 rounded-full bg-warm animate-blink" />
        <span className="text-ink">{liveTC}</span>
        <span className="text-ink-muted">/ {formatTC(TOTAL_SECONDS)}</span>
      </div>

      {/* Desktop: right-side timeline rail */}
      <aside
        aria-hidden
        className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
      >
        <div className="mono-label mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-warm animate-blink" />
          REC
        </div>
        <div className="relative ml-[5px] flex flex-col gap-7 border-l border-line pl-5">
          {MARKERS.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => jump(m.id)}
              className="group flex cursor-pointer items-center gap-3 text-left"
            >
              <span
                className={`block h-2 w-2 rotate-45 border transition-all duration-200 ${
                  active === i
                    ? "scale-125 border-warm bg-warm shadow-[0_0_10px_rgba(255,107,53,0.75)]"
                    : "border-line-strong bg-transparent group-hover:border-ink-soft"
                }`}
                style={{ marginLeft: "-25px" }}
              />
              <span className="flex flex-col leading-tight">
                <span
                  className={`font-mono text-[0.65rem] tracking-widest transition-colors duration-200 ${
                    active === i ? "text-warm" : "text-ink-muted"
                  }`}
                >
                  {m.tc}
                </span>
                <span
                  className={`text-[0.7rem] uppercase tracking-wider transition-colors duration-200 ${
                    active === i
                      ? "text-ink"
                      : "text-ink-muted group-hover:text-ink-soft"
                  }`}
                >
                  {m.label}
                </span>
              </span>
            </button>
          ))}
        </div>
        <div className="mono-label mt-4 text-ink">
          <span className="text-warm">{liveTC}</span> / {formatTC(TOTAL_SECONDS)}
        </div>
      </aside>
    </>
  );
}
