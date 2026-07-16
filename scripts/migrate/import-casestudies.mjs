/**
 * Case-study body migration: parses each exported work/<slug>.html and
 * reconstructs the page as page-builder blocks on the matching `project` doc.
 *
 * Body-level section → block mapping:
 *   .creditgrid (with .creditgrid-item)  → creditGrid
 *   .creditgrid (text only)              → textSection
 *   .image-grid-3x3 / .image-fullviewport→ mediaGrid (items keep width hints)
 *   .video-wrapperwidth                  → videoLoop
 *   .sitecompsection-<variant>           → siteCompSection
 *   hero / promo / project-list / footer → skipped (rendered from doc fields)
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { JSDOM } from "jsdom";
import { client, uploadImageFor, normalizeCdnUrl, manifest } from "./lib/sanity.mjs";
import { htmlToPT, resolveImages } from "./lib/pt.mjs";

const WORK_DIR =
  "/private/tmp/claude-501/-Users-mattplays-Documents-GitHub-mattplays-co--claude-worktrees-portfolio-sanity-rebuild-6507f7/265e4707-09cf-41e4-af95-9383ac85ebd8/scratchpad/webflow/work";

const key = () => crypto.randomBytes(6).toString("hex");

// --- file-asset upload (videos), cached like images -------------------------
const CACHE_FILE = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  ".assets",
  "file-upload-cache.json"
);
const fileCache = fs.existsSync(CACHE_FILE)
  ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"))
  : {};

async function uploadFileFor(ref) {
  const local = manifest[ref] ?? manifest[decodeURIComponent(ref)];
  if (!local || !fs.existsSync(local)) return null;
  if (fileCache[local]) return fileCache[local];
  const asset = await client.assets.upload("file", fs.createReadStream(local), {
    filename: path.basename(local),
  });
  fileCache[local] = asset._id;
  fs.writeFileSync(CACHE_FILE, JSON.stringify(fileCache, null, 1));
  return asset._id;
}

// --- helpers -----------------------------------------------------------------
function assetKeyFromSrc(src) {
  if (!src) return null;
  if (src.startsWith("http")) return normalizeCdnUrl(src);
  return normalizeCdnUrl(src.replace(/^(\.\.\/)?images\//, ""));
}

function videoKeyFromSrc(src) {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  return "videos/" + src.replace(/^(\.\.\/)?videos\//, "");
}

async function imageItem(img, { width = "full" } = {}) {
  const k = assetKeyFromSrc(img.getAttribute("src"));
  const assetId = k && (await uploadImageFor(k));
  if (!assetId) {
    console.warn("  ! image unresolved:", img.getAttribute("src"));
    return null;
  }
  const rounded = (img.closest(".image-wrapper")?.className ?? "").includes("img-border-radius");
  return {
    _type: "image",
    _key: key(),
    asset: { _type: "reference", _ref: assetId },
    alt: img.getAttribute("alt") || undefined,
    rounded,
    width,
  };
}

async function videoLoopItem(videoEl, { width = "full" } = {}) {
  const sources = [...videoEl.querySelectorAll("source")]
    .map((s) => s.getAttribute("src"))
    .filter(Boolean);
  const mp4 = sources.find((s) => s.endsWith(".mp4")) ?? sources[0];
  if (!mp4) return null;
  const assetId = await uploadFileFor(videoKeyFromSrc(mp4));
  if (!assetId) {
    console.warn("  ! video unresolved:", mp4);
    return null;
  }
  const item = {
    _type: "videoLoop",
    _key: key(),
    video: { _type: "file", asset: { _type: "reference", _ref: assetId } },
    width,
  };
  const posterUrl = videoEl.getAttribute("data-poster-url") || videoEl.getAttribute("poster");
  if (posterUrl) {
    const posterKey = posterUrl.startsWith("http")
      ? normalizeCdnUrl(posterUrl)
      : videoKeyFromSrc(posterUrl);
    const posterId = await uploadImageFor(posterKey);
    if (posterId) {
      item.poster = { _type: "image", asset: { _type: "reference", _ref: posterId } };
    }
  }
  return item;
}

/** Collect ordered media items within a grid section, tagging 2-up children. */
async function mediaItems(section) {
  const items = [];
  const seen = new Set();
  const nodes = section.querySelectorAll("img, video, [data-video-urls]");
  for (const node of nodes) {
    if (node.tagName === "IMG") {
      // skip <img> that are poster fallbacks inside background-video wrappers
      if (node.closest("[data-video-urls]") || node.closest("video")) continue;
      const width = node.closest(".image-grid-2-upgrid") ? "half" : "full";
      const item = await imageItem(node, { width });
      if (item) items.push(item);
    } else {
      // background video wrapper or <video>
      const videoEl = node.tagName === "VIDEO" ? node : node.querySelector("video") ?? node;
      const sig = videoEl.outerHTML;
      if (seen.has(sig)) continue;
      seen.add(sig);
      const width = node.closest(".image-grid-2-upgrid") ? "half" : "full";
      let item = null;
      if (videoEl.tagName === "VIDEO") {
        item = await videoLoopItem(videoEl, { width });
      } else {
        // div[data-video-urls] form
        const urls = (node.getAttribute("data-video-urls") ?? "").split(",");
        const mp4 = urls.find((u) => u.includes(".mp4"));
        if (mp4) {
          const assetId = await uploadFileFor(
            mp4.startsWith("http") ? mp4 : videoKeyFromSrc(mp4)
          );
          if (assetId) {
            item = {
              _type: "videoLoop",
              _key: key(),
              video: { _type: "file", asset: { _type: "reference", _ref: assetId } },
              width,
            };
            const poster = node.getAttribute("data-poster-url");
            if (poster) {
              const posterId = await uploadImageFor(
                poster.startsWith("http") ? normalizeCdnUrl(poster) : videoKeyFromSrc(poster)
              );
              if (posterId)
                item.poster = { _type: "image", asset: { _type: "reference", _ref: posterId } };
            }
          }
        }
      }
      if (item) items.push(item);
    }
  }
  // de-dupe videos that appear as both <video> and wrapper attrs
  const unique = [];
  const refs = new Set();
  for (const it of items) {
    const ref = it._type === "videoLoop" ? it.video.asset._ref : it.asset._ref;
    if (it._type === "videoLoop" && refs.has(ref)) continue;
    refs.add(ref);
    unique.push(it);
  }
  return unique;
}

async function textSectionBlocks(section) {
  const blocks = [];
  for (const ts of section.querySelectorAll(".textsection-container")) {
    const overline = ts.querySelector(".overline")?.textContent.trim() || undefined;
    const clone = ts.cloneNode(true);
    clone.querySelectorAll(".overline, .spacer-xs, .spacer-s, .spacer-m").forEach((n) => n.remove());
    const body = await resolveImages(htmlToPT(clone.innerHTML), {
      uploadImageFor,
      normalizeCdnUrl: (u) => assetKeyFromSrc(u),
    });
    if (overline || body.length) {
      blocks.push({ _type: "textSection", _key: key(), overline, body });
    }
  }
  return blocks;
}

async function parsePage(file) {
  const doc = new JSDOM(fs.readFileSync(file, "utf8")).window.document;
  const blocks = [];

  for (const el of doc.body.children) {
    if (el.tagName === "SCRIPT") continue;
    const cls = String(el.className ?? "");
    const first = cls.split(" ")[0];

    if (
      ["custom-code", "promo-bar", "hero-casestudy--section", "tag-viewport"].includes(first) ||
      first === "section-padding" // project list + footer
    ) {
      continue;
    }

    if (first === "creditgrid") {
      const creditItems = el.querySelectorAll(".creditgrid-item");
      if (creditItems.length) {
        const credits = [];
        for (const item of creditItems) {
          const label = item.querySelector(".overline")?.textContent.trim();
          const valueEl = item.querySelector(".creditgrid-list");
          const value = valueEl?.textContent.trim();
          const url = valueEl?.querySelector("a")?.getAttribute("href") ?? undefined;
          if (label || value) credits.push({ _type: "credit", _key: key(), label, value, url });
        }
        blocks.push({ _type: "creditGrid", _key: key(), credits });
      } else {
        blocks.push(...(await textSectionBlocks(el)));
      }
      continue;
    }

    if (first === "image-grid-3x3" || first === "image-fullviewport") {
      const items = await mediaItems(el);
      if (items.length) {
        blocks.push({
          _type: "mediaGrid",
          _key: key(),
          layout: first === "image-fullviewport" ? "fullViewport" : "grid",
          items,
        });
      }
      // grids occasionally carry inline text sections too
      blocks.push(...(await textSectionBlocks(el)));
      continue;
    }

    if (first === "video-wrapperwidth" || el.querySelector?.(":scope > .video-wrapperwidth")) {
      const items = await mediaItems(el);
      blocks.push(...items.filter((i) => i._type === "videoLoop"));
      continue;
    }

    if (first.startsWith("sitecompsection-")) {
      const variant = first.replace("sitecompsection-", "");
      const media = [];
      for (const img of el.querySelectorAll("img")) {
        const item = await imageItem(img);
        if (item) media.push({ ...item, rounded: undefined, width: undefined });
      }
      blocks.push({ _type: "siteCompSection", _key: key(), variant, media });
      continue;
    }

    console.warn("  ? unhandled section:", first || el.tagName);
  }
  return blocks;
}

// --- main --------------------------------------------------------------------
const projects = await client.fetch(
  `*[_type == "project"]{ _id, "slug": slug.current }`,
  {},
  { perspective: "raw" }
);
const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p._id]));

for (const file of fs.readdirSync(WORK_DIR).sort()) {
  const slug = file.replace(/\.html$/, "");
  const docId = bySlug[slug];
  if (!docId) {
    console.warn("no project doc for", slug);
    continue;
  }
  console.log("→", slug, `(${docId})`);
  const body = await parsePage(path.join(WORK_DIR, file));
  await client.patch(docId).set({ body }).commit();
  console.log(`  ✓ ${body.length} blocks`);
}
console.log("done");
