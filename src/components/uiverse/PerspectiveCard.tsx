import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Adapted from "smart-liger-5" by Smit-Prajapati on uiverse.io (MIT).
 * https://uiverse.io/Smit-Prajapati/smart-liger-5
 *
 * The whole card tilts in 3D on hover while five stacked blurred circles push
 * out along Z with staggered delays. Structure and timings are the original's;
 * the palette is the one Luna asked for, blue to orange instead of the
 * original's green, and the text is real.
 *
 * Two departures from the original. The social buttons are gone: the same three
 * channels already have a full component of their own in the contact section,
 * and a second copy inside a decorative card was only adding height. And the
 * card fills its column instead of being a fixed 290px portrait, so its edges
 * line up with the "How I work" list underneath rather than floating above it.
 *
 * The tilt is a transform, so `MotionConfig`'s reduced-motion setting does not
 * reach it; the CSS `prefers-reduced-motion` block in index.css does, by
 * collapsing every transition to a single frame.
 */
interface PerspectiveCardProps {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  ctaHref: string;
  className?: string;
}

export function PerspectiveCard({
  eyebrow,
  title,
  body,
  cta,
  ctaHref,
  className,
}: PerspectiveCardProps) {
  return (
    <div
      className={cn(
        // Taller on narrow screens only, where the title wraps and the body
        // needs a third line to avoid being cut off mid-word.
        "persp group/persp h-[236px] w-full [perspective:1000px] sm:h-[208px]",
        className
      )}
    >
      <div
        className={cn(
          "relative h-full rounded-[32px] [transform-style:preserve-3d]",
          "bg-[linear-gradient(135deg,hsl(var(--primary))_0%,hsl(var(--highlight))_100%)]",
          "shadow-[0_25px_25px_-5px_hsl(var(--primary)/0.28)]",
          "transition-all duration-500 ease-in-out",
          "group-hover/persp:[transform:rotate3d(1,1,0,18deg)]",
          "group-hover/persp:shadow-[24px_40px_25px_-40px_hsl(var(--primary)/0.3),0_25px_30px_0_hsl(var(--primary)/0.16)]"
        )}
      >
        {/* Glass plate with the original's asymmetric top-right radius. */}
        <div
          aria-hidden="true"
          className="absolute inset-2 rounded-[26px] rounded-tr-[80px] border-b border-l border-white/80 bg-[linear-gradient(0deg,hsl(0_0%_100%/0.45)_0%,hsl(0_0%_100%/0.88)_100%)] [transform:translate3d(0,0,25px)] [transform-style:preserve-3d] transition-all duration-500 ease-in-out dark:border-white/20 dark:bg-[linear-gradient(0deg,hsl(var(--card)/0.6)_0%,hsl(var(--card)/0.9)_100%)]"
        />

        {/* Stacked discs, each pushed further out on hover. */}
        <div aria-hidden="true" className="absolute right-0 top-0 [transform-style:preserve-3d]">
          {[
            { size: 96, offset: 8, z: 20, delay: "0ms", blur: "blur-[4px]" },
            { size: 78, offset: 12, z: 40, delay: "400ms", blur: "blur-[2px]" },
            { size: 60, offset: 17, z: 60, delay: "800ms", blur: "" },
            { size: 44, offset: 22, z: 80, delay: "1200ms", blur: "" },
            { size: 28, offset: 28, z: 100, delay: "1600ms", blur: "" },
          ].map((circle, index) => (
            <span
              key={circle.size}
              className={cn(
                "persp-disc absolute aspect-square rounded-full bg-primary/15 ring-1 ring-inset ring-white/50 backdrop-blur-[2px] shadow-[-10px_10px_20px_0_hsl(var(--primary)/0.16)] transition-all duration-500 ease-in-out dark:ring-white/15",
                circle.blur
              )}
              style={{
                width: circle.size,
                top: circle.offset,
                right: circle.offset,
                transform: `translate3d(0, 0, ${circle.z}px)`,
                transitionDelay: circle.delay,
                // Each disc travels 20px further out than it starts.
                ["--z-hover" as string]: `${circle.z + (index === 0 ? 0 : 20)}px`,
              }}
            />
          ))}
        </div>

        <div className="relative pl-7 pr-[92px] pt-6 [transform:translate3d(0,0,26px)] sm:pr-[104px] sm:pt-7">
          <span className="eyebrow eyebrow-accent">{eyebrow}</span>
          <p className="mt-1.5 font-display text-lg font-semibold leading-tight text-foreground">
            {title}
          </p>
          <p className="mt-2 line-clamp-3 text-[0.8125rem] leading-relaxed text-muted-foreground sm:line-clamp-2">
            {body}
          </p>
        </div>

        <a
          href={ctaHref}
          className="link-underline absolute bottom-3 left-7 inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-primary [transform:translate3d(0,0,26px)] transition-transform duration-200 hover:[transform:translate3d(0,0,10px)]"
        >
          {cta}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
