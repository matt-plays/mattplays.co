"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/** Matches the key read by the no-flash script in app/layout.tsx. */
const STORAGE_KEY = "mp-theme";

function resolved(): Theme {
  const stored = (() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  })();
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Light/dark switch for previewing both modes.
 *
 * Renders nothing until mounted: the server has no way to know which mode the
 * browser will resolve to, so rendering a label before then guarantees a
 * hydration mismatch and a flash of the wrong one.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(resolved());
    document.documentElement.setAttribute("data-theme-ready", "");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  }

  if (theme === null) {
    // Placeholder keeps the layout from shifting once the real label arrives.
    return (
      <span
        className={["button", "button--outline", "button--sm", className].filter(Boolean).join(" ")}
        aria-hidden="true"
        style={{ visibility: "hidden" }}
      >
        Dark mode
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={["button", "button--outline", "button--sm", className].filter(Boolean).join(" ")}
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
