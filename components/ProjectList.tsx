import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { ProjectCard } from "@/components/blocks/types";

/**
 * The ordered project list that closes every case study (Webflow's
 * `.collectionlist.is-list`). The live site renders all projects, current one
 * included. Hover reveals were Webflow IX2 interactions ("Project List
 * Hover", a-12/a-13) replicated with scoped CSS:
 *   - the project-colored triangle at the left is ALWAYS visible (IX2 never
 *     touches its opacity),
 *   - the accent rule expands 0 → 91px,
 *   - the hovercard fades in,
 *   - the description text darkens and the arrow button inverts.
 * All at 250ms ease-out, matching the IX2 durations. `w-node` ids are
 * preserved for the ported grid-placement CSS.
 */

const HOVER_CSS = `
.collectionlist.is-list .projectlist-hovercard.elevation-m { opacity: 0; transition: opacity .25s ease-out; }
.collectionlist.is-list .link-block:hover .projectlist-hovercard.elevation-m { opacity: 1; }
.collectionlist.is-list .projectlist-hoverrule { width: 0; transition: width .25s ease-out; }
.collectionlist.is-list .link-block:hover .projectlist-hoverrule { width: 91px; }
.collectionlist.is-list .projectgrid-item-description { color: rgb(106, 111, 113); transition: color .25s ease-out; }
.collectionlist.is-list .link-block:hover .projectgrid-item-description { color: rgb(19, 31, 37); }
.collectionlist.is-list .projectlist-item-button { border-color: rgb(106, 111, 113); background-color: transparent; transition: background-color .25s ease-out, border-color .25s ease-out; }
.collectionlist.is-list .link-block:hover .projectlist-item-button { border-color: transparent; background-color: rgb(19, 31, 37); }
.collectionlist.is-list .projectlist-item-buttonarrow { color: rgb(106, 111, 113); transition: color .25s ease-out; }
.collectionlist.is-list .link-block:hover .projectlist-item-buttonarrow { color: rgb(245, 242, 239); }
`;

function Triangle() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.5 7.13397C14.1667 7.51887 14.1667 8.48112 13.5 8.86602L1.5 15.7942C0.833333 16.1791 -7.73604e-07 15.698 -7.39955e-07 14.9282L-1.34273e-07 1.0718C-1.00623e-07 0.301996 0.833333 -0.17913 1.5 0.20577L13.5 7.13397Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ProjectList({
  projects,
  currentSlug,
}: {
  projects: ProjectCard[];
  currentSlug?: string;
}) {
  return (
    <div className="section-padding">
      <div className="container-width w-container">
        <style dangerouslySetInnerHTML={{ __html: HOVER_CSS }} />
        <div className="collectionlistwrapper is-list w-dyn-list">
          <div role="list" className="collectionlist is-list w-dyn-items">
            {projects.map((project) => (
              <div
                key={project._id}
                id="w-node-_9cba2268-2fec-28ce-38b7-0d6298a9b775-98a9b771"
                role="listitem"
                className="collectionitem is-list w-dyn-item"
              >
                <Link
                  href={`/work/${project.slug}`}
                  aria-current={project.slug === currentSlug ? "page" : undefined}
                  className="link-block w-inline-block"
                >
                  <div className="projectlist-item">
                    <div className="grid-globalgrid isprojectlist">
                      <div
                        id="w-node-_7d222553-fc4d-99e9-2010-29c082e265a3-98a9b771"
                        className="projectlist-accent"
                      >
                        <div className="projectlist-hoverrule"></div>
                        <div
                          style={project.color ? { color: project.color } : undefined}
                          className="projectlist-triangle w-embed"
                        >
                          <Triangle />
                        </div>
                      </div>
                      <div
                        id="w-node-_9cba2268-2fec-28ce-38b7-0d6298a9b77a-98a9b771"
                        className="projectlist-item-details"
                      >
                        <div className="projectgrid-item-description">
                          <div
                            id="w-node-_9cba2268-2fec-28ce-38b7-0d6298a9b77c-98a9b771"
                            className="headline size-3xl textcolor-headline"
                          >
                            {project.title}
                          </div>
                          <div className="detail size-xs">{project.roles}</div>
                        </div>
                      </div>
                      <div
                        id="w-node-_9cba2268-2fec-28ce-38b7-0d6298a9b77e-98a9b771"
                        className="projectlist-item-button"
                      >
                        <div className="text size-xl projectlist-item-buttonarrow">↗</div>
                      </div>
                    </div>
                    <div
                      style={project.color ? { backgroundColor: project.color } : undefined}
                      className="projectlist-hovercard elevation-m"
                    >
                      <div className="projectlist-thumb-container">
                        {project.primaryThumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={urlFor(project.primaryThumbnail).width(1200).auto("format").url()}
                            loading="lazy"
                            alt=""
                            className="projectlist-thumb"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
