const ROWS = [1, 2, 3, 4, 5];

/**
 * The 5x5 dot ripple that sits at the end of the promo banner.
 *
 * Purely decorative — the keyframes (one animation per cell, 6.4s loop) are
 * generated into styles/promo-bar-loader.css by scripts/build-loader-keyframes.mjs
 * from the Figma motion export. Nothing here is interactive or stateful, so it
 * stays a server component.
 */
export default function PromoBarLoader() {
  return (
    <span className="promo-banner__loader" aria-hidden="true">
      {ROWS.map((row) =>
        ROWS.map((col) => (
          <span
            key={`${row}-${col}`}
            className={`promo-banner__dot promo-banner__dot--${row}-${col}`}
          />
        )),
      )}
    </span>
  );
}
