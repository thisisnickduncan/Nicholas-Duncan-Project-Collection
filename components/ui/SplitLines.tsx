"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Tag = "h1" | "h2" | "h3" | "p" | "div";

interface SplitLinesProps {
  text: string;
  className?: string;
  as?: Tag;
  delay?: number;
}

/**
 * Reveals text one rendered line at a time, each line rising from behind its own
 * mask.
 *
 * Lines are measured, not guessed: the words are laid out normally, grouped by
 * the vertical offset they actually landed on, and only then wrapped. That means
 * the reveal follows the real line breaks at any width, in any font, rather than
 * a count decided in advance.
 *
 * The served HTML is the plain string, so if the script never runs the text is
 * simply there.
 *
 * Use this below the fold only. Splitting happens in a layout effect, which runs
 * after hydration — well after the server-rendered markup has already painted.
 * On something visible at first paint that reads as a double-take: the text
 * arrives, then hides itself to arrive a second time. Above the fold, animate in
 * CSS from a state that is already painted (see `.rise-into-place`).
 */
export function SplitLines({ text, className = "", as = "p", delay = 0 }: SplitLinesProps) {
  const Component = as;
  const containerRef = useRef<HTMLElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [lines, setLines] = useState<string[] | null>(null);
  const reduced = useReducedMotion();
  const shouldRun = useInView(containerRef, { once: true, margin: "-8%" });

  /* The motion preference is a client-only fact, so consulting it during the
     first render makes the client disagree with the server and fails hydration
     for exactly the users who asked for less motion. Nothing splits until after
     mount; server and first client render are both the plain string. */
  const [measuring, setMeasuring] = useState(false);

  const words = text.split(/\s+/).filter(Boolean);

  /* Group the words by the line box they actually landed on. Sub-pixel drift
     between words on the same line is normal, so the comparison is fuzzy. */
  const measure = useCallback(() => {
    const tops = wordRefs.current.map((el) => (el ? el.offsetTop : 0));
    if (!tops.length) return;

    const grouped: string[] = [];
    let current: string[] = [];
    let lineTop = tops[0];

    tops.forEach((top, i) => {
      if (Math.abs(top - lineTop) > 2) {
        grouped.push(current.join(" "));
        current = [];
        lineTop = top;
      }
      current.push(words[i]);
    });
    if (current.length) grouped.push(current.join(" "));

    setLines(grouped);
  }, [words]);

  useIsomorphicLayoutEffect(() => {
    if (reduced) return;
    if (!measuring) {
      setMeasuring(true);
      return;
    }
    if (!lines) measure();
  }, [reduced, measuring, lines, measure]);

  /* A width change re-wraps the text, so the measurement is thrown away and the
     words are laid out plainly again for one frame to be re-grouped. */
  useEffect(() => {
    if (reduced) return;
    const el = containerRef.current;
    if (!el) return;

    let width = el.getBoundingClientRect().width;
    const observer = new ResizeObserver(() => {
      const next = el.getBoundingClientRect().width;
      if (Math.abs(next - width) < 1) return;
      width = next;
      setLines(null);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  if (reduced || !measuring) {
    return (
      <Component ref={containerRef as never} className={className}>
        {text}
      </Component>
    );
  }

  if (!lines) {
    return (
      <Component ref={containerRef as never} className={className}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component ref={containerRef as never} className={className} aria-label={text}>
      {lines.map((line, i) => (
        <LineMask key={`${line}-${i}`} run={shouldRun} delay={delay + i * 0.075}>
          {line}
        </LineMask>
      ))}
    </Component>
  );
}

function LineMask({
  children,
  run,
  delay,
}: {
  children: string;
  run: boolean;
  delay: number;
}) {
  /* The mask is dropped once the line has arrived. Leaving `overflow: hidden` on
     permanently would clip descenders, and would clip the line outright if a late
     font swap re-wrapped it. */
  const [masked, setMasked] = useState(true);

  return (
    <span
      aria-hidden="true"
      className={`block ${masked ? "overflow-hidden" : ""}`}
      style={{ paddingBottom: masked ? "0.08em" : undefined, marginBottom: masked ? "-0.08em" : undefined }}
    >
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={run ? { y: "0%" } : { y: "105%" }}
        transition={{ duration: 0.72, delay, ease: easeOut }}
        onAnimationComplete={() => {
          if (run) setMasked(false);
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
