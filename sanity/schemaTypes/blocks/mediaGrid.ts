import { defineArrayMember, defineType } from "sanity";

/**
 * Mirrors Webflow's image grids: `image-grid-3x3` (flexible spans),
 * `image-grid-2-upgrid`, and `image-fullviewport-container`.
 */
export const mediaGrid = defineType({
  name: "mediaGrid",
  title: "Media grid",
  type: "object",
  fields: [
    {
      name: "layout",
      type: "string",
      title: "Layout",
      options: {
        list: [
          { title: "Single / stacked (3x3 grid)", value: "grid" },
          { title: "Two-up", value: "twoUp" },
          { title: "Full viewport", value: "fullViewport" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    },
    {
      name: "items",
      type: "array",
      title: "Media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "rounded", type: "boolean", title: "Rounded corners", initialValue: true },
            {
              name: "width",
              type: "string",
              title: "Width",
              options: { list: ["full", "half"] },
              initialValue: "full",
            },
          ],
        }),
        defineArrayMember({ type: "videoEmbed" }),
        defineArrayMember({ type: "videoLoop" }),
      ],
    },
  ],
  preview: {
    select: { layout: "layout", items: "items" },
    prepare: ({ layout, items }) => ({
      title: `Media grid — ${layout}`,
      subtitle: `${items?.length ?? 0} item(s)`,
      media: items?.[0],
    }),
  },
});
