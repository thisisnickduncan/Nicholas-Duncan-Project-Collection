import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { profile } from "@/data/profile";

export function AboutTeaser() {
  /* The second paragraph, not the first: the first restates the bio line already
     standing in the hero, while this one is the actual differentiator. */
  const statement = profile.bioParagraphs[1] ?? profile.bioParagraphs[0];

  return (
    <section className="mx-auto max-w-6xl border-t border-rule-strong px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <RevealOnScroll className="lg:col-span-9">
          <p className="max-w-3xl text-[clamp(1.25rem,2.1vw,1.75rem)] leading-[1.45] tracking-[-0.015em] text-ink">
            {statement}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.08} className="lg:col-span-3 lg:pt-2 lg:text-right">
          <HoverLink
            href="/about"
            className="measure text-xs uppercase tracking-[0.14em] text-ink-muted"
          >
            Full background &rarr;
          </HoverLink>
        </RevealOnScroll>
      </div>
    </section>
  );
}
