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
