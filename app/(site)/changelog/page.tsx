import type { Metadata } from "next";
import RichText from "@/components/RichText";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { allChangelogQuery } from "@/sanity/lib/queries";
import type { ChangelogEntry } from "@/sanity/lib/types";

// Matches the exported changelog.html <title>; the export carries no meta
// description, so the inherited one is cleared to mirror it exactly.
export const metadata: Metadata = {
  title: "Changelog",
  description: null,
};

/** "2025-01-27" -> "January 27, 2025" (the format the live site renders). */
function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function ChangelogPage() {
  const entries = await sanityFetch<ChangelogEntry[]>({
    query: allChangelogQuery,
    tags: ["changelogEntry"],
  });

  return (
    <>
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="spacer-xl"></div>
          <h1 className="size-5xl">Changelog</h1>
          <div className="spacer-2xl"></div>
        </div>
      </div>
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="w-dyn-list">
            {entries.length > 0 ? (
              <div role="list" className="changelog-list w-dyn-items">
                {entries.map((entry) => (
                  <div
                    key={entry._id}
                    role="listitem"
                    // id makes the entry a target for /changelog#<slug> (RSS guids)
                    id={entry.slug ?? undefined}
                    className="changelog-item w-dyn-item"
                  >
                    <div className="grid-globalgrid ischangelog">
                      <div
                        id="w-node-d3ad3ced-d57b-921c-c14a-b6d2dacbd802-119d1169"
                        className="changelog-heading-section"
                      >
                        <h4 className="changelog-headline size-2xl">{entry.title}</h4>
                        <div className="spacer-xs"></div>
                        <div className="text-block size-xs ischangelog">
                          {entry.date ? formatDate(entry.date) : null}
                        </div>
                      </div>
                      <div
                        id="w-node-_5ce19e2c-1f94-2161-6530-8b29b72a4677-119d1169"
                        className="changelog-content"
                      >
                        {entry.image?.asset ? (
                          <div
                            id="w-node-b7f26769-3809-28fc-a1f8-a81228f53124-119d1169"
                            className="image-wrapper ischangelog"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              alt={entry.image.alt ?? ""}
                              loading="lazy"
                              decoding="async"
                              width="1280"
                              src={urlFor(entry.image).width(1280).auto("format").url()}
                              srcSet={`${urlFor(entry.image).width(640).auto("format").url()} 640w, ${urlFor(entry.image).width(1280).auto("format").url()} 1280w`}
                              sizes="(max-width: 767px) 100vw, 60vw"
                              className="changelog-image img-border-radius"
                            />
                          </div>
                        ) : null}
                        {entry.body?.length ? (
                          <div
                            id="w-node-_14615c37-1e22-3847-4a9d-52e5b1860d71-119d1169"
                            className="changelog-rte w-richtext"
                          >
                            <RichText value={entry.body} />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-dyn-empty">
                <div>No items found.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
