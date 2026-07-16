import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "card", title: "Card & metadata", default: true },
    { name: "content", title: "Case study content" },
  ],
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required(), group: "card" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
      group: "card",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      description: "Short blurb shown on cards and the work grid",
      group: "card",
    }),
    defineField({
      name: "roles",
      type: "string",
      title: "Fields / roles",
      description: 'e.g. "Art Direction, Design"',
      group: "card",
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Project color",
      description: "CSS color used for hovers/accents (hex or hsl)",
      group: "card",
    }),
    defineField({ name: "heroVisual", type: "image", options: { hotspot: true }, group: "card" }),
    defineField({ name: "primaryThumbnail", type: "image", options: { hotspot: true }, group: "card" }),
    defineField({ name: "secondaryThumbnail", type: "image", options: { hotspot: true }, group: "card" }),
    defineField({
      name: "order",
      type: "number",
      description: "Position in project lists (1 = first)",
      group: "card",
    }),
    defineField({
      name: "body",
      title: "Case study body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({ type: "textSection" }),
        defineArrayMember({ type: "mediaGrid" }),
        defineArrayMember({ type: "siteCompSection" }),
        defineArrayMember({ type: "creditGrid" }),
        defineArrayMember({ type: "quote" }),
        defineArrayMember({ type: "videoEmbed" }),
        defineArrayMember({ type: "videoLoop" }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Project order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "primaryThumbnail" },
  },
});
