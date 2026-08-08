import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { profile } from "@/data/profile";

export function ExperienceTimeline() {
  return (
    <section className="mx-auto max-w-6xl border-t border-border px-4 py-16 sm:px-6 sm:py-24">
      <RevealOnScroll>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Experience</h2>
      </RevealOnScroll>

      <div className="mt-8">
        {profile.experience.map((entry, i) => (
          <RevealOnScroll
            key={entry.org}
            delay={i * 0.05}
            className="grid grid-cols-1 gap-4 border-t border-border py-8 first:border-t-0 lg:grid-cols-12"
          >
            <p className="text-sm text-muted lg:col-span-3">{entry.dates}</p>
            <div className="lg:col-span-9">
              <h3 className="text-xl font-semibold tracking-tight">{entry.role}</h3>
              <p className="mt-1 text-muted">{entry.org}</p>
              <ul className="mt-4 space-y-2 text-muted">
                {entry.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-3">
                    <span aria-hidden="true">&mdash;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
