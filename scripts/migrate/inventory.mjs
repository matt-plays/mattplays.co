/**
 * Asset inventory for the Webflow → Sanity migration.
 *
 * Scans the three CMS CSV exports and the exported case-study HTML for every
 * referenced asset, resolves each to a local file (Webflow zip export first,
 * live Webflow CDN as fallback), and writes manifest.json mapping
 * source URL/path → local file. Responsive derivatives (-p-500 etc.) are
 * skipped; Sanity generates its own.
 *
 * Usage: node scripts/migrate/inventory.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const ASSETS = path.join(ROOT, ".assets");
const CDN_DIR = path.join(ASSETS, "cdn");
const IMAGES_DIR = path.join(ASSETS, "images");
const DOWNLOADS = "/Users/mattplays/Downloads";
const SCRATCH_WEBFLOW =
  "/private/tmp/claude-501/-Users-mattplays-Documents-GitHub-mattplays-co--claude-worktrees-portfolio-sanity-rebuild-6507f7/265e4707-09cf-41e4-af95-9383ac85ebd8/scratchpad/webflow";

const CSVS = [
  "Portfolio - Changelog Updates - 652ec4400f93914b119d1194.csv",
  "Portfolio - Blog Posts - 652ec4400f93914b119d11b5.csv",
  "Portfolio - Projects - 652ec4400f93914b119d11e4.csv",
].map((f) => path.join(DOWNLOADS, f));

const CDN_RE =
  /https?:\/\/(?:uploads-ssl\.webflow\.com|cdn\.prod\.website-files\.com)\/[^\s"'<>,&\\]+/g;
// Webflow responsive derivative, e.g. Foo-p-500.jpg / Foo-p-1080.jpeg
const DERIVATIVE_RE = /-p-\d+(?:x\d+)?q?\d*\.(?:jpg|jpeg|png|webp|gif)$/i;

const found = new Set();

// 1. CSV bodies (CDN URLs)
for (const csv of CSVS) {
  const text = fs.readFileSync(csv, "utf8");
  for (const m of text.matchAll(CDN_RE)) found.add(m[0]);
}

// 2. Case-study + static page HTML (local ../images/ refs and CDN URLs)
const localRefs = new Set();
const htmlFiles = [];
for (const dir of ["", "work", "lp"]) {
  const full = path.join(SCRATCH_WEBFLOW, dir);
  for (const f of fs.readdirSync(full)) {
    if (f.endsWith(".html")) htmlFiles.push(path.join(full, f));
  }
}
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(CDN_RE)) found.add(m[0]);
  for (const m of html.matchAll(/(?:\.\.\/)?images\/[^\s"'<>,&\\]+/g)) {
    localRefs.add(m[0].replace(/^(\.\.\/)?images\//, ""));
  }
  for (const m of html.matchAll(/(?:\.\.\/)?videos\/[^\s"'<>,&\\]+/g)) {
    localRefs.add("videos/" + m[0].replace(/^(\.\.\/)?videos\//, ""));
  }
}

// Normalize + drop derivatives
const cdnUrls = [...found]
  .map((u) => u.replace(/\.+$/, ""))
  .filter((u) => !DERIVATIVE_RE.test(u));
const locals = [...localRefs].filter((f) => !DERIVATIVE_RE.test(f));

fs.mkdirSync(CDN_DIR, { recursive: true });

const manifest = {}; // key (url or local ref) -> local absolute path
const missing = [];

// Resolve local refs against extracted zip
for (const ref of locals) {
  const p = ref.startsWith("videos/")
    ? path.join(ASSETS, ref)
    : path.join(IMAGES_DIR, decodeURIComponent(ref));
  if (fs.existsSync(p)) manifest[ref] = p;
  else missing.push({ type: "local", ref });
}

// Resolve CDN urls: zip file first (strip 24-hex prefix), else download
function zipCandidate(url) {
  const name = decodeURIComponent(url.split("/").pop());
  const stripped = name.replace(/^[0-9a-f]{20,}_/, "");
  for (const candidate of [name, stripped]) {
    const p = path.join(IMAGES_DIR, candidate);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function download(url) {
  const name = decodeURIComponent(url.split("/").pop()).replace(/[^\w.\-]/g, "_");
  const dest = path.join(CDN_DIR, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return dest;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return dest;
}

const queue = [...new Set(cdnUrls)];
let downloaded = 0;
const CONCURRENCY = 8;
async function worker() {
  while (queue.length) {
    const url = queue.pop();
    const local = zipCandidate(url);
    if (local) {
      manifest[url] = local;
      continue;
    }
    try {
      manifest[url] = await download(url);
      downloaded++;
    } catch (e) {
      missing.push({ type: "cdn", ref: url, error: String(e) });
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

fs.writeFileSync(path.join(ROOT, "manifest.json"), JSON.stringify(manifest, null, 1));
console.log(`resolved: ${Object.keys(manifest).length}`);
console.log(`downloaded from CDN: ${downloaded}`);
console.log(`missing: ${missing.length}`);
for (const m of missing) console.log("  MISS", m.type, m.ref, m.error ?? "");
