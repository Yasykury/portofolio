"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Character-by-character scroll-reveal: each character fades from 0.2 → 1
 * opacity based on the paragraph's scroll progress.
 */
export function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");
  let charIndex = 0;
  const total = text.length;

  return (
    <p ref={ref} className={className}>
      {words.map((word, wi) => {
        const start = charIndex / total;
        charIndex += word.length + 1; // + trailing space
        const end = charIndex / total;
        return (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split("").map((char, ci) => {
              const cStart = start + (ci / word.length) * (end - start);
              const cEnd = start + ((ci + 1) / word.length) * (end - start);
              return (
                <Char key={ci} progress={scrollYProgress} range={[cStart, cEnd]}>
                  {char}
                </Char>
              );
            })}
            {/* preserve the space between words */}
            <span>&nbsp;</span>
          </span>
        );
      })}
    </p>
  );
}

function Char({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}
