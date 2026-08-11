"use client";

import { useEffect, useState } from "react";

/**
 * The scale down the edge of the index: one tick per project, the one you are
 * reading marked and named.
 *
 * This is the instrument's own chrome rather than decoration. It reports two
 * things a long index genuinely hides — how many there are, and how far in you
 * are — and it is the only element on the page that persists across the whole
 * scroll, which is what stops a list of bands reading as unrelated screens.
 *
 * Hidden below the width where it would crowd the text, and purely a readout:
 * every project it marks is reachable by scrolling, so nothing is lost when it
 * is not shown.
 */
export function IndexRail({ labels }: { labels: string[] }) {
  const [active, setActive] = useState(0);

  /* Read from the bands themselves rather than from a scroll fraction, so
     filtering the list or resizing cannot put the mark out of step with what is
     actually on screen. */
  useEffect(() => {
    const bands = [...document.querySelectorAll("[data-band]")];
    if (!bands.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = bands.indexOf(entry.target);
          if (index >= 0) setActive(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    bands.forEach((band) => observer.observe(band));
    return () => observer.disconnect();
  }, [labels.length]);

  if (labels.length < 2) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-7 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex"
    >
      {labels.map((label, i) => (
        <div key={label} className="flex items-center gap-3">
          <span
            className={`measure whitespace-nowrap text-[0.625rem] uppercase tracking-[0.16em] text-ink transition-opacity duration-[var(--duration-base)] ease-[var(--ease-out)] ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            {label}
          </span>
          <span
            className={`block h-px transition-[width,background-color] duration-[var(--duration-base)] ease-[var(--ease-out)] ${
              i === active ? "w-8 bg-signal" : "w-3.5 bg-rule-strong"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
