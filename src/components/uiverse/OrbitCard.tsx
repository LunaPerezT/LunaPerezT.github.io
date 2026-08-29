import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Adapted from "curly-moth-56" by monkey_8812 on uiverse.io (MIT).
 * https://uiverse.io/monkey_8812/curly-moth-56
 *
 * A slowly rotating gradient orb behind a frosted panel, with an asymmetric
 * inner radius and a two-column label overlay. Kept structurally intact; the
 * orb is blue → orange instead of purple → orange, the frame is the site's
 * border rather than white/40, and the content is real rather than "Card /
 * text / 2025".
 *
 * The orb honours `prefers-reduced-motion` through the global CSS rule, which
 * pins every animation to a single frame.
 */
interface OrbitCardProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  footnote: string;
  to: string;
  cta: string;
  className?: string;
}

export function OrbitCard({
  eyebrow,
  title,
  subtitle,
  footnote,
  to,
  cta,
  className,
}: OrbitCardProps) {
  return (
    <div
      className={cn(
        "group relative h-[300px] w-[210px] overflow-hidden rounded-2xl border border-border shadow-md",
        className
      )}
    >
      {/* Backing plate: the asymmetric shape the original is built around. */}
      <div className="absolute inset-0 bg-primary p-1" aria-hidden="true">
        <div className="h-full w-full rounded-xl rounded-br-[40px] rounded-tr-[100px] bg-background-alt dark:bg-[hsl(var(--background))]" />
      </div>

      <div
        className="relative flex h-full w-full items-center justify-center rounded-2xl backdrop-blur-lg"
        aria-hidden="true"
      >
        <div className="h-32 w-32 animate-[spin_14s_linear_infinite] rounded-full bg-gradient-to-tr from-primary to-highlight opacity-90" />
      </div>

      <div className="absolute inset-0 flex justify-between p-2">
        <div className="flex w-3/5 flex-col rounded-xl bg-card/60 px-2.5 pb-1.5 pt-3 backdrop-blur-lg">
          <span className="eyebrow eyebrow-accent">{eyebrow}</span>
          <span className="mt-1 font-display text-lg font-semibold leading-tight text-foreground">
            {title}
          </span>
          <span className="mt-1 text-[0.6875rem] leading-snug text-muted-foreground">
            {subtitle}
          </span>
          <span className="mt-auto pt-2 font-mono text-[0.625rem] uppercase tracking-wider text-muted-foreground">
            {footnote}
          </span>
        </div>

        <div className="flex h-full flex-col items-end pt-2">
          <Link
            to={to}
            aria-label={cta}
            className="mt-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-card/70 text-primary backdrop-blur-lg transition-colors duration-300 hover:bg-card hover:text-highlight"
          >
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
