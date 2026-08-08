import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { ProjectRow } from "@/components/work/ProjectRow";
import { projects } from "@/data/projects";

export function SelectedWork() {
  const featured = projects.slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="flex items-end justify-between gap-4">
        <RevealOnScroll as="div">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Selected Work</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <HoverLink href="/work" className="text-sm text-muted">
            View all &rarr;
          </HoverLink>
        </RevealOnScroll>
      </div>

      <div className="mt-8">
        {featured.map((project, i) => (
          <RevealOnScroll key={project.slug} delay={i * 0.05}>
            <ProjectRow project={project} index={i} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
