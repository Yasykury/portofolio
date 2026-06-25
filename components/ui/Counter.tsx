"use client";

import {
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

/**
 * Counts up from 0 to `value` when scrolled into view. Skips straight to the
 * final value for reduced-motion users.
 */
export function Counter({ value, suffix = "", duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      setDisplay(value);
      return;
    }

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration, reduce, motionValue]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      {display}
      {suffix}
    </span>
  );
}
