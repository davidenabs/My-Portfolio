import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A collection of projects David Enabulele has built and teams he’s led over the years.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    type: "website",
    url: "/work",
    title: `Work | ${siteConfig.name}`,
    description:
      "A collection of projects David Enabulele has built and teams he’s led over the years.",
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    title: `Work | ${siteConfig.name}`,
    description:
      "A collection of projects David Enabulele has built and teams he’s led over the years.",
    images: [siteConfig.ogImage],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

