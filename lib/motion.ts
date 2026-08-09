import type { Variants } from "framer-motion";

export const viewportOnce = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

/**
 * Variants collapse to an instant, non-offset state when the user prefers
 * reduced motion, so callers can pass `reduced` straight into `animate`/`variants`
 * without branching per component.
 */
export function withReducedMotion(variants: Variants, reduced: boolean): Variants {
  if (!reduced) return variants;
  const still: Variants = {};
  for (const key of Object.keys(variants)) {
    still[key] = { opacity: key === "hidden" ? 0 : 1, transition: { duration: 0.01 } };
  }
  return still;
}
