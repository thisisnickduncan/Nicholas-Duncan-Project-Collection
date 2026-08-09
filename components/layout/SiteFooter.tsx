import { profile } from "@/data/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl text-sm text-muted">
        <p>© {year} {profile.name}. Built with Next.js &amp; Framer Motion.</p>
      </div>
    </footer>
  );
}
