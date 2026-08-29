import type { GlyphKind } from "@/data/portfolio-data";

/**
 * Every geometry element carries `pathLength={1}`, which normalises the dash
 * maths so one set of trace keyframes works for all nine motifs regardless of
 * how long each path really is. See `.glyph-trace` in index.css.
 *
 * A line-drawn motif per project, used instead of stock imagery. Everything is
 * drawn with `currentColor`, so the caller sets the colour and the opacity and
 * the glyph works in both themes without a second asset.
 *
 * Purely decorative: `aria-hidden` and no accessible name.
 */
const PATHS: Record<GlyphKind, React.ReactNode> = {
  // Two heartbeats: baseline, P wave, QRS complex, T wave, twice.
  //
  // One continuous path on a single baseline at y=38. The previous version drew
  // each beat as its own subpath and the first one ended six units low, so the
  // second started with a visible step; it also spiked to y=8, which the card's
  // `overflow-hidden` clipped. Every vertex here returns to 38, and the extremes
  // (16 and 46) sit well inside the 0..64 box.
  ecg: (
    <path
      pathLength={1}
      d="M0 38 H14 q3-5 6 0 H24 l2 5 3-27 3 30 2-8 H40 q5-9 10 0 H78 q3-5 6 0 H88 l2 5 3-27 3 30 2-8 H104 q5-9 10 0 H128"
    />
  ),
  // An estimated route and the one actually driven, diverging then rejoining.
  route: (
    <>
      <path pathLength={1} d="M4 50 C22 50 26 18 46 18 C68 18 72 44 94 44 C108 44 114 26 124 26" />
      <path pathLength={1}
        d="M4 50 C22 50 28 34 46 34 C70 34 66 8 92 8 C110 8 116 26 124 26"
        strokeDasharray="5 4"
      />
      <circle pathLength={1} cx="4" cy="50" r="3" fill="currentColor" stroke="none" />
      <circle pathLength={1} cx="124" cy="26" r="3" fill="currentColor" stroke="none" />
    </>
  ),
  // Nested contours: a segmentation mask over a slice.
  scan: (
    <>
      <rect pathLength={1} x="6" y="6" width="116" height="52" rx="8" strokeDasharray="3 5" />
      <path pathLength={1} d="M44 40 C34 40 30 28 40 22 C48 17 62 15 72 20 C84 26 82 40 70 42 C60 44 52 40 44 40Z" />
      <path pathLength={1} d="M50 34 C46 32 48 26 54 25 C62 24 68 27 66 32 C64 36 56 36 50 34Z" />
    </>
  ),
  // Randomisation: one population split into treatment arms.
  experiment: (
    <>
      <path pathLength={1} d="M8 32 H36" />
      <path pathLength={1} d="M36 32 C50 32 50 10 64 10 H92" />
      <path pathLength={1} d="M36 32 C50 32 50 54 64 54 H92" />
      <circle pathLength={1} cx="8" cy="32" r="4" />
      <circle pathLength={1} cx="100" cy="10" r="7" />
      <circle pathLength={1} cx="100" cy="54" r="7" strokeDasharray="3 3" />
    </>
  ),
  // History, a forecast origin, and a widening interval.
  forecast: (
    <>
      <path pathLength={1} d="M4 46 L14 40 L22 48 L31 34 L40 42 L49 30 L58 38 L66 28" />
      <path pathLength={1} d="M66 28 L124 20" strokeDasharray="5 4" />
      <path pathLength={1} d="M66 28 L124 6" strokeDasharray="2 4" opacity="0.65" />
      <path pathLength={1} d="M66 28 L124 40" strokeDasharray="2 4" opacity="0.65" />
      <path pathLength={1} d="M66 4 V58" strokeDasharray="3 4" opacity="0.5" />
    </>
  ),
  // A prompt, a generated statement, a returned table.
  query: (
    <>
      <path pathLength={1} d="M10 18 L18 26 L10 34" />
      <path pathLength={1} d="M26 34 H52" />
      <rect pathLength={1} x="66" y="12" width="56" height="40" rx="5" />
      <path pathLength={1} d="M66 26 H122 M84 26 V52 M103 26 V52" />
    </>
  ),
  // Two classes and the boundary that separates them.
  cohort: (
    <>
      <path pathLength={1} d="M12 56 C40 44 46 20 108 12" strokeDasharray="5 4" />
      <circle pathLength={1} cx="30" cy="20" r="3.5" />
      <circle pathLength={1} cx="46" cy="14" r="3.5" />
      <circle pathLength={1} cx="62" cy="22" r="3.5" />
      <circle pathLength={1} cx="80" cy="16" r="3.5" />
      <circle pathLength={1} cx="28" cy="44" r="3.5" fill="currentColor" stroke="none" />
      <circle pathLength={1} cx="48" cy="50" r="3.5" fill="currentColor" stroke="none" />
      <circle pathLength={1} cx="70" cy="44" r="3.5" fill="currentColor" stroke="none" />
      <circle pathLength={1} cx="92" cy="50" r="3.5" fill="currentColor" stroke="none" />
    </>
  ),
  // A graticule: the choropleth reduced to its grid.
  atlas: (
    <>
      <circle pathLength={1} cx="64" cy="32" r="26" />
      <path pathLength={1} d="M64 6 C48 16 48 48 64 58 C80 48 80 16 64 6Z" />
      <path pathLength={1} d="M38 32 H90 M42 20 H86 M42 44 H86" />
    </>
  ),
  // Linked tables with a declared key.
  schema: (
    <>
      <rect pathLength={1} x="6" y="10" width="34" height="20" rx="3" />
      <rect pathLength={1} x="6" y="38" width="34" height="16" rx="3" />
      <rect pathLength={1} x="88" y="22" width="34" height="24" rx="3" />
      <rect pathLength={1} x="47" y="4" width="34" height="18" rx="3" />
      <path pathLength={1} d="M40 20 H47 M40 46 C64 46 64 34 88 34 M81 13 C86 13 84 30 88 32" />
    </>
  ),
};

interface ProjectGlyphProps {
  kind: GlyphKind;
  className?: string;
}

export function ProjectGlyph({ kind, className }: ProjectGlyphProps) {
  return (
    <svg
      viewBox="0 0 128 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[kind]}
    </svg>
  );
}
