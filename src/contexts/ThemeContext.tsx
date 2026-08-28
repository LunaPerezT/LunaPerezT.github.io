import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "luna-theme";

/**
 * The provider is the only place that knows *how* the theme is stored.
 * Consumers see state and actions; swapping localStorage for a cookie or a
 * user preference on the server would not touch a single consumer.
 */
interface ThemeContextValue {
  state: { theme: Theme };
  actions: { setTheme: (theme: Theme) => void; toggleTheme: () => void };
  meta: { isDark: boolean };
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage blocked — fall through to the OS preference */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* nothing to do — the class is applied either way */
    }
  }, [theme]);

  // Follow the OS only while the visitor has not made a choice of their own.
  useEffect(() => {
    let hasStoredChoice = false;
    try {
      hasStoredChoice = window.localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      hasStoredChoice = false;
    }
    if (hasStoredChoice) return;

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) =>
      setThemeState(event.matches ? "dark" : "light");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((current) => (current === "dark" ? "light" : "dark")),
    []
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      state: { theme },
      actions: { setTheme, toggleTheme },
      meta: { isDark: theme === "dark" },
    }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside a ThemeProvider");
  return context;
}
