"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ProjectRow } from "@/components/work/ProjectRow";
import { projects, type ProjectCategory } from "@/data/projects";

const categories: ProjectCategory[] = ["IT", "PM", "Data", "Security"];

export function ProjectIndex() {
  const [active, setActive] = useState<ProjectCategory | "All">("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-36 sm:px-6 sm:pt-44">
      <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">Selected Work</h1>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {(["All", ...categories] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`cursor-pointer border-b pb-1 transition-colors duration-200 ${
              active === cat ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {filtered.map((project, i) => (
          <RevealOnScroll key={project.slug} delay={Math.min(i * 0.05, 0.3)}>
            <ProjectRow project={project} index={i} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
