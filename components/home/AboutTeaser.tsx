import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { profile } from "@/data/profile";

export function AboutTeaser() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 border-t border-border px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12">
      <RevealOnScroll className="lg:col-span-8">
        <p className="text-2xl leading-snug tracking-tight sm:text-3xl">{profile.bioParagraphs[0]}</p>
      </RevealOnScroll>
      <RevealOnScroll delay={0.1} className="lg:col-span-4 lg:text-right">
        <HoverLink href="/about" className="text-sm">
          More about me &rarr;
        </HoverLink>
      </RevealOnScroll>
    </section>
  );
}
