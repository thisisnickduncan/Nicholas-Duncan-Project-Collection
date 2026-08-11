"use client";

import { applyTheme } from "@/lib/theme";

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className="absolute inset-0 h-4 w-4 rotate-90 scale-75 opacity-0 transition-[transform,opacity] duration-[var(--duration-base)] ease-[var(--ease-out)] dark:rotate-0 dark:scale-100 dark:opacity-100"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className="absolute inset-0 h-4 w-4 rotate-0 scale-100 opacity-100 transition-[transform,opacity] duration-[var(--duration-base)] ease-[var(--ease-out)] dark:-rotate-90 dark:scale-75 dark:opacity-0"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="relative flex h-9 w-9 cursor-pointer items-center justify-center border border-rule text-ink transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:border-rule-strong active:bg-surface"
    >
      <span aria-hidden="true" className="relative h-4 w-4">
        <SunIcon />
        <MoonIcon />
      </span>
    </button>
  );
}
