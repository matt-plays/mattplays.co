import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PageTransition from "@/components/PageTransition";
import PromoBar from "@/components/PromoBar";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";
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

async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    });
  } catch {
    // The siteSettings document may not exist yet; the chrome components
    // fall back to hardcoded values matching the live site.
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

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
        <PageTransition />
        <PromoBar settings={settings?.promoBar} />
        <Nav navLinks={settings?.navLinks} />
        {children}
        <Footer footerLinks={settings?.footerLinks} socials={settings?.socials} />
        <Analytics />
      </body>
    </html>
  );
}
