"use client";

import { useEffect } from "react";

/**
 * Adds page-specific class names to <body> (Webflow set these on the body
 * tag per page, e.g. `icon-lp-body` on the Icon Snowskates news page).
 * The root layout owns the body element, so pages mount this instead.
 */
export default function BodyClass({ className }: { className: string }) {
  useEffect(() => {
    const classes = className.split(" ").filter(Boolean);
    document.body.classList.add(...classes);
    return () => {
      document.body.classList.remove(...classes);
    };
  }, [className]);

  return null;
}
