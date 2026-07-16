import { defineType } from "sanity";

/**
 * Self-hosted looping background video (Webflow's background-video and
 * `video-wrapperwidth` sections). Video files live as Sanity file assets.
 */
export const videoLoop = defineType({
  name: "videoLoop",
  title: "Video loop",
  type: "object",
  fields: [
    { name: "video", type: "file", title: "Video (mp4)", options: { accept: "video/*" } },
    { name: "poster", type: "image", title: "Poster frame" },
    {
      name: "width",
      type: "string",
      title: "Width",
      options: { list: ["full", "half"] },
      initialValue: "full",
    },
  ],
  preview: {
    select: { media: "poster" },
    prepare: ({ media }) => ({ title: "Video loop", media }),
  },
});
