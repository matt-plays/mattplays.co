import { defineArrayMember, defineType } from "sanity";

/**
 * Mirrors Webflow's bespoke `sitecompsection-*` compositions — a set of
 * screenshots/devices arranged on a colored background. The variant key maps
 * to a per-project layout in code; media supplies the imagery.
 */
export const siteCompSection = defineType({
  name: "siteCompSection",
  title: "Site comp section",
  type: "object",
  fields: [
    {
      name: "variant",
      type: "string",
      title: "Layout variant",
      description: "Maps to a named composition in code (e.g. rockdove, hswd, icon, epic)",
    },
    { name: "background", type: "string", title: "Background color (CSS value)" },
    {
      name: "media",
      type: "array",
      title: "Media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        }),
      ],
    },
  ],
  preview: {
    select: { variant: "variant", media: "media" },
    prepare: ({ variant, media }) => ({
      title: `Site comp — ${variant ?? "unset"}`,
      media: media?.[0],
    }),
  },
});
