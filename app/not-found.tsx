import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Not Found",
  openGraph: { title: "Not Found" },
  twitter: { title: "Not Found" },
};

export default function NotFound() {
  return (
    <SiteChrome>
      <div className="utility-page-wrap">
        <div className="utility-page-content w-form">
          <h2>Page Not Found</h2>
          <div>The page you are looking for doesn&#x27;t exist or has been moved</div>
        </div>
      </div>
    </SiteChrome>
  );
}
