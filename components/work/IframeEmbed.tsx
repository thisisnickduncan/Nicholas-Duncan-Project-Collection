import { HoverLink } from "@/components/ui/HoverLink";

export function IframeEmbed({
  src,
  title,
  linkLabel,
  className = "",
}: {
  src: string;
  title: string;
  linkLabel: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="border border-rule bg-surface p-3 sm:p-5">
        <div className="h-[clamp(26rem,68vh,52rem)] w-full overflow-hidden border border-rule bg-paper">
          <iframe src={src} title={title} loading="lazy" className="h-full w-full" />
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
