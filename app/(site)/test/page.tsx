import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test",
  openGraph: { title: "Test" },
  twitter: { title: "Test" },
};

/**
 * Webflow's /test page is a scratch page whose entire body is a copy of the
 * global footer section; it is ported verbatim as the page content (the
 * layout's real footer still renders below it, matching how a nav/footer-less
 * Webflow page behaves in the new chrome).
 */
export default function TestPage() {
  return (
    <div className="section-padding footer">
      <div className="container-width w-container">
        <div className="spacer-l"></div>
        <div className="div-block-17">
          <a href="/" className="footer-logo-link w-inline-block">
            <img src="/images/Portfolio-Logo.gif" loading="lazy" decoding="async" alt="" />
          </a>
        </div>
        <div className="spacer-l"></div>
        <div className="grid-globalgrid">
          <div
            id="w-node-_56276552-c4f7-4a54-b549-c58d87e310f9-9fe1e305"
            className="footer-navlinks-container"
          >
            <a href="/work" className="headline size-3xl footer-navlinks">
              Work
            </a>
            <a href="/info" className="headline size-3xl footer-navlinks">
              Info
            </a>
            <a href="/changelog" className="headline size-3xl footer-navlinks disabled">
              Changelog
            </a>
          </div>
          <div
            id="w-node-_2d1134b2-e342-3e1d-be34-df3b8e35b2c5-8e35b2c5"
            className="form-block-2 w-form"
          >
            <div className="text-block-2 size-xs">
              Stay up to date with my newsletter, &ldquo;One Cool Thing&rdquo;
            </div>
            <form
              id="email-form"
              name="email-form"
              data-name="Email Form"
              action="https://app.kit.com/forms/7829009/subscriptions"
              method="post"
              className="form-2"
            >
              <input
                className="text-field-2 w-input"
                maxLength={256}
                name="email_address"
                data-name="email_address"
                placeholder="Drop your email address here"
                type="email"
                id="email_address-5"
                required
              />
              <input
                type="submit"
                data-wait="Please wait..."
                className="submit-button-2 w-button"
                value="Subscribe"
              />
            </form>
            <div className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
        <div className="spacer-l"></div>
        <div className="horizontalrule"></div>
        <div className="spacer-l"></div>
        <div className="w-layout-grid grid-globalgrid footer">
          <h6
            id="w-node-_24f7c769-37d4-525a-632b-059b9fe1e308-9fe1e305"
            className="footer-heading size-xs overline"
          >
            Connect
          </h6>
          <h6
            id="w-node-b7fa874c-f687-02bc-7dad-472d5f0601da-9fe1e305"
            className="footer-heading size-xs overline"
          >
            Explore
          </h6>
          <h6
            id="w-node-_24f7c769-37d4-525a-632b-059b9fe1e30a-9fe1e305"
            className="footer-heading size-xs overline"
          >
            Follow
          </h6>
          <div
            id="w-node-_24f7c769-37d4-525a-632b-059b9fe1e30f-9fe1e305"
            className="footer-text-links"
          >
            <a href="mailto:matt@mattplays.co" className="text-link size-xs">
              Contact
            </a>
            <a href="https://www.linkedin.com/in/mattplays" target="_blank" className="text-link size-xs">
              LinkedIn
            </a>
            <a href="mailto:matt@mattplays.co" className="text-link size-xs">
              Email
            </a>
          </div>
          <div
            id="w-node-_24f7c769-37d4-525a-632b-059b9fe1e316-9fe1e305"
            className="footer-text-links"
          >
            <a href="https://www.instagram.com/mattplays.co/" target="_blank" className="text-link size-xs">
              Instagram
            </a>
            <a href="https://dribbble.com/mattplays" target="_blank" className="text-link size-xs">
              Dribbble
            </a>
            <a href="https://twitter.com/mattplays_" target="_blank" className="text-link size-xs">
              Twitter
            </a>
          </div>
          <div
            id="w-node-_1345a412-1234-b026-6214-27c6c1702874-9fe1e305"
            className="footer-text-links"
          >
            <a href="/changelog" className="text-link size-xs">
              Changelog
            </a>
            <a href="/info#colophon" className="text-link size-xs">
              Colophon
            </a>
            <a href="/info#press-mentions" className="text-link size-xs disabled">
              Press
            </a>
          </div>
          <div
            id="w-node-_620daf10-c57e-3ccf-efae-1325fc245420-9fe1e305"
            className="footer--tagline--container"
          >
            <img
              src="/images/portfolio-footer-arrow.svg"
              loading="lazy"
              decoding="async"
              alt=""
              className="footer--tagline--arrow"
            />
            <h6
              id="w-node-_24f7c769-37d4-525a-632b-059b9fe1e30c-9fe1e305"
              className="footer-heading size-xs footer--tagline--text overline"
            >
              made remotely in new england
            </h6>
            <img
              src="/images/portfolio-footer-logo-new-eng.webp"
              loading="lazy"
              decoding="async"
              alt=""
              className="footer--tagline--new-eng"
            />
          </div>
        </div>
        <div className="spacer-l"></div>
      </div>
    </div>
  );
}
