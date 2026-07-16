/**
 * Shapes returned by `siteSettingsQuery`. The siteSettings document is a
 * singleton and may not exist yet — every consumer must tolerate null.
 */

export interface PromoBarOverride {
  path?: string | null;
  text?: string | null;
  linkLabel?: string | null;
  linkHref?: string | null;
  hideLink?: boolean | null;
}

export interface PromoBarSettings {
  enabled?: boolean | null;
  text?: string | null;
  linkLabel?: string | null;
  linkHref?: string | null;
  overrides?: PromoBarOverride[] | null;
}

export interface NavLinkItem {
  label?: string | null;
  href?: string | null;
  comingSoon?: boolean | null;
}

export interface SocialLink {
  label?: string | null;
  url?: string | null;
}

export interface SiteSettings {
  promoBar?: PromoBarSettings | null;
  navLinks?: NavLinkItem[] | null;
  footerLinks?: NavLinkItem[] | null;
  socials?: SocialLink[] | null;
}
