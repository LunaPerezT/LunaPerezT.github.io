import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function AboutSection() {
  const { t } = useLanguage();

  const principles = ["about.value1", "about.value2", "about.value3"] as const;

  return (
    <section id="about" className="section-shell rule-top section-band scroll-mt-24">
      <div className="container">
        <SectionHeading eyebrow={t("about.subtitle")} title={t("about.title")} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal className="prose-case min-w-0 max-w-2xl space-y-5 text-base md:text-lg">
            <p>{t("about.bio1")}</p>
            <p>{t("about.bio2")}</p>
            <p>{t("about.bio3")}</p>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <p className="eyebrow mb-5">{t("about.principles")}</p>
            <ol className="divide-hairline rounded-xl border border-border bg-card">
              {principles.map((key, index) => (
                <li key={key} className="flex gap-4 p-5">
                  <span
                    className="metric-value shrink-0 text-sm text-primary"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {t(`${key}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
