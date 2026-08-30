import { motion } from "framer-motion";
import type { ProjectChart } from "@/data/project-charts";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

/**
 * Small horizontal bar charts for the projects that have no screenshots.
 *
 * Deliberate choices, in the order they were made:
 *
 * Form. Every one of these is a magnitude comparison across a handful of named
 * things, which is a bar chart, and horizontal because the labels are phrases
 * rather than dates.
 *
 * Scale. `max` comes from the data file, not from the tallest bar. Auto-scaling
 * three macro-F1 scores to their own maximum turns 0.9166 against 0.8323 into a
 * landslide; against a full axis it reads as what it is.
 *
 * Colour. One hue for the measured value and neutral ink for the reference bars
 * (a baseline, a floor, a naive estimate). This is not a categorical palette
 * where every bar is a peer identity, so the neutral is doing its job rather
 * than failing to be a second series colour. Every bar carries its own printed
 * value, so nothing is encoded in colour alone.
 *
 * Text. Values and labels wear text tokens; the bar beside them carries the
 * emphasis. No tooltip: every value is already visible as text, and a tooltip
 * that reveals what is printed two centimetres away is decoration.
 *
 * The figure is its own table: label and value are real text in reading order,
 * so a screen reader gets the numbers without a parallel markup structure. The
 * bar is `aria-hidden`.
 */
function Bars({ chart }: { chart: ProjectChart }) {
  const { language } = useLanguage();

  return (
    <ul className="mt-5 space-y-3.5">
      {chart.bars.map((bar) => {
        const width = `${Math.min(100, (bar.value / chart.max) * 100)}%`;
        return (
          <li key={bar.label.en}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs leading-snug text-muted-foreground">
                {bar.label[language]}
              </span>
              <span
                className={cn(
                  "metric-value shrink-0 text-sm tabular-nums",
                  bar.reference ? "text-muted-foreground" : "text-foreground"
                )}
              >
                {bar.display[language]}
              </span>
            </div>

            <div
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-border"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "h-full rounded-full",
                  bar.reference ? "bg-muted-foreground/45" : "bg-primary"
                )}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function ProjectCharts({ charts }: { charts: ProjectChart[] }) {
  const { language } = useLanguage();
  if (charts.length === 0) return null;

  return (
    <div className="mb-14 grid gap-4 md:grid-cols-2">
      {charts.map((chart, index) => (
        <motion.figure
          key={chart.title.en}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col rounded-xl border border-border bg-card p-5"
        >
          <p className="font-display text-base font-semibold leading-snug">
            {chart.title[language]}
          </p>

          <Bars chart={chart} />

          <figcaption className="mt-5 border-t border-border pt-3.5 text-xs leading-relaxed text-muted-foreground">
            {chart.caption[language]}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
