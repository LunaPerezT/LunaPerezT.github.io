import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const LANGUAGES: { code: Language; short: string; full: string }[] = [
  { code: "es", short: "ES", full: "Español" },
  { code: "en", short: "EN", full: "English" },
];

/**
 * Two languages do not need a dropdown — a segmented control shows the choice
 * and makes the switch one click instead of two.
 */
export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("language.select")}
      className="ml-1 flex items-center rounded-lg border border-border p-0.5"
    >
      {LANGUAGES.map((item) => {
        const selected = language === item.code;
        return (
          <button
            key={item.code}
            type="button"
            lang={item.code}
            onClick={() => setLanguage(item.code)}
            aria-pressed={selected}
            title={item.full}
            className={cn(
              "cursor-pointer rounded-md px-2 py-1.5 font-mono text-[0.6875rem] font-medium tracking-wider transition-colors",
              selected
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.short}
            <span className="sr-only"> — {item.full}</span>
          </button>
        );
      })}
    </div>
  );
}
