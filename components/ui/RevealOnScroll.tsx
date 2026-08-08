"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce, withReducedMotion } from "@/lib/motion";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}

export function RevealOnScroll({ children, className, delay = 0, as = "div" }: RevealOnScrollProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={withReducedMotion(fadeUp, !!reduced)}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
