import type { Metadata, Viewport } from "next";
import { bricolage, plexSans, plexMono } from "@/lib/fonts";
import { noFlashThemeScript } from "@/lib/theme";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { PageTransition } from "@/components/providers/PageTransition";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

/** Structured data so a search result can name the person, the role, and the
 *  credential rather than guessing from the page text. Every field is sourced
 *  from data/profile.ts — nothing here is asserted twice. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  description: profile.oneLineBio,
  url: siteUrl,
  image: `${siteUrl}${profile.photo}`,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: { "@type": "PostalAddress", addressLocality: "Laguna Niguel", addressRegion: "CA" },
  sameAs: [profile.linkedinUrl, profile.githubUrl],
  alumniOf: profile.education.map((edu) => ({
    "@type": "CollegeOrUniversity",
    name: edu.school,
  })),
  knowsAbout: profile.skillCategories.flatMap((group) => group.items),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.tagline}`,
    template: `%s`,
  },
  description: profile.oneLineBio,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: profile.name,
    title: `${profile.name} — ${profile.tagline}`,
    description: profile.oneLineBio,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.tagline}`,
    description: profile.oneLineBio,
  },
};

/* Matches --color-paper in each theme, so the browser chrome above the page
   continues the page rather than framing it. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9e6dd" },
    { media: "(prefers-color-scheme: dark)", color: "#17150f" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-paper"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
