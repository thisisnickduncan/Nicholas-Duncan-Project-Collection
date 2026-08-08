import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { profile } from "@/data/profile";

export function AboutIntro() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-16 pt-36 sm:px-6 sm:pt-44 lg:grid-cols-12">
      <RevealOnScroll className="lg:col-span-8">
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">About</h1>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
          {profile.bioParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15} className="space-y-6 text-sm lg:col-span-4">
        {profile.education.map((edu) => (
          <div key={edu.school}>
            <p className="text-muted">Education</p>
            <p className="mt-1">{edu.school}</p>
            <p className="text-muted">{edu.degree}</p>
            <p className="text-muted">{edu.focus}</p>
            <p className="mt-1 text-muted">{edu.dates}</p>
          </div>
        ))}
        <div>
          <p className="text-muted">Based in</p>
          <p className="mt-1">{profile.location}</p>
        </div>
        <div>
          <p className="text-muted">Certifications</p>
          {profile.certifications.map((cert) => (
            <p key={cert} className="mt-1">
              {cert}
            </p>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
