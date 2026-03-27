import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thoughts",
  description:
    "Thoughts on software engineering, strategy, and community building.",
  alternates: {
    canonical: "/thoughts",
  },
  openGraph: {
    type: "website",
    url: "/thoughts",
    title: `Thoughts | ${siteConfig.name}`,
    description:
      "Thoughts on software engineering, strategy, and community building.",
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    title: `Thoughts | ${siteConfig.name}`,
    description:
      "Thoughts on software engineering, strategy, and community building.",
    images: [siteConfig.ogImage],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

