export const siteConfig = {
  name: "David Enabulele",
  title: "David Enabulele | Full-stack Software Developer & Strategist",
  description:
    "Portfolio of David Enabulele, a full-stack software developer, strategist, and community builder.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://davidenabs.com",
  locale: "en_US",
  ogImage: "/davidenabs.jpeg",
  twitterHandle: "@davidenabs",
};

export function getSiteUrl() {
  try {
    return new URL(siteConfig.url);
  } catch {
    return new URL("https://davidenabs.com");
  }
}
