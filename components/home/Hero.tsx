import { SplitText } from "@/components/ui/SplitText";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-16 pt-36 sm:px-6 sm:pt-44 lg:grid-cols-12 lg:gap-4 lg:pb-24">
      <div className="lg:col-span-9">
        <SplitText
          as="h1"
          text={profile.tagline}
          className="text-[clamp(2.25rem,6.5vw,5.5rem)] font-semibold leading-[1.05] tracking-tight"
        />
        <RevealOnScroll delay={0.5} className="mt-8 max-w-xl text-lg text-muted">
          {profile.oneLineBio}
        </RevealOnScroll>
        <RevealOnScroll delay={0.65} className="mt-8">
          <HoverLink href="/work" className="text-sm font-medium">
            View selected work &rarr;
          </HoverLink>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.4} className="flex flex-col gap-6 text-sm text-muted lg:col-span-3 lg:items-end lg:text-right">
        <div>
          <p className="text-foreground">{profile.location}</p>
          <p>Open to full-time roles</p>
        </div>
        <div>
          <p className="text-foreground">Targeting</p>
          <p>IT &middot; PM &middot; Data &middot; Security</p>
        </div>
      </RevealOnScroll>
    </section>
  );
}
