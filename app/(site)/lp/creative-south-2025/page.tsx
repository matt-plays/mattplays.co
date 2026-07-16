import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";
import type { ProjectCard } from "@/components/blocks/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allProjectsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Creative South 2025",
  openGraph: { title: "Creative South 2025" },
  twitter: { title: "Creative South 2025" },
};

export default async function CreativeSouth2025Page() {
  const projects = await sanityFetch<ProjectCard[]>({
    query: allProjectsQuery,
    tags: ["project"],
  });
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
      <ProjectList projects={projects} />
      <div className="tag-viewport">
        <div className="hover-tag">
          <div className="hover-text overline size-xs">Coming Soon</div>
        </div>
      </div>
    </>
  );
}
