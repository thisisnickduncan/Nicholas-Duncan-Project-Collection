import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyHeader } from "@/components/work/CaseStudyHeader";
import { CaseStudySection } from "@/components/work/CaseStudySection";
import { CaseStudyNav } from "@/components/work/CaseStudyNav";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
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
      <CaseStudySection label="Outcome">
        {project.outcome.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
        {project.outcomeMetrics && (
          <dl className="mt-10 grid grid-cols-1 border-t border-rule-strong sm:grid-cols-3">
            {project.outcomeMetrics.map((metric) => (
              <div
                key={metric.label}
                className="border-b border-rule py-5 sm:border-b-0 sm:border-r sm:px-5 sm:py-6 sm:first:pl-0 sm:last:border-r-0"
              >
                <dd className="measure text-2xl font-medium leading-none tracking-tight text-measure">
                  {metric.value}
                </dd>
                <dt className="measure mt-3 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>
        )}
      </CaseStudySection>
      <CaseStudyNav currentSlug={project.slug} />
    </>
  );
}
