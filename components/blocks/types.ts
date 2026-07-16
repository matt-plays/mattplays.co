import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

/**
 * Shapes returned by `projectBySlugQuery` / `allProjectsQuery` for the work
 * section. Asset references inside body blocks arrive dereferenced (asset->)
 * or flattened to plain URLs (videoLoop) — see sanity/lib/queries.ts.
 */

export interface SanityImageValue {
  _type: "image";
  _key?: string;
  asset?: SanityImageSource | null;
  alt?: string | null;
  rounded?: boolean | null;
  width?: "full" | "half" | null;
}

export interface TextSectionBlock {
  _type: "textSection";
  _key: string;
  overline?: string | null;
  body?: PortableTextBlock[] | null;
}

export interface VideoLoopValue {
  _type: "videoLoop";
  _key?: string;
  width?: "full" | "half" | null;
  videoUrl?: string | null;
  videoFile?: string | null;
  posterUrl?: string | null;
  posterAspect?: number | null;
}

export interface VideoEmbedValue {
  _type: "videoEmbed";
  _key?: string;
  url?: string | null;
  aspectRatio?: string | null;
}

export type MediaGridItem = SanityImageValue | VideoLoopValue | VideoEmbedValue;

export interface MediaGridBlock {
  _type: "mediaGrid";
  _key: string;
  layout?: "grid" | "twoUp" | "fullViewport" | null;
  items?: MediaGridItem[] | null;
}

export interface SiteCompSectionBlock {
  _type: "siteCompSection";
  _key: string;
  variant?: string | null;
  background?: string | null;
  media?: SanityImageValue[] | null;
}

export interface Credit {
  _key: string;
  label?: string | null;
  value?: string | null;
  url?: string | null;
}

export interface CreditGridBlock {
  _type: "creditGrid";
  _key: string;
  overline?: string | null;
  intro?: PortableTextBlock[] | null;
  credits?: Credit[] | null;
}

export interface QuoteBlock {
  _type: "quote";
  _key: string;
  text?: string | null;
  attribution?: string | null;
  role?: string | null;
}

export interface VideoEmbedBlock extends VideoEmbedValue {
  _key: string;
}

export interface VideoLoopBlock extends VideoLoopValue {
  _key: string;
}

export type ProjectBodyBlock =
  | TextSectionBlock
  | MediaGridBlock
  | SiteCompSectionBlock
  | CreditGridBlock
  | QuoteBlock
  | VideoEmbedBlock
  | VideoLoopBlock;

export interface ProjectCard {
  _id: string;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  roles?: string | null;
  color?: string | null;
  order?: number | null;
  heroVisual?: SanityImageSource | null;
  primaryThumbnail?: SanityImageSource | null;
  secondaryThumbnail?: SanityImageSource | null;
}

export interface ProjectDetail extends ProjectCard {
  body?: ProjectBodyBlock[] | null;
}
