import Link from "next/link";
import { projects } from "@/data/projects";

export function CaseStudyNav({ currentSlug }: { currentSlug: string }) {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <nav
      aria-label="Case studies"
      className="mx-auto grid max-w-6xl grid-cols-1 border-t border-rule-strong sm:grid-cols-2"
    >
      <Link
        href={`/work/${prev.slug}`}
        className="group border-b border-rule px-4 py-10 transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] hover:bg-surface sm:border-b-0 sm:border-r sm:px-6 sm:py-12"
      >
        <span className="measure flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
          <span
            aria-hidden="true"
            className="text-signal transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:-translate-x-1"
          >
            &larr;
          </span>
          Previous
        </span>
        <span className="mt-3 block font-display text-xl font-semibold tracking-[-0.02em] text-ink">
          {prev.title}
        </span>
      </Link>

      <Link
        href={`/work/${next.slug}`}
        className="group px-4 py-10 transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] hover:bg-surface sm:px-6 sm:py-12 sm:text-right"
      >
        <span className="measure flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted sm:justify-end">
          Next
          <span
            aria-hidden="true"
            className="text-signal transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
        <span className="mt-3 block font-display text-xl font-semibold tracking-[-0.02em] text-ink">
          {next.title}
        </span>
      </Link>
    </nav>
  );
}
