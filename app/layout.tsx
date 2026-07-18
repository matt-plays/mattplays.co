import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mattplays.co"),
  title: "Matt Plays × Design",
  description:
    "The design portfolio of Matt Plays — brand design, art direction, and web design.",
};

const preloadFonts = [
  "/fonts/SharpGroteskSmBold23.woff2",
  "/fonts/soehne-buch.woff2",
  "/fonts/soehne-mono-buch.woff2",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {preloadFonts.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
