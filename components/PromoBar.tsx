"use client";

import { usePathname } from "next/navigation";
import PromoBarLoader from "@/components/PromoBarLoader";
import type { PromoBarSettings } from "@/sanity/lib/types";

export interface PromoBarProps {
  settings?: PromoBarSettings | null;
}

/**
 * Promo banner — Portfolio Core 2026 (Figma nodes 3243:9255 / 3243:14353).
 *
 * Message plus loader, as drawn. The banner no longer renders a link: the
 * design has none, and at mobile widths the link crowded the message and the
 * loader onto one row. PromoBarSettings still carries linkLabel / linkHref and
 * the Sanity schema still exposes them — they are simply unused here.
 *
 * Per-path `text` overrides are still honoured.
 */
const FALLBACK: PromoBarSettings = {
  enabled: true,
  text: "This site is out of date. A new one is coming soon",
};

function normalizePath(path: string) {
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

export default function PromoBar({ settings }: PromoBarProps) {
  const pathname = usePathname();
  const base = settings ?? FALLBACK;

  if (base.enabled === false) return null;

  const current = normalizePath(pathname);
  const override = (base.overrides ?? []).find(
    (o) => o.path && normalizePath(o.path) === current,
  );

  const text = override?.text ?? base.text ?? FALLBACK.text;

  if (!text) return null;

  return (
    <aside className="promo-banner">
      <div className="container-width promo-banner__inner">
        <p className="promo-banner__text">{text}</p>
        <PromoBarLoader />
      </div>
    </aside>
  );
}
