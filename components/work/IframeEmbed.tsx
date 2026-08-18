import { HoverLink } from "@/components/ui/HoverLink";

/**
 * An embed that cannot show up as an empty box.
 *
 * Both things this frames — a free-tier demo that sleeps between visits, and a
 * PDF that phone browsers refuse to render inline — fail by drawing nothing at
 * all. The iframe sits on top of a fallback that names what belongs here and
 * links straight to it, so a frame that paints nothing reveals the note beneath
 * instead of a blank rectangle.
 */
export function IframeEmbed({
  src,
  title,
  linkLabel,
  fallback,
  className = "",
}: {
  src: string;
  title: string;
  linkLabel: string;
  /** Shown through the frame when the embed itself renders nothing. */
  fallback?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="border border-rule bg-surface p-3 sm:p-5">
        <div className="relative h-[clamp(26rem,68vh,52rem)] w-full overflow-hidden border border-rule bg-paper">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="measure max-w-[34ch] text-xs uppercase leading-[1.8] tracking-[0.14em] text-ink-muted">
              {fallback ?? "If this frame stays blank, open it directly."}
            </p>
            <HoverLink href={src} external className="measure text-xs uppercase tracking-[0.14em] text-ink">
              {linkLabel} &rarr;
            </HoverLink>
          </div>
          {/* Above the note, and transparent when it has nothing to paint. */}
          <iframe
            src={src}
            title={title}
            loading="lazy"
            className="relative h-full w-full"
            style={{ background: "transparent" }}
          />
        </div>
      </div>
      <div className="mt-4">
        <HoverLink href={src} external className="measure text-xs uppercase tracking-[0.14em] text-ink">
          {linkLabel} &rarr;
        </HoverLink>
      </div>
    </div>
  );
}
