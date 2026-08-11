import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { profile } from "@/data/profile";

export function ContactBlock() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-28 border-t border-rule-strong px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <RevealOnScroll>
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Contact Me
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.06} className="mt-8">
            <HoverLink
              href={`mailto:${profile.email}`}
              className="text-[clamp(1.125rem,2.4vw,1.75rem)] font-medium tracking-[-0.02em]"
            >
              {profile.email}
            </HoverLink>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="mt-4">
            <HoverLink
              href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}
              className="measure text-[clamp(1.125rem,2.4vw,1.75rem)] font-medium tracking-tight"
            >
              {profile.phone}
            </HoverLink>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.14} className="lg:col-span-5 lg:pt-4">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-2">
            <div>
              <dt className="measure text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                Based in
              </dt>
              <dd className="mt-2 text-sm text-ink">{profile.location}</dd>
            </div>
            <div>
              <dt className="measure text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                Elsewhere
              </dt>
              <dd className="mt-2 flex flex-col gap-1 text-sm">
                <HoverLink href={profile.linkedinUrl} external className="text-ink">
                  LinkedIn
                </HoverLink>
                <HoverLink href={profile.githubUrl} external className="text-ink">
                  GitHub
                </HoverLink>
                <HoverLink href={profile.instagramUrl} external className="text-ink">
                  Instagram
                </HoverLink>
              </dd>
            </div>
          </dl>
        </RevealOnScroll>
      </div>
    </section>
  );
}
