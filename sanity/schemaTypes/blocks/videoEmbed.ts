import { defineType } from "sanity";

export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Video embed",
  type: "object",
  fields: [
    { name: "url", type: "url", title: "Embed URL", description: "YouTube, Vimeo, or other iframe src" },
    { name: "aspectRatio", type: "string", title: "Aspect ratio", options: { list: ["16:9", "4:3", "1:1"] }, initialValue: "16:9" },
  ],
  preview: {
    select: { url: "url" },
    prepare: ({ url }) => ({ title: "Video", subtitle: url }),
  },
});
