import Link from "next/link";
import { inkOnBrandSurface } from "@/lib/brandSurface";
import { urlFor } from "@/sanity/lib/image";
import type { BlogPostCard } from "@/sanity/lib/types";

/**
 * A post card for /blog, in the three sizes the design uses: the large `lead`
 * card, the `md` cards in the three-up row, and the `sm` cards stacked beside
 * the lead.
 *
 * Size drives the type ramp and the image ratio only. Everything else is
 * shared, so a card is a card wherever it lands.
 */

type Size = "lead" | "md" | "sm";

/* Headline step per size, from the Figma roles (Headline/3xl, /2xl, /xl). */
const TITLE_SIZE: Record<Size, string> = {
  lead: "size-3xl",
  md: "size-2xl",
  sm: "size-xl",
};

/* The lead image is wider than it is tall; the rest are closer to 16:9. */
const RATIO: Record<Size, string> = {
  lead: "16 / 9",
  md: "16 / 10",
  sm: "16 / 9",
};

/* The design renders "July 29, 2025". Fixed to UTC so a post dated
   2016-12-31 cannot render as the 30th for a reader west of Greenwich. */
function formatDate(date?: string | null) {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Every imported post arrived without art. Rather than leave a hole where the
 * image goes — which would collapse the grid's rhythm and read as broken — the
 * card falls back to a tile carrying the post's year. It keeps the ratio, it is
 * derived from real content, and it makes "no art yet" look deliberate.
 */
function FallbackTile({ date, color, size }: { date?: string | null; color?: string | null; size: Size }) {
  const year = date?.slice(0, 4);
  // A post's accent colour does not flip with the mode, so a tile painted with
  // it is a fixed surface and its ink has to be locked to match — the same
  // rule the case study heroes follow. Without a colour the tile uses
  // --surface-sunken, which flips, so it must NOT declare fixed ink.
  const ink = color ? inkOnBrandSurface(color) : null;

  return (
    <div
      className="postcard__media postcard__media--empty"
      data-brand-surface={color ? "" : undefined}
      style={
        {
          aspectRatio: RATIO[size],
          ...(color ? { backgroundColor: color, "--ink-on-brand": ink } : {}),
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {year ? (
        <span className={`headline ${size === "lead" ? "size-8xl" : "size-5xl"}`}>{year}</span>
      ) : null}
    </div>
  );
}

export default function PostCard({ post, size = "md" }: { post: BlogPostCard; size?: Size }) {
  const image = post.mainImage ?? post.thumbnail;
  // The lead card is the only one rendered large enough to need 1600px.
  const width = size === "lead" ? 1600 : 800;
  const dateLabel = formatDate(post.date);

  return (
    <Link href={`/blog/${post.slug}`} className={`postcard postcard--${size}`}>
      {image ? (
        <div className="postcard__media" style={{ aspectRatio: RATIO[size] }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(image).width(width).auto("format").url()}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <FallbackTile date={post.date} color={post.color} size={size} />
      )}

      <div className="postcard__meta">
        {dateLabel ? (
          <time dateTime={post.date ?? undefined} className="mono size-xs">
            {dateLabel}
          </time>
        ) : null}
        <h3 className={`headline ${TITLE_SIZE[size]} postcard__title`}>{post.title}</h3>
        {/* The three-up row shows a description; the small stacked cards in the
            design do not, so they stay title-only however much text exists. */}
        {post.excerpt && size !== "sm" ? (
          <p className="text size-md postcard__excerpt">{post.excerpt}</p>
        ) : null}
      </div>
    </Link>
  );
}
