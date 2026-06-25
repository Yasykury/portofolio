import { site, skills } from "@/lib/site";
import { HeroAvatar } from "@/components/HeroAvatar";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";

export function Hero() {
  return (
    <section
      id="top"
      className="bg-noise relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Decorative grid + glows */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div
        className="glow animate-glow-pulse"
        style={{
          width: "48rem",
          height: "48rem",
          top: "-14rem",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.38), transparent 70%)",
        }}
      />
      <div
        className="glow"
        style={{
          width: "42rem",
          height: "42rem",
          bottom: "-12rem",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(219,39,119,0.22), transparent 70%)",
        }}
      />

      {/* Chrome headline (sits behind the avatar) */}
      <div className="pointer-events-none absolute inset-x-0 top-[16%] z-10 flex justify-center px-3">
        <h1 className="text-chrome whitespace-nowrap text-center font-poster leading-[0.85] tracking-[0.01em] text-[clamp(2.75rem,12.5vw,9.5rem)] drop-shadow-[0_4px_3px_rgba(0,0,0,0.55)]">
          HI, I&apos;M {site.shortName.toUpperCase()}
        </h1>
      </div>

      {/* Mobile/tablet gap-filler — keeps the space above the avatar alive.
          Hidden on desktop where the larger avatar already fills the hero. */}
      <div className="absolute inset-x-0 top-[28%] z-30 flex flex-col items-center gap-4 px-6 text-center lg:hidden">
        <Reveal delay={0.1}>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-medium text-ink-soft backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {site.availability}
          </span>
        </Reveal>
        <RevealGroup
          stagger={0.07}
          className="flex max-w-xs flex-wrap justify-center gap-2"
        >
          {skills.slice(0, 5).map((skill) => (
            <Reveal
              key={skill}
              as="li"
              className="rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-xs font-medium text-ink-soft backdrop-blur"
            >
              {skill}
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      {/* Avatar (interactive parallax) */}
      <HeroAvatar />

      {/* Bottom scrim keeps the tagline + CTA legible over the avatar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-2/5 bg-gradient-to-t from-bg via-bg/85 to-transparent" />

      {/* Foreground copy */}
      <div className="shell container-px relative z-30 mt-auto flex flex-col gap-6 pb-10 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-xs text-xs font-medium uppercase leading-relaxed tracking-[0.18em] text-ink-soft">
          A {site.role.toLowerCase()} crafting striking &amp; unforgettable
          visuals.
        </p>

        <a
          href="#contact"
          className="btn-glow group inline-flex w-fit cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide"
        >
          Contact me
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
