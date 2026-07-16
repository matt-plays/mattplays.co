"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * The pre-footer "See more work" link, ported from the Webflow export. The
 * "Footer CTA Hover" interaction (IX2 `a-15`/`a-16`) swaps colors instantly on
 * hover: the headline warms to clay-orange while the arrow button inverts to
 * the dark slate fill. Initial colors match the export's inline styles.
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
        style={{ color: hovered ? "rgb(156,93,47)" : "rgb(19,31,37)" }}
      >
        See more work
      </h3>
      <div
        className="projectlist-item-button"
        style={
          hovered
            ? {
                backgroundColor: "rgb(19,31,37)",
                color: "rgb(245,242,239)",
                borderColor: "rgba(0,0,0,0)",
              }
            : {
                backgroundColor: "rgba(0,0,0,0)",
                color: "rgb(106,111,113)",
                borderColor: "rgb(106,111,113)",
              }
        }
      >
        <div className="text size-xl projectlist-item-buttonarrow">↗</div>
      </div>
    </Link>
  );
}
