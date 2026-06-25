import { stats } from "@/lib/site";
import { Counter } from "@/components/ui/Counter";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section className="py-20 lg:py-28">
      <div className="shell container-px">
        <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <Reveal key={stat.label}>
              <div className="text-center lg:text-left">
                <p className="font-display text-5xl font-bold tracking-tight text-ink lg:text-6xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-sm leading-snug text-ink-muted">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
