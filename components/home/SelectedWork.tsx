import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { ProjectRow } from "@/components/work/ProjectRow";
import { projects } from "@/data/projects";

export function SelectedWork() {
  const featured = projects.slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl border-t border-rule-strong px-4 py-20 sm:px-6 sm:py-28">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.03em]">
          Selected work
        </h2>
        <HoverLink href="/work" className="measure text-xs uppercase tracking-[0.14em] text-ink-muted">
          All {projects.length} projects &rarr;
        </HoverLink>
      </div>

      <div className="mt-10">
        {featured.map((project) => (
          <RevealOnScroll key={project.slug}>
            <ProjectRow project={project} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
