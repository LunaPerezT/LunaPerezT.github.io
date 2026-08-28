/**
 * Bakes the official brand marks this site uses into `src/data/brand-icons.ts`,
 * so the tool wall needs no network at all. Icons that load from a CDN break
 * silently — that is what this replaces.
 *
 * Run after adding a tool:  node scripts/generate-brand-icons.mjs
 *
 * Source: simple-icons (https://simpleicons.org), CC0-1.0. Each mark stays the
 * property of its brand; simple-icons exists for exactly this use.
 */
import { writeFileSync } from "node:fs";
import * as si from "simple-icons";

/** slug in simple-icons -> the name shown on the tile. */
const WANTED = {
  // Languages & core
  python: "Python",
  r: "R",
  javascript: "JavaScript",
  nodedotjs: "Node.js",
  gnubash: "Bash",
  markdown: "Markdown",
  // ML / DL
  tensorflow: "TensorFlow",
  pytorch: "PyTorch",
  keras: "Keras",
  scikitlearn: "Scikit-learn",
  optuna: "Optuna",
  opencv: "OpenCV",
  // Data engineering & MLOps
  apachespark: "Apache Spark",
  databricks: "Databricks",
  apacheparquet: "Apache Parquet",
  apachearrow: "Apache Arrow",
  mlflow: "MLflow",
  pytest: "pytest",
  apachehadoop: "Apache Hadoop",
  // Agentic AI
  modelcontextprotocol: "Model Context Protocol",
  ollama: "Ollama",
  langchain: "LangChain",
  langgraph: "LangGraph",
  huggingface: "Hugging Face",
  // Analysis & viz
  pandas: "pandas",
  numpy: "NumPy",
  scipy: "SciPy",
  plotly: "Plotly",
  geopandas: "GeoPandas",
  folium: "Folium",
  // Databases
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  mongodb: "MongoDB",
  mariadb: "MariaDB",
  sqlite: "SQLite",
  // Cloud & DevOps
  googlecloud: "Google Cloud",
  docker: "Docker",
  git: "Git",
  linux: "Linux",
  // Frameworks & environments
  streamlit: "Streamlit",
  flask: "Flask",
  django: "Django",
  fastapi: "FastAPI",
  selenium: "Selenium",
  postman: "Postman",
  jupyter: "Jupyter",
  rstudioide: "RStudio",
};

/* --- colour handling -------------------------------------------------------
   Many official marks are pure black (#000000), which disappears on the dark
   theme. Store a second, lightened value and let the component pick. */

function hexToHsl(hex) {
  const n = parseInt(hex, 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h, s, l) {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const c = l / 100 - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, "0");
  };
  return `${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

/* Surfaces the marks sit on. Keep in sync with --card in src/index.css. */
const LIGHT_SURFACE = [255, 255, 255];
const DARK_SURFACE = [26, 24, 23]; // hsl(24 9% 10%)

function hexToRgb(hex) {
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function luminance([r, g, b]) {
  const f = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Walk a brand colour's lightness until the mark clears 3:1 against the surface
 * it will sit on — the WCAG floor for non-text. Hue and saturation are kept, so
 * the mark still reads as the brand; only pure greys give up and go neutral.
 */
function fit(hex, surface, direction) {
  const [h, s] = hexToHsl(hex);
  let [, , l] = hexToHsl(hex);
  if (contrast(hexToRgb(hex), surface) >= 3) return hex.toUpperCase();

  const sat = s < 12 ? 0 : Math.max(s, 45);
  for (let step = 0; step <= 100; step += 2) {
    const next = direction === "darker" ? l - step : l + step;
    if (next < 0 || next > 100) break;
    const candidate = hslToHex(h, sat, next);
    if (contrast(hexToRgb(candidate), surface) >= 3) return candidate;
  }
  return direction === "darker" ? "3B3733" : "D6D1CA";
}

const forLight = (hex) => fit(hex, LIGHT_SURFACE, "darker");
const forDark = (hex) => fit(hex, DARK_SURFACE, "lighter");

const entries = [];
const missing = [];
for (const [slug, title] of Object.entries(WANTED)) {
  const key = "si" + slug.charAt(0).toUpperCase() + slug.slice(1);
  const icon = si[key];
  if (!icon) {
    missing.push(slug);
    continue;
  }
  entries.push({
    slug,
    title,
    light: forLight(icon.hex),
    dark: forDark(icon.hex),
    path: icon.path,
  });
}

if (missing.length) {
  console.error("Not in simple-icons, needs a concept mark instead:", missing.join(", "));
}

const body = entries
  .map(
    (e) =>
      `  ${JSON.stringify(e.slug)}: {\n` +
      `    title: ${JSON.stringify(e.title)},\n` +
      `    light: "#${e.light}",\n` +
      `    dark: "#${e.dark}",\n` +
      `    path: ${JSON.stringify(e.path)},\n` +
      `  },`
  )
  .join("\n");

const file = `// GENERATED FILE — do not edit by hand.
// Run: node scripts/generate-brand-icons.mjs
//
// Official brand marks bundled from simple-icons (https://simpleicons.org),
// released under CC0-1.0. Each mark remains the property of its brand.
// Bundling them means the tool wall never depends on a CDN staying up.
//
// \`light\` / \`dark\` are the brand colour adjusted so the mark stays legible on
// both the warm-paper and the near-black surface. Where the brand colour already
// reads on both, it is unchanged.

export interface BrandIcon {
  title: string;
  light: string;
  dark: string;
  /** Single 24×24 path, filled. */
  path: string;
}

export const brandIcons = {
${body}
} as const satisfies Record<string, BrandIcon>;

export type BrandSlug = keyof typeof brandIcons;
`;

writeFileSync("src/data/brand-icons.ts", file);
console.log(`Wrote src/data/brand-icons.ts — ${entries.length} marks.`);
