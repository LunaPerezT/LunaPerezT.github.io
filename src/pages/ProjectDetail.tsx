import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
  orderedProjects,
  type Project,
} from "@/data/portfolio-data";
import { projectImages } from "@/data/project-images";
import { projectCharts } from "@/data/project-charts";
import { ProjectCharts } from "@/components/ProjectCharts";
import { Layout } from "@/components/Layout";
import { ProjectGlyph } from "@/components/ProjectGlyph";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();

  const index = orderedProjects.findIndex((project) => project.id === id);
  const project = index >= 0 ? orderedProjects[index] : undefined;

  // Arriving from a card should start at the top, not mid-page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  useEffect(() => {
    if (!project) return;
    const previous = document.title;
    document.title = `${project.title[language]} · Luna Pérez Troncoso`;
    return () => {
      document.title = previous;
    };
  }, [project, language]);

  if (!project) return <Navigate to="/" replace />;

  const images = id ? (projectImages[id] ?? []) : [];
  const charts = id ? (projectCharts[id] ?? []) : [];
  const next = orderedProjects[(index + 1) % orderedProjects.length];

  const sections: { key: string; title: string; blocks: [string, string][] }[] = [
    {
      key: "overview",
      title: t("project.tab.overview"),
      blocks: [
        [t("project.context"), project.overview.context[language]],
        [t("project.problem"), project.overview.problem[language]],
        [t("project.objective"), project.overview.objective[language]],
      ],
    },
    {
      key: "data",
      title: t("project.tab.data"),
      blocks: [
        [t("project.dataSources"), project.dataArchitecture.dataSources[language]],
        [t("project.pipeline"), project.dataArchitecture.pipeline[language]],
        ...(project.dataArchitecture.diagrams
          ? ([[t("project.architecture"), project.dataArchitecture.diagrams[language]]] as [
              string,
              string,
            ][])
          : []),
      ],
    },
    {
      key: "modeling",
      title: t("project.tab.modeling"),
      blocks: [
        [t("project.algorithms"), project.modeling.algorithms[language]],
        [t("project.decisions"), project.modeling.decisions[language]],
      ],
    },
    {
      key: "results",
      title: t("project.tab.results"),
      blocks: [
        [t("project.metrics"), project.results.metrics[language]],
        [t("project.outcomes"), project.results.outcomes[language]],
        ...(project.results.visualizations
          ? ([[t("project.visualizations"), project.results.visualizations[language]]] as [
              string,
              string,
            ][])
          : []),
      ],
    },
    {
      key: "learnings",
      title: t("project.tab.learnings"),
      blocks: [
        [t("project.challenges"), project.learnings.challenges[language]],
        [t("project.learned"), project.learnings.learned[language]],
        [t("project.improvements"), project.learnings.improvements[language]],
      ],
    },
  ];

  return (
    <Layout>
      {/* ------------------------------------------------------------ Head */}
      <header className="relative overflow-hidden border-b border-border section-band px-5 pb-12 pt-24 sm:px-8 md:pb-16 md:pt-32">
        <ProjectGlyph
          kind={project.glyph}
          className="glyph-trace pointer-events-none absolute -right-10 top-24 hidden h-40 w-80 text-primary/15 lg:block"
        />
        <div className="container">
          <Link
            to="/#projects"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("projects.backToProjects")}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2">
            {project.categories.map((category, position) => (
              <span key={category} className="flex items-center gap-x-2">
                {position > 0 && (
                  <span className="eyebrow text-border-strong" aria-hidden="true">
                    /
                  </span>
                )}
                <span className="eyebrow eyebrow-accent">
                  {CATEGORY_LABELS[category][language]}
                </span>
              </span>
            ))}
            <span className="eyebrow text-border-strong" aria-hidden="true">
              ·
            </span>
            <span className="eyebrow">{project.role[language]}</span>
            <span className="eyebrow text-border-strong" aria-hidden="true">
              ·
            </span>
            <span className="eyebrow">{project.period}</span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em]",
                project.status === "deployed"
                  ? "bg-deployed-soft text-deployed"
                  : "bg-neutral-status-soft text-neutral-status"
              )}
            >
              {STATUS_LABELS[project.status][language]}
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl text-[clamp(2rem,1.4rem+2.6vw,3.25rem)]">
            {project.title[language]}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/85 md:text-xl">
            {project.headline[language]}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-strong"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              {t("project.repository")}
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-medium transition-colors hover:border-border-strong"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {t("project.liveDemo")}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------- Metrics */}
      <section className="border-b border-border px-5 py-10 sm:px-8" aria-label={t("project.metrics")}>
        <div className="container">
          <dl className="grid gap-8 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.value + metric.label.en}>
                <dd>
                  <AnimatedNumber
                    value={metric.value}
                    className="metric-value block text-4xl leading-none text-highlight md:text-5xl"
                  />
                </dd>
                <dt className="mt-3 text-sm font-medium leading-snug">
                  {metric.label[language]}
                </dt>
                {metric.note && (
                  <p className="metric-label mt-1.5">{metric.note[language]}</p>
                )}
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------ Body */}
      <div className="px-5 py-14 sm:px-8 md:py-20">
        <div className="container">
          <ProjectCharts charts={charts} />

          {images.length > 0 && (
            <div className="mb-14 grid gap-4 md:grid-cols-2">
              {images.map((image, position) => (
                <img
                  key={image}
                  src={image}
                  alt={`${project.title[language]} (${position + 1})`}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-xl border border-border bg-card object-cover"
                />
              ))}
            </div>
          )}

          <div className="grid min-w-0 grid-cols-1 gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:gap-16">
            <article className="prose-case min-w-0 max-w-3xl">
              {sections.map((section) => (
                <section
                  key={section.key}
                  id={section.key}
                  className="mb-12 scroll-mt-24 last:mb-0"
                >
                  <h2 className="border-b border-border pb-3 text-[1.75rem]">
                    {section.title}
                  </h2>
                  {section.blocks.map(([heading, body]) => (
                    <div key={heading} className="mt-6">
                      <h3 className="font-display text-lg font-semibold">{heading}</h3>
                      <p className="mt-2">{body}</p>
                    </div>
                  ))}
                  {section.key === "modeling" && (
                    <div className="mt-6">
                      <h3 className="font-display text-lg font-semibold">
                        {t("project.libraries")}
                      </h3>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {project.modeling.libraries.map((library) => (
                          <li key={library} className="tag">
                            {library}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </article>

            {/* Sticky contents + stack */}
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <nav aria-label={t("project.contents")}>
                <p className="eyebrow">{t("project.contents")}</p>
                <ol className="divide-hairline mt-3 rounded-xl border border-border bg-card">
                  {sections.map((section) => (
                    <li key={section.key}>
                      <a
                        href={`#${section.key}`}
                        className="flex min-h-11 items-center px-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="mt-8">
                <p className="eyebrow">{t("project.stack")}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- Next case */}
      <NextProject project={next} />
    </Layout>
  );
}

function NextProject({ project }: { project: Project }) {
  const { language, t } = useLanguage();

  return (
    <section className="rule-top section-band px-5 py-12 sm:px-8">
      <div className="container">
        <Link
          to={`/project/${project.id}`}
          className="group flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="eyebrow">{t("project.next")}</p>
            <p className="mt-2 font-display text-2xl font-semibold transition-colors group-hover:text-primary">
              {project.title[language]}
            </p>
          </div>
          <ArrowRight
            className="h-6 w-6 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
