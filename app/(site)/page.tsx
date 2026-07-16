/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import BackgroundVideo from "@/components/BackgroundVideo";
import HomeHero from "@/components/HomeHero";
import HomeWorkCta from "@/components/HomeWorkCta";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProjectsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Design for Brands by Matt Plays",
  description: "System-minded design and art direction for purpose-driven brands.",
};

interface ProjectStub {
  _id: string;
  slug: string | null;
}

export default async function Home() {
  const projects = await sanityFetch<ProjectStub[]>({
    query: allProjectsQuery,
    tags: ["project"],
  });
  const slugs = new Set(projects.map((project) => project.slug).filter(Boolean));

  /** Collage tiles deep-link to their case study when it exists in Sanity. */
  const workHref = (slug: string) => (slugs.has(slug) ? `/work/${slug}` : "/work");

  return (
    <main>
      <HomeHero />
      <div className="itw">
        <div className="container-width w-container">
          <div className="w-layout-grid grid-globalgrid">
            <Link
              id="w-node-_01244f23-948f-cf4b-3175-4f700749232a-119d1161"
              href={workHref("in-the-works")}
              className="itw-homecollage hide-underline w-inline-block"
            >
              <div className="itw-mountaincontainer">
                <img
                  src="/images/itw-tuckermancollage.webp"
                  loading="lazy"
                  width={774}
                  alt="Mountain collage graphic"
                  className="itw-tuckermancollage"
                />
              </div>
              <div
                id="w-node-_4456062b-6d07-bef4-65a1-bf7eab718dd0-119d1161"
                className="itw-videocontainer img-border-radius"
              >
                <BackgroundVideo
                  className="itw-video img-border-radius image-lil-dropshadow"
                  poster="/videos/itw-homepageanimation-60-poster-00001.jpg"
                  mp4="/videos/itw-homepageanimation-60-transcode.mp4"
                  webm="/videos/itw-homepageanimation-60-transcode.webm"
                />
              </div>
            </Link>
            <div
              id="w-node-_25d3edf2-e7ee-375b-b860-b77fb041e198-119d1161"
              className="image-wrapper img-border-radius"
              // The `.homepage-linkitem` overlay is absolutely positioned; without
              // a positioned ancestor it would stretch over the whole viewport
              // (the exported CSS ships no positioning on `.image-wrapper`).
              // Scope it to this tile so it only covers the Rock Dove image.
              style={{ position: "relative" }}
            >
              <Link
                href={workHref("rock-dove")}
                className="homepage-linkitem hide-underline w-inline-block"
              ></Link>
              <img src="/images/RockDove-CaseStudy-01.jpg" loading="lazy" alt="" />
            </div>
          </div>
          <div className="spacer-xl"></div>
        </div>
      </div>
      <div className="_7hw-burton">
        <div className="container-width w-container">
          <div className="w-layout-grid grid-2">
            <Link
              id="w-node-d9a8e598-a24a-d3a3-baff-373c8584c574-119d1161"
              href={workHref("the-island-of-misfit-work")}
              className="hide-underline w-inline-block"
            >
              <div className="div-block-32">
                <img
                  src="/images/7hw-jersey.png"
                  loading="lazy"
                  width={848}
                  alt="Seven Hills Wheelmen Cycling Jersey"
                  className="image-7hw-jersey"
                />
              </div>
            </Link>
            <Link
              id="w-node-_5df9aaa6-4c2d-a80c-d11b-a2fe6851749a-119d1161"
              href={workHref("burton-seasonal-identities")}
              className="hide-underline w-inline-block"
            >
              <img
                src="/images/burton-17ss-cover.webp"
                loading="lazy"
                alt="Burton Snowboards Spring Summer Catalog cover"
                className="img-border-radius image-lil-dropshadow"
              />
            </Link>
            <Link
              id="w-node-_050489ab-1b54-3c4c-6f90-05ea2a8ccbf8-119d1161"
              href={workHref("the-island-of-misfit-work")}
              className="hide-underline w-inline-block"
            >
              <img
                src="/images/7hw-logodiagram.png"
                loading="lazy"
                alt=""
                className="image-21"
              />
            </Link>
            <Link
              id="w-node-e2afd531-d632-ed8b-5c16-c281d285d3f1-119d1161"
              href={workHref("icon-snowskates")}
              className="hide-underline w-inline-block"
            >
              <img
                src="/images/icon-wherevertagline.gif"
                loading="lazy"
                alt=""
                className="icon-wherever-gif"
              />
            </Link>
            <div
              id="w-node-_983f9ee0-5e47-7291-e00b-ac9ca818a36e-119d1161"
              className="w-layout-grid grid-3"
            >
              <Link
                id="w-node-be48b22c-c53a-faf7-8b21-50f1938277ea-119d1161"
                href={workHref("burton-campaigns")}
                className="hide-underline w-inline-block"
              >
                <img
                  src="/images/burton-passalong-badge-02.png"
                  loading="lazy"
                  alt=""
                  className="image-burton-passalong-2"
                />
              </Link>
              <Link
                id="w-node-af8a48f4-a142-7275-b001-a54500037983-119d1161"
                href={workHref("burton-campaigns")}
                className="hide-underline w-inline-block"
              >
                <img
                  src="/images/burton-passalong-peace.png"
                  loading="lazy"
                  alt=""
                  className="image-burton-passalong-peace"
                />
              </Link>
              <Link
                id="w-node-_0b4ef422-dd30-0351-3650-618192f5515c-119d1161"
                href={workHref("burton-campaigns")}
                className="hide-underline w-inline-block"
              >
                <img
                  src="/images/burton-passalong-badge-01.png"
                  loading="lazy"
                  alt=""
                  className="image-burton-passalong-yellow"
                />
              </Link>
            </div>
          </div>
          <div className="spacer-xl"></div>
        </div>
      </div>
      <div className="itw-helpscout">
        <div className="container-width w-container">
          <div className="w-layout-grid grid-globalgrid">
            <Link
              id="w-node-_611acee8-9e3d-fd5e-32c3-0d486742521d-119d1161"
              href={workHref("delight-labs")}
              className="hide-underline w-inline-block"
            >
              <div className="image-wrapper img-border-radius islobster">
                <img
                  src="/images/HelpScout-DelightLabs-Lobster.png"
                  loading="lazy"
                  alt=""
                  className="image-22"
                />
              </div>
            </Link>
            <Link
              id="w-node-_308a2bab-eb1f-f2ba-7922-c95d6fa6b085-119d1161"
              href={workHref("help-scout-brand-evolution")}
              className="hide-underline w-inline-block"
            >
              <div className="image-wrapper img-border-radius">
                <img
                  src="/images/HelpScout-PrimaryVisual.jpg"
                  loading="lazy"
                  width={833}
                  alt=""
                  className="hs-evolution img-border-radius"
                />
              </div>
            </Link>
          </div>
          <div className="spacer-xl"></div>
        </div>
      </div>
      <div className="atg-epicurrence">
        <div className="container-width w-container">
          <div className="w-layout-grid grid-atgepicurrence">
            <Link
              href={workHref("help-scout-microbrands")}
              className="hide-underline w-inline-block"
            >
              <img
                src="/images/hs-atg-brandboard.webp"
                loading="lazy"
                alt=""
                className="image-atg-brandboard img-border-radius left-bleed"
              />
            </Link>
            <Link
              id="w-node-_19da871b-99ba-b469-1b29-688585ca7cd1-119d1161"
              href={workHref("epicurrence")}
              className="hide-underline w-inline-block"
            >
              <img
                src="/images/epicurrence-breckenridge.webp"
                loading="lazy"
                alt=""
                className="image-epicurrence-badge"
              />
            </Link>
          </div>
        </div>
        <div className="spacer-xl"></div>
      </div>
      <div className="burton">
        <div className="container-width w-container">
          <div className="w-layout-grid grid-globalgrid">
            <Link
              id="w-node-d7728689-d554-f863-20d1-6745ea83e1a5-119d1161"
              href={workHref("burton-seasonal-identities")}
              className="hide-underline w-inline-block"
            >
              <img
                src="/images/burton-dealerbooks.webp"
                loading="lazy"
                alt=""
                className="image-burton-dealer img-border-radius"
              />
            </Link>
            <Link
              id="w-node-acc53ffe-f35c-f9e9-28be-46fa31a2fb72-119d1161"
              href={workHref("burton-web-design")}
              className="hide-underline w-inline-block"
            >
              <div className="div-block-34">
                <BackgroundVideo
                  className="background-video img-border-radius image-lil-dropshadow"
                  poster="/videos/burton-18sshero-poster-00001.jpg"
                  mp4="/videos/burton-18sshero-transcode.mp4"
                  webm="/videos/burton-18sshero-transcode.webm"
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="spacer-xl"></div>
      </div>
      <div className="itw-02">
        <div className="container-width w-container">
          <div className="image-wrapper-width img-border-radius">
            <Link href={workHref("in-the-works")} className="hide-underline w-inline-block">
              <img src="/images/ITW-Intro-07.jpg" loading="lazy" alt="" />
            </Link>
          </div>
          <div className="spacer-xl"></div>
        </div>
      </div>
      <div className="_85-for-85-itw">
        <div className="container-width w-container">
          <div className="w-layout-grid grid-8">
            <Link
              id="w-node-cf327b27-3659-3b4c-7580-b380fae68c0d-119d1161"
              href={workHref("the-island-of-misfit-work")}
              className="hide-underline w-inline-block"
            >
              <img
                src="/images/Personal-85for85-BearsEars-OursDribbbleGIF-Portfolio.gif"
                loading="lazy"
                width={384}
                alt=""
                className="image-85for85-ours"
              />
            </Link>
            <Link
              id="w-node-_2aad99cc-9665-076e-958e-d3ff08f2e522-119d1161"
              href={workHref("in-the-works")}
              className="hide-underline w-inline-block"
            >
              <img
                src="/images/itw-category-illo-growth.webp"
                loading="lazy"
                alt=""
                className="image-itw-category-illo"
              />
            </Link>
          </div>
        </div>
        <div className="spacer-xl"></div>
      </div>
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="w-layout-grid grid-asymm-three">
            <div
              id="w-node-_8c70fbbe-689d-24a8-dc52-b3d4866d601b-119d1161"
              className="div-block-27"
            >
              <img
                src="/images/newenglandbrew-6pack.png"
                loading="lazy"
                width={1058}
                alt=""
                className="image-ne-brew"
              />
            </div>
            <div
              id="w-node-b3fd5479-31c4-6da3-4e86-6c5ae2db88e2-119d1161"
              className="pre-footer-type-container"
            >
              <div className="pre-footer-type-div">
                <HomeWorkCta />
              </div>
            </div>
            <div
              id="w-node-d1d12d55-c209-0275-9f39-508d9c36d503-119d1161"
              className="div-block-30"
            >
              <Link
                href={workHref("acadia-type-hike")}
                className="hide-underline w-inline-block"
              >
                <img
                  src="/images/typehike-acadia.webp"
                  loading="lazy"
                  width={993}
                  alt="Acadia poster for Type Hike"
                  className="image-typehike-acadia img-border-radius"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
