"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PromoBarLoader from "@/components/PromoBarLoader";
import type { PromoBarSettings } from "@/sanity/lib/types";

export interface PromoBarProps {
  settings?: PromoBarSettings | null;
}

/**
 * Promo banner — Portfolio Core 2026 (Figma node 3243:9255).
 *
 * The design is message + loader; the optional link is kept because Sanity
 * drives it, and /changelog still swaps in a "back home" link.
 */
const FALLBACK: PromoBarSettings = {
  enabled: true,
  text: "This site is out of date. A new one is coming soon",
  linkLabel: null,
  linkHref: null,
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
  const linkLabel = override?.linkLabel ?? base.linkLabel;
  const linkHref = override?.linkHref ?? base.linkHref;
  const showLink = override?.hideLink !== true && !!linkHref && !!linkLabel;

  return (
    <aside className="promo-banner">
      <div className="container-width promo-banner__inner">
        {text && <p className="promo-banner__text">{text}</p>}
        {showLink &&
          (isInternal(linkHref!) ? (
            <Link href={linkHref!} className="promo-banner__text promo-banner__link">
              {linkLabel}
            </Link>
          ) : (
            <a href={linkHref!} className="promo-banner__text promo-banner__link">
              {linkLabel}
            </a>
          ))}
        <PromoBarLoader />
      </div>
    </aside>
  );
}
