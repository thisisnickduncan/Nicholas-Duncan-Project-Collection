"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";

/** Before hydration there is no layout to measure, so the server sees the no-op. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * A measurement settling into place.
 *
 * The characters are staggered into view rather than counted up to. A counter
 * would put figures on screen that were never measured — 4,825 on the way to
 * 8,774 — and if JavaScript stalls it can strand a wrong number under a label
 * claiming it is real. Here the true value is the only value ever rendered.
 *
 * The animated version is mounted only on the client, so the served HTML holds
 * plain, fully visible text. Without JavaScript the measurement still reads; it
 * simply does not move. The swap happens in a layout effect, before paint, so
 * there is no flash of the settled state first.
 */
export function MetricValue({ value, className = "" }: { value: string; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const [animate, setAnimate] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setAnimate(true);
  }, []);

  /* Split to words first, then to characters inside each word. Per-character
     inline-blocks are line-break opportunities, so splitting straight to
     characters would let a wrapping value break mid-word. */
  const words = useMemo(() => value.split(/(\s+)/).filter(Boolean), [value]);
  const charCount = value.length;

  /* Each word's position in the whole string, so the stagger keeps running across
     word boundaries instead of restarting at every space. */
  const offsets = useMemo(() => {
    const starts: number[] = [];
    words.forEach((word, i) => {
      starts.push(i === 0 ? 0 : starts[i - 1] + words[i - 1].length);
    });
    return starts;
  }, [words]);

  /* Long values would read as a typewriter at a fixed per-character delay, so the
     stagger tightens as the string grows and the whole settle stays under 300ms. */
  const step = Math.min(0.028, 0.26 / Math.max(charCount, 1));

  if (!animate || reduced) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} aria-label={value}>
      {words.map((word, w) => {
        if (/^\s+$/.test(word)) {
          return <span key={`s-${w}`}>{word}</span>;
        }
        return (
          <span key={`w-${w}`} className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, c) => (
              <motion.span
                key={`${w}-${c}`}
                aria-hidden="true"
                className="inline-block"
                initial={{ opacity: 0, y: "0.32em" }}
                animate={inView ? { opacity: 1, y: "0em" } : { opacity: 0, y: "0.32em" }}
                transition={{ duration: 0.34, delay: (offsets[w] + c) * step, ease: easeOut }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
