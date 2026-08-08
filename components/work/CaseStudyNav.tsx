import Link from "next/link";
import { projects } from "@/data/projects";

export function CaseStudyNav({ currentSlug }: { currentSlug: string }) {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <nav className="mx-auto grid max-w-6xl grid-cols-1 gap-4 border-t border-border px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2">
      <Link href={`/work/${prev.slug}`} className="group cursor-pointer">
        <p className="text-sm text-muted">&larr; Previous</p>
        <p className="mt-2 text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent">
          {prev.title}
        </p>
      </Link>
      <Link href={`/work/${next.slug}`} className="group cursor-pointer lg:text-right">
        <p className="text-sm text-muted">Next &rarr;</p>
        <p className="mt-2 text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-accent">
          {next.title}
        </p>
      </Link>
    </nav>
  );
}
