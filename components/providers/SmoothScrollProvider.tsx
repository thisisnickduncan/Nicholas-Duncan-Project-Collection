"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/* Where the reader was on each page, kept for the length of the visit only.
   sessionStorage rather than memory so a page that fully reloads mid-visit
   still knows the list it belongs to. */
const SCROLL_MEMORY_KEY = "nd:scroll-positions";

function readPositions(): Record<string, number> {
  try {
    const stored = sessionStorage.getItem(SCROLL_MEMORY_KEY);
    return stored ? (JSON.parse(stored) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function rememberPosition(pathname: string, y: number) {
  try {
    const positions = readPositions();
    positions[pathname] = y;
    sessionStorage.setItem(SCROLL_MEMORY_KEY, JSON.stringify(positions));
  } catch {
    /* Private browsing can refuse storage. Losing the position is survivable. */
  }
}

function scrollTo(lenis: Lenis | undefined, y: number) {
  /* `immediate` lands without animating the whole document past the reader;
     `force` makes it land even while Lenis is mid-gesture. */
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
}

/**
 * Restoring a remembered position has to wait for the page that owns it: the
 * incoming route mounts a frame or two after the pathname changes, and until it
 * does the document is still only as tall as the page being left, so the browser
 * clamps any scroll to that shorter height. This watches for the document to
 * grow tall enough, lands, then holds the landing for a few frames against
 * Next's own scroll reset — and gives all of that up the moment the reader
 * touches the wheel, a key, or the screen, since by then the position is theirs.
 */
function restorePosition(lenis: Lenis | undefined, target: number) {
  const deadline = performance.now() + 1000;
  let landedAt: number | null = null;
  let cancelled = false;

  const release = () => {
    cancelled = true;
  };
  const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
  events.forEach((event) => window.addEventListener(event, release, { once: true, passive: true }));

  const stop = () => {
    events.forEach((event) => window.removeEventListener(event, release));
  };

  const attempt = () => {
    if (cancelled) return stop();

    /* Lenis clamps to a page height it measured for the page being left, which
       is the wrong page and usually the shorter one. Re-measure first, then ask
       it — its limit, not the document's, is what the landing is held to. */
    lenis?.resize();
    const furthest = lenis
      ? lenis.limit
      : Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    const now = performance.now();

    if (furthest >= target - 2 || now > deadline) {
      scrollTo(lenis, Math.min(target, furthest));
      landedAt ??= now;
      /* Hold briefly: the route's own scroll reset can arrive after this one. */
      if (now - landedAt > 250) return stop();
    }

    requestAnimationFrame(attempt);
  };

  requestAnimationFrame(attempt);
}

/**
 * A new page should begin at its beginning, and a list you return to should
 * still be where you left it.
 *
 * Lenis animates scroll on its own timeline, so the reset Next performs on
 * navigation gets overwritten by whatever inertia was still running when the
 * link was clicked — open a case study mid-flick and you arrive partway down it.
 * This puts the scroll where it belongs itself, on the route change, so it
 * survives the momentum.
 *
 * Going back up to a section from inside it — "All work" from a case study —
 * returns to the remembered place in that section, so the next project is where
 * the reader left it rather than seven bands further down. Back and forward are
 * left to the browser, which restores position already, and the first render is
 * left alone so a reload keeps its place.
 */
function ScrollMemory() {
  const lenis = useLenis();
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);
  const restoringHistory = useRef(false);

  useEffect(() => {
    const markHistoryNavigation = () => {
      restoringHistory.current = true;
    };
    window.addEventListener("popstate", markHistoryNavigation);
    return () => window.removeEventListener("popstate", markHistoryNavigation);
  }, []);

  /* Recorded as the link is pressed rather than as the route changes: Next
     resets the scroll during the commit, so by the time a route effect runs the
     page has already forgotten where the reader was standing. */
  useEffect(() => {
    const recordDeparture = () => rememberPosition(pathname, window.scrollY);
    document.addEventListener("click", recordDeparture, { capture: true });
    return () => document.removeEventListener("click", recordDeparture, { capture: true });
  }, [pathname]);

  useEffect(() => {
    const from = previousPathname.current;
    previousPathname.current = pathname;

    if (from === null || from === pathname) return;

    if (restoringHistory.current) {
      restoringHistory.current = false;
      return;
    }

    /* Only a section standing above the page being left is worth returning to
       mid-list; home is excluded, or every path would count as its child. */
    const isReturningToSection = pathname !== "/" && from.startsWith(`${pathname}/`);
    const remembered = isReturningToSection ? readPositions()[pathname] : undefined;

    if (remembered && remembered > 0) restorePosition(lenis, remembered);
    else scrollTo(lenis, 0);
  }, [pathname, lenis]);

  return null;
}

/** Lerped inertia scrolling. Skipped entirely under prefers-reduced-motion, falling back to native instant scroll. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <>
        <ScrollMemory />
        {children}
      </>
    );
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <ScrollMemory />
      {children}
    </ReactLenis>
  );
}
