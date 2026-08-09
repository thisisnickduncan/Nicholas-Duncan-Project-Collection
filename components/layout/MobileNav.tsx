"use client";

import { useEffect, useRef, useState } from "react";
import { HoverLink } from "@/components/ui/HoverLink";

const links = [
  { href: "/work", label: "Work" },
  { href: "/#contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={panelRef} className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative flex h-9 w-9 cursor-pointer items-center justify-center border border-border text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
      >
        <span className="relative block h-3.5 w-4">
          <span
            className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ease-out ${
              open ? "top-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-opacity duration-200 ease-out ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ease-out ${
              open ? "top-1/2 -rotate-45" : "top-full -translate-y-px"
            }`}
          />
        </span>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full mt-2 border border-border bg-background/95 px-4 py-4 backdrop-blur-md">
          <nav className="flex flex-col gap-4 text-sm">
            {links.map((link) => (
              <HoverLink key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </HoverLink>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
