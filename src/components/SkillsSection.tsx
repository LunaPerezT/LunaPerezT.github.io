import { skills } from "@/data/portfolio-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { SectionCard } from "./SectionCard";
import { Stagger } from "./Stagger";

export function SkillsSection() {
  const { language, t } = useLanguage();
  const groups = Object.entries(skills);

  return (
    <section id="skills" className="section-shell rule-top scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t("skills.subtitle")}
          title={t("skills.title")}
          description={t("skills.description")}
        />

        {/* Separate cards in a gapped grid, the same object the projects grid
            uses, rather than nine cells sharing one hairline box. */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(([key, group], index) => (
            <SectionCard
              key={key}
              delay={Math.min(index, 5) * 0.04}
              hover="spin"
              className="p-6"
            >
              <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                {group[language]}
              </h3>
              <Stagger.List className="mt-4 flex flex-wrap gap-1.5">
                {group.items[language].map((item) => (
                  <Stagger.Item key={item} className="tag">
                    {item}
                  </Stagger.Item>
                ))}
              </Stagger.List>
            </SectionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
