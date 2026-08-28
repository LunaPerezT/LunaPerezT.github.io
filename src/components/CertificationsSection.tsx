import { ChevronDown, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useMemo, useState } from "react";
import { certifications, education } from "@/data/portfolio-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Education first — it is the frame the certifications hang on. */
function EducationTimeline() {
  const { language, t } = useLanguage();

  return (
    <div className="mb-16">
      <p className="eyebrow mb-5">{t("education.title")}</p>
      <ol className="divide-hairline rounded-xl border border-border bg-card">
        {education.map((item, index) => (
          <Reveal key={item.title.en} delay={Math.min(index, 3) * 0.05}>
            <li className="p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-semibold leading-snug">
                  {item.title[language]}
                </h3>
                <span className="eyebrow shrink-0">{item.period[language]}</span>
              </div>

              <p className="eyebrow eyebrow-accent mt-1.5">{item.institution}</p>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {item.summary[language]}
              </p>

              {item.topics && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.topics[language].map((topic) => (
                    <li key={topic} className="tag">
                      {topic}
                    </li>
                  ))}
                </ul>
              )}

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  {t("certifications.view")}
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function CertificationsSection() {
  const { language, t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);
  const baseId = useId();

  // Newest first, so the 2026 certifications lead rather than the bootcamp batch.
  const ordered = useMemo(
    () => [...certifications].sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  return (
    <section id="certifications" className="section-shell rule-top scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t("certifications.subtitle")}
          title={t("certifications.title")}
          description={t("certifications.description")}
        />

        <EducationTimeline />

        <p className="eyebrow mb-5">
          {t("certifications.listTitle").replace("{n}", String(ordered.length))}
        </p>

        <ul className="grid overflow-hidden rounded-xl border border-border md:grid-cols-2">
          {ordered.map((cert, index) => {
            const key = cert.url ?? cert.credentialId ?? cert.name.en;
            const panelId = `${baseId}-panel-${index}`;
            const isOpen = expanded === key;

            return (
              <li
                key={key}
                className={cn(
                  "border-border bg-card",
                  index > 0 && "border-t",
                  "md:border-t md:odd:border-r",
                  index < 2 && "md:border-t-0"
                )}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex min-h-11 w-full cursor-pointer items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-background-alt"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium leading-snug transition-colors group-hover:text-primary">
                        {cert.name[language]}
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                        {cert.issuer} · {cert.date}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-5 py-4">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {cert.description[language]}
                        </p>

                        {cert.url ? (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                          >
                            {t("certifications.view")}
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </a>
                        ) : (
                          cert.credentialId && (
                            <p className="mt-3 font-mono text-[0.6875rem] text-muted-foreground">
                              {t("certifications.credentialId")}: {cert.credentialId}
                            </p>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
