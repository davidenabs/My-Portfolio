"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Github,
  Home,
  Linkedin,
  Moon,
  NotebookText,
  Sun,
  Twitter,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const navItems = [
  { path: "/", icon: Home },
  { path: "/thoughts", icon: NotebookText },
  // Socials

  { path: "https://github.com/davidenabs", icon: Github },
  { path: "https://x.com/davidenabs", icon: Twitter },
  { path: "https://www.linkedin.com/in/davidenabs", icon: Linkedin },

  { path: "/about", icon: User },
];

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed bottom-0 z-50 flex w-full justify-center py-6">
        <div className="flex items-center gap-1 rounded-full border border-border/50 bg-background/70 p-4 backdrop-blur-xl">
          {navItems.map((item) => (
            <div key={item.path} className="px-3 py-1.5 opacity-0">
              <item.icon size={20} />
            </div>
          ))}
          <div className="px-3 py-1.5 opacity-0">
            <Sun size={20} />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 z-50 flex w-full justify-center py-6">
      <div className="flex items-center gap-1 rounded-full border border-border/50 bg-background/70 p-4 backdrop-blur-xl">
        {navItems.map((item, i) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path + i}
              href={item.path}
              className={cn(
                "relative px-3 py-1.5 text-sm font-medium transition-colors hover:text-foreground",
                isActive ? "text-foreground" : "text-muted",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-border/60"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="">
                <item.icon size={20} className="hover:mx-3 transition-all" />
              </span>
            </Link>
          );
        })}

        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="relative px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <span>
            {resolvedTheme === "dark" ? (
              <Sun size={20} className="hover:mx-3 transition-all" />
            ) : (
              <Moon size={20} className="hover:mx-3 transition-all" />
            )}
          </span>
        </button>
      </div>
    </nav>
  );
}
