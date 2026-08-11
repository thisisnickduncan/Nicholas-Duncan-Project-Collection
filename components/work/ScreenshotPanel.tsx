import Image from "next/image";

/**
 * Shows a product screenshot at its own aspect ratio, centered on the raised panel.
 * Unlike a cover crop this never trims the image, which matters for phone captures
 * where cover would reduce a tall screenshot to a horizontal band.
 */
export function ScreenshotPanel({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="flex justify-center border border-rule bg-surface px-4 py-8 sm:px-6 sm:py-12">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 640px) 60vw, 90vw"
          className="h-auto max-h-[70vh] w-auto max-w-full border border-rule"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 max-w-[62ch] text-sm leading-relaxed text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
