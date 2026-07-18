/**
 * optimize-images.mjs — local image optimization for public/images.
 *
 * Pass 1: converts every PNG/JPG to a same-basename .webp (quality 82),
 *         resizing down to a per-file width cap first (2x the largest
 *         rendered width, so retina stays sharp). The .webp is only kept
 *         when it is >= 10% smaller than the original; originals stay on
 *         disk (they are only served if something still references them).
 * Pass 2: emits 800px-wide `-800.webp` variants for the heaviest homepage
 *         images so the markup can offer a srcset for small viewports.
 * Pass 3: re-encodes a short list of oversized existing .webp files in
 *         place (width-capped, q82) when that wins >= 20%.
 *
 * Skips svg/gif (animation + vectors) per policy. Run: npm run optimize
 */
import sharp from "sharp";
import { readdir, stat, rename, unlink } from "fs/promises";
import { join, extname, basename } from "path";

const DIR = new URL("../public/images", import.meta.url).pathname;
const QUALITY = 82;
const DEFAULT_CAP = Infinity; // don't resize unless listed below

// Max output width (px) — ~2x the largest CSS-rendered width on the site.
const WIDTH_CAPS = {
  "RockDove-CaseStudy-01.jpg": 2560, // 4800px source, renders ~1250px max
  "Personal-WoodStreet-Office-5442.jpg": 2000, // 3200px source
  "Personal-WoodStreet-Office-5505.jpg": 2000, // 3200px source
  "HelpScout-PrimaryVisual.jpg": 1920, // 2400px source, renders ~830px
  "newenglandbrew-6pack.png": 2000, // 2116px source
  "platform-hero-visual.png": 2000, // 2160px source (hero-sketch page)
};

// Homepage heavyweights that get an additional 800w srcset variant.
const RESPONSIVE_VARIANTS = [
  "7hw-jersey",
  "RockDove-CaseStudy-01",
  "newenglandbrew-6pack",
  "ITW-Intro-07",
  "burton-17ss-cover", // already webp; variant generated from it
  "itw-tuckermancollage", // already webp
];
const VARIANT_WIDTH = 800;

// Sources whose .webp sibling already ships hand-made — never overwrite it.
const PRE_EXISTING_WEBP = new Set(["itw-issue-collage.jpg"]);

// Existing .webp files that shipped far larger than their rendered size.
const RECOMPRESS_WEBP = {
  "Info-Photo-02.webp": 2000, // 3200px source (info page)
  "Info-Photo-03.webp": 2000, // 2560px source (info page)
  "Info-PhotoGrid-01.webp": 1506, // dims fine; re-encode only
};

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;

async function encode(input, output, cap) {
  let img = sharp(input);
  const meta = await img.metadata();
  if (cap && meta.width > cap) img = img.resize({ width: cap });
  await img.webp({ quality: QUALITY, effort: 6 }).toFile(output);
  return (await stat(output)).size;
}

async function main() {
  const files = (await readdir(DIR)).filter((f) =>
    [".png", ".jpg", ".jpeg"].includes(extname(f).toLowerCase())
  );

  console.log("Pass 1: PNG/JPG -> WebP\n");
  let before = 0;
  let after = 0;
  const converted = [];
  for (const file of files.sort()) {
    if (PRE_EXISTING_WEBP.has(file)) {
      console.log(`  skip ${file} (hand-made .webp sibling exists)`);
      continue;
    }
    const src = join(DIR, file);
    const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
    const srcSize = (await stat(src)).size;
    const cap = WIDTH_CAPS[file] ?? DEFAULT_CAP;
    const outSize = await encode(src, out, cap);
    if (outSize > srcSize * 0.9) {
      await unlink(out);
      console.log(`  skip ${file} (${kb(srcSize)} -> ${kb(outSize)}, not worth it)`);
      continue;
    }
    before += srcSize;
    after += outSize;
    converted.push(file);
    console.log(`  ${file}: ${kb(srcSize)} -> ${kb(outSize)}`);
  }
  console.log(`\n  converted ${converted.length}/${files.length}: ${kb(before)} -> ${kb(after)} (saved ${kb(before - after)})`);

  console.log("\nPass 2: 800w responsive variants\n");
  for (const name of RESPONSIVE_VARIANTS) {
    const src = join(DIR, `${name}.webp`);
    const out = join(DIR, `${name}-800.webp`);
    const size = await encode(src, out, VARIANT_WIDTH);
    console.log(`  ${basename(out)}: ${kb(size)}`);
  }

  console.log("\nPass 3: re-encode oversized WebP in place\n");
  for (const [file, cap] of Object.entries(RECOMPRESS_WEBP)) {
    const src = join(DIR, file);
    const tmp = join(DIR, `.${file}.tmp.webp`);
    const srcSize = (await stat(src)).size;
    const outSize = await encode(src, tmp, cap);
    if (outSize > srcSize * 0.8) {
      await unlink(tmp);
      console.log(`  skip ${file} (${kb(srcSize)} -> ${kb(outSize)})`);
      continue;
    }
    await rename(tmp, src);
    console.log(`  ${file}: ${kb(srcSize)} -> ${kb(outSize)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
