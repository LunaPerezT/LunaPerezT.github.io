import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/** Appears once the page is long enough behind you to be worth skipping back. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
          }
          aria-label={t("nav.backToTop")}
          className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-md transition-colors hover:border-border-strong hover:text-foreground"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
