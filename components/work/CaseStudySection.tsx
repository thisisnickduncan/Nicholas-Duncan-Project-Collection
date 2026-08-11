import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface CaseStudySectionProps {
  label: string;
  children: ReactNode;
}

/**
 * Prose in the main column with its label held in the margin. The label sticks
 * while its section scrolls, so a reader deep in a long passage can always see
 * which of the three questions they are inside.
 */
export function CaseStudySection({ label, children }: CaseStudySectionProps) {
  return (
    <RevealOnScroll className="mx-auto grid max-w-6xl grid-cols-1 gap-4 border-t border-rule px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-3">
        <h2 className="measure text-xs uppercase tracking-[0.16em] text-signal lg:sticky lg:top-28">
          {label}
        </h2>
      </div>
      <div className="max-w-[68ch] space-y-5 text-lg leading-[1.65] text-ink lg:col-span-9">
        {children}
      </div>
    </RevealOnScroll>
  );
}
