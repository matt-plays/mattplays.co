import type { QuoteBlock } from "./types";

/**
 * Pull quote. No case study currently uses this block, so the markup borrows
 * the text-section shell. The quote itself uses the text role for now; the
 * blockquote role is defined in styles/typography.css and ready to adopt.
 */
export default function Quote({ block }: { block: QuoteBlock }) {
  if (!block.text) return null;
  return (
    <div className="creditgrid">
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="w-layout-grid grid-globalgrid">
            <div
              id="w-node-_0970d66a-2dd6-eb11-632b-6477e8ded166-e8ded162"
              className="textsection-container"
            >
              <blockquote className="text size-2xl" style={{ margin: 0, padding: 0, border: 0 }}>
                {block.text}
              </blockquote>
              {block.attribution || block.role ? (
                <>
                  <div
                    id="w-node-_0970d66a-2dd6-eb11-632b-6477e8ded169-e8ded162"
                    className="spacer-xs"
                  ></div>
                  <div className="mono size-xs">
                    {[block.attribution, block.role].filter(Boolean).join(", ")}
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="spacer-xl"></div>
        </div>
      </div>
    </div>
  );
}
