import Image from "next/image";

interface ProjectVisualProps {
  slug: string;
  alt: string;
  image?: string;
  className?: string;
}

/** Deterministic hash so the same slug always produces the same placeholder look. */
function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function ProjectVisual({ slug, alt, image, className = "" }: ProjectVisualProps) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
      </div>
    );
  }

  const hash = hashSlug(slug);
  const angle = hash % 360;
  const offset = 20 + (hash % 40);

  return (
    <div
      className={`relative overflow-hidden bg-foreground/5 ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, color-mix(in srgb, var(--color-accent) ${offset}%, transparent), transparent 70%), repeating-linear-gradient(${angle + 90}deg, color-mix(in srgb, var(--color-foreground) 6%, transparent) 0px, transparent 1px, transparent 24px)`,
      }}
      aria-hidden="true"
    />
  );
}
