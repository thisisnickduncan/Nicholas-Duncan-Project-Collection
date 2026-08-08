import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface CaseStudySectionProps {
  index: string;
  label: string;
  children: ReactNode;
}

export function CaseStudySection({ index, label, children }: CaseStudySectionProps) {
  return (
    <RevealOnScroll className="mx-auto grid max-w-6xl grid-cols-1 gap-4 border-t border-border px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <p className="font-heading text-sm text-muted">
          {index} &mdash; {label}
        </p>
      </div>
      <div className="max-w-2xl text-lg leading-relaxed lg:col-span-8 lg:col-start-4">{children}</div>
    </RevealOnScroll>
  );
}
