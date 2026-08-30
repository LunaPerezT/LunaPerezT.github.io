import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Stagger } from "./Stagger";
import { ToolIcon, type ToolIconSpec } from "./tool-icons/ToolIcon";

type Tool = ToolIconSpec & { name: string };

/**
 * Mirrors the badge blocks on the GitHub profile README.
 *
 * `brand` marks are bundled (see src/data/brand-icons.ts) and never touch the
 * network. `mark` is a hand-drawn concept icon for tools no official set
 * covers. `image` is the last resort — a remote logo that can 404, which is
 * why ToolIcon falls back to initials when one does.
 */
const toolCategories: Record<string, { en: string; es: string; tools: Tool[] }> = {
  languages: {
    en: "Languages & Core",
    es: "Lenguajes y Base",
    tools: [
      { name: "Python", brand: "python" },
      { name: "R", brand: "r" },
      { name: "SQL", mark: "sql" },
      { name: "JavaScript", brand: "javascript" },
      { name: "Node.js", brand: "nodedotjs" },
      { name: "Bash", brand: "gnubash" },
      { name: "Markdown", brand: "markdown" },
    ],
  },
  mlDl: {
    en: "Machine Learning & Deep Learning",
    es: "Machine Learning y Deep Learning",
    tools: [
      { name: "TensorFlow", brand: "tensorflow" },
      { name: "PyTorch", brand: "pytorch" },
      { name: "Keras", brand: "keras" },
      { name: "Scikit-learn", brand: "scikitlearn" },
      { name: "XGBoost", mark: "xgboost" },
      { name: "LightGBM", mark: "lightgbm" },
      { name: "CatBoost", mark: "catboost" },
      { name: "Optuna", brand: "optuna" },
      { name: "imbalanced-learn", mark: "imbalanced-learn" },
      { name: "OpenCV", brand: "opencv" },
    ],
  },
  dataEngineering: {
    en: "Data Engineering & MLOps",
    es: "Ingeniería de Datos y MLOps",
    tools: [
      { name: "PySpark", brand: "apachespark" },
      { name: "Spark ML", brand: "apachespark" },
      { name: "Databricks", brand: "databricks" },
      { name: "Delta Lake", mark: "delta-lake" },
      { name: "Parquet", brand: "apacheparquet" },
      { name: "PyArrow", brand: "apachearrow" },
      { name: "MLflow", brand: "mlflow" },
      { name: "pytest", brand: "pytest" },
      { name: "Hadoop", brand: "apachehadoop" },
    ],
  },
  agenticAi: {
    en: "Agentic AI & LLM Frameworks",
    es: "IA Agéntica y Frameworks LLM",
    tools: [
      { name: "MCP Protocol", brand: "modelcontextprotocol" },
      { name: "Ollama", brand: "ollama" },
      { name: "LangChain", brand: "langchain" },
      { name: "LangGraph", brand: "langgraph" },
      { name: "Hugging Face", brand: "huggingface" },
    ],
  },
  timeSeries: {
    en: "Time Series & Forecasting",
    es: "Series Temporales y Forecasting",
    tools: [
      { name: "Darts", mark: "darts" },
      { name: "NeuralForecast", mark: "neural-forecast" },
      { name: "StatsForecast", mark: "stats-forecast" },
      { name: "MLForecast", mark: "ml-forecast" },
      { name: "Nixtla", mark: "nixtla" },
      { name: "TimeGPT", mark: "timegpt" },
    ],
  },
  dataAnalysis: {
    en: "Data Analysis & Visualization",
    es: "Análisis de Datos y Visualización",
    tools: [
      { name: "Pandas", brand: "pandas" },
      { name: "NumPy", brand: "numpy" },
      { name: "SciPy", brand: "scipy" },
      {
        name: "Matplotlib",
        image:
          "https://raw.githubusercontent.com/devicons/devicon/master/icons/matplotlib/matplotlib-original.svg",
      },
      { name: "Plotly", brand: "plotly" },
      { name: "Seaborn", image: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg" },
      { name: "GeoPandas", brand: "geopandas" },
      { name: "Folium", brand: "folium" },
      {
        name: "ggplot2",
        image: "https://raw.githubusercontent.com/tidyverse/ggplot2/main/man/figures/logo.png",
      },
      { name: "Tableau", image: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
      {
        name: "Power BI",
        image:
          "https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg",
      },
    ],
  },
  databases: {
    en: "Databases",
    es: "Bases de Datos",
    tools: [
      { name: "PostgreSQL", brand: "postgresql" },
      { name: "MySQL", brand: "mysql" },
      { name: "MongoDB", brand: "mongodb" },
      { name: "MariaDB", brand: "mariadb" },
      { name: "SQLite", brand: "sqlite" },
      {
        name: "SQL Server",
        image: "https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg",
      },
    ],
  },
  cloudDevops: {
    en: "Cloud & DevOps",
    es: "Cloud y DevOps",
    tools: [
      {
        name: "AWS",
        image:
          "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      },
      {
        name: "Azure",
        image: "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg",
      },
      { name: "Azure Data Factory", mark: "azure-data-factory" },
      { name: "Unity Catalog", mark: "unity-catalog" },
      { name: "Google Cloud", brand: "googlecloud" },
      { name: "Docker", brand: "docker" },
      { name: "Git", brand: "git" },
      { name: "Linux", brand: "linux" },
    ],
  },
  frameworks: {
    en: "Frameworks & Apps",
    es: "Frameworks y Apps",
    tools: [
      { name: "Streamlit", brand: "streamlit" },
      { name: "Flask", brand: "flask" },
      { name: "FastAPI", brand: "fastapi" },
      { name: "Django", brand: "django" },
      { name: "Selenium", brand: "selenium" },
      { name: "Postman", brand: "postman" },
    ],
  },
  tools: {
    en: "Environments & Tools",
    es: "Entornos y Herramientas",
    tools: [
      { name: "Jupyter", brand: "jupyter" },
      { name: "RStudio", brand: "rstudioide" },
      { name: "Excel", image: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg" },
    ],
  },
  scientific: {
    en: "Scientific Software",
    es: "Software Científico",
    tools: [
      { name: "OriginLab", image: "https://www.originlab.com/images/header_logo.png" },
      { name: "GraphPad Prism", mark: "graphpad-prism" },
      { name: "SPSS Statistics", image: "https://www.vectorlogo.zone/logos/ibm/ibm-icon.svg" },
      { name: "Fiji ImageJ", image: "https://imagej.net/media/icons/imagej.png" },
      {
        name: "Illustrator",
        image:
          "https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg",
      },
      {
        name: "Photoshop",
        image:
          "https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg",
      },
    ],
  },
};

function ToolTile({ tool }: { tool: Tool }) {
  return (
    <div className="group flex flex-col items-center">
      <div className="halo-spin flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card p-3 shadow-xs transition-[border-color,transform,box-shadow] duration-300 ease-out-expo group-hover:-translate-y-1 group-hover:border-primary/40 md:h-16 md:w-16 [--halo-glow:18px]">
        <ToolIcon {...tool} className="h-full w-full" />
      </div>
      <span className="mt-2 max-w-[84px] text-center text-xs leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
        {tool.name}
      </span>
    </div>
  );
}

export function ToolsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="tools" className="section-shell rule-top section-band scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t("tools.subtitle")}
          title={t("tools.title")}
          description={t("tools.description")}
        />

        <div className="space-y-10">
          {Object.entries(toolCategories).map(([key, category], index) => (
            <Reveal key={key} delay={Math.min(index, 4) * 0.05}>
              <h3 className="eyebrow mb-5 border-b border-border pb-3 text-center">
                {category[language]}
              </h3>
              {/* Centred rather than left-aligned: the categories have very
                  different counts, and a ragged last row reads as a mistake. */}
              <Stagger.List className="flex flex-wrap justify-center gap-x-5 gap-y-6">
                {category.tools.map((tool) => (
                  <Stagger.Item key={tool.name}>
                    <ToolTile tool={tool} />
                  </Stagger.Item>
                ))}
              </Stagger.List>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
