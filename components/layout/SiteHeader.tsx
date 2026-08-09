import { HoverLink } from "@/components/ui/HoverLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-4 top-4 z-50 sm:inset-x-6 sm:top-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between border border-border bg-background/80 px-4 py-3 backdrop-blur-md sm:px-6">
        <HoverLink href="/" className="text-sm font-semibold tracking-tight">
          Home
        </HoverLink>
        <nav className="flex items-center gap-6 text-sm">
          <HoverLink href="/work">Work</HoverLink>
          <HoverLink href="/#contact">Contact</HoverLink>
          <HoverLink href="/about">About</HoverLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
