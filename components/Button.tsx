import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "solid" | "outline";
type Size = "sm" | "md" | "lg" | "xl" | "2xl";

/** Trailing arrow matching the pill button in the 2026 design. Decorative. */
function ArrowIcon() {
  return (
    <svg
      className="button__icon"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

type SharedProps = {
  variant?: Variant;
  size?: Size;
  /** Shows the trailing arrow. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonElementProps = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof SharedProps> & { href?: undefined };

type AnchorElementProps = SharedProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof SharedProps> & { href: string };

export type ButtonProps = ButtonElementProps | AnchorElementProps;

/**
 * Pill button. Renders an <a> when given an href, otherwise a <button>.
 *
 * Colour comes entirely from the semantic tokens in theme.css — a solid button
 * is the inverse of the page it sits on — so both variants are correct in light
 * and dark without a mode-specific branch here.
 */
export default function Button(props: ButtonProps) {
  const { variant = "solid", size = "md", arrow = false, children, className } = props;
  const cls = ["button", `button--${variant}`, `button--${size}`, className]
    .filter(Boolean)
    .join(" ");
  const icon = arrow ? <ArrowIcon /> : null;

  if (props.href !== undefined) {
    const {
      variant: _v,
      size: _s,
      arrow: _a,
      children: _c,
      className: _cn,
      ...anchorProps
    } = props;
    return (
      <a className={cls} {...anchorProps}>
        {children}
        {icon}
      </a>
    );
  }

  const {
    variant: _v,
    size: _s,
    arrow: _a,
    children: _c,
    className: _cn,
    type = "button",
    ...buttonProps
  } = props;
  return (
    <button className={cls} type={type} {...buttonProps}>
      {children}
      {icon}
    </button>
  );
}
