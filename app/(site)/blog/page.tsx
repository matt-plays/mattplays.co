import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allBlogPostsQuery } from "@/sanity/lib/queries";
import type { BlogPostCard } from "@/sanity/lib/types";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on brand design, design systems, and working in the open.",
  openGraph: { title: "Blog" },
  twitter: { title: "Blog" },
};

/**
 * The blog index.
 *
 * The design's grid is three columns: a large lead card spanning two of them
 * with two smaller cards stacked alongside, then three-up rows underneath.
 * Splitting the posts here rather than in CSS keeps the card sizes honest —
 * each card is told how big it is, so it can pick its own type step and image
 * width instead of guessing from a breakpoint.
 *
 * Every post is rendered. This is an archive of 60 imported posts and the page
 * is static, so paging it would add a decision without yet solving a problem.
 */
export default async function BlogIndexPage() {
  const posts = await sanityFetch<BlogPostCard[]>({
    query: allBlogPostsQuery,
    tags: ["blogPost"],
  });

  if (!posts?.length) {
    return (
      <main className="section-padding">
        <div className="container-width w-container">
          <h1 className="headline size-10xl">Blog</h1>
          <div className="spacer-m"></div>
          <p className="text size-xl">Nothing published yet.</p>
        </div>
      </main>
    );
  }

  // An editor's pick wins; otherwise the newest post leads, which is what the
  // design's large card is for. `posts` already arrives newest-first.
  const leadIndex = Math.max(
    0,
    posts.findIndex((p) => p.featured),
  );
  const lead = posts[leadIndex];
  const remaining = posts.filter((_, i) => i !== leadIndex);
  const side = remaining.slice(0, 2);
  const rest = remaining.slice(2);

  return (
    <main>
      <div className="blog-masthead">
        <div className="container-width w-container">
          <h1 className="headline size-10xl">Blog</h1>
        </div>
      </div>

      <div className="container-width w-container">
        <div className="blog-lead-row">
          <PostCard post={lead} size="lead" />
          {side.length ? (
            <div className="blog-lead-row__side">
              {side.map((post) => (
                <PostCard key={post._id} post={post} size="sm" />
              ))}
            </div>
          ) : null}
        </div>

        {rest.length ? (
          <div className="blog-grid">
            {rest.map((post) => (
              <PostCard key={post._id} post={post} size="md" />
            ))}
          </div>
        ) : null}
      </div>

      <div className="spacer-2xl"></div>
    </main>
  );
}
