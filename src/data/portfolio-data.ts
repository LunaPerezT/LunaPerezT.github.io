export interface Project {
  id: string;
  title: {
    en: string;
    es: string;
  };
  shortDescription: {
    en: string;
    es: string;
  };
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
    title: {
      en: "🧠 Brain Tumor Detection & Segmentation",
      es: "🧠 Detección y Segmentación de Tumores Cerebrales",
    },
    shortDescription: {
      en: "End-to-end MLOps pipeline for glioma detection and segmentation in MRI scans. Features ResNet-50 (Classification) and ResUNet (Segmentation).",
      es: "Pipeline MLOps end-to-end para detección y segmentación de gliomas en resonancias magnéticas. Utiliza ResNet-50 (Clasificación) y ResUNet (Segmentación).",
    },
    techStack: ["Python", "TensorFlow", "Keras", "Flask", "Streamlit", "Docker", "AWS App Runner"],
    githubUrl: "https://github.com/LunaPerezT/brain-tumor-detection/tree/release",
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
    title: {
      en: "🤖 Talk to your Data: Agentic Text-to-SQL",
      es: "🤖 Habla con tus Datos: Agente Text-to-SQL",
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
    title: {
      en: "📊 Mental Health Global Insights",
      es: "📊 Insights Globales de Salud Mental",
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
    title: {
      en: "🩺 Parkinson's Disease Prediction",
      es: "🩺 Predicción de Enfermedad de Parkinson",
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
    title: {
      en: "🗄️ Educational Data Architecture",
      es: "🗄️ Arquitectura de Datos Educativos",
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
];

export interface Skill {
  name: string;
  category: string;
}

export const skills: Record<string, { en: string; es: string; items: string[] }> = {
  statisticalModeling: {
    en: "Statistical Analysis & Modeling",
    es: "Análisis Estadístico y Modelado",
    items: ["Hypothesis Testing", "Regression Analysis", "Time Series", "Bayesian Inference", "A/B Testing", "Experimental Design"],
  },
  mlAi: {
    en: "Machine Learning & AI",
    es: "Machine Learning e IA",
    items: ["Supervised Learning", "Unsupervised Learning", "Ensemble Methods", "Feature Engineering", "Hyperparameter Tuning", "Model Evaluation"],
  },
  deepLearningSkills: {
    en: "Deep Learning & Neural Networks",
    es: "Deep Learning y Redes Neuronales",
    items: ["CNNs", "Image Segmentation", "Transfer Learning", "NLP", "LLMs", "Agentic AI"],
  },
  dataEngineering: {
    en: "Data Engineering & ETL",
    es: "Ingeniería de Datos y ETL",
    items: ["ETL Pipelines", "Data Wrangling", "Database Design", "Data Quality", "Schema Normalization", "Big Data Processing"],
  },
  mlopsSkills: {
    en: "MLOps & Production",
    es: "MLOps y Producción",
    items: ["CI/CD for ML", "Model Deployment", "Containerization", "API Development", "Monitoring", "Reproducibility"],
  },
  communication: {
    en: "Scientific Communication & Reporting",
    es: "Comunicación Científica y Reporting",
    items: ["Data Visualization", "Dashboard Design", "Scientific Writing", "Cross-team Communication", "EDA", "Insight Reporting"],
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
  date: string;
  url: string;
}

export const certifications: Certification[] = [
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

// Social links
export const socialLinks = {
  github: "https://github.com/LunaPerezT",
  linkedin: "https://www.linkedin.com/in/luna-p%C3%A9rez-troncoso-0ab21929b/",
  email: "lunapereztroncoso@gmail.com",
};
