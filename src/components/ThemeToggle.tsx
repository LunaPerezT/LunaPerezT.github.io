import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function ThemeToggle() {
  const { state, actions, meta } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={actions.toggleTheme}
      aria-label={meta.isDark ? t("theme.toLight") : t("theme.toDark")}
      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {/* Both icons are rendered and cross-faded so the button never reflows. */}
      <span className="relative block h-5 w-5">
        <Sun
          className="absolute inset-0 h-5 w-5 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
          aria-hidden="true"
        />
        <Moon
          className="absolute inset-0 h-5 w-5 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100"
          aria-hidden="true"
        />
      </span>
      <span className="sr-only">{state.theme}</span>
    </button>
  );
}
