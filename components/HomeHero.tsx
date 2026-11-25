/* eslint-disable @next/next/no-img-element */

/**
 * Home hero, from the 2026 design (2699:3570).
 *
 * An art-directed collage rather than a row: three display words, a stack of
 * three overlapping images, a row of coloured dots, the tagline, and a
 * photograph that bleeds off the right edge. Nothing here flows — every piece
 * is placed against the others, so the geometry lives in sections.css as
 * percentages of one stage.
 *
 * Two deliberate departures from the file, both noted at their callsite: the
 * blockquote drawn behind "Brands" is left out, and there is no mobile
 * composition to port.
 */

/** Saturated/Red/500 → Saturated/Blue/500, left to right, as the file draws them. */
const DOTS = [
  "var(--color-red-500)",
  "var(--color-orange-400)",
  "var(--color-yellow-300)",
  "var(--color-warm-green-600)",
  "var(--color-blue-500)",
];

/**
 * The three collage images, in paint order — the Rock Dove panel sits on top.
 * Each carries its own box inside the collage, as a percentage of it, so the
 * stack holds its arrangement at any width.
 */
const COLLAGE = [
  {
    src: "hero-collage-notecard",
    width: 1200,
    style: { left: "5.71%", top: "9.33%", width: "94.32%", height: "75.89%" },
  },
  {
    src: "hero-collage-photo",
    width: 1200,
    style: { left: "0%", top: "17.92%", width: "94.43%", height: "64.12%" },
  },
  {
    src: "hero-collage-rockdove",
    width: 1200,
    style: { left: "19.69%", top: "0%", width: "66.26%", height: "100%" },
  },
] as const;

export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="container-width w-container">
        <div className="home-hero__stage">
          {/*
            First in the DOM because it has to paint behind the tagline, which
            crosses it — the same order the design uses. Decorative: the
            headline below carries the meaning.
          */}
          <div className="home-hero__photo">
            <img
              src="/images/hero-huntington-ravine.webp"
              srcSet="/images/hero-huntington-ravine-800.webp 800w, /images/hero-huntington-ravine.webp 1600w"
              sizes="(max-width: 991px) 100vw, 46vw"
              width={1600}
              height={1067}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              alt=""
            />
          </div>

          {/*
            "Design" and "for" span the container, so space-between is the
            design's own measurement rather than an approximation of it: "for"
            lands flush right. The space before it is real, so the heading
            still reads "Design for Brands".
          */}
          <h1 className="headline size-12xl home-hero__headline">
            <span className="home-hero__line home-hero__line--top">
              <span>Design</span> <span>for</span>
            </span>
            <span className="home-hero__line home-hero__line--bottom">Brands</span>
          </h1>

          <ul className="home-hero__dots" aria-hidden="true">
            {DOTS.map((color) => (
              <li key={color} className="home-hero__dot" style={{ backgroundColor: color }} />
            ))}
          </ul>

          <p className="headline size-6xl home-hero__tagline">
            System-minded work by Matt Plays
          </p>

          {/* Paints last, over both the headline and the photograph. */}
          <div className="home-hero__collage">
            {COLLAGE.map((image) => (
              <div key={image.src} className="home-hero__collage-item" style={image.style}>
                <img
                  src={`/images/${image.src}.webp`}
                  srcSet={`/images/${image.src}-800.webp 800w, /images/${image.src}.webp ${image.width}w`}
                  sizes="(max-width: 991px) 100vw, 38vw"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
