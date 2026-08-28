import { CATEGORY_LABELS } from "@/data/portfolio-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useProjectFilter, type FilterValue } from "./ProjectFilterProvider";

/**
 * A single-select filter, built as a tab list so arrow keys work the way a
 * keyboard user expects rather than requiring nine tab stops.
 */
export function ProjectFilterBar() {
  const { language, t } = useLanguage();
  const { state, actions, meta } = useProjectFilter();

  const labelFor = (value: FilterValue) =>
    value === "all" ? t("projects.filter.all") : CATEGORY_LABELS[value][language];

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const index = meta.available.indexOf(state.active);
    const last = meta.available.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % meta.available.length
        : event.key === "ArrowLeft"
          ? (index - 1 + meta.available.length) % meta.available.length
          : event.key === "Home"
            ? 0
            : last;

    actions.select(meta.available[next]);
    const target = event.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]")[next];
    target?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={t("projects.filter.label")}
      onKeyDown={onKeyDown}
      className="scroll-row -mx-5 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
    >
      {meta.available.map((value) => {
        const selected = state.active === value;
        return (
          <button
            key={value}
            role="tab"
            type="button"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => actions.select(value)}
            className={cn(
              "inline-flex min-h-11 shrink-0 snap-start cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200",
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-border-strong hover:text-foreground"
            )}
          >
            {labelFor(value)}
            <span
              className={cn(
                "font-mono text-[0.6875rem] tabular-nums",
                selected ? "text-primary-foreground/75" : "text-muted-foreground/70"
              )}
            >
              {meta.counts[value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
