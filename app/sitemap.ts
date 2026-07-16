import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { projectSlugsQuery } from "@/sanity/lib/queries";

const BASE_URL = "https://mattplays.co";

const staticRoutes = [
  "/",
  "/work",
  "/changelog",
  "/info",
  "/style-guide",
  "/shop",
  "/news",
  "/lp/creative-south-2025",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: string[] = [];
  try {
    slugs = await sanityFetch<string[]>({
      query: projectSlugsQuery,
      tags: ["project"],
    });
  } catch {
    // If Sanity is unreachable at build time, still emit the static routes.
    slugs = [];
  }

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route === "/" ? "" : route}`,
    })),
    ...slugs.map((slug) => ({
      url: `${BASE_URL}/work/${slug}`,
    })),
  ];
}
