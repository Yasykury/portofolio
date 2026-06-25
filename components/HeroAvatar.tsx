"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { site } from "@/lib/site";

/**
 * Interactive hero avatar:
 * - rises + fades in on load
 * - tilts in 3D toward the pointer (parallax)
 * - keeps a gentle idle float
 * - a purple/magenta glow tracks the motion
 * All motion is disabled for prefers-reduced-motion users.
 */
export function HeroAvatar() {
  const reduce = useReducedMotion();

  const px = useMotionValue(0); // -0.5 .. 0.5
  const py = useMotionValue(0);
  const spring = { stiffness: 110, damping: 16, mass: 0.5 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-11, 11]);
  const tx = useTransform(sx, [-0.5, 0.5], [-24, 24]);
  const ty = useTransform(sy, [-0.5, 0.5], [-16, 16]);
  const glowX = useTransform(sx, [-0.5, 0.5], [-40, 40]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 z-20 flex justify-center [perspective:1100px]"
      initial={reduce ? false : { opacity: 0, y: 70, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glow that tracks the tilt */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[14%] h-[24rem] w-[24rem] rounded-full sm:h-[32rem] sm:w-[32rem] lg:h-[40rem] lg:w-[40rem]"
        style={{
          x: reduce ? 0 : glowX,
          background:
            "radial-gradient(circle, rgba(168,85,247,0.5), rgba(219,39,119,0.14) 45%, transparent 70%)",
          filter: "blur(44px)",
        }}
      />

      {/* Tilting avatar */}
      <motion.div
        className="relative aspect-square h-[54svh] max-w-[74vw] sm:h-[64svh] sm:max-w-[58vw] lg:h-[min(80svh,44rem)] lg:max-w-[44rem]"
        style={
          reduce
            ? undefined
            : { rotateX, rotateY, x: tx, y: ty, transformStyle: "preserve-3d" }
        }
      >
        <div className="animate-float-soft relative h-full w-full">
          <Image
            src="/avatar.png"
            alt={`${site.name} — ${site.role}`}
            fill
            priority
            sizes="(max-width: 768px) 94vw, 46rem"
            className="mask-feather select-none object-cover"
            draggable={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
