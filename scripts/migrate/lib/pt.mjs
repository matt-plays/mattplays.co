import { htmlToBlocks } from "@sanity/block-tools";
import { JSDOM } from "jsdom";
import { Schema } from "@sanity/schema";
import crypto from "node:crypto";

const compiled = Schema.compile({
  name: "migration",
  types: [
    {
      type: "object",
      name: "doc",
      fields: [
        {
          name: "body",
          type: "array",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Quote", value: "blockquote" },
              ],
              marks: {
                annotations: [
                  {
                    name: "link",
                    type: "object",
                    fields: [
                      { name: "href", type: "url" },
                      { name: "blank", type: "boolean" },
                    ],
                  },
                ],
              },
            },
            { type: "image", name: "image" },
          ],
        },
      ],
    },
  ],
});

const blockContentType = compiled.get("doc").fields.find((f) => f.name === "body").type;

/**
 * Strip Webflow/Squarespace migration artifacts:
 * - figcaptions (they carry escaped legacy markup and filenames, not captions)
 * - literal escaped `<img …>` text fragments
 * - "View fullsize" remnants and squarespace-migration.local links
 * - empty paragraphs / zero-width characters
 */
export function cleanWebflowHtml(html) {
  return (
    html
      .replace(/<figcaption[^>]*>[\s\S]*?<\/figcaption>/gi, "")
      .replace(/&lt;img[\s\S]*?\/?&gt;/gi, "")
      .replace(/View fullsize/gi, "")
      // links to the defunct local WP migration host: keep inner text, drop link
      .replace(/<a[^>]*href="http:\/\/squarespace-migration\.local[^"]*"[^>]*>([\s\S]*?)<\/a>/gi, "$1")
      .replace(/[​‌‍﻿]/g, "")
  );
}

function key() {
  return crypto.randomBytes(6).toString("hex");
}

function addKeys(node) {
  if (Array.isArray(node)) {
    for (const item of node) addKeys(item);
  } else if (node && typeof node === "object") {
    if (node._type && !node._key) node._key = key();
    for (const value of Object.values(node)) addKeys(value);
  }
  return node;
}

function isEmptyTextBlock(block) {
  if (block._type !== "block") return false;
  const text = (block.children ?? [])
    .map((c) => c.text ?? "")
    .join("")
    .replace(/ /g, " ")
    .trim();
  return text === "";
}

/**
 * Convert Webflow rich-text HTML into Portable Text blocks. Images come out as
 * `{_type:'image', _webflowSrc}` placeholders — resolve with resolveImages().
 */
export function htmlToPT(html) {
  const blocks = htmlToBlocks(cleanWebflowHtml(html ?? ""), blockContentType, {
    parseHtml: (h) => new JSDOM(h).window.document,
    rules: [
      {
        deserialize(el, next, block) {
          const tag = el.tagName?.toLowerCase();
          if (tag === "img") {
            const src = el.getAttribute("src");
            if (!src) return undefined;
            return block({
              _type: "image",
              _webflowSrc: src,
              alt: el.getAttribute("alt") || undefined,
            });
          }
          if (tag === "iframe") {
            const src = el.getAttribute("src");
            if (!src) return undefined;
            return block({ _type: "videoEmbed", url: src });
          }
          return undefined;
        },
      },
    ],
  });
  return blocks.filter((b) => !isEmptyTextBlock(b));
}

/** Replace `_webflowSrc` placeholders with uploaded Sanity asset references. */
export async function resolveImages(blocks, { uploadImageFor, normalizeCdnUrl }) {
  const out = [];
  for (const b of blocks) {
    if (b._type === "image" && b._webflowSrc) {
      const src = normalizeCdnUrl(b._webflowSrc);
      const assetId = await uploadImageFor(src);
      if (!assetId) {
        console.warn("  ! no local asset for", src, "- dropping image");
        continue;
      }
      const { _webflowSrc, ...rest } = b;
      out.push({ ...rest, asset: { _type: "reference", _ref: assetId } });
    } else {
      out.push(b);
    }
  }
  return addKeys(out);
}
