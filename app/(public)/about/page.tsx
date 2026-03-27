"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function About() {
  const [skillsByCategory, setSkillsByCategory] = useState<
    Record<string, string[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      const { data } = await supabase
        .from("skills")
        .select("*")
        .order("category", { ascending: true });
      if (data) {
        const grouped = data.reduce((acc: Record<string, string[]>, skill) => {
          const cat = skill.category || "Other";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(skill.name);
          return acc;
        }, {});
        setSkillsByCategory(grouped);
      }
      setLoading(false);
    }
    fetchSkills();
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-white"></div>
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
          <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted dark:text-zinc-400">
            <p>
              I&apos;m David Enabulele, a full-stack software developer,
              strategist, and community builder. My passion lies in bringing
              ideas to life, from the initial concept to a successful launch.
            </p>
            <p>
              Specializing in the Web3 ecosystem, I&apos;ve had the opportunity
              to lead teams through complex blockchain projects, building
              scalable decentralized products and crafting marketing strategies
              that drive real, measurable growth.
            </p>
            <p>
              I believe that languages and frameworks are tools, and I choose
              the one that best fits the problem at hand. My expertise spans
              from full-stack development with React and Next.js to secure smart
              contract engineering with Solidity and Ethereum.
            </p>
            <p>
              Beyond my technical work, I&apos;m deeply involved in writing,
              marketing, and building communities that connect people with
              purpose. I thrive where creativity meets execution.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-8 pt-8">
          <h2 className="text-2xl font-semibold">Technical Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <StackCategory key={category} title={category} items={items} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-8 pt-8">
          <h2 className="text-2xl font-semibold">Connect</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              className="flex items-center gap-2 rounded-xl border border-zinc-100 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <Github size={20} className="text-muted" />
              <span className="font-medium">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="flex items-center gap-2 rounded-xl border border-zinc-100 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <Twitter size={20} className="text-muted" />
              <span className="font-medium">Twitter</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="flex items-center gap-2 rounded-xl border border-zinc-100 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <Linkedin size={20} className="text-muted" />
              <span className="font-medium">LinkedIn</span>
            </Link>
            <Link
              href="mailto:hello@David.dev"
              className="flex items-center gap-2 rounded-xl border border-zinc-100 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <Mail size={20} className="text-muted" />
              <span className="font-medium">Email</span>
            </Link>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

function StackCategory({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-md"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
