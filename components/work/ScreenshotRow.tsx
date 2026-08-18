import Image from "next/image";

interface RowShot {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * Several captures of one running thing, read as a set rather than a gallery.
 *
 * One frame holds all of them so they look like three views of a single program
 * instead of three separate exhibits, and the group is centred as a unit. Heights
 * differ because the captures do; they are centred against each other rather than
 * stretched, since cropping a phone capture to a shared height would cut the
 * evidence out of the picture.
 */
export function ScreenshotRow({
  shots,
  caption,
  priority = false,
  className = "",
}: {
  shots: RowShot[];
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="mx-auto flex w-fit max-w-full flex-col items-center justify-center gap-8 border border-rule bg-surface px-4 py-8 sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-12 lg:gap-10">
        {shots.map((shot, i) => (
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            priority={priority && i === 0}
            sizes="(min-width: 640px) 30vw, 90vw"
            className="h-auto max-h-[60vh] w-auto max-w-full border border-rule"
          />
        ))}
      </div>
      {caption && (
        <figcaption className="mx-auto mt-4 max-w-[62ch] text-center text-sm leading-relaxed text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
