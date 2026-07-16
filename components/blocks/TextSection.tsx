import RichText from "@/components/RichText";
import type { TextSectionBlock } from "./types";

/**
 * Webflow parity: text sections ship inside a `.creditgrid` shell in the
 * export (same wrapper as the credits block), with the copy in a
 * `.textsection-container` placed on the global grid. The duplicated
 * `w-node` ids are intentional — the ported CSS positions these nodes by id.
 */
export default function TextSection({ block }: { block: TextSectionBlock }) {
  return (
    <div className="creditgrid">
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="w-layout-grid grid-globalgrid">
            <div
              id="w-node-_0970d66a-2dd6-eb11-632b-6477e8ded166-e8ded162"
              className="textsection-container"
            >
              {block.overline ? <div className="overline size-sm">{block.overline}</div> : null}
              <div
                id="w-node-_0970d66a-2dd6-eb11-632b-6477e8ded169-e8ded162"
                className="spacer-xs"
              ></div>
              <div className="text size-lg">
                {block.body ? <RichText value={block.body} plain /> : null}
              </div>
            </div>
          </div>
          <div className="spacer-xl"></div>
        </div>
      </div>
    </div>
  );
}
