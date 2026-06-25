import { services } from "@/lib/site";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { serviceIcons, IconCheck } from "@/components/ui/icons";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-y border-line bg-surface py-20 lg:py-28">
      <div className="shell container-px">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">What I do</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Design that earns its keep
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-lg text-ink-soft">
              A focused set of services covering the full journey — from
              understanding your users to shipping a polished, scalable product.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          stagger={0.1}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal key={service.title}>
                <div className="group h-full rounded-3xl border border-line bg-bg p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface hover:shadow-lift lg:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-bg transition-colors duration-300 group-hover:bg-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2.5 text-sm text-ink-soft"
                      >
                        <IconCheck className="h-4 w-4 shrink-0 text-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
