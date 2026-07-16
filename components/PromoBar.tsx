"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PromoBarSettings } from "@/sanity/lib/types";

export interface PromoBarProps {
  settings?: PromoBarSettings | null;
}

/**
 * Fallbacks mirror the live Webflow site: the text div ships with
 * `.displaynone` (hidden on the live site — only the link shows), and on
 * /changelog the changelog link is swapped for a "back home" link.
 */
const FALLBACK: PromoBarSettings = {
  enabled: true,
  text: "This site is being built out in the open",
  linkLabel: "Check out the changelog",
  linkHref: "/changelog",
  overrides: [
    { path: "/changelog", linkLabel: "Back to the homepage", linkHref: "/" },
  ],
};

function normalizePath(path: string) {
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

function isInternal(href: string) {
  return href.startsWith("/");
}

export default function PromoBar({ settings }: PromoBarProps) {
  const pathname = usePathname();
  const base = settings ?? FALLBACK;

  if (base.enabled === false) return null;

  const current = normalizePath(pathname);
  const override = (base.overrides ?? FALLBACK.overrides ?? []).find(
    (o) => o.path && normalizePath(o.path) === current,
  );

  const text = override?.text ?? base.text ?? FALLBACK.text;
  const linkLabel = override?.linkLabel ?? base.linkLabel ?? FALLBACK.linkLabel;
  const linkHref = override?.linkHref ?? base.linkHref ?? FALLBACK.linkHref;
  const hideLink = override?.hideLink === true || !linkHref || !linkLabel;

  return (
    <div className="promo-bar">
      <div className="container-width w-container">
        <div className="promo-bar-content">
          <div className="promo-bar-text size-xs displaynone">{text}</div>
          {!hideLink &&
            (isInternal(linkHref!) ? (
              <Link href={linkHref!} className="promo-bar-text size-xs islink">
                {linkLabel}
              </Link>
            ) : (
              <a href={linkHref!} className="promo-bar-text size-xs islink">
                {linkLabel}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
