import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { profile } from "@/data/profile";

export function SkillsGrid() {
  return (
    <section className="mx-auto max-w-6xl border-t border-border px-4 py-16 sm:px-6 sm:py-24">
      <RevealOnScroll>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Skills</h2>
      </RevealOnScroll>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {profile.skillCategories.map((group, i) => (
          <RevealOnScroll key={group.category} delay={i * 0.05}>
            <h3 className="text-sm font-medium text-muted">{group.category}</h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-sm">
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
