"use client";

import { useEffect } from "react";

/**
 * Hands the page background over to the site-comp sections.
 *
 * Each `.sitecompsection-*` variant used to paint its own colour, so a case
 * study read as a stack of coloured boxes separated by strips of page colour.
 * Painting the body instead makes the colour belong to the page while that
 * section is being read: it fills the gaps between sections, runs behind the
 * nav, and cross-fades from one project to the next.
 *
 * The colours stay in CSS. Each section declares its own `--comp-surface`
 * (styles/sections.css) and this component reads it back, so there is one
 * source of truth and Sanity's per-section override flows through the same
 * property. Nothing is hardcoded here.
 *
 * Mounted only when a page actually renders a comp section (components/blocks).
 */

/*
 * Where a section claims the background: a band three quarters of the way down
 * the viewport, 6% of its height tall. A section takes the page's colour when
 * it reaches this band.
 *
 * Three quarters down rather than the middle so the colour arrives as the
 * section does, shortly after its top edge comes in from the bottom, instead
 * of waiting for it to reach the centre.
 *
 * A band rather than a line because a line does not work: rootMargin insets
 * shrink the observer's root box, so the -75%/-25% pair that would describe a
 * line at 75% collapses the root to zero height, and a root with no area never
 * intersects anything. The margins have to leave some height behind. Both
 * percentages are whole numbers so they stringify cleanly.
 */
const CLAIM_LINE_PCT = 75;
const BAND_PCT = 6;
const BAND_TOP_PCT = CLAIM_LINE_PCT - BAND_PCT / 2;
const BAND_BOTTOM_PCT = 100 - CLAIM_LINE_PCT - BAND_PCT / 2;

export default function CompSurface() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-comp-surface]"),
    );
    if (!sections.length) return;

    const root = document.documentElement;

    /*
     * Read every colour up front. This has to happen before the attribute
     * below, which stops the sections painting their own backgrounds — after
     * that point `--comp-surface` is still readable, but reading first keeps
     * this independent of that ordering. Sections without a colour (the
     * unbranded `.sitecompsection-grid-section`) are left out: they are meant
     * to sit on the page default, so they should never claim it.
     */
    const colors = new Map<Element, string>();
    for (const section of sections) {
      const color = getComputedStyle(section).getPropertyValue("--comp-surface").trim();
      if (color) colors.set(section, color);
    }
    if (!colors.size) return;

    const claimants = [...colors.keys()];

    /*
     * Only now does the page switch over. Until this attribute is set the
     * sections paint themselves, which is what a visitor without JavaScript
     * keeps — the layout is the same, it just doesn't bleed into the gaps.
     */
    root.setAttribute("data-comp-bg", "");

    let claimed: Element | null = null;
    const visible = new Set<Element>();

    const release = () => {
      claimed = null;
      root.style.removeProperty("--page-surface-active");
    };

    /*
     * Whichever section reaches the claim band takes the background and keeps
     * it until another one does. That latch is the point: between two sections
     * there is an 8rem gap where nothing is in the band, and without it the
     * page would flash back to its default colour between every pair.
     *
     * Several sections can be in a 6% band at once, so when more than one
     * arrives in the same callback the nearest to the centre of the band wins.
     * Sections that merely *leave* the band change nothing — that is the latch.
     */
    const claimObserver = new IntersectionObserver(
      (entries) => {
        const line = window.innerHeight * (CLAIM_LINE_PCT / 100);
        let best: Element | null = null;
        let bestDistance = Infinity;

        for (const entry of entries) {
          if (!entry.isIntersecting || !colors.has(entry.target)) continue;
          const { top, bottom } = entry.boundingClientRect;
          const distance =
            top <= line && bottom >= line
              ? 0
              : Math.min(Math.abs(top - line), Math.abs(bottom - line));
          if (distance < bestDistance) {
            bestDistance = distance;
            best = entry.target;
          }
        }

        if (!best || best === claimed) return;
        claimed = best;
        root.style.setProperty("--page-surface-active", colors.get(best) as string);
      },
      {
        rootMargin: `${-BAND_TOP_PCT}% 0px ${-BAND_BOTTOM_PCT}% 0px`,
      },
    );

    /*
     * The latch has to let go eventually, or the last project's colour would
     * follow the visitor into the credits and the footer. Once no comp section
     * is on screen at all, the page goes back to its own background.
     */
    const presenceObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      if (!visible.size) release();
    });

    for (const section of claimants) {
      claimObserver.observe(section);
      presenceObserver.observe(section);
    }

    return () => {
      claimObserver.disconnect();
      presenceObserver.disconnect();
      root.removeAttribute("data-comp-bg");
      release();
    };
  }, []);

  return null;
}
