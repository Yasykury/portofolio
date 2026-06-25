import { testimonials } from "@/lib/site";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { IconQuote } from "@/components/ui/icons";

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28">
      <div className="shell container-px">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">Kind words</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              What clients say
            </h2>
          </Reveal>
        </div>

        <RevealGroup stagger={0.1} className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Reveal key={t.name}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift lg:p-8">
                <IconQuote className="h-7 w-7 text-accent/30" />
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-bg">
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-display font-semibold tracking-tight">
                      {t.name}
                    </p>
                    <p className="text-sm text-ink-muted">{t.title}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
