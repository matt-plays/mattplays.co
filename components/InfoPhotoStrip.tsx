"use client";

import { useEffect, useRef } from "react";

/**
 * The six-image strip from the 2026 About page (2807:5952), kept as its own
 * component rather than an ImageSection layout because it pans horizontally
 * as the page scrolls and has to measure itself to do it.
 *
 * In the file the strip is 4244 wide inside a 1920 frame, so it overflows on
 * both sides; the six images sit on a uniform 72 gap and are all centred on
 * the same horizontal axis, which is why this is an ordinary centred row and
 * not a set of placements. Widths are percentages of the strip so the whole
 * arrangement holds at any viewport.
 *
 * The strip is wider than the viewport and centred, so it overflows equally
 * on both sides; this component measures that total overflow into
 * `--strip-overflow` and the CSS pans the strip from its left edge to its
 * right edge across the section's trip through the viewport. Browsers without
 * `animation-timeline` support (and users preferring reduced motion) get a
 * static centred row. See `.infostrip-*` in styles/custom-embeds.css.
 */

/**
 * src, and the width it takes of the file's 1920 frame — not of the strip.
 * The strip is a full-width centred flex row whose children overflow it on
 * both sides, so percentages here (and the 3.75% gap in the CSS) resolve
 * against the container, and the six add up to the 221% the file draws.
 */
const PHOTOS = [
  { src: "/images/Info-PhotoRow-01.webp", width: "39.479%", ratio: "758 / 1011" },
  { src: "/images/Info-PhotoRow-02.webp", width: "39.479%", ratio: "1 / 1" },
  { src: "/images/Info-PhotoRow-03.webp", width: "30.885%", ratio: "593 / 791" },
  { src: "/images/Info-PhotoRow-04.webp", width: "30.781%", ratio: "4 / 3" },
  { src: "/images/Info-PhotoRow-05.webp", width: "30.885%", ratio: "1 / 1" },
  { src: "/images/Info-Photo-02.webp", width: "30.781%", ratio: "4 / 3" },
];

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
    <div
      ref={sectionRef}
      className="section-padding isphotorow infostrip-section image-section image-section--strip"
    >
      <div className="container-width w-container">
        <div ref={stripRef} className="image-section__strip infostrip-strip">
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="image-section__item"
              style={{ width: photo.width, aspectRatio: photo.ratio }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} loading="lazy" decoding="async" alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
