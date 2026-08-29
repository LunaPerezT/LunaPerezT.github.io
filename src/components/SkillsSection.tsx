import { skills } from "@/data/portfolio-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
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

        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {groups.map(([key, group], index) => (
            <Reveal key={key} delay={Math.min(index, 5) * 0.04} className="bg-card">
              <div className="flex h-full flex-col p-6">
                <h3 className="font-display text-lg font-semibold leading-snug">
                  {group[language]}
                </h3>
                <Stagger.List className="mt-4 flex flex-wrap gap-1.5">
                  {group.items[language].map((item) => (
                    <Stagger.Item key={item} className="tag">
                      {item}
                    </Stagger.Item>
                  ))}
                </Stagger.List>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
