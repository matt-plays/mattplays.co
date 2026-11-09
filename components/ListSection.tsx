import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "@/components/IconButton";

/**
 * ListSection — the shell the 2026 About page is built from (2811:5723 and
 * its two siblings): an overline label in a fixed left column, content in a
 * wider right column, and the whole 208 of section padding below it.
 *
 * Values, Experience and Press differ only in what fills the right column,
 * which is how the file draws them too — one `.ListSection-Item` component
 * with a type of Value, Experience or Press. The three item shapes are
 * exported from here for the same reason: they are not independent
 * components, they are this section's rows.
 */

export interface ListSectionProps {
  /** The overline label. */
  label: ReactNode;
  id?: string;
  children: ReactNode;
  /**
   * Spans the whole container below the grid rather than sitting in the
   * content column — the Experience section's logo row (2811:5799) is drawn
   * that way, 128 below the list.
   */
  footer?: ReactNode;
}

export default function ListSection({ label, id, children, footer }: ListSectionProps) {
  return (
    <section className="list-section" id={id}>
      <div className="container-width w-container">
        <div className="list-section__grid">
          <h2 className="overline size-4xl list-section__label">{label}</h2>
          <div className="list-section__content">{children}</div>
        </div>
        {footer ? <div className="list-section__footer">{footer}</div> : null}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Values */

/**
 * Two 608-wide cards across the 1264 content column, which is exactly two
 * columns and a gap — so this is a 2-up grid rather than a wrapping flex row,
 * and the cards keep their columns instead of depending on their own width.
 */
export function ValueGrid({ children }: { children: ReactNode }) {
  return <div className="value-grid">{children}</div>;
}

export interface ValueProps {
  number: string;
  title: string;
  children: ReactNode;
}

export function Value({ number, title, children }: ValueProps) {
  return (
    <div className="value">
      {/* Decorative: the numbering is visual ordering, and the title below
          carries the meaning, so it is not part of the heading. */}
      <p className="headline size-8xl leading-display value__number" aria-hidden="true">
        {number}
      </p>
      <h3 className="overline size-md value__title">{title}</h3>
      <p className="text size-lg value__body">{children}</p>
    </div>
  );
}

/* ------------------------------------------------------------ Experience */

export interface ExperienceRowProps {
  years: string;
  company: string;
  role: string;
  location: string;
}

export function ExperienceRow({ years, company, role, location }: ExperienceRowProps) {
  return (
    <div className="list-row list-row--experience">
      <p className="mono size-md list-row__lead">{years}</p>
      <div className="list-row__body">
        <h3 className="overline size-md">{company}</h3>
        <p className="mono size-sm list-row__meta">{role}</p>
      </div>
      <p className="mono size-md list-row__trail">{location}</p>
    </div>
  );
}

/* ----------------------------------------------------------------- Press */

export interface PressRowProps {
  /** The outlet being written about. Repeats are drawn blank in the design,
      so this is optional and the column simply stays empty. */
  source?: string;
  label: string;
  href: string;
}

/**
 * The file draws a row with an arrow at its end; here the whole row is the
 * link, which gives a target the size of the row and an accessible name that
 * reads "Help Scout, Inside Marketing Design at Help Scout".
 */
export function PressRow({ source, label, href }: PressRowProps) {
  return (
    <a
      className="list-row list-row--press"
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="overline size-sm list-row__lead">{source}</span>
      <span className="mono size-md list-row__body">{label}</span>
      <ArrowUpRightIcon className="list-row__arrow" />
    </a>
  );
}
