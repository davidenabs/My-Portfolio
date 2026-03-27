"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Post {
  id: string;
  title: string;
  published_at: string;
  description: string;
  slug: string;
  featured_image_url: string | null;
}

export default function Writing() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from("writing")
        .select("*")
        .order("published_at", { ascending: false });

      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
      </div>
    );
  return (
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-12"
      >
        <section className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold tracking-tight">My Thoughts</h1>
          <p className="text-lg text-muted">
            Thoughts on software engineering, strategy, and community building.
          </p>
        </section>

        <div className="flex flex-col gap-12">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/thoughts/${post.slug}`}
              className="group flex flex-col gap-3 border-b border-border pb-8 transition-colors"
            >
              {/* {post.featured_image_url && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-border">
                  <Image
                    src={post.featured_image_url}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 672px, 100vw"
                  />
                </div>
              )} */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium transition-colors group-hover:text-muted">
                  {post.title}
                </h3>
                <span className="text-sm text-muted">{post.published_at}</span>
              </div>
              <p className="text-muted">{post.description}</p>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
