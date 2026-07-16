import type { SchemaTypeDefinition } from "sanity";

import { richText } from "./richText";
import { videoEmbed } from "./blocks/videoEmbed";
import { videoLoop } from "./blocks/videoLoop";
import { textSection } from "./blocks/textSection";
import { mediaGrid } from "./blocks/mediaGrid";
import { creditGrid } from "./blocks/creditGrid";
import { siteCompSection } from "./blocks/siteCompSection";
import { quote } from "./blocks/quote";
import { project } from "./project";
import { changelogEntry } from "./changelogEntry";
import { blogPost } from "./blogPost";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // shared
  richText,
  videoEmbed,
  videoLoop,
  // case study blocks
  textSection,
  mediaGrid,
  creditGrid,
  siteCompSection,
  quote,
  // documents
  project,
  changelogEntry,
  blogPost,
  siteSettings,
];
