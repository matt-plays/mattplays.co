import { defineQuery } from "next-sanity";

export const allProjectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc) {
    _id, title, "slug": slug.current, description, roles, color, order,
    heroVisual, primaryThumbnail, secondaryThumbnail
  }
`);

export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)].slug.current
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description, roles, color, order,
    heroVisual, primaryThumbnail, secondaryThumbnail,
    body[] {
      ...,
      _type == "mediaGrid" => {
        items[] {
          ...,
          _type == "image" => { asset-> },
          _type == "videoLoop" => {
            "videoUrl": video.asset->url,
            "videoFile": video.asset->originalFilename,
            "posterUrl": poster.asset->url,
            "posterAspect": poster.asset->metadata.dimensions.aspectRatio
          }
        }
      },
      _type == "videoLoop" => {
        "videoUrl": video.asset->url,
        "videoFile": video.asset->originalFilename,
        "posterUrl": poster.asset->url,
        "posterAspect": poster.asset->metadata.dimensions.aspectRatio
      },
      _type == "siteCompSection" => { media[] { ..., asset-> } }
    }
  }
`);

export const allChangelogQuery = defineQuery(`
  *[_type == "changelogEntry"] | order(date desc) {
    _id, title, "slug": slug.current, date, image, body
  }
`);

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    promoBar, navLinks, footerLinks, socials
  }
`);

/*
 * Blog.
 *
 * The 60 imported posts carry title/slug/date/body and nothing else — no
 * summary, no mainImage, no thumbnail, and `featured` is false on every one.
 * So the list query derives what the cards need rather than assuming it:
 *
 *   - `excerpt` is the first paragraph's text, pulled out in GROQ so the list
 *     page never has to ship a whole body just to show two lines. `summary`
 *     still wins when an editor writes one.
 *   - `lead` is the newest post when nothing is flagged featured, which is
 *     what the design's large card wants.
 */
export const allBlogPostsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)] | order(date desc) {
    _id, title, "slug": slug.current, date, featured, color,
    mainImage, thumbnail,
    "excerpt": coalesce(
      summary,
      pt::text(body[_type == "block" && style == "normal"][0])
    )
  }
`);

export const blogPostSlugsQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)].slug.current
`);

export const blogPostBySlugQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, date, summary, color,
    canonicalUrl, canonicalLabel,
    mainImage, thumbnail,
    body[] {
      ...,
      _type == "image" => { asset-> }
    }
  }
`);
