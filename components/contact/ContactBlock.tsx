import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { profile } from "@/data/profile";

/** One field of the contact record: a micro label over its value. */
function ContactField({
  label,
  children,
  delay,
}: {
  label: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <RevealOnScroll delay={delay} className="py-6 lg:pr-8">
      <dt className="measure text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </dt>
      <dd className="mt-3 flex flex-col items-start gap-2">{children}</dd>
    </RevealOnScroll>
  );
}

/** Every contact value is the same size and weight, so no one of them shouts. */
const VALUE = "text-[clamp(1.0625rem,1.8vw,1.375rem)] font-medium tracking-[-0.02em] text-ink";

export function ContactBlock() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-28 border-t border-rule-strong px-4 py-20 sm:px-6 sm:py-28"
    >
      <RevealOnScroll>
        <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          Contact Me
        </h2>
      </RevealOnScroll>

      {/* Three fields on one grid: same label, same value size, same rhythm, so the
          section reads as one record rather than three loose bits of text. */}
      <dl className="mt-10 grid grid-cols-1 gap-x-8 lg:grid-cols-3">
        <ContactField label="Email" delay={0.06}>
          <HoverLink href={`mailto:${profile.email}`} className={VALUE}>
            {profile.email}
          </HoverLink>
        </ContactField>

        <ContactField label="Phone" delay={0.1}>
          <HoverLink href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`} className={VALUE}>
            {profile.phone}
          </HoverLink>
        </ContactField>

        <ContactField label="Other places to check out!" delay={0.14}>
          <HoverLink href={profile.linkedinUrl} external className={VALUE}>
            LinkedIn
          </HoverLink>
          <HoverLink href={profile.githubUrl} external className={VALUE}>
            GitHub
          </HoverLink>
          <HoverLink href={profile.instagramUrl} external className={VALUE}>
            Instagram
          </HoverLink>
        </ContactField>
      </dl>
    </section>
  );
}
