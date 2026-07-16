import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allChangelogQuery } from "@/sanity/lib/queries";
import type { ChangelogEntry } from "@/sanity/lib/types";

// Statically generated; revalidated by the Sanity webhook via the
// "changelogEntry" tag on the fetch below.
export const dynamic = "force-static";

const SITE_URL = "https://mattplays.co";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Flatten Portable Text into a plain-text description. */
function portableTextToPlainText(blocks: PortableTextBlock[]): string {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !Array.isArray(block.children)) return "";
      return block.children
        .map((child) => (typeof child.text === "string" ? child.text : ""))
        .join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

export async function GET() {
  const entries = await sanityFetch<ChangelogEntry[]>({
    query: allChangelogQuery,
    tags: ["changelogEntry"],
  });

  const items = entries
    .map((entry) => {
      const pubDate = entry.date
        ? new Date(`${entry.date}T00:00:00Z`).toUTCString()
        : "";
      const description = entry.body?.length
        ? portableTextToPlainText(entry.body)
        : "";
      return `    <item>
      <title>${escapeXml(entry.title ?? "")}</title>
      <link>${SITE_URL}/changelog${entry.slug ? `#${entry.slug}` : ""}</link>
      <guid isPermaLink="false">mattplays.co/changelog#${entry.slug ?? entry._id}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Matt Plays × Design — Changelog</title>
    <link>${SITE_URL}/changelog</link>
    <description>Updates from the ongoing build of mattplays.co</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
