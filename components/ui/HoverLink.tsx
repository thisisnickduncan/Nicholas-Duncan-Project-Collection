import Link from "next/link";
import type { ReactNode } from "react";

interface HoverLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}

/** Underline-wipe link: a bottom border scales in from the left on hover, no layout shift. */
export function HoverLink({ href, children, className = "", external = false, onClick }: HoverLinkProps) {
  const classes = `group relative inline-block w-fit cursor-pointer ${className}`;
  const content = (
    <>
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}
