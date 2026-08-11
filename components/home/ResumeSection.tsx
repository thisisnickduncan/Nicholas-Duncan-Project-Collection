import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { profile } from "@/data/profile";

export function ResumeSection() {
  return (
    <section className="mx-auto max-w-6xl border-t border-rule-strong px-4 py-20 sm:px-6 sm:py-28">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.03em]">
          Resume
        </h2>
        <HoverLink
          href={profile.resumeUrl}
          external
          className="measure text-xs uppercase tracking-[0.14em] text-ink"
        >
          Download PDF &rarr;
        </HoverLink>
      </div>

      {/* The document sits on the raised surface, framed and given breathing room,
          rather than filling three-quarters of the viewport as a raw embed. Screens
          too small to render a PDF page legibly get the download instead of a
          letterbox they would have to pinch at. */}
      <RevealOnScroll className="mt-10">
        <div className="hidden border border-rule bg-surface p-4 sm:block sm:p-6">
          <div className="h-[clamp(30rem,60vh,44rem)] w-full overflow-hidden border border-rule bg-paper">
            <iframe
              src={`${profile.resumeUrl}#view=FitH`}
              title={`${profile.name} — resume`}
              loading="lazy"
              className="h-full w-full"
            />
          </div>
        </div>

        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 border border-rule bg-surface px-5 py-6 transition-colors duration-[var(--duration-base)] ease-[var(--ease-out)] hover:border-rule-strong sm:hidden"
        >
          <span>
            <span className="block font-display text-lg font-semibold tracking-tight text-ink">
              Resume
            </span>
            <span className="measure mt-1 block text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
              PDF · Opens in a new tab
            </span>
          </span>
          <span aria-hidden="true" className="text-signal">
            &rarr;
          </span>
        </a>
      </RevealOnScroll>
    </section>
  );
}
