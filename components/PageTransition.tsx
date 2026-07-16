"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const FADE_MS = 300;

/**
 * Reimplements the Webflow `.page-transition` overlay (originally driven by a
 * Webflow interaction): clicking an internal link fades the clay overlay in,
 * and when the new route renders it fades back out. The ported CSS provides
 * position/size/color; display and opacity are driven inline here.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fade the overlay out whenever a navigation completes.
  useEffect(() => {
    const el = ref.current;
    if (!el || el.style.display !== "block") return;
    el.style.opacity = "0";
    hideTimer.current = setTimeout(() => {
      el.style.display = "none";
    }, FADE_MS);
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [pathname]);

  // Fade the overlay in when an internal link is clicked.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same-page (or hash-only) navigation: no transition.
      if (url.pathname === window.location.pathname) return;

      const el = ref.current;
      if (!el) return;
      if (hideTimer.current) clearTimeout(hideTimer.current);
      el.style.display = "block";
      // Force a reflow so the opacity change transitions from 0.
      void el.offsetHeight;
      el.style.opacity = "1";
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="custom-code">
      <div
        ref={ref}
        className="page-transition"
        style={{
          display: "none",
          opacity: 0,
          top: 0,
          left: 0,
          pointerEvents: "none",
          transition: `opacity ${FADE_MS}ms ease-out`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
