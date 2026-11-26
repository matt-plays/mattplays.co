"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import PromoBarLoader from "@/components/PromoBarLoader";
import type { PromoBarSettings } from "@/sanity/lib/types";

export interface PromoBarProps {
  settings?: PromoBarSettings | null;
}

/**
 * Promo banner — Portfolio Core 2026 (Figma nodes 3243:9255 / 3243:14353).
 *
 * Message plus loader, as drawn. No link: the design has none, and at mobile
 * widths it crowded the message and the loader onto one row. The link fields
 * are gone from the schema as well, so they stop riding along in the RSC
 * payload for a component that never rendered them. Per-path `text` overrides
 * still apply.
 */
const FALLBACK: PromoBarSettings = {
  enabled: true,
  text: "This site is out of date, and a new one is coming soon",
};

function normalizePath(path: string) {
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

/**
 * Split the message at its first comma, keeping the comma with the lede.
 * Returns null when there is nothing to split on, in which case the message
 * renders as one run and never picks up the two-tone treatment.
 */
function splitLede(text: string): [string, string] | null {
  const i = text.indexOf(",");
  if (i === -1 || i === text.length - 1) return null;
  const rest = text.slice(i + 1).trim();
  return rest ? [text.slice(0, i + 1), rest] : null;
}

/**
 * True once the message occupies more than one line.
 *
 * The design mutes the lede only in the wrapped state, so this can't key off
 * the 767px breakpoint: the mobile layout starts there, but the message still
 * fits on one line until roughly 520px. Measuring is the only honest test.
 */
function useIsWrapped(ref: React.RefObject<HTMLElement | null>, text: string) {
  const [wrapped, setWrapped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const measure = () => {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      if (!Number.isFinite(lineHeight) || lineHeight <= 0) return;
      setWrapped(el.getBoundingClientRect().height > lineHeight * 1.5);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, text]);

  return wrapped;
}

export default function PromoBar({ settings }: PromoBarProps) {
  const pathname = usePathname();
  const textRef = useRef<HTMLParagraphElement>(null);

  const base = settings ?? FALLBACK;
  const current = normalizePath(pathname);
  const override = (base.overrides ?? []).find(
    (o) => o.path && normalizePath(o.path) === current,
  );
  const text = override?.text ?? base.text ?? FALLBACK.text ?? "";

  const wrapped = useIsWrapped(textRef, text);

  if (base.enabled === false || !text) return null;

  const parts = splitLede(text);

  return (
    <aside className="promo-banner">
      <div className="container-width promo-banner__inner">
        <p
          ref={textRef}
          className={`promo-banner__text${wrapped ? " is-wrapped" : ""}`}
        >
          {parts ? (
            <>
              <span className="promo-banner__lede">{parts[0]}</span>{" "}
              <span>{parts[1]}</span>
            </>
          ) : (
            text
          )}
        </p>
        <PromoBarLoader />
      </div>
    </aside>
  );
}
