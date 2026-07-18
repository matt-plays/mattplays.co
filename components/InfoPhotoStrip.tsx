"use client";

import { useEffect, useRef } from "react";

const PHOTOS = [
  "/images/Info-PhotoRow-01.webp",
  "/images/Info-PhotoRow-02.webp",
  "/images/Info-PhotoRow-03.webp",
  "/images/Info-PhotoRow-04.webp",
  "/images/Info-PhotoRow-05.webp",
];

/**
 * The info-page photo row, extracted from the static page markup so it can
 * slide horizontally as the page scrolls (CSS scroll-driven animation; see
 * `.infostrip-*` rules in styles/custom-embeds.css). The strip is wider than
 * the viewport and centered, so it overflows equally on both sides; this
 * component measures that total overflow into `--strip-overflow` and the CSS
 * pans the strip from its left edge to its right edge across the section's
 * trip through the viewport. Browsers without `animation-timeline` support
 * (and users preferring reduced motion) get the original static centered row.
 */
export default function InfoPhotoStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    if (!section || !strip) return;

    const update = () => {
      const first = strip.firstElementChild?.getBoundingClientRect();
      const last = strip.lastElementChild?.getBoundingClientRect();
      // Rigid translation keeps (last.right - first.left) invariant, so this
      // is safe to measure mid-animation.
      const contentWidth = first && last ? last.right - first.left : 0;
      const overflow = Math.max(0, contentWidth - section.clientWidth);
      strip.style.setProperty("--strip-overflow", `${overflow}px`);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(section);
    ro.observe(strip);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="section-padding isphotorow infostrip-section">
      <div className="container-width w-container">
        <div ref={stripRef} className="image-photorow-grid infostrip-strip">
          {PHOTOS.map((src) => (
            <img key={src} src={src} loading="lazy" alt="" className="image-photorow-image" />
          ))}
        </div>
        <div className="spacer-xl"></div>
      </div>
    </div>
  );
}
