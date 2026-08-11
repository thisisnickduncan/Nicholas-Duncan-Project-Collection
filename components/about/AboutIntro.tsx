import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { profile } from "@/data/profile";

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="measure text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-relaxed text-ink">{children}</dd>
    </div>
  );
}

export function AboutIntro() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
      <h1 className="max-w-[14ch] text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
        About
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <RevealOnScroll className="lg:col-span-8">
          <div className="max-w-[68ch] space-y-6 text-lg leading-[1.65] text-ink">
            {profile.bioParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.08} className="lg:col-span-4">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-rule pt-6 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {profile.education.map((edu) => (
              <Fact key={edu.school} label="Education">
                <span className="block font-medium">{edu.school}</span>
                <span className="mt-1 block text-ink-muted">{edu.degree}</span>
                <span className="block text-ink-muted">{edu.focus}</span>
                <span className="measure mt-2 block text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                  {edu.dates}
                </span>
                {edu.highlights.map((highlight) => (
                  <span key={highlight} className="measure mt-1 block text-xs text-measure">
                    {highlight}
                  </span>
                ))}
              </Fact>
            ))}

            <Fact label="Based in">{profile.location}</Fact>

            <Fact label="Certifications">
              {profile.certifications.map((cert) => (
                <span key={cert} className="block">
                  {cert}
                </span>
              ))}
            </Fact>
          </dl>
        </RevealOnScroll>
      </div>
    </section>
  );
}
