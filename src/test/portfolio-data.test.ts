import { describe, expect, it } from "vitest";
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
  certifications,
  education,
  orderedProjects,
  projects,
  skills,
} from "@/data/portfolio-data";
import { projectImages } from "@/data/project-images";
import { projectCharts } from "@/data/project-charts";

/**
 * The portfolio's promise is that every card carries a real number and the
 * limitation attached to it. These tests keep that promise mechanical: a
 * project added without a caveat, a metric, or a Spanish translation fails CI
 * rather than shipping a half-filled card.
 */
describe("portfolio data", () => {
  it("exposes ten projects, each exactly once, in an explicit order", () => {
    expect(projects).toHaveLength(10);
    expect(orderedProjects).toHaveLength(10);

    const ids = orderedProjects.map((project) => project.id);
    expect(new Set(ids).size).toBe(10);
    // An id missing from DISPLAY_ORDER would sort to the front with index -1.
    expect(ids[0]).toBe("ecg-heartbeat-categorization");
    expect(ids.at(-1)).toBe("educational-data-architecture");
  });

  it("tiles the six-column grid exactly: 4 lead + 3 standard + 3 compact", () => {
    const span = { lead: 6, standard: 2, compact: 2 } as const;
    const total = orderedProjects.reduce((sum, p) => sum + span[p.emphasis], 0);
    expect(total % 6).toBe(0);

    const counts = orderedProjects.reduce<Record<string, number>>((acc, p) => {
      acc[p.emphasis] = (acc[p.emphasis] ?? 0) + 1;
      return acc;
    }, {});
    expect(counts).toEqual({ lead: 4, standard: 3, compact: 3 });
  });

  it.each(projects.map((p) => [p.id, p] as const))(
    "%s carries metrics, a caveat and both languages",
    (_id, project) => {
      expect(project.metrics.length).toBeGreaterThanOrEqual(1);
      expect(project.metrics.length).toBeLessThanOrEqual(3);

      for (const metric of project.metrics) {
        expect(metric.value.trim()).not.toBe("");
        expect(metric.label.en.trim()).not.toBe("");
        expect(metric.label.es.trim()).not.toBe("");
      }

      // A result without its limitation is the failure mode this guards against.
      expect(project.caveat.en.length).toBeGreaterThan(40);
      expect(project.caveat.es.length).toBeGreaterThan(40);

      for (const field of [
        project.title,
        project.headline,
        project.shortDescription,
        project.role,
      ]) {
        expect(field.en.trim()).not.toBe("");
        expect(field.es.trim()).not.toBe("");
      }

      expect(project.categories.length).toBeGreaterThanOrEqual(1);
      for (const category of project.categories) {
        expect(CATEGORY_LABELS[category]).toBeDefined();
      }
      expect(STATUS_LABELS[project.status]).toBeDefined();
      // Either a public repository or a stated reason there is none, never both.
      if (project.githubUrl) {
        expect(project.githubUrl).toMatch(/^https:\/\/github\.com\//);
        expect(project.privateCode).toBeUndefined();
      } else {
        expect(project.privateCode?.en.length ?? 0).toBeGreaterThan(40);
        expect(project.privateCode?.es.length ?? 0).toBeGreaterThan(40);
      }
      for (const demo of project.demos ?? []) {
        expect(demo.url).toMatch(/^https:\/\//);
        if (demo.label) {
          expect(demo.label.en.trim()).not.toBe("");
          expect(demo.label.es.trim()).not.toBe("");
        }
      }
      // Two demos on one card are only distinguishable by their labels.
      if ((project.demos?.length ?? 0) > 1) {
        expect(project.demos!.every((demo) => demo.label)).toBe(true);
      }
    }
  );

  it("marks a project as deployed only when a demo URL exists", () => {
    for (const project of projects) {
      if (project.status === "deployed") expect(project.demos?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("keeps the Cabify parts as two distinct projects on one repository", () => {
    const cabify = projects.filter((p) => p.id.startsWith("cabify-"));
    expect(cabify).toHaveLength(2);
    expect(new Set(cabify.map((p) => p.githubUrl)).size).toBe(1);
  });

  it("never claims an accuracy figure for CATBOX — no evaluation set exists", () => {
    const catbox = projects.find((p) => p.id === "text-to-sql-agent")!;
    const numbers = catbox.metrics.map((m) => m.value).join(" ");
    expect(numbers).not.toMatch(/\d+(\.\d+)?\s*%/);
  });

  it("keeps every Cabify Part 1 figure marked as simulated", () => {
    const part1 = projects.find((p) => p.id === "cabify-experiment-design")!;
    for (const metric of part1.metrics) {
      expect(`${metric.note?.en ?? ""} ${part1.caveat.en}`.toLowerCase()).toContain(
        "simulated"
      );
    }
  });
});

describe("credentials and skills", () => {
  it("gives every education entry both languages and a period", () => {
    expect(education.length).toBeGreaterThanOrEqual(2);
    for (const item of education) {
      for (const field of [item.title, item.period, item.summary]) {
        expect(field.en.trim()).not.toBe("");
        expect(field.es.trim()).not.toBe("");
      }
      expect(item.institution.trim()).not.toBe("");
      if (item.topics) {
        // A missing translation would silently render an empty tag list.
        expect(item.topics.en.length).toBe(item.topics.es.length);
        expect(item.topics.en.length).toBeGreaterThan(0);
      }
      if (item.url) expect(item.url).toMatch(/^https:\/\//);
    }
  });

  it("gives every certification a date, an issuer and a way to verify it", () => {
    for (const cert of certifications) {
      expect(cert.date).toMatch(/^\d{4}-\d{2}$/);
      expect(cert.issuer.trim()).not.toBe("");
      expect(cert.name.en.trim()).not.toBe("");
      expect(cert.name.es.trim()).not.toBe("");
      expect(cert.description.en.trim()).not.toBe("");
      expect(cert.description.es.trim()).not.toBe("");
      if (cert.url) expect(cert.url).toMatch(/^https:\/\//);
    }
  });

  it("leaves at most one certification without a way to verify it", () => {
    // A public credential page, or failing that an ID someone can quote. The one
    // allowance is Elements of AI, whose mooc.fi certificate link is not on file;
    // it renders without a "view credential" affordance rather than linking the
    // public course page, which would verify nothing.
    const unverifiable = certifications.filter((c) => !c.url && !c.credentialId);
    expect(unverifiable.map((c) => c.name.en)).toEqual(["Elements of AI"]);
  });

  it("has no duplicate certifications", () => {
    const names = certifications.map((c) => c.name.en);
    expect(new Set(names).size).toBe(names.length);
  });

  it("keeps every skill group balanced across languages", () => {
    const groups = Object.values(skills);
    expect(groups.length).toBeGreaterThanOrEqual(6);
    for (const group of groups) {
      expect(group.en.trim()).not.toBe("");
      expect(group.es.trim()).not.toBe("");
      expect(group.items.en.length).toBe(group.items.es.length);
      expect(group.items.en.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps skill and education tags to short names, not sentences", () => {
    const tags = [
      ...Object.values(skills).flatMap((g) => [...g.items.en, ...g.items.es]),
      ...education.flatMap((e) => (e.topics ? [...e.topics.en, ...e.topics.es] : [])),
    ];
    const tooLong = tags.filter((tag) => tag.split(/\s+/).length > 4);
    expect(tooLong).toEqual([]);
  });
});

describe("project charts", () => {
  it("gives every project either screenshots or charts", () => {
    for (const project of projects) {
      const hasVisual =
        (projectImages[project.id]?.length ?? 0) > 0 ||
        (projectCharts[project.id]?.length ?? 0) > 0;
      expect(hasVisual, `${project.id} has nothing to look at`).toBe(true);
    }
  });

  it("keeps every bar inside its authored axis, in both languages", () => {
    for (const [id, charts] of Object.entries(projectCharts)) {
      expect(projects.some((p) => p.id === id)).toBe(true);
      for (const chart of charts) {
        expect(chart.bars.length).toBeGreaterThanOrEqual(2);
        for (const field of [chart.title, chart.caption]) {
          expect(field.en.trim()).not.toBe("");
          expect(field.es.trim()).not.toBe("");
        }
        for (const bar of chart.bars) {
          // An auto-scaled or overflowing bar is a lie about the axis.
          expect(bar.value).toBeLessThanOrEqual(chart.max);
          expect(bar.value).toBeGreaterThan(0);
          expect(bar.label.es.trim()).not.toBe("");
          expect(bar.display.es.trim()).not.toBe("");
        }
      }
    }
  });

  it("says every simulated Cabify Part 1 chart is simulated", () => {
    for (const chart of projectCharts["cabify-experiment-design"]) {
      expect(chart.caption.en.toLowerCase()).toContain("simulated");
      expect(chart.caption.es.toLowerCase()).toContain("simulado");
    }
  });
});

describe("copy style", () => {
  // Em and en dashes were swept out of the visible copy in favour of commas and
  // parentheses. This catches a reintroduction, in either the raw character or
  // its escaped form.
  it("uses no em or en dashes anywhere in the visible copy", () => {
    const offenders: string[] = [];
    const walk = (node: unknown, path: string) => {
      if (typeof node === "string") {
        if (/[–—]/.test(node)) offenders.push(`${path}: ${node.slice(0, 60)}`);
        return;
      }
      if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`));
      if (node && typeof node === "object")
        for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`);
    };
    walk(projects, "projects");
    walk(skills, "skills");
    walk(certifications, "certifications");
    walk(education, "education");
    expect(offenders).toEqual([]);
  });
});
