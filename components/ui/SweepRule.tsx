"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * A hairline that draws itself across the top of a band as the band arrives.
 *
 * It sits on the existing rule rather than replacing it, so the structure is
 * there before the line has drawn and nothing depends on script to look
 * finished. The draw is scrubbed to scroll rather than triggered, so it tracks
 * the reader's hand: reach the band halfway and the line is halfway across.
 *
 * The markup never changes shape — the motion preference only decides whether
 * the line is drawn or simply present. Returning different elements for reduced
 * motion would make the client disagree with the server and fail hydration for
 * exactly the people who asked for less movement.
 */
export function SweepRule() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const animate = mounted && !reduced;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 block h-px overflow-hidden"
    >
      <motion.span
        className="block h-px w-full origin-left bg-signal"
        style={animate ? { scaleX: drawn } : { scaleX: 1 }}
      />
    </span>
  );
}
