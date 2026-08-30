import type { Project } from "@/data/portfolio-data";
import { ProjectCard } from "./ProjectCard";

/**
 * Three explicit variants instead of `<ProjectCard featured compact />`.
 * Each composes the same parts in a different order and density, so adding a
 * fourth presentation later means adding a component, not another boolean.
 *
 * Spans are chosen so nine projects tile a six-column grid exactly:
 * 3 lead (6 each) + 3 standard (2 each) + 3 compact (2 each) = five full rows.
 */

/** Full-width, horizontal: the argument on the left, the evidence on the right. */
export function LeadProjectCard({ project }: { project: Project }) {
  return (
    <ProjectCard.Root project={project} className="lg:col-span-6">
      <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <ProjectCard.Body className="gap-4 lg:p-8">
          <ProjectCard.Eyebrow />
          <ProjectCard.Title as="h3" />
          <ProjectCard.Headline className="max-w-2xl text-base md:text-lg" />
          <ProjectCard.Summary className="max-w-2xl" />
          <ProjectCard.Tags limit={7} />
          <ProjectCard.Actions />
        </ProjectCard.Body>

        <div className="relative flex flex-col justify-between gap-5 overflow-hidden border-t border-border bg-background-alt p-6 lg:border-l lg:border-t-0 lg:p-8">
          {/* Fully inside the panel: it used to bleed past the top-left corner,
              where `overflow-hidden` sliced the top off the motif. */}
          <ProjectCard.Glyph className="right-5 top-5 h-20 w-40" />
          <div className="relative">
            <ProjectCard.Metrics count={3} layout="stack" />
          </div>
        </div>
      </div>
    </ProjectCard.Root>
  );
}

/** One third of a row: headline, two metrics, the caveat clamped. */
export function StandardProjectCard({ project }: { project: Project }) {
  return (
    <ProjectCard.Root project={project} className="lg:col-span-2">
      <ProjectCard.Body className="gap-3.5">
        <ProjectCard.Eyebrow />
        <ProjectCard.Title as="h3" />
        <ProjectCard.Headline className="text-sm" />
        <div className="rounded-lg border border-border bg-background-alt/60 p-3.5">
          <ProjectCard.Metrics count={2} layout="pair" />
        </div>
        <ProjectCard.Tags limit={4} />
        <ProjectCard.Actions />
      </ProjectCard.Body>
    </ProjectCard.Root>
  );
}

/** One third of a row, lighter: the summary and a single headline number. */
export function CompactProjectCard({ project }: { project: Project }) {
  return (
    <ProjectCard.Root project={project} className="lg:col-span-2">
      <ProjectCard.Body className="gap-3">
        <ProjectCard.Eyebrow />
        <ProjectCard.Title as="h3" />
        <ProjectCard.Summary className="line-clamp-4" />
        <div className="rounded-lg border border-border bg-background-alt/60 p-3.5">
          <ProjectCard.Metrics count={1} layout="stack" />
        </div>
        <ProjectCard.Tags limit={3} />
        <ProjectCard.Actions />
      </ProjectCard.Body>
    </ProjectCard.Root>
  );
}

const VARIANTS = {
  lead: LeadProjectCard,
  standard: StandardProjectCard,
  compact: CompactProjectCard,
} as const;

/** Picks the variant from the project's own emphasis. */
export function ProjectTile({ project }: { project: Project }) {
  const Variant = VARIANTS[project.emphasis];
  return <Variant project={project} />;
}
