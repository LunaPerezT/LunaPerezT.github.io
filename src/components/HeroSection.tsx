import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { socialLinks } from "@/data/portfolio-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { SplineBackdrop } from "./SplineBackdrop";
import { GradientLink } from "./uiverse/GradientButton";
import { OrbitCard } from "./uiverse/OrbitCard";
import { AnimatedNumber } from "./AnimatedNumber";

/**
 * Three numbers taken from wiki facts.json, each linking to the case study it
 * came from. They replaced "5 projects / 100% focus / 45+ tools" — a stat is
 * only worth the space if a reader can go and check it.
 */
const PROOF = [
  {
    id: "ecg-heartbeat-categorization",
    value: "0.917",
    label: { en: "macro-F1 over 124k heartbeats", es: "macro-F1 sobre 124.000 latidos" },
    note: { en: "MIT-BIH test · Spark + PyTorch", es: "test MIT-BIH · Spark + PyTorch" },
  },
  {
    id: "cabify-route-divergence",
    value: "75.5%",
    label: { en: "of journeys automated", es: "de trayectos automatizados" },
    note: { en: "at 97.9% accuracy", es: "con un 97,9 % de acierto" },
  },
  {
    id: "brain-tumor-detection",
    value: "0.846",
    label: { en: "Dice, tumour segmentation", es: "Dice, segmentación de tumores" },
    note: { en: "deployed on AWS App Runner", es: "desplegado en AWS App Runner" },
  },
] as const;

export function HeroSection() {
  const { language, t } = useLanguage();

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-24 sm:px-8 md:pb-24 md:pt-32">
      <div className="grid-paper absolute inset-0 -z-10" aria-hidden="true" />
      <SplineBackdrop className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />

      <div className="container">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 max-w-3xl"
        >
          <p className="eyebrow eyebrow-accent">{t("hero.welcome")}</p>

          <h1 className="mt-5">Luna Pérez Troncoso</h1>

          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm uppercase tracking-[0.14em] text-muted-foreground">
            <span>Data Scientist</span>
            <span className="text-border-strong" aria-hidden="true">
              /
            </span>
            <span>AI Engineer</span>
            <span className="text-border-strong" aria-hidden="true">
              /
            </span>
            <span>Madrid</span>
          </p>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t("hero.summary")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <GradientLink href="#projects">
              {t("hero.viewProjects")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </GradientLink>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-medium transition-colors hover:border-border-strong"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t("hero.contact")}
            </a>

            <div className="flex items-center gap-1">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden justify-self-end lg:block"
          >
            <OrbitCard
              eyebrow={t("hero.featured")}
              title="ECG"
              subtitle={t("hero.featured.subtitle")}
              footnote="macro-F1 0.917"
              to="/project/ecg-heartbeat-categorization"
              cta={t("hero.proof.cta")}
            />
          </motion.div>
        </div>

        {/* Proof band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 md:mt-20"
        >
          <p className="eyebrow mb-4">{t("hero.proof.label")}</p>
          <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {PROOF.map((item) => (
              <li key={item.id} className="bg-card">
                <Link
                  to={`/project/${item.id}`}
                  className="group block h-full p-5 transition-colors hover:bg-background-alt"
                >
                  <AnimatedNumber
                    value={item.value}
                    className="metric-value block text-3xl leading-none text-highlight md:text-4xl"
                  />
                  <span className="mt-2.5 block text-sm font-medium leading-snug text-foreground">
                    {item.label[language]}
                  </span>
                  <span className="metric-label mt-1 block">{item.note[language]}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {t("hero.proof.cta")}
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
