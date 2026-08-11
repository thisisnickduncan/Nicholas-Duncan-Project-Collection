import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { profile } from "@/data/profile";

export function ExperienceTimeline() {
  return (
    <section className="mx-auto max-w-6xl border-t border-rule-strong px-4 py-20 sm:px-6 sm:py-28">
      <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.03em]">
        Experience
      </h2>

      <div className="mt-10">
        {profile.experience.map((entry) => (
          <RevealOnScroll
            key={entry.org}
            className="grid grid-cols-1 gap-4 border-t border-rule py-9 first:border-t-0 lg:grid-cols-12 lg:gap-8"
          >
            <p className="measure text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted lg:col-span-3 lg:pt-1.5">
              {entry.dates}
            </p>

            <div className="lg:col-span-9">
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
                {entry.role}
              </h3>
              <p className="measure mt-1.5 text-xs uppercase tracking-[0.14em] text-signal">
                {entry.org}
              </p>

              <ul className="mt-5 max-w-[68ch] space-y-3">
                {entry.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-3 leading-relaxed text-ink-muted">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-rule-strong" />
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
