import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  /** Extra content under the description — a link, a caveat, a legend. */
  children?: React.ReactNode;
}

/**
 * Left-aligned by default. Centred section headings read as marketing; this is
 * a technical portfolio, so the eye starts at the same left edge every time.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-10 max-w-2xl md:mb-14", className)}
    >
      <p className="eyebrow eyebrow-accent">{eyebrow}</p>
      <h2 className="mt-3">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
      {children}
    </motion.header>
  );
}
