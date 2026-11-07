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
 * IX2 interaction ("Project Grid Hover", a-8/a-9) replicated with scoped
 * CSS below.
 *
 * The base `transform: scale3d(1,1,1)` on `.is-secondary` is load-bearing:
 * `.masked-image` inside it is `position: absolute; inset: 0` and the
 * wrapper is `position: static` in the ported CSS, so without a transform
 * the image's containing block is the viewport and it paints over the whole
 * page. On live, Webflow IX2 sets an inline transform on this node, which
 * creates the containing block; the scoped CSS reproduces that.
 * Hover-in: opacity 500ms outQuad, scale to 1.05 over 3s outQuad, arrow
 * button inverts instantly. Hover-out is instant (IX2 uses duration 0).
 */
const HOVER_CSS = `
.projectgrid-item .image-wrapper.img-border-radius.projectgrid-image.is-secondary { transform: scale3d(1, 1, 1); }
.projectgrid-item:hover .image-wrapper.img-border-radius.projectgrid-image.is-secondary {
  opacity: 1;
  transform: scale3d(1.05, 1.05, 1);
  transition: opacity .5s cubic-bezier(.25, .46, .45, .94), transform 3s cubic-bezier(.25, .46, .45, .94);
}
.projectgrid-item .projectlist-item-button { color: var(--content-muted); border-color: var(--content-muted); background-color: transparent; }
.projectgrid-item:hover .projectlist-item-button { color: var(--button-solid-fg); border-color: transparent; background-color: var(--button-solid-bg); }
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
                            decoding="async"
                            alt={project.title ?? ""}
                            src={urlFor(project.primaryThumbnail).width(1600).auto("format").url()}
                            srcSet={`${urlFor(project.primaryThumbnail).width(800).auto("format").url()} 800w, ${urlFor(project.primaryThumbnail).width(1600).auto("format").url()} 1600w`}
                            sizes="(max-width: 767px) 100vw, 50vw"
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
                            decoding="async"
                            alt=""
                            src={urlFor(project.secondaryThumbnail)
                              .width(1600)
                              .auto("format")
                              .url()}
                            srcSet={`${urlFor(project.secondaryThumbnail).width(800).auto("format").url()} 800w, ${urlFor(project.secondaryThumbnail).width(1600).auto("format").url()} 1600w`}
                            sizes="(max-width: 767px) 100vw, 50vw"
                            className="masked-image"
                          />
                        ) : null}
                      </div>
                    </div>
                    <div className="spacer-s"></div>
                    <div className="projectlist-item-details">
                      <div className="projectlist-item-description">
                        <div className="headline size-2xl textcolor-headline">{project.title}</div>
                        <div className="mono size-xs">{project.roles}</div>
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
