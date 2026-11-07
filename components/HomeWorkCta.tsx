"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * The pre-footer "See more work" link, ported from the Webflow export. The
 * "Footer CTA Hover" interaction (IX2 `a-15`/`a-16`) swaps colors instantly on
 * hover: the headline warms to the accent while the arrow button inverts to a
 * solid fill.
 *
 * The export wrote its colors as literal inline styles. Inline styles beat
 * every stylesheet rule, so those literals survived the move to semantic
 * colour and left dark ink sitting on the dark surface. Each one now resolves
 * through the semantic layer instead, which is what makes this flip with the
 * mode.
 */
export default function HomeWorkCta() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/work"
      className="footercta-textlink w-inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3
        className="headline size-4xl footercta-textlink"
        style={{ color: hovered ? "var(--accent)" : "var(--content-primary)" }}
      >
        See more work
      </h3>
      <div
        className="projectlist-item-button"
        style={
          hovered
            ? {
                backgroundColor: "var(--button-solid-bg)",
                color: "var(--button-solid-fg)",
                borderColor: "transparent",
              }
            : {
                backgroundColor: "transparent",
                color: "var(--content-muted)",
                borderColor: "var(--content-muted)",
              }
        }
      >
        <div className="text size-xl projectlist-item-buttonarrow">↗</div>
      </div>
    </Link>
  );
}
