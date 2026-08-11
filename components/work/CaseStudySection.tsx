import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface CaseStudySectionProps {
  label: string;
  children: ReactNode;
  /**
   * Content that closes the section at full width. Measurements go here rather
   * than in `children`: the reading measure is set for prose, and a row of
   * instrument readouts squeezed into it wraps every value onto three lines.
   */
  footer?: ReactNode;
}

/**
 * Prose in the main column with its label held in the margin. The label sticks
 * while its section scrolls, so a reader deep in a long passage can always see
 * which of the three questions they are inside.
 */
export function CaseStudySection({ label, children, footer }: CaseStudySectionProps) {
  return (
    <RevealOnScroll className="mx-auto grid max-w-6xl grid-cols-1 gap-4 border-t border-rule px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-3">
        <h2 className="measure text-xs uppercase tracking-[0.16em] text-signal lg:sticky lg:top-28">
          {label}
        </h2>
      </div>
      {/* 56ch, not 68ch: the ch unit measures the zero glyph, which in Plex Sans is
          far wider than the average lowercase letter, so 68ch was buying 83 real
          characters a line. This lands near 66. */}
      <div className="max-w-[56ch] space-y-5 text-lg leading-[1.65] text-ink lg:col-span-9">
        {children}
      </div>
      {footer && <div className="lg:col-span-12">{footer}</div>}
    </RevealOnScroll>
  );
}
