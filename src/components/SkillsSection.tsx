import { skills } from "@/data/portfolio-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function SkillsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="skills" className="section-shell rule-top scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t("skills.subtitle")}
          title={t("skills.title")}
          description={t("skills.description")}
        />

        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([key, category], index) => (
            <Reveal key={key} delay={Math.min(index, 5) * 0.04} className="bg-card">
              <div className="h-full p-6">
                <h3 className="font-display text-lg font-semibold leading-snug">
                  {category[language]}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
