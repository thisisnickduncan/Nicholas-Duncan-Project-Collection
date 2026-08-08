import { HoverLink } from "@/components/ui/HoverLink";
import { profile } from "@/data/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {profile.name}. Built with Next.js &amp; Framer Motion.</p>
        <div className="flex items-center gap-6">
          <HoverLink href={`mailto:${profile.email}`} className="text-foreground">
            Email
          </HoverLink>
          <HoverLink href={profile.linkedinUrl} external className="text-foreground">
            LinkedIn
          </HoverLink>
          <HoverLink href={profile.githubUrl} external className="text-foreground">
            GitHub
          </HoverLink>
        </div>
      </div>
    </footer>
  );
}
