import type { Variants } from "framer-motion";

/** Matches --ease-out in globals.css, so JS-driven and CSS-driven motion agree. */
export const easeOut = [0.23, 1, 0.32, 1] as const;

export const viewportOnce = { once: true, margin: "-64px" } as const;

/**
 * The one entrance on the site. Travel is short and the duration sits inside the
 * UI budget; the animated blur that used to ride along with it is gone, since it
 * ran on every revealed element at once and is expensive to composite.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: easeOut } },
};

export const staggerContainer = (stagger = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2, ease: easeOut } },
};

/**
 * Variants collapse to an opacity-only state when the user prefers reduced motion:
 * the element still resolves, it just stops travelling. Callers can pass `reduced`
 * straight into `animate`/`variants` without branching per component.
 */
export function withReducedMotion(variants: Variants, reduced: boolean): Variants {
  if (!reduced) return variants;
  const still: Variants = {};
  for (const key of Object.keys(variants)) {
    still[key] = {
      opacity: key === "hidden" ? 0 : 1,
      y: 0,
      transition: { duration: 0.14, ease: easeOut },
    };
  }
  return still;
}
