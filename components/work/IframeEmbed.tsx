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
      <div className="h-[75vh] w-full overflow-hidden border border-border bg-foreground/5">
        <iframe src={src} title={title} className="h-full w-full" />
      </div>
      <div className="mt-3 text-sm">
        <HoverLink href={src} external>
          {linkLabel} &rarr;
        </HoverLink>
      </div>
    </div>
  );
}
