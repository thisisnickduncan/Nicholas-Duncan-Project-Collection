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

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.18, ease: easeOut } }}
        exit={{ opacity: 0, transition: { duration: 0.1, ease: easeOut } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
