import { HoverLink } from "@/components/ui/HoverLink";
import { profile } from "@/data/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule-strong px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p className="measure text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
          © {year} {profile.name}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <HoverLink
            href={`mailto:${profile.email}`}
            className="measure text-[0.6875rem] uppercase tracking-[0.14em] text-ink"
          >
            Email
          </HoverLink>
          <HoverLink
            href={profile.linkedinUrl}
            external
            className="measure text-[0.6875rem] uppercase tracking-[0.14em] text-ink"
          >
            LinkedIn
          </HoverLink>
          <HoverLink
            href={profile.githubUrl}
            external
            className="measure text-[0.6875rem] uppercase tracking-[0.14em] text-ink"
          >
            GitHub
          </HoverLink>
        </div>
      </div>
    </footer>
  );
}
