"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { HoverLink } from "@/components/ui/HoverLink";
import { NAV_LINKS } from "@/components/layout/SiteHeader";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointer(e: PointerEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    /* Escape closes and hands focus back to the control that opened it, so keyboard
       users are not stranded at the top of the document. */
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={panelRef} className="sm:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        className="relative flex h-9 w-9 cursor-pointer items-center justify-center border border-rule text-ink transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:border-rule-strong active:bg-surface"
      >
        <span aria-hidden="true" className="relative block h-3 w-4">
          <span
            className={`absolute left-0 h-px w-full bg-current transition-all duration-[var(--duration-base)] ease-[var(--ease-out)] ${
              open ? "top-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-out)] ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-px w-full bg-current transition-all duration-[var(--duration-base)] ease-[var(--ease-out)] ${
              open ? "top-1/2 -rotate-45" : "top-full -translate-y-px"
            }`}
          />
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full border-b border-rule bg-paper/95 px-4 py-5 backdrop-blur-md"
        >
          <nav aria-label="Main" className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const current = link.href.startsWith("/#")
                ? false
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <HoverLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={current ? "page" : undefined}
                  className={`measure text-xs uppercase tracking-[0.14em] ${
                    current ? "text-ink" : "text-ink-muted"
                  }`}
                >
                  {link.label}
                </HoverLink>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
