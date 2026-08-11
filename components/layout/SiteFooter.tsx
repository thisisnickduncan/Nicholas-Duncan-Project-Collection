import { profile } from "@/data/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule-strong px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="measure text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  );
}
