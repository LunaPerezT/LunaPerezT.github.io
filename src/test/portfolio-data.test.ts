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

/**
 * The portfolio's promise is that every card carries a real number and the
 * limitation attached to it. These tests keep that promise mechanical: a
 * project added without a caveat, a metric, or a Spanish translation fails CI
 * rather than shipping a half-filled card.
 */
describe("portfolio data", () => {
  it("exposes nine projects, each exactly once, in an explicit order", () => {
    expect(projects).toHaveLength(9);
    expect(orderedProjects).toHaveLength(9);

    const ids = orderedProjects.map((project) => project.id);
    expect(new Set(ids).size).toBe(9);
    // An id missing from DISPLAY_ORDER would sort to the front with index -1.
    expect(ids[0]).toBe("ecg-heartbeat-categorization");
    expect(ids.at(-1)).toBe("educational-data-architecture");
  });

  it("tiles the six-column grid exactly: 3 lead + 3 standard + 3 compact", () => {
    const span = { lead: 6, standard: 2, compact: 2 } as const;
    const total = orderedProjects.reduce((sum, p) => sum + span[p.emphasis], 0);
    expect(total % 6).toBe(0);

    const counts = orderedProjects.reduce<Record<string, number>>((acc, p) => {
      acc[p.emphasis] = (acc[p.emphasis] ?? 0) + 1;
      return acc;
    }, {});
    expect(counts).toEqual({ lead: 3, standard: 3, compact: 3 });
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
      expect(project.githubUrl).toMatch(/^https:\/\/github\.com\//);
      if (project.demoUrl) expect(project.demoUrl).toMatch(/^https:\/\//);
    }
  );

  it("marks a project as deployed only when a demo URL exists", () => {
    for (const project of projects) {
      if (project.status === "deployed") expect(project.demoUrl).toBeTruthy();
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
    expect(education.length).toBeGreaterThanOrEqual(3);
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
      // Either a public credential page or, failing that, an ID someone can quote.
      expect(Boolean(cert.url) || Boolean(cert.credentialId)).toBe(true);
      if (cert.url) expect(cert.url).toMatch(/^https:\/\//);
    }
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
});
