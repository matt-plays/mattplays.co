import { urlFor } from "@/sanity/lib/image";
import type { SanityImageValue, SiteCompSectionBlock } from "./types";

/**
 * Webflow's bespoke `.sitecompsection-<variant>` compositions. Every variant
 * shares the same shell —
 *   .sitecompsection-<variant> > .section-padding > .container-width
 *     > .w-layout-grid.grid-globalgrid > .sitecompsection-grid > children
 * — but differs in background (carried by the variant class in the ported
 * CSS), the mask class applied to each image, and optional tablet+mobile
 * pairings (.sitecompsection-tabletmobile). The `w-node` ids are preserved
 * from the export because the ported CSS positions the grid nodes by id
 * (including responsive overrides).
 *
 * Per-variant spec: each entry consumes images from `media` in order.
 *   string | null      → one image with that mask class
 *   [a, b]             → tablet+mobile pair (696px / 314px)
 */
type Mask = "sitecomp-mask" | "sitecomp-mask-long" | "sitecomp-mask-long-top" | null;
type SpecItem = Mask | [Mask, Mask];

const VARIANTS: Record<string, { gridId: string; globalGridId?: string; spec: SpecItem[] }> = {
  rockdove: {
    globalGridId: "w-node-_13efa352-6a77-55fc-b82e-8dd9f3003766-b2d8fe30",
    gridId: "w-node-_3ae75b6b-47cd-d9b2-434f-dec74837876f-b2d8fe30",
    spec: ["sitecomp-mask-long", null],
  },
  delightlabs: {
    globalGridId: "w-node-_13efa352-6a77-55fc-b82e-8dd9f3003766-1711e2b5",
    gridId: "w-node-_3ae75b6b-47cd-d9b2-434f-dec74837876f-1711e2b5",
    spec: ["sitecomp-mask-long"],
  },
  hsbe: {
    globalGridId: "w-node-_13efa352-6a77-55fc-b82e-8dd9f3003766-8c83335d",
    gridId: "w-node-_3ae75b6b-47cd-d9b2-434f-dec74837876f-8c83335d",
    spec: ["sitecomp-mask-long", [null, "sitecomp-mask"], "sitecomp-mask-long-top"],
  },
  hswd: {
    globalGridId: "w-node-_13efa352-6a77-55fc-b82e-8dd9f3003766-119d116e",
    gridId: "w-node-_3ae75b6b-47cd-d9b2-434f-dec74837876f-119d116e",
    spec: ["sitecomp-mask-long", ["sitecomp-mask", "sitecomp-mask"]],
  },
  bwd: {
    gridId: "w-node-_5c50d0a9-1e43-74a9-28a8-267c6015be67-119d1167",
    spec: ["sitecomp-mask"],
  },
  epic: {
    gridId: "w-node-d4642f14-ad05-1f98-5a1b-5bf599786009-119d116d",
    spec: ["sitecomp-mask", "sitecomp-mask", null],
  },
  atg: {
    gridId: "w-node-d5a8349f-32ac-62b8-413f-22d5c893feef-119d116f",
    spec: ["sitecomp-mask"],
  },
  csa: {
    gridId: "w-node-_55b008ec-84ec-c25e-6922-8b39ec58ae06-119d116f",
    spec: ["sitecomp-mask-long"],
  },
  hsp: {
    gridId: "w-node-_48fc643a-ef04-b5d9-d82b-39b5fcde8b1b-119d116f",
    spec: ["sitecomp-mask-long", ["sitecomp-mask", "sitecomp-mask"]],
  },
  icon: {
    gridId: "w-node-f282b1de-670b-d39f-9a34-baadc42598f9-119d1171",
    spec: ["sitecomp-mask"],
  },
  itw: {
    gridId: "w-node-_9f774716-e32c-d110-7aef-70d27dc91f4a-119d1172",
    spec: ["sitecomp-mask", null, [null, "sitecomp-mask"], "sitecomp-mask", null],
  },
  iomw: {
    gridId: "w-node-_2925e61a-5c2a-84c2-b875-96bc64b4e343-119d1178",
    spec: [null],
  },
};

function CompImage({
  image,
  mask,
  width,
}: {
  image?: SanityImageValue;
  mask: Mask;
  width?: number;
}) {
  if (!image?.asset) return null;
  const cls = ["image-wrapper", "img-border-radius", mask].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        loading="lazy"
        width={width ?? 1058}
        alt={image.alt ?? ""}
        src={urlFor(image.asset).width(2000).auto("format").url()}
      />
    </div>
  );
}

export default function SiteCompSection({ block }: { block: SiteCompSectionBlock }) {
  const media = block.media ?? [];
  if (!media.length) return null;
  const variant = block.variant ?? "";
  const conf = VARIANTS[variant];
  // Unknown variants fall back to unmasked stacked images in the shared shell.
  const spec: SpecItem[] = conf?.spec ?? media.map(() => null);

  let cursor = 0;
  const children = spec.map((entry, i) => {
    if (Array.isArray(entry)) {
      const [tabletMask, mobileMask] = entry;
      const tablet = media[cursor++];
      const mobile = media[cursor++];
      return (
        <div key={i} className="sitecompsection-tabletmobile">
          <CompImage image={tablet} mask={tabletMask} width={696} />
          <CompImage image={mobile} mask={mobileMask} width={314} />
        </div>
      );
    }
    return <CompImage key={i} image={media[cursor++]} mask={entry} />;
  });
  // Render any extra images the spec didn't account for.
  while (cursor < media.length) {
    children.push(<CompImage key={`extra-${cursor}`} image={media[cursor++]} mask={null} />);
  }

  return (
    <div
      className={variant ? `sitecompsection-${variant}` : "sitecompsection-grid-section"}
      style={block.background ? { backgroundColor: block.background } : undefined}
    >
      <div className="section-padding">
        <div className="container-width w-container">
          <div id={conf?.globalGridId} className="w-layout-grid grid-globalgrid">
            <div id={conf?.gridId} className="sitecompsection-grid">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
