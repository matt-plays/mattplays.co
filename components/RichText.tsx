import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/lib/image";

/**
 * Shared Portable Text renderer for Webflow-migrated rich text (changelog,
 * blog, case-study text sections). Markup mirrors Webflow's rich-text output
 * so the ported CSS styles it (w-richtext wrapper supplied by callers).
 */

type RichTextImage = {
  _type: "image";
  asset?: { _ref?: string; url?: string };
  alt?: string;
  caption?: string;
};

type RichTextVideo = {
  _type: "videoEmbed";
  url?: string;
  aspectRatio?: string;
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: RichTextImage }) => {
      if (!value?.asset) return null;
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(value).width(1600).auto("format").url()}
            srcSet={`${urlFor(value).width(800).auto("format").url()} 800w, ${urlFor(value).width(1600).auto("format").url()} 1600w`}
            sizes="(max-width: 767px) 100vw, 800px"
            alt={value.alt ?? ""}
            loading="lazy"
            decoding="async"
          />
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      );
    },
    videoEmbed: ({ value }: { value: RichTextVideo }) => {
      if (!value?.url) return null;
      const padding =
        value.aspectRatio === "4:3" ? "75%" : value.aspectRatio === "1:1" ? "100%" : "56.25%";
      return (
        <figure
          className="w-richtext-figure-type-video w-richtext-align-center"
          style={{ paddingBottom: padding, position: "relative" }}
        >
          <iframe
            src={value.url}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            frameBorder="0"
            allowFullScreen
          />
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        {...(value?.blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    ),
  },
};

/**
 * Webflow parity: case-study text sections are plain Webflow text elements
 * (no <p> wrapper — line breaks are <br> nodes), so the global `p` rule must
 * not apply. `plain` renders blocks unwrapped, exactly like the export.
 */
const plainComponents: PortableTextComponents = {
  ...components,
  block: {
    normal: ({ children }) => <>{children}</>,
  },
};

/*
 * `editorial` is the 2026 blog voice: the same Portable Text, carrying the
 * type roles instead of inheriting Webflow's element styles. The steps are the
 * ones the Figma blocks use — H2 is Headline/3xl, H3 is Headline/xl, body is
 * Text/xl, a pull quote is Blockquote/7xl.
 *
 * H4 has no block in the design. It is set one step under H3 so an imported
 * post that happens to use one still reads as a heading rather than as body.
 *
 * Figma asks for Tiempos Text at weight 300 on the quote; only the Regular
 * cut (400) is in public/fonts, so .quote stays at 400 — a 300 here would
 * just be synthesised. Adding TiemposTextWeb-Light makes this a one-line fix.
 */
const editorialComponents: PortableTextComponents = {
  ...components,
  block: {
    normal: ({ children }) => <p className="text size-xl">{children}</p>,
    h2: ({ children }) => <h2 className="headline size-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="headline size-xl">{children}</h3>,
    h4: ({ children }) => <h4 className="headline size-md">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="quote size-7xl">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="text size-xl">{children}</ul>,
    number: ({ children }) => <ol className="text size-xl">{children}</ol>,
  },
};

const VARIANTS = {
  default: components,
  plain: plainComponents,
  editorial: editorialComponents,
} as const;

export default function RichText({
  value,
  plain = false,
  variant,
}: {
  value: PortableTextBlock[];
  /** @deprecated pass `variant="plain"` instead; kept for existing callers. */
  plain?: boolean;
  variant?: keyof typeof VARIANTS;
}) {
  if (!value?.length) return null;
  const resolved = variant ?? (plain ? "plain" : "default");
  return <PortableText value={value} components={VARIANTS[resolved]} />;
}
