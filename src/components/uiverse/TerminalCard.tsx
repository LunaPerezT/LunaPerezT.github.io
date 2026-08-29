import { cn } from "@/lib/utils";

/**
 * Adapted from "smooth-quail-87" by ilkhoeri on uiverse.io (MIT).
 * https://uiverse.io/ilkhoeri/smooth-quail-87
 *
 * A terminal chrome with a command that types itself in and out: the typed part
 * is a `::before` carrying `content: attr(data-cmd)` inside an `overflow:
 * hidden` box whose width is animated in `steps()`, with a second pseudo-element
 * as the blinking cursor. The rhythm is the original's, four stages over 8s.
 *
 * Three changes. The command is `pip install pandas` rather than
 * `npx create-react-app@latest`. The original's widths are hard-coded pixels
 * measured against that one string, so they are `ch` here and the step count is
 * the character count, which means changing the command needs no re-measuring.
 * And it is sized to sit under the featured-case card at the same width, so the
 * type scale is smaller than the original's 16px.
 *
 * The copy button of the original is gone: it copied the command to the
 * clipboard, and a decorative control that does nothing is worse than no
 * control. What is left is `aria-hidden`, because a caret animating across a
 * shell prompt is decoration, and the command is announced once as static text.
 */
const PROMPT = "$";
const COMMAND = "pip install";
const TYPED = "pandas";

interface TerminalCardProps {
  /** Shown in the title bar. */
  title: string;
  className?: string;
}

export function TerminalCard({ title, className }: TerminalCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card/60 p-2.5 shadow-md backdrop-blur-lg",
        className
      )}
    >
      <div className="overflow-hidden rounded-lg border border-border">
        {/* Title bar */}
        <div className="flex min-h-9 items-center gap-2 bg-background-alt px-2.5 dark:bg-[hsl(var(--background))]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0 text-primary"
          >
            <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" />
          </svg>
          <span className="truncate font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
        </div>

        {/* Body. The animation is decoration; the command itself is read once. */}
        <div className="overflow-hidden bg-[hsl(220_32%_6%)] px-2.5 py-3">
          <p className="sr-only">{`${PROMPT} ${COMMAND} ${TYPED}`}</p>
          <pre
            aria-hidden="true"
            className="flex items-center whitespace-pre font-mono text-[0.6875rem] leading-[1.2]"
          >
            <code className="text-white/35">{PROMPT}&nbsp;</code>
            <code className="text-[hsl(213_90%_66%)]">{COMMAND}&nbsp;</code>
            <code
              className="terminal-cmd text-white/90"
              data-cmd={TYPED}
              style={
                {
                  "--cmd-len": `${TYPED.length}ch`,
                  "--cmd-steps": TYPED.length,
                } as React.CSSProperties
              }
            />
          </pre>
        </div>
      </div>
    </div>
  );
}
