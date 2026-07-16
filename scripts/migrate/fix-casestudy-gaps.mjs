/**
 * One-off repair pass for gaps left by the original case-study migration:
 *
 *  1. creditGrid credit values lost their <br> separators (names ran
 *     together, e.g. "Erik BladBronwyn Gruet") → re-extract from the
 *     Webflow export with "\n" separators.
 *  2. videoLoop posters were never attached (the poster URL lives on the
 *     .w-background-video wrapper div, not the <video> element the importer
 *     read) → upload poster images and set them on every videoLoop.
 *  3. iframe embeds were skipped entirely:
 *       - delight-labs: full-width Vimeo ad  → top-level videoEmbed block
 *       - icon-snowskates: two YouTube videos in a 2-up → mediaGrid of
 *         videoEmbed items
 *
 * Idempotent: re-running produces the same document state.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createClient } from "@sanity/client";
import { JSDOM } from "jsdom";

const WORK_DIR =
  "/private/tmp/claude-501/-Users-mattplays-Documents-GitHub-mattplays-co--claude-worktrees-portfolio-sanity-rebuild-6507f7/265e4707-09cf-41e4-af95-9383ac85ebd8/scratchpad/webflow/work";
// The asset manifest + upload caches live in the primary worktree (untracked).
const MIGRATE_ROOT =
  "/Users/mattplays/Documents/GitHub/mattplays.co/.claude/worktrees/portfolio-sanity-rebuild-6507f7/scripts/migrate";

const envFile = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "..", ".env.local");
for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-07-15",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const manifest = JSON.parse(fs.readFileSync(path.join(MIGRATE_ROOT, "manifest.json"), "utf8"));
const imgCacheFile = path.join(MIGRATE_ROOT, ".assets", "upload-cache.json");
const imgCache = JSON.parse(fs.readFileSync(imgCacheFile, "utf8"));
const fileCache = JSON.parse(
  fs.readFileSync(path.join(MIGRATE_ROOT, ".assets", "file-upload-cache.json"), "utf8")
);

const key = () => crypto.randomBytes(6).toString("hex");
const normalizeCdnUrl = (url) =>
  url.replace(/-p-\d+(?:x\d+)?q?\d*\.(jpg|jpeg|png|webp|gif)$/i, ".$1");

async function uploadImageFor(k) {
  const localPath = manifest[k] ?? manifest[decodeURIComponent(k)];
  if (!localPath || !fs.existsSync(localPath)) return null;
  if (imgCache[localPath]) return imgCache[localPath];
  const asset = await client.assets.upload("image", fs.createReadStream(localPath), {
    filename: path.basename(localPath),
  });
  imgCache[localPath] = asset._id;
  fs.writeFileSync(imgCacheFile, JSON.stringify(imgCache, null, 1));
  return asset._id;
}

/** export mp4 src → uploaded file asset id (via manifest + file cache). */
function fileAssetIdFor(src) {
  const k = src.startsWith("http") ? src : "videos/" + src.replace(/^(\.\.\/)?videos\//, "");
  const localPath = manifest[k] ?? manifest[decodeURIComponent(k)];
  return (localPath && fileCache[localPath]) || null;
}

function posterKeyFor(url) {
  if (url.startsWith("http")) return normalizeCdnUrl(url);
  return "videos/" + url.replace(/^(\.\.\/)?videos\//, "");
}

const projects = await client.fetch(`*[_type == "project"]{ _id, "slug": slug.current, body }`);

for (const file of fs.readdirSync(WORK_DIR).sort()) {
  const slug = file.replace(/\.html$/, "");
  const proj = projects.find((p) => p.slug === slug);
  if (!proj) continue;
  const doc = new JSDOM(fs.readFileSync(path.join(WORK_DIR, file), "utf8")).window.document;
  const body = structuredClone(proj.body ?? []);
  let changed = false;

  // --- 1. credit values with newline separators -----------------------------
  const creditItems = [...doc.querySelectorAll(".creditgrid-item")];
  const exportCredits = creditItems.map((item) => {
    const label = item.querySelector(".overline")?.textContent.trim();
    const valueEl = item.querySelector(".creditgrid-list");
    let value;
    if (valueEl) {
      const clone = valueEl.cloneNode(true);
      clone.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
      value = clone.textContent.trim();
    }
    return { label, value };
  });
  const grid = body.find((b) => b._type === "creditGrid");
  if (grid?.credits?.length === exportCredits.length) {
    grid.credits.forEach((c, i) => {
      if (exportCredits[i].value && c.value !== exportCredits[i].value) {
        c.value = exportCredits[i].value;
        changed = true;
      }
    });
  } else if (grid) {
    console.warn(`  ! ${slug}: credit count mismatch`, grid.credits?.length, exportCredits.length);
  }

  // --- 2. posters on videoLoop blocks/items ---------------------------------
  const wrappers = [...doc.querySelectorAll("[data-video-urls]")];
  for (const w of wrappers) {
    const mp4 = (w.getAttribute("data-video-urls") ?? "").split(",").find((u) => u.includes(".mp4"));
    const posterUrl = w.getAttribute("data-poster-url");
    if (!mp4 || !posterUrl) continue;
    const videoRef = fileAssetIdFor(mp4);
    if (!videoRef) continue;
    const posterId = await uploadImageFor(posterKeyFor(posterUrl));
    if (!posterId) {
      console.warn(`  ! ${slug}: poster unresolved`, posterUrl);
      continue;
    }
    const attach = (loop) => {
      if (loop.video?.asset?._ref !== videoRef) return;
      if (loop.poster?.asset?._ref === posterId) return;
      loop.poster = { _type: "image", asset: { _type: "reference", _ref: posterId } };
      changed = true;
    };
    for (const block of body) {
      if (block._type === "videoLoop") attach(block);
      if (block._type === "mediaGrid")
        for (const item of block.items ?? []) if (item._type === "videoLoop") attach(item);
    }
  }

  // --- 3. missing iframe embeds ---------------------------------------------
  if (slug === "delight-labs" && !body.some((b) => b._type === "videoEmbed")) {
    const idx = body.findIndex((b) => b._type === "siteCompSection");
    body.splice(idx, 0, {
      _type: "videoEmbed",
      _key: key(),
      url: "https://player.vimeo.com/video/1116286616",
      aspectRatio: "16:9",
    });
    changed = true;
  }
  if (
    slug === "icon-snowskates" &&
    !body.some((b) => b._type === "mediaGrid" && b.items?.some((i) => i._type === "videoEmbed"))
  ) {
    const idx = body.findIndex((b) => b._type === "creditGrid");
    body.splice(idx, 0, {
      _type: "mediaGrid",
      _key: key(),
      layout: "grid",
      items: [
        {
          _type: "videoEmbed",
          _key: key(),
          url: "https://www.youtube.com/embed/WGaDbZTNGsE?rel=0&controls=1&autoplay=0&mute=0&start=0",
          aspectRatio: "16:9",
        },
        {
          _type: "videoEmbed",
          _key: key(),
          url: "https://www.youtube.com/embed/elhUM4IlQ3s?rel=0&controls=1&autoplay=0&mute=0&start=0",
          aspectRatio: "16:9",
        },
      ],
    });
    changed = true;
  }

  if (changed) {
    await client.patch(proj._id).set({ body }).commit();
    console.log(`✓ ${slug} patched`);
  } else {
    console.log(`- ${slug} ok`);
  }
}
console.log("done");
