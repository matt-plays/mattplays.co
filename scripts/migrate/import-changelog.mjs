import { client, uploadImageFor, normalizeCdnUrl } from "./lib/sanity.mjs";
import { readCsv, parseWebflowDate } from "./lib/csv.mjs";
import { htmlToPT, resolveImages } from "./lib/pt.mjs";

const rows = readCsv(
  "/Users/mattplays/Downloads/Portfolio - Changelog Updates - 652ec4400f93914b119d1194.csv"
);

for (const row of rows) {
  const id = `changelogEntry-${row["Item ID"]}`;
  const body = await resolveImages(htmlToPT(row["Update"]), {
    uploadImageFor,
    normalizeCdnUrl,
  });

  const doc = {
    _id: row["Draft"] === "true" ? `drafts.${id}` : id,
    _type: "changelogEntry",
    title: row["Name"],
    slug: { _type: "slug", current: row["Slug"] },
    date: parseWebflowDate(row["Date"]),
    body,
  };

  const imageUrl = row["Image"] && normalizeCdnUrl(row["Image"].trim());
  if (imageUrl) {
    const assetId = await uploadImageFor(imageUrl);
    if (assetId) {
      doc.image = { _type: "image", asset: { _type: "reference", _ref: assetId } };
    } else {
      console.warn("  ! image unresolved:", imageUrl);
    }
  }

  await client.createOrReplace(doc);
  console.log("✓", doc.title);
}
console.log(`imported ${rows.length} changelog entries`);
