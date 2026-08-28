import { AnimatePresence } from "framer-motion";
import { orderedProjects } from "@/data/portfolio-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { ProjectFilterProvider, useProjectFilter } from "./project/ProjectFilterProvider";
import { ProjectFilterBar } from "./project/ProjectFilterBar";
import { ProjectTile } from "./project/ProjectCardVariants";

function ProjectGrid() {
  const { t } = useLanguage();
  const { meta } = useProjectFilter();

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
        <ProjectFilterBar />
        {/* Announced so a screen-reader user learns the grid changed. */}
        <p aria-live="polite" className="eyebrow shrink-0">
          {t("projects.showing").replace("{n}", String(meta.visible.length))}
        </p>
      </div>

      {/* `popLayout` lets the cards that stay slide into their new places while
          the filtered-out ones are still leaving, instead of the grid jumping. */}
      <div
        className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6"
        style={{ gridAutoFlow: "dense" }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {meta.visible.map((project) => (
            <ProjectTile key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

export function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section-shell rule-top scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t("projects.subtitle")}
          title={t("projects.title")}
          description={t("projects.description")}
        />
        <ProjectFilterProvider projects={orderedProjects}>
          <ProjectGrid />
        </ProjectFilterProvider>
      </div>
    </section>
  );
}
