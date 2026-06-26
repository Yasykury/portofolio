import { services } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { serviceIcons } from "@/components/ui/icons";

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-t border-line py-24 md:py-32"
    >
      <div className="shell container-px">
        <Reveal>
          <p className="mono-label">Craft // 00:58</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            What I do
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="group h-full rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-warm/60 lg:p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-bg text-warm transition-colors duration-300 group-hover:bg-warm group-hover:text-bg">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    {s.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.points.map((pt) => (
                      <li
                        key={pt}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-ink-muted"
                      >
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
