import type { VideoLoopValue } from "./types";

/**
 * Background videos sit in an aspect-ratio wrapper class:
 *   .video-sixteennine (56.25%, 16:9) | .video-fourthree (75%, 4:3) |
 *   .video-threefour (133.33%, 3:4 portrait)
 * The class isn't stored in Sanity, so derive it from the poster's aspect ratio.
 */
export function loopAspectClass(loop: VideoLoopValue, inGrid = false): string {
  const aspect = loop.posterAspect ?? 16 / 9;
  if (aspect < 1) return "video-threefour";
  if (inGrid) return "video-fourthree"; // 2-up cells render 4:3
  return aspect >= 1.6 ? "video-sixteennine" : "video-fourthree";
}

/** The `.w-background-video` atom: autoplaying, muted, looping cover video. */
export function BackgroundVideo({ loop, inGrid = false }: { loop: VideoLoopValue; inGrid?: boolean }) {
  if (!loop.videoUrl) return null;
  return (
    <div
      data-poster-url={loop.posterUrl ?? undefined}
      data-video-urls={loop.videoUrl}
      data-autoplay="true"
      data-loop="true"
      data-wf-ignore="true"
      className={`${loopAspectClass(loop, inGrid)} w-background-video w-background-video-atom`}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={loop.posterUrl ?? undefined}
        data-wf-ignore="true"
        data-object-fit="cover"
        style={loop.posterUrl ? { backgroundImage: `url("${loop.posterUrl}")` } : undefined}
      >
        <source src={loop.videoUrl} data-wf-ignore="true" />
      </video>
    </div>
  );
}

/** Standalone video loop section (Webflow's `.video-wrapperwidth`). */
export default function VideoLoop({ block }: { block: VideoLoopValue }) {
  if (!block.videoUrl) return null;
  return (
    <div className="video-wrapperwidth">
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="image-wrapper img-border-radius">
            <BackgroundVideo loop={block} />
          </div>
        </div>
      </div>
      <div className="spacer-xl"></div>
    </div>
  );
}
