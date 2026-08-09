"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";
import { HoverLink } from "@/components/ui/HoverLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";

/** Scroll position below which the header always stays visible, even mid scroll-down. */
const REVEAL_THRESHOLD = 80;

export function SiteHeader() {
  const [visible, setVisible] = useState(true);

  useLenis((lenis) => {
    if (lenis.scroll < REVEAL_THRESHOLD || !lenis.isScrolling || lenis.direction === -1) {
      setVisible(true);
    } else if (lenis.direction === 1) {
      setVisible(false);
    }
  });

  return (
    <header
      className={`fixed inset-x-4 top-4 z-50 transition-transform duration-300 ease-out sm:inset-x-6 sm:top-6 ${
        visible ? "translate-y-0" : "-translate-y-[150%]"
      }`}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between border border-border bg-background/80 px-4 py-3 backdrop-blur-md sm:px-6">
        <HoverLink href="/" className="text-sm font-semibold tracking-tight">
          Home
        </HoverLink>
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <HoverLink href="/work">Work</HoverLink>
          <HoverLink href="/#contact">Contact</HoverLink>
          <HoverLink href="/about">About</HoverLink>
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-3 sm:hidden">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
