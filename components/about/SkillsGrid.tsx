import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { profile } from "@/data/profile";

export function SkillsGrid() {
  return (
    <section className="mx-auto max-w-6xl border-t border-rule-strong px-4 py-20 sm:px-6 sm:py-28">
      <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.03em]">
        Skills
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skillCategories.map((group) => (
          <RevealOnScroll key={group.category}>
            <h3 className="measure border-b border-rule pb-2 text-[0.6875rem] uppercase tracking-[0.14em] text-signal">
              {group.category}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="measure border border-rule px-2 py-1 text-[0.6875rem] text-ink-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
