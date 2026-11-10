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
 * overflow-hidden box whose width animates in `steps()`. `steps()` divides the
 * whole animation, so with the original's four-stage keyframes each step covers
 * several characters at once, which is the "in chunks" look. The reveal is a
 * character counter here instead: one character per tick. The chrome, the
 * rhythm (type, hold, erase) and the caret are the original's.
 *
 * It cycles through the packages one at a time rather than typing the whole
 * list, so each name gets a moment on its own and the line never has to wrap.
 * The screen reader gets the full command in one go instead, since a caret
 * looping over four package names is decoration, not content.
 *
 * The command sits on its own line above the package. That is how the command
 * would be typed anyway, and it means the card's height does not jump when
 * `scikit-learn` follows `pandas`.
 *
 * Under `prefers-reduced-motion` the whole command is shown at once and no timer
 * ever starts.
 */
const PROMPT = "$";
const COMMAND = "pip install";

/** Typed one at a time, in this order, forever. */
const PACKAGES = ["pandas", "scikit-learn", "torch", "langchain"] as const;

const TYPE_MS = 85;
const ERASE_MS = 40;
const HOLD_MS = 1500;
const GAP_MS = 450;

/**
 * Types one word in, holds it, erases it, moves to the next, and wraps around.
 *
 * A single timeout chain rather than an interval: each phase decides its own
 * delay, so typing, erasing and the pause between words can run at different
 * speeds without three timers to keep in step. Returns the part of the current
 * word typed so far.
 */
function useCyclingTypewriter(words: readonly string[]) {
  const reduced = useReducedMotion();
  const [state, setState] = useState(() => ({ index: 0, count: reduced ? words[0].length : 0 }));

  useEffect(() => {
    if (reduced) {
      // One word, complete, no timers: with reduced motion nothing should be
      // appearing and disappearing in the corner of the eye.
      setState({ index: 0, count: words[0].length });
      return;
    }

    let index = 0;
    let count = 0;
    let timer: number;
    const push = () => setState({ index, count });

    const type = () => {
      count += 1;
      push();
      timer = window.setTimeout(count < words[index].length ? type : hold, TYPE_MS);
    };
    const hold = () => {
      timer = window.setTimeout(erase, HOLD_MS);
    };
    const erase = () => {
      count -= 1;
      push();
      timer = window.setTimeout(count > 0 ? erase : next, ERASE_MS);
    };
    const next = () => {
      index = (index + 1) % words.length;
      push();
      timer = window.setTimeout(type, GAP_MS);
    };

    timer = window.setTimeout(type, 600);
    return () => window.clearTimeout(timer);
  }, [words, reduced]);

  return words[state.index].slice(0, state.count);
}

interface TerminalCardProps {
  /** Shown in the title bar. */
  title: string;
  className?: string;
}

export function TerminalCard({ title, className }: TerminalCardProps) {
  const typed = useCyclingTypewriter(PACKAGES);

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
          <p className="sr-only">{`${PROMPT} ${COMMAND} ${PACKAGES.join(" ")}`}</p>
          <div
            aria-hidden="true"
            className="font-mono text-[0.6875rem] leading-[1.5]"
          >
            <p className="whitespace-nowrap">
              <span className="text-muted-foreground">{PROMPT} </span>
              <span className="font-medium text-primary">{COMMAND}</span>
            </p>
            <p className="whitespace-nowrap pl-[1.2em]">
              <span className="text-foreground">{typed}</span>
              <span className="terminal-caret ml-px inline-block h-[0.95em] w-[1px] translate-y-[2px] bg-highlight" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
