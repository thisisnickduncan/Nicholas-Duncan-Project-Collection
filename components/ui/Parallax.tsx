"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * How far the layer lags the scroll, as a fraction of its own height. Positive
   * values hold the layer back so it trails the page; negative values run it
   * ahead. Single digits are the useful range — past about 0.14 it stops reading
   * as depth and starts reading as a bug.
   */
  lag?: number;
  /** Where the layer is measured between: default covers entering to leaving. */
  range?: [string, string];
}

/**
 * Ties a layer's position to scroll progress rather than to a trigger.
 *
 * The difference matters for how the page feels. A triggered animation plays at
 * its own speed once a threshold is crossed, so the page and the reader are
 * briefly doing different things. A scroll-linked one is scrubbed: every pixel
 * of movement is the reader's, which is what makes a page feel like it is being
 * guided rather than reacting. Layers at different lags separate into depth.
 */
export function Parallax({ children, className = "", lag = 0.06, range }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (range ?? ["start end", "end start"]) as never,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${lag * 100}%`]);

  /* The element tree is identical in every case; only the style differs. Swapping
     in a plain div for reduced motion would change the markup the client renders
     against what the server sent, and fail hydration. */
  return (
    <div ref={ref} className={className}>
      <motion.div style={mounted && !reduced ? { y } : undefined}>{children}</motion.div>
    </div>
  );
}
