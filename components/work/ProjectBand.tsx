import Link from "next/link";
import { MetricValue } from "@/components/ui/MetricValue";
import { SweepRule } from "@/components/ui/SweepRule";
import { categoryLabel, DEFAULT_CTA_LABEL, type Project } from "@/data/projects";

/**
 * A project as a full-width band rather than a row in a two-column list.
 *
 * The measurements are the artwork. Set at display size they are the most
 * striking thing on the page and they are also the truest — every other way of
 * filling this space would have been decoration standing in for evidence.
 *
 * No screenshots here. A band is a claim; the images belong to the case study
 * the claim opens, so both listings stay a level surface where the project with
 * a picture cannot outshout the one whose evidence is a paper.
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

        <span className="measure inline-flex items-center gap-3 self-start text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:text-signal lg:col-span-6 lg:justify-self-end">
          {project.ctaLabel ?? DEFAULT_CTA_LABEL}
          <span
            aria-hidden="true"
            className="text-signal transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:translate-x-1.5"
          >
            &rarr;
          </span>
        </span>
      </div>

      {metrics.length > 0 && (
        /* Three cells divided by hairlines rather than three stacks floating in
           whitespace: the same panel the case study ends on, so a measurement
           looks like the same instrument wherever the reader meets it. */
        <dl className="mt-12 grid grid-cols-1 border-t border-rule-strong sm:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex h-full flex-col justify-between gap-3 border-b border-rule py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:py-8 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              {/* Labels sit at the bottom of the stretched cell, so a value that
                  wraps cannot drop its label below its neighbours. */}
              <dt className="measure order-last text-[0.6875rem] uppercase tracking-[0.16em] text-ink-muted">
                {metric.label}
              </dt>
              <dd
                className={`measure font-medium leading-[1.08] tracking-[-0.02em] text-measure ${
                  /* A figure and a phrase are not the same kind of value. Set at
                     one size the sentences swamp the numbers they sit beside,
                     which inverts what the strip is for. */
                  metric.value.length > 12
                    ? "text-[clamp(1.25rem,2.1vw,1.75rem)]"
                    : "text-[clamp(1.75rem,3.4vw,3rem)]"
                }`}
              >
                <MetricValue value={metric.value} />
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Link>
  );
}
