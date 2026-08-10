import Image from "next/image";

/**
 * Shows a product screenshot at its own aspect ratio, centered on a tinted panel.
 * Unlike ProjectVisual's 16/9 object-cover, this never crops -- which matters for
 * phone captures, where cover would reduce a tall screenshot to a horizontal band.
 */
export function ScreenshotPanel({
  src,
  alt,
  width,
  height,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex justify-center border border-border bg-foreground/5 px-4 py-8 sm:px-6 sm:py-12">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority
          className="h-auto max-h-[70vh] w-auto max-w-full border border-border"
        />
      </div>
      {caption && <p className="mt-3 text-sm text-muted">{caption}</p>}
    </div>
  );
}
