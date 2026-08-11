import { HoverLink } from "@/components/ui/HoverLink";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-4 pt-24 sm:px-6">
      <p className="measure text-xs uppercase tracking-[0.14em] text-signal">404</p>
      <h1 className="mt-5 max-w-[16ch] text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-ink-muted">
        The page you&rsquo;re looking for may have moved, or the link is out of date.
      </p>
      <div className="mt-9 flex flex-wrap gap-x-7 gap-y-2">
        <HoverLink href="/" className="measure text-xs uppercase tracking-[0.14em] text-ink">
          &larr; Back home
        </HoverLink>
        <HoverLink href="/work" className="measure text-xs uppercase tracking-[0.14em] text-ink">
          See the work &rarr;
        </HoverLink>
      </div>
    </section>
  );
}
