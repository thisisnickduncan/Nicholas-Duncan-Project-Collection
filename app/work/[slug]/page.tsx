import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyHeader } from "@/components/work/CaseStudyHeader";
import { CaseStudySection } from "@/components/work/CaseStudySection";
import { CaseStudyNav } from "@/components/work/CaseStudyNav";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { MetricValue } from "@/components/ui/MetricValue";
import { projects, getProjectBySlug } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Nick Duncan`,
    description: project.oneLiner,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <ScrollProgressBar />
      <CaseStudyHeader project={project} />
      <CaseStudySection label="Problem">
        <p>{project.problem}</p>
      </CaseStudySection>
      <CaseStudySection label="Approach">
        <p>{project.approach}</p>
      </CaseStudySection>
      <CaseStudySection
        label="Outcome"
        footer={
          project.outcomeMetrics && (
            <dl className="mt-12 grid grid-cols-1 border-t border-rule-strong sm:grid-cols-3">
              {project.outcomeMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex h-full flex-col justify-between gap-3 border-b border-rule py-5 sm:border-b-0 sm:border-r sm:px-5 sm:py-6 sm:first:pl-0 sm:last:border-r-0"
                >
                  {/* Labels are pushed to the bottom of the stretched cell so a value
                      that wraps cannot drop its label below its neighbours. */}
                  <dt className="measure order-last text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                    {metric.label}
                  </dt>
                  <dd className="measure text-2xl font-medium leading-tight tracking-tight text-measure">
                    <MetricValue value={metric.value} />
                  </dd>
                </div>
              ))}
            </dl>
          )
        }
      >
        {project.outcome.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </CaseStudySection>
      <CaseStudyNav currentSlug={project.slug} />
    </>
  );
}
