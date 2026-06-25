import { process } from "@/lib/site";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-20 lg:py-28">
      <div className="shell container-px">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">How we&apos;ll work</span>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                A simple, proven process
              </h2>
              <p className="mt-5 text-lg text-ink-soft">
                Clear stages, no surprises. You always know what&apos;s
                happening and what&apos;s next.
              </p>
            </Reveal>
          </div>

          <RevealGroup stagger={0.12} className="lg:col-span-8">
            <div className="divide-y divide-line border-t border-line">
              {process.map((item) => (
                <Reveal key={item.step}>
                  <div className="group flex flex-col gap-3 py-8 transition-colors duration-300 sm:flex-row sm:items-baseline sm:gap-10">
                    <span className="font-display text-sm font-semibold text-ink-muted transition-colors duration-300 group-hover:text-accent">
                      {item.step}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-xl leading-relaxed text-ink-soft">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
