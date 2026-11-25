import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Up-and-to-the-right arrow, 20px. The path is traced from the 2026 icon set
 * (the icon the Figma project card hands its Icon Button), drawn with
 * `currentColor` so it inherits the control's ink and flips with the mode.
 */
export function ArrowUpRightIcon({ className = "icon-button__icon" }: { className?: string } = {}) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14.375 5C14.72 5.00018 15 5.27993 15 5.625V12.708C15 13.0531 14.72 13.3328 14.375 13.333C14.03 13.3328 13.75 13.0531 13.75 12.708V7.13379L6.06738 14.8164C5.82331 15.0605 5.42669 15.0605 5.18262 14.8164C4.93908 14.5723 4.93887 14.1765 5.18262 13.9326L12.8652 6.25H7.29199C6.94681 6.25 6.66699 5.97018 6.66699 5.625C6.66699 5.27982 6.94681 5 7.29199 5H14.375Z" />
    </svg>
  );
}

/**
 * The Figma component's styles are Primary / Secondary / Outlined. They are
 * named to match components/Button.tsx instead, so the codebase keeps one
 * button vocabulary and both controls read from the same `--button-*` tokens.
 */
type Variant = "solid" | "secondary" | "outline";

type SharedProps = {
  variant?: Variant;
  /** The icon. Defaults to the up-right arrow the design ships it with. */
  children?: ReactNode;
  className?: string;
};

/**
 * `label` is required on every interactive form: the control is icon-only, so
 * it has no text to name it, and the Figma component's own note says to give
 * it an accessible label in code.
 */
type LabelledProps = SharedProps & { label: string; decorative?: false };

type ButtonElementProps = LabelledProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof LabelledProps> & { href?: undefined };

type AnchorElementProps = LabelledProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof LabelledProps> & { href: string };

/**
 * An arrow that sits inside an enclosing link — a project card, say. It must
 * not be a nested interactive element, and the link around it already carries
 * the accessible name, so this form renders an inert, hidden <span> and takes
 * no label.
 */
type DecorativeProps = SharedProps & {
  decorative: true;
  label?: undefined;
  href?: undefined;
};

export type IconButtonProps = ButtonElementProps | AnchorElementProps | DecorativeProps;

/**
 * IconButton — the circular icon-only control from the 2026 library
 * (Figma "Icon Button", 2771:6343, which replaces the old Slider Arrow).
 *
 * 12px of padding around a 20px icon gives the 44px control the design draws,
 * which is also the smallest comfortable touch target. Both are fixed rather
 * than fluid: this control is sized by its icon, not by a text step.
 *
 * Colour is entirely semantic tokens, so every variant is correct in light and
 * dark without a mode branch here — the same arrangement as Button.
 */
export default function IconButton(props: IconButtonProps) {
  const { variant = "solid", children, className } = props;
  const cls = ["icon-button", `icon-button--${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const icon = children ?? <ArrowUpRightIcon />;

  if (props.decorative) {
    return (
      <span className={cls} aria-hidden="true">
        {icon}
      </span>
    );
  }

  if (props.href !== undefined) {
    const {
      variant: _v,
      children: _c,
      className: _cn,
      label,
      decorative: _d,
      ...anchorProps
    } = props;
    return (
      <a className={cls} aria-label={label} {...anchorProps}>
        {icon}
      </a>
    );
  }

  const {
    variant: _v,
    children: _c,
    className: _cn,
    label,
    decorative: _d,
    type = "button",
    ...buttonProps
  } = props;
  return (
    <button className={cls} type={type} aria-label={label} {...buttonProps}>
      {icon}
    </button>
  );
}
