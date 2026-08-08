import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-border px-2 py-1 text-xs uppercase tracking-wide text-muted">
      {children}
    </span>
  );
}
