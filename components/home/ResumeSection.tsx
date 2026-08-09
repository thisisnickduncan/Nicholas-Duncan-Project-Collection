import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { IframeEmbed } from "@/components/work/IframeEmbed";
import { profile } from "@/data/profile";

export function ResumeSection() {
  return (
    <section className="mx-auto max-w-6xl border-t border-border px-4 py-16 sm:px-6 sm:py-24">
      <RevealOnScroll>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Resume</h2>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className="mt-8 w-full">
        <IframeEmbed src={profile.resumeUrl} title={`${profile.name} — resume`} linkLabel="Download Resume (PDF)" />
      </RevealOnScroll>
    </section>
  );
}
