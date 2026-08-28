import { ChevronDown, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { certifications } from "@/data/portfolio-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

export function CertificationsSection() {
  const { language, t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);
  const baseId = useId();

  return (
    <section id="certifications" className="section-shell rule-top scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t("certifications.subtitle")}
          title={t("certifications.title")}
          description={t("certifications.description")}
        />

        <ul className="grid overflow-hidden rounded-xl border border-border md:grid-cols-2">
          {certifications.map((cert, index) => {
            const panelId = `${baseId}-panel-${index}`;
            const isOpen = expanded === cert.url;

            return (
              <li
                key={cert.url}
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
                    onClick={() => setExpanded(isOpen ? null : cert.url)}
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
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                        >
                          {t("certifications.view")}
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
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
