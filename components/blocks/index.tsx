import CreditGrid from "./CreditGrid";
import MediaGrid from "./MediaGrid";
import Quote from "./Quote";
import SiteCompSection from "./SiteCompSection";
import TextSection from "./TextSection";
import VideoEmbed from "./VideoEmbed";
import VideoLoop from "./VideoLoop";
import type { MediaGridBlock, ProjectBodyBlock } from "./types";

function isStandardGrid(block?: ProjectBodyBlock): block is MediaGridBlock {
  if (!block || block._type !== "mediaGrid" || block.layout === "fullViewport") return false;
  const items = block.items ?? [];
  // cell grids (.grid-2x2 / .grid-3x3) close with their own spacer rhythm
  const cellGrid =
    items.length >= 4 && items.every((i) => i._type === "image" && i.width !== "half");
  return !cellGrid;
}

function Block({ block, next }: { block: ProjectBodyBlock; next?: ProjectBodyBlock }) {
  switch (block._type) {
    case "textSection":
      return <TextSection block={block} />;
    case "mediaGrid":
      return <MediaGrid block={block} nextIsGrid={isStandardGrid(next)} />;
    case "siteCompSection":
      return <SiteCompSection block={block} />;
    case "creditGrid":
      return <CreditGrid block={block} />;
    case "quote":
      return <Quote block={block} />;
    case "videoEmbed":
      return <VideoEmbed block={block} />;
    case "videoLoop":
      return <VideoLoop block={block} />;
    default:
      return null;
  }
}

export default function BlockRenderer({ blocks }: { blocks?: ProjectBodyBlock[] | null }) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={block._key} block={block} next={blocks[i + 1]} />
      ))}
    </>
  );
}
