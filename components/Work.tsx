import Image from "next/image";
import { projects } from "@/lib/site";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-20 lg:py-28">
      <div className="shell container-px">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <div>
              <span className="eyebrow">Selected Work</span>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
                A few projects I&apos;m proud of
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-ink-soft sm:text-right">
              Outcomes over deliverables — each engagement shipped real,
              measurable results.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          stagger={0.12}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          {projects.map((project) => (
            <Reveal key={project.title}>
              <article className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift">
                {/* Cover */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.category}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.cover} transition-transform duration-700 ease-out group-hover:scale-105`}
                      />
                      {/* Mock UI overlay (shown until a real thumbnail is added) */}
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="w-full max-w-[16rem] rounded-2xl bg-white/15 p-4 backdrop-blur-md ring-1 ring-white/25">
                          <div className="mb-3 h-2.5 w-1/2 rounded-full bg-white/70" />
                          <div className="mb-2 h-2 w-3/4 rounded-full bg-white/40" />
                          <div className="h-2 w-2/3 rounded-full bg-white/40" />
                          <div className="mt-4 flex gap-2">
                            <div className="h-7 w-16 rounded-lg bg-white/80" />
                            <div className="h-7 w-10 rounded-lg bg-white/30" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-bg shadow-soft">
                    {project.year}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                        {project.category}
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight">
                        {project.title}
                      </h3>
                    </div>
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bg">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {project.blurb}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink-soft"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
