"use client";

import { Subtitle } from "@/components/subtitle";
import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  Twitter,
  Globe,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [projectSheetExpanded, setProjectSheetExpanded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [expRes, eduRes, skillRes, projRes, hackRes] = await Promise.all([
        supabase
          .from("experiences")
          .select("*")
          .eq("type", "work")
          .order("created_at", { ascending: false }),
        supabase
          .from("experiences")
          .select("*")
          .eq("type", "education")
          .order("created_at", { ascending: false }),
        supabase
          .from("skills")
          .select("name")
          .order("category", { ascending: true }),
        supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("hackathons")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      if (expRes.data) setExperiences(expRes.data);
      if (eduRes.data) setEducation(eduRes.data);
      if (skillRes.data) setSkills(skillRes.data.map((s) => s.name));
      if (projRes.data) setProjects(projRes.data);
      if (hackRes.data) setHackathons(hackRes.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-white"></div>
      </div>
    );
  }

  const closeProjectSheet = () => {
    setProjectSheetExpanded(false);
    setActiveProject(null);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <motion.section
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="flex flex-col gap-10"
      >
        {/* Hero Section */}
        <motion.div variants={fadeInUp} className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Hi, I&apos;m David 👋
              </h1>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                I work with founders and businesses to build scalable products,
                optimize systems, and bring ideas to life with clarity and
                precision.
              </p>
            </div>

            <div>
              <Image
                className="aspect-square h-fullw-full rounded-full"
                alt="David Enabs"
                src="/davidenabs.jpeg"
                width={250}
                height={250}
              />
            </div>
          </div>
        </motion.div>

        {/* About Short */}
        <Section title="About">
          <div className="text- leading-relaxed text-zinc-600 dark:text-zinc-600 space-y-2 -mt-5">
            <p>
              I&apos;m a passionate developer with over 5 years of experience
              creating digital solutions that combine beautiful design with
              robust functionality.
            </p>
            <p>
              I build tech that solves real problems and enhances user
              experiences. From crafting smooth UIs in frontend frameworks to
              architecting scalable backends, I focus on purpose-driven
              development. Whether it&apos;s dynamic recommendations, custom SSO
              systems, or seamless payments, I bring creativity and
              functionality to every project.
            </p>
            <p>
              When I&apos;m not coding, you can find me exploring new
              technologies, contributing to open-source projects, or sharing
              knowledge with the developer community.
            </p>
          </div>
        </Section>

        {/* Work Experience */}
        <Section title="Work Experience">
          <div className="flex flex-col gap-8">
            {experiences.map((item, index) => (
              <ExperienceItem key={index} {...item} />
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section title="Education">
          <div className="flex flex-col gap-8">
            {education.map((item, index) => (
              <ExperienceItem key={index} {...item} />
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((item) => (
              <div
                key={item}
                className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </Section>

        {/* My Projects */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center gap-4 text-center pt-12 pb-8"
        >
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-background">
            My Projects
          </span>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Check out my latest work
          </h2>
          <p className="max-w-[600px] text-lg text-zinc-500 dark:text-zinc-400">
            I&apos;ve worked on a variety of projects, from simple websites to
            complex web applications. Here are a few of my favorites.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              onOpen={() => {
                setProjectSheetExpanded(false);
                setActiveProject(project);
              }}
            />
          ))}
        </motion.div>

        {/* Hackathons */}
        {/* <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center gap-4 text-center pt-12 pb-8"
        >
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-background">
            Hackathons
          </span>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            I like building things
          </h2>
          <p className="max-w-[600px] text-lg text-zinc-500 dark:text-zinc-400">
            I have participated in 1+ hackathons and watched teams ship wild
            ideas in short time. The energy and ambition in those rooms showed
            me how much a focused crew can deliver.
          </p>
        </motion.div> */}

        <motion.div
          variants={fadeInUp}
          className="relative flex flex-col gap-8 pl-8"
        >
          <div className="absolute left-8 top-2 h-full w-px bg-zinc-200 dark:bg-zinc-800" />
          {hackathons.map((hackathon, index) => (
            <HackathonItem key={index} {...hackathon} />
          ))}
        </motion.div>

        {/* Get in Touch */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center gap-4 text-center pt-24 pb-8"
        >
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-background">
            Contact
          </span>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Get in Touch
          </h2>
          <p className="max-w-[600px] text-lg text-muted">
            Want to chat? Email me at{" "}
            <a
              href="mailto:davidenabs@gmail.com"
              className="text-foreground underline"
            >
              davidenabs@gmail.com
            </a>
            .
          </p>
        </motion.div>

        {/* Services */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center gap-4 text-center pt-12 pb-8"
        >
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-background">
            Services
          </span>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            What I Offer
          </h2>
          <p className="max-w-[600px] text-lg text-zinc-500 dark:text-zinc-400">
            From full-stack development to blockchain consulting, I provide a
            range of services to bring your ideas to life.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          <ServiceItem
            title="Product Development"
            description="End-to-end development of digital products, from idea to scalable, production-ready solutions."
          />
          <ServiceItem
            title="Technical Strategy"
            description="Helping businesses make the right technical decisions to build, scale, and optimize their products."
          />
          <ServiceItem
            title="Platform Optimization"
            description="Enhancing performance, reliability, and efficiency of existing systems."
          />
          <ServiceItem
            title="Technical Consulting"
            description="Helping you make the right architecture and product decisions from day one."
          />
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center gap-4 text-center pt-24 pb-8"
        >
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-background">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            What Others Say
          </h2>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col gap-10">
          <Testimonial
            quote="David will always be my first call for blockchain development services."
            author="Walther Kranz"
          />
          <Testimonial
            quote="I was thoroughly impressed with David's skills - he provided helpful suggestions that improved the end product."
            author="Web3 Venture Lab"
          />
        </motion.div>

        {/* Newsletter/Contact */}
        {/* <motion.div
          variants={fadeInUp}
          className="flex flex-col gap-8 rounded-3xl border border-border bg-background p-8"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Stay in the loop
            </h2>
            <p className="text-muted">
              Get notified about new projects, articles, and Web3 insights.
            </p>
          </div>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none transition-all focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            />
            <button className="rounded-xl bg-accent px-6 py-2 text-sm font-medium text-background transition-colors hover:opacity-90">
              Join
            </button>
          </form>
        </motion.div> */}
      </motion.section>

      <AnimatePresence>
        {activeProject && (
          <ProjectSheet
            project={activeProject}
            expanded={projectSheetExpanded}
            onExpandedChange={setProjectSheetExpanded}
            onClose={closeProjectSheet}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface Experience {
  company: string;
  role: string;
  period: string;
  logo_url: string | null;
  image_url?: string | null;
  color: string | null;
}

interface Project {
  title: string;
  year: string | null;
  description: string;
  tags: string[] | null;
  cover_image_url: string | null;
  gallery_image_urls: string[] | null;
  image_url: string | null;
  links: { type: string; url: string }[] | null;
}

interface Hackathon {
  date: string;
  title: string;
  location: string;
  description: string;
  link_text: string | null;
  link_url: string | null;
}

function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col gap-8">
      {title && <Subtitle title={title} />}
      {children}
    </motion.div>
  );
}

function ExperienceItem({
  company,
  role,
  period,
  color,
  logo_url,
}: {
  company: string;
  role: string;
  period: string;
  color: string | null;
  logo_url?: string | null;
}) {
  const safeColor = color || "bg-zinc-900";
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={[
            "relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full text-white",
            safeColor,
          ].join(" ")}
        >
          {logo_url ? (
            <Image
              src={logo_url}
              alt={company}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <span className="text-sm font-bold">
              {company.trim().slice(0, 1).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-foreground">{company}</h3>
          <p className="text-sm text-muted">{role}</p>
        </div>
      </div>
      <p className="text-sm text-muted">{period}</p>
    </div>
  );
}

function ServiceItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}

function Testimonial({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl font-medium leading-relaxed text-foreground">
        &quot;{quote}&quot;
      </p>
      <p className="text-sm font-bold uppercase tracking-widest text-muted">
        {author}
      </p>
    </div>
  );
}

function HackathonItem({
  date,
  title,
  location,
  description,
  link_text,
  link_url,
}: {
  date: string;
  title: string;
  location: string;
  description: string;
  link_text: string | null;
  link_url: string | null;
}) {
  return (
    <div className="relative pl-8">
      <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{date}</p>
      <h3 className="font-bold text-zinc-900 dark:text-white">{title}</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{location}</p>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        {description}
      </p>
      {link_url && (
        <Link
          href={link_url}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          target={link_url.startsWith("http") ? "_blank" : undefined}
        >
          <Twitter size={14} />
          <span>{link_text || "Link"}</span>
        </Link>
      )}
    </div>
  );
}

function ProjectCard({
  title,
  year,
  description,
  tags,
  cover_image_url,
  image_url,
  onOpen,
}: {
  title: string;
  year: string | null;
  description: string;
  tags: string[] | null;
  cover_image_url: string | null;
  image_url: string | null;
  onOpen: () => void;
}) {
  const cover = cover_image_url || image_url;
  const safeTags = tags ?? [];

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex w-full flex-col gap-4 rounded-2xl border border-border bg-background p-4 text-left transition-all hover:shadow-sm"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-border">
        {cover ? (
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 320px, 100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 px-2">
        <h3 className="text-xl font-bold">{title}</h3>
        {year && <p className="text-sm text-muted">{year}</p>}
        <p className="text-sm leading-relaxed text-muted">{description}</p>

        <div className="mt-2 flex flex-wrap gap-2">
          {safeTags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function ProjectSheet({
  project,
  expanded,
  onExpandedChange,
  onClose,
}: {
  project: Project;
  expanded: boolean;
  onExpandedChange: (next: boolean) => void;
  onClose: () => void;
}) {
  const cover = project.cover_image_url || project.image_url;
  const gallery = project.gallery_image_urls ?? [];
  const tags = project.tags ?? [];
  const links = project.links ?? [];
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeGalleryIndex !== null) {
          setActiveGalleryIndex(null);
          return;
        }
        onClose();
        return;
      }
      if (activeGalleryIndex === null) return;
      if (e.key === "ArrowLeft") {
        setActiveGalleryIndex((current) => {
          if (current === null) return current;
          return (current - 1 + gallery.length) % gallery.length;
        });
      }
      if (e.key === "ArrowRight") {
        setActiveGalleryIndex((current) => {
          if (current === null) return current;
          return (current + 1) % gallery.length;
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeGalleryIndex, gallery.length, onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <motion.button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-label="Close project details"
      />

      <motion.div
        className={[
          "absolute bottom-0 left-0 right-0 mx-auto w-full max-w-4xl rounded-t-3xl border border-border bg-background shadow-2xl",
          expanded ? "h-[92vh]" : "h-[70vh]",
        ].join(" ")}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: -120, bottom: 220 }}
        dragElastic={0.08}
        onDragEnd={(_e, info) => {
          if (info.offset.y > 140) {
            onClose();
            return;
          }
          if (info.offset.y < -70) {
            onExpandedChange(true);
            return;
          }
          if (expanded && info.offset.y > 60) {
            onExpandedChange(false);
          }
        }}
      >
        <div className="flex items-center justify-between px-6 pb-3 pt-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="h-1.5 w-12 rounded-full bg-border" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted transition-colors hover:bg-border/40 hover:text-foreground"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="h-[calc(100%-60px)] overflow-y-auto px-6 pb-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-semibold tracking-tight">
                {project.title}
              </div>
              {project.year && (
                <div className="text-sm text-muted">{project.year}</div>
              )}
            </div>

            {cover && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-border">
                <Image
                  src={cover}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 672px, 100vw"
                  priority
                />
              </div>
            )}

            <div className="text-sm leading-relaxed text-muted">
              {project.description}
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.url}
                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-background transition-colors hover:opacity-90"
                    target={link.url.startsWith("http") ? "_blank" : undefined}
                  >
                    {link.type === "github" || link.type === "Source" ? (
                      <Github size={14} />
                    ) : link.type === "x" ? (
                      <Twitter size={14} />
                    ) : (
                      <Globe size={14} />
                    )}
                    <span className="capitalize">
                      {link.type === "x"
                        ? "X"
                        : link.type === "github"
                          ? "Source"
                          : link.type}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {gallery.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-end justify-between gap-4">
                  <div className="text-sm font-semibold">Gallery</div>
                  <div className="text-xs text-muted">
                    {gallery.length} photo{gallery.length === 1 ? "" : "s"}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {gallery.map((url, index) => (
                    <button
                      key={url}
                      type="button"
                      onClick={() => setActiveGalleryIndex(index)}
                      className={[
                        "group relative overflow-hidden rounded-2xl bg-border text-left",
                        "focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10",
                        index === 0
                          ? "col-span-3 aspect-[16/9]"
                          : "aspect-square",
                      ].join(" ")}
                      aria-label={`Open image ${index + 1} of ${gallery.length}`}
                    >
                      <Image
                        src={url}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes={
                          index === 0
                            ? "(min-width: 768px) 672px, 100vw"
                            : "(min-width: 768px) 220px, 30vw"
                        }
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="pointer-events-none absolute bottom-2 right-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                        <Maximize2 size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeGalleryIndex !== null && gallery[activeGalleryIndex] && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/70"
              onClick={() => setActiveGalleryIndex(null)}
              aria-label="Close image preview"
            />

            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-8 pt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/80">
                  {activeGalleryIndex + 1} / {gallery.length}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveGalleryIndex(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/15"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative mt-4 flex-1 overflow-hidden rounded-3xl bg-black/30">
                <Image
                  src={gallery[activeGalleryIndex]}
                  alt={project.title}
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 900px, 100vw"
                  priority
                />

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveGalleryIndex(
                          (activeGalleryIndex - 1 + gallery.length) %
                            gallery.length,
                        )
                      }
                      className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/15"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveGalleryIndex(
                          (activeGalleryIndex + 1) % gallery.length,
                        )
                      }
                      className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/15"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
