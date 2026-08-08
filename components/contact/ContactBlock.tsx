import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { profile } from "@/data/profile";

export function ContactBlock() {
  return (
    <section className="mx-auto max-w-6xl border-t border-border px-4 py-16 sm:px-6 sm:py-24">
      <RevealOnScroll>
        <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-semibold leading-[1.1] tracking-tight">
          Let&rsquo;s talk about what you&rsquo;re building.
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className="mt-8">
        <HoverLink href={`mailto:${profile.email}`} className="text-2xl font-medium sm:text-3xl">
          {profile.email}
        </HoverLink>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2} className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
        <HoverLink href={profile.linkedinUrl} external className="text-foreground">
          LinkedIn
        </HoverLink>
        <HoverLink href={profile.githubUrl} external className="text-foreground">
          GitHub
        </HoverLink>
        <HoverLink href={profile.resumeUrl} className="text-foreground">
          Resume (PDF)
        </HoverLink>
      </RevealOnScroll>
    </section>
  );
}
