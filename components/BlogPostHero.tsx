import { urlFor } from "@/sanity/lib/image";
import type { BlogPostDetail } from "@/sanity/lib/types";

/**
 * The centred masthead on a blog post: an optional "originally published"
 * note, the title, a byline, and the lead image on its own panel.
 *
 * The note is not decoration. Much of this archive first appeared on other
 * sites, and saying so above the title is the honest version of the
 * rel=canonical the page also emits (see the post route).
 */

function OriginNote({ url, label }: { url: string; label?: string | null }) {
  // Fall back to the URL's host so the note reads properly with only a URL set.
  let host = label ?? null;
  if (!host) {
    try {
      host = new URL(url).hostname.replace(/^www\./, "");
    } catch {
      host = null;
    }
  }

  return (
    <p className="blogpost__origin">
      <svg
        className="blogpost__origin-icon"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.1" />
        <path d="M7 6.2v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="7" cy="4.05" r="0.78" fill="currentColor" />
      </svg>
      <span className="text size-sm">
        {host ? (
          <>
            This post was originally shared on{" "}
            <a href={url} rel="canonical noopener noreferrer" target="_blank">
              {host}
            </a>
          </>
        ) : (
          <a href={url} rel="canonical noopener noreferrer" target="_blank">
            This post was originally shared elsewhere
          </a>
        )}
      </span>
    </p>
  );
}

export default function BlogPostHero({
  post,
  dateLabel,
  author = "Matt Plays",
}: {
  post: BlogPostDetail;
  dateLabel?: string | null;
  author?: string;
}) {
  const image = post.mainImage ?? post.thumbnail;

  return (
    <header className="blogpost__hero">
      <div className="container-width w-container">
        {post.canonicalUrl ? (
          <OriginNote url={post.canonicalUrl} label={post.canonicalLabel} />
        ) : null}

        <h1 className="headline size-7xl blogpost__title">{post.title}</h1>

        <p className="blogpost__byline">
          {/* The logo doubles as the avatar — it is the mark the rest of the
              site already uses for Matt, so no second asset is needed. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/Portfolio-Logo.gif" alt="" className="blogpost__avatar" />
          <span className="text size-sm">Written by {author}</span>
          {dateLabel ? (
            <time dateTime={post.date ?? undefined} className="text size-sm blogpost__date">
              {dateLabel}
            </time>
          ) : null}
        </p>
      </div>

      {image ? (
        <div className="blogpost__lead-panel">
          <div className="container-width w-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(image).width(2000).auto("format").url()}
              alt={image.alt ?? ""}
              className="blogpost__lead-image"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
