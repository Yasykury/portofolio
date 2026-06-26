import { site } from "@/lib/site";
import { FadeIn } from "@/components/ui/FadeIn";
import { RotatingWord } from "@/components/ui/RotatingWord";
import { ContactButton, GhostButton } from "@/components/ui/buttons";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Craft", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Animated avatar — right side on all screens. Black-bg video blends
          into the dark hero; masked to fade out on the left so the copy reads. */}
      <div
        className="absolute inset-y-0 right-0 z-0 w-[86%] overflow-hidden sm:w-[64%] lg:w-[44%]"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 38%)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 38%)",
        }}
      >
        <video
          className="h-full w-full object-cover object-[center_top]"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/avatar_01-poster.jpg"
        >
          <source src="/avatar_01.webm" type="video/webm" />
          <source src="/avatar_01.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Legibility scrims — keep the copy readable over the avatar */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-bg from-30% to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-bg via-transparent to-transparent" />

      {/* Top bar */}
      <header className="shell container-px relative z-30 flex items-center justify-between pt-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink font-display text-sm font-extrabold text-bg">
            {site.monogram}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            {site.shortName}
          </span>
        </a>
        <nav className="flex items-center gap-5 font-mono text-[0.7rem] uppercase tracking-[0.18em] sm:gap-7 sm:text-xs">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden text-ink-soft transition-colors duration-200 hover:text-ink sm:inline"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-warm transition-opacity duration-200 hover:opacity-80 sm:hidden"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Hero copy */}
      <div className="shell container-px relative z-20 flex flex-1 flex-col justify-center py-16 lg:pr-[42%]">
        <FadeIn as="div" playOnMount delay={0.05} y={16}>
          <p className="mono-label flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-warm animate-blink" />
            Showreel 00:00 — {site.availability}
          </p>
        </FadeIn>

        <h1 className="mt-6 font-display text-[14vw] font-extrabold leading-[0.95] tracking-tight sm:text-[12vw] md:text-[9vw] lg:text-[6.5rem] xl:text-[7.5rem]">
          <FadeIn as="div" playOnMount delay={0.12} y={40}>
            <span className="block">I make</span>
          </FadeIn>
          <FadeIn as="div" playOnMount delay={0.22} y={40}>
            <span className="block">
              brands{" "}
              <RotatingWord
                words={["move", "flow", "pop", "sell", "grow"]}
                className="text-grade"
              />
            </span>
          </FadeIn>
        </h1>

        <FadeIn as="div" playOnMount delay={0.36} y={20}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            {site.name} — {site.role.toLowerCase()} crafting video, motion
            graphics &amp; brand design. Seven years turning ideas into motion
            that earns attention.
          </p>
        </FadeIn>

        <FadeIn as="div" playOnMount delay={0.48} y={20}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ContactButton />
            <GhostButton label="See the work" href="#work" />
          </div>
        </FadeIn>
      </div>

      {/* Bottom scrub hint */}
      <div className="shell container-px relative z-20 flex items-center justify-between pb-7 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-muted">
        <span>{site.location}</span>
        <span className="hidden sm:inline">Scroll to scrub ↓</span>
      </div>
    </section>
  );
}
