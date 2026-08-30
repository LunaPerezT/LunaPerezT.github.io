export type ProjectCategory =
  | "medical-ai"
  | "decision-science"
  | "ml-engineering"
  | "data-engineering"
  | "agentic-ai";

/** Drives which explicit card component renders the project — never a boolean. */
export type ProjectEmphasis = "lead" | "standard" | "compact";

/** "deployed" means a public URL exists; "local" means it only runs locally. */
export type ProjectStatus = "deployed" | "complete" | "local";

/** Motif drawn behind lead cards. Keys map to ProjectGlyph. */
export type GlyphKind =
  | "ecg"
  | "route"
  | "scan"
  | "experiment"
  | "forecast"
  | "query"
  | "cohort"
  | "atlas"
  | "schema";

export interface ProjectMetric {
  /** Short, mono-set readout: "0.917", "75.5%", "124k". */
  value: string;
  label: { en: string; es: string };
  /** The condition the number only holds under. Rendered next to it, never hidden. */
  note?: { en: string; es: string };
}

export interface Project {
  id: string;
  title: {
    en: string;
    es: string;
  };
  /** One sentence that states the result, not the topic. */
  headline: {
    en: string;
    es: string;
  };
  shortDescription: {
    en: string;
    es: string;
  };
  categories: ProjectCategory[];
  emphasis: ProjectEmphasis;
  status: ProjectStatus;
  glyph: GlyphKind;
  period: string;
  role: { en: string; es: string };
  metrics: ProjectMetric[];
  /** The honest limitation. Shown on the card and again on the detail page. */
  caveat: { en: string; es: string };
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  images?: string[];
  overview: {
    context: { en: string; es: string };
    problem: { en: string; es: string };
    objective: { en: string; es: string };
  };
  dataArchitecture: {
    dataSources: { en: string; es: string };
    pipeline: { en: string; es: string };
    diagrams?: { en: string; es: string };
  };
  modeling: {
    algorithms: { en: string; es: string };
    decisions: { en: string; es: string };
    libraries: string[];
  };
  results: {
    metrics: { en: string; es: string };
    outcomes: { en: string; es: string };
    visualizations?: { en: string; es: string };
  };
  learnings: {
    challenges: { en: string; es: string };
    learned: { en: string; es: string };
    improvements: { en: string; es: string };
  };
}

export const projects: Project[] = [
  {
    id: "brain-tumor-detection",
    headline: {
      en: "ResNet-50 finds the glioma, ResUNet draws it (Dice 0.846, served from AWS App Runner).",
      es: "ResNet-50 detecta el glioma, ResUNet lo dibuja (Dice 0,846, servido desde AWS App Runner).",
    },
    categories: ["medical-ai", "ml-engineering"],
    emphasis: "lead",
    status: "deployed",
    glyph: "scan",
    period: "2025",
    role: { en: "Team of 6", es: "Equipo de 6" },
    metrics: [
      {
        value: "0.846",
        label: { en: "Dice, segmentation", es: "Dice, segmentación" },
        note: { en: "ResUNet · IoU 0.734", es: "ResUNet · IoU 0,734" },
      },
      {
        value: "0.98",
        label: { en: "macro-F1, detection", es: "macro-F1, detección" },
        note: { en: "576 held-out slices", es: "576 cortes held-out" },
      },
      {
        value: "3,899",
        label: { en: "MRI slices", es: "cortes de resonancia" },
        note: { en: "TCGA-LGG, ~110 patients", es: "TCGA-LGG, ~110 pacientes" },
      },
    ],
    caveat: {
      en: "Pixel accuracy is 0.9925 and means very little, because the tumour is a small fraction of each slice, which is why Dice is the reported metric. The train/test split is at slice level, and the Dice of 0.846 is measured on 576 held-out slices from that split.",
      es: "La precisión por píxel es 0,9925 y dice muy poco: el tumor es una fracción pequeña de cada corte, por eso la métrica reportada es Dice. El split train/test es a nivel de cortes, y el Dice de 0,846 está medido sobre los 576 cortes held-out de ese split.",
    },
    title: {
      en: "Brain Tumor Detection & Segmentation",
      es: "Detección y Segmentación de Tumores Cerebrales",
    },
    shortDescription: {
      en: "End-to-end MLOps pipeline for glioma detection and segmentation in MRI scans. Features ResNet-50 (Classification) and ResUNet (Segmentation).",
      es: "Pipeline MLOps end-to-end para detección y segmentación de gliomas en resonancias magnéticas. Utiliza ResNet-50 (Clasificación) y ResUNet (Segmentación).",
    },
    techStack: ["Python", "TensorFlow", "Keras", "Flask", "Streamlit", "Docker", "AWS App Runner"],
    githubUrl: "https://github.com/LunaPerezT/brain-tumor-detection/tree/release",
    demoUrl: "https://braintumor-mri.streamlit.app/",
    overview: {
      context: {
        en: "End-to-end, production-oriented machine learning project for brain tumor detection and segmentation from MRI scans, with a focus on low-grade gliomas. The system covers the full ML lifecycle, from medical image preprocessing and deep learning model training to deployment and user-facing inference.",
        es: "Proyecto de machine learning orientado a producción para detección y segmentación de tumores cerebrales en resonancias magnéticas, enfocado en gliomas de bajo grado. El sistema cubre todo el ciclo de vida ML, desde preprocesamiento de imágenes médicas hasta despliegue e inferencia.",
      },
      problem: {
        en: "Manual analysis of MRI scans for tumor detection is time-consuming and prone to human error. Early detection of gliomas is crucial for treatment planning but requires specialized expertise.",
        es: "El análisis manual de resonancias para detección de tumores consume mucho tiempo y es propenso a errores. La detección temprana de gliomas es crucial para planificar tratamiento pero requiere experiencia especializada.",
      },
      objective: {
        en: "Build an automated system that identifies tumor-relevant MRI slices and generates pixel-level tumor masks for accurate localization and analysis.",
        es: "Construir un sistema automatizado que identifique cortes de resonancia relevantes y genere máscaras a nivel de píxel para localización y análisis precisos.",
      },
    },
    dataArchitecture: {
      dataSources: {
        en: "Medical MRI scan datasets with labeled tumor regions. High-resolution brain imaging data processed through standardized pipelines.",
        es: "Datasets de resonancias magnéticas médicas con regiones tumorales etiquetadas. Datos de imágenes cerebrales de alta resolución procesados a través de pipelines estandarizados.",
      },
      pipeline: {
        en: "MRI Images → Preprocessing → CNN Classification (ResNet-50) → Segmentation (ResUNet) → Flask API → Streamlit UI → Docker → AWS App Runner",
        es: "Imágenes MRI → Preprocesamiento → Clasificación CNN (ResNet-50) → Segmentación (ResUNet) → API Flask → UI Streamlit → Docker → AWS App Runner",
      },
      diagrams: {
        en: "Dual-stage pipeline with classification to identify relevant slices followed by segmentation for precise tumor boundary delineation.",
        es: "Pipeline de dos etapas con clasificación para identificar cortes relevantes seguido de segmentación para delineación precisa de límites tumorales.",
      },
    },
    modeling: {
      algorithms: {
        en: "Dual-stage pipeline using ResNet-50 for classification (identifying tumor-relevant slices) and ResUNet for pixel-level segmentation. Models implemented using TensorFlow and Keras with modular, reproducible workflows.",
        es: "Pipeline de dos etapas usando ResNet-50 para clasificación (identificar cortes con tumor) y ResUNet para segmentación a nivel de píxel. Modelos implementados con TensorFlow y Keras con flujos modulares y reproducibles.",
      },
      decisions: {
        en: "Chose ResNet-50 for its proven performance in medical imaging. ResUNet architecture combines residual connections with U-Net's encoder-decoder structure for precise segmentation. Emphasis on separation of concerns between training, evaluation, and inference.",
        es: "Se eligió ResNet-50 por su rendimiento probado en imágenes médicas. La arquitectura ResUNet combina conexiones residuales con la estructura encoder-decoder de U-Net para segmentación precisa. Énfasis en separación de responsabilidades entre entrenamiento, evaluación e inferencia.",
      },
      libraries: ["TensorFlow", "Keras", "OpenCV", "Flask", "Streamlit", "Docker", "AWS"],
    },
    results: {
      metrics: {
        en: "High classification accuracy for tumor detection. Precise segmentation masks enabling accurate tumor localization and volume estimation.",
        es: "Alta precisión de clasificación para detección de tumores. Máscaras de segmentación precisas que permiten localización exacta y estimación de volumen tumoral.",
      },
      outcomes: {
        en: "Production-ready system deployed on AWS App Runner. Streamlit interface enables human-in-the-loop interaction for clinical validation.",
        es: "Sistema listo para producción desplegado en AWS App Runner. La interfaz Streamlit permite interacción human-in-the-loop para validación clínica.",
      },
      visualizations: {
        en: "Prediction overlays on MRI slices, segmentation masks, and performance metrics dashboards.",
        es: "Superposiciones de predicciones en cortes de resonancia, máscaras de segmentación y dashboards de métricas de rendimiento.",
      },
    },
    learnings: {
      challenges: {
        en: "Handling medical image variability and ensuring model generalization across different MRI protocols. Balancing inference speed with accuracy for production deployment.",
        es: "Manejar la variabilidad de imágenes médicas y asegurar generalización del modelo entre diferentes protocolos de resonancia. Equilibrar velocidad de inferencia con precisión para despliegue en producción.",
      },
      learned: {
        en: "Importance of MLOps practices for medical AI applications. Value of modular architecture for maintainability and iterative improvement.",
        es: "Importancia de prácticas MLOps para aplicaciones de IA médica. Valor de la arquitectura modular para mantenibilidad y mejora iterativa.",
      },
      improvements: {
        en: "Implement multi-class segmentation for different tumor types. Add uncertainty quantification for clinical decision support.",
        es: "Implementar segmentación multiclase para diferentes tipos de tumor. Añadir cuantificación de incertidumbre para soporte de decisiones clínicas.",
      },
    },
  },
  {
    id: "text-to-sql-agent",
    headline: {
      en: "Reads the PostgreSQL schema at runtime through MCP, and a validator (not a prompt) guarantees it can only ever emit a SELECT.",
      es: "Lee el esquema PostgreSQL en tiempo de ejecución vía MCP, y un validador (no un prompt) garantiza que solo puede emitir un SELECT.",
    },
    categories: ["agentic-ai", "data-engineering"],
    emphasis: "standard",
    status: "local",
    glyph: "query",
    period: "2025",
    role: { en: "Team of 7", es: "Equipo de 7" },
    metrics: [
      {
        value: "SELECT",
        label: { en: "the only statement allowed", es: "única sentencia permitida" },
        note: {
          en: "enforced by a validator, not an instruction",
          es: "impuesto por un validador, no por una instrucción",
        },
      },
      {
        value: "MCP",
        label: { en: "schema read at request time", es: "esquema leído en cada petición" },
        note: {
          en: "no schema pasted into the prompt to go stale",
          es: "sin esquema pegado en el prompt que quede obsoleto",
        },
      },
      {
        value: "Local",
        label: { en: "Qwen3:8b via Ollama", es: "Qwen3:8b vía Ollama" },
        note: {
          en: "schema and customer data never leave the machine",
          es: "el esquema y los datos nunca salen de la máquina",
        },
      },
    ],
    caveat: {
      en: "No evaluation set exists yet, so there is no accuracy figure to quote, and an execution-accuracy benchmark over a fixed question set is the missing piece. Runs locally only; it is not deployed.",
      es: "Todavía no existe un conjunto de evaluación, así que no hay cifra de acierto que citar: falta un benchmark de execution accuracy sobre un set fijo de preguntas. Funciona solo en local; no está desplegado.",
    },
    title: {
      en: "Talk to your Data: Agentic Text-to-SQL",
      es: "Habla con tus Datos: Agente Text-to-SQL",
    },
    shortDescription: {
      en: "Conversational AI agent that translates natural language into complex SQL queries using MCP (Model Context Protocol).",
      es: "Agente de IA conversacional que traduce lenguaje natural a consultas SQL complejas usando MCP (Model Context Protocol).",
    },
    techStack: ["Python", "Flask", "Node.js", "PostgreSQL", "Ollama", "Qwen3", "Docker", "Lambda Labs"],
    githubUrl: "https://github.com/LunaPerezT/CATBOX_SQL_AI_Agent",
    overview: {
      context: {
        en: "Production-grade conversational AI agent designed to bridge the gap between non-technical users and relational databases. Converts natural language into precise, secure, and executable SQL queries in real-time.",
        es: "Agente de IA conversacional de grado producción diseñado para cerrar la brecha entre usuarios no técnicos y bases de datos relacionales. Convierte lenguaje natural en consultas SQL precisas, seguras y ejecutables en tiempo real.",
      },
      problem: {
        en: "Non-technical stakeholders struggle to access database insights, creating bottlenecks in data-driven decision making. Traditional BI tools require SQL knowledge or predefined reports.",
        es: "Los stakeholders no técnicos tienen dificultades para acceder a insights de bases de datos, creando cuellos de botella en la toma de decisiones basada en datos. Las herramientas BI tradicionales requieren conocimiento de SQL o reportes predefinidos.",
      },
      objective: {
        en: "Create a schema-aware agent that enables anyone to query databases using natural language while maintaining security and query accuracy.",
        es: "Crear un agente consciente del esquema que permita a cualquiera consultar bases de datos usando lenguaje natural mientras mantiene seguridad y precisión de consultas.",
      },
    },
    dataArchitecture: {
      dataSources: {
        en: "PostgreSQL databases with dynamic schema inspection. Real-time metadata access through MCP server integration.",
        es: "Bases de datos PostgreSQL con inspección dinámica de esquema. Acceso a metadatos en tiempo real a través de integración con servidor MCP.",
      },
      pipeline: {
        en: "Natural Language → Flask API → Prompt Engineering → Ollama (Qwen3) → SQL Validation → PostgreSQL Execution → Result Formatting → Chart.js Visualization",
        es: "Lenguaje Natural → API Flask → Ingeniería de Prompts → Ollama (Qwen3) → Validación SQL → Ejecución PostgreSQL → Formateo de Resultados → Visualización Chart.js",
      },
      diagrams: {
        en: "Modular backend with Node.js/Express for high-concurrency orchestration and Flask for analytical layer handling prompt engineering and SQL validation.",
        es: "Backend modular con Node.js/Express para orquestación de alta concurrencia y Flask para capa analítica manejando ingeniería de prompts y validación SQL.",
      },
    },
    modeling: {
      algorithms: {
        en: "Implemented Model Context Protocol (MCP) to create a schema-aware agent. Integration of PostgreSQL MCP server with Ollama + Qwen3 enables dynamic database metadata inspection for increased query accuracy.",
        es: "Implementación de Model Context Protocol (MCP) para crear un agente consciente del esquema. La integración del servidor MCP PostgreSQL con Ollama + Qwen3 permite inspección dinámica de metadatos para mayor precisión.",
      },
      decisions: {
        en: "Developed custom mathematical glossaries to map natural language to complex SQL operations (rankings, YoY comparisons, weighted averages). Containerized with Docker Compose for GPU deployment on Lambda Labs.",
        es: "Desarrollo de glosarios matemáticos personalizados para mapear lenguaje natural a operaciones SQL complejas (rankings, comparaciones YoY, promedios ponderados). Containerizado con Docker Compose para despliegue GPU en Lambda Labs.",
      },
      libraries: ["Ollama", "Qwen3", "Flask", "Node.js", "PostgreSQL", "Docker", "Chart.js"],
    },
    results: {
      metrics: {
        en: "High query accuracy through schema-aware context. Low-latency inference with GPU acceleration. Secure execution restricted to SELECT statements only.",
        es: "Alta precisión de consultas a través de contexto consciente del esquema. Inferencia de baja latencia con aceleración GPU. Ejecución segura restringida solo a sentencias SELECT.",
      },
      outcomes: {
        en: "Successfully democratized database access for non-technical users. Multidisciplinary project integrating Data Science with Full Stack and Cybersecurity teams.",
        es: "Democratización exitosa del acceso a bases de datos para usuarios no técnicos. Proyecto multidisciplinar integrando Data Science con equipos de Full Stack y Ciberseguridad.",
      },
      visualizations: {
        en: "Dynamic charts via Chart.js, SQL query explanations, and interactive data exploration interface.",
        es: "Gráficos dinámicos vía Chart.js, explicaciones de consultas SQL e interfaz interactiva de exploración de datos.",
      },
    },
    learnings: {
      challenges: {
        en: "Ensuring SQL injection prevention while maintaining query flexibility. Mapping ambiguous natural language to precise SQL semantics.",
        es: "Asegurar prevención de inyección SQL mientras se mantiene flexibilidad de consultas. Mapear lenguaje natural ambiguo a semántica SQL precisa.",
      },
      learned: {
        en: "Importance of security guardrails in LLM applications. Value of MCP for creating context-aware agents without manual context feeding.",
        es: "Importancia de guardrails de seguridad en aplicaciones LLM. Valor de MCP para crear agentes conscientes del contexto sin alimentación manual.",
      },
      improvements: {
        en: "Add support for multi-database queries. Implement query caching and result history. Expand to INSERT/UPDATE with approval workflows.",
        es: "Añadir soporte para consultas multi-base de datos. Implementar caché de consultas e historial de resultados. Expandir a INSERT/UPDATE con flujos de aprobación.",
      },
    },
  },
  {
    id: "mental-health-eda",
    headline: {
      en: "Thirty years of WHO/IHME data for 214 entities, with the prevalence-versus-burden gap as the spine of the analysis.",
      es: "Treinta años de datos de la OMS/IHME para 214 entidades, con la brecha entre prevalencia y carga como eje del análisis.",
    },
    categories: ["medical-ai", "data-engineering"],
    emphasis: "compact",
    status: "deployed",
    glyph: "atlas",
    period: "2025",
    role: { en: "Solo", es: "Individual" },
    metrics: [
      {
        value: "214",
        label: { en: "entities", es: "entidades" },
        note: {
          en: "countries, regions and income groups",
          es: "países, regiones y grupos de renta",
        },
      },
      {
        value: "6,420",
        label: { en: "records, 1990-2019", es: "registros, 1990-2019" },
      },
      {
        value: "~1,000",
        label: { en: "lines of Streamlit", es: "líneas de Streamlit" },
        note: {
          en: "claims backed by scipy.stats tests",
          es: "afirmaciones respaldadas con tests de scipy.stats",
        },
      },
    ],
    caveat: {
      en: "The data is age-standardised with both sexes combined, so no age or gender breakdown exists. And 214 is entities (countries, regions and income groups), not countries.",
      es: "Los datos están estandarizados por edad y con ambos sexos combinados, así que no existe desglose por edad ni por género. Y 214 son entidades (países, regiones y grupos de renta), no países.",
    },
    title: {
      en: "Mental Health Global Insights",
      es: "Insights Globales de Salud Mental",
    },
    shortDescription: {
      en: "Comprehensive EDA of 30 years of global mental health data. Features dynamic geospatial visualizations and DALYs analysis.",
      es: "EDA completo de 30 años de datos globales de salud mental. Incluye visualizaciones geoespaciales dinámicas y análisis de DALYs.",
    },
    techStack: ["Python", "Pandas", "NumPy", "Plotly", "Seaborn", "Matplotlib", "Streamlit"],
    githubUrl: "https://github.com/LunaPerezT/Mental-Health-EDA-Webpage",
    demoUrl: "https://mental-health-eda-webpage.streamlit.app/",
    overview: {
      context: {
        en: "Comprehensive Exploratory Data Analysis (EDA) and interactive web application to visualize and analyze three decades of global mental health data (1990-2019). Focuses on identifying patterns in prevalence, disease burden, and regional disparities.",
        es: "Análisis Exploratorio de Datos (EDA) completo y aplicación web interactiva para visualizar y analizar tres décadas de datos globales de salud mental (1990-2019). Enfocado en identificar patrones de prevalencia, carga de enfermedad y disparidades regionales.",
      },
      problem: {
        en: "Mental health data is fragmented across sources and time periods, making it difficult to identify global trends and inform policy decisions.",
        es: "Los datos de salud mental están fragmentados entre fuentes y períodos de tiempo, dificultando identificar tendencias globales e informar decisiones políticas.",
      },
      objective: {
        en: "Create an accessible platform for exploring mental health trends across 200+ countries with interactive visualizations and statistical insights.",
        es: "Crear una plataforma accesible para explorar tendencias de salud mental en más de 200 países con visualizaciones interactivas e insights estadísticos.",
      },
    },
    dataArchitecture: {
      dataSources: {
        en: "Global health datasets spanning 1990-2019 including prevalence rates, DALYs (Disability-Adjusted Life Years), and demographic indicators across 200+ countries.",
        es: "Datasets de salud global de 1990-2019 incluyendo tasas de prevalencia, DALYs (Años de Vida Ajustados por Discapacidad) e indicadores demográficos en más de 200 países.",
      },
      pipeline: {
        en: "Raw Data → Pandas Cleaning → Statistical Analysis → Plotly Visualizations → Streamlit Dashboard → Public Deployment",
        es: "Datos Crudos → Limpieza Pandas → Análisis Estadístico → Visualizaciones Plotly → Dashboard Streamlit → Despliegue Público",
      },
      diagrams: {
        en: "Multi-layer analysis architecture with data aggregation, statistical breakdown, and interactive visualization components.",
        es: "Arquitectura de análisis multicapa con agregación de datos, desglose estadístico y componentes de visualización interactiva.",
      },
    },
    modeling: {
      algorithms: {
        en: "Statistical analysis methods including trend detection, correlation analysis, and comparative metrics across regions and time periods.",
        es: "Métodos de análisis estadístico incluyendo detección de tendencias, análisis de correlación y métricas comparativas entre regiones y períodos.",
      },
      decisions: {
        en: "Chose Plotly for interactive choropleth maps enabling direct longitudinal comparisons. Streamlit for rapid dashboard development and easy deployment.",
        es: "Se eligió Plotly para mapas coropletas interactivos que permiten comparaciones longitudinales directas. Streamlit para desarrollo rápido de dashboard y fácil despliegue.",
      },
      libraries: ["Pandas", "NumPy", "Plotly", "Seaborn", "Matplotlib", "Streamlit"],
    },
    results: {
      metrics: {
        en: "Analysis covering 200+ countries over 30 years. Interactive dashboards with real-time filtering and data rendering.",
        es: "Análisis cubriendo más de 200 países durante 30 años. Dashboards interactivos con filtrado en tiempo real y renderizado de datos.",
      },
      outcomes: {
        en: "Deployed user-friendly dashboard making complex analytical insights accessible to non-technical stakeholders. Identified critical trends in socioeconomic correlations with mental health outcomes.",
        es: "Dashboard desplegado haciendo insights analíticos complejos accesibles a stakeholders no técnicos. Identificación de tendencias críticas en correlaciones socioeconómicas con resultados de salud mental.",
      },
      visualizations: {
        en: "Dynamic Choropleth Maps, distribution graphs, Top 10 country rankings, and continental breakdown charts.",
        es: "Mapas Coropletas dinámicos, gráficos de distribución, rankings de Top 10 países y gráficos de desglose continental.",
      },
    },
    learnings: {
      challenges: {
        en: "Handling missing data across different countries and time periods. Standardizing metrics from various data collection methodologies.",
        es: "Manejar datos faltantes entre diferentes países y períodos. Estandarizar métricas de varias metodologías de recolección de datos.",
      },
      learned: {
        en: "Importance of data visualization in communicating complex health trends. Value of interactive tools for stakeholder engagement.",
        es: "Importancia de la visualización de datos para comunicar tendencias de salud complejas. Valor de herramientas interactivas para engagement de stakeholders.",
      },
      improvements: {
        en: "Add predictive modeling for future trends. Integrate additional socioeconomic indicators. Add multi-language support.",
        es: "Añadir modelado predictivo para tendencias futuras. Integrar indicadores socioeconómicos adicionales. Añadir soporte multiidioma.",
      },
    },
  },
  {
    id: "parkinsons-prediction",
    headline: {
      en: "Eleven classifier families over 2,105 patients, ending in a stacking ensemble at 96.9% accuracy and 97.7% recall.",
      es: "Once familias de clasificadores sobre 2.105 pacientes, terminando en un ensemble de stacking con 96,9 % de accuracy y 97,7 % de recall.",
    },
    categories: ["medical-ai"],
    emphasis: "compact",
    status: "deployed",
    glyph: "cohort",
    period: "2025",
    role: { en: "Solo", es: "Individual" },
    metrics: [
      {
        value: "96.9%",
        label: { en: "accuracy", es: "accuracy" },
        note: { en: "421 held-out patients", es: "421 pacientes held-out" },
      },
      {
        value: "97.7%",
        label: { en: "recall", es: "recall" },
        note: { en: "specificity 95.7%", es: "especificidad 95,7 %" },
      },
      {
        value: "11",
        label: { en: "model families compared", es: "familias de modelos comparadas" },
        note: {
          en: "scaler and feature selection searched as hyperparameters",
          es: "escalado y selección de variables buscados como hiperparámetros",
        },
      },
    ],
    caveat: {
      en: "UPDRS and MoCA sit close to the diagnosis itself, so the model is partly predicting a diagnosis from the instruments used to make it, and a version trained without UPDRS would be the more informative result. The top three models (0.969 / 0.964 / 0.957) are within noise on 421 patients. A research prototype, not a diagnostic tool.",
      es: "UPDRS y MoCA están muy cerca del diagnóstico en sí, así que el modelo predice en parte un diagnóstico a partir de los instrumentos con los que se hace: una versión entrenada sin UPDRS sería el resultado más informativo. Los tres mejores modelos (0,969 / 0,964 / 0,957) están dentro del ruido sobre 421 pacientes. Es un prototipo de investigación, no una herramienta diagnóstica.",
    },
    title: {
      en: "Parkinson's Disease Prediction",
      es: "Predicción de Enfermedad de Parkinson",
    },
    shortDescription: {
      en: "ML model for early detection of Parkinson's based on clinical and lifestyle factors. Focused on feature importance and interpretability.",
      es: "Modelo ML para detección temprana de Parkinson basado en factores clínicos y de estilo de vida. Enfocado en importancia de features e interpretabilidad.",
    },
    techStack: ["Python", "Scikit-learn", "Pandas", "Streamlit", "Machine Learning"],
    githubUrl: "https://github.com/LunaPerezT/Parkinson-s-Disease-Predictive-ML-Model.git",
    demoUrl: "https://parkinsons-disease-ml-predictive-model-webpage.streamlit.app/",
    overview: {
      context: {
        en: "Machine Learning model to predict the likelihood of Parkinson's disease using clinical, demographic, lifestyle, and symptom-related factors. Designed to support earlier detection and understanding of disease progression variables.",
        es: "Modelo de Machine Learning para predecir la probabilidad de enfermedad de Parkinson usando factores clínicos, demográficos, de estilo de vida y relacionados con síntomas. Diseñado para apoyar detección temprana y comprensión de variables de progresión.",
      },
      problem: {
        en: "Early Parkinson's detection is challenging as symptoms often overlap with normal aging. Traditional assessment methods may miss subtle patterns that data-driven approaches can identify.",
        es: "La detección temprana de Parkinson es desafiante ya que los síntomas a menudo se superponen con el envejecimiento normal. Los métodos de evaluación tradicionales pueden perder patrones sutiles que enfoques basados en datos pueden identificar.",
      },
      objective: {
        en: "Develop a model that identifies patterns not visible through traditional assessment and supports informed decision-making for early screening strategies.",
        es: "Desarrollar un modelo que identifique patrones no visibles mediante evaluación tradicional y apoye la toma de decisiones informada para estrategias de detección temprana.",
      },
    },
    dataArchitecture: {
      dataSources: {
        en: "Clinical dataset including demographic information, lifestyle factors, medical history, and symptom indicators related to Parkinson's disease.",
        es: "Dataset clínico incluyendo información demográfica, factores de estilo de vida, historial médico e indicadores de síntomas relacionados con Parkinson.",
      },
      pipeline: {
        en: "Clinical Data → Feature Engineering → Model Training → Cross-Validation → Feature Importance Analysis → Streamlit Demo",
        es: "Datos Clínicos → Ingeniería de Features → Entrenamiento de Modelo → Validación Cruzada → Análisis de Importancia de Features → Demo Streamlit",
      },
      diagrams: {
        en: "Standard ML pipeline with emphasis on interpretability and feature contribution analysis.",
        es: "Pipeline ML estándar con énfasis en interpretabilidad y análisis de contribución de features.",
      },
    },
    modeling: {
      algorithms: {
        en: "Ensemble machine learning methods with focus on interpretability. Feature importance analysis to understand which variables contribute most to predictions.",
        es: "Métodos de machine learning ensemble con enfoque en interpretabilidad. Análisis de importancia de features para entender qué variables contribuyen más a las predicciones.",
      },
      decisions: {
        en: "Prioritized model interpretability over pure accuracy to support clinical decision-making. Extensive feature analysis to provide actionable insights.",
        es: "Se priorizó interpretabilidad del modelo sobre precisión pura para apoyar toma de decisiones clínicas. Análisis extensivo de features para proporcionar insights accionables.",
      },
      libraries: ["Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Streamlit"],
    },
    results: {
      metrics: {
        en: "Strong predictive performance with detailed feature importance rankings. Model explains which factors most influence Parkinson's risk.",
        es: "Fuerte rendimiento predictivo con rankings detallados de importancia de features. El modelo explica qué factores más influyen en el riesgo de Parkinson.",
      },
      outcomes: {
        en: "Interactive demo allowing real-time exploration of predictions. Foundation for future developments in early Parkinson's detection.",
        es: "Demo interactivo permitiendo exploración en tiempo real de predicciones. Base para desarrollos futuros en detección temprana de Parkinson.",
      },
      visualizations: {
        en: "Feature importance plots, prediction confidence scores, and interactive input exploration.",
        es: "Gráficos de importancia de features, scores de confianza de predicción y exploración interactiva de inputs.",
      },
    },
    learnings: {
      challenges: {
        en: "Balancing model complexity with interpretability. Ensuring predictions are clinically meaningful, not just statistically significant.",
        es: "Equilibrar complejidad del modelo con interpretabilidad. Asegurar que las predicciones sean clínicamente significativas, no solo estadísticamente significativas.",
      },
      learned: {
        en: "Importance of explainable AI in healthcare applications. Value of interactive demos for communicating model behavior to stakeholders.",
        es: "Importancia de IA explicable en aplicaciones de salud. Valor de demos interactivos para comunicar comportamiento del modelo a stakeholders.",
      },
      improvements: {
        en: "Add SHAP values for individual prediction explanations. Integrate with clinical workflows. Expand dataset for improved generalization.",
        es: "Añadir valores SHAP para explicaciones de predicciones individuales. Integrar con flujos de trabajo clínicos. Expandir dataset para mejor generalización.",
      },
    },
  },
  {
    id: "educational-data-architecture",
    headline: {
      en: "Five flat CSV exports turned into a normalised seven-table schema with enforced foreign keys.",
      es: "Cinco exportaciones CSV planas convertidas en un esquema normalizado de siete tablas con claves foráneas declaradas.",
    },
    categories: ["data-engineering"],
    emphasis: "compact",
    status: "complete",
    glyph: "schema",
    period: "2025",
    role: { en: "Team of 6", es: "Equipo de 6" },
    metrics: [
      {
        value: "5 → 7",
        label: { en: "flat files to tables", es: "ficheros planos a tablas" },
        note: {
          en: "lookup tables so a city is stored once",
          es: "tablas de lookup para almacenar cada ciudad una vez",
        },
      },
      {
        value: "FK",
        label: { en: "foreign keys declared", es: "claves foráneas declaradas" },
        note: {
          en: "the flat files enforced nothing",
          es: "los ficheros planos no imponían nada",
        },
      },
      {
        value: "4",
        label: { en: "query files delivered", es: "ficheros de consultas entregados" },
        note: {
          en: "including a reusable five-table report",
          es: "incluido un informe reutilizable sobre cinco tablas",
        },
      },
    ],
    caveat: {
      en: "52 students and 10 teachers (a data-modelling demonstration, not a scale achievement). There is no Python ETL and no index optimisation in this project.",
      es: "52 estudiantes y 10 profesores: es una demostración de modelado de datos, no un logro de escala. Este proyecto no incluye ETL en Python ni optimización de índices.",
    },
    title: {
      en: "Educational Data Architecture",
      es: "Arquitectura de Datos Educativos",
    },
    shortDescription: {
      en: "Legacy system migration to PostgreSQL. Designed a 3NF relational schema and optimized queries for institutional reporting.",
      es: "Migración de sistema legacy a PostgreSQL. Diseño de esquema relacional 3NF y optimización de consultas para reportes institucionales.",
    },
    techStack: ["SQL", "PostgreSQL", "ETL", "Data Modeling", "Database Design"],
    githubUrl: "https://github.com/LunaPerezT/proyecto_SQL_G3",
    overview: {
      context: {
        en: "Complete data migration and modernization strategy to transition a legacy educational system from unmanaged Excel spreadsheets to a robust, high-performance PostgreSQL relational database.",
        es: "Estrategia completa de migración y modernización de datos para transicionar un sistema educativo legacy de hojas de Excel no gestionadas a una base de datos relacional PostgreSQL robusta y de alto rendimiento.",
      },
      problem: {
        en: "Educational institution relied on fragmented Excel files leading to data inconsistencies, manual reconciliation overhead, and inability to generate real-time reports.",
        es: "La institución educativa dependía de archivos Excel fragmentados causando inconsistencias de datos, sobrecarga de reconciliación manual e incapacidad de generar reportes en tiempo real.",
      },
      objective: {
        en: "Design and implement a normalized relational database that ensures data integrity, enables real-time reporting, and supports institutional decision-making.",
        es: "Diseñar e implementar una base de datos relacional normalizada que asegure integridad de datos, habilite reportes en tiempo real y apoye la toma de decisiones institucional.",
      },
    },
    dataArchitecture: {
      dataSources: {
        en: "Legacy Excel spreadsheets containing student records, faculty information, course data, and enrollment histories.",
        es: "Hojas de cálculo Excel legacy conteniendo registros de estudiantes, información de facultad, datos de cursos e historiales de matrícula.",
      },
      pipeline: {
        en: "Excel Files → Data Cleansing → ETL Process → PostgreSQL → Schema Design (3NF) → Query Optimization → Reporting Layer",
        es: "Archivos Excel → Limpieza de Datos → Proceso ETL → PostgreSQL → Diseño de Esquema (3NF) → Optimización de Consultas → Capa de Reportes",
      },
      diagrams: {
        en: "Entity-Relationship Diagram with normalized tables, foreign key relationships, and indexing strategy for optimal query performance.",
        es: "Diagrama Entidad-Relación con tablas normalizadas, relaciones de clave foránea y estrategia de indexación para rendimiento óptimo de consultas.",
      },
    },
    modeling: {
      algorithms: {
        en: "Relational database design following Third Normal Form (3NF) to eliminate data redundancy. Implemented strict foreign key constraints to prevent orphan records.",
        es: "Diseño de base de datos relacional siguiendo Tercera Forma Normal (3NF) para eliminar redundancia de datos. Implementación de restricciones de clave foránea estrictas para prevenir registros huérfanos.",
      },
      decisions: {
        en: "Chose PostgreSQL for its robustness and advanced features. Implemented comprehensive data validation and transformation rules during ETL.",
        es: "Se eligió PostgreSQL por su robustez y características avanzadas. Implementación de reglas completas de validación y transformación de datos durante ETL.",
      },
      libraries: ["PostgreSQL", "SQL", "ETL Tools", "ERD Design"],
    },
    results: {
      metrics: {
        en: "Significant reduction in data retrieval times through optimized queries and strategic indexing. Eliminated data entry errors through constraint enforcement.",
        es: "Reducción significativa en tiempos de recuperación de datos a través de consultas optimizadas e indexación estratégica. Eliminación de errores de entrada de datos mediante aplicación de restricciones.",
      },
      outcomes: {
        en: "Established 'Single Source of Truth' for institutional data. Shifted administrative workflow from manual reconciliation to automated, data-driven decision-making.",
        es: "Establecimiento de 'Única Fuente de Verdad' para datos institucionales. Cambio del flujo de trabajo administrativo de reconciliación manual a toma de decisiones automatizada basada en datos.",
      },
      visualizations: {
        en: "ERD diagrams, query performance metrics, and data quality dashboards.",
        es: "Diagramas ERD, métricas de rendimiento de consultas y dashboards de calidad de datos.",
      },
    },
    learnings: {
      challenges: {
        en: "Handling inconsistent legacy data formats. Standardizing naming conventions and data types across decades of accumulated records.",
        es: "Manejar formatos de datos legacy inconsistentes. Estandarizar convenciones de nombres y tipos de datos a través de décadas de registros acumulados.",
      },
      learned: {
        en: "Critical importance of data governance and documentation. Value of proper database design for long-term maintainability.",
        es: "Importancia crítica de gobernanza de datos y documentación. Valor del diseño apropiado de base de datos para mantenibilidad a largo plazo.",
      },
      improvements: {
        en: "Add automated data quality monitoring. Implement incremental ETL for ongoing updates. Create self-service reporting layer.",
        es: "Añadir monitoreo automatizado de calidad de datos. Implementar ETL incremental para actualizaciones continuas. Crear capa de reportes self-service.",
      },
    },
  },
  {
    id: "ecg-heartbeat-categorization",
    headline: {
      en: "A residual 1-D CNN at macro-F1 0.917 over 124k heartbeats, and the always-say-normal model that scores 82.8% accuracy on the same data.",
      es: "Una CNN 1-D residual con macro-F1 0,917 sobre 124.000 latidos, y el modelo que siempre dice «normal» y saca un 82,8 % de accuracy sobre los mismos datos.",
    },
    title: {
      en: "ECG Heartbeat Categorization",
      es: "Clasificación de Latidos de ECG",
    },
    shortDescription: {
      en: "End-to-end Spark pipeline over 123,998 segmented heartbeats, four class-weighted Spark ML baselines, a residual 1-D CNN in PyTorch, and a controlled three-seed test of whether the representation transfers between two ECG collections.",
      es: "Pipeline Spark end-to-end sobre 123.998 latidos segmentados, cuatro baselines de Spark ML con pesos por clase, una CNN 1-D residual en PyTorch y un test controlado de tres semillas sobre si la representación transfiere entre dos colecciones de ECG.",
    },
    categories: ["medical-ai", "ml-engineering", "data-engineering"],
    emphasis: "lead",
    status: "complete",
    glyph: "ecg",
    period: "2026",
    role: { en: "Solo", es: "Individual" },
    metrics: [
      {
        value: "0.917",
        label: { en: "macro-F1, residual CNN", es: "macro-F1, CNN residual" },
        note: {
          en: "MIT-BIH test, 21,892 beats · best baseline 0.832",
          es: "test MIT-BIH, 21.892 latidos · mejor baseline 0,832",
        },
      },
      {
        value: "0.181",
        label: { en: "macro-F1 of the majority-class floor", es: "macro-F1 del suelo de clase mayoritaria" },
        note: {
          en: "the same model scores 82.8% accuracy (this pairing is the argument)",
          es: "ese mismo modelo saca 82,8 % de accuracy (esa pareja es el argumento)",
        },
      },
      {
        value: "+14 pts",
        label: { en: "transfer gain at 510 training beats", es: "ganancia por transferencia con 510 latidos" },
        note: {
          en: "at full PTB size it is worth nothing · single run per cell",
          es: "con PTB completo no aporta nada · una ejecución por celda",
        },
      },
    ],
    caveat: {
      en: "The splits are intra-patient, so beats from one recording can land on both sides. The numbers are comparable with the literature that uses the published split; AAMI's inter-patient DS1/DS2 protocol is the harder evaluation and is first on the roadmap. 109 tests exist in the repository and nothing runs them automatically yet.",
      es: "Los splits son intra-paciente, así que latidos de un mismo registro pueden caer a ambos lados. Las cifras son comparables con la literatura que usa el split publicado; el protocolo inter-paciente DS1/DS2 de AAMI es la evaluación difícil y es lo primero del roadmap. En el repositorio hay 109 tests y todavía nada los ejecuta automáticamente.",
    },
    techStack: ["PySpark", "Spark ML", "PyTorch", "MLflow", "Parquet", "Databricks", "pytest"],
    githubUrl: "https://github.com/LunaPerezT/ECG-Heartbeat-Categorization",
    overview: {
      context: {
        en: "123,998 segmented heartbeats from the MIT-BIH Arrhythmia and PTB Diagnostic databases, taken from raw CSV to a Spark-native pipeline, then to Spark ML baselines and a residual 1-D convolutional network. The pipeline is the deliverable as much as the model: ingestion, per-beat descriptors and preprocessing are written so the same code handles the full PhysioNet archives or a hospital's own recordings without a rewrite.",
        es: "123.998 latidos segmentados de las bases MIT-BIH Arrhythmia y PTB Diagnostic, llevados desde CSV crudo a un pipeline nativo de Spark, y de ahí a baselines de Spark ML y una red convolucional 1-D residual. El pipeline es tanto entregable como el modelo: ingesta, descriptores por latido y preprocesado están escritos para que el mismo código maneje los archivos completos de PhysioNet o las grabaciones de un hospital sin reescribirlo.",
      },
      problem: {
        en: "The dataset is 113:1 imbalanced. A model that always predicts \"normal\" scores 82.8% accuracy, and macro-F1 0.181. Any accuracy figure quoted on this data without that floor beside it is meaningless, and the rare ventricular and fusion classes are precisely the ones a cardiologist needs flagged.",
        es: "El dataset tiene un desbalance de 113:1. Un modelo que siempre predice «normal» saca un 82,8 % de accuracy, y un macro-F1 de 0,181. Cualquier cifra de accuracy citada sobre estos datos sin ese suelo al lado no significa nada, y las clases raras (ventricular y de fusión) son justo las que un cardiólogo necesita ver marcadas.",
      },
      objective: {
        en: "Rank every model on macro-F1 rather than accuracy, establish what a Spark ML baseline can do before reaching for deep learning, and then answer a question the literature usually asserts rather than measures: does a representation learned on one ECG collection transfer to another, and at what dataset size does it stop mattering?",
        es: "Rankear todos los modelos por macro-F1 en lugar de accuracy, establecer qué puede hacer un baseline de Spark ML antes de recurrir a deep learning, y responder a una pregunta que la literatura suele afirmar sin medir: ¿transfiere a otra colección una representación aprendida sobre un ECG, y a partir de qué tamaño de dataset deja de importar?",
      },
    },
    dataArchitecture: {
      dataSources: {
        en: "MIT-BIH Arrhythmia (109,446 beats, five AAMI classes) and PTB Diagnostic (14,552 beats, normal vs myocardial infarction), both segmented to 187 samples at 125 Hz and distributed through Kaggle from the PhysioNet originals.",
        es: "MIT-BIH Arrhythmia (109.446 latidos, cinco clases AAMI) y PTB Diagnostic (14.552 latidos, normal frente a infarto de miocardio), ambas segmentadas a 187 muestras a 125 Hz y distribuidas por Kaggle a partir de los originales de PhysioNet.",
      },
      pipeline: {
        en: "Ingestion converts 556 MB of CSV into 48 MB of Parquet in about 14 seconds, an 11.5× reduction. The fifteen per-beat descriptors are written as Spark Column expressions rather than Python UDFs, so nothing crosses the JVM boundary, and preprocessing is a real pyspark.ml.Pipeline with custom transformers. The honest counterpoint is in the repository too: at 82 MB, pandas would be faster. Spark is there because the code has to survive contact with a full archive.",
        es: "La ingesta convierte 556 MB de CSV en 48 MB de Parquet en unos 14 segundos, una reducción de 11,5×. Los quince descriptores por latido están escritos como expresiones Column de Spark en lugar de UDFs de Python, así que nada cruza la frontera de la JVM, y el preprocesado es un pyspark.ml.Pipeline real con transformadores propios. El contrapunto honesto también está en el repositorio: con 82 MB, pandas sería más rápido. Spark está ahí porque el código tiene que sobrevivir al contacto con un archivo completo.",
      },
      diagrams: {
        en: "Raw CSV → Parquet lake → Spark ML feature pipeline → two model tracks (Spark ML baselines and a PyTorch CNN) → MLflow runs → reports/tables/*.json and *.csv, which are the files every number on this page is read from.",
        es: "CSV crudo → lago Parquet → pipeline de features de Spark ML → dos vías de modelado (baselines de Spark ML y una CNN de PyTorch) → runs de MLflow → reports/tables/*.json y *.csv, que son los ficheros de los que sale cada cifra de esta página.",
      },
    },
    modeling: {
      algorithms: {
        en: "Four class-weighted Spark ML baselines (logistic regression, decision tree, random forest, gradient-boosted trees) on a pruned set of seven descriptors, and a residual 1-D CNN of 53,858 parameters on the raw waveform. Transfer is tested with three arms (from scratch, frozen backbone, fine-tuned) over three seeds each.",
        es: "Cuatro baselines de Spark ML con pesos por clase (regresión logística, árbol de decisión, random forest y gradient-boosted trees) sobre un conjunto podado de siete descriptores, y una CNN 1-D residual de 53.858 parámetros sobre la forma de onda cruda. La transferencia se prueba con tres brazos (desde cero, backbone congelado y fine-tuning) con tres semillas cada uno.",
      },
      decisions: {
        en: "The EDA changed the modelling: fifteen per-beat descriptors were computed and the strongest linear relationship with the label was r = 0.272, so the CNN was given the raw waveform instead. Early stopping runs on macro-F1 rather than validation loss, because on this data the loss bottoms out early and then climbs while macro-F1 keeps improving. And the transfer experiment runs three seeds per arm because two supposedly identical runs landed a point apart, and a single run would have supported whichever story was wanted.",
        es: "El EDA cambió el modelado: se calcularon quince descriptores por latido y la relación lineal más fuerte con la etiqueta fue r = 0,272, así que a la CNN se le dio la forma de onda cruda. El early stopping va sobre macro-F1 y no sobre la pérdida de validación, porque con estos datos la pérdida toca fondo pronto y luego sube mientras el macro-F1 sigue mejorando. Y el experimento de transferencia usa tres semillas por brazo porque dos ejecuciones supuestamente idénticas quedaron a un punto de distancia: una sola ejecución habría respaldado la historia que se quisiera contar.",
      },
      libraries: ["PySpark", "pyspark.ml", "PyTorch", "MLflow", "PyArrow", "scikit-learn", "pytest"],
    },
    results: {
      metrics: {
        en: "MIT-BIH test set, 21,892 beats: macro-F1 0.9166, accuracy 0.984, ROC-AUC (OvR macro) 0.9936, MCC 0.9475, against macro-F1 0.8323 for the best Spark ML baseline and 0.1811 for the majority-class floor. On PTB across three seeds: from scratch 0.9854 (sd 0.0017), fine-tuned 0.9835 (sd 0.0040), frozen backbone 0.9339 (sd 0.0074).",
        es: "Test de MIT-BIH, 21.892 latidos: macro-F1 0,9166, accuracy 0,984, ROC-AUC (OvR macro) 0,9936, MCC 0,9475, frente a un macro-F1 de 0,8323 del mejor baseline de Spark ML y 0,1811 del suelo de clase mayoritaria. En PTB con tres semillas: desde cero 0,9854 (sd 0,0017), fine-tuning 0,9835 (sd 0,0040), backbone congelado 0,9339 (sd 0,0074).",
      },
      outcomes: {
        en: "At full PTB size, fine-tuning neither helps nor hurts (the two ranges overlap), which is the result a single run would have hidden. At 510 training beats, roughly 5% of PTB, fine-tuning is worth 14 points of macro-F1, and the advantage closes by about 1,000 beats and inverts beyond it. \"Transfer works\" is meaningless without a dataset size attached. Everything runs on two CPU cores with no GPU; the CNN trains in 24 minutes.",
        es: "Con PTB completo, el fine-tuning ni ayuda ni perjudica: los dos rangos se solapan, que es justo el resultado que una sola ejecución habría escondido. Con 510 latidos de entrenamiento (en torno al 5 % de PTB) el fine-tuning vale 14 puntos de macro-F1, y la ventaja se cierra hacia los 1.000 latidos y se invierte más allá. «La transferencia funciona» no significa nada sin un tamaño de dataset al lado. Todo corre en dos núcleos de CPU sin GPU; la CNN entrena en 24 minutos.",
      },
      visualizations: {
        en: "Per-class confusion matrices, the low-data transfer curve, and a class-weighting ablation showing that weighting selects an operating point rather than buying accuracy: unweighted, recall on the S and F classes falls 7.6 and 10.5 points while precision rises 5.7 and 13.8.",
        es: "Matrices de confusión por clase, la curva de transferencia con pocos datos y una ablación de los pesos por clase que muestra que ponderar elige un punto de operación en lugar de comprar accuracy: sin pesos, el recall de las clases S y F cae 7,6 y 10,5 puntos mientras la precisión sube 5,7 y 13,8.",
      },
    },
    learnings: {
      challenges: {
        en: "Making a Spark pipeline honest about its own overhead, and resisting the temptation to report a single transfer run. The second was the harder one: the first two runs disagreed by a full point of macro-F1, which is larger than most of the effects the experiment was meant to detect.",
        es: "Hacer que un pipeline de Spark sea honesto sobre su propio overhead, y resistir la tentación de reportar una única ejecución de transferencia. Lo segundo fue lo difícil: las dos primeras ejecuciones discrepaban en un punto entero de macro-F1, más que la mayoría de los efectos que el experimento pretendía detectar.",
      },
      learned: {
        en: "That a baseline is not a formality. The majority-class floor at macro-F1 0.181 against 82.8% accuracy is the single most useful number in the project, because it decides which metric the rest of the work is allowed to be judged on.",
        es: "Que un baseline no es un trámite. El suelo de clase mayoritaria con macro-F1 0,181 frente a un 82,8 % de accuracy es la cifra más útil del proyecto, porque decide con qué métrica se puede juzgar todo lo demás.",
      },
      improvements: {
        en: "Move to AAMI's inter-patient DS1/DS2 protocol, which is the harder and more honest evaluation. Wire the 109 existing tests into GitHub Actions so they actually run. Extend the low-data transfer curve to multiple seeds per cell so the +14-point figure carries an interval.",
        es: "Pasar al protocolo inter-paciente DS1/DS2 de AAMI, que es la evaluación más difícil y más honesta. Conectar los 109 tests existentes a GitHub Actions para que se ejecuten de verdad. Extender la curva de transferencia con pocos datos a varias semillas por celda para que la cifra de +14 puntos lleve un intervalo.",
      },
    },
  },
  {
    id: "cabify-route-divergence",
    headline: {
      en: "The biggest gain came from the decision rule, not the model: one division took missed divergences from 78 to zero.",
      es: "La mayor mejora vino de la regla de decisión, no del modelo: una división llevó las divergencias no detectadas de 78 a cero.",
    },
    title: {
      en: "Cabify Challenge · Part 2, Route Divergence Detection",
      es: "Cabify Challenge · Parte 2, Detección de Divergencia de Rutas",
    },
    shortDescription: {
      en: "Given an estimated route and the route actually driven, decide whether a human would call them the same. A calibrated logistic regression over 34 geometric features, plus a cost-derived three-way rule that automates 75.5% of journeys at 97.9% accuracy.",
      es: "Dada una ruta estimada y la ruta realmente conducida, decidir si una persona las llamaría iguales. Una regresión logística calibrada sobre 34 features geométricas, más una regla de coste de tres vías que automatiza el 75,5 % de los trayectos con un 97,9 % de acierto.",
    },
    categories: ["decision-science", "ml-engineering"],
    emphasis: "lead",
    status: "complete",
    glyph: "route",
    period: "2026",
    role: { en: "Solo", es: "Individual" },
    metrics: [
      {
        value: "75.5%",
        label: { en: "of journeys automated", es: "de trayectos automatizados" },
        note: {
          en: "at 97.9% accuracy · the other 24.5% go to human review",
          es: "con 97,9 % de acierto · el 24,5 % restante va a revisión humana",
        },
      },
      {
        value: "0",
        label: { en: "missed divergences", es: "divergencias no detectadas" },
        note: {
          en: "down from 78 · measured on 2,212 journeys, not a guarantee",
          es: "frente a 78 · medido sobre 2.212 trayectos, no es una garantía",
        },
      },
      {
        value: "0.0402",
        label: { en: "Brier score", es: "Brier score" },
        note: {
          en: "the one-feature rule scores 0.1397 at ROC-AUC 0.9887",
          es: "la regla de una sola feature saca 0,1397 con ROC-AUC 0,9887",
        },
      },
    ],
    caveat: {
      en: "\"Zero missed divergences\" is a measurement on 2,212 journeys, not a guarantee, and residual risk sits below what this dataset can resolve. The cost ratio A = 12 is a stated assumption, not a measurement. Buenos Aires and Bogotá are half the data and 19 of the 28 cities have fewer than 50 journeys.",
      es: "«Cero divergencias no detectadas» es una medición sobre 2.212 trayectos, no una garantía: el riesgo residual queda por debajo de lo que este dataset puede resolver. El ratio de coste A = 12 es un supuesto declarado, no una medida. Buenos Aires y Bogotá son la mitad de los datos y 19 de las 28 ciudades tienen menos de 50 trayectos.",
    },
    techStack: ["Python", "scikit-learn", "Shapely", "NumPy", "pandas", "Matplotlib"],
    githubUrl: "https://github.com/LunaPerezT/Cabify-DS-Challenge",
    overview: {
      context: {
        en: "A ride-hailing fare is priced on an estimated route. When the driver takes a different one, someone has to decide whether the difference matters enough to re-price the trip or open a dispute. The dataset is 3,027 annotations by eight annotators over 2,386 journeys across 28 cities and 7 countries.",
        es: "El precio de un viaje se calcula sobre una ruta estimada. Cuando el conductor toma otra distinta, alguien tiene que decidir si la diferencia importa lo suficiente como para recalcular el precio o abrir una disputa. El dataset son 3.027 anotaciones de ocho anotadores sobre 2.386 trayectos en 28 ciudades y 7 países.",
      },
      problem: {
        en: "The target is a human judgement, not a geometric fact, and that sets a ceiling on what any model can score. Two annotators agree with each other 92.7% of the time (kappa 0.850), and one annotator agrees with themselves 88.5% of the time. Seven per cent of annotations are \"I don't know\".",
        es: "El objetivo es un juicio humano, no un hecho geométrico, y eso pone un techo a lo que cualquier modelo puede sacar. Dos anotadores coinciden entre sí el 92,7 % de las veces (kappa 0,850), y un anotador coincide consigo mismo el 88,5 %. El 7 % de las anotaciones son «no lo sé».",
      },
      objective: {
        en: "Produce not just a classifier but an operating point: a rule an operations team can run, with an explicit account of what each kind of error costs and which cases should never be decided automatically.",
        es: "Producir no solo un clasificador sino un punto de operación: una regla que un equipo de operaciones pueda ejecutar, con una cuenta explícita de lo que cuesta cada tipo de error y de qué casos no deberían decidirse nunca de forma automática.",
      },
    },
    dataArchitecture: {
      dataSources: {
        en: "3,027 annotations over 2,386 journeys (54% \"differ\", 39% \"same\", 7% \"don't know\"), each with the estimated and the actual route as coordinate lists. 2,212 journeys resolve to a decisive consensus label; 174 stay genuinely ambiguous.",
        es: "3.027 anotaciones sobre 2.386 trayectos (54 % «difieren», 39 % «iguales», 7 % «no lo sé»), cada una con la ruta estimada y la real como listas de coordenadas. 2.212 trayectos resuelven a una etiqueta de consenso decisiva; 174 quedan genuinamente ambiguos.",
      },
      pipeline: {
        en: "34 geometric features are derived from the two coordinate lists: overlap fractions at several distance thresholds, sustained detour runs, discrete Fréchet distance and dynamic time warping, plus length and endpoint comparisons. Inference costs about 9 ms per journey, single-threaded.",
        es: "De las dos listas de coordenadas se derivan 34 features geométricas: fracciones de solape a varios umbrales de distancia, tramos de desvío sostenido, distancia de Fréchet discreta y dynamic time warping, además de comparaciones de longitud y de extremos. La inferencia cuesta unos 9 ms por trayecto en un solo hilo.",
      },
    },
    modeling: {
      algorithms: {
        en: "A calibrated logistic regression. Ten alternative algorithms were evaluated under two cross-validation schemes (random stratified and held-out city), and none beat it on both discrimination and calibration, so none were adopted.",
        es: "Una regresión logística calibrada. Se evaluaron diez algoritmos alternativos bajo dos esquemas de validación cruzada (estratificada aleatoria y con ciudad excluida) y ninguno la superó a la vez en discriminación y en calibración, así que no se adoptó ninguno.",
      },
      decisions: {
        en: "Three decisions mattered more than the algorithm. \"I don't know\" was treated as evidence rather than missing data (half a vote to each side), which keeps 174 genuinely ambiguous journeys in training at a measured cost of 0.0006 ROC-AUC. Cost-weighted training was rejected because it more than doubles the Brier score: it buys the reweighting by corrupting the probability, and costs belong in the decision, not in the model. And the F1-optimal threshold was replaced by a three-way accept / review / flag band derived from the cost of each error.",
        es: "Tres decisiones importaron más que el algoritmo. «No lo sé» se trató como evidencia y no como dato ausente (medio voto a cada lado), lo que mantiene 174 trayectos genuinamente ambiguos en entrenamiento a un coste medido de 0,0006 de ROC-AUC. El entrenamiento con pesos por coste se descartó porque más que duplica el Brier score: compra la reponderación corrompiendo la probabilidad, y los costes van en la decisión, no en el modelo. Y el umbral óptimo en F1 se sustituyó por una banda de tres vías (aceptar / revisar / marcar) derivada del coste de cada error.",
      },
      libraries: ["scikit-learn", "Shapely", "SciPy", "NumPy", "pandas"],
    },
    results: {
      metrics: {
        en: "Out of fold, 5-fold stratified: ROC-AUC 0.9902, PR-AUC 0.9931, Brier 0.0402. Agreement with the annotator consensus is 94.8%, against a two-annotator agreement of 92.7% and a self-agreement of 88.5%. Under held-out-city validation, ROC-AUC ranges from 0.982 to 0.996.",
        es: "Out of fold, 5-fold estratificado: ROC-AUC 0,9902, PR-AUC 0,9931, Brier 0,0402. La coincidencia con el consenso de los anotadores es del 94,8 %, frente a un 92,7 % de coincidencia entre dos anotadores y un 88,5 % consigo mismo. Con validación por ciudad excluida, el ROC-AUC va de 0,982 a 0,996.",
      },
      outcomes: {
        en: "Replacing the F1-optimal threshold at 0.50 with the cost-derived three-way band took missed divergences from 78 to zero while leaving needless flags unchanged (no retraining, one division). The recommendation automates 75.5% of volume at 97.9% accuracy and routes the ambiguous 24.5% to human review.",
        es: "Sustituir el umbral óptimo en F1 en 0,50 por la banda de tres vías derivada del coste llevó las divergencias no detectadas de 78 a cero dejando las marcas innecesarias igual (sin reentrenar, una división). La recomendación automatiza el 75,5 % del volumen con un 97,9 % de acierto y envía el 24,5 % ambiguo a revisión humana.",
      },
      visualizations: {
        en: "Calibration curves for the logistic regression against the one-feature rule, the cost surface that produces the two thresholds, and the automated-share versus accuracy trade-off across candidate operating points.",
        es: "Curvas de calibración de la regresión logística frente a la regla de una sola feature, la superficie de coste que produce los dos umbrales, y el compromiso entre volumen automatizado y acierto a lo largo de los puntos de operación candidatos.",
      },
    },
    learnings: {
      challenges: {
        en: "A single geometric feature (the share of the real route within 50 m of the estimate) already reaches ROC-AUC 0.9887. Justifying a model at all meant showing what it adds beyond ranking, which turned out to be calibration: Brier 0.0402 against 0.1397.",
        es: "Una sola feature geométrica (la porción de la ruta real que queda a menos de 50 m de la estimada) ya alcanza un ROC-AUC de 0,9887. Justificar que hubiera un modelo obligó a mostrar qué añade más allá de ordenar, y resultó ser la calibración: Brier 0,0402 frente a 0,1397.",
      },
      learned: {
        en: "Calibration is what makes a cost-derived threshold and a \"not sure\" band possible at all. Without well-behaved probabilities, the three-way rule has nothing to divide.",
        es: "La calibración es lo que hace posibles un umbral derivado del coste y una banda de «no estoy segura». Sin probabilidades bien comportadas, la regla de tres vías no tiene nada que dividir.",
      },
      improvements: {
        en: "Measure the cost ratio instead of assuming A = 12, since it is the one input the whole recommendation pivots on. Collect more journeys from the 19 under-represented cities, and re-run held-out-city validation once they are balanced.",
        es: "Medir el ratio de coste en lugar de suponer A = 12: es el único parámetro sobre el que pivota toda la recomendación. Recoger más trayectos de las 19 ciudades infrarrepresentadas y repetir la validación por ciudad excluida cuando estén equilibradas.",
      },
    },
  },
  {
    id: "cabify-experiment-design",
    headline: {
      en: "The question cannot be answered from the data the platform already has, and sample size is not the reason.",
      es: "La pregunta no se puede responder con los datos que la plataforma ya tiene, y el tamaño muestral no es el motivo.",
    },
    title: {
      en: "Cabify Challenge · Part 1, Experiment Design",
      es: "Cabify Challenge · Parte 1, Diseño Experimental",
    },
    shortDescription: {
      en: "Why a delivery platform cannot decide whether to keep funding free professional photography from existing evidence, and the five-track randomised design that would settle it.",
      es: "Por qué una plataforma de delivery no puede decidir con la evidencia que tiene si sigue financiando fotografía profesional gratuita, y el diseño aleatorizado de cinco vías que lo resolvería.",
    },
    categories: ["decision-science"],
    emphasis: "standard",
    status: "complete",
    glyph: "experiment",
    period: "2026",
    role: { en: "Solo", es: "Individual" },
    metrics: [
      {
        value: "+60.6%",
        label: { en: "reported effect when the truth is +8%", es: "efecto reportado cuando el real es +8 %" },
        note: {
          en: "simulated · difference-in-differences only claws it back to +13.9%",
          es: "simulado · el diff-in-diff solo lo recupera hasta +13,9 %",
        },
      },
      {
        value: "~37%",
        label: { en: "incrementality needed to break even", es: "incrementalidad para llegar al break-even" },
        note: {
          en: "simulated · a parameter nobody has measured",
          es: "simulado · un parámetro que nadie ha medido",
        },
      },
      {
        value: "5",
        label: { en: "randomisation tracks proposed", es: "vías de aleatorización propuestas" },
        note: {
          en: "each buys a piece the others cannot",
          es: "cada una compra una pieza que las otras no",
        },
      },
    ],
    caveat: {
      en: "Every figure in this project is simulated, to show what each design choice buys and what its output will look like when real data arrives. None of them is a finding, and none should ever be presented as one.",
      es: "Todas las cifras de este proyecto son simuladas, para mostrar qué compra cada decisión de diseño y qué aspecto tendrá su resultado cuando lleguen datos reales. Ninguna es un hallazgo y ninguna debe presentarse como tal.",
    },
    techStack: ["Python", "NumPy", "pandas", "statsmodels", "Matplotlib"],
    githubUrl: "https://github.com/LunaPerezT/Cabify-DS-Challenge",
    overview: {
      context: {
        en: "A delivery marketplace offers restaurants free professional photography for their menu listings. The brief asks for a keep-or-kill recommendation.",
        es: "Un marketplace de delivery ofrece a los restaurantes fotografía profesional gratuita para sus cartas. El enunciado pide una recomendación de mantener o cancelar.",
      },
      problem: {
        en: "Restaurants request the photographer, and they request it precisely when demand is already rising. In simulation, that self-selection turns a true +8% effect into a reported +60.6%; difference-in-differences only claws it back to +13.9%. The deeper problem is a parameter nobody has measured: on a marketplace, part of a treated restaurant's gain is demand taken from an untreated rival on the same platform.",
        es: "Los restaurantes piden al fotógrafo, y lo piden justo cuando su demanda ya está subiendo. En simulación, esa autoselección convierte un efecto real de +8 % en uno reportado de +60,6 %; el diff-in-diff solo lo recupera hasta +13,9 %. El problema de fondo es un parámetro que nadie ha medido: en un marketplace, parte de la ganancia de un restaurante tratado es demanda quitada a un rival no tratado de la misma plataforma.",
      },
      objective: {
        en: "Show why the existing evidence cannot answer the question, quantify what each source of bias does to the estimate, and specify a design that would produce an answer, including the reframing the numbers force.",
        es: "Mostrar por qué la evidencia existente no puede responder la pregunta, cuantificar qué le hace cada fuente de sesgo a la estimación, y especificar un diseño que sí produciría una respuesta, incluido el replanteamiento que las cifras obligan a hacer.",
      },
    },
    dataArchitecture: {
      dataSources: {
        en: "No client data. Every scenario is generated from an explicit data-generating process whose parameters are stated in the notebook, so the mechanism that produces each bias is visible rather than assumed.",
        es: "Sin datos de cliente. Cada escenario se genera a partir de un proceso generador de datos explícito cuyos parámetros están declarados en el notebook, así que el mecanismo que produce cada sesgo es visible en lugar de supuesto.",
      },
      pipeline: {
        en: "Simulation → naive estimate → difference-in-differences → interference-aware cluster estimate → cost model → allocation. Each stage exists to show what the previous one gets wrong.",
        es: "Simulación → estimación ingenua → diferencias en diferencias → estimación por clúster con interferencia → modelo de costes → asignación. Cada etapa existe para mostrar en qué se equivoca la anterior.",
      },
    },
    modeling: {
      algorithms: {
        en: "Difference-in-differences, cluster-level estimation over co-consideration clusters, and saturation randomisation for measuring interference. The proposed design randomises five tracks: restaurant-level encouragement, saturation randomisation, a geo switch-off, a customer-side listing test, and cost-effectiveness arms.",
        es: "Diferencias en diferencias, estimación a nivel de clúster sobre clústeres de co-consideración, y aleatorización por saturación para medir la interferencia. El diseño propuesto aleatoriza cinco vías: encouragement a nivel de restaurante, aleatorización por saturación, un apagado geográfico, un test del listado del lado del cliente, y brazos de coste-efectividad.",
      },
      decisions: {
        en: "The most consequential move is refusing to answer the question as asked. A restaurant-level A/B test reports +11.9% where the cluster as a whole gains +3.7%, a 3.2× overstatement that no amount of statistical care at the restaurant level can fix, because the unit of randomisation is wrong. And once heterogeneity is taken seriously, simulated returns run from +€980 to −€920 per shoot, which turns a keep-or-kill decision into an allocation one: not whether, but which 44%.",
        es: "El movimiento con más consecuencias es negarse a responder la pregunta tal y como se plantea. Un A/B a nivel de restaurante reporta +11,9 % donde el clúster completo gana +3,7 %, una sobreestimación de 3,2× que ningún cuidado estadístico a nivel de restaurante puede arreglar, porque la unidad de aleatorización es la equivocada. Y en cuanto se toma en serio la heterogeneidad, los retornos simulados van de +980 € a −920 € por sesión, lo que convierte una decisión de mantener o cancelar en una de asignación: no si, sino qué 44 %.",
      },
      libraries: ["NumPy", "pandas", "statsmodels", "SciPy", "Matplotlib"],
    },
    results: {
      metrics: {
        en: "All simulated. Selection bias: a true +8% effect is reported as +60.6%, recovered to +13.9% by difference-in-differences. Interference: an A/B test reports +11.9% against a cluster gain of +3.7%. Break-even incrementality: approximately 37%. Targeting: serving everyone returns −€1.7m a year against +€20.5m for the best 44%, before overhead.",
        es: "Todo simulado. Sesgo de selección: un efecto real de +8 % se reporta como +60,6 %, recuperado hasta +13,9 % con diferencias en diferencias. Interferencia: un A/B reporta +11,9 % frente a una ganancia de clúster de +3,7 %. Incrementalidad de break-even: en torno al 37 %. Segmentación: servir a todos devuelve −1,7 M€ al año frente a +20,5 M€ del mejor 44 %, antes de gastos generales.",
      },
      outcomes: {
        en: "The deliverable is a design and a reframing, not an effect estimate. The recommendation is to stop treating this as a keep-or-kill question and start measuring the incrementality parameter that decides it.",
        es: "El entregable es un diseño y un replanteamiento, no una estimación del efecto. La recomendación es dejar de tratar esto como una pregunta de mantener o cancelar y empezar a medir el parámetro de incrementalidad que la decide.",
      },
    },
    learnings: {
      challenges: {
        en: "Arguing that a question is unanswerable is a harder deliverable than answering it, because it has to be shown rather than asserted. Every claim about bias therefore comes with a simulation that produces it.",
        es: "Argumentar que una pregunta no se puede responder es un entregable más difícil que responderla, porque hay que demostrarlo en lugar de afirmarlo. Por eso cada afirmación sobre un sesgo viene con una simulación que lo produce.",
      },
      learned: {
        en: "On a two-sided marketplace, the unit of randomisation is a modelling decision with a bigger effect on the answer than the estimator. Interference is not a nuisance term; it is most of the effect.",
        es: "En un marketplace de dos lados, la unidad de aleatorización es una decisión de modelado con más efecto sobre la respuesta que el estimador. La interferencia no es un término molesto: es la mayor parte del efecto.",
      },
      improvements: {
        en: "Run the encouragement track first, since it is the cheapest of the five and it bounds the selection-bias term, which is the largest single distortion. Then use its output to size the saturation design.",
        es: "Ejecutar primero la vía de encouragement: es la más barata de las cinco y acota el término de sesgo de selección, que es la mayor distorsión individual. Después usar su resultado para dimensionar el diseño de saturación.",
      },
    },
  },
  {
    id: "time-series-forecasting",
    headline: {
      en: "One global LightGBM across 2,000 retail series at WRMSSE7 0.7717, where the metric choice, not the algorithm, was the finding.",
      es: "Un único LightGBM global sobre 2.000 series de retail con WRMSSE7 0,7717, donde el hallazgo fue la elección de la métrica, no el algoritmo.",
    },
    title: {
      en: "Retail Demand Forecasting",
      es: "Previsión de Demanda en Retail",
    },
    shortDescription: {
      en: "Three years of daily sales for 500 products across 4 stores, forecast one month ahead. About 30% of daily values are zero, which rules out percentage metrics and makes the choice of evaluation the first real decision.",
      es: "Tres años de ventas diarias de 500 productos en 4 tiendas, con previsión a un mes vista. En torno al 30 % de los valores diarios son cero, lo que descarta las métricas porcentuales y convierte la elección de la evaluación en la primera decisión real.",
    },
    categories: ["ml-engineering", "decision-science"],
    emphasis: "standard",
    status: "complete",
    glyph: "forecast",
    period: "2026",
    role: { en: "Solo · technical challenge", es: "Individual · reto técnico" },
    metrics: [
      {
        value: "0.7717",
        label: { en: "WRMSSE7, tuned LightGBM", es: "WRMSSE7, LightGBM tuneado" },
        note: {
          en: "held-out December, 2,000 series × 31 days · MASE 0.782",
          es: "diciembre held-out, 2.000 series × 31 días · MASE 0,782",
        },
      },
      {
        value: "2,000",
        label: { en: "series, one global model", es: "series, un modelo global" },
        note: {
          en: "500 products × 4 stores · sparse series borrow from dense ones",
          es: "500 productos × 4 tiendas · las series escasas toman prestado de las densas",
        },
      },
      {
        value: "14",
        label: { en: "models compared", es: "modelos comparados" },
        note: {
          en: "all six tree ensembles land within 0.021 WRMSSE7",
          es: "los seis ensembles de árboles quedan dentro de 0,021 WRMSSE7",
        },
      },
    ],
    caveat: {
      en: "There is one test origin and it is December (the annual trough, with Christmas in it). Without rolling-origin backtesting the ordering of the six tree-ensemble rows is provisional. The model also forecasts a zero on 2.1% of days where the history has 29.4%: it predicts a conditional mean and does not reproduce intermittency, which means a small systematic over-allocation on slow-moving products. Client unnamed; the challenge statement and the raw data are not published.",
      es: "Hay un único origen de test y es diciembre (el mínimo anual, con la Navidad dentro). Sin backtesting de origen móvil, el orden de las seis filas de ensembles de árboles es provisional. El modelo además predice cero el 2,1 % de los días cuando el histórico tiene un 29,4 %: predice una media condicional y no reproduce la intermitencia, lo que supone una pequeña sobreasignación sistemática en productos de baja rotación. Cliente sin nombrar; ni el enunciado ni los datos originales se publican.",
    },
    techStack: ["Darts", "LightGBM", "Optuna", "pandas", "NumPy", "scikit-learn"],
    githubUrl: "https://github.com/LunaPerezT/Time-Series-Forecasting",
    overview: {
      context: {
        en: "A retail forecasting challenge: 500 products across 4 stores and 3 categories, daily from 2013-01-01 to 2015-12-31 (2,000 series, 1,095 days, 2.19 million observations in long format), joined to 2.25 million price rows with no missing values left after the join.",
        es: "Un reto de previsión en retail: 500 productos en 4 tiendas y 3 categorías, a diario desde el 2013-01-01 hasta el 2015-12-31 (2.000 series, 1.095 días, 2,19 millones de observaciones en formato largo), unidas a 2,25 millones de filas de precios sin valores ausentes tras el join.",
      },
      problem: {
        en: "The demand is intermittent and extremely skewed: 29.4% of daily values are zero, up to 65% for the sparsest series, with mean daily sales of 2.8 against a maximum of 356, skewness 7.59 and kurtosis 122.4. Percentage metrics such as MAPE are undefined or unstable on this data, and a Gini of 0.514 across series means an unweighted metric will be dominated by the many small series rather than the few that carry the revenue.",
        es: "La demanda es intermitente y está muy sesgada: el 29,4 % de los valores diarios son cero, hasta un 65 % en las series más escasas, con una media diaria de 2,8 frente a un máximo de 356, asimetría 7,59 y curtosis 122,4. Las métricas porcentuales como el MAPE quedan indefinidas o inestables con estos datos, y un Gini de 0,514 entre series significa que una métrica sin ponderar estará dominada por las muchas series pequeñas en lugar de por las pocas que llevan la facturación.",
      },
      objective: {
        en: "Forecast 31 days ahead for every series, and rank candidate models on a metric that reflects what the business actually loses, which turned out to be the most consequential decision in the project.",
        es: "Prever 31 días por delante para cada serie, y ordenar los modelos candidatos con una métrica que refleje lo que el negocio pierde de verdad, que resultó ser la decisión con más consecuencias del proyecto.",
      },
    },
    dataArchitecture: {
      dataSources: {
        en: "Daily sales and prices for 500 pseudonymous products across 4 stores. The client is not named and the identifiers are pseudonymous in the source; the challenge statement and the raw data are not published, and the repository contains no personal data of any kind.",
        es: "Ventas y precios diarios de 500 productos pseudonimizados en 4 tiendas. El cliente no se nombra y los identificadores son pseudónimos en el origen; ni el enunciado ni los datos originales se publican, y el repositorio no contiene datos personales de ningún tipo.",
      },
      pipeline: {
        en: "A strictly chronological split with no shuffling: train 2013-01-01 to 2015-11-30 (1,064 days), test December 2015 (31 days). Optuna tunes against a separate CV split ending 2015-10-31 with November as validation, so the test month is never seen during tuning.",
        es: "Un split estrictamente cronológico y sin barajar: entrenamiento del 2013-01-01 al 2015-11-30 (1.064 días) y test en diciembre de 2015 (31 días). Optuna optimiza contra un split de CV separado que acaba el 2015-10-31 con noviembre como validación, así que el mes de test no se ve nunca durante el tuning.",
      },
      diagrams: {
        en: "Covariates are split by what is knowable at forecast time: ten calendar features as future covariates (day-of-week, month and day-of-year sin-cos, is_weekend, month_norm, trend, is_xmas), price as a past covariate because next month's price list is not knowable, and ten one-hot category / sub-category / store fields as static covariates.",
        es: "Las covariables se separan por lo que es conocible en el momento de la previsión: diez features de calendario como covariables futuras (seno-coseno de día de la semana, mes y día del año, is_weekend, month_norm, tendencia, is_xmas), el precio como covariable pasada porque la lista de precios del mes siguiente no es conocible, y diez campos one-hot de categoría, subcategoría y tienda como covariables estáticas.",
      },
    },
    modeling: {
      algorithms: {
        en: "One global model across all 2,000 series rather than 2,000 local ones, so sparse products borrow structure from dense ones; local and classical models were explicitly rejected. Fourteen models compared on the same chronological holdout (linear, GLM, bagging and boosting families), with the winner tuned by two sequential Optuna studies, one over the lag structure and one over hyperparameters.",
        es: "Un único modelo global sobre las 2.000 series en lugar de 2.000 locales, para que los productos escasos tomen prestada estructura de los densos; los modelos locales y clásicos se descartaron de forma explícita. Catorce modelos comparados sobre el mismo holdout cronológico (familias lineal, GLM, bagging y boosting), con el ganador tuneado mediante dos estudios secuenciales de Optuna, uno sobre la estructura de lags y otro sobre los hiperparámetros.",
      },
      decisions: {
        en: "Ranking is on WRMSSE7 (the M5 competition's metric), which scales each series by its own seasonal-naive error and weights by each series' share of units in the last 28 training days. A Tweedie objective was chosen for the zero-inflated target. Price was deliberately made a past covariate rather than a future one, because treating it as known would leak information the forecaster would not have in production.",
        es: "El ranking es por WRMSSE7 (la métrica de la competición M5), que escala cada serie por su propio error de naive estacional y pondera por la cuota de unidades de cada serie en los últimos 28 días de entrenamiento. Se eligió un objetivo Tweedie para el target inflado en ceros. El precio se hizo covariable pasada a propósito y no futura, porque tratarlo como conocido filtraría información que quien prevé no tendría en producción.",
      },
      libraries: ["Darts", "LightGBM", "Optuna", "pandas", "NumPy", "scikit-learn", "Matplotlib"],
    },
    results: {
      metrics: {
        en: "Held-out December 2015, 2,000 series × 31 days: WRMSSE7 0.7717 for the tuned LightGBM with a Tweedie objective, WRMSSE 0.7978, RMSSE7 0.7078 (sd 0.283), MASE (m=7) 0.7817 (sd 0.294), MAE 1.572 units. The untuned hand-set LightGBM reaches 0.7861, so the whole tuning effort is worth 0.0144, and almost all of that came from the lag search, not the hyperparameter study, which moved CV WRMSSE by 0.001.",
        es: "Diciembre de 2015 held-out, 2.000 series × 31 días: WRMSSE7 0,7717 para el LightGBM tuneado con objetivo Tweedie, WRMSSE 0,7978, RMSSE7 0,7078 (sd 0,283), MASE (m=7) 0,7817 (sd 0,294) y MAE de 1,572 unidades. El LightGBM sin tunear, con parámetros a mano, llega a 0,7861: todo el esfuerzo de tuning vale 0,0144, y casi todo vino de la búsqueda de lags, no del estudio de hiperparámetros, que movió el WRMSSE de CV en 0,001.",
      },
      outcomes: {
        en: "The metric choice is what made the analysis interesting. The linear models score a respectable RMSSE7 of about 0.81 unweighted but above 1.14 weighted, and they do fine on the many small series and badly on the few that carry the revenue, which only the volume-weighted metric reveals. All six tree-ensemble models land within 0.021 WRMSSE7 of each other, so the algorithm choice bought almost nothing; the Tweedie objective and the lag set bought the gains.",
        es: "Lo que hizo interesante el análisis fue la elección de la métrica. Los modelos lineales sacan un RMSSE7 respetable de en torno a 0,81 sin ponderar pero por encima de 1,14 ponderado: van bien en las muchas series pequeñas y mal en las pocas que llevan la facturación, algo que solo revela la métrica ponderada por volumen. Los seis ensembles de árboles quedan dentro de 0,021 de WRMSSE7 entre sí, así que la elección de algoritmo compró casi nada; las ganancias las compraron el objetivo Tweedie y el conjunto de lags.",
      },
    },
    learnings: {
      challenges: {
        en: "Choosing an evaluation before choosing a model, and then living with what it says. It would have been easier to report the unweighted RMSSE7 where the linear models look competitive.",
        es: "Elegir la evaluación antes que el modelo, y luego aceptar lo que dice. Habría sido más cómodo reportar el RMSSE7 sin ponderar, donde los modelos lineales parecen competitivos.",
      },
      learned: {
        en: "That the interesting failure is not the error size but its shape. Forecasting a zero on 2.1% of days where the history has 29.4% is a modelling-class problem (it needs Croston/TSB, a hurdle model or quantile forecasts, not more tuning).",
        es: "Que el fallo interesante no es el tamaño del error sino su forma. Predecir cero el 2,1 % de los días cuando el histórico tiene un 29,4 % es un problema de clase de modelo: necesita Croston/TSB, un modelo hurdle o previsiones por cuantiles, no más tuning.",
      },
      improvements: {
        en: "Rolling-origin backtesting, so the ranking rests on more than one December. An explicitly fitted seasonal-naive row in the results table (the scaled metrics carry it implicitly, but the like-for-like row is what a reviewer looks for). And prediction intervals, which an inventory decision needs and a point forecast cannot give.",
        es: "Backtesting de origen móvil, para que el ranking no descanse en un solo diciembre. Una fila de naive estacional ajustada de forma explícita en la tabla de resultados: las métricas escaladas lo llevan implícito, pero la fila comparable es lo que busca quien revisa. Y intervalos de predicción, que una decisión de inventario necesita y una previsión puntual no puede dar.",
      },
    },
  },
];

/**
 * Display order for the grid: strongest technical evidence first, then by what
 * each project proves. Derived from wiki/meta/copy-blocks.md, not from a date.
 */
const DISPLAY_ORDER = [
  "ecg-heartbeat-categorization",
  "cabify-route-divergence",
  "brain-tumor-detection",
  "cabify-experiment-design",
  "time-series-forecasting",
  "text-to-sql-agent",
  "parkinsons-prediction",
  "mental-health-eda",
  "educational-data-architecture",
] as const;

export const orderedProjects: Project[] = [...projects].sort(
  (a, b) => DISPLAY_ORDER.indexOf(a.id as never) - DISPLAY_ORDER.indexOf(b.id as never)
);

export const CATEGORY_LABELS: Record<
  ProjectCategory,
  { en: string; es: string }
> = {
  "medical-ai": { en: "Medical & health AI", es: "IA médica y salud" },
  "decision-science": { en: "Decision science", es: "Ciencia de la decisión" },
  "ml-engineering": { en: "ML engineering", es: "Ingeniería ML" },
  "data-engineering": { en: "Data engineering", es: "Ingeniería de datos" },
  "agentic-ai": { en: "Agentic AI", es: "IA agéntica" },
};

export const STATUS_LABELS: Record<ProjectStatus, { en: string; es: string }> = {
  deployed: { en: "Live demo", es: "Demo en vivo" },
  complete: { en: "Complete", es: "Completo" },
  local: { en: "Runs locally", es: "Solo en local" },
};

export interface SkillGroup {
  en: string;
  es: string;
  /** Bilingual, because half of these are terms of art and half are not. */
  items: { en: string[]; es: string[] };
}

/**
 * Each group lists what the nine projects actually demonstrate. Nothing here is
 * aspirational: if a skill appears, a project on this site shows it being used.
 */
export const skills: Record<string, SkillGroup> = {
  experimentDesign: {
    en: "Statistics & Experiment Design",
    es: "Estadística y Diseño Experimental",
    items: {
      en: [
        "Hypothesis testing",
        "A/B testing",
        "Causal inference",
        "Selection bias",
        "Interference",
        "Saturation randomisation",
        "Difference-in-differences",
        "Probability calibration",
        "Cost-sensitive thresholds",
      ],
      es: [
        "Contraste de hipótesis",
        "Tests A/B",
        "Inferencia causal",
        "Sesgo de selección",
        "Interferencia",
        "Aleatorización por saturación",
        "Diferencias en diferencias",
        "Calibración de probabilidades",
        "Umbrales por coste",
      ],
    },
  },
  machineLearning: {
    en: "Machine Learning",
    es: "Machine Learning",
    items: {
      en: [
        "Supervised learning",
        "Ensembles",
        "Stacking",
        "Feature engineering",
        "Feature selection",
        "RFECV",
        "Optuna",
        "Nested CV",
        "SMOTENC",
        "Class weighting",
        "Honest baselines",
      ],
      es: [
        "Aprendizaje supervisado",
        "Ensembles",
        "Stacking",
        "Feature engineering",
        "Selección de variables",
        "RFECV",
        "Optuna",
        "CV anidada",
        "SMOTENC",
        "Pesos de clase",
        "Baselines honestos",
      ],
    },
  },
  deepLearning: {
    en: "Deep Learning",
    es: "Deep Learning",
    items: {
      en: [
        "1-D CNNs",
        "2-D CNNs",
        "Residual networks",
        "Image segmentation",
        "ResUNet",
        "Transfer learning",
        "Fine-tuning",
        "Custom training loops",
        "Dice / IoU",
        "Early stopping",
      ],
      es: [
        "CNN 1-D",
        "CNN 2-D",
        "Redes residuales",
        "Segmentación de imagen",
        "ResUNet",
        "Transfer learning",
        "Fine-tuning",
        "Bucles de entrenamiento",
        "Dice / IoU",
        "Early stopping",
      ],
    },
  },
  timeSeries: {
    en: "Time Series & Forecasting",
    es: "Series Temporales y Forecasting",
    items: {
      en: [
        "Global models",
        "Intermittent demand",
        "WRMSSE",
        "MASE",
        "RMSSE",
        "Past covariates",
        "Chronological validation",
        "Calendar features",
        "Tweedie objective",
      ],
      es: [
        "Modelos globales",
        "Demanda intermitente",
        "WRMSSE",
        "MASE",
        "RMSSE",
        "Covariables pasadas",
        "Validación cronológica",
        "Features de calendario",
        "Objetivo Tweedie",
      ],
    },
  },
  dataEngineering: {
    en: "Data Engineering & Big Data",
    es: "Ingeniería de Datos y Big Data",
    items: {
      en: [
        "PySpark",
        "Spark SQL",
        "Spark ML pipelines",
        "Custom transformers",
        "ETL",
        "Delta Lake",
        "Lakehouse",
        "Parquet",
        "Schema design",
        "Normalisation",
        "Orchestration",
        "Data quality",
      ],
      es: [
        "PySpark",
        "Spark SQL",
        "Pipelines de Spark ML",
        "Transformadores propios",
        "ETL",
        "Delta Lake",
        "Lakehouse",
        "Parquet",
        "Diseño de esquemas",
        "Normalización",
        "Orquestación",
        "Calidad del dato",
      ],
    },
  },
  mlops: {
    en: "MLOps & Production",
    es: "MLOps y Producción",
    items: {
      en: [
        "Model deployment",
        "Docker",
        "REST APIs",
        "AWS App Runner",
        "S3",
        "MLflow",
        "pytest",
        "Reproducibility",
      ],
      es: [
        "Despliegue de modelos",
        "Docker",
        "APIs REST",
        "AWS App Runner",
        "S3",
        "MLflow",
        "pytest",
        "Reproducibilidad",
      ],
    },
  },
  agenticAi: {
    en: "Agentic AI & LLMs",
    es: "IA Agéntica y LLMs",
    items: {
      en: [
        "MCP",
        "Ollama",
        "Local LLMs",
        "Text-to-SQL",
        "Schema introspection",
        "Query validation",
        "Prompt-injection defence",
        "NLP",
      ],
      es: [
        "MCP",
        "Ollama",
        "LLMs en local",
        "Text-to-SQL",
        "Introspección de esquema",
        "Validación de consultas",
        "Defensa ante prompt injection",
        "NLP",
      ],
    },
  },
  healthData: {
    en: "Health & Clinical Data",
    es: "Datos Clínicos y de Salud",
    items: {
      en: [
        "SNOMED CT",
        "Healthcare data standards",
        "MRI preprocessing",
        "ECG signal processing",
        "Clinical metrics",
        "Class imbalance in imaging",
        "Public-health data",
        "Burden of disease",
      ],
      es: [
        "SNOMED CT",
        "Estándares de datos sanitarios",
        "Preprocesado de RM",
        "Procesado de ECG",
        "Métricas clínicas",
        "Desbalance en imagen",
        "Datos de salud pública",
        "Carga de enfermedad",
      ],
    },
  },
  communication: {
    en: "Analysis & Communication",
    es: "Análisis y Comunicación",
    items: {
      en: [
        "Exploratory analysis",
        "Data visualisation",
        "Dashboards",
        "Geospatial analysis",
        "Technical writing",
        "Stakeholder reporting",
        "Bilingual docs",
      ],
      es: [
        "Análisis exploratorio",
        "Visualización de datos",
        "Dashboards",
        "Análisis geoespacial",
        "Escritura técnica",
        "Reporting a negocio",
        "Documentación bilingüe",
      ],
    },
  },
};

export interface Certification {
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  issuer: string;
  /** YYYY-MM, so the list can sort itself newest first. */
  date: string;
  /** Absent when the issuer provides no public verification page. */
  url?: string;
  credentialId?: string;
}

export const certifications: Certification[] = [
  {
    name: {
      en: "DP-900: Microsoft Azure Data Fundamentals",
      es: "DP-900: Microsoft Azure Data Fundamentals",
    },
    description: {
      en: "Microsoft's foundational data certification: core data concepts, relational and non-relational data on Azure, and the analytics workloads the platform supports.",
      es: "Certificación fundamental de datos de Microsoft: conceptos básicos de datos, datos relacionales y no relacionales en Azure, y las cargas de trabajo analíticas que soporta la plataforma.",
    },
    issuer: "Microsoft",
    date: "2026-04",
    url: "https://learn.microsoft.com/en-us/users/lunapreztroncoso-4555/achievements/8vfzxhyw",
  },
  {
    name: {
      en: "SNOMED CT Foundation Course",
      es: "SNOMED CT Foundation Course",
    },
    description: {
      en: "The structure and use of SNOMED CT, the clinical terminology behind interoperable health records: concepts, hierarchies, relationships and how coded clinical meaning is recorded and retrieved.",
      es: "Estructura y uso de SNOMED CT, la terminología clínica detrás de las historias clínicas interoperables: conceptos, jerarquías, relaciones y cómo se registra y recupera el significado clínico codificado.",
    },
    issuer: "SNOMED International",
    date: "2026-04",
    credentialId: "111cebb2-9932-486b-9648-f1d6b7ee6d32",
  },
  {
    name: {
      en: "Healthcare Data Standards",
      es: "Healthcare Data Standards",
    },
    description: {
      en: "How clinical information is structured, exchanged and reused across systems, the standards layer that has to exist before health data can be analysed at all.",
      es: "Cómo se estructura, intercambia y reutiliza la información clínica entre sistemas: la capa de estándares que tiene que existir antes de poder analizar datos de salud.",
    },
    issuer: "Better",
    date: "2026-04",
    url: "https://mycourse.app/W9iLCBYkstCYhX8py",
    credentialId: "6992ce556f0548895f06e0f9",
  },
  {
    name: { en: "Elements of AI", es: "Elementos de la IA" },
    description: {
      en: "The University of Helsinki's introduction to artificial intelligence: what AI is, what it can and cannot do, and the societal questions that come with it.",
      es: "La introducción a la inteligencia artificial de la Universidad de Helsinki: qué es la IA, qué puede y qué no puede hacer, y las preguntas sociales que trae consigo.",
    },
    issuer: "University of Helsinki",
    date: "2025-10",
    // No credential link on file. mooc.fi issues one at certificates.mooc.fi;
    // add it here rather than linking the public course page, which would not
    // verify anything.
  },
  {
    name: { en: "Deep Learning", es: "Deep Learning" },
    description: {
      en: "Knowledge of neural networks and deep learning techniques. Proficiency in Keras and solving fundamental deep learning problems.",
      es: "Conocimientos sobre redes neuronales y técnicas de deep learning. Manejo de Keras, y resolución de problemas básicos.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947bf323f3fc8fa76df3ac3",
  },
  {
    name: { en: "Machine Learning Engineer", es: "Machine Learning Engineer" },
    description: {
      en: "Completion of the Machine Learning Engineer specialization track, covering advanced ML techniques and production-ready model development.",
      es: "Finalización del itinerario de especialización en Machine Learning Engineer, cubriendo técnicas avanzadas de ML y desarrollo de modelos listos para producción.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947bfae3f3fc8fa76df3c9e",
  },
  {
    name: { en: "MLOps", es: "MLOps" },
    description: {
      en: "Practices for deploying and maintaining machine learning models in production reliably and efficiently.",
      es: "MLOps es un conjunto de prácticas que tiene como objetivo implementar y mantener modelos de aprendizaje automático en producción de manera confiable y eficiente.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947bfd83f3fc8fa76df3dab",
  },
  {
    name: { en: "Machine Learning", es: "Machine Learning" },
    description: {
      en: "Fundamental Machine Learning techniques. Proficiency in scikit-learn and solving core ML problems.",
      es: "Técnicas de Machine Learning básicas. Uso de sk-learn, y resolución de problemas básicos.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947bf183f3fc8fa76df3a1b",
  },
  {
    name: { en: "NLP (Natural Language Processing)", es: "NLP (Procesamiento de Lenguaje Natural)" },
    description: {
      en: "Techniques for processing and analyzing natural language data, including text classification, tokenization, and language modeling.",
      es: "Técnicas para el procesamiento y análisis de datos de lenguaje natural, incluyendo clasificación de texto, tokenización y modelado del lenguaje.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947bfed0312879c54d5f80e",
  },
  {
    name: { en: "TensorFlow & Keras", es: "TensorFlow & Keras" },
    description: {
      en: "Fundamentals of TensorFlow and Keras libraries for creating, training, and manipulating neural networks.",
      es: "Fundamentos básicos del uso de las bibliotecas de TensorFlow y Keras para la creación, entrenamiento y manipulación de redes neuronales.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947bfc23f3fc8fa76df3d49",
  },
  {
    name: { en: "Data Visualization", es: "Visualización de Datos" },
    description: {
      en: "Techniques and tools for effective data visualization, transforming complex datasets into clear and impactful visual narratives.",
      es: "Técnicas y herramientas para la visualización efectiva de datos, transformando datasets complejos en narrativas visuales claras e impactantes.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947becd3f3fc8fa76df381e",
  },
  {
    name: { en: "Exploratory Data Analysis (EDA)", es: "Análisis Exploratorio de Datos (EDA)" },
    description: {
      en: "Methods for exploring and summarizing datasets to uncover patterns, anomalies, and relationships before formal modeling.",
      es: "Métodos para explorar y resumir datasets para descubrir patrones, anomalías y relaciones antes del modelado formal.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947beba3f3fc8fa76df37b9",
  },
  {
    name: { en: "Data Wrangling", es: "Data Wrangling" },
    description: {
      en: "Data preparation for Machine Learning algorithms. Feature Engineering for numerical, categorical, text, and time series variables.",
      es: "Preparación de datos para los algoritmos de Machine Learning. Feature Engineering de variables numéricas, categóricas, de texto y series temporales.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947bf4792fd79c203ec7b4f",
  },
  {
    name: { en: "I am a Data Scientist", es: "Soy Data Scientist" },
    description: {
      en: "Completed the full Data Science Bootcamp, acquiring skills in programming, data access and extraction, analysis, problem-solving, and Machine Learning & Deep Learning algorithms.",
      es: "Completó el Bootcamp de Data Science adquiriendo conocimientos de programación, acceso y extracción de datos, análisis y resolución de problemas, y algoritmos de Machine Learning y Deep Learning.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947bf60da35354bb06c0290",
  },
  {
    name: { en: "SQL", es: "SQL" },
    description: {
      en: "Proficiency in SQL for querying, manipulating, and managing relational databases effectively.",
      es: "Dominio de SQL para consultar, manipular y gestionar bases de datos relacionales de forma efectiva.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947bf9cda35354bb06c03c7",
  },
  {
    name: { en: "Python Fundamentals", es: "Fundamentos de Python" },
    description: {
      en: "Core Python programming skills including data structures, control flow, functions, and object-oriented principles.",
      es: "Habilidades fundamentales de programación en Python incluyendo estructuras de datos, flujo de control, funciones y principios de orientación a objetos.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947bea1da35354bb06bfd78",
  },
  {
    name: { en: "CRUD Operations in MongoDB", es: "Operaciones CRUD en MongoDB" },
    description: {
      en: "Validates knowledge in performing Create, Read, Update, and Delete operations to manage data, designing effective queries, and modifying query results.",
      es: "Valida conocimientos en operaciones Create, Read, Update y Delete para gestionar datos, diseñar consultas efectivas y modificar resultados de consultas.",
    },
    issuer: "MongoDB",
    date: "2025-12",
    url: "https://www.credly.com/badges/331488fe-378b-4ad8-84e8-1d12a1383b35/linked_in_profile",
  },
  {
    name: { en: "Maths for Data Science", es: "Matemáticas para Data Science" },
    description: {
      en: "Mathematical foundations for Data Science including linear algebra, calculus, probability, and statistics applied to data problems.",
      es: "Fundamentos matemáticos para Data Science incluyendo álgebra lineal, cálculo, probabilidad y estadística aplicados a problemas de datos.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947bf7492fd79c203ec7ce6",
  },
  {
    name: { en: "Time Series Analysis", es: "Análisis de Series Temporales" },
    description: {
      en: "Techniques for analyzing time-dependent data, including trend detection, seasonality, forecasting, and temporal pattern recognition.",
      es: "Técnicas para el análisis de datos dependientes del tiempo, incluyendo detección de tendencias, estacionalidad, forecasting y reconocimiento de patrones temporales.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947bf88da35354bb06c0366",
  },
  {
    name: { en: "GitHub", es: "GitHub" },
    description: {
      en: "Version control and collaborative development using Git and GitHub, including branching strategies and code review workflows.",
      es: "Control de versiones y desarrollo colaborativo usando Git y GitHub, incluyendo estrategias de branching y flujos de revisión de código.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947c000da35354bb06c058c",
  },
  {
    name: { en: "Object Oriented Programming", es: "Programación Orientada a Objetos" },
    description: {
      en: "Object-oriented programming principles including encapsulation, inheritance, polymorphism, and design patterns for scalable code.",
      es: "Principios de programación orientada a objetos incluyendo encapsulación, herencia, polimorfismo y patrones de diseño para código escalable.",
    },
    issuer: "The Bridge",
    date: "2025-12",
    url: "https://api.badgr.io/public/assertions/6947c014da35354bb06c05e9",
  },
];

export interface Education {
  title: { en: string; es: string };
  institution: string;
  /** Free text, because these are ranges and single dates alike. */
  period: { en: string; es: string };
  summary: { en: string; es: string };
  /** What the programme actually covered. Rendered as tags. */
  topics?: { en: string[]; es: string[] };
  url?: string;
}

export const education: Education[] = [
  {
    title: {
      en: "Master in Azure Databricks & Spark for Data Engineers",
      es: "Máster en Azure Databricks & Spark para Data Engineers",
    },
    institution: "Udemy",
    period: { en: "Jun 2026 - Aug 2026", es: "jun. 2026 - ago. 2026" },
    summary: {
      en: "Specialised training in data engineering on Azure Databricks and Apache Spark, aimed at building scalable pipelines and cloud data architectures, from cluster and job management through to governance with Unity Catalog.",
      es: "Formación especializada en ingeniería de datos sobre Azure Databricks y Apache Spark, orientada a construir pipelines escalables y arquitecturas de datos en cloud, desde la gestión de clusters y jobs hasta la gobernanza con Unity Catalog.",
    },
    topics: {
      en: [
        "Azure Databricks",
        "Clusters & jobs",
        "Spark Core",
        "PySpark",
        "Spark SQL",
        "ETL pipelines",
        "Batch processing",
        "Incremental loading",
        "Delta Lake",
        "Time Travel",
        "Lakehouse",
        "ADLS Gen2",
        "Azure Data Factory",
        "Unity Catalog",
        "Partitioning & caching",
        "Power BI",
      ],
      es: [
        "Azure Databricks",
        "Clusters y jobs",
        "Spark Core",
        "PySpark",
        "Spark SQL",
        "Pipelines ETL",
        "Procesamiento batch",
        "Carga incremental",
        "Delta Lake",
        "Time Travel",
        "Lakehouse",
        "ADLS Gen2",
        "Azure Data Factory",
        "Unity Catalog",
        "Particionado y caching",
        "Power BI",
      ],
    },
  },
  {
    title: { en: "Data Science Bootcamp", es: "Bootcamp de Data Science" },
    institution: "The Bridge",
    period: { en: "Completed Dec 2025", es: "finalizado dic. 2025" },
    summary: {
      en: "Full-time data science programme covering programming, data access and extraction, analysis and problem solving, and machine learning and deep learning algorithms. Seventeen of the certifications below come from it.",
      es: "Programa intensivo de data science: programación, acceso y extracción de datos, análisis y resolución de problemas, y algoritmos de machine learning y deep learning. Diecisiete de las certificaciones de abajo salen de aquí.",
    },
    topics: {
      en: [
        "Machine Learning Engineer",
        "MLOps",
        "Deep learning",
        "TensorFlow & Keras",
        "NLP",
        "SQL",
        "Data wrangling",
        "Time series",
        "Data visualisation",
      ],
      es: [
        "Machine Learning Engineer",
        "MLOps",
        "Deep learning",
        "TensorFlow y Keras",
        "NLP",
        "SQL",
        "Data wrangling",
        "Series temporales",
        "Visualización de datos",
      ],
    },
    url: "https://api.badgr.io/public/assertions/6947bf60da35354bb06c0290",
  },
];

// Social links
export const socialLinks = {
  github: "https://github.com/LunaPerezT",
  linkedin: "https://www.linkedin.com/in/luna-p%C3%A9rez-troncoso-0ab21929b/",
  email: "lunapereztroncoso@gmail.com",
};
