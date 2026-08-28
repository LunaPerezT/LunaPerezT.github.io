import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/data/portfolio-data";

export type FilterValue = ProjectCategory | "all";

/**
 * Generic provider interface: `state` is what is selected, `actions` are the
 * only ways to change it, `meta` is everything derived. Consumers never see
 * `useState` — swapping this for a URL-backed or persisted filter later would
 * not touch ProjectsSection or the filter bar.
 */
interface ProjectFilterContextValue {
  state: { active: FilterValue };
  actions: { select: (value: FilterValue) => void; reset: () => void };
  meta: {
    visible: Project[];
    counts: Record<FilterValue, number>;
    available: FilterValue[];
    total: number;
  };
}

const ProjectFilterContext = createContext<ProjectFilterContextValue | null>(null);

interface ProviderProps {
  projects: Project[];
  children: React.ReactNode;
}

export function ProjectFilterProvider({ projects, children }: ProviderProps) {
  const [active, setActive] = useState<FilterValue>("all");

  const select = useCallback((value: FilterValue) => setActive(value), []);
  const reset = useCallback(() => setActive("all"), []);

  const value = useMemo<ProjectFilterContextValue>(() => {
    const counts = { all: projects.length } as Record<FilterValue, number>;
    for (const project of projects) {
      for (const category of project.categories) {
        counts[category] = (counts[category] ?? 0) + 1;
      }
    }

    // Only offer a filter that actually has projects behind it.
    const available: FilterValue[] = [
      "all",
      ...(Object.keys(counts) as FilterValue[])
        .filter((key) => key !== "all")
        .sort((a, b) => counts[b] - counts[a]),
    ];

    const visible =
      active === "all"
        ? projects
        : projects.filter((project) => project.categories.includes(active));

    return {
      state: { active },
      actions: { select, reset },
      meta: { visible, counts, available, total: projects.length },
    };
  }, [projects, active, select, reset]);

  return (
    <ProjectFilterContext.Provider value={value}>{children}</ProjectFilterContext.Provider>
  );
}

export function useProjectFilter() {
  const context = useContext(ProjectFilterContext);
  if (!context) {
    throw new Error("useProjectFilter must be used inside a ProjectFilterProvider");
  }
  return context;
}
