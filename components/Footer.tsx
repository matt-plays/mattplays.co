import Link from "next/link";
import type { NavLinkItem, SocialLink } from "@/sanity/lib/types";

export interface FooterProps {
  footerLinks?: NavLinkItem[] | null;
  socials?: SocialLink[] | null;
}

/**
 * Fallbacks mirror the live Webflow footer. The newsletter form posts to the
 * same Kit (ConvertKit) endpoint the export uses.
 */
/*
 * These now mirror the 2026 footer (2739:5643) — Work / Info / Blog / Shop,
 * with Changelog moved down into the Explore column, matching Nav.tsx.
 *
 * NOTE: siteSettings defines footerLinks today, so this list does not render
 * on the live site. Adding Blog to the footer is a content edit in the Studio.
 */
const FALLBACK_NAV: NavLinkItem[] = [
  { label: "Work", href: "/work" },
  { label: "Info", href: "/info" },
  { label: "Blog", href: "/blog" },
  { label: "Shop", href: "/shop" },
];

const CONNECT_LINKS: NavLinkItem[] = [
  { label: "Contact", href: "mailto:matt@mattplays.co" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mattplays" },
  { label: "Email", href: "mailto:matt@mattplays.co" },
];

/* 2026 Explore column: Changelog / Styleguide / Colophon. Press is gone. */
const EXPLORE_LINKS: NavLinkItem[] = [
  { label: "Changelog", href: "/changelog" },
  { label: "Styleguide", href: "/style-guide" },
  { label: "Colophon", href: "/info#colophon" },
];

const FALLBACK_SOCIALS: SocialLink[] = [
  { label: "Instagram", url: "https://www.instagram.com/mattplays.co/" },
  { label: "Dribbble", url: "https://dribbble.com/mattplays" },
  { label: "Twitter", url: "https://twitter.com/mattplays_" },
];

const NEWSLETTER_ACTION = "https://app.kit.com/forms/7829009/subscriptions";

function TextLink({ link }: { link: NavLinkItem }) {
  const href = link.href ?? "#";
  const className = `text-link size-xs${link.comingSoon ? " disabled" : ""}`;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {link.label}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {link.label}
    </a>
  );
}

export default function Footer({ footerLinks, socials }: FooterProps) {
  // Webflow parity: the live footer marks Changelog `.disabled` (hidden on
  // mobile). If the Sanity nav items don't carry the comingSoon flag, inherit
  // it from the fallback entry with the same label.
  const fallbackComingSoon = new Map(
    FALLBACK_NAV.map((l) => [(l.label ?? "").toLowerCase(), l.comingSoon]),
  );
  const navLinks = (footerLinks?.length ? footerLinks : FALLBACK_NAV).map((link) => ({
    ...link,
    comingSoon:
      link.comingSoon ?? fallbackComingSoon.get((link.label ?? "").toLowerCase()),
  }));
  // Webflow parity: the FOLLOW column omits networks already listed under
  // CONNECT (LinkedIn), even though the Sanity socials list includes them.
  const connectLabels = new Set(CONNECT_LINKS.map((l) => (l.label ?? "").toLowerCase()));
  const allSocials = socials?.length ? socials : FALLBACK_SOCIALS;
  const followLinks = allSocials.filter(
    (s) => !connectLabels.has((s.label ?? "").toLowerCase()),
  );

  return (
    <div className="section-padding footer">
      <div className="container-width w-container">
        <div className="spacer-l"></div>
        <div className="div-block-17">
          <Link href="/" className="footer-logo-link w-inline-block">
            {/* Webflow parity: animated gif logo, plain img */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Portfolio-Logo.gif" loading="lazy" decoding="async" alt="Matt Plays home" />
          </Link>
        </div>
        <div className="spacer-l"></div>
        {/* The w-node-* ids below are load-bearing: the ported Webflow CSS
            assigns grid-area placement by these ids. */}
        <div className="grid-globalgrid">
          <div
            id="w-node-_56276552-c4f7-4a54-b549-c58d87e310f9-9fe1e305"
            className="footer-navlinks-container"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href ?? "#"}
                className={`headline size-3xl footer-navlinks${link.comingSoon ? " disabled" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div
            id="w-node-_2d1134b2-e342-3e1d-be34-df3b8e35b2c5-8e35b2c5"
            className="form-block-2 w-form"
          >
            <div className="text-block-2 size-xs">
              Stay up to date with my new monthly newsletter, &ldquo;One Cool Thing&rdquo;
            </div>
            <form
              id="email-form"
              name="email-form"
              action={NEWSLETTER_ACTION}
              method="post"
              className="form-2"
            >
              <input
                className="text-field-2 w-input"
                maxLength={256}
                name="email_address"
                placeholder="Drop your email address here"
                type="email"
                id="email_address"
                required
              />
              <input
                type="submit"
                className="submit-button-2 w-button"
                value="Subscribe"
              />
            </form>
          </div>
        </div>
        <div className="spacer-l"></div>
        <div className="horizontalrule"></div>
        <div className="spacer-l"></div>
        <div className="w-layout-grid grid-globalgrid footer">
          <h6
            id="w-node-_24f7c769-37d4-525a-632b-059b9fe1e308-9fe1e305"
            className="footer-heading size-xs overline"
          >
            Connect
          </h6>
          <h6
            id="w-node-b7fa874c-f687-02bc-7dad-472d5f0601da-9fe1e305"
            className="footer-heading size-xs overline"
          >
            Explore
          </h6>
          <h6
            id="w-node-_24f7c769-37d4-525a-632b-059b9fe1e30a-9fe1e305"
            className="footer-heading size-xs overline"
          >
            Follow
          </h6>
          <div
            id="w-node-_24f7c769-37d4-525a-632b-059b9fe1e30f-9fe1e305"
            className="footer-text-links"
          >
            {CONNECT_LINKS.map((link) => (
              <TextLink key={link.label} link={link} />
            ))}
          </div>
          <div
            id="w-node-_24f7c769-37d4-525a-632b-059b9fe1e316-9fe1e305"
            className="footer-text-links"
          >
            {followLinks.map((social) => (
              <TextLink
                key={social.label}
                link={{ label: social.label, href: social.url }}
              />
            ))}
          </div>
          <div
            id="w-node-_1345a412-1234-b026-6214-27c6c1702874-9fe1e305"
            className="footer-text-links"
          >
            {EXPLORE_LINKS.map((link) => (
              <TextLink key={link.label} link={link} />
            ))}
          </div>
          <div
            id="w-node-_620daf10-c57e-3ccf-efae-1325fc245420-9fe1e305"
            className="footer--tagline--container"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio-footer-arrow.svg"
              loading="lazy"
              decoding="async"
              alt=""
              className="footer--tagline--arrow"
            />
            <h6
              id="w-node-_24f7c769-37d4-525a-632b-059b9fe1e30c-9fe1e305"
              className="footer-heading size-xs footer--tagline--text overline"
            >
              made remotely in new england, usa
            </h6>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio-footer-logo-new-eng.webp"
              loading="lazy"
              decoding="async"
              alt=""
              className="footer--tagline--new-eng"
            />
          </div>
        </div>
        <div className="spacer-l"></div>
      </div>
    </div>
  );
}
