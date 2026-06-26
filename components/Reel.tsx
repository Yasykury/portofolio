"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  wrap,
} from "framer-motion";

const PHRASES = [
  "Video Editing",
  "Motion Graphics",
  "VFX",
  "Brand Design",
  "Post-Production",
  "Storytelling",
];

function Row({ baseVelocity, outline }: { baseVelocity: number; outline: boolean }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  // subtle skew tied to scroll velocity — the kinetic tell
  const skew = useTransform(smoothVelocity, [-2000, 0, 2000], [-6, 0, 6], {
    clamp: true,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const directionRef = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionRef.current = -1;
    else if (velocityFactor.get() > 0) directionRef.current = 1;
    moveBy += directionRef.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const items = [...PHRASES, ...PHRASES, ...PHRASES, ...PHRASES];

  return (
    <motion.div style={{ skewX: skew }}>
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {items.map((p, i) => (
          <span key={i} className="flex items-center">
            <span
              className={
                outline
                  ? "text-transparent [-webkit-text-stroke:1px_var(--color-ink-soft)]"
                  : "text-ink"
              }
            >
              {p}
            </span>
            <span className="mx-6 text-warm sm:mx-8" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Reel() {
  return (
    <section
      id="reel"
      aria-label="What I do"
      className="overflow-hidden border-y border-line py-10 font-display text-[12vw] font-extrabold uppercase leading-none tracking-tight sm:text-[8vw] md:text-[6.5vw] lg:text-[5.5rem]"
    >
      <div className="flex flex-col gap-2">
        <Row baseVelocity={-3} outline={false} />
        <Row baseVelocity={3} outline />
      </div>
    </section>
  );
}
