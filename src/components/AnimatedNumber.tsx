import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts a metric up when it scrolls into view.
 *
 * The values on this site are authored strings, not numbers — "0.917",
 * "75.5%", "+14 pts", "3,899", "SELECT", "5 → 7". So this parses out a single
 * number, animates that, and leaves everything around it alone. Anything with
 * no number, or with more than one, renders unchanged: a half-animated
 * "5 → 7" would read as a different fact.
 *
 * Formatting is preserved exactly as authored — decimal places and thousands
 * separators included — so the final frame is byte-identical to the source.
 */
const NUMBER = /-?\d[\d,]*(?:\.\d+)?/g;

interface Parsed {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  grouped: boolean;
}

function parse(value: string): Parsed | null {
  const matches = value.match(NUMBER);
  if (!matches || matches.length !== 1) return null;

  const raw = matches[0];
  const index = value.indexOf(raw);
  const plain = raw.replace(/,/g, "");
  const target = Number(plain);
  if (!Number.isFinite(target)) return null;

  return {
    prefix: value.slice(0, index),
    suffix: value.slice(index + raw.length),
    target,
    decimals: plain.includes(".") ? plain.split(".")[1].length : 0,
    grouped: raw.includes(","),
  };
}

function format(value: number, { decimals, grouped }: Parsed) {
  const fixed = Math.abs(value).toFixed(decimals);
  const sign = value < 0 ? "-" : "";
  if (!grouped) return sign + fixed;
  const [whole, fraction] = fixed.split(".");
  const withSeparators = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return sign + (fraction ? `${withSeparators}.${fraction}` : withSeparators);
}

export function AnimatedNumber({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const parsed = parse(value);

  const [display, setDisplay] = useState(() =>
    parsed ? format(reduced ? parsed.target : 0, parsed) : value
  );

  useEffect(() => {
    if (!parsed) return;
    if (reduced) {
      setDisplay(format(parsed.target, parsed));
      return;
    }
    if (!inView) return;

    const controls = animate(0, parsed.target, {
      // Long enough to read as a measurement settling, short enough not to nag.
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(format(latest, parsed)),
      onComplete: () => setDisplay(format(parsed.target, parsed)),
    });
    return () => controls.stop();
    // `parsed` is derived from `value`; tracking value alone keeps this stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduced]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {/* The final value is always in the DOM for assistive tech and for
          anyone whose animation never runs. */}
      <span aria-hidden="true">
        {parsed.prefix}
        {display}
        {parsed.suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
