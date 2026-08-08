"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/** Staggered word-by-word reveal, masked so words slide up from behind their own line. Used once, on the hero load. */
export function SplitText({ text, className, delay = 0, as = "h1" }: SplitTextProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  const words = text.split(" ");

  if (reduced) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
