import Image from "next/image";
import Link from "next/link";
import { MetricValue } from "@/components/ui/MetricValue";
import { Parallax } from "@/components/ui/Parallax";
import { categoryLabel, type Project } from "@/data/projects";

/**
 * Every row carries something true in its visual slot: a real screenshot where one
 * exists, otherwise the project's own measurements. Nothing here is a generated
 * placeholder standing in for content that does not exist.
 *
 * The two cases deliberately do not share a shape. A screenshot gets a frame sized
 * to the screenshot; measurements get set as type. Forcing both into one fixed
 * rectangle left whichever one did not fit floating in dead space.
 */
function RowVisual({ project }: { project: Project }) {
  if (project.screenshot) {
    return (
      <div className="flex w-fit max-w-full justify-center border border-rule bg-surface p-4">
        <Image
          src={project.screenshot.src}
          alt=""
          width={project.screenshot.width}
          height={project.screenshot.height}
          sizes="(min-width: 1024px) 30vw, 90vw"
          className="h-auto max-h-64 w-auto max-w-full"
        />
      </div>
    );
  }

  if (project.outcomeMetrics?.length) {
    return (
      <dl className="grid grid-cols-1 gap-x-6 gap-y-5 border-t border-rule-strong pt-5 sm:grid-cols-2 lg:grid-cols-1">
        {project.outcomeMetrics.slice(0, 2).map((metric) => (
          <div key={metric.label} className="flex flex-col gap-2">
            {/* Label first in the DOM so each pair is a valid dt-then-dd, moved
                last visually so the measurement is what the eye reaches first. */}
            <dt className="measure order-last text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
              {metric.label}
            </dt>
            <dd className="measure text-[clamp(1.375rem,2vw,1.75rem)] font-medium leading-tight tracking-tight text-measure">
              <MetricValue value={metric.value} />
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return null;
}

export function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group grid grid-cols-1 items-start gap-6 border-t border-rule py-8 transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] first:border-t-0 hover:bg-surface lg:grid-cols-12 lg:gap-8 lg:px-4"
    >
      <div className="lg:col-span-7">
        <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
          {project.title}
        </h3>

        <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">{project.oneLiner}</p>

        <p className="measure mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
          <span className="text-signal">{categoryLabel(project.category)}</span>
          <span aria-hidden="true" className="text-rule-strong">
            /
          </span>
          <span>{project.tools.slice(0, 3).join(" · ")}</span>
        </p>

        <span className="measure mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-ink">
          Read the case study
          <span
            aria-hidden="true"
            className="text-signal transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </div>

      {/* The evidence trails its own headline as the row crosses the screen, so the
          list assembles under the scroll instead of arriving all at once. */}
      <Parallax className="lg:col-span-5" lag={0.07}>
        <RowVisual project={project} />
      </Parallax>
    </Link>
  );
}
