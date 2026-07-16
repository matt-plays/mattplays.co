import type { Metadata } from "next";
import BodyClass from "@/components/BodyClass";

export const metadata: Metadata = {
  title: "Icon Snowskates",
  openGraph: { title: "Icon Snowskates" },
  twitter: { title: "Icon Snowskates" },
};

export default function NewsPage() {
  return (
    <>
      <BodyClass className="icon-lp-body" />
      <div className="icon-lp">
        <div className="container-width icon-lp-overrides w-container">
          <img src="/images/icon-logo.svg" loading="lazy" width="200" alt="" className="icon-lp-logo" />
          <div className="icon-lp-text text-style-text-small">
            We started Icon Snowskates in 2008—just over a decade ago. Back then, most snowskates
            were manufactured in China, undercutting the needs and expectations of everyone pushing
            the sport. We saw an opportunity to hand-make premium snowskates, using better materials
            and sustainable practices.
            <br />
            <br />
            Our vision that snowskates are skateboards for the snow resonated with the market. With
            just an inch of snow, you can keep skating your local skatepark or stair set, cruise
            through the woods, and even find fun in your own backyard. <br />
            &zwj;
            <br />
            For years we worked alongside other brands, like{" "}
            <a href="https://www.ambitionsnowskates.com/" target="_blank">
              Ambition Snowskates
            </a>
            , on this same mission, building and giving back wherever possible. Videos like{" "}
            <a href="#">
              <em>Something to be Said</em>
            </a>
            , contests like the Icon Classic, and events like{" "}
            <a href="https://www.youtube.com/watch?v=elhUM4IlQ3s" target="_blank">
              Go Snowskating Day
            </a>{" "}
            were ways we fueled the stoke and platforms we used to put snowskating out into the
            world. We couldn&rsquo;t be more grateful for every hour spent grooming run-ups, stacking
            clips, scouring the forums, or just being outside with wet socks.
            <br />
            &zwj;
            <br />
            With heavy hearts, and for the foreseeable future, we are announcing an official hiatus
            of the Icon Snowskates brand and its products. We would like to extend the biggest
            thanks to our customers, team, and fans for being part of this ride. We&rsquo;re forever
            grateful and will be pushing alongside you from here on out. <br />
            &zwj;
            <br />
            &zwj;
            <br />
            Peace, <br />
            Steve &amp; Matt Plays
            <br />
          </div>
          <div className="icon-lp-fine-print icon-lp-text">
            For press and inquiries, please direct emails to{" "}
            <a href="mailto:help@iconsnowskates.com">help@iconsnowskates.com</a>. To share the news,
            memories, or show your support use the hashtags,{" "}
            <a href="https://www.instagram.com/explore/tags/skatethesnow/" target="_blank">
              #skatethesnow
            </a>{" "}
            and{" "}
            <a href="https://www.instagram.com/explore/tags/iconsnowskatesforever/" target="_blank">
              #IconSnowskatesForever.
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
