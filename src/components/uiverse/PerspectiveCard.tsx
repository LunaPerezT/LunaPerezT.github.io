import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { socialLinks } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

/**
 * Adapted from "smart-liger-5" by Smit-Prajapati on uiverse.io (MIT).
 * https://uiverse.io/Smit-Prajapati/smart-liger-5
 *
 * The whole card tilts in 3D on hover while five stacked blurred circles push
 * out along Z with staggered delays and the social buttons rise to meet them.
 * Structure and timings are the original's; the palette is the one Luna asked
 * for — blue → orange instead of the original's green — and the text is real.
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

const SOCIALS = [
  { Icon: Github, href: socialLinks.github, label: "GitHub", external: true },
  { Icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn", external: true },
  { Icon: Mail, href: `mailto:${socialLinks.email}`, label: "Email", external: false },
] as const;

export function PerspectiveCard({
  eyebrow,
  title,
  body,
  cta,
  ctaHref,
  className,
}: PerspectiveCardProps) {
  return (
    <div className={cn("persp group/persp h-[340px] w-[290px] [perspective:1000px]", className)}>
      <div
        className={cn(
          "relative h-full rounded-[46px] [transform-style:preserve-3d]",
          "bg-[linear-gradient(135deg,hsl(var(--primary))_0%,hsl(var(--highlight))_100%)]",
          "shadow-[0_25px_25px_-5px_hsl(var(--primary)/0.28)]",
          "transition-all duration-500 ease-in-out",
          "group-hover/persp:[transform:rotate3d(1,1,0,26deg)]",
          "group-hover/persp:shadow-[30px_50px_25px_-40px_hsl(var(--primary)/0.3),0_25px_30px_0_hsl(var(--primary)/0.16)]"
        )}
      >
        {/* Glass plate with the original's asymmetric top-right radius. */}
        <div
          aria-hidden="true"
          className="absolute inset-2 rounded-[50px] rounded-tr-full border-b border-l border-white/80 bg-[linear-gradient(0deg,hsl(0_0%_100%/0.45)_0%,hsl(0_0%_100%/0.88)_100%)] [transform:translate3d(0,0,25px)] [transform-style:preserve-3d] transition-all duration-500 ease-in-out dark:border-white/20 dark:bg-[linear-gradient(0deg,hsl(var(--card)/0.6)_0%,hsl(var(--card)/0.9)_100%)]"
        />

        {/* Stacked discs, each pushed further out on hover. */}
        <div aria-hidden="true" className="absolute right-0 top-0 [transform-style:preserve-3d]">
          {[
            { size: 150, offset: 8, z: 20, delay: "0ms", blur: "blur-[5px]" },
            { size: 124, offset: 10, z: 40, delay: "400ms", blur: "blur-[2px]" },
            { size: 98, offset: 17, z: 60, delay: "800ms", blur: "" },
            { size: 72, offset: 23, z: 80, delay: "1200ms", blur: "" },
            { size: 46, offset: 30, z: 100, delay: "1600ms", blur: "" },
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

        <div className="relative pl-8 pr-14 pt-[84px] [transform:translate3d(0,0,26px)]">
          <span className="eyebrow eyebrow-accent">{eyebrow}</span>
          <p className="mt-2 font-display text-xl font-semibold leading-tight text-foreground">
            {title}
          </p>
          <p className="mt-2.5 line-clamp-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
            {body}
          </p>
        </div>

        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between [transform:translate3d(0,0,26px)] [transform-style:preserve-3d]">
          <ul className="flex gap-2.5 [transform-style:preserve-3d]">
            {SOCIALS.map(({ Icon, href, label, external }, index) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  style={{ transitionDelay: `${400 + index * 200}ms` }}
                  className="grid h-11 w-11 place-content-center rounded-full bg-card text-primary shadow-[0_7px_5px_-5px_hsl(var(--primary)/0.5)] transition-all duration-200 ease-in-out hover:bg-foreground hover:text-background group-hover/persp:[transform:translate3d(0,0,50px)] group-hover/persp:shadow-[-5px_20px_10px_0_hsl(var(--primary)/0.2)]"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={ctaHref}
            className="link-underline inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-primary transition-transform duration-200 hover:[transform:translate3d(0,0,10px)]"
          >
            {cta}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
