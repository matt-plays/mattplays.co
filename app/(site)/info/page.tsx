import type { Metadata } from "next";
import InfoPhotoStrip from "@/components/InfoPhotoStrip";

export const metadata: Metadata = {
  title: "Info",
  openGraph: {
    title: "Info",
    images: [
      "https://uploads-ssl.webflow.com/61168d8d7bfc7bb8d1da7df2/63bad0f8e91f66a343384a92_Personal-MetaImage.png",
    ],
  },
  twitter: {
    title: "Info",
    images: [
      "https://uploads-ssl.webflow.com/61168d8d7bfc7bb8d1da7df2/63bad0f8e91f66a343384a92_Personal-MetaImage.png",
    ],
  },
};

interface ExperienceItem {
  years: string;
  company: string;
  role: string;
  location: string;
}

const experience: ExperienceItem[] = [
  { years: "2026 – Present", company: "Watershed", role: "Principal Brand Designer", location: "Remote" },
  { years: "2022 – 2025", company: "Help Scout", role: "Creative Director", location: "Remote" },
  { years: "2022 – 2022", company: "Thrive Global", role: "Staff Designer → Creative Director", location: "Remote" },
  { years: "2019 – 2021", company: "Help Scout", role: "Senior Brand Designer → Lead Brand Designer", location: "Remote" },
  { years: "2015 – 2019", company: "Burton Snowboards", role: "Digital Designer → Lead Designer", location: "Burlington, VT" },
  { years: "2012 – 2015", company: "HubSpot", role: "Design & Video Associate", location: "Cambridge, MA" },
  { years: "2008 – 2020", company: "Icon Snowskates", role: "Co-founder & Creative Lead", location: "New England" },
  { years: "2006 – Present", company: "Freelance & Self-directed Work", role: "Designer & Art Director", location: "New England" },
];

interface Value {
  number: string;
  colorClass: string;
  title: string;
  body: string;
}

const values: Value[] = [
  {
    number: "01",
    colorClass: "textcolor-misc",
    title: "Work wherever",
    body: "Good work happens anywhere. With the right remote environment, people can find focus, foster real connection, and do their best work.",
  },
  {
    number: "02",
    colorClass: "textcolor-burtonms",
    title: "Sweat the delivery",
    body: "Follow through on craft, from creative direction right down to production cuts. It matters most wherever work comes to life.",
  },
  {
    number: "03",
    colorClass: "textcolor-acadia",
    title: "Bring your whole self",
    body: "Tap into your own experiences & perspectives and be curious about what others bring to the table. Projects are better when woven.",
  },
  {
    number: "04",
    colorClass: "textcolor-epicurrence",
    title: "Create a safe space",
    body: "The best work comes from creatively safe work environments. Make it feel okay to be wrong before we’re right. For you and for others.",
  },
  {
    number: "05",
    colorClass: "textcolor-icon",
    title: "Trust the process",
    body: "Process creates room for discovery. Even the most complex projects become possible by breaking things up into manageable chunks.",
  },
  {
    number: "06",
    colorClass: "textcolor-helpscoutmb",
    title: "Take the scenic route",
    body: "Tune out. Free yourself up to have epiphanies when you least expect. Take back what you learn and trust that there’s productivity in rest.",
  },
];

const valueNodeIds = [
  "w-node-bcf5aa0b-72c2-c0c8-6293-5cfec4222bc4-119d1173",
  "w-node-fae601ea-51e9-5c68-e3c2-5cea964ac504-119d1173",
  "w-node-_63182ef2-e247-5287-41db-dcdff949d993-119d1173",
  "w-node-_66209b55-d3b4-991f-8d71-1131209d26ba-119d1173",
  "w-node-d69b3abe-30af-ae6a-8219-36176886b858-119d1173",
  "w-node-b945d0c4-0a77-7ca8-7093-bc7641c40e1d-119d1173",
];

interface PressItem {
  heading: string;
  href: string;
  label: string;
}

const press: PressItem[] = [
  { heading: "Help Scout", href: "https://insidemarketingdesign.co/at/help-scout", label: "Inside Marketing Design at Help Scout" },
  { heading: " ", href: "https://www.typewolf.com/site-of-the-day/in-the-works", label: "Typewolf Site of the Day" },
  { heading: " ", href: "https://onepagelove.com/against-the-grain", label: "One Page Love" },
  { heading: " ", href: "https://youtu.be/MgM7Lad8TNw", label: "Figma Remote Design Critiques" },
  { heading: "Type Hike", href: "http://typehike.com/exhibitions/", label: "Poler Portland & Laguna Exhibits" },
  { heading: " ", href: "https://www.fastcodesign.com/3064964/60-designers-create-posters-for-their-favorite-national-parks", label: "Fast Company Design" },
  { heading: " ", href: "http://gearpatrol.com/2016/10/27/type-hike-national-parks-posters/", label: "Gear Patrol" },
  { heading: " ", href: "https://huckberry.com/store/type-hike", label: "Huckberry" },
  { heading: " ", href: "http://www.typeroom.eu/article/type-hike-typography-service-great-wide-usa-nature", label: "Typeroom" },
  { heading: " ", href: "http://typehike.com/exhibitions/2017/4/26/rei", label: "REI" },
  { heading: "Icon Snowskates", href: "#", label: "Honorable Mention on The Berrics" },
  { heading: " ", href: "http://www.webdesign-inspiration.com/web-design/iconsnowskates-com-20500", label: "Webdesign Inspiration" },
  { heading: " ", href: "https://ecomm.design/site/icon-snowskates/", label: "eComm Design" },
];

export default function InfoPage() {
  return (
    <>
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="spacer-xl"></div>
          <h1 className="size-5xl">The little bits add up</h1>
          <div className="spacer-2xl"></div>
        </div>
      </div>
      <div className="info-bio">
        <div className="section-padding">
          <div className="container-width w-container">
            <div className="w-layout-grid grid-globalgrid">
              <div
                id="w-node-_827d661d-0368-2515-372c-610aa29f8980-119d1173"
                className="textsection-container"
              >
                <div className="text size-3xl info-introtext">
                  New England-based designer with a thing for skateboarding, rock climbing, and
                  chicken parm&rsquo;
                </div>
                <div
                  id="w-node-_83f2f67f-86ad-76d8-f8b5-ac0087f5ee68-119d1173"
                  className="spacer-s"
                ></div>
                <div className="text size-lg about-bio">
                  I&rsquo;m Matt Plays, a creative director and designer, currently working at{" "}
                  <a href="https://watershed.com" target="_blank">
                    Watershed
                  </a>
                  .<br />
                  <span className="info-bio-linebreak">From</span>{" "}
                  dialing-in components to setting
                  the tone with a new direction doc, my goal is to craft brands that look the part
                  and live up to their missions. It helps that I&rsquo;ve linked up with{" "}
                  <a href="#experience">
                    some good <span className="info-bio-linebreak-last">ones</span>
                  </a>
                  <span>.</span>
                  <br />
                  <span>I&rsquo;ve</span> been lucky to get in on{" "}
                  <a href="/work/epicurrence">projects that stoke out the design community</a>,{" "}
                  <a href="/work/icon-snowskates">ship products worldwide</a>, and{" "}
                  <a href="/work/acadia-type-hike">protect public lands</a>.<br />
                  <span className="info-bio-linebreak">Most</span> days you can find me outside,
                  tinkering on a project, or being comfy at home. Hopefully basking in the sun to
                  good tunes. See you out there <sup>☼</sup>
                  <span className="text-span">⛰</span>
                </div>
              </div>
              <div
                id="w-node-f0f40b53-0eb5-a3a4-78ba-771d4e4c826c-119d1173"
                className="img-border-radius"
              >
                <img
                  src="/images/About-Bio.webp"
                  loading="lazy"
                  decoding="async"
                  width="261"
                  alt=""
                  className="image-14"
                />
              </div>
            </div>
            <div className="spacer-xl"></div>
          </div>
        </div>
      </div>
      <InfoPhotoStrip />
      <div className="hs-section">
        <div className="section-padding">
          <div className="container-width w-container">
            <div className="w-layout-grid grid-globalgrid">
              <div
                id="w-node-cd63576b-97c2-69e0-b45f-db3d18af867a-119d1173"
                className="info-sectionheadline"
              >
                <div className="headline size-4xl">
                  Values
                  <br />
                </div>
              </div>
              <div
                id="w-node-bf6addb5-08ab-5e25-d013-79ad8d64aade-119d1173"
                className="w-layout-grid info-values-grid"
              >
                {values.map((value, i) => (
                  <div key={value.number} id={valueNodeIds[i]} className="info-values-item">
                    <div className={`headline size-6xl ${value.colorClass}`}>{value.number}</div>
                    <div className="spacer-s"></div>
                    <div className="headline size-xl">{value.title}</div>
                    <div className="spacer-xs"></div>
                    <div className="text size-lg">{value.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="spacer-xl"></div>
        </div>
      </div>
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="w-layout-grid grid-14">
            <div id="w-node-_3c777035-a7a3-69b3-55e1-49caf9366f2c-f9366f29">
              <img
                src="/images/Info-PhotoGrid-01.webp"
                loading="lazy"
                decoding="async"
                alt=""
                className="image-photogrid-image"
              />
            </div>
            <div
              id="w-node-_3c777035-a7a3-69b3-55e1-49caf9366f2e-f9366f29"
              className="w-layout-grid grid-13"
            >
              <img
                src="/images/Info-PhotoGrid-02.webp"
                loading="lazy"
                decoding="async"
                id="w-node-_3c777035-a7a3-69b3-55e1-49caf9366f2f-f9366f29"
                alt=""
                className="image-photogrid-image"
              />
              <img
                src="/images/Info-PhotoGrid-03.webp"
                loading="lazy"
                decoding="async"
                id="w-node-_3c777035-a7a3-69b3-55e1-49caf9366f30-f9366f29"
                alt=""
                className="image-photogrid-image"
              />
            </div>
          </div>
        </div>
        <div className="spacer-xl"></div>
      </div>
      <div className="info-experience">
        <div id="experience" className="section-padding">
          <div className="container-width w-container">
            <div className="w-layout-grid grid-globalgrid">
              <div
                id="w-node-_9aa4f155-00c4-41af-4e0a-ce7347757213-119d1173"
                className="info-sectionheadline"
              >
                <div className="headline size-4xl">Experience</div>
              </div>
              <div
                id="w-node-e85cc7f3-5f75-6770-8076-762620c53f54-119d1173"
                className="info-list"
              >
                {experience.map((item) => (
                  <div
                    key={`${item.years}-${item.company}`}
                    id="w-node-_2cfe37f0-1ed0-500f-a499-2b4208b1bdb5-08b1bdb5"
                    className="info-experience-item"
                  >
                    <div
                      id="w-node-_2cfe37f0-1ed0-500f-a499-2b4208b1bdb6-08b1bdb5"
                      className="w-layout-grid info-experience-grid"
                    >
                      <div
                        id="w-node-_2cfe37f0-1ed0-500f-a499-2b4208b1bdb7-08b1bdb5"
                        className="mono size-sm"
                      >
                        {item.years}
                      </div>
                      <div
                        id="w-node-_2cfe37f0-1ed0-500f-a499-2b4208b1bdb9-08b1bdb5"
                        className="div-block-20"
                      >
                        <div
                          id="w-node-_2cfe37f0-1ed0-500f-a499-2b4208b1bdba-08b1bdb5"
                          className="headline size-base"
                        >
                          {item.company}
                        </div>
                        <div className="mono size-xs textcolor-slate-50">{item.role}</div>
                      </div>
                      <div
                        id="w-node-_2cfe37f0-1ed0-500f-a499-2b4208b1bdbe-08b1bdb5"
                        className="mono size-xs textcolor-slate-50 align-right"
                      >
                        {item.location}
                      </div>
                    </div>
                    <div className="spacer-xs"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="spacer-xl"></div>
        </div>
      </div>
      <div className="image-grid-3x3">
        <div className="section-padding">
          <div className="container-width w-container">
            <div className="image-wrapper img-border-radius">
              <img src="/images/Personal-WoodStreet-Office-5505.webp" loading="lazy" decoding="async" alt="" />
            </div>
          </div>
        </div>
        <div className="spacer-m"></div>
        <div className="spacer-l"></div>
      </div>
      <div className="info-press">
        <div className="section-padding">
          <div className="container-width w-container">
            <div className="w-layout-grid grid-globalgrid">
              <div
                id="w-node-f0a942d9-da29-c644-688a-fdc4253bdfb3-119d1173"
                className="info-sectionheadline"
              >
                <div id="press-mentions" className="headline size-4xl">
                  Press &amp;
                  <br />
                  Mentions
                </div>
              </div>
              <div
                id="w-node-f0a942d9-da29-c644-688a-fdc4253bdfb6-119d1173"
                className="info-list"
              >
                {press.map((item) => (
                  <div
                    key={item.label}
                    id="w-node-e0c3cd4c-36ed-6b14-3501-2ad50844f627-0844f627"
                    className="info-press-item"
                  >
                    <div
                      id="w-node-e0c3cd4c-36ed-6b14-3501-2ad50844f628-0844f627"
                      className="w-layout-grid info-press-grid"
                    >
                      <div
                        id="w-node-_0114b457-0550-9040-0af1-1194fb46e958-0844f627"
                        className="info-press-headline"
                      >
                        <div
                          id="w-node-e0c3cd4c-36ed-6b14-3501-2ad50844f629-0844f627"
                          className="headline size-base"
                        >
                          {item.heading}
                        </div>
                      </div>
                      <div
                        id="w-node-be2cd2d2-3195-c60a-4641-f813827dae9f-0844f627"
                        className="info-press-details"
                      >
                        <a
                          id="w-node-_8a6480a6-8c70-648f-9134-0521ee1f7044-0844f627"
                          href={item.href}
                          target="_blank"
                          className="mono size-sm info-press-link"
                        >
                          {item.label}
                        </a>
                        <div
                          id="w-node-e0c3cd4c-36ed-6b14-3501-2ad50844f62d-0844f627"
                          className="mono size-sm info-press-link align-right"
                        >
                          ↗
                        </div>
                      </div>
                    </div>
                    <div className="spacer-xs"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="spacer-xl"></div>
        </div>
      </div>
      <div className="image-fullviewport">
        <div className="image-fullviewport-container">
          <img
            src="/images/Personal-WoodStreet-Office-5442.webp"
            loading="lazy"
            decoding="async"
            alt=""
            className="image-fullviewport-image"
          />
        </div>
        <div className="spacer-xl"></div>
      </div>
      <div id="colophon" className="info-colophon">
        <div className="section-padding">
          <div className="container-width w-container">
            <div className="w-layout-grid grid-globalgrid">
              <div
                id="w-node-_8fedec04-8a1c-ded3-2bfb-c0ef4274beda-119d1173"
                className="info-sectionheadline"
              >
                <div className="headline size-4xl">Colophon</div>
              </div>
              <div
                id="w-node-_54e469f1-76e1-f751-4280-3b38982d4f2e-119d1173"
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
      <div className="image-grid-3x3">
        <div className="section-padding">
          <div className="container-width w-container">
            <div className="image-wrapper img-border-radius">
              <img src="/images/Info-Photo-03.webp" loading="lazy" decoding="async" alt="" />
            </div>
          </div>
        </div>
        <div className="spacer-m"></div>
        <div className="spacer-l"></div>
      </div>
    </>
  );
}
