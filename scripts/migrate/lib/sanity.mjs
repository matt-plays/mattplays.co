import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), "..");

// Read env from .env.local (scripts run outside Next)
const envFile = path.join(ROOT, "..", "..", ".env.local");
for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-07-15",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "manifest.json"), "utf8")
);

const CACHE_FILE = path.join(ROOT, ".assets", "upload-cache.json");
const uploadCache = fs.existsSync(CACHE_FILE)
  ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"))
  : {};

function saveCache() {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(uploadCache, null, 1));
}

/**
 * Upload a local file (resolved via manifest key: CDN URL or local ref) as a
 * Sanity image asset. Cached so reruns are idempotent.
 * Returns the asset _id, or null if the key can't be resolved.
 */
export async function uploadImageFor(key) {
  const localPath = manifest[key] ?? manifest[decodeURIComponent(key)];
  if (!localPath || !fs.existsSync(localPath)) return null;
  if (uploadCache[localPath]) return uploadCache[localPath];
  const asset = await client.assets.upload("image", fs.createReadStream(localPath), {
    filename: path.basename(localPath),
  });
  uploadCache[localPath] = asset._id;
  saveCache();
  return asset._id;
}

/** Resolve a CDN URL that might be a -p-NNN derivative back to its original. */
export function normalizeCdnUrl(url) {
  return url.replace(/-p-\d+(?:x\d+)?q?\d*\.(jpg|jpeg|png|webp|gif)$/i, ".$1");
}
