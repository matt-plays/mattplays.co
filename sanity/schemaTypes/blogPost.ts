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
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "color", type: "string", title: "Accent color" }),
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
