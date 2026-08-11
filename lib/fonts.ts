import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

/** Display voice. Variable optical-size and width axes let one family carry both the
 *  huge hero setting and the smaller section headings without a second face. */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

/** Reading voice. Humanist, drawn to sit between person and machine — the same argument
 *  the site makes about its subject. */
export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

/** Measurement voice. Used only for data: metrics, counts, dates, tool lists, spreads.
 *  Never as decoration — monospace as costume is the thing this avoids. */
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});
