import Image from "next/image";
import { site, skills } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line bg-surface py-20 lg:py-28">
      <div className="shell container-px">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait placeholder */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative mx-auto max-w-sm">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface-2">
                  <Image
                    src="/yasykury.jpg"
                    alt={`${site.name} — ${site.role}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 24rem"
                    className="object-cover object-[center_25%]"
                  />
                </div>
                <div className="absolute -bottom-5 -right-3 rounded-2xl border border-line bg-surface px-5 py-4 shadow-lift">
                  <p className="font-display text-lg font-semibold">
                    {site.shortName}
                  </p>
                  <p className="text-sm text-ink-muted">{site.role}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bio */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">About</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
                Storytelling and craft,
                <br className="hidden sm:block" /> in equal measure
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
                <p>
                  I&apos;m Yasykury Sulistyo, a 27-year-old multimedia designer
                  based in Tangerang Selatan, Indonesia, working across video,
                  motion graphics, and brand design. For over seven years
                  I&apos;ve produced visual content — from founding my own design
                  studios to editing for high-traffic YouTube channels and media
                  companies.
                </p>
                <p>
                  Today I edit for Circle Media Entertainment and PT Dupoin
                  Futures Indonesia (GRW), specializing in event post-production,
                  motion design, and branded content. I&apos;m a creative thinker
                  and hard worker who takes full ownership of every project —
                  currently completing a Communication Studies degree at
                  Universitas Terbuka.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
                  Capabilities &amp; tools
                </p>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
