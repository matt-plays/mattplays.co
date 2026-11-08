import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostHero from "@/components/BlogPostHero";
import PostCard from "@/components/PostCard";
import RichText from "@/components/RichText";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { allBlogPostsQuery, blogPostBySlugQuery, blogPostSlugsQuery } from "@/sanity/lib/queries";
import type { BlogPostCard, BlogPostDetail } from "@/sanity/lib/types";

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(blogPostSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

/* The design renders "July 29, 2025". UTC-pinned — see PostCard. */
function formatDate(date?: string | null) {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<BlogPostDetail | null>({
    query: blogPostBySlugQuery,
    params: { slug },
    tags: ["blogPost"],
  });
  if (!post) return {};

  const image = post.mainImage ?? post.thumbnail;
  return {
    title: post.title,
    description: post.summary ?? undefined,
    // Much of this archive first appeared elsewhere. Pointing the canonical at
    // the original is the difference between republishing and duplicating.
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary ?? undefined,
      publishedTime: post.date ?? undefined,
      images: image
        ? [{ url: urlFor(image).width(1200).height(630).auto("format").url() }]
        : undefined,
    },
    twitter: { title: post.title },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, all] = await Promise.all([
    sanityFetch<BlogPostDetail | null>({
      query: blogPostBySlugQuery,
      params: { slug },
      tags: ["blogPost"],
    }),
    sanityFetch<BlogPostCard[]>({ query: allBlogPostsQuery, tags: ["blogPost"] }),
  ]);
  if (!post) notFound();

  const dateLabel = formatDate(post.date);
  // Three neighbours from the archive, nearest first by position in the
  // date-ordered list, so an old post suggests its contemporaries rather than
  // always sending the reader to the newest three.
  const index = all.findIndex((p) => p.slug === slug);
  const more = all
    .filter((p) => p.slug !== slug)
    .sort(
      (a, b) =>
        Math.abs(all.indexOf(a) - index) - Math.abs(all.indexOf(b) - index),
    )
    .slice(0, 3);

  return (
    <main className="blogpost">
      <BlogPostHero post={post} dateLabel={dateLabel} />

      {post.body?.length ? (
        <div className="blogpost__body">
          <RichText value={post.body} variant="editorial" />
        </div>
      ) : (
        <div className="blogpost__body">
          <p className="text size-xl">This post has no body content yet.</p>
        </div>
      )}

      {more.length ? (
        <section className="blogpost__more">
          <div className="container-width w-container">
            <h2 className="overline size-sm">More writing</h2>
            <div className="spacer-m"></div>
            <div className="blog-grid">
              {more.map((p) => (
                <PostCard key={p._id} post={p} size="md" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="spacer-2xl"></div>
    </main>
  );
}
