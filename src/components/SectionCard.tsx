import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The project card's shell, extracted so skills, education and certifications
 * can be the same kind of object on the page: a bordered card that lifts on
 * hover, in a gapped grid, rather than cells sharing one hairline box.
 *
 * It is deliberately only the shell. ProjectCard keeps its own compound parts
 * because a project card has an eyebrow, metrics, tags and a caveat; these
 * sections have nothing like that, and pushing them through the same parts
 * would mean options nobody wants.
 *
 * Kept in sync with ProjectCard.Root by hand. If the card treatment changes,
 * both change: two call sites is a fair price for not forcing an abstraction
 * over two things that only happen to look alike today.
 */
const TAGS = {
  article: motion.article,
  li: motion.li,
  div: motion.div,
} as const;

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Staggers a grid without giving every card its own Reveal. */
  delay?: number;
  as?: keyof typeof TAGS;
  /**
   * Which hover treatment the card gets. `glow` is the default and is what
   * every card on the page uses; `spin` is the skills grid only. Both are
   * defined in index.css, where the adaptations are documented.
   */
  hover?: "glow" | "spin";
}

export function SectionCard({
  children,
  className,
  delay = 0,
  as = "article",
  hover = "glow",
}: SectionCardProps) {
  const Tag = TAGS[as];

  return (
    <Tag
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card",
        "shadow-sm transition-[box-shadow,border-color] duration-200",
        "hover:border-border-strong",
        "focus-within:border-primary/50",
        hover === "spin" ? "halo-spin" : "card-glow",
        className
      )}
    >
      {children}
    </Tag>
  );
}
