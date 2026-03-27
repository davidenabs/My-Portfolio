"use client";

import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Post = {
  title: string;
  published_at: string;
  description: string | null;
  featured_image_url: string | null;
  content_html: string | null;
};

export default function WritingPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      setError(null);
      const { data, error } = await supabase
        .from("writing")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setPost(data);
      setLoading(false);
    }

    void fetchPost();
  }, [slug]);

  const sanitized = useMemo(() => {
    const html = post?.content_html || "";
    return DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
    });
  }, [post?.content_html]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-2xl px-6 pb-24">
        <Link
          href="/thoughts"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted transition-colors hover:bg-border/40 hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to writing
        </Link>

        <div className="mt-6 rounded-2xl border border-border bg-background p-6">
          <div className="text-sm font-semibold text-foreground">
            {error ? "Couldn’t load this post" : "Post not found"}
          </div>
          <div className="mt-2 text-sm text-muted">
            {error || "The link may be wrong, or the post was removed."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <div className="flex flex-col gap-8">
        <div className="pt-2">
          <Link
            href="/thoughts"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted transition-colors hover:bg-border/40 hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to writing
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
          <p className="text-sm text-muted">{post.published_at}</p>
          {post.description && (
            <p className="text-lg text-muted">{post.description}</p>
          )}
        </div>

        {post.featured_image_url && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-border">
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 672px, 100vw"
              priority
            />
          </div>
        )}

        <div
          className="rich-content"
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />
      </div>
    </div>
  );
}
