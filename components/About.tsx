import Image from "next/image";
import { site, skills } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ContactButton } from "@/components/ui/buttons";

const ABOUT_TEXT =
  "With more than seven years in multimedia, I focus on video editing, motion graphics, and brand design. I love working with teams and creators who want to stand out and tell bold, memorable stories.";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-line py-24 md:py-32"
    >
      <div className="shell container-px grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface-2">
                <Image
                  src="/avatar.png"
                  alt={`${site.name} — ${site.role}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 24rem"
                  className="object-cover object-[center_22%]"
                />
              </div>
              <div className="absolute -bottom-4 -right-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-lift">
                <p className="font-display text-base font-bold">
                  {site.shortName}
                </p>
                <p className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-muted">
                  {site.role}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mono-label">About // 00:42</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
              Strategy &amp; craft,
              <br className="hidden sm:block" /> in <span className="text-grade">motion</span>
            </h2>
          </Reveal>

          <div className="mt-6 max-w-xl">
            <AnimatedText
              text={ABOUT_TEXT}
              className="text-lg leading-relaxed text-ink-soft sm:text-xl"
            />
          </div>

          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-9">
            <Reveal delay={0.15}>
              <ContactButton label="Let's talk" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
