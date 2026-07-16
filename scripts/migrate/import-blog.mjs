import { client, uploadImageFor, normalizeCdnUrl } from "./lib/sanity.mjs";
import { readCsv, parseWebflowDate } from "./lib/csv.mjs";
import { htmlToPT, resolveImages } from "./lib/pt.mjs";

const rows = readCsv(
  "/Users/mattplays/Downloads/Portfolio - Blog Posts - 652ec4400f93914b119d11b5.csv"
);

let n = 0;
for (const row of rows) {
  const id = `blogPost-${row["Item ID"]}`;
  const body = await resolveImages(htmlToPT(row["Post Body"]), {
    uploadImageFor,
    normalizeCdnUrl,
  });

  const doc = {
    _id: row["Draft"] === "true" ? `drafts.${id}` : id,
    _type: "blogPost",
    title: row["Name"],
    slug: { _type: "slug", current: row["Slug"] },
    date: parseWebflowDate(row["Date"]),
    summary: row["Post Summary"] || undefined,
    featured: row["Featured?"] === "true",
    color: row["Color"] || undefined,
    body,
  };

  for (const [csvField, docField] of [
    ["Main Image", "mainImage"],
    ["Thumbnail image", "thumbnail"],
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
  n++;
  console.log(`✓ (${n}/${rows.length})`, doc.title);
}
console.log(`imported ${n} blog posts`);
