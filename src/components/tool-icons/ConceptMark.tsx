/**
 * Line marks for the tools with no official icon in any reliable set.
 *
 * These are deliberately NOT imitations of the real logos — inventing a brand
 * mark from memory is worse than not having one. Each drawing says what the
 * tool *does*, which for the three boosting libraries happens to be the thing
 * that actually distinguishes them: XGBoost boosts, LightGBM grows leaf-wise,
 * CatBoost grows symmetric (oblivious) trees.
 *
 * All 24×24, stroked in `currentColor`, so the caller sets colour and theme.
 */
export type ConceptMarkId =
  | "sql"
  | "xgboost"
  | "lightgbm"
  | "catboost"
  | "imbalanced-learn"
  | "delta-lake"
  | "darts"
  | "neural-forecast"
  | "stats-forecast"
  | "ml-forecast"
  | "nixtla"
  | "timegpt"
  | "azure-data-factory"
  | "unity-catalog";

const MARKS: Record<ConceptMarkId, React.ReactNode> = {
  // The language, not any one vendor's product.
  sql: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  // A tree, and the boosting round that lifts it.
  xgboost: (
    <>
      <path d="M9 20V15L5.5 11.5M9 15l3.5-3.5" />
      <circle cx="4.6" cy="10.6" r="1.7" />
      <circle cx="13.4" cy="10.6" r="1.7" />
      <path d="M12.5 6.5 L17 3 L21 7" />
      <path d="M17 3v6.5" />
    </>
  ),
  // Leaf-wise growth: the tree deepens on one side instead of levelling out.
  lightgbm: (
    <>
      <path d="M5 4h4M9 4v5h4M13 9v5h4M17 14v5h3" />
      <circle cx="4" cy="4" r="1.6" />
      <circle cx="12.2" cy="9" r="1.6" />
      <circle cx="20.4" cy="19" r="1.6" />
    </>
  ),
  // Oblivious trees: every split at a level uses the same test.
  catboost: (
    <>
      <path d="M12 3.5 3.5 20.5h17L12 3.5Z" />
      <path d="M7.7 12h8.6M5.6 16.2h12.8" />
    </>
  ),
  // The class ratio, and the beam that has to be levelled.
  "imbalanced-learn": (
    <>
      <path d="M12 4v16M6 20h12" />
      <path d="M4.5 9.5 19.5 7" />
      <circle cx="5" cy="13" r="3.2" />
      <circle cx="19.5" cy="9.4" r="1.6" />
    </>
  ),
  // A delta over the lake.
  "delta-lake": (
    <>
      <path d="M12 3 5.5 14h13L12 3Z" />
      <path d="M3 17.6c1.8-1.4 3.6-1.4 5.4 0s3.6 1.4 5.4 0 3.6-1.4 5.4 0" />
      <path d="M3 21c1.8-1.4 3.6-1.4 5.4 0s3.6 1.4 5.4 0 3.6-1.4 5.4 0" />
    </>
  ),
  // The library is named after the game.
  darts: (
    <>
      <circle cx="11" cy="13" r="8" />
      <circle cx="11" cy="13" r="3.4" />
      <path d="M11 13 21 3.5" />
      <path d="M17.5 3.2h3.8v3.8" />
    </>
  ),
  // A net, and the horizon it extends into.
  "neural-forecast": (
    <>
      <circle cx="4.5" cy="7" r="1.5" />
      <circle cx="4.5" cy="17" r="1.5" />
      <circle cx="11.5" cy="12" r="1.5" />
      <path d="M6 7.7 10.2 11M6 16.3 10.2 13" />
      <path d="M13 12h2" strokeDasharray="0 0" />
      <path d="M15 15.5c2-.4 3.2-3.4 6.5-8" strokeDasharray="3 2.6" />
    </>
  ),
  // What was measured, and where it is going.
  "stats-forecast": (
    <>
      <path d="M4 20V13M8.6 20v-4.6M13.2 20v-8.4" />
      <path d="M3 9.4 8 6.2l4.5 2.6" />
      <path d="M12.5 8.8c3 0 5.5-1.9 8.5-5.4" strokeDasharray="3 2.6" />
      <path d="M17.6 3h3.6v3.6" />
    </>
  ),
  // A fitted model, extended forward.
  "ml-forecast": (
    <>
      <circle cx="8.5" cy="12" r="4" />
      <path d="M8.5 5.6v-2M8.5 20.4v-2M2.1 12h-.1M15 12h-.1M4 7.5 3 6.5M13 17.5l1 1" />
      <path d="M13.6 12c3.2 0 4.8-2.2 7.4-5.6" strokeDasharray="3 2.6" />
      <path d="M17.6 6h3.6v3.6" />
    </>
  ),
  // The Nixtla ecosystem: one peak the whole family sits under.
  nixtla: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M7 16.2l3.4-6.4 2.5 3.4 1.6-2.4L17 16.2" />
    </>
  ),
  // A clock, and something generated from it.
  timegpt: (
    <>
      <circle cx="10.5" cy="13.5" r="7.5" />
      <path d="M10.5 9.2v4.6l3 1.8" />
      <path d="M18.6 2.4l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3Z" />
    </>
  ),
  // A pipeline: the thing the factory actually builds.
  "azure-data-factory": (
    <>
      <rect x="2.5" y="9" width="5.5" height="6" rx="1.4" />
      <rect x="16" y="9" width="5.5" height="6" rx="1.4" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M8.4 12h1.1M14.6 12h1.2" />
      <path d="M12 9.6V6.4M12 14.4v3.2" />
    </>
  ),
  // Catalogued layers, and the governance over them.
  "unity-catalog": (
    <>
      <path d="M12 3 3.5 6.8 12 10.6l8.5-3.8L12 3Z" />
      <path d="M3.5 11.4 12 15.2l8.5-3.8" />
      <path d="M3.5 16 12 19.8l8.5-3.8" />
      <path d="M16.2 17.4v-1.6a1.9 1.9 0 0 1 3.8 0v1.6" />
      <rect x="15.4" y="17.4" width="5.4" height="4" rx="1.1" />
    </>
  ),
};

interface ConceptMarkProps {
  id: ConceptMarkId;
  className?: string;
}

export function ConceptMark({ id, className }: ConceptMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {MARKS[id]}
    </svg>
  );
}
