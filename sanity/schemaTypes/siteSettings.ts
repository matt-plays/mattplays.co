import { defineArrayMember, defineField, defineType } from "sanity";

const link = {
  type: "object" as const,
  name: "navLink",
  fields: [
    { name: "label", type: "string" as const },
    { name: "href", type: "string" as const, description: "Internal path (/work) or full URL" },
    { name: "comingSoon", type: "boolean" as const, title: "Coming soon tooltip", initialValue: false },
  ],
  preview: { select: { title: "label", subtitle: "href" } },
};

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "promoBar",
      type: "object",
      fields: [
        { name: "enabled", type: "boolean", initialValue: true },
        { name: "text", type: "string" },
        { name: "linkLabel", type: "string" },
        { name: "linkHref", type: "string" },
        {
          name: "overrides",
          title: "Per-page overrides",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "promoOverride",
              fields: [
                { name: "path", type: "string", description: "Page path this override applies to (e.g. /changelog)" },
                { name: "text", type: "string" },
                { name: "linkLabel", type: "string" },
                { name: "linkHref", type: "string" },
                { name: "hideLink", type: "boolean", initialValue: false },
              ],
              preview: { select: { title: "path", subtitle: "text" } },
            }),
          ],
        },
      ],
    }),
    defineField({ name: "navLinks", type: "array", of: [defineArrayMember(link)] }),
    defineField({ name: "footerLinks", type: "array", of: [defineArrayMember(link)] }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "social",
          fields: [
            { name: "label", type: "string" },
            { name: "url", type: "url" },
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
