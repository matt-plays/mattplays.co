import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style Guide",
  openGraph: { title: "Style Guide" },
  twitter: { title: "Style Guide" },
};

export default function StyleGuidePage() {
  return (
    <>
      <div className="style-guide-typography">
        <div className="container-width w-container">
          <div className="w-layout-grid grid">
            <h1>Heading 1</h1>
            <h2 className="heading-6">Heading 2</h2>
            <h3 className="heading-7">Heading 3</h3>
            <h4 className="heading-8">Heading 4</h4>
            <div id="w-node-_13495e25-789d-f35a-fad2-fcfea00e19c5-119d1176" className="overline">
              This is some text inside of a div block.
            </div>
            <p
              id="w-node-dccb815f-0a16-68ca-e023-a5a70f5b2016-119d1176"
              className="paragraph size-xl"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
              eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum
              nulla, ut commodo diam libero vitae erat. <a href="#">Aenean</a> faucibus nibh et
              justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
            </p>
            <ul
              id="w-node-fca9daff-01a5-2798-821d-3fbe74f7e516-119d1176"
              role="list"
              className="list"
            >
              <li className="list-item">
                <p className="text-style-text-small size-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
                  in{" "}
                </p>
              </li>
              <li>
                <p className="text-style-text-small size-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
                  in{" "}
                </p>
              </li>
              <li>
                <p className="text-style-text-small size-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
                  in{" "}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="changelog-rte w-richtext">
          <h2>What&rsquo;s a Rich Text element?</h2>
          <p>
            The rich text element allows you to create and format headings, paragraphs,
            blockquotes, images, and video all in one place instead of having to add and format
            them individually. Just double-click and easily create content.
          </p>
          <ul role="list">
            <li>Testing</li>
          </ul>
          <h4>Static and dynamic content editing</h4>
          <p>
            A rich text element can be used with static or dynamic content. For static content,
            just drop it into any page and begin editing. For dynamic content, add a rich text
            field to any collection and then connect a rich text element to that field in the
            settings panel. Voila!
          </p>
          <h4>How to customize formatting for each rich text</h4>
          <p>
            Headings, paragraphs, blockquotes, figures, images, and figure captions can all be
            styled after a class is added to the rich text element using the &quot;When inside
            of&quot; nested selector system.
          </p>
        </div>
      </div>
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="w-layout-grid grid-globalgrid">
            <div
              id="w-node-a21aa5a4-50e6-0517-aef1-751e4529e3a5-119d1176"
              className="utility-colorhuecolumn"
            >
              <div className="clay-50"></div>
              <div className="clay-100"></div>
              <div className="clay-200"></div>
              <div className="div-block-15"></div>
              <div className="div-block-14"></div>
              <div className="div-block-13"></div>
              <div className="div-block-12"></div>
              <div className="div-block-11"></div>
              <div className="div-block-10"></div>
              <div className="clay-900"></div>
            </div>
          </div>
        </div>
        <div className="spacer-xl"></div>
      </div>
      <div className="style-guide">
        <div className="style-guide-animation p-bottom-l">
          <div className="container-width w-container">
            <div className="w-layout-grid grid-12">
              <div
                id="w-node-_23f84df3-f1c6-6b0d-38d4-8e4ca97496d2-119d1176"
                className="image-wrapper img-border-radius"
              >
                <img
                  src="/images/hs-atg-brandboard.webp"
                  loading="lazy"
                  alt=""
                  className="animation-image-zoom"
                />
              </div>
              <div
                id="w-node-_23f84df3-f1c6-6b0d-38d4-8e4ca97496d4-119d1176"
                className="image-wrapper img-border-radius animation-viewport-fade"
              >
                <img src="/images/hs-atg-brandboard.webp" loading="lazy" alt="" />
              </div>
              <div
                id="w-node-_3fe1a0f2-9079-9998-3cfe-67cd854e25d2-119d1176"
                className="img-border-radius"
              >
                <img src="/images/hs-atg-brandboard.webp" loading="lazy" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
