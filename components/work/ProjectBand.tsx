import Image from "next/image";
import Link from "next/link";
import { MetricValue } from "@/components/ui/MetricValue";
import { SweepRule } from "@/components/ui/SweepRule";
import { Parallax } from "@/components/ui/Parallax";
import { categoryLabel, type Project } from "@/data/projects";

/**
 * A project as a full-width band rather than a row in a two-column list.
 *
 * The measurements are the artwork. Set at display size they are the most
 * striking thing on the page and they are also the truest — every other way of
 * filling this space would have been decoration standing in for evidence. A
 * project with a screenshot shows it underneath at size; a project without one
 * is not short of anything, because its numbers were never a caption.
 */
export function ProjectBand({ project }: { project: Project }) {
  const metrics = project.outcomeMetrics?.slice(0, 3) ?? [];

  return (
    <Link
      href={`/work/${project.slug}`}
      data-band
      className="group relative block border-t border-rule-strong py-14 sm:py-20 lg:py-24"
    >
      <SweepRule />

      <p className="measure flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] uppercase tracking-[0.16em] text-ink-muted">
        <span className="text-signal">{categoryLabel(project.category)}</span>
        <span aria-hidden="true" className="text-rule-strong">
          /
        </span>
        <span>{project.tools.slice(0, 4).join(" · ")}</span>
      </p>

      <h3 className="mt-6 max-w-[18ch] text-[clamp(2rem,5.4vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
        {project.title}
      </h3>

      <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
        <p className="max-w-[52ch] text-lg leading-[1.55] text-ink-muted lg:col-span-6">
          {project.oneLiner}
        </p>

        <span className="measure inline-flex items-center gap-3 self-start text-xs uppercase tracking-[0.16em] text-ink lg:col-span-6 lg:justify-self-end">
          Read the case study
          <span
            aria-hidden="true"
            className="text-signal transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1.5"
          >
            &rarr;
          </span>
        </span>
      </div>

      {metrics.length > 0 && (
        <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-3">
              <dt className="measure order-last text-[0.6875rem] uppercase tracking-[0.16em] text-ink-muted">
                {metric.label}
              </dt>
              <dd className="measure text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-measure">
                <MetricValue value={metric.value} />
              </dd>
            </div>
          ))}
        </dl>
      )}

      {project.screenshot && (
        <Parallax className="mt-12" lag={0.05}>
          <div className="flex w-fit max-w-full justify-center border border-rule bg-surface p-5">
            <Image
              src={project.screenshot.src}
              alt=""
              width={project.screenshot.width}
              height={project.screenshot.height}
              sizes="(min-width: 1024px) 36vw, 80vw"
              className="h-auto max-h-[26rem] w-auto max-w-full"
            />
          </div>
        </Parallax>
      )}
    </Link>
  );
}
