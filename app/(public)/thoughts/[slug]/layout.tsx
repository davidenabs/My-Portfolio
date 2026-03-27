import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { getSiteUrl, siteConfig } from "@/lib/site";

type Params = {
  slug: string;
};

type WritingRow = {
  title: string;
  published_at: string | null;
  description: string | null;
  featured_image_url: string | null;
  slug: string;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = params;
  const siteUrl = getSiteUrl();

  const { data } = await supabase
    .from("writing")
    .select("title,published_at,description,featured_image_url,slug")
    .eq("slug", slug)
    .maybeSingle()
    .returns<WritingRow>();

  if (!data) {
    return {
      title: "Post not found",
      description: "This post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = data.title;
  const description = data.description || siteConfig.description;
  const imageUrl = data.featured_image_url || siteConfig.ogImage;
  const canonical = new URL(`/thoughts/${data.slug}`, siteUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      publishedTime: data.published_at || undefined,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitterHandle,
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
