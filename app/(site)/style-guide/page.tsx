import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style Guide",
  openGraph: { title: "Style Guide" },
  twitter: { title: "Style Guide" },
};

/*
 * The four roles defined in Figma, plus blockquote, each across the sizes the
 * library actually publishes for that role.
 */
const TYPE_ROLES = [
  {
    name: "Headline",
    className: "headline",
    spec: "Universal Sans Display 400 \u00b7 112.5% \u00b7 optical tracking",
    sample: "Design that earns its keep",
    sizes: [
      "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl",
      "4xl", "5xl", "6xl", "7xl", "8xl", "9xl", "10xl", "11xl",
    ],
  },
  {
    name: "Text",
    className: "text",
    spec: "Universal Sans Display 400 \u00b7 162.5% \u00b7 2% tracking",
    sample:
      "Body copy sits at a generous 162.5% leading so long passages stay readable at any step on the ramp.",
    sizes: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
  },
  {
    name: "Mono",
    className: "mono",
    spec: "FK Grotesk Mono Regular \u00b7 162.5% \u00b7 0% tracking",
    sample: "Credits, metadata, and captions \u2014 2026",
    sizes: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
  },
  {
    name: "Overline",
    className: "overline",
    spec: "Spezia Extended Bold \u00b7 112.5% \u00b7 12% tracking \u00b7 uppercase",
    sample: "Selected work",
    sizes: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
  },
  {
    name: "Blockquote",
    className: "blockquote",
    spec: "Tiempos Text Regular \u00b7 112.5% \u00b7 -3% tracking",
    sample: "\u201cThe best interface is the one you never notice.\u201d",
    sizes: ["2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl"],
  },
] as const;

export default function StyleGuidePage() {
  return (
    <>
      <div className="style-guide-typography">
        <div className="container-width w-container">
          <div className="spacer-l"></div>
          <div className="overline size-sm">Type system &mdash; Portfolio Core 2026</div>
          <div className="spacer-xs"></div>
          <p className="text size-lg" style={{ maxWidth: "60ch" }}>
            Four roles, one shared size ramp. Every value here is ported from the Figma library;
            sizes interpolate between the Mobile and Desktop modes of the <code>metrics</code>{" "}
            collection, so resize the window to see each step move.
          </p>
          <div className="spacer-l"></div>

          {TYPE_ROLES.map((role) => (
            <section key={role.name} style={{ marginBottom: "var(--space-xl)" }}>
              <div className="mono size-xs slate-400">
                {role.name} &middot; {role.spec}
              </div>
              <div className="spacer-xs"></div>
              {role.sizes.map((size) => (
                <div
                  key={size}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "5rem 1fr",
                    gap: "var(--space-xs)",
                    alignItems: "baseline",
                    padding: "var(--space-xs) 0",
                    borderTop: "1px solid var(--color-clay-400)",
                  }}
                >
                  <div className="mono size-2xs slate-400">{size}</div>
                  <div className={`${role.className} size-${size}`}>{role.sample}</div>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="w-layout-grid grid-globalgrid">
            <div
              id="w-node-a21aa5a4-50e6-0517-aef1-751e4529e3a5-119d1176"
              className="utility-colorhuecolumn"
            >
              <div className="clay-50"></div>
              <div className="clay-100"></div>
              <div className="clay-200"></div>
              <div className="div-block-15"></div>
              <div className="div-block-14"></div>
              <div className="div-block-13"></div>
              <div className="div-block-12"></div>
              <div className="div-block-11"></div>
              <div className="div-block-10"></div>
              <div className="clay-900"></div>
            </div>
          </div>
        </div>
        <div className="spacer-xl"></div>
      </div>
      <div className="style-guide">
        <div className="style-guide-animation p-bottom-l">
          <div className="container-width w-container">
            <div className="w-layout-grid grid-12">
              <div
                id="w-node-_23f84df3-f1c6-6b0d-38d4-8e4ca97496d2-119d1176"
                className="image-wrapper img-border-radius"
              >
                <img
                  src="/images/hs-atg-brandboard.webp"
                  loading="lazy"
                  decoding="async"
                  alt=""
                  className="animation-image-zoom"
                />
              </div>
              <div
                id="w-node-_23f84df3-f1c6-6b0d-38d4-8e4ca97496d4-119d1176"
                className="image-wrapper img-border-radius animation-viewport-fade"
              >
                <img src="/images/hs-atg-brandboard.webp" loading="lazy" decoding="async" alt="" />
              </div>
              <div
                id="w-node-_3fe1a0f2-9079-9998-3cfe-67cd854e25d2-119d1176"
                className="img-border-radius"
              >
                <img src="/images/hs-atg-brandboard.webp" loading="lazy" decoding="async" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
