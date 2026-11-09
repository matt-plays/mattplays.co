/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import ImageSection from "@/components/ImageSection";
import InfoPhotoStrip from "@/components/InfoPhotoStrip";
import ListSection, {
  ExperienceRow,
  PressRow,
  Value,
  ValueGrid,
} from "@/components/ListSection";

/**
 * The About page, from the 2026 design (2661:5357).
 *
 * The file stacks content sections and photography alternately — bio, strip,
 * values, collage, experience, photo, press, photo, colophon, photo — and
 * three of those content sections are the same ListSection with different
 * rows in its content column.
 *
 * The copy below is the site's, not the file's: the 2026 draft still has Help
 * Scout as the current role, lorem bodies under the values, and no Watershed
 * row in the experience list. Where the two disagree the real copy wins.
 */

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

const experience = [
  { years: "2026 – Present", company: "Watershed", role: "Principal Brand Designer", location: "Remote" },
  { years: "2022 – 2025", company: "Help Scout", role: "Creative Director", location: "Remote" },
  { years: "2022 – 2022", company: "Thrive Global", role: "Staff Designer → Creative Director", location: "Remote" },
  { years: "2019 – 2021", company: "Help Scout", role: "Senior Brand Designer → Lead Brand Designer", location: "Remote" },
  { years: "2015 – 2019", company: "Burton Snowboards", role: "Digital Designer → Lead Designer", location: "Burlington, VT" },
  { years: "2012 – 2015", company: "HubSpot", role: "Design & Video Associate", location: "Cambridge, MA" },
  { years: "2008 – 2020", company: "Icon Snowskates", role: "Co-founder & Creative Lead", location: "New England" },
  { years: "2006 – Present", company: "Freelance & Self-directed Work", role: "Designer & Art Director", location: "New England" },
];

/**
 * The marks drawn under the experience list. The file shows five, but two of
 * its slots point at the same prAna artwork — so the fifth is still waiting
 * for a brand and only these four are real.
 *
 * Each is drawn as a mask filled with currentColor rather than an <img>: an
 * <img> of an SVG cannot inherit ink, so these would stay near-black in dark
 * mode. Masking keeps one file per mark and lets both modes work.
 */
const LOGOS = [
  { name: "Burton Snowboards", file: "logo-burton.svg", ratio: "252 / 39.39" },
  { name: "Help Scout", file: "logo-help-scout.svg", ratio: "252 / 48" },
  { name: "prAna", file: "logo-prana.svg", ratio: "252 / 58.5" },
  { name: "HubSpot", file: "logo-hubspot.svg", ratio: "252 / 69.25" },
];

const values = [
  {
    number: "01",
    title: "Work wherever",
    body: "Good work happens anywhere. With the right remote environment, people can find focus, foster real connection, and do their best work.",
  },
  {
    number: "02",
    title: "Sweat the delivery",
    body: "Follow through on craft, from creative direction right down to production cuts. It matters most wherever work comes to life.",
  },
  {
    number: "03",
    title: "Bring your whole self",
    body: "Tap into your own experiences & perspectives and be curious about what others bring to the table. Projects are better when woven.",
  },
  {
    number: "04",
    title: "Create a safe space",
    body: "The best work comes from creatively safe work environments. Make it feel okay to be wrong before we’re right. For you and for others.",
  },
  {
    number: "05",
    title: "Trust the process",
    body: "Process creates room for discovery. Even the most complex projects become possible by breaking things up into manageable chunks.",
  },
  {
    number: "06",
    title: "Take the scenic route",
    body: "Tune out. Free yourself up to have epiphanies when you least expect. Take back what you learn and trust that there’s productivity in rest.",
  },
];

const press = [
  { source: "Help Scout", href: "https://insidemarketingdesign.co/at/help-scout", label: "Inside Marketing Design at Help Scout" },
  { href: "https://www.typewolf.com/site-of-the-day/in-the-works", label: "Typewolf Site of the Day" },
  { href: "https://onepagelove.com/against-the-grain", label: "One Page Love" },
  { href: "https://youtu.be/MgM7Lad8TNw", label: "Figma Remote Design Critiques" },
  { source: "Type Hike", href: "http://typehike.com/exhibitions/", label: "Poler Portland & Laguna Exhibits" },
  { href: "https://www.fastcodesign.com/3064964/60-designers-create-posters-for-their-favorite-national-parks", label: "Fast Company Design" },
  { href: "http://gearpatrol.com/2016/10/27/type-hike-national-parks-posters/", label: "Gear Patrol" },
  { href: "https://huckberry.com/store/type-hike", label: "Huckberry" },
  { href: "http://www.typeroom.eu/article/type-hike-typography-service-great-wide-usa-nature", label: "Typeroom" },
  { href: "http://typehike.com/exhibitions/2017/4/26/rei", label: "REI" },
  { source: "Icon Snowskates", href: "#", label: "Honorable Mention on The Berrics" },
  { href: "http://www.webdesign-inspiration.com/web-design/iconsnowskates-com-20500", label: "Webdesign Inspiration" },
  { href: "https://ecomm.design/site/icon-snowskates/", label: "eComm Design" },
];

export default function InfoPage() {
  return (
    <>
      {/*
        Bio. The file promotes what used to be the intro line to the page
        headline at the top of the ramp, which is why there is no separate
        "The little bits add up" section above it any more.
      */}
      <section className="about-bio">
        <div className="container-width w-container">
          <p className="overline size-4xl about-bio__eyebrow">Info</p>
          <h1 className="headline size-10xl leading-display about-bio__headline">
            New England-based designer with a thing for skateboarding, rock climbing, and
            chicken parm&rsquo;
          </h1>
          <div className="about-bio__row">
            <div className="about-bio__body">
              <div className="text size-lg about-bio__column">
                <p>
                  I&rsquo;m Matt Plays, a creative director and designer, currently working at{" "}
                  <a href="https://watershed.com" target="_blank" rel="noreferrer">
                    Watershed
                  </a>
                  .
                </p>
                <p>
                  From dialing-in components to setting the tone with a new direction doc, my
                  goal is to craft brands that look the part and live up to their missions. It
                  helps that I&rsquo;ve linked up with <a href="#experience">some good ones</a>.
                </p>
              </div>
              <div className="text size-lg about-bio__column">
                <p>
                  I&rsquo;ve been lucky to get in on{" "}
                  <a href="/work/epicurrence">projects that stoke out the design community</a>,{" "}
                  <a href="/work/icon-snowskates">ship products worldwide</a>, and{" "}
                  <a href="/work/acadia-type-hike">protect public lands</a>.
                </p>
                <p>
                  Most days you can find me outside, tinkering on a project, or being comfy at
                  home. Hopefully basking in the sun to good tunes. See you out there{" "}
                  <sup>☼</sup>
                  <span className="text-span">⛰</span>
                </p>
              </div>
            </div>
            {/* 2:3 in the file; the photograph is square, so it is cropped to
                the shape rather than letterboxed into it. */}
            <div className="about-bio__portrait">
              <img
                src="/images/About-Bio.webp"
                width={790}
                height={790}
                sizes="(max-width: 767px) 100vw, 24vw"
                loading="eager"
                decoding="async"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <InfoPhotoStrip />

      <ListSection label="Values">
        <ValueGrid>
          {values.map((value) => (
            <Value key={value.number} number={value.number} title={value.title}>
              {value.body}
            </Value>
          ))}
        </ValueGrid>
      </ListSection>

      <ImageSection
        layout="collage"
        images={[
          { src: "/images/Info-PhotoGrid-01.webp", width: 1506, height: 1132 },
          { src: "/images/Info-PhotoGrid-02.webp", width: 1006, height: 754 },
          { src: "/images/Info-PhotoGrid-03.webp", width: 564, height: 564 },
        ]}
      />

      <ListSection
        label="Experience"
        id="experience"
        footer={
          <ul className="brand-logos">
            {LOGOS.map((logo) => (
              <li key={logo.file}>
                <span
                  className="brand-logo"
                  role="img"
                  aria-label={logo.name}
                  style={{
                    ["--logo" as string]: `url(/images/${logo.file})`,
                    aspectRatio: logo.ratio,
                  }}
                />
              </li>
            ))}
          </ul>
        }
      >
        {experience.map((item) => (
          <ExperienceRow key={`${item.years}-${item.company}`} {...item} />
        ))}
      </ListSection>

      <ImageSection
        images={[{ src: "/images/Personal-WoodStreet-Office-5505.webp", width: 2000, height: 1333 }]}
      />

      <ListSection label="Press & Mentions" id="press-mentions">
        {press.map((item) => (
          <PressRow key={item.label} source={item.source} href={item.href} label={item.label} />
        ))}
      </ListSection>

      <ImageSection
        layout="bleed"
        ratio="4 / 3"
        images={[{ src: "/images/Personal-WoodStreet-Office-5442.webp", width: 2000, height: 1333 }]}
      />

      {/*
        Colophon. A display headline rather than an overline, in a narrower
        column than the ListSection label — so it is its own shape, not a
        fourth list.

        NOTE: the copy below is still the Webflow-era colophon. This build is
        Next.js and Sanity, and the type is Universal Sans Display, FK Grotesk
        Mono and Spezia Extended — rewriting it is a content call.
      */}
      <section id="colophon" className="about-colophon">
        <div className="container-width w-container">
          <div className="about-colophon__grid">
            <h2 className="headline size-8xl leading-display about-colophon__headline">
              Colophon
            </h2>
            <div className="text size-2xl about-colophon__body">
              <p>
                This site uses{" "}
                <a href="https://sharptype.co/typefaces/sharp-grotesk/" target="_blank" rel="noreferrer">
                  Sharp Grotesk
                </a>{" "}
                (Semibold 23 for headlines and Book 20 for sub-headlines),{" "}
                <a href="https://klim.co.nz/retail-fonts/soehne/" target="_blank" rel="noreferrer">
                  Söhne Buch
                </a>{" "}
                for body copy, and{" "}
                <a href="https://klim.co.nz/retail-fonts/soehne-mono/" target="_blank" rel="noreferrer">
                  Söhne Mono
                </a>{" "}
                for details.
              </p>
              <p>
                The underlying design system and page templates were created in{" "}
                <a href="https://figma.com/" target="_blank" rel="noreferrer">
                  Figma
                </a>
                . Pages and components were built using{" "}
                <a href="https://webflow.grsm.io/s5ae778jzhz7" target="_blank" rel="noreferrer">
                  Webflow
                </a>{" "}
                with primarily no-code tools, a small amount of custom CSS, and data from CMS
                collections. It&rsquo;s hosted by Webflow, too.
              </p>
              <p>
                The (soon-to-be launched) email list is managed through{" "}
                <a href="https://convertkit.com/" target="_blank" rel="noreferrer">
                  ConvertKit
                </a>{" "}
                and basic site metrics are provided by{" "}
                <a href="https://analytics.google.com/" target="_blank" rel="noreferrer">
                  Google Analytics
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <ImageSection
        images={[{ src: "/images/Info-Photo-03.webp", width: 2000, height: 1125 }]}
      />
    </>
  );
}
