import Image from "next/image";
import { HoverLink } from "@/components/ui/HoverLink";
import { MetricValue } from "@/components/ui/MetricValue";
import { Parallax } from "@/components/ui/Parallax";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

/**
 * Three real measurements, pulled from the case studies rather than restated, so
 * the hero can never drift out of sync with the work it is summarising.
 */
const HIGHLIGHTS: { slug: string; label: string }[] = [
  { slug: "swingscore-political-analytics", label: "Rows of data processed" },
  { slug: "telegram-news-collector", label: "Corroboration rate" },
  { slug: "telegram-news-collector", label: "Outlets bias-rated" },
];

function getHighlights() {
  return HIGHLIGHTS.map(({ slug, label }) => {
    const project = projects.find((p) => p.slug === slug);
    const metric = project?.outcomeMetrics?.find((m) => m.label === label);
    return metric && project ? { ...metric, slug: project.slug } : null;
  }).filter((m): m is { label: string; value: string; slug: string } => m !== null);
}

export function Hero() {
  const highlights = getHighlights();

  return (
    <section className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pb-14 pt-32 sm:px-6 sm:pt-36 lg:pb-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          {/* The claim, not the name. Rendered plainly on the server and animated
              in CSS: this is the largest paint on the page, so it must never wait
              for JavaScript to become readable — and must never be hidden again
              after it has already been read. */}
          <h1 className="rise-into-place max-w-[12ch] text-[clamp(3rem,8.2vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
            {profile.tagline}
          </h1>

          {/* Byline under the headline, the way an editorial page attributes a piece. */}
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
            <span className="font-medium text-ink">{profile.name}</span> — {profile.oneLineBio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium">
            <HoverLink href="/work">View selected work &rarr;</HoverLink>
            <HoverLink href={`mailto:${profile.email}`}>Get in touch &rarr;</HoverLink>
            <span className="measure text-xs uppercase tracking-widest text-ink-muted">
              {profile.location}
            </span>
          </div>
        </div>

        {/* The portrait trails the headline as the first screen scrolls away, which
            separates the two into layers and makes leaving the hero feel like one
            continuous movement rather than a cut to the next section. */}
        <Parallax className="lg:col-span-4" lag={0.1} range={["start start", "end start"]}>
          {/* The portrait sits on a surface rather than floating: it reads as a
              document photograph, and the panel gives the cutout a ground. */}
          <div className="relative ml-auto w-44 border border-rule bg-surface sm:w-52 lg:w-full">
            <div className="relative aspect-[1171/1168] w-full">
              <Image
                src={profile.photo}
                alt={`${profile.name}, portrait`}
                fill
                sizes="(min-width: 1024px) 22vw, 208px"
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </Parallax>
      </div>

      {/* The signature: his own corrections, read off the instrument. Every value
          here is a real measurement from a real case study. */}
      {highlights.length > 0 && (
        <dl className="mt-14 grid grid-cols-1 border-t border-rule-strong sm:grid-cols-3">
          {highlights.map((metric) => (
            <div
              key={`${metric.slug}-${metric.label}`}
              className="flex h-full flex-col justify-between gap-3 border-b border-rule py-5 sm:border-b-0 sm:border-r sm:px-6 sm:py-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              <dt className="measure order-last text-xs uppercase tracking-[0.14em] text-ink-muted">
                {metric.label}
              </dt>
              <dd className="measure text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-tight tracking-tight text-measure">
                <MetricValue value={metric.value} />
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
