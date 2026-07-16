import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  openGraph: { title: "Shop" },
  twitter: { title: "Shop" },
};

export default function ShopPage() {
  return (
    <div className="section-padding">
      <div className="container-width w-container">
        <div className="spacer-xl"></div>
        <h1 className="size-5xl">Coming soon!</h1>
        <div className="spacer-2xl"></div>
      </div>
    </div>
  );
}
