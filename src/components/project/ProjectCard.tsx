import { createContext, useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
  type Project,
} from "@/data/portfolio-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProjectGlyph } from "@/components/ProjectGlyph";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { cn } from "@/lib/utils";

/**
 * Compound card. `Root` owns the project and the active language; every part
 * reads them from context instead of taking them as props, so a variant can
 * reorder or drop pieces without threading data through.
 *
 * There is deliberately no `featured` or `compact` boolean here — the three
 * explicit variants in this folder compose these parts differently instead.
 */
interface ProjectCardContextValue {
  project: Project;
  language: "en" | "es";
  href: string;
}

const ProjectCardContext = createContext<ProjectCardContextValue | null>(null);

function useProjectCard(part: string) {
  const context = useContext(ProjectCardContext);
  if (!context) {
    throw new Error(`ProjectCard.${part} must be rendered inside ProjectCard.Root`);
  }
  return context;
}

/* ---------------------------------------------------------------- Root --- */

interface RootProps {
  project: Project;
  className?: string;
  children: React.ReactNode;
}

function Root({ project, className, children }: RootProps) {
  const { language } = useLanguage();
  const value = useMemo<ProjectCardContextValue>(
    () => ({ project, language, href: `/project/${project.id}` }),
    [project, language]
  );

  return (
    <ProjectCardContext.Provider value={value}>
      <motion.article
        layout
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
          layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        }}
        whileHover={{ y: -3 }}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card",
          "shadow-sm transition-[box-shadow,border-color] duration-200",
          "hover:border-border-strong",
          "focus-within:border-primary/50",
          // Gradient rim plus glow on hover. See `.card-glow` in index.css.
          "card-glow",
          className
        )}
      >
        {children}
      </motion.article>
    </ProjectCardContext.Provider>
  );
}

/* -------------------------------------------------------------- Status --- */

function Status() {
  const { project, language } = useProjectCard("Status");
  const label = STATUS_LABELS[project.status][language];

  const tone =
    project.status === "deployed"
      ? "bg-deployed-soft text-deployed"
      : "bg-neutral-status-soft text-neutral-status";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em]",
        tone
      )}
    >
      {project.status === "deployed" && (
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      )}
      {label}
    </span>
  );
}

/* ------------------------------------------------------------- Eyebrow --- */

function Eyebrow() {
  const { project, language } = useProjectCard("Eyebrow");
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="eyebrow">{CATEGORY_LABELS[project.categories[0]][language]}</span>
        <span className="eyebrow text-border-strong" aria-hidden="true">
          ·
        </span>
        <span className="eyebrow">{project.role[language]}</span>
      </p>
      <div className="shrink-0">
        <Status />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Title --- */

function Title({ as: Tag = "h3" }: { as?: "h2" | "h3" }) {
  const { project, language, href } = useProjectCard("Title");
  return (
    <Tag className="font-display font-semibold leading-tight">
      {/* Stretched link: the whole card is the target, but only this is the name. */}
      <Link
        to={href}
        className="after:absolute after:inset-0 after:content-[''] hover:text-primary focus-visible:text-primary"
      >
        {project.title[language]}
      </Link>
    </Tag>
  );
}

/* ------------------------------------------------------------ Headline --- */

function Headline({ className }: { className?: string }) {
  const { project, language } = useProjectCard("Headline");
  return (
    <p className={cn("text-[0.9375rem] leading-relaxed text-foreground/85", className)}>
      {project.headline[language]}
    </p>
  );
}

/* ------------------------------------------------------------- Summary --- */

function Summary({ className }: { className?: string }) {
  const { project, language } = useProjectCard("Summary");
  return (
    <p className={cn("text-sm leading-relaxed text-muted-foreground", className)}>
      {project.shortDescription[language]}
    </p>
  );
}

/* ------------------------------------------------------------- Metrics --- */

interface MetricsProps {
  /** How many of the project's metrics to show, in order. */
  count?: number;
  /** row = three across · pair = two across · stack = one per line, ruled. */
  layout?: "row" | "pair" | "stack";
}

const METRIC_LAYOUT = {
  row: "grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3",
  pair: "grid grid-cols-2 gap-x-5 gap-y-4",
  stack: "divide-hairline grid grid-cols-1",
} as const;

function Metrics({ count = 3, layout = "row" }: MetricsProps) {
  const { project, language } = useProjectCard("Metrics");
  const shown = project.metrics.slice(0, count);
  if (shown.length === 0) return null;

  return (
    <dl className={METRIC_LAYOUT[layout]}>
      {shown.map((metric) => (
        <div
          key={metric.value + metric.label.en}
          className={cn("min-w-0", layout === "stack" && "py-3 first:pt-0 last:pb-0")}
        >
          <dt className="sr-only">{metric.label[language]}</dt>
          <dd>
            <AnimatedNumber
              value={metric.value}
              className="metric-value block text-2xl leading-none"
            />
            <span className="mt-1.5 block text-xs font-medium leading-snug text-foreground/80">
              {metric.label[language]}
            </span>
            {metric.note && (
              <span className="metric-label mt-1 block">{metric.note[language]}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------------- Tags --- */

function Tags({ limit = 5 }: { limit?: number }) {
  const { project } = useProjectCard("Tags");
  const shown = project.techStack.slice(0, limit);
  const rest = project.techStack.length - shown.length;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((tech) => (
        <li key={tech} className="tag">
          {tech}
        </li>
      ))}
      {rest > 0 && <li className="tag text-muted-foreground">+{rest}</li>}
    </ul>
  );
}

/* ------------------------------------------------------------- Actions --- */

function Actions() {
  const { project, language, href } = useProjectCard("Actions");
  const caseStudy = language === "es" ? "Ver el caso" : "Read the case study";
  const repoLabel =
    language === "es"
      ? `Repositorio de ${project.title.es} en GitHub`
      : `${project.title.en} repository on GitHub`;
  const demoLabel =
    language === "es"
      ? `Demo en vivo de ${project.title.es}`
      : `Live demo of ${project.title.en}`;

  return (
    <div className="mt-auto flex items-center gap-2 border-t border-border pt-4">
      <Link
        to={href}
        className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-strong"
        tabIndex={-1}
        aria-hidden="true"
      >
        {caseStudy}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>

      {/* Above the stretched link so these stay independently clickable. */}
      <div className="relative z-10 ml-auto flex items-center gap-1">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={repoLabel}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
        </a>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={demoLabel}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Glyph --- */

function Glyph({ className }: { className?: string }) {
  const { project } = useProjectCard("Glyph");
  return (
    <ProjectGlyph
      kind={project.glyph}
      className={cn(
        "glyph-trace-hover pointer-events-none absolute text-primary/15",
        "transition-colors duration-300 group-hover:text-primary/30",
        className
      )}
    />
  );
}

/* ---------------------------------------------------------------- Body --- */

function Body({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex flex-1 flex-col gap-4 p-6", className)}>{children}</div>;
}

export const ProjectCard = {
  Root,
  Body,
  Eyebrow,
  Status,
  Title,
  Headline,
  Summary,
  Metrics,
  Tags,
  Actions,
  Glyph,
};
