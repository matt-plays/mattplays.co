import { Fragment } from "react";
import RichText from "@/components/RichText";
import type { CreditGridBlock } from "./types";

/**
 * Closing credits section (Webflow's `.creditgrid` with `.iscreditgrid`).
 * Credit values store multi-name lists as newline-separated strings; the
 * export rendered them with <br>. The item/spacer `w-node` id pairs come from
 * the export component and repeat every four items (all map to the same
 * 3-column span in the ported CSS).
 */
const ITEM_IDS: [string, string][] = [
  [
    "w-node-_66c135a1-4002-6b20-e532-9653a4c9f432-a4c9f42e",
    "w-node-_66c135a1-4002-6b20-e532-9653a4c9f435-a4c9f42e",
  ],
  [
    "w-node-_66c135a1-4002-6b20-e532-9653a4c9f43d-a4c9f42e",
    "w-node-_66c135a1-4002-6b20-e532-9653a4c9f440-a4c9f42e",
  ],
  [
    "w-node-_66c135a1-4002-6b20-e532-9653a4c9f447-a4c9f42e",
    "w-node-_66c135a1-4002-6b20-e532-9653a4c9f44a-a4c9f42e",
  ],
  [
    "w-node-_66c135a1-4002-6b20-e532-9653a4c9f451-a4c9f42e",
    "w-node-_66c135a1-4002-6b20-e532-9653a4c9f454-a4c9f42e",
  ],
];

function Lines({ value }: { value: string }) {
  const lines = value.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </>
  );
}

export default function CreditGrid({ block }: { block: CreditGridBlock }) {
  const credits = block.credits ?? [];
  return (
    <div className="creditgrid">
      <div className="section-padding">
        <div className="container-width w-container">
          {block.overline || block.intro ? (
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
                {block.intro ? (
                  <div className="text size-lg">
                    <RichText value={block.intro} plain />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          {credits.length ? (
            <div className="w-layout-grid grid-globalgrid iscreditgrid">
              {credits.map((credit, i) => {
                const [itemId, spacerId] = ITEM_IDS[i % ITEM_IDS.length];
                return (
                  <div key={credit._key} id={itemId} className="creditgrid-item">
                    <div className="overline size-xs">{credit.label}</div>
                    <div id={spacerId} className="spacer-xs"></div>
                    <div className="detail size-sm creditgrid-list">
                      {credit.url ? (
                        <a href={credit.url} target="_blank" rel="noopener noreferrer">
                          <Lines value={credit.value ?? ""} />
                        </a>
                      ) : (
                        <Lines value={credit.value ?? ""} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
          <div className="spacer-xl"></div>
        </div>
      </div>
    </div>
  );
}
