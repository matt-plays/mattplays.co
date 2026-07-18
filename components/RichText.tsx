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

export default function RichText({
  value,
  plain = false,
}: {
  value: PortableTextBlock[];
  plain?: boolean;
}) {
  if (!value?.length) return null;
  return <PortableText value={value} components={plain ? plainComponents : components} />;
}
