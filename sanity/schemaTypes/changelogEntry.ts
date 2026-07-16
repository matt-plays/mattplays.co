import { defineField, defineType } from "sanity";

export const changelogEntry = defineType({
  name: "changelogEntry",
  title: "Changelog entry",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", type: "date", validation: (r) => r.required() }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({ name: "body", type: "richText" }),
  ],
  orderings: [
    { title: "Date (newest first)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", date: "date", media: "image" },
    prepare: ({ title, date, media }) => ({ title, subtitle: date, media }),
  },
});
