import { Hero } from "@/components/home/Hero";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ResumeSection } from "@/components/home/ResumeSection";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ContactBlock } from "@/components/contact/ContactBlock";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ResumeSection />
      <SelectedWork />
      <ContactBlock />
    </>
  );
}
