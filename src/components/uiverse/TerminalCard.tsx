import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Adapted from "smooth-quail-87" by ilkhoeri on uiverse.io (MIT).
 * https://uiverse.io/ilkhoeri/smooth-quail-87
 *
 * A terminal chrome with a command that types itself in and out.
 *
 * The original does this in pure CSS: `content: attr(data-cmd)` inside an
 * overflow-hidden box whose width animates in `steps()`. That mechanism has two
 * limits this card runs into. `steps()` divides the whole animation, so with the
 * original's four-stage keyframes each step covers several characters at once,
 * which is the "in chunks" look. And a width animation can only reveal one line,
 * while `pandas numpy scikit-learn tensorflow` needs three at this card's width.
 *
 * So the reveal is a character counter here instead: one character per tick,
 * text wrapping normally, a caret that keeps blinking while it types. The
 * chrome, the rhythm (type, hold, erase) and the caret are the original's.
 *
 * Under `prefers-reduced-motion` the whole command is shown at once and no timer
 * ever starts.
 */
const PROMPT = "$";
const COMMAND = "pip install";
const PACKAGES = "pandas numpy scikit-learn tensorflow";

const TYPE_MS = 70;
const ERASE_MS = 25;
const HOLD_MS = 2600;
const RESTART_MS = 700;

/** Reveals `text` one character at a time, then erases it, forever. */
function useTypewriter(text: string) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(() => (reduced ? text.length : 0));

  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      return;
    }

    let n = 0;
    let timer: number;

    const type = () => {
      n += 1;
      setCount(n);
      timer = window.setTimeout(n < text.length ? type : hold, TYPE_MS);
    };
    const hold = () => {
      timer = window.setTimeout(erase, HOLD_MS);
    };
    const erase = () => {
      n -= 1;
      setCount(n);
      timer = window.setTimeout(n > 0 ? erase : restart, ERASE_MS);
    };
    const restart = () => {
      timer = window.setTimeout(type, RESTART_MS);
    };

    timer = window.setTimeout(type, 600);
    return () => window.clearTimeout(timer);
  }, [text, reduced]);

  return text.slice(0, count);
}

interface TerminalCardProps {
  /** Shown in the title bar. */
  title: string;
  className?: string;
}

export function TerminalCard({ title, className }: TerminalCardProps) {
  const typed = useTypewriter(PACKAGES);

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

        {/* Body. The original hard-codes a black body; here it follows the
            theme, so the card is not a black hole in the light hero. */}
        <div className="bg-background-alt px-2.5 py-2.5 dark:bg-[hsl(220_32%_6%)]">
          {/* The command is announced once as static text; the caret is not. */}
          <p className="sr-only">{`${PROMPT} ${COMMAND} ${PACKAGES}`}</p>
          <p
            aria-hidden="true"
            className="whitespace-pre-wrap break-words font-mono text-[0.6875rem] leading-[1.45]"
          >
            <span className="text-muted-foreground">{PROMPT} </span>
            <span className="font-medium text-primary">{COMMAND} </span>
            <span className="text-foreground">{typed}</span>
            <span
              className="terminal-caret ml-px inline-block h-[0.95em] w-[1px] translate-y-[2px] bg-highlight"
              aria-hidden="true"
            />
          </p>
        </div>
      </div>
    </div>
  );
}
