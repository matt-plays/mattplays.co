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

// The faces behind headline/text, mono, and overline — the three roles that
// show up above the fold on every page.
const preloadFonts = [
  "/fonts/Universal-Sans-Display-400.woff2",
  "/fonts/FKGroteskMono-Regular.woff2",
  "/fonts/SpeziaExtendedWeb-Bold.woff2",
];

/*
 * Applies the stored theme before first paint, so a dark-mode visitor never
 * sees a white flash. No stored choice means no attribute, which leaves the
 * prefers-color-scheme media query in theme.css in charge.
 *
 * data-theme-ready is set on the next frame: theme.css only transitions
 * colours once it is present, which keeps the transition from firing during
 * the initial render.
 */
const themeScript = `(function(){try{var t=localStorage.getItem('mp-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}requestAnimationFrame(function(){document.documentElement.setAttribute('data-theme-ready','')})})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
