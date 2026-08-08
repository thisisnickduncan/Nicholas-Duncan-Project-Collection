import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactBlock } from "@/components/contact/ContactBlock";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <AboutTeaser />
      <ContactBlock />
    </>
  );
}
