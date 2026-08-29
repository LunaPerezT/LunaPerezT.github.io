import { cn } from "@/lib/utils";

/**
 * Adapted from "wonderful-baboon-62" by cssbuttons-io on uiverse.io (MIT).
 * https://uiverse.io/cssbuttons-io/wonderful-baboon-62
 *
 * The original is a gradient shell with 3px of padding around an inner panel
 * that goes transparent on hover, revealing the gradient underneath, and the
 * whole thing scales down on press. Two changes for this site: the gradient is
 * blue → orange rather than purple → cyan, and the inner panel is the page's
 * own surface instead of near-black, because this page is white.
 *
 * Two explicit components rather than an `asChild` prop: the shell and the
 * inner panel are two nested elements, and a Slot would merge the shell's
 * classes onto the consumer's <a>, collapsing them into one — which loses the
 * inner panel entirely and stretches the button to fill its row.
 */
const SHELL = [
  "group/gb relative inline-flex min-h-11 w-auto max-w-full shrink-0 cursor-pointer",
  "select-none items-center justify-center rounded-lg p-[3px] text-sm font-medium",
  "bg-[linear-gradient(144deg,hsl(var(--primary)),hsl(var(--primary-strong))_45%,hsl(var(--highlight)))]",
  "shadow-[0_12px_28px_-10px_hsl(var(--primary)/0.55)]",
  "transition-transform duration-300 active:scale-[0.96]",
  "touch-manipulation whitespace-nowrap no-underline",
].join(" ");

const PANEL = [
  "flex items-center justify-center gap-2 rounded-[5px] px-5 py-2.5",
  "bg-card text-foreground transition-colors duration-300",
  "group-hover/gb:bg-transparent group-hover/gb:text-white",
  "group-focus-visible/gb:bg-transparent group-focus-visible/gb:text-white",
].join(" ");

interface SharedProps {
  children: React.ReactNode;
  className?: string;
  /** Applied to the inner panel, e.g. to make it fill a full-width shell. */
  panelClassName?: string;
}

export function GradientButton({
  children,
  className,
  panelClassName,
  ...props
}: SharedProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(SHELL, className)} {...props}>
      <span className={cn(PANEL, panelClassName)}>{children}</span>
    </button>
  );
}

export function GradientLink({
  children,
  className,
  panelClassName,
  ...props
}: SharedProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(SHELL, className)} {...props}>
      <span className={cn(PANEL, panelClassName)}>{children}</span>
    </a>
  );
}
