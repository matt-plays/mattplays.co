import type { VideoEmbedValue } from "./types";

function paddingFor(aspectRatio?: string | null) {
  if (aspectRatio === "4:3") return "75%";
  if (aspectRatio === "1:1") return "100%";
  return "56.25%";
}

/** Iframe embed inside a media grid cell (Webflow's `.w-embed-youtubevideo`). */
export function EmbedFrame({ embed }: { embed: VideoEmbedValue }) {
  if (!embed.url) return null;
  return (
    <div style={{ paddingTop: paddingFor(embed.aspectRatio) }} className="w-embed-youtubevideo">
      <iframe
        src={embed.url}
        frameBorder="0"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
        }}
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Video"
      />
    </div>
  );
}

/** Standalone full-width embed section (Webflow's `.video-wrapperwidth` + `.w-video`). */
export default function VideoEmbed({ block }: { block: VideoEmbedValue }) {
  if (!block.url) return null;
  return (
    <div className="video-wrapperwidth">
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="image-wrapper img-border-radius">
            <div style={{ paddingTop: paddingFor(block.aspectRatio) }} className="w-video w-embed">
              <iframe
                src={block.url}
                width="940"
                height="529"
                scrolling="no"
                allow="autoplay; fullscreen; encrypted-media"
                allowFullScreen
                title="Video"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="spacer-xl"></div>
    </div>
  );
}
