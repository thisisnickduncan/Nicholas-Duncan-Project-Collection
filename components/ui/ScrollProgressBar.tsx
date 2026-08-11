"use client";

import { motion, useScroll } from "framer-motion";

/**
 * Reading position on a long case study. Driven straight off scroll progress with
 * no spring: a progress indicator that lags behind the thing it measures is
 * reporting the wrong number.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[55] h-0.5 w-full origin-left bg-signal"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
