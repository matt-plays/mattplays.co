import type { Metadata } from "next";
import Link from "next/link";
import type { ProjectCard } from "@/components/blocks/types";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProjectsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Work",
  openGraph: { title: "Work" },
  twitter: { title: "Work" },
};

/**
 * Work index — mirrors the exported work.html: "Select Work" headline and
 * the two-column project grid. Each card stacks a primary and secondary
 * thumbnail in the same grid cell (`w-node` ids drive placement in the
 * ported CSS); the secondary crossfades in on hover, which was a Webflow
 * IX2 interaction and is replicated with scoped CSS below.
 */
const HOVER_CSS = `
.projectgrid-item .image-wrapper.img-border-radius.projectgrid-image.is-secondary { transition: opacity .3s ease; }
.projectgrid-item:hover .image-wrapper.img-border-radius.projectgrid-image.is-secondary { opacity: 1; }
`;

export default async function WorkPage() {
  const projects = await sanityFetch<ProjectCard[]>({
    query: allProjectsQuery,
    tags: ["project"],
  });

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: HOVER_CSS }} />
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="spacer-xl"></div>
          <h1 className="size-5xl">Select Work</h1>
          <div className="spacer-2xl"></div>
        </div>
      </div>
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="collectionlistwrapper is-grid w-dyn-list">
            <div role="list" className="collectionlist is-grid w-dyn-items">
              {projects.map((project) => (
                <div
                  key={project._id}
                  id="w-node-_47bab917-9445-42b1-2aff-d2de39b2f4d6-39b2f4d2"
                  role="listitem"
                  className="collectionitem isgrid w-dyn-item"
                >
                  <Link href={`/work/${project.slug}`} className="projectgrid-item w-inline-block">
                    <div className="projectgrid-item-image">
                      <div
                        id="w-node-_47bab917-9445-42b1-2aff-d2de39b2f4d9-39b2f4d2"
                        className="image-wrapper img-border-radius projectgrid-image is-primary"
                      >
                        {project.primaryThumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            loading="lazy"
                            alt={project.title ?? ""}
                            src={urlFor(project.primaryThumbnail).width(1600).auto("format").url()}
                            className="masked-image"
                          />
                        ) : null}
                      </div>
                      <div
                        id="w-node-_47bab917-9445-42b1-2aff-d2de39b2f4db-39b2f4d2"
                        className="image-wrapper img-border-radius projectgrid-image is-secondary"
                      >
                        {project.secondaryThumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            loading="lazy"
                            alt=""
                            src={urlFor(project.secondaryThumbnail)
                              .width(1600)
                              .auto("format")
                              .url()}
                            className="masked-image"
                          />
                        ) : null}
                      </div>
                    </div>
                    <div className="spacer-s"></div>
                    <div className="projectlist-item-details">
                      <div className="projectlist-item-description">
                        <div className="headline size-2xl textcolor-headline">{project.title}</div>
                        <div className="detail size-xs">{project.roles}</div>
                      </div>
                      <div className="projectlist-item-button">
                        <div className="text size-xl">↗</div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
