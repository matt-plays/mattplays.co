import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PageTransition from "@/components/PageTransition";
import PromoBar from "@/components/PromoBar";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

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

/**
 * Global site chrome (promo bar, nav, footer, page transition). Used by the
 * (site) route-group layout and the root not-found page — NOT by /studio,
 * which needs a bare full-screen canvas.
 */
export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <PageTransition />
      <PromoBar settings={settings?.promoBar} />
      <Nav navLinks={settings?.navLinks} />
      {children}
      <Footer footerLinks={settings?.footerLinks} socials={settings?.socials} />
    </>
  );
}
