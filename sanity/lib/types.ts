import type { PortableTextBlock } from "@portabletext/types";

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

/** Shape returned by `allChangelogQuery`. */
export interface ChangelogEntry {
  _id: string;
  title?: string | null;
  slug?: string | null;
  /** ISO date, e.g. "2025-01-27" */
  date?: string | null;
  image?: {
    _type: "image";
    asset?: { _ref: string; _type: "reference" } | null;
    alt?: string | null;
  } | null;
  body?: PortableTextBlock[] | null;
}

/**
 * Blog shapes.
 *
 * Every field below `title` is optional on purpose: the 60 posts imported from
 * Webflow (originally Squarespace) carry title/slug/date/body and nothing else,
 * so the templates have to render without art, summary or accent colour. See
 * `allBlogPostsQuery` for how `excerpt` is derived when no summary exists.
 */

export interface BlogImage {
  _type: "image";
  asset?: { _ref: string; _type: "reference" } | null;
  alt?: string | null;
}

/** Shape returned by `allBlogPostsQuery` — the list/card view. */
export interface BlogPostCard {
  _id: string;
  title: string;
  slug: string;
  /** ISO date, e.g. "2018-05-20" */
  date?: string | null;
  featured?: boolean | null;
  color?: string | null;
  mainImage?: BlogImage | null;
  thumbnail?: BlogImage | null;
  /** `summary` when an editor wrote one, else the first paragraph's text. */
  excerpt?: string | null;
}

/** Shape returned by `blogPostBySlugQuery` — the single-post view. */
export interface BlogPostDetail extends Omit<BlogPostCard, "excerpt" | "featured"> {
  summary?: string | null;
  /** Set when the post first appeared elsewhere; drives the note and rel=canonical. */
  canonicalUrl?: string | null;
  canonicalLabel?: string | null;
  body?: PortableTextBlock[] | null;
}
