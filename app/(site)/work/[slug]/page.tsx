import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlockRenderer from "@/components/blocks";
import CaseStudyHero from "@/components/CaseStudyHero";
import type { ProjectCard, ProjectDetail } from "@/components/blocks/types";
import ProjectList from "@/components/ProjectList";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { inkOnBrandSurface } from "@/lib/brandSurface";
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
  // The hero surface does not flip with the mode, so neither can its ink.
  const brandInk = inkOnBrandSurface(color);
  /*
   * The 2026 hero floats the project's primary thumbnail in the middle of the
   * screen and opens it out to fill the viewport, so it is requested at a
   * size that holds up full-screen rather than at the old 1920-wide cap.
   * heroVisual is the fallback for projects that have no thumbnail set.
   */
  const heroSource = project.primaryThumbnail ?? project.heroVisual;
  const heroImage = heroSource
    ? urlFor(heroSource).width(2400).auto("format").url()
    : undefined;

  return (
    <main>
      {/* Background images aren't discovered until CSSOM builds; preload the
          above-fold hero so it starts alongside the document. */}
      {heroImage ? (
        <link rel="preload" as="image" href={heroImage} fetchPriority="high" />
      ) : null}
      {/*
        The 2026 hero puts the nav inside the section, over the project's
        colour, with no background of its own.

        Two things make that work, and both are route-scoped because the nav
        is global chrome. It is taken out of the flow, so the hero starts at
        the top of the screen instead of below the nav and its image can open
        to a genuinely full viewport. And `top` is deliberately left alone:
        an absolutely positioned box with `top: auto` stays at its static
        position, which is wherever the nav would have been anyway -- below
        the promo bar if that is ever switched back on. Pinning it to `top: 0`
        would have assumed the nav starts at the top of the page.

        Setting --ink-on-brand here is what carries the nav's contents,
        including the theme toggle, onto the brand colour: the readers in
        components.css pick it up on their own. Only the two hover/press
        tints have to be repeated, because theme.css can re-point them for
        the fixed surfaces it knows by class, and the nav is not one of them
        -- .hero-casestudy--nav is on the nav site-wide and only painted on
        this route.

        The fallback on the descendant rule is not decoration: below 992px
        the collapsed nav panel paints its own flipping surface and clears
        --ink-on-brand, and these links sit inside it.
      */}
      {color ? (
        <style
          dangerouslySetInnerHTML={{
            __html:
              `.navigation.hero-casestudy--nav {\n                 position: absolute;\n                 left: 0;\n                 right: 0;\n                 z-index: 5;\n                 background-color: transparent;\n                 --ink-on-brand: ${brandInk};\n                 --button-outline-bg-hover: color-mix(in srgb, ${brandInk} 10%, transparent);\n                 --button-outline-bg-active: color-mix(in srgb, ${brandInk} 16%, transparent);\n                 color: var(--ink-on-brand);\n               }\n               .navigation.hero-casestudy--nav .nav-link,\n               .navigation.hero-casestudy--nav .mono,\n               .navigation.hero-casestudy--nav .text {\n                 color: var(--ink-on-brand, var(--content-primary));\n               }`,
          }}
        />
      ) : null}
      <CaseStudyHero
        title={project.title ?? "Work"}
        summary={project.description}
        roles={project.roles}
        color={color}
        ink={brandInk}
        image={heroImage ? { src: heroImage } : undefined}
      />
      <BlockRenderer blocks={project.body} />
      <ProjectList projects={projects} currentSlug={slug} />
    </main>
  );
}
