"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Tag = "div" | "section" | "nav" | "h1" | "h2" | "p" | "span" | "li" | "ul";

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
  /** Play immediately on mount instead of on scroll-into-view (use for
   *  above-the-fold content like the hero). */
  playOnMount = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: Tag;
  playOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : x, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const show = playOnMount || inView;

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={show ? "show" : "hidden"}
    >
      {children}
    </MotionTag>
  );
}
