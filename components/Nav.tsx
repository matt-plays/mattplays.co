"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HoverTag from "@/components/HoverTag";
import ThemeToggle from "@/components/ThemeToggle";
import type { NavLinkItem } from "@/sanity/lib/types";

export interface NavProps {
  navLinks?: NavLinkItem[] | null;
}

/*
 * Fallback links, used only when siteSettings has none. These now mirror the
 * 2026 design — Work / Info / Blog / Shop, with Changelog moved to the
 * footer's Explore column.
 *
 * NOTE: siteSettings DOES define navLinks today (Work / Info / Changelog), so
 * this list does not render on the live site. Adding Blog to the nav is a
 * content edit in the Studio, not a code change.
 */
const FALLBACK_LINKS: NavLinkItem[] = [
  { label: "Work", href: "/work" },
  { label: "Info", href: "/info" },
  { label: "Blog", href: "/blog" },
  { label: "Shop", href: "/shop" },
];

function normalizePath(path: string) {
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

export default function Nav({ navLinks }: NavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = navLinks?.length ? navLinks : FALLBACK_LINKS;
  const current = normalizePath(pathname);

  // Close the mobile menu whenever navigation completes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHome = current === "/";

  return (
    <div className="navigation hero-casestudy--nav">
      <div
        data-collapse="medium"
        data-animation="default"
        data-duration="600"
        role="banner"
        className="navbar w-nav"
      >
        <div className="spacer-m"></div>
        <div className="container-width w-container">
          <div className="nav-items">
            <Link
              href="/"
              aria-current={isHome ? "page" : undefined}
              className={`brand w-nav-brand${isHome ? " w--current" : ""}`}
            >
              {/* Webflow parity: animated gif logo, plain img */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Portfolio-Logo.gif"
                width={270}
                alt="Matt Plays home"
                className="nav-logo"
              />
            </Link>
            <nav
              role="navigation"
              className="nav-menu w-nav-menu"
              {...(open ? { "data-nav-menu-open": "" } : {})}
            >
              {links.map((link) => {
                const href = link.href ?? "#";
                const label = link.label ?? "";
                const isCurrent = normalizePath(href) === current;
                const openClass = open ? " w--nav-link-open" : "";

                if (link.comingSoon) {
                  return (
                    <HoverTag key={label}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className={`nav-link disabled size-sm w-nav-link${openClass}`}
                      >
                        {label}
                      </a>
                    </HoverTag>
                  );
                }

                return (
                  <Link
                    key={label}
                    href={href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`nav-link size-sm w-nav-link${isCurrent ? " w--current" : ""}${openClass}`}
                  >
                    {label}
                  </Link>
                );
              })}
              {/* Last item in the menu, so it collapses into the mobile panel
                  with the links rather than crowding the bar beside the
                  hamburger. */}
              <ThemeToggle className="nav-theme-toggle" />
            </nav>
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              className={`menu-button w-nav-button${open ? " w--open" : ""}`}
              style={{ background: "none", border: 0 }}
              onClick={() => setOpen((value) => !value)}
            >
              <div className="icon w-icon-nav-menu"></div>
            </button>
          </div>
          <div className="spacer-m"></div>
        </div>
      </div>
    </div>
  );
}
