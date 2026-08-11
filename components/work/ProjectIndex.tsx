"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ProjectRow } from "@/components/work/ProjectRow";
import { projects, categoryLabel, type ProjectCategory } from "@/data/projects";

type Filter = ProjectCategory | "All";

/** Only offer a category that something is actually filed under, so the filter bar
 *  can never lead to an empty page. */
const populated = new Set<ProjectCategory>(projects.map((p) => p.category));
const filters: Filter[] = ["All", ...(["IT", "PM", "Data", "Security"] as ProjectCategory[]).filter((c) => populated.has(c))];

export function ProjectIndex({ intro }: { intro: string }) {
  const [active, setActive] = useState<Filter>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40">
      <h1 className="font-display text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
        Selected work
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">{intro}</p>

      <div className="mt-10 flex flex-wrap gap-x-2 gap-y-2" role="group" aria-label="Filter projects by category">
        {filters.map((filter) => {
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={`measure cursor-pointer border px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.14em] transition-[background-color,border-color,color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out)] active:scale-[0.98] ${
                isActive
                  ? "border-ink bg-ink text-paper"
                  : "border-rule text-ink-muted hover:border-rule-strong hover:text-ink"
              }`}
            >
              {filter === "All" ? `All ${projects.length}` : categoryLabel(filter)}
            </button>
          );
        })}
      </div>

      <div className="mt-12">
        {filtered.map((project) => (
          <RevealOnScroll key={project.slug}>
            <ProjectRow project={project} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
