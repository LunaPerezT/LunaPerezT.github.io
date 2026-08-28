import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

import rIcon from "@/assets/tool-icons/r.svg";
import rstudioIcon from "@/assets/tool-icons/rstudio.svg";
import fastapiIcon from "@/assets/tool-icons/fastapi.svg";

type Tool = { name: string; icon?: string };

/**
 * Mirrors the badge blocks on the GitHub profile README. Icons are optional —
 * ToolTile falls back to initials, which is better than a broken or invisible
 * logo, so only tools with a mark that reads on both themes carry one.
 */
const toolCategories = {
  languages: {
    en: "Languages & Core",
    es: "Lenguajes y Base",
    tools: [
      { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
      { name: "R", icon: rIcon },
      { name: "SQL", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/azuresqldatabase/azuresqldatabase-original.svg" },
      { name: "JavaScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
      { name: "Node.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
      { name: "Bash", icon: "https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg" },
      { name: "Markdown" },
    ],
  },
  mlDl: {
    en: "Machine Learning & Deep Learning",
    es: "Machine Learning y Deep Learning",
    tools: [
      { name: "TensorFlow", icon: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg" },
      { name: "PyTorch", icon: "https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg" },
      { name: "Keras", icon: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg" },
      { name: "Scikit-learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { name: "XGBoost" },
      { name: "LightGBM" },
      { name: "CatBoost" },
      { name: "Optuna" },
      { name: "imbalanced-learn" },
      { name: "OpenCV", icon: "https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg" },
    ],
  },
  dataEngineering: {
    en: "Data Engineering & MLOps",
    es: "Ingeniería de Datos y MLOps",
    tools: [
      { name: "PySpark", icon: "https://www.vectorlogo.zone/logos/apache_spark/apache_spark-icon.svg" },
      { name: "Apache Spark", icon: "https://www.vectorlogo.zone/logos/apache_spark/apache_spark-ar21.svg" },
      { name: "Spark ML" },
      { name: "Databricks", icon: "https://cdn.simpleicons.org/databricks/FF3621" },
      { name: "Delta Lake" },
      { name: "Parquet", icon: "https://cdn.simpleicons.org/apacheparquet/50ABF1" },
      { name: "PyArrow" },
      { name: "MLflow", icon: "https://cdn.simpleicons.org/mlflow/0194E2" },
      { name: "pytest", icon: "https://cdn.simpleicons.org/pytest/0A9EDC" },
      { name: "Hadoop", icon: "https://www.vectorlogo.zone/logos/apache_hadoop/apache_hadoop-icon.svg" },
    ],
  },
  agenticAi: {
    en: "Agentic AI & LLM Frameworks",
    es: "IA Agéntica y Frameworks LLM",
    tools: [
      { name: "MCP Protocol" },
      { name: "Ollama" },
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "Hugging Face", icon: "https://cdn.simpleicons.org/huggingface/FFD21E" },
    ],
  },
  timeSeries: {
    en: "Time Series & Forecasting",
    es: "Series Temporales y Forecasting",
    tools: [
      { name: "Darts" },
      { name: "NeuralForecast" },
      { name: "StatsForecast" },
      { name: "MLForecast" },
      { name: "Nixtla" },
      { name: "TimeGPT" },
    ],
  },
  dataAnalysis: {
    en: "Data Analysis & Visualization",
    es: "Análisis de Datos y Visualización",
    tools: [
      { name: "Pandas", icon: "https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/pandas/pandas-original.svg" },
      { name: "NumPy", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg" },
      { name: "SciPy", icon: "https://cdn.simpleicons.org/scipy/8CAAE6" },
      { name: "Matplotlib", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/matplotlib/matplotlib-original.svg" },
      { name: "Plotly", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/plotly/plotly-original.svg" },
      { name: "Seaborn", icon: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg" },
      { name: "GeoPandas" },
      { name: "Folium" },
      { name: "ggplot2", icon: "https://raw.githubusercontent.com/tidyverse/ggplot2/main/man/figures/logo.png" },
      { name: "Tableau", icon: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
      { name: "Power BI", icon: "https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg" },
    ],
  },
  databases: {
    en: "Databases",
    es: "Bases de Datos",
    tools: [
      { name: "PostgreSQL", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" },
      { name: "MySQL", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" },
      { name: "MongoDB", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" },
      { name: "MariaDB", icon: "https://www.vectorlogo.zone/logos/mariadb/mariadb-icon.svg" },
      { name: "SQLite", icon: "https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg" },
      { name: "SQL Server", icon: "https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg" },
    ],
  },
  cloudDevops: {
    en: "Cloud & DevOps",
    es: "Cloud y DevOps",
    tools: [
      { name: "AWS", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Azure", icon: "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg" },
      { name: "Azure Data Factory" },
      { name: "Unity Catalog" },
      { name: "Google Cloud", icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" },
      { name: "Docker", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" },
      { name: "Git", icon: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" },
      { name: "Linux", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" },
    ],
  },
  frameworks: {
    en: "Frameworks & Apps",
    es: "Frameworks y Apps",
    tools: [
      { name: "Streamlit", icon: "https://streamlit.io/images/brand/streamlit-mark-color.svg" },
      { name: "Flask", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg" },
      { name: "FastAPI", icon: fastapiIcon },
      { name: "Django", icon: "https://cdn.worldvectorlogo.com/logos/django.svg" },
      { name: "Selenium", icon: "https://raw.githubusercontent.com/detain/svg-logos/780f25886640cef088af994181646db2f6b1a3f8/svg/selenium-logo.svg" },
      { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
    ],
  },
  tools: {
    en: "Environments & Tools",
    es: "Entornos y Herramientas",
    tools: [
      { name: "Jupyter", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original-wordmark.svg" },
      { name: "RStudio", icon: rstudioIcon },
      { name: "Excel", icon: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg" },
    ],
  },
  scientific: {
    en: "Scientific Software",
    es: "Software Científico",
    tools: [
      { name: "OriginLab", icon: "https://www.originlab.com/images/header_logo.png" },
      { name: "GraphPad Prism", icon: "https://cdn.worldvectorlogo.com/logos/graphpad-prism.svg" },
      { name: "SPSS Statistics", icon: "https://www.vectorlogo.zone/logos/ibm/ibm-icon.svg" },
      { name: "Fiji ImageJ", icon: "https://imagej.net/media/icons/imagej.png" },
      { name: "Illustrator", icon: "https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg" },
      { name: "Photoshop", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg" },
    ],
  },
};

function ToolTile({ tool }: { tool: Tool }) {
  const [imageError, setImageError] = useState(false);

  const initials = useMemo(() => {
    const parts = tool.name
      .split(/\s+/)
      .filter(Boolean)
      .map((p) => p[0]?.toUpperCase())
      .filter(Boolean) as string[];

    return (parts.join("").slice(0, 2) || tool.name.slice(0, 2)).toUpperCase();
  }, [tool.name]);

  const showImage = Boolean(tool.icon) && !imageError;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group flex flex-col items-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card p-2.5 shadow-xs transition-colors duration-200 group-hover:border-border-strong md:h-16 md:w-16">
        {showImage ? (
          <img
            src={tool.icon}
            alt=""
            className="h-full w-full object-contain"
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
          />
        ) : (
          <span
            className="font-mono text-xs font-semibold text-muted-foreground"
            aria-hidden="true"
          >
            {initials}
          </span>
        )}
      </div>
      <span className="mt-2 max-w-[84px] text-center text-xs leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
        {tool.name}
      </span>
    </motion.div>
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
              <h3 className="eyebrow mb-5 border-b border-border pb-3">
                {category[language]}
              </h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-6">
                {category.tools.map((tool) => (
                  <li key={tool.name}>
                    <ToolTile tool={tool} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
