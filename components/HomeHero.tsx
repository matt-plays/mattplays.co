"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

/**
 * Homepage hero, ported from the Webflow export. The "Home Hero Hover"
 * interaction (Webflow IX2 `a-17`/`a-18`) scales both floating images from
 * 1 → 1.1 while hovering the headline: the art-direction image first, the
 * brands image 100ms behind, both 250ms with an out-quart ease. The images'
 * resting rotations (12deg / -8deg) ship as inline transforms in the export
 * and are preserved here.
 */

const EASE_OUT_QUART = "cubic-bezier(0.25, 1, 0.5, 1)";

function visualStyle(rotateDeg: number, delayMs: number, hovered: boolean): CSSProperties {
  const scale = hovered ? 1.1 : 1;
  return {
    transform: `translate3d(0, 0, 0) scale3d(${scale}, ${scale}, 1) rotateX(0) rotateY(0) rotateZ(${rotateDeg}deg) skew(0, 0)`,
    transition: `transform 250ms ${EASE_OUT_QUART} ${delayMs}ms`,
    transformStyle: "preserve-3d",
  };
}

export default function HomeHero() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="homepage-hero">
      <div className="container-width w-container">
        <div className="homepagehero-container">
          <div className="heroheadlinesection-line">
            <h1
              className="headline size-8xl homepagehero-headline"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Design
              <br />
              for Brands
            </h1>
            <div className="homepagehero-brandsvisual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-brands-fpo.webp"
                loading="eager"
                fetchPriority="high"
                width={105}
                style={visualStyle(12, 100, hovered)}
                alt=""
                className="homepagehero-brandsimage"
              />
            </div>
            <div
              id="w-node-_5bc940d4-7a59-0a06-59f4-b54cc7e4cb78-119d1161"
              className="homepagehero-designvisual"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-ad-fpo.webp"
                loading="eager"
                fetchPriority="high"
                width={105}
                style={visualStyle(-8, 0, hovered)}
                alt="Colorful dealer books for Burton Snowboards"
                className="homepagehero-designimage"
              />
            </div>
          </div>
        </div>
        <h6 className="hero-subheadline size-base">System-minded work by Matt Plays</h6>
      </div>
    </div>
  );
}
