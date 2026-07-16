import { defineType } from "sanity";

/** Mirrors Webflow's `textsection-container`: optional overline + rich text. */
export const textSection = defineType({
  name: "textSection",
  title: "Text section",
  type: "object",
  fields: [
    { name: "overline", type: "string", title: "Overline" },
    { name: "body", type: "richText", title: "Body" },
  ],
  preview: {
    select: { overline: "overline", body: "body" },
    prepare: ({ overline, body }) => ({
      title: overline || (Array.isArray(body) && body[0]?.children?.[0]?.text) || "Text section",
      subtitle: "Text section",
    }),
  },
});
