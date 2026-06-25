import { clients } from "@/lib/site";

export function Marquee() {
  // Duplicate the list so the CSS translateX(-50%) loop is seamless.
  const row = [...clients, ...clients];

  return (
    <section aria-label="Brands I've worked with" className="border-y border-line bg-surface py-10">
      <div className="shell container-px">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
          Brands &amp; teams I&apos;ve worked with
        </p>
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-14 pr-14 group-hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="select-none font-display text-2xl font-semibold tracking-tight text-ink/35 transition-colors duration-300 hover:text-ink"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
