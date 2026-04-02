"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  title: string;
  year: string | null;
  description: string;
  cover_image_url: string | null;
  image_url: string | null;
  links: { type: string; url: string }[] | null;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

function htmlToText(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const doc = new DOMParser().parseFromString(trimmed, "text/html");
    return (doc.body.textContent ?? "").replace(/\s+/g, " ").trim();
  } catch {
    return trimmed.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
}

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [projRes, expRes] = await Promise.all([
        supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("experiences")
          .select("*")
          .eq("type", "work")
          .order("created_at", { ascending: false }),
      ]);

      if (projRes.data) setProjects(projRes.data);
      if (expRes.data) setExperiences(expRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-white" />
      </div>
    );
  return (
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-16"
      >
        <section className="flex flex-col gap-8">
          <h1 className="text-3xl font-bold tracking-tight">Work</h1>
          <p className="text-lg text-muted">
            A collection of projects I&apos;ve built and teams I&apos;ve led
            over the years.
          </p>

          <div className="grid gap-4">
            {projects.map((project) => {
              const href =
                project.links?.[0]?.url ||
                project.cover_image_url ||
                project.image_url ||
                "#";
              const isExternal = href.startsWith("http");
              const cover = project.cover_image_url || project.image_url;

              return (
                <Link
                  key={project.id}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:bg-border/40"
                >
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-border">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-muted">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{project.title}</span>
                      {project.year && (
                        <span className="text-xs text-muted">
                          {project.year}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted dark:text-zinc-400">
                      {htmlToText(project.description)}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted transition-colors group-hover:text-foreground"
                  />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <div className="flex flex-col gap-8">
            {experiences.map((exp, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{exp.company}</h3>
                  <span className="text-sm text-muted">{exp.period}</span>
                </div>
                <p className="text-sm font-medium text-muted">{exp.role}</p>
                <p className="text-sm text-muted">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
