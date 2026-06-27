"use client";

import { useEffect, useRef, useState } from "react";

export type MediaItem = { src: string; type: "image" | "video" };

export function WorkGallery({ media }: { media: MediaItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  // Aspect ratio (w/h) per item, measured once the media loads. Drives the
  // justified flex layout so every row fills the full width with no gaps.
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const setRatio = (i: number, ar: number) =>
    setRatios((r) => (r[i] || !isFinite(ar) || ar <= 0 ? r : { ...r, [i]: ar }));

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((i) => (i === null ? null : (i + 1) % media.length));
      if (e.key === "ArrowLeft")
        setActive((i) =>
          i === null ? null : (i - 1 + media.length) % media.length,
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, media.length]);

  return (
    <>
      <div className="flex flex-wrap items-start gap-4">
        {media.map((m, i) => {
          const ar = ratios[i] ?? 1.5; // default until measured
          return (
            <button
              key={m.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label="Open preview"
              style={{ flexGrow: ar, flexBasis: `${ar * 14}rem` }}
              className="group relative block cursor-pointer overflow-hidden rounded-xl border border-line bg-surface max-sm:!grow-0 max-sm:!basis-full"
            >
              {m.type === "video" ? (
                <AutoVideo src={m.src} onReady={(r) => setRatio(i, r)} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.src}
                  alt=""
                  loading="lazy"
                  ref={(el) => {
                    if (el && el.complete && el.naturalWidth)
                      setRatio(i, el.naturalWidth / el.naturalHeight);
                  }}
                  onLoad={(e) =>
                    setRatio(
                      i,
                      e.currentTarget.naturalWidth /
                        e.currentTarget.naturalHeight,
                    )
                  }
                  className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
                />
              )}
              {/* hover overlay */}
              <span className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/55 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white">
                  {m.type === "video" ? <PlayIcon /> : <ExpandIcon />}
                  {m.type === "video" ? "Play" : "View"}
                </span>
              </span>
              {m.type === "video" && (
                <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-white backdrop-blur">
                  Video
                </span>
              )}
            </button>
          );
        })}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
          >
            <CloseIcon />
          </button>

          {media.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((active - 1 + media.length) % media.length);
                }}
                className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:left-6"
              >
                <ChevronIcon dir="left" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((active + 1) % media.length);
                }}
                className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-6"
              >
                <ChevronIcon dir="right" />
              </button>
            </>
          )}

          <div
            className="max-h-[88vh] max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {media[active].type === "video" ? (
              <video
                key={media[active].src}
                src={media[active].src}
                className="max-h-[88vh] max-w-[92vw] rounded-xl"
                controls
                autoPlay
                loop
                playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={media[active].src}
                alt=""
                className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain"
              />
            )}
          </div>

          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-white/60">
            {active + 1} / {media.length}
          </span>
        </div>
      )}
    </>
  );
}

function AutoVideo({
  src,
  onReady,
}: {
  src: string;
  onReady: (ratio: number) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (v.videoWidth) onReady(v.videoWidth / v.videoHeight);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      onLoadedMetadata={(e) =>
        onReady(e.currentTarget.videoWidth / e.currentTarget.videoHeight)
      }
      className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );
}

/* — inline icons (no emoji) — */
function PlayIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function ExpandIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
