import { defineArrayMember, defineType } from "sanity";

/** Mirrors Webflow's `creditgrid`: closing section with credits/roles. */
export const creditGrid = defineType({
  name: "creditGrid",
  title: "Credit grid",
  type: "object",
  fields: [
    { name: "overline", type: "string", title: "Overline" },
    { name: "intro", type: "richText", title: "Intro text" },
    {
      name: "credits",
      type: "array",
      title: "Credits",
      of: [
        defineArrayMember({
          type: "object",
          name: "credit",
          fields: [
            { name: "label", type: "string", title: "Label (e.g. Design, Photography)" },
            { name: "value", type: "string", title: "Name(s)" },
            { name: "url", type: "url", title: "Link (optional)" },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    },
  ],
  preview: {
    select: { overline: "overline" },
    prepare: ({ overline }) => ({ title: overline || "Credits", subtitle: "Credit grid" }),
  },
});
