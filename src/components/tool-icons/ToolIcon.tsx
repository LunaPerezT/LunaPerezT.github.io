import { useState } from "react";
import { brandIcons, type BrandSlug } from "@/data/brand-icons";
import { ConceptMark, type ConceptMarkId } from "./ConceptMark";
import { cn } from "@/lib/utils";

/**
 * A tool's mark, in priority order:
 *
 *   brand  — official mark, bundled from simple-icons. No network, correct colour
 *            on both themes (the generator fits each to 3:1 against its surface).
 *   mark   — a hand-drawn concept mark for tools with no official icon anywhere.
 *   image  — the last resort, for brands neither set covers. Can fail; falls back.
 *   none   — initials, which is also what a failed `image` becomes.
 *
 * Every branch is decorative: the tile always renders the tool's name in text
 * beside it, so nothing here needs an accessible name.
 */
export interface ToolIconSpec {
  brand?: BrandSlug;
  mark?: ConceptMarkId;
  image?: string;
}

function initialsOf(name: string) {
  const parts = name.split(/[\s.-]+/).filter(Boolean);
  const letters = parts.map((part) => part[0]).join("");
  return (letters.slice(0, 2) || name.slice(0, 2)).toUpperCase();
}

export function ToolIcon({
  name,
  brand,
  mark,
  image,
  className,
}: ToolIconSpec & { name: string; className?: string }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (brand) {
    const icon = brandIcons[brand];
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className={cn("[--c:var(--brand-light)] dark:[--c:var(--brand-dark)]", className)}
        style={
          {
            "--brand-light": icon.light,
            "--brand-dark": icon.dark,
          } as React.CSSProperties
        }
      >
        <path d={icon.path} fill="var(--c)" />
      </svg>
    );
  }

  if (mark) {
    return <ConceptMark id={mark} className={cn("text-foreground/70", className)} />;
  }

  if (image && !imageFailed) {
    return (
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setImageFailed(true)}
        className={cn("object-contain", className)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center font-mono text-xs font-semibold text-muted-foreground",
        className
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
