import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { SplitLines } from "@/components/ui/SplitLines";
import { profile } from "@/data/profile";

/* Both paragraphs are the same statement continuing, so they are set in one
   voice at one size. Ranking the second one down in size and colour made the
   background read as a footnote to the claim rather than part of it. */
const paragraphClass =
  "max-w-[54ch] text-[clamp(1.25rem,2.1vw,1.75rem)] leading-[1.45] tracking-[-0.015em] text-ink";

export function AboutTeaser() {
  const [statement, supporting] = profile.teaserParagraphs;

  return (
    <section className="mx-auto max-w-6xl border-t border-rule-strong px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <SplitLines as="p" text={statement} className={paragraphClass} />

          {supporting && (
            <SplitLines
              as="p"
              text={supporting}
              delay={0.12}
              className={`mt-7 ${paragraphClass}`}
            />
          )}
        </div>

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
