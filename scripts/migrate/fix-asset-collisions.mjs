/**
 * Fixes migration asset collisions: distinct Webflow uploads sharing a
 * filename (e.g. Delight Labs' and Help Scout Brand Evolution's
 * HelpScout-PrimaryVisual.jpg) were deduped to whichever file the zip export
 * contained. Downloads the true bytes per hash-prefixed CDN URL, uploads to
 * Sanity, and patches the affected fields/body images. Idempotent.
 */
import fs from "node:fs";
import path from "node:path";
import { client } from "./lib/sanity.mjs";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const CDN_DIR = path.join(ROOT, ".assets", "cdn");
fs.mkdirSync(CDN_DIR, { recursive: true });

async function uploadTrue(url) {
  const name = decodeURIComponent(url.split("/").pop()).replace(/[^\w.\-]/g, "_");
  const dest = path.join(CDN_DIR, name);
  if (!fs.existsSync(dest) || fs.statSync(dest).size === 0) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  }
  const asset = await client.assets.upload("image", fs.createReadStream(dest), {
    filename: name,
  });
  return asset._id;
}

const CDN = "https://cdn.prod.website-files.com/6136c316c9ac13694f82b592";

// field fixes: docId -> {field: trueUrl}
const FIELD_FIXES = {
  // Delight Labs
  "project-68bb5f193603aa0665297485": {
    heroVisual: `${CDN}/68bc20bd2545d02b50717755_HelpScout-PrimaryVisual.jpg`,
    primaryThumbnail: `${CDN}/68bc20c0791514d5d3f7dab6_HelpScout-PrimaryVisual-Thumb.jpg`,
    secondaryThumbnail: `${CDN}/68bc20c5a4b3ba36eec1ffbe_HelpScout-SecondaryVisual-Thumb.jpg`,
  },
  // Help Scout Brand Evolution
  "project-674617901a7242270055c983": {
    heroVisual: `${CDN}/674617728989034bc571ef8f_HelpScout-PrimaryVisual.jpg`,
    primaryThumbnail: `${CDN}/67461775bf4bf3d1215ad54b_HelpScout-PrimaryVisual-Thumb.jpg`,
    secondaryThumbnail: `${CDN}/6746177afe28d00d42dd43b8_HelpScout-SecondaryVisual-Thumb.jpg`,
  },
  // Rock Dove
  "project-6907975f3a746dc0a7f12319": {
    primaryThumbnail: `${CDN}/6907972361a39922df7abd23_RockDove-CaseStudy-01-Thumb.jpg`,
    secondaryThumbnail: `${CDN}/6907972bea0cdc35e2fde272_RockDove-CaseStudy-02-Thumb.jpg`,
  },
};

// The remaining colliding hashes (6756380c, 69079d5d) are og:image metas on
// pages whose Webflow uploads are already dead (403) — the site now derives
// og:image from primaryThumbnail, so no body/data fix is needed for them.

for (const [docId, fields] of Object.entries(FIELD_FIXES)) {
  const patch = {};
  for (const [field, url] of Object.entries(fields)) {
    const id = await uploadTrue(url);
    patch[field] = { _type: "image", asset: { _type: "reference", _ref: id } };
    console.log(`✓ ${docId}.${field} ← ${url.split("_").pop()} (${id.slice(6, 14)}…)`);
  }
  await client.patch(docId).set(patch).commit();
}

console.log("done");
