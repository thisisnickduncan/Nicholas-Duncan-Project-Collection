import { HoverLink } from "@/components/ui/HoverLink";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-4 pt-24 sm:px-6">
      <p className="font-heading text-sm text-muted">404</p>
      <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you&rsquo;re looking for may have moved, or the link is out of date.
      </p>
      <HoverLink href="/" className="mt-8 text-sm font-medium">
        &larr; Back home
      </HoverLink>
    </section>
  );
}
