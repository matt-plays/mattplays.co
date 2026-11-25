import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  description: "Archive imported from Webflow (originally Squarespace). Not yet rendered publicly.",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({
      name: "featured",
      type: "boolean",
      initialValue: false,
      description: "Shows as the large lead card on /blog. Newest post is used when none is set.",
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Accent color",
      description:
        "Stands in for the card image on posts that have none — which is all 60 imported ones.",
    }),
    defineField({
      name: "canonicalUrl",
      type: "url",
      title: "Originally published at",
      description:
        "Set when the post first appeared somewhere else. Drives the note above the title and the rel=canonical link.",
    }),
    defineField({
      name: "canonicalLabel",
      type: "string",
      title: "Originally published — site name",
      description: 'Shown in the note, e.g. "helpscout.com". Falls back to the URL host.',
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "body", type: "richText" }),
  ],
  orderings: [
    { title: "Date (newest first)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", date: "date", media: "mainImage" },
    prepare: ({ title, date, media }) => ({ title, subtitle: date, media }),
  },
});
