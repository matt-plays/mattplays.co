import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative South 2025",
  openGraph: { title: "Creative South 2025" },
  twitter: { title: "Creative South 2025" },
};

export default function CreativeSouth2025Page() {
  return (
    <>
      <div className="creditgrid">
        <div className="section-padding">
          <div className="container-width w-container">
            <div className="spacer-xl"></div>
            <div className="w-layout-grid grid-globalgrid">
              <div
                id="w-node-_8ba8e993-c01e-d0a5-c936-cc452189c3fd-769d64a9"
                className="textsection-container"
              >
                <h1>Sup, y&rsquo;all 👋 </h1>
                <div
                  id="w-node-_8ba8e993-c01e-d0a5-c936-cc452189c400-769d64a9"
                  className="spacer-xs"
                ></div>
                <div className="text size-lg">
                  So great meeting you! Wanna stay in touch? Connect with me on{" "}
                  <a href="https://instagram.com/mattplays.co" target="_blank">
                    Instagram
                  </a>{" "}
                  or{" "}
                  <a href="https://www.linkedin.com/in/mattplays/" target="_blank">
                    LinkedIn
                  </a>
                  , so I can follow you back. You can also sign up for my newsletter or check out
                  my work below. See you out there!{" "}
                </div>
              </div>
              <div
                id="w-node-af9332b2-74a1-ea3f-cbcc-381fe581d38e-769d64a9"
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
                    className="text-field-2 input-light w-input"
                    maxLength={256}
                    name="email_address"
                    data-name="email_address"
                    placeholder="Drop your email address here"
                    type="email"
                    id="email_address-6"
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
            <div className="spacer-2xl"></div>
          </div>
        </div>
      </div>
      <div className="section-padding">
        <div className="container-width w-container">
          <div className="collectionlistwrapper is-list w-dyn-list">
            <div role="list" className="collectionlist is-list w-dyn-items">
              <div
                id="w-node-_9cba2268-2fec-28ce-38b7-0d6298a9b775-98a9b771"
                role="listitem"
                className="collectionitem is-list w-dyn-item"
              >
                <a href="#" className="link-block w-inline-block">
                  <div className="projectlist-item">
                    <div className="grid-globalgrid isprojectlist">
                      <div
                        id="w-node-_7d222553-fc4d-99e9-2010-29c082e265a3-98a9b771"
                        className="projectlist-accent"
                      >
                        <div className="projectlist-hoverrule"></div>
                        <div className="projectlist-triangle w-embed">
                          <svg
                            width="14"
                            height="16"
                            viewBox="0 0 14 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.5 7.13397C14.1667 7.51887 14.1667 8.48112 13.5 8.86602L1.5 15.7942C0.833333 16.1791 -7.73604e-07 15.698 -7.39955e-07 14.9282L-1.34273e-07 1.0718C-1.00623e-07 0.301996 0.833333 -0.17913 1.5 0.20577L13.5 7.13397Z"
                              fill="CurrentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div
                        id="w-node-_9cba2268-2fec-28ce-38b7-0d6298a9b77a-98a9b771"
                        className="projectlist-item-details"
                      >
                        <div className="projectgrid-item-description">
                          <div
                            id="w-node-_9cba2268-2fec-28ce-38b7-0d6298a9b77c-98a9b771"
                            className="headline size-3xl textcolor-headline w-dyn-bind-empty"
                          ></div>
                          <div className="detail size-xs w-dyn-bind-empty"></div>
                        </div>
                      </div>
                      <div
                        id="w-node-_9cba2268-2fec-28ce-38b7-0d6298a9b77e-98a9b771"
                        className="projectlist-item-button"
                      >
                        <div className="text size-xl projectlist-item-buttonarrow">↗</div>
                      </div>
                    </div>
                    <div className="projectlist-hovercard elevation-m">
                      <div className="projectlist-thumb-container">
                        <img src="" loading="lazy" alt="" className="projectlist-thumb w-dyn-bind-empty" />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="w-dyn-empty">
              <div>No items found.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="tag-viewport">
        <div className="hover-tag">
          <div className="hover-text overline size-xs">Coming Soon</div>
        </div>
      </div>
    </>
  );
}
