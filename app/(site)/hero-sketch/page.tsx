import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "hero-sketch",
  openGraph: { title: "hero-sketch" },
  twitter: { title: "hero-sketch" },
};

const postArtImages = [
  "/images/ITW-PostArt-01.jpg",
  "/images/ITW-PostArt-02.jpg",
  "/images/ITW-PostArt-03.jpg",
  "/images/ITW-PostArt-04.jpg",
  "/images/ITW-PostArt-05.jpg",
  "/images/ITW-PostArt-06.jpg",
  "/images/ITW-PostArt-07.jpg",
  "/images/ITW-PostArt-08.jpg",
  "/images/ITW-PostArt-09.jpg",
];

export default function HeroSketchPage() {
  return (
    <>
      <div className="tag-viewport">
        <div className="hover-tag">
          <div className="hover-text overline size-xs">Coming Soon</div>
        </div>
      </div>
      <div className="hs-hero-full-bleed">
        <div className="hs-section">
          <div className="hs-hero-layout">
            <div
              id="w-node-_1ea798fa-ffb4-f585-e1bb-64d6efd2caec-119d1170"
              className="container-width is-hs"
            >
              <div className="w-layout-grid grid-globalgrid">
                <div
                  id="w-node-cd63576b-97c2-69e0-b45f-db3d18af867a-119d1170"
                  className="hs-hero-textsection"
                >
                  <div className="headline size-9xl hs-headline">
                    Simple
                    <br />
                    Powerful
                    <br />
                    Personal
                    <br />
                  </div>
                  <div className="spacer-m"></div>
                  <div className="text size-lg">
                    Good work happens anywhere. With the right remote environment, people can find
                    focus, foster real connection, and do their best work.
                  </div>
                </div>
              </div>
            </div>
            <div
              id="w-node-_63ec59ab-40b9-90e5-1d67-a17718a92370-119d1170"
              className="hs-hero-image"
            >
              <img src="/images/platform-hero-visual.png" loading="lazy" alt="" className="hs-image" />
            </div>
          </div>
        </div>
        <div className="hs-hero-background">
          <img src="/images/platform-hero-background.png" loading="lazy" alt="" className="image-20" />
        </div>
      </div>
      <div className="image-grid-3x3">
        <div className="section-padding">
          <div className="container-width w-container">
            <div className="grid-3x3">
              {postArtImages.map((src) => (
                <div key={src} className="image-wrapper img-border-radius projectgrid-image-33">
                  <img loading="lazy" alt="" src={src} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="spacer-xl"></div>
      </div>
      <div id="colophon" className="info-colophon">
        <div className="section-padding">
          <div className="container-width w-container">
            <div className="w-layout-grid grid-globalgrid">
              <div
                id="w-node-_8fedec04-8a1c-ded3-2bfb-c0ef4274beda-119d1170"
                className="info-sectionheadline"
              >
                <div className="headline size-4xl">Colophon</div>
              </div>
              <div
                id="w-node-_54e469f1-76e1-f751-4280-3b38982d4f2e-119d1170"
                className="text size-lg about-bio"
              >
                This site uses{" "}
                <a href="https://sharptype.co/typefaces/sharp-grotesk/" target="_blank">
                  Sharp Grotesk
                </a>{" "}
                (Semibold 23 for headlines and Book 20 for sub-headlines),{" "}
                <a href="https://klim.co.nz/retail-fonts/soehne/" target="_blank">
                  Söhne Buch
                </a>{" "}
                for body copy, and{" "}
                <a href="https://klim.co.nz/retail-fonts/soehne-mono/" target="_blank">
                  Söhne Mono
                </a>{" "}
                for details. <br />
                <br />
                The underlying design system and page templates were created in{" "}
                <a href="https://figma.com/" target="_blank">
                  Figma
                </a>
                . Pages and components were built using{" "}
                <a href="https://webflow.grsm.io/s5ae778jzhz7" target="_blank">
                  Webflow
                </a>{" "}
                with primarily no-code tools, a small amount of custom CSS, and data from CMS
                collections. It&rsquo;s hosted by Webflow, too. <br />
                <br />
                The (soon-to-be launched) email list is managed through{" "}
                <a href="https://convertkit.com/" target="_blank">
                  ConvertKit
                </a>{" "}
                and basic site metrics are provided by{" "}
                <a href="https://analytics.google.com/" target="_blank">
                  Google Analytics
                </a>
                .
              </div>
            </div>
          </div>
          <div className="spacer-xl"></div>
        </div>
      </div>
      <div className="image-fullviewport">
        <div className="image-fullviewport-container">
          <img
            src="/images/Info-Photo-02.webp"
            loading="lazy"
            alt=""
            className="image-fullviewport-image"
          />
        </div>
        <div className="spacer-xl"></div>
      </div>
      <div className="creditgrid">
        <div className="section-padding">
          <div className="container-width w-container">
            <div className="w-layout-grid grid-globalgrid iscreditgrid">
              <div
                id="w-node-_66c135a1-4002-6b20-e532-9653a4c9f432-a4c9f42e"
                className="creditgrid-item"
              >
                <div className="overline size-xs">Design</div>
                <div
                  id="w-node-_66c135a1-4002-6b20-e532-9653a4c9f435-a4c9f42e"
                  className="spacer-xs"
                ></div>
                <div className="detail size-sm creditgrid-list">
                  Erik Blad
                  <br />
                  Christine Chen
                  <br />
                  Bronwyn Gruet
                  <br />
                </div>
              </div>
              <div
                id="w-node-_66c135a1-4002-6b20-e532-9653a4c9f43d-a4c9f42e"
                className="creditgrid-item"
              >
                <div className="overline size-xs">development</div>
                <div
                  id="w-node-_66c135a1-4002-6b20-e532-9653a4c9f440-a4c9f42e"
                  className="spacer-xs"
                ></div>
                <div className="detail size-sm creditgrid-list">
                  Mark Carter
                  <br />
                  Alex Haynes
                  <br />
                  Katia Zanotti
                </div>
              </div>
              <div
                id="w-node-_66c135a1-4002-6b20-e532-9653a4c9f447-a4c9f42e"
                className="creditgrid-item"
              >
                <div className="overline size-xs">editorial team</div>
                <div
                  id="w-node-_66c135a1-4002-6b20-e532-9653a4c9f44a-a4c9f42e"
                  className="spacer-xs"
                ></div>
                <div className="detail size-sm creditgrid-list">
                  Hillary Noble
                  <br />
                  Kristen Bryant Smith
                  <br />
                  Diana Price
                </div>
              </div>
              <div
                id="w-node-_66c135a1-4002-6b20-e532-9653a4c9f451-a4c9f42e"
                className="creditgrid-item"
              >
                <div className="overline size-xs">illustration</div>
                <div
                  id="w-node-_66c135a1-4002-6b20-e532-9653a4c9f454-a4c9f42e"
                  className="spacer-xs"
                ></div>
                <div className="detail size-sm creditgrid-list">
                  Erik Blad
                  <br />
                  Christine Chen
                  <br />
                  Bronwyn Gruet
                </div>
              </div>
            </div>
            <div className="spacer-xl"></div>
          </div>
        </div>
      </div>
    </>
  );
}
