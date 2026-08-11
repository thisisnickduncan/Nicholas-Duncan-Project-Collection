"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { easeOut } from "@/lib/motion";

/**
 * Navigation is one of the most frequent actions on the site, so this exists only
 * to stop a route swap reading as a flicker. It was previously a 400ms exit
 * followed by a 400ms entrance under mode="wait" — four fifths of a second of
 * empty page every time someone opened a case study. It is now a short opacity
 * crossfade with no travel, weighted so the incoming page arrives faster than the
 * outgoing one leaves.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  /* Exit only. The outgoing page dissolves; the incoming one is simply there.
     There is deliberately no `initial` here and none on AnimatePresence: an
     entrance animation would hide the new page for its own duration, and
     `initial={false}` — the obvious way to skip that on first load — suppresses
     the initial animation of every motion component in the subtree, so nothing
     anywhere on the site could animate on mount. Omitting both leaves each page
     free to introduce itself, and costs nothing at first paint. */
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} exit={{ opacity: 0, transition: { duration: 0.12, ease: easeOut } }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
