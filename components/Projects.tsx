"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { LiveProjectButton } from "@/components/ui/buttons";

type ProjectItem = {
  num: string;
  category: string;
  name: string;
  href: string;
  g1: string;
  g2: string;
  g3: string;
};

// Real engagements from the CV (image grids are placeholders — swap for stills).
const projects: ProjectItem[] = [
  {
    num: "01",
    category: "Client · Multimedia & Branding",
    name: "PT Dupoin Futures (GRW)",
    href: "#",
    g1: "from-blue-500 via-indigo-500 to-violet-600",
    g2: "from-violet-500 via-purple-500 to-fuchsia-600",
    g3: "from-indigo-500 via-blue-600 to-cyan-600",
  },
  {
    num: "02",
    category: "Client · Event Post-Production",
    name: "Circle Media Entertainment",
    href: "#",
    g1: "from-emerald-400 via-teal-500 to-cyan-600",
    g2: "from-teal-400 via-emerald-500 to-green-600",
    g3: "from-cyan-400 via-sky-500 to-blue-600",
  },
  {
    num: "03",
    category: "Personal · Brand & Marketing",
    name: "Washsins Shoes Care",
    href: "#",
    g1: "from-rose-400 via-pink-500 to-fuchsia-600",
    g2: "from-amber-400 via-orange-500 to-red-500",
    g3: "from-pink-400 via-fuchsia-500 to-purple-600",
  },
];

export function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const total = projects.length;

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-bg px-5 pt-20 pb-10 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading mb-8 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight"
      >
        Project
      </FadeIn>

      <div ref={container} className="mx-auto max-w-6xl">
        {projects.map((p, i) => {
          const targetScale = 1 - (total - 1 - i) * 0.03;
          const range: [number, number] = [i / total, 1];
          return (
            <Card
              key={p.num}
              index={i}
              project={p}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

function Card({
  index,
  project,
  progress,
  range,
  targetScale,
}: {
  index: number;
  project: ProjectItem;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full rounded-[40px] border-2 border-mist/80 bg-bg p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-[clamp(2.5rem,8vw,110px)] font-black leading-none text-mist">
              {project.num}
            </span>
            <div>
              <p className="text-[0.65rem] uppercase tracking-widest text-ink-muted sm:text-xs">
                {project.category}
              </p>
              <h3 className="text-[clamp(1.1rem,2.4vw,2rem)] font-medium uppercase leading-tight text-mist">
                {project.name}
              </h3>
            </div>
          </div>
          <div className="hidden sm:block">
            <LiveProjectButton href={project.href} />
          </div>
        </div>

        {/* Image grid */}
        <div className="mt-5 flex gap-3 sm:mt-6 sm:gap-4">
          <div className="flex w-2/5 flex-col gap-3 sm:gap-4">
            <div
              className={`overflow-hidden rounded-[24px] bg-gradient-to-br sm:rounded-[36px] ${project.g1}`}
              style={{ height: "clamp(110px,16vw,210px)" }}
            />
            <div
              className={`overflow-hidden rounded-[24px] bg-gradient-to-br sm:rounded-[36px] ${project.g2}`}
              style={{ height: "clamp(140px,22vw,300px)" }}
            />
          </div>
          <div className="w-3/5">
            <div
              className={`h-full overflow-hidden rounded-[24px] bg-gradient-to-br sm:rounded-[36px] ${project.g3}`}
              style={{ minHeight: "clamp(260px,40vw,524px)" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
