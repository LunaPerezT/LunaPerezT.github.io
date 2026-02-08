import { Award, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { certifications } from "@/data/portfolio-data";
import { useLanguage } from "@/contexts/LanguageContext";

export function CertificationsSection() {
  const { language, t } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (i: number) => setExpandedIndex(expandedIndex === i ? null : i);

  return (
    <section id="certifications" className="section-container section-divider">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            {t("certifications.subtitle")}
          </p>
          <h2 className="text-foreground mb-4">{t("certifications.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("certifications.description")}
          </p>
        </motion.div>

        {/* Certifications List */}
        <div className="grid gap-3">
          {certifications.map((cert, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <motion.div
                key={cert.url}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
              >
                {/* Header row - always visible */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center gap-3 p-4 text-left group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                      {cert.name[language]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cert.issuer} · {cert.date}
                    </p>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expandable description */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0">
                        <div className="border-t border-border/50 pt-3">
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                            {cert.description[language]}
                          </p>
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                          >
                            {language === "es" ? "Ver credencial" : "View credential"}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
