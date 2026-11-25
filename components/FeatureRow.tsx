import Button from "@/components/Button";

/**
 * FeatureRow — the repeating block the 2026 home page is built from. Four of
 * them stack below the hero ("The latest", then one per client).
 *
 * Geometry comes straight from the Figma component (2650:1745), which is a
 * 4-column grid on the 1920 container with a 16px gutter:
 *
 *   headline ........ 48px above ........ images ........ 48px below ....... details
 *   48/1.125 = 54      space-m           624 tall         space-m          87 tall
 *
 * The four tiles are the whole idea: they share a baseline and differ in
 * height, so the row reads as a staggered skyline rather than a filmstrip.
 * Figma draws them 312 / 624 / 468 / 468 at 468 wide — expressed here as
 * aspect ratios so the stagger survives any container width.
 *
 * The details band repeats the same 4 columns: tags across the first two,
 * body copy in the third, the action right-aligned in the fourth.
 *
 * Presentational on purpose. The design's content model isn't settled, so this
 * takes plain props rather than a Sanity document — whatever ends up feeding
 * it, the row doesn't change.
 */

export interface FeatureRowImage {
  src: string;
  alt?: string;
  /** Overrides the staggered default for this position. */
  ratio?: string;
}

export interface FeatureRowProps {
  heading: string;
  images: FeatureRowImage[];
  tags?: string[];
  body?: string;
  action?: { label: string; href: string };
  /** Renders the heading as an <h1>. One row per page may want this. */
  as?: "h1" | "h2";
}

export default function FeatureRow({
  heading,
  images,
  tags,
  body,
  action,
  as: Heading = "h2",
}: FeatureRowProps) {
  return (
    <section className="feature-row">
      <div className="container-width w-container">
        <Heading className="headline size-7xl feature-row__heading">{heading}</Heading>

        <div className="feature-row__images">
          {images.slice(0, 4).map((image, i) => (
            <div
              // Position decides the tile's height in the design, so position
              // is genuinely part of this item's identity here.
              // eslint-disable-next-line react/no-array-index-key
              key={`${image.src}-${i}`}
              className="feature-row__tile"
              style={image.ratio ? ({ "--tile-ratio": image.ratio } as React.CSSProperties) : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt ?? ""} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>

        {tags?.length || body || action ? (
          <div className="feature-row__details">
            {tags?.length ? (
              <ul className="feature-row__tags">
                {tags.map((tag) => (
                  <li key={tag} className="tag mono size-sm">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            {body ? <p className="text size-lg feature-row__body">{body}</p> : null}

            {action ? (
              <div className="feature-row__action">
                <Button href={action.href} arrow>
                  {action.label}
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
