"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { HoverLink } from "@/components/ui/HoverLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { profile } from "@/data/profile";

/** Scroll position below which the header always stays visible, even mid scroll-down. */
const REVEAL_THRESHOLD = 80;

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  useLenis((lenis) => {
    if (lenis.scroll < REVEAL_THRESHOLD || !lenis.isScrolling || lenis.direction === -1) {
      setVisible(true);
    } else if (lenis.direction === 1) {
      setVisible(false);
    }
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)] ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="font-display text-base font-semibold tracking-[-0.02em] text-ink"
        >
          {profile.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 sm:flex">
          {NAV_LINKS.map((link) => {
            const current = link.href.startsWith("/#")
              ? false
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <HoverLink
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`measure text-xs uppercase tracking-[0.14em] ${
                  current ? "text-ink" : "text-ink-muted"
                }`}
              >
                {link.label}
              </HoverLink>
            );
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
