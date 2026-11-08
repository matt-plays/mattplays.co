import type { Metadata } from "next";
import Button from "@/components/Button";
import FeatureRow from "@/components/FeatureRow";
import IconButton from "@/components/IconButton";
import TextRow from "@/components/TextRow";

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
    name: "Quote (defined, not yet in use)",
    className: "quote",
    spec: "Tiempos Text Regular \u00b7 112.5% \u00b7 -3% tracking",
    sample: "\u201cThe best interface is the one you never notice.\u201d",
    sizes: ["2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl"],
  },
] as const;

const BUTTON_SIZES = ["sm", "md", "lg", "xl", "2xl"] as const;

/* The semantic tokens from theme.css, grouped as they are defined. */
const COLOR_GROUPS = [
  {
    name: "Surface",
    tokens: ["--surface-page", "--surface-raised", "--surface-sunken", "--surface-inset", "--surface-inverse"],
  },
  {
    name: "Content",
    tokens: ["--content-primary", "--content-secondary", "--content-muted", "--content-inverse"],
  },
  { name: "Border", tokens: ["--border-subtle", "--border-strong"] },
  { name: "Accent", tokens: ["--accent", "--accent-hover", "--surface-accent", "--highlight"] },
] as const;

export default function StyleGuidePage() {
  return (
    <>
      <div className="style-guide-typography">
        <div className="container-width w-container">
          <div className="spacer-l"></div>
          {/* The mode switch used to live here; it is in the nav now, and two
              copies would disagree — neither watches the other's clicks. */}
          <div className="overline size-sm">Portfolio Core 2026</div>
          <div className="spacer-xs"></div>
          <p className="text size-lg" style={{ maxWidth: "60ch" }}>
            Four roles, one shared size ramp. Every value here is ported from the Figma library;
            sizes interpolate between the Mobile and Desktop modes of the <code>metrics</code>{" "}
            collection, so resize the window to see each step move.
          </p>
          <div className="spacer-l"></div>

          {TYPE_ROLES.map((role) => (
            <section key={role.name} style={{ marginBottom: "var(--space-xl)" }}>
              <div className="mono size-xs" style={{ color: "var(--content-muted)" }}>
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
                  <div className="mono size-2xs" style={{ color: "var(--content-muted)" }}>{size}</div>
                  <div className={`${role.className} size-${size}`}>{role.sample}</div>
                </div>
              ))}
            </section>
          ))}

          {/* ---------------- Buttons ---------------- */}
          <section style={{ marginBottom: "var(--space-xl)" }}>
            <div className="overline size-sm">Buttons</div>
            <div className="spacer-xs"></div>
            <p className="text size-lg" style={{ maxWidth: "60ch" }}>
              Pill-shaped, in a solid and an outline variant. Geometry is set in{" "}
              <code>em</code>, so the size classes resize the whole control. A solid button is
              the inverse of the page it sits on, which is what keeps both variants correct in
              either mode.
            </p>
            <div className="spacer-s"></div>

            {([
              ["Solid", "solid"],
              ["Outline", "outline"],
            ] as const).map(([label, variant]) => (
              <div key={variant} style={{ marginBottom: "var(--space-m)" }}>
                <div className="mono size-xs" style={{ color: "var(--content-muted)" }}>{label}</div>
                <div className="spacer-xs"></div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-xs)",
                    alignItems: "center",
                  }}
                >
                  {BUTTON_SIZES.map((size) => (
                    <Button key={size} variant={variant} size={size} arrow>
                      See what&rsquo;s new
                    </Button>
                  ))}
                </div>
                <div className="spacer-xs"></div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "var(--space-xs)",
                    alignItems: "center",
                  }}
                >
                  <Button variant={variant}>No arrow</Button>
                  <Button variant={variant} arrow href="#buttons">
                    As a link
                  </Button>
                  <Button variant={variant} disabled>
                    Disabled
                  </Button>
                </div>
              </div>
            ))}
          </section>

          {/* ---------------- Icon buttons ---------------- */}
          <section style={{ marginBottom: "var(--space-xl)" }}>
            <div className="overline size-sm">Icon buttons</div>
            <div className="spacer-xs"></div>
            <p className="text size-lg" style={{ maxWidth: "60ch" }}>
              The same button in a circular, icon-only shape — 12px around a 20px icon, which
              makes a 44px control. It reads from the same <code>--button-*</code> tokens as the
              pill above, so the two can never drift apart in colour. Being icon-only, every
              interactive form requires a label.
            </p>
            <div className="spacer-s"></div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-xs)",
                alignItems: "center",
              }}
            >
              <IconButton variant="solid" label="Solid icon button" />
              <IconButton variant="secondary" label="Secondary icon button" />
              <IconButton variant="outline" label="Outline icon button" />
              <IconButton variant="outline" label="As a link" href="#icon-buttons" />
              <IconButton variant="solid" label="Disabled icon button" disabled />
            </div>
          </section>

          {/* ---------------- Semantic colour ---------------- */}
          <section style={{ marginBottom: "var(--space-xl)" }}>
            <div className="overline size-sm">Semantic colour</div>
            <div className="spacer-xs"></div>
            <p className="text size-lg" style={{ maxWidth: "60ch" }}>
              What each colour is <em>for</em>, not what it looks like. Every swatch below is
              reading its live value, so flipping the mode in the nav repaints this whole
              section.
            </p>
            <div className="spacer-s"></div>

            {COLOR_GROUPS.map((group) => (
              <div key={group.name} style={{ marginBottom: "var(--space-m)" }}>
                <div className="mono size-xs" style={{ color: "var(--content-muted)" }}>{group.name}</div>
                <div className="spacer-xs"></div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(11rem, 1fr))",
                    gap: "var(--space-xs)",
                  }}
                >
                  {group.tokens.map((token) => (
                    <div key={token}>
                      <div
                        style={{
                          height: "4rem",
                          borderRadius: "0.5rem",
                          background: `var(${token})`,
                          border: "1px solid var(--border-subtle)",
                        }}
                      />
                      <div className="mono size-2xs" style={{ marginTop: "0.5rem" }}>
                        {token}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
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

      {/* ---------------- Page sections ----------------
          FeatureRow and TextRow render at full page width, so they sit
          outside the typography container above to show their real geometry.
          Images are stand-ins; what is being shown is the grid. */}
      <div className="container-width w-container">
        <div className="overline size-sm">Page sections</div>
        <div className="spacer-xs"></div>
        <p className="text size-lg" style={{ maxWidth: "60ch" }}>
          The rows the 2026 home page stacks below its hero. Both are page-width
          and carry their own rhythm, so a page is a list of them.
        </p>
        <div className="spacer-l"></div>
      </div>

      <TextRow>
        The system is a flexible component library that enables adaptability while
        personalizing every digital touchpoint
      </TextRow>

      <FeatureRow
        heading="The latest"
        images={[
          { src: "/images/HelpScout-PrimaryVisual.webp" },
          { src: "/images/ITW-Intro-07.webp" },
          { src: "/images/hs-atg-brandboard.webp" },
          { src: "/images/HelpScout-DelightLabs-Lobster.webp" },
        ]}
        tags={["Branding", "Design"]}
        body="A staggered row of four tiles sharing a baseline, with the details band repeating the same four columns underneath."
        action={{ label: "View", href: "/work" }}
      />

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
