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
      <CaseStudySection index="01" label="Problem">
        <p>{project.problem}</p>
      </CaseStudySection>
      <CaseStudySection index="02" label="Approach">
        <p>{project.approach}</p>
      </CaseStudySection>
      <CaseStudySection index="03" label="Outcome">
        <div className="space-y-4">
          {project.outcome.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        {project.outcomeMetrics && (
          <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {project.outcomeMetrics.map((metric) => (
              <div key={metric.label}>
                <dt className="text-sm text-muted">{metric.label}</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-accent">{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </CaseStudySection>
      <CaseStudyNav currentSlug={project.slug} />
    </>
  );
}
