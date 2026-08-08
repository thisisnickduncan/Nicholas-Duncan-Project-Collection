import type { Metadata } from "next";
import { AboutIntro } from "@/components/about/AboutIntro";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { SkillsGrid } from "@/components/about/SkillsGrid";
import { ContactBlock } from "@/components/contact/ContactBlock";

export const metadata: Metadata = {
  title: "About — Nick Duncan",
  description: "Background, experience, and skills.",
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <ExperienceTimeline />
      <SkillsGrid />
      <ContactBlock />
    </>
  );
}
