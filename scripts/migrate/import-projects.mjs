import { client, uploadImageFor, normalizeCdnUrl } from "./lib/sanity.mjs";
import { readCsv } from "./lib/csv.mjs";

const rows = readCsv(
  "/Users/mattplays/Downloads/Portfolio - Projects - 652ec4400f93914b119d11e4.csv"
);

for (const row of rows) {
  const id = `project-${row["Item ID"]}`;
  const doc = {
    _id: row["Draft"] === "true" ? `drafts.${id}` : id,
    _type: "project",
    title: row["Name"],
    slug: { _type: "slug", current: row["Slug"] },
    description: row["Description"] || undefined,
    roles: row["Fields"] || undefined,
    color: row["Project Color"] || undefined,
    order: row["Project Order"] ? Number(row["Project Order"]) : undefined,
  };

  for (const [csvField, docField] of [
    ["Hero Visual", "heroVisual"],
    ["Primary Thumbnail", "primaryThumbnail"],
    ["Secondary Thumbnail", "secondaryThumbnail"],
  ]) {
    const url = row[csvField] && normalizeCdnUrl(row[csvField].trim());
    if (!url) continue;
    const assetId = await uploadImageFor(url);
    if (assetId) {
      doc[docField] = { _type: "image", asset: { _type: "reference", _ref: assetId } };
    } else {
      console.warn("  !", docField, "unresolved:", url);
    }
  }

  await client.createOrReplace(doc);
  console.log("✓", doc.title, row["Draft"] === "true" ? "(draft)" : "");
}
console.log(`imported ${rows.length} projects`);
