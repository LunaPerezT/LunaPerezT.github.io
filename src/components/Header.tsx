import { useEffect, useState } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollProgress } from "./ScrollProgress";
import { useLanguage } from "@/contexts/LanguageContext";
import { socialLinks } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

const SECTIONS = [
  "projects",
  "skills",
  "tools",
  "certifications",
  "about",
  "contact",
] as const;

/** Highlights the nav item for whichever section is currently in view. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      // Only count a section as active once it reaches the upper third.
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    for (const id of SECTIONS) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const onHome = location.pathname === "/";
  const active = useActiveSection(onHome);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setMobileOpen(false), [location.pathname]);

  const navItems = SECTIONS.map((id) => ({ id, label: t(`nav.${id}`) }));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled || mobileOpen
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label={t("nav.primary")}
        className="container flex h-16 items-center justify-between gap-4"
      >
        <Link
          to="/"
          className="font-display text-lg font-semibold tracking-tight transition-colors hover:text-primary"
        >
          Luna&nbsp;Pérez
          <span className="text-primary">.</span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex xl:gap-7">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={onHome ? `#${item.id}` : `/#${item.id}`}
                data-active={active === item.id}
                aria-current={active === item.id ? "true" : undefined}
                className="nav-link nav-link--indicated"
              >
                {item.label}
              </a>
              {/* One indicator shared across items, so it slides between them
                  as you scroll rather than fading out and in. */}
              {active === item.id && (
                <motion.span
                  layoutId="nav-indicator"
                  aria-hidden="true"
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary"
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-0.5">
          <div className="hidden sm:flex sm:items-center sm:gap-0.5">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Github className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Linkedin className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
            </a>
          </div>
          <ThemeToggle />
          <LanguageSelector />

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? t("nav.close") : t("nav.open")}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
        <ScrollProgress />
      </nav>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background lg:hidden"
        >
          <ul className="container flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={onHome ? `#${item.id}` : `/#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-11 items-center border-b border-border/60 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2 pt-3 sm:hidden">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
