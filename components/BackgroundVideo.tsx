export interface BackgroundVideoProps {
  /** Webflow classes for the wrapper (e.g. "itw-video img-border-radius"). */
  className?: string;
  poster: string;
  mp4: string;
  webm: string;
}

/**
 * Reimplements the Webflow `w-background-video` atom: an autoplaying, muted,
 * looping cover video with its poster painted as a background image while the
 * first frame loads. The ported webflow.css provides the sizing/object-fit.
 */
export default function BackgroundVideo({ className, poster, mp4, webm }: BackgroundVideoProps) {
  const classes = ["w-background-video", "w-background-video-atom"];
  if (className) classes.unshift(className);

  return (
    <div className={classes.join(" ")}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ backgroundImage: `url("${poster}")` }}
        data-object-fit="cover"
      >
        <source src={mp4} />
        <source src={webm} />
      </video>
    </div>
  );
}
