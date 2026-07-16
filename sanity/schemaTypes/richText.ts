import { defineArrayMember, defineType } from "sanity";

/**
 * Shared rich-text array used by changelog entries, blog posts, and text blocks.
 * Mirrors what Webflow's rich text supported: styled blocks, lists, links
 * (with optional new-tab), inline images, and embedded iframes.
 */
export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              { name: "href", type: "url", title: "URL", validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }) },
              { name: "blank", type: "boolean", title: "Open in new tab", initialValue: false },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
        { name: "caption", type: "string", title: "Caption" },
      ],
    }),
    defineArrayMember({ type: "videoEmbed" }),
  ],
});
