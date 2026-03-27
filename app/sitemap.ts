import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { getSiteUrl } from "@/lib/site";

type WritingRow = {
  slug: string;
  published_at: string | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: new URL("/", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/work", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/about", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/thoughts", siteUrl).toString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const { data } = await supabase
    .from("writing")
    .select("slug,published_at")
    .order("published_at", { ascending: false })
    .returns<WritingRow[]>();

  const postRoutes: MetadataRoute.Sitemap = (data ?? [])
    .filter((row) => row.slug)
    .map((row) => {
      const lastModified = row.published_at
        ? new Date(row.published_at)
        : undefined;
      return {
        url: new URL(`/thoughts/${row.slug}`, siteUrl).toString(),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      };
    });

  return [...staticRoutes, ...postRoutes];
}

