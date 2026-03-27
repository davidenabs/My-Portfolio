import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about David Enabulele — a full-stack software developer and strategist.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "profile",
    url: "/about",
    title: `About | ${siteConfig.name}`,
    description:
      "Learn more about David Enabulele — a full-stack software developer and strategist.",
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    title: `About | ${siteConfig.name}`,
    description:
      "Learn more about David Enabulele — a full-stack software developer and strategist.",
    images: [siteConfig.ogImage],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

