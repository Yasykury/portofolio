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
      {/* ambient grade glows */}
      <div
        className="glow"
        style={{
          width: "40rem",
          height: "40rem",
          top: "-12rem",
          left: "-8rem",
          background: "radial-gradient(circle, rgba(63,224,197,0.16), transparent 70%)",
        }}
      />
      <div
        className="glow"
        style={{
          width: "38rem",
          height: "38rem",
          bottom: "-14rem",
          right: "-10rem",
          background: "radial-gradient(circle, rgba(255,107,53,0.16), transparent 70%)",
        }}
      />

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
      <div className="shell container-px relative z-20 flex flex-1 flex-col justify-center py-16">
        <FadeIn as="div" playOnMount delay={0.05} y={16}>
          <p className="mono-label flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-warm animate-blink" />
            Showreel 00:00 — {site.availability}
          </p>
        </FadeIn>

        <h1 className="mt-6 font-display text-[15vw] font-extrabold leading-[0.92] tracking-tight sm:text-[12vw] md:text-[10.5vw] lg:text-[9.5rem]">
          <FadeIn as="div" playOnMount delay={0.12} y={40}>
            <span className="block">I make</span>
          </FadeIn>
          <FadeIn as="div" playOnMount delay={0.22} y={40}>
            <span className="block">
              brands{" "}
              <RotatingWord
                words={["move", "flow", "pop", "convert", "stick"]}
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
