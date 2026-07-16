/**
 * Visual diff harness: screenshots every route on the local rebuild and the
 * production Webflow site, pixel-diffs them, and writes an HTML report.
 *
 * JavaScript runs on BOTH sides (the live site hides heroes/sections until
 * webflow.js reveals them, so JS-off blanks production). A full scroll pass
 * triggers scroll-reveal animations and lazy images; videos are paused at
 * frame 0 for determinism; images are downscaled 2x before diffing to damp
 * CDN re-compression noise.
 *
 * Usage: node scripts/visual-diff/run.mjs [routeFilter]
 * Output: scripts/visual-diff/out/report.html (+ per-route PNGs)
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const LOCAL = "http://localhost:3000";
const PROD = "https://mattplays.co";
const OUT = path.join(path.dirname(new URL(import.meta.url).pathname), "out");
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  "/",
  "/work",
  "/work/rock-dove",
  "/work/delight-labs",
  "/work/help-scout-brand-evolution",
  "/work/in-the-works",
  "/work/help-scout-microbrands",
  "/work/epicurrence",
  "/work/acadia-type-hike",
  "/work/burton-seasonal-identities",
  "/work/burton-web-design",
  "/work/burton-campaigns",
  "/work/icon-snowskates",
  "/work/the-island-of-misfit-work",
  "/changelog",
  "/info",
  "/style-guide",
  "/shop",
  "/lp/creative-south-2025",
];

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 375, height: 812 },
];

const filter = process.argv[2];
const routes = filter ? ROUTES.filter((r) => r.includes(filter)) : ROUTES;

const browser = await chromium.launch();

async function capture(base, route, viewport, tag) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    javaScriptEnabled: true,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(base + route, { waitUntil: "networkidle", timeout: 60000 });
  // force lazy images: with JS off, loading=lazy images still load when
  // scrolled into view — walk the page height.
  const height = await page.evaluate(() => document.body.scrollHeight).catch(() => 0);
  for (let y = 0; y < height; y += viewport.height) {
    await page.mouse.wheel(0, viewport.height);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll("video").forEach((v) => {
      v.pause();
      try { v.currentTime = 0; } catch {}
    });
  }).catch(() => {});
  await page.waitForTimeout(500);
  const file = path.join(
    OUT,
    `${tag}-${viewport.name}${route.replace(/\//g, "_") || "_home"}.png`
  );
  await page.screenshot({ path: file, fullPage: true });
  await context.close();
  return file;
}

function downscale(img) {
  const w = Math.floor(img.width / 2), h = Math.floor(img.height / 2);
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      for (let c = 0; c < 4; c++) {
        const i = (y * w + x) * 4 + c;
        const s0 = ((y * 2) * img.width + x * 2) * 4 + c;
        const s1 = ((y * 2) * img.width + x * 2 + 1) * 4 + c;
        const s2 = ((y * 2 + 1) * img.width + x * 2) * 4 + c;
        const s3 = ((y * 2 + 1) * img.width + x * 2 + 1) * 4 + c;
        out.data[i] = (img.data[s0] + img.data[s1] + img.data[s2] + img.data[s3]) >> 2;
      }
  return out;
}

function diffImages(fileA, fileB, outFile) {
  const a = downscale(PNG.sync.read(fs.readFileSync(fileA)));
  const b = downscale(PNG.sync.read(fs.readFileSync(fileB)));
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);
  const cropped = (img) => {
    const out = new PNG({ width, height });
    PNG.bitblt(img, out, 0, 0, width, height, 0, 0);
    return out;
  };
  const ca = cropped(a);
  const cb = cropped(b);
  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(ca.data, cb.data, diff.data, width, height, {
    threshold: 0.2,
  });
  fs.writeFileSync(outFile, PNG.sync.write(diff));
  return {
    pct: ((mismatched / (width * height)) * 100).toFixed(2),
    heightDelta: Math.abs(a.height - b.height) * 2,
    localHeight: a.height * 2,
    prodHeight: b.height * 2,
  };
}

const results = [];
for (const route of routes) {
  for (const viewport of VIEWPORTS) {
    process.stdout.write(`${route} @${viewport.name} ... `);
    try {
      const local = await capture(LOCAL, route, viewport, "local");
      const prod = await capture(PROD, route, viewport, "prod");
      const diffFile = path.join(
        OUT,
        `diff-${viewport.name}${route.replace(/\//g, "_") || "_home"}.png`
      );
      const r = diffImages(local, prod, diffFile);
      results.push({ route, viewport: viewport.name, ...r, local, prod, diffFile });
      console.log(`${r.pct}% diff, height Δ${r.heightDelta}px`);
    } catch (e) {
      results.push({ route, viewport: viewport.name, error: String(e).slice(0, 200) });
      console.log("ERROR", String(e).slice(0, 120));
    }
  }
}
await browser.close();

results.sort((x, y) => parseFloat(y.pct ?? 100) - parseFloat(x.pct ?? 100));
const rows = results
  .map((r) =>
    r.error
      ? `<tr><td>${r.route}</td><td>${r.viewport}</td><td colspan="3">ERROR: ${r.error}</td></tr>`
      : `<tr>
          <td>${r.route}</td><td>${r.viewport}</td>
          <td>${r.pct}%</td><td>${r.heightDelta}px (${r.localHeight} vs ${r.prodHeight})</td>
          <td>
            <details><summary>view</summary>
              <div style="display:flex;gap:4px">
                <figure><figcaption>local</figcaption><img src="${path.basename(r.local)}" style="max-width:420px"></figure>
                <figure><figcaption>prod</figcaption><img src="${path.basename(r.prod)}" style="max-width:420px"></figure>
                <figure><figcaption>diff</figcaption><img src="${path.basename(r.diffFile)}" style="max-width:420px"></figure>
              </div>
            </details>
          </td>
        </tr>`
  )
  .join("\n");

fs.writeFileSync(
  path.join(OUT, "report.html"),
  `<!doctype html><meta charset="utf-8"><title>Visual diff report</title>
   <style>body{font:14px system-ui;margin:2rem}table{border-collapse:collapse}td,th{border:1px solid #ddd;padding:6px 10px;text-align:left;vertical-align:top}</style>
   <h1>mattplays.co rebuild vs production</h1>
   <p>${new Date().toISOString()} — sorted worst-first. JS enabled on both sides; videos paused; 2x downscale before diff.</p>
   <table><tr><th>route</th><th>viewport</th><th>pixel diff</th><th>height Δ</th><th>images</th></tr>${rows}</table>`
);
console.log(`\nreport: ${path.join(OUT, "report.html")}`);
