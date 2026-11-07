import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/blocks";
import type { ProjectCard, ProjectDetail } from "@/components/blocks/types";
import ProjectList from "@/components/ProjectList";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { allProjectsQuery, projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(projectSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await sanityFetch<ProjectDetail | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ["project"],
  });
  if (!project) return {};
  // Exported pages title the tab with just the project name (og/twitter match).
  return {
    title: { absolute: project.title ?? "Work" },
    description: project.description ?? undefined,
    openGraph: {
      title: project.title ?? undefined,
      description: project.description ?? undefined,
      images: project.heroVisual
        ? [{ url: urlFor(project.heroVisual).width(1200).height(630).auto("format").url() }]
        : undefined,
    },
    twitter: { title: project.title ?? undefined },
  };
}

/** Only allow safe CSS color values into the inline styles / style tag. */
function safeColor(color?: string | null) {
  if (!color) return undefined;
  return /^[#a-zA-Z0-9(),.%\s-]+$/.test(color) ? color.trim() : undefined;
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([
    sanityFetch<ProjectDetail | null>({
      query: projectBySlugQuery,
      params: { slug },
      tags: ["project"],
    }),
    sanityFetch<ProjectCard[]>({ query: allProjectsQuery, tags: ["project"] }),
  ]);
  if (!project) notFound();

  const color = safeColor(project.color);
  // The hero paints as a CSS background capped at 1920px wide (56.25% tall),
  // so 2000px covers it; the old 3200px request shipped ~2x the bytes.
  const heroImage = project.heroVisual
    ? urlFor(project.heroVisual).width(2000).auto("format").url()
    : undefined;

  return (
    <main>
      {/* Background images aren't discovered until CSSOM builds; preload the
          above-fold hero so it starts alongside the document. */}
      {heroImage ? (
        <link rel="preload" as="image" href={heroImage} fetchPriority="high" />
      ) : null}
      {/* On the live site the nav sits inside a project-colored
          .hero-casestudy--nav-background wrapper; here the nav is global
          chrome, so this route-scoped style paints it instead. */}
      {color ? (
        <style
          dangerouslySetInnerHTML={{
            __html: `.navigation.hero-casestudy--nav { background-color: ${color}; }`,
          }}
        />
      ) : null}
      <div className="hero-casestudy--section">
        <div className="w-dyn-list">
          <div role="list" className="w-dyn-items">
            <div role="listitem" className="w-dyn-item">
              <div
                className="hero-casestudy"
                style={color ? { backgroundColor: color } : undefined}
              >
                <div
                  className="casestudy__hero-visual"
                  style={heroImage ? { backgroundImage: `url("${heroImage}")` } : undefined}
                ></div>
                <div className="casestudy__hero-textsection">
                  <div className="w-layout-grid casestudy__hero-textsection-grid">
                    <p
                      id="w-node-_6951c566-3ce0-8811-6609-a8743abc53e5-b2d8fe30"
                      className="mono size-base"
                    >
                      Project
                    </p>
                    <h1
                      id="w-node-_6951c566-3ce0-8811-6609-a8743abc53e7-b2d8fe30"
                      className="size-8xl headline"
                    >
                      {project.title}
                    </h1>
                    <div
                      id="w-node-_6951c566-3ce0-8811-6609-a8743abc53e8-b2d8fe30"
                      className="hr"
                    ></div>
                    <div
                      id="w-node-_6951c566-3ce0-8811-6609-a8743abc53e9-b2d8fe30"
                      className="casestudy__hero-detailgrid"
                    >
                      <p
                        id="w-node-_6951c566-3ce0-8811-6609-a8743abc53ea-b2d8fe30"
                        className="text size-2xl"
                      >
                        {project.description}
                      </p>
                      <p
                        id="w-node-_6951c566-3ce0-8811-6609-a8743abc53eb-b2d8fe30"
                        className="mono size-xs align-right"
                      >
                        {project.roles}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="spacer-xl"></div>
            </div>
          </div>
        </div>
      </div>
      <BlockRenderer blocks={project.body} />
      <ProjectList projects={projects} currentSlug={slug} />
    </main>
  );
}
