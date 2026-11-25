/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";

/**
 * Case study hero, from the 2026 design (2812:9801).
 *
 * A single screen of the project's brand colour: an overline and the
 * discipline tags across the top, the title and summary across the bottom,
 * and the primary thumbnail floating in the middle of it at ten of the
 * twenty-four columns.
 *
 * Then it opens. As you scroll, the thumbnail grows out of its ten columns
 * until it fills the viewport, and only once it has does the page move on to
 * the sections below — the pattern afternow.co uses. That is done with a
 * scroll-driven animation in sections.css rather than here, so it costs no
 * JavaScript and this stays a server component; without support for it, or
 * for a visitor who asked for less motion, the hero is simply the still
 * composition above.
 *
 * The tags are the project's own `roles` ("Art Direction, Design"), split on
 * the comma. The file also draws a year tag ahead of the rule, which has no
 * field behind it yet — see the note at the markup.
 */

export interface CaseStudyHeroProps {
  title: string;
  summary?: string | null;
  /** Comma-separated, as Sanity stores it: "Art Direction, Design". */
  roles?: string | null;
  /** The project's brand colour. Already sanitised by the page. */
  color?: string;
  /** Ink chosen for that colour's luminance (lib/brandSurface). */
  ink: string;
  image?: { src: string; alt?: string };
}

export default function CaseStudyHero({
  title,
  summary,
  roles,
  color,
  ink,
  image,
}: CaseStudyHeroProps) {
  const tags = (roles ?? "")
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean);

  return (
    <section
      className="cs-hero"
      data-brand-surface={color ? "" : undefined}
      style={
        color
          ? ({ backgroundColor: color, "--ink-on-brand": ink } as CSSProperties)
          : undefined
      }
    >
      {/*
        The stage is what the scroll animation is measured against: it is
        taller than the screen, and the pin below sticks to the top of it for
        exactly the distance the thumbnail takes to open. sections.css gives
        it that extra height only when it can actually animate, so the
        still version is one screen tall with nothing to scroll past.
      */}
      <div className="cs-hero__stage">
        <div className="cs-hero__pin">
          {/*
            container-width only -- deliberately NOT Webflow's .w-container.
            That class carries a clearfix ::before/::after, and in a flex
            column they count as flex items, so space-between spreads the
            pseudo-elements and leaves the two real rows bunched in the
            middle.
          */}
          <div className="container-width cs-hero__frame">
            <div className="cs-hero__meta">
              <p className="overline size-sm">Case Study</p>
              <div className="cs-hero__tagrow">
                {/*
                  The file puts a year tag here, ahead of the rule. There is
                  no year on the project schema, so the rule simply starts the
                  row until one exists — adding it is a Studio change plus a
                  line here, not a rework of this block.
                */}
                <span className="cs-hero__rule" aria-hidden="true" />
                {tags.length ? (
                  <ul className="cs-hero__tags">
                    {tags.map((tag) => (
                      <li key={tag} className="mono size-sm cs-hero__tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            {/*
              Out of flow and centred on the pin, not laid out between the two
              rows, because it has to be able to grow to the full screen
              without the text around it moving -- being absolutely positioned,
              where it sits in the markup costs the rows nothing. It sits
              between them anyway so that the one case that cannot be
              choreographed, a landscape phone, can drop it back into the flow
              in the right place with nothing but CSS.

              Eager and high priority: it is the largest thing above the fold
              and the whole hero is built around it.
            */}
            {image ? (
              <figure className="cs-hero__media">
                <img
                  src={image.src}
                  alt={image.alt ?? ""}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </figure>
            ) : null}

            <div className="cs-hero__lede">
              <h1 className="headline size-12xl leading-display cs-hero__title">{title}</h1>
              {summary ? (
                <p className="headline size-3xl cs-hero__summary">{summary}</p>
              ) : null}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
