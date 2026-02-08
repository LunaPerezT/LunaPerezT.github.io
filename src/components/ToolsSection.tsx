import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

import rIcon from "@/assets/tool-icons/r.svg";
import rstudioIcon from "@/assets/tool-icons/rstudio.svg";
import fastapiIcon from "@/assets/tool-icons/fastapi.svg";

type Tool = { name: string; icon?: string };

const toolCategories = {
  languages: {
    en: "Languages",
    es: "Lenguajes",
    tools: [
      { name: "Python", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
      { name: "R", icon: rIcon },
      { name: "SQL", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/azuresqldatabase/azuresqldatabase-original.svg" },
      { name: "JavaScript", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
      { name: "Bash", icon: "https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg" },
    ],
  },
  mlDl: {
    en: "Machine Learning & Deep Learning",
    es: "Machine Learning & Deep Learning",
    tools: [
      { name: "TensorFlow", icon: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg" },
      { name: "PyTorch", icon: "https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg" },
      { name: "Keras", icon: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg" },
      { name: "Scikit-learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { name: "PySpark", icon: "https://www.vectorlogo.zone/logos/apache_spark/apache_spark-icon.svg" },
      { name: "Apache Spark", icon: "https://www.vectorlogo.zone/logos/apache_spark/apache_spark-ar21.svg" },
    ],
  },
  dataAnalysis: {
    en: "Data Analysis & Visualization",
    es: "Análisis de Datos & Visualización",
    tools: [
      { name: "Pandas", icon: "https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/pandas/pandas-original.svg" },
      { name: "NumPy", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg" },
      { name: "Matplotlib", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/matplotlib/matplotlib-original.svg" },
      { name: "Plotly", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/plotly/plotly-original.svg" },
      { name: "Seaborn", icon: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg" },
      { name: "OpenCV", icon: "https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg" },
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
    es: "Cloud & DevOps",
    tools: [
      { name: "AWS", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Google Cloud", icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" },
      { name: "Azure", icon: "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg" },
      { name: "Docker", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" },
      { name: "Hadoop", icon: "https://www.vectorlogo.zone/logos/apache_hadoop/apache_hadoop-icon.svg" },
    ],
  },
  frameworks: {
    en: "Frameworks & Libraries",
    es: "Frameworks & Librerías",
    tools: [
      { name: "Django", icon: "https://cdn.worldvectorlogo.com/logos/django.svg" },
      { name: "Flask", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg" },
      { name: "FastAPI", icon: fastapiIcon },
      { name: "Node.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" },
      { name: "Selenium", icon: "https://raw.githubusercontent.com/detain/svg-logos/780f25886640cef088af994181646db2f6b1a3f8/svg/selenium-logo.svg" },
    ],
  },
  tools: {
    en: "Tools & Platforms",
    es: "Herramientas & Plataformas",
    tools: [
      { name: "Git", icon: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" },
      { name: "Linux", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" },
      { name: "RStudio", icon: rstudioIcon },
      { name: "Jupyter", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original-wordmark.svg" },
      { name: "Streamlit", icon: "https://streamlit.io/images/brand/streamlit-mark-color.svg" },
      { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
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
      whileHover={{
        scale: 1.08,
        y: -3,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col items-center"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 p-2.5 rounded-xl bg-card border border-border/60 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md group-hover:bg-primary/5">
        {showImage ? (
          <img
            src={tool.icon}
            alt={tool.name}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-xs font-semibold text-foreground" aria-label={tool.name}>
            {initials}
          </span>
        )}
      </div>
      <span className="mt-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center max-w-[80px] leading-tight">
        {tool.name}
      </span>
    </motion.div>
  );
}

export function ToolsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="tools" className="section-container section-divider">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            {t("tools.subtitle")}
          </p>
          <h2 className="text-foreground mb-4">{t("tools.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("tools.description")}
          </p>
        </motion.div>

        {/* Tools Grid by Category */}
        <div className="space-y-10">
          {Object.entries(toolCategories).map(([key, category]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-base font-semibold text-foreground mb-5 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {category[language]}
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {category.tools.map((tool) => (
                  <ToolTile key={tool.name} tool={tool} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
