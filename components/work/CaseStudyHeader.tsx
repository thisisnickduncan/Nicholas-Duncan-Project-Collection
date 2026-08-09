import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { IframeEmbed } from "@/components/work/IframeEmbed";
import { categoryLabel, type Project } from "@/data/projects";

export function CaseStudyHeader({ project }: { project: Project }) {
  return (
    <header className="mx-auto max-w-6xl px-4 pb-12 pt-36 sm:px-6 sm:pt-44">
      <RevealOnScroll>
        <HoverLink href="/work" className="text-sm text-muted">
          &larr; Back to work
        </HoverLink>
      </RevealOnScroll>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <RevealOnScroll delay={0.1} className="lg:col-span-8">
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
            {project.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{project.oneLiner}</p>
          {(project.githubUrl || project.demoUrl) && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {project.githubUrl && (
                <HoverLink href={project.githubUrl} external>
                  View source &rarr;
                </HoverLink>
              )}
              {project.demoUrl && (
                <HoverLink href={project.demoUrl} external>
                  Live demo &rarr;
                </HoverLink>
              )}
            </div>
          )}
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="grid grid-cols-2 gap-6 text-sm lg:col-span-4 lg:grid-cols-1">
          <div>
            <p className="text-muted">Role</p>
            <p className="mt-1">{project.role}</p>
          </div>
          <div>
            <p className="text-muted">Category</p>
            <p className="mt-1">{categoryLabel(project.category)}</p>
          </div>
          <div>
            <p className="text-muted">Tools</p>
            <p className="mt-1">{project.tools.join(", ")}</p>
          </div>
        </RevealOnScroll>
      </div>

      {project.paperUrl ? (
        <RevealOnScroll delay={0.25} className="mt-12 w-full">
          <IframeEmbed src={project.paperUrl} title={`${project.title} — full paper`} linkLabel="Download PDF" />
        </RevealOnScroll>
      ) : project.demoUrl ? (
        <RevealOnScroll delay={0.25} className="mt-12 w-full">
          <IframeEmbed src={project.demoUrl} title={`${project.title} — live demo`} linkLabel="Open live demo" />
        </RevealOnScroll>
      ) : (
        <RevealOnScroll delay={0.25} className="mt-12 aspect-[16/9] w-full">
          <ProjectVisual slug={project.slug} alt={project.title} image={project.image} className="h-full w-full" />
        </RevealOnScroll>
      )}
    </header>
  );
}
