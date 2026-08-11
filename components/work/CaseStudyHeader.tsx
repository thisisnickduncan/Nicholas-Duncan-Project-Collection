import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { IframeEmbed } from "@/components/work/IframeEmbed";
import { ScreenshotPanel } from "@/components/work/ScreenshotPanel";
import { categoryLabel, type Project } from "@/data/projects";

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="measure text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-relaxed text-ink">{value}</dd>
    </div>
  );
}

export function CaseStudyHeader({ project }: { project: Project }) {
  return (
    <header className="mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6 sm:pt-40">
      <HoverLink href="/work" className="measure text-xs uppercase tracking-[0.14em] text-ink-muted">
        &larr; All work
      </HoverLink>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <h1 className="max-w-[16ch] text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink-muted">
            {project.oneLiner}
          </p>

          {(project.githubUrl || project.demoUrl) && (
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
              {project.githubUrl && (
                <HoverLink
                  href={project.githubUrl}
                  external
                  className="measure text-xs uppercase tracking-[0.14em] text-ink"
                >
                  View source &rarr;
                </HoverLink>
              )}
              {project.demoUrl && (
                <HoverLink
                  href={project.demoUrl}
                  external
                  className="measure text-xs uppercase tracking-[0.14em] text-ink"
                >
                  Live demo &rarr;
                </HoverLink>
              )}
            </div>
          )}
        </div>

        <dl className="grid grid-cols-2 gap-6 border-t border-rule pt-6 lg:col-span-4 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <Fact label="Role" value={project.role} />
          <Fact label="Category" value={categoryLabel(project.category)} />
          <div className="col-span-2 lg:col-span-1">
            <dt className="measure text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
              Tools
            </dt>
            <dd className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="measure border border-rule px-2 py-1 text-[0.6875rem] text-ink-muted"
                >
                  {tool}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      {project.paperUrl ? (
        <RevealOnScroll className="mt-14 w-full">
          <IframeEmbed
            src={project.paperUrl}
            title={`${project.title} — full paper`}
            linkLabel="Download the paper (PDF)"
          />
        </RevealOnScroll>
      ) : project.demoUrl ? (
        <RevealOnScroll className="mt-14 w-full">
          <IframeEmbed
            src={project.demoUrl}
            title={`${project.title} — live demo`}
            linkLabel="Open the live demo"
          />
        </RevealOnScroll>
      ) : project.screenshot ? (
        <RevealOnScroll className="mt-14 w-full">
          <ScreenshotPanel
            src={project.screenshot.src}
            alt={`${project.title} — screenshot`}
            width={project.screenshot.width}
            height={project.screenshot.height}
            caption={project.screenshot.caption}
            priority
          />
        </RevealOnScroll>
      ) : null}
    </header>
  );
}
