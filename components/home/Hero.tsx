import Image from "next/image";
import { SplitText } from "@/components/ui/SplitText";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HoverLink } from "@/components/ui/HoverLink";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-16 pt-36 sm:px-6 sm:pt-44 lg:grid-cols-12 lg:items-center lg:gap-4 lg:pb-24">
      <div className="lg:col-span-9">
        <SplitText
          as="h1"
          text={profile.name}
          className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-tight"
        />
        <RevealOnScroll delay={0.5} className="mt-6 text-sm text-muted">
          <span className="text-foreground">{profile.location}</span>
        </RevealOnScroll>
        <RevealOnScroll delay={0.65} className="mt-8">
          <HoverLink href="/work" className="text-sm font-medium">
            View selected work &rarr;
          </HoverLink>
        </RevealOnScroll>
      </div>

      <div className="lg:col-span-3">
        <RevealOnScroll delay={0.3} className="relative ml-auto w-40 sm:w-48 lg:w-full">
          <div className="relative aspect-[1171/1168] w-full">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="(min-width: 1024px) 20vw, 40vw"
              className="object-contain object-bottom"
              priority
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
