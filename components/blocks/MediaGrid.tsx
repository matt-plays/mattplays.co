import { urlFor } from "@/sanity/lib/image";
import { EmbedFrame } from "./VideoEmbed";
import { BackgroundVideo } from "./VideoLoop";
import type { MediaGridBlock, MediaGridItem, SanityImageValue } from "./types";

/**
 * Webflow parity for the exported image sections:
 *   layout "fullViewport" → .image-fullviewport > .image-fullviewport-container
 *   layout "grid"/"twoUp" → .image-grid-3x3 > .section-padding > .container-width
 *     - full-width item          → .image-wrapper.img-border-radius
 *     - consecutive half items   → paired inside .image-grid-2-upgrid
 *     - 4 full images            → .grid-2x2 (cells use .projectgrid-image-33)
 *     - 6+ full images           → .grid-3x3 (cells use .projectgrid-image-33)
 * Trailing spacers follow the export rhythm: grids end with .spacer-m, plus
 * .spacer-l when the next block is not another grid (nextIsGrid); the cell
 * grids and full-viewport sections end with .spacer-xl.
 */

/** Build a 2-step srcset (half width for small screens, full for desktop). */
function gridSrcSet(asset: NonNullable<SanityImageValue["asset"]>, width: number) {
  const half = Math.round(width / 2);
  return [half, width]
    .map((w) => `${urlFor(asset).width(w).auto("format").url()} ${w}w`)
    .join(", ");
}

function GridImage({
  item,
  cellClass,
  width = 2000,
  sizes = "(max-width: 767px) 100vw, 1280px",
}: {
  item: SanityImageValue;
  cellClass?: string;
  width?: number;
  sizes?: string;
}) {
  if (!item.asset) return null;
  const rounded = item.rounded !== false;
  const cls = ["image-wrapper", rounded ? "img-border-radius" : null, cellClass]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={urlFor(item.asset).width(width).auto("format").url()}
        srcSet={gridSrcSet(item.asset, width)}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        alt={item.alt ?? ""}
      />
    </div>
  );
}

function GridCell({ item, half = false }: { item: MediaGridItem; half?: boolean }) {
  if (item._type === "image")
    return (
      <GridImage
        item={item}
        width={half ? 1400 : 2000}
        sizes={half ? "(max-width: 767px) 100vw, 50vw" : undefined}
      />
    );
  if (item._type === "videoLoop") {
    return (
      <div className="image-wrapper img-border-radius">
        <BackgroundVideo loop={item} inGrid />
      </div>
    );
  }
  return (
    <div className="image-wrapper img-border-radius">
      <EmbedFrame embed={item} />
    </div>
  );
}

/** Group items: consecutive "half" items pair up into 2-up rows. */
function rows(items: MediaGridItem[], twoUp: boolean) {
  const isHalf = (i: MediaGridItem) =>
    twoUp || ("width" in i && i.width === "half") || i._type === "videoEmbed";
  const out: { pair: boolean; items: MediaGridItem[] }[] = [];
  let buffer: MediaGridItem[] = [];
  const flush = () => {
    if (!buffer.length) return;
    out.push({ pair: buffer.length > 1, items: buffer });
    buffer = [];
  };
  for (const item of items) {
    if (isHalf(item)) {
      buffer.push(item);
      if (buffer.length === 2) flush();
    } else {
      flush();
      out.push({ pair: false, items: [item] });
    }
  }
  flush();
  return out;
}

export default function MediaGrid({
  block,
  nextIsGrid = false,
}: {
  block: MediaGridBlock;
  nextIsGrid?: boolean;
}) {
  const items = block.items ?? [];
  if (!items.length) return null;

  if (block.layout === "fullViewport") {
    return (
      <div className="image-fullviewport">
        {items.map((item) =>
          item._type === "image" && item.asset ? (
            <div key={item._key} className="image-fullviewport-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(item.asset).width(2560).auto("format").url()}
                srcSet={[800, 1600, 2560]
                  .map((w) => `${urlFor(item.asset!).width(w).auto("format").url()} ${w}w`)
                  .join(", ")}
                sizes="100vw"
                loading="lazy"
                decoding="async"
                alt={item.alt ?? ""}
                className="image-fullviewport-image"
              />
            </div>
          ) : null
        )}
        <div className="spacer-xl"></div>
      </div>
    );
  }

  // Cell grids: 4 → .grid-2x2, 6+ → .grid-3x3 (all-full image walls)
  const allFullImages =
    items.length >= 4 &&
    items.every((i) => i._type === "image" && i.width !== "half");
  if (allFullImages) {
    const gridClass = items.length <= 4 ? "grid-2x2" : "grid-3x3";
    return (
      <div className="image-grid-3x3">
        <div className="section-padding">
          <div className="container-width w-container">
            <div className={gridClass}>
              {items.map((item) =>
                item._type === "image" ? (
                  <GridImage
                    key={item._key}
                    item={item}
                    cellClass="projectgrid-image-33"
                    width={1200}
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
        <div className="spacer-xl"></div>
      </div>
    );
  }

  const grouped = rows(items, block.layout === "twoUp");
  return (
    <div className="image-grid-3x3">
      <div className="section-padding">
        <div className="container-width w-container">
          {grouped.map((row) =>
            row.pair ? (
              <div key={row.items[0]._key} className="image-grid-2-upgrid">
                {row.items.map((item) => (
                  <GridCell key={item._key} item={item} half />
                ))}
              </div>
            ) : (
              <GridCell key={row.items[0]._key} item={row.items[0]} />
            )
          )}
        </div>
      </div>
      <div className="spacer-m"></div>
      {nextIsGrid ? null : <div className="spacer-l"></div>}
    </div>
  );
}
