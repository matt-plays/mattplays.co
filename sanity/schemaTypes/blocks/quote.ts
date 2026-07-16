import { defineType } from "sanity";

export const quote = defineType({
  name: "quote",
  title: "Quote",
  type: "object",
  fields: [
    { name: "text", type: "text", title: "Quote", rows: 3 },
    { name: "attribution", type: "string", title: "Attribution" },
    { name: "role", type: "string", title: "Role / context" },
  ],
  preview: {
    select: { title: "text", subtitle: "attribution" },
  },
});
