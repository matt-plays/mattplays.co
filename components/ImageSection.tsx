/* eslint-disable @next/next/no-img-element */

/**
 * ImageSection — the row of photography the 2026 pages set between their
 * content sections (2807:5952 and its siblings). In Figma it is one component
 * whose slots take one to six images; the arrangements it is actually used in
 * are the three below.
 *
 *   single   one image, inside the container, at its own aspect ratio
 *   bleed    one image, edge to edge, cropped to `ratio` when given
 *   collage  three images, hand-placed against each other
 *
 * The six-image strip is its own component (InfoPhotoStrip), because that one
 * pans as the page scrolls and needs to measure itself to do it.
 *
 * Every arrangement carries the 128 of padding the file puts below it, so a
 * page is a list of sections and nothing has to know what precedes it.
 */

export interface ImageSpec {
  src: string;
  width: number;
  height: number;
  /** Decorative by default: these sit between sections that carry the text. */
  alt?: string;
}

export interface ImageSectionProps {
  layout?: "single" | "bleed" | "collage";
  images: ImageSpec[];
  /**
   * Crops the image to this aspect ratio instead of its own. Only meaningful
   * for `single` and `bleed`.
   */
  ratio?: string;
}

/**
 * The collage's three boxes, as percentages of the 1920 x 1025.25 frame the
 * file draws. Percentages rather than the file's pixels because the container
 * here is 1280 wide, so only the relationships port, not the measurements —
 * the same reasoning as the home hero.
 */
const COLLAGE = [
  { "--x": "-0.026%", "--y": "8.669%", "--w": "58.854%", "--h": "82.663%" },
  { "--x": "60.703%", "--y": "0%", "--w": "39.323%", "--h": "55.229%" },
  { "--x": "60.703%", "--y": "58.742%", "--w": "22.031%", "--h": "41.258%" },
] as unknown as React.CSSProperties[];

function Img({ image, sizes }: { image: ImageSpec; sizes: string }) {
  return (
    <img
      src={image.src}
      sizes={sizes}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
      alt={image.alt ?? ""}
    />
  );
}

export default function ImageSection({ layout = "single", images, ratio }: ImageSectionProps) {
  if (layout === "collage") {
    return (
      <section className="image-section image-section--collage">
        <div className="container-width w-container">
          <div className="image-section__stage">
            {images.slice(0, 3).map((image, i) => (
              <div key={image.src} className="image-section__item" style={COLLAGE[i]}>
                <Img image={image} sizes="(max-width: 767px) 100vw, 50vw" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const image = images[0];
  if (!image) return null;

  if (layout === "bleed") {
    return (
      <section className="image-section image-section--bleed">
        <div
          className="image-section__frame"
          style={ratio ? { aspectRatio: ratio } : undefined}
        >
          <Img image={image} sizes="100vw" />
        </div>
      </section>
    );
  }

  return (
    <section className="image-section image-section--single">
      <div className="container-width w-container">
        <div
          className="image-section__frame"
          style={ratio ? { aspectRatio: ratio } : undefined}
        >
          <Img image={image} sizes="(max-width: 1340px) 100vw, 1280px" />
        </div>
      </div>
    </section>
  );
}
