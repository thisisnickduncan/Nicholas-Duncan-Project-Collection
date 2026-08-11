import Image from "next/image";
import { HoverLink } from "@/components/ui/HoverLink";
import { Parallax } from "@/components/ui/Parallax";
import { profile } from "@/data/profile";

export function Hero() {
  /* A non-breaking hyphen for display only: the compound in the tagline is one
     word typographically, and letting it split across two lines would read as a
     mistake. The stored string keeps a plain hyphen for titles and share cards. */
  const tagline = profile.tagline.replace(/-/g, "‑");

  return (
    <section className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pb-14 pt-32 sm:px-6 sm:pt-36 lg:pb-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          {/* The claim, not the name. Rendered plainly on the server and animated
              in CSS: this is the largest paint on the page, so it must never wait
              for JavaScript to become readable — and must never be hidden again
              after it has already been read. */}
          {/* Sized so the longest unbreakable token — the hyphenated compound —
              still clears the portrait's column at every width. */}
          <h1 className="rise-into-place max-w-[16ch] text-[clamp(2.75rem,6.6vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
            {tagline}
          </h1>

          {/* Byline under the headline, the way an editorial page attributes a piece. */}
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
            <span className="font-medium text-ink">{profile.name}</span> — {profile.oneLineBio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium">
            <HoverLink href="/work">View selected work &rarr;</HoverLink>
            <span className="measure text-xs uppercase tracking-widest text-ink-muted">
              {profile.location}
            </span>
          </div>
        </div>

        {/* The portrait trails the headline as the first screen scrolls away, which
            separates the two into layers and makes leaving the hero feel like one
            continuous movement rather than a cut to the next section. */}
        <Parallax className="lg:col-span-4" lag={0.1} range={["start start", "end start"]}>
          {/* The cutout stands directly on the page in both themes — no panel, no
              frame — so the only background behind it is the paper itself. The
              photograph ends mid-chest at the edge of the file. Fading that last
              band out was worse than the crop it hid: on light paper a navy
              jacket dissolving into greige reads as a broken image, not a
              decision. The figure is solid, and the crop is stated — it stands
              on a hairline, the same rule every other section is built from. */}
          <div className="relative ml-auto w-44 sm:w-52 lg:w-full">
            <div className="relative aspect-[1171/1168] w-full border-b border-rule-strong">
              <Image
                src={profile.photo}
                alt={`${profile.name}, portrait`}
                fill
                sizes="(min-width: 1024px) 22vw, 208px"
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
