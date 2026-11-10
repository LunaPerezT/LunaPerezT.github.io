import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.tools": "Tech Stack",
    "nav.certifications": "Education",
    "nav.about": "About",
    "nav.contact": "Contact",
    "header.portfolio": "Luna Pérez Troncoso",
    
    // Hero
    "hero.welcome": "Welcome to my portfolio",
    "hero.title1": "Data Scientist &",
    "hero.title2": "AI Engineer",
    "hero.summary": "Data Scientist and AI Engineer working across the full pipeline, from ingestion to deployment, on problems from very different domains: health, mobility, retail and education. I build machine learning and deep learning models and, increasingly, generative AI systems: LLM agents connected to real data through MCP, with the guarantees written in code rather than in the prompt. What ties it together is one question: what will a model\u2019s output actually be used for, and how do you evaluate it so the answer survives scrutiny.",
    "hero.viewProjects": "View Projects",
    "hero.contact": "Contact",
    "hero.stat.projects": "Featured Projects",
    "hero.stat.certifications": "Certifications",
    "hero.stat.focus": "ML & AI Focus",
    "hero.stat.tools": "Tools & Tech",
    
    // Projects
    "projects.subtitle": "Featured Work",
    "projects.title": "Projects",
    "projects.description": "Ten projects, ordered by what each one proves rather than by date. Every card carries its headline number and the split it was measured on.",
    "projects.viewDetails": "Read the case study",
    "projects.backToProjects": "Back to Projects",
    
    // Project Tabs
    "project.tab.overview": "Overview",
    "project.tab.data": "Data / Architecture",
    "project.tab.modeling": "Modeling",
    "project.tab.results": "Results",
    "project.tab.learnings": "Learnings",
    "project.context": "Context",
    "project.problem": "Problem Statement",
    "project.objective": "Objective",
    "project.dataSources": "Data Sources",
    "project.pipeline": "Pipeline / Workflow",
    "project.architecture": "Architecture",
    "project.algorithms": "Algorithms & Models",
    "project.decisions": "Key Decisions",
    "project.libraries": "Libraries & Frameworks",
    "project.metrics": "Metrics",
    "project.outcomes": "Key Outcomes",
    "project.visualizations": "Visualizations",
    "project.challenges": "Challenges Faced",
    "project.learned": "What I Learned",
    "project.improvements": "Future Improvements",
    
    // Skills
    "skills.subtitle": "Technical Expertise",
    "skills.title": "Skills",
    "skills.description": "Nine groups, drawn from what the projects on this page actually required, from cost-derived decision rules and Spark pipelines to LLM agents. In generative AI, RAG, LangChain and LangGraph come from the recent training listed under Education rather than from a project here.",
    
    // Tools
    "tools.subtitle": "Tech Stack",
    "tools.title": "Languages & Tools",
    "tools.description": "Everything advertised on my GitHub profile, grouped the same way. Depth varies: some of these carry whole projects on this page, others are familiar tools I have used less.",
    
    // Certifications
    "certifications.subtitle": "Training & credentials",
    "certifications.title": "Education & Certifications",
    "certifications.description": "Where the training came from, and the certifications behind it: a data science bootcamp, Azure data engineering, LLM agents and MCP, and clinical terminology standards.",
    
    // About
    "about.subtitle": "Get to Know Me",
    "about.title": "About Me",
    "about.bio1": "I came to data science from biomedical research. After a degree in biochemistry and a master\u2019s in neuroscience, I worked as a predoctoral researcher at CSIC, and that is where I learned to design the experiment before believing the result. Today I bring that habit to data and AI problems in any domain: health, mobility, retail or education.",
    "about.bio2": "I work across the whole pipeline: ingestion and distributed processing with Spark, classical machine learning, deep learning on signals and images, time-series forecasting and deployment. Alongside that I build generative AI applications. I have worked on an LLM agent that answers questions over a database through MCP, running a local model on Ollama, and I am extending that work towards RAG and multi-agent workflows with LangChain and LangGraph.",
    "about.bio3": "Whatever the technique, the question is the same: what will someone do with this output? That is why I choose metrics for the decision they feed, compare against honest baselines and keep each result\u2019s limitations next to the number. And I care as much about explaining a model to the people who will use it as about building it.",
    "about.value1.title": "Versatile by design",
    "about.value1.description": "Tables, signals, images, time series or text: I pick the tool for the problem, not the problem for the tool.",
    "about.value2.title": "Generative AI, engineered",
    "about.value2.description": "LLMs are powerful and unpredictable, so the guarantees live in code: validators, least privilege, and local models when the data must not leave the machine.",
    "about.value3.title": "Learning by building",
    "about.value3.description": "The field moves fast. I keep up through courses and papers, but it only counts once it runs. The most recent: MCP, and agents with LangChain and LangGraph.",
    
    // Contact
    "contact.subtitle": "Let's Connect",
    "contact.title": "Get in Touch",
    "contact.description": "Have a project in mind or want to discuss opportunities? I'd love to hear from you.",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "your.email@example.com",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell me about your project or opportunity...",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.otherWays": "Other Ways to Connect",
    "contact.responseTime": "Feel free to reach out through any of these channels. I typically respond within 24-48 hours.",
    "contact.connectWithMe": "Connect with me",
    "contact.viewRepos": "View my repositories",
    "contact.fillAll": "Please fill in all fields",
    "contact.sent": "Message sent!",
    "contact.sentDesc": "Thank you for reaching out. I'll get back to you soon.",
    
    // Footer
    "footer.rights": "All rights reserved.",
    
    // Language selector
    "language.select": "Language",
    // --- Redesign 2026-08: new keys -------------------------------------
    "nav.primary": "Main navigation",
    "nav.skip": "Skip to content",
    "nav.open": "Open menu",
    "nav.close": "Close menu",
    "theme.toDark": "Switch to dark theme",
    "theme.toLight": "Switch to light theme",

    "hero.terminal": "Terminal",
    "hero.proof.label": "Three results, and where to check them",
    "hero.proof.cta": "Read the case study",

    "projects.filter.label": "Filter projects by field",
    "projects.filter.all": "All",
    "projects.showing": "{n} projects",

    "project.repository": "Repository",
    "project.liveDemo": "Live demo",
    "project.privateCode": "Private code",
    "project.contents": "Contents",
    "project.stack": "Stack",
    "project.next": "Next project",

    "about.principles": "How I work",
    "certifications.view": "View credential",

    "contact.error.name": "Tell me your name so I know who is writing.",
    "contact.error.emailRequired": "I need an email address to reply to.",
    "contact.error.emailFormat": "That address does not look right, check for a typo.",
    "contact.error.message": "Add a message, even a short one.",
    "contact.error.sendTitle": "The message did not go through",
    "contact.error.sendBody": "Something went wrong on the way. Try again, or write directly to lunapereztroncoso@gmail.com.",
    // --- Education + refreshed skills/tools copy ------------------------
    "education.title": "Education & training",
    "certifications.listTitle": "{n} certifications",
    "certifications.credentialId": "Credential ID",
    "nav.backToTop": "Back to top",
    "hero.featured": "Leading case",
    "hero.featured.subtitle": "124k heartbeats, a Spark pipeline and a residual 1-D CNN",
    "about.card.eyebrow": "Open to work",
    "about.card.title": "Data Scientist & AI Engineer",
    "about.card.body": "Madrid. Data science, machine learning and generative AI, from data to deployment.",
    "about.card.cta": "Get in touch",
  },
  es: {
    // Header
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.skills": "Habilidades",
    "nav.tools": "Stack Tecnológico",
    "nav.certifications": "Formación",
    "nav.about": "Sobre mí",
    "nav.contact": "Contacto",
    "header.portfolio": "Luna Pérez Troncoso",
    
    // Hero
    "hero.welcome": "Bienvenido/a a mi portfolio",
    "hero.title1": "Data Scientist &",
    "hero.title2": "AI Engineer",
    "hero.summary": "Data Scientist y AI Engineer: trabajo en todo el pipeline, de la ingesta al despliegue, sobre problemas de dominios muy distintos: salud, movilidad, retail o educaci\u00f3n. Construyo modelos de machine learning y deep learning y, cada vez m\u00e1s, sistemas de IA generativa: agentes LLM conectados a datos reales mediante MCP, con las garant\u00edas escritas en c\u00f3digo y no en el prompt. Lo que lo une todo es una pregunta: para qu\u00e9 se va a usar de verdad la salida de un modelo, y c\u00f3mo evaluarlo para que la respuesta aguante el escrutinio.",
    "hero.viewProjects": "Ver Proyectos",
    "hero.contact": "Contacto",
    "hero.stat.projects": "Proyectos Destacados",
    "hero.stat.certifications": "Certificaciones",
    "hero.stat.focus": "Enfoque ML & IA",
    "hero.stat.tools": "Herramientas",
    
    // Projects
    "projects.subtitle": "Trabajo Destacado",
    "projects.title": "Proyectos",
    "projects.description": "Diez proyectos, ordenados por lo que demuestra cada uno y no por fecha. Cada tarjeta lleva su cifra principal y el split sobre el que se midi\u00f3.",
    "projects.viewDetails": "Ver el caso",
    "projects.backToProjects": "Volver a Proyectos",
    
    // Project Tabs
    "project.tab.overview": "Resumen",
    "project.tab.data": "Datos / Arquitectura",
    "project.tab.modeling": "Modelado",
    "project.tab.results": "Resultados",
    "project.tab.learnings": "Aprendizajes",
    "project.context": "Contexto",
    "project.problem": "Problema",
    "project.objective": "Objetivo",
    "project.dataSources": "Fuentes de Datos",
    "project.pipeline": "Pipeline / Flujo de Trabajo",
    "project.architecture": "Arquitectura",
    "project.algorithms": "Algoritmos y Modelos",
    "project.decisions": "Decisiones Clave",
    "project.libraries": "Librerías y Frameworks",
    "project.metrics": "Métricas",
    "project.outcomes": "Resultados Clave",
    "project.visualizations": "Visualizaciones",
    "project.challenges": "Desafíos Enfrentados",
    "project.learned": "Lo que Aprendí",
    "project.improvements": "Mejoras Futuras",
    
    // Skills
    "skills.subtitle": "Experiencia Técnica",
    "skills.title": "Habilidades",
    "skills.description": "Nueve bloques, sacados de lo que han exigido de verdad los proyectos de esta p\u00e1gina, desde reglas de decisi\u00f3n por coste y pipelines de Spark hasta agentes LLM. En IA generativa, RAG, LangChain y LangGraph vienen de la formaci\u00f3n reciente que aparece en Formaci\u00f3n, no de un proyecto de esta p\u00e1gina.",
    
    // Tools
    "tools.subtitle": "Stack Tecnológico",
    "tools.title": "Lenguajes & Herramientas",
    "tools.description": "Todo lo que aparece en mi perfil de GitHub, agrupado igual. La profundidad var\u00eda: algunas sostienen proyectos enteros de esta p\u00e1gina y otras son herramientas conocidas que he usado menos.",
    
    // Certifications
    "certifications.subtitle": "Formación y credenciales",
    "certifications.title": "Formación y Certificaciones",
    "certifications.description": "De d\u00f3nde viene la formaci\u00f3n y qu\u00e9 certificaciones la respaldan: un bootcamp de data science, ingenier\u00eda de datos en Azure, agentes LLM y MCP, y est\u00e1ndares de terminolog\u00eda cl\u00ednica.",
    
    // About
    "about.subtitle": "Conóceme",
    "about.title": "Sobre Mí",
    "about.bio1": "Llegu\u00e9 a la ciencia de datos desde la investigaci\u00f3n biom\u00e9dica. Tras el grado en Bioqu\u00edmica y el m\u00e1ster en Neurociencias trabaj\u00e9 como investigadora predoctoral en el CSIC, y all\u00ed aprend\u00ed a dise\u00f1ar el experimento antes de creerme el resultado. Hoy llevo esa costumbre a problemas de datos e IA de cualquier dominio: salud, movilidad, retail o educaci\u00f3n.",
    "about.bio2": "Trabajo en todo el pipeline: ingesta y procesamiento distribuido con Spark, machine learning cl\u00e1sico, deep learning sobre se\u00f1ales e im\u00e1genes, forecasting de series temporales y despliegue. En paralelo desarrollo aplicaciones de IA generativa: he trabajado en un agente LLM que responde preguntas sobre una base de datos a trav\u00e9s de MCP, con un modelo local en Ollama, y estoy ampliando ese trabajo hacia RAG y flujos multi-agente con LangChain y LangGraph.",
    "about.bio3": "Sea cual sea la t\u00e9cnica, la pregunta es la misma: \u00bfqu\u00e9 va a hacer alguien con esta salida? Por eso elijo la m\u00e9trica seg\u00fan la decisi\u00f3n que alimenta, comparo contra baselines honestos y dejo las limitaciones de cada resultado junto a la cifra. Y me importa tanto explicar un modelo a quien lo va a usar como construirlo.",
    "about.value1.title": "Vers\u00e1til por dise\u00f1o",
    "about.value1.description": "Tablas, se\u00f1ales, im\u00e1genes, series temporales o texto: elijo la herramienta por el problema, no el problema por la herramienta.",
    "about.value2.title": "IA generativa con ingenier\u00eda",
    "about.value2.description": "Los LLMs son potentes e impredecibles, as\u00ed que las garant\u00edas viven en el c\u00f3digo: validadores, m\u00ednimo privilegio y modelos locales cuando los datos no deben salir de la m\u00e1quina.",
    "about.value3.title": "Aprender construyendo",
    "about.value3.description": "El campo avanza r\u00e1pido. Me mantengo al d\u00eda con cursos y papers, pero solo cuenta cuando funciona. Lo m\u00e1s reciente: MCP y agentes con LangChain y LangGraph.",
    
    // Contact
    "contact.subtitle": "Conectemos",
    "contact.title": "Contacto",
    "contact.description": "¿Tienes un proyecto en mente o quieres discutir oportunidades? Me encantaría saber de ti.",
    "contact.name": "Nombre",
    "contact.namePlaceholder": "Tu nombre",
    "contact.email": "Email",
    "contact.emailPlaceholder": "tu.email@ejemplo.com",
    "contact.message": "Mensaje",
    "contact.messagePlaceholder": "Cuéntame sobre tu proyecto u oportunidad...",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.otherWays": "Otras Formas de Conectar",
    "contact.responseTime": "No dudes en contactarme por cualquiera de estos canales. Normalmente respondo en 24-48 horas.",
    "contact.connectWithMe": "Conecta conmigo",
    "contact.viewRepos": "Ver mis repositorios",
    "contact.fillAll": "Por favor, rellena todos los campos",
    "contact.sent": "¡Mensaje enviado!",
    "contact.sentDesc": "Gracias por contactarme. Te responderé pronto.",
    
    // Footer
    "footer.rights": "Todos los derechos reservados.",
    
    // Language selector
    "language.select": "Idioma",
    // --- Rediseño 2026-08: claves nuevas --------------------------------
    "nav.primary": "Navegación principal",
    "nav.skip": "Saltar al contenido",
    "nav.open": "Abrir menú",
    "nav.close": "Cerrar menú",
    "theme.toDark": "Cambiar a tema oscuro",
    "theme.toLight": "Cambiar a tema claro",

    "hero.terminal": "Terminal",
    "hero.proof.label": "Tres resultados, y dónde comprobarlos",
    "hero.proof.cta": "Ver el caso",

    "projects.filter.label": "Filtrar proyectos por área",
    "projects.filter.all": "Todos",
    "projects.showing": "{n} proyectos",

    "project.repository": "Repositorio",
    "project.liveDemo": "Demo en vivo",
    "project.privateCode": "Código privado",
    "project.contents": "Contenido",
    "project.stack": "Stack",
    "project.next": "Siguiente proyecto",

    "about.principles": "Cómo trabajo",
    "certifications.view": "Ver credencial",

    "contact.error.name": "Dime tu nombre para saber quién escribe.",
    "contact.error.emailRequired": "Necesito un email al que responderte.",
    "contact.error.emailFormat": "Esa dirección no parece correcta, revisa si hay alguna errata.",
    "contact.error.message": "Escribe un mensaje, aunque sea corto.",
    "contact.error.sendTitle": "El mensaje no ha salido",
    "contact.error.sendBody": "Algo ha fallado por el camino. Vuelve a intentarlo o escríbeme directamente a lunapereztroncoso@gmail.com.",
    // --- Formación + copy actualizado de habilidades y herramientas -----
    "education.title": "Formación",
    "certifications.listTitle": "{n} certificaciones",
    "certifications.credentialId": "ID de credencial",
    "nav.backToTop": "Volver arriba",
    "hero.featured": "Caso principal",
    "hero.featured.subtitle": "124.000 latidos, un pipeline Spark y una CNN 1-D residual",
    "about.card.eyebrow": "Disponible",
    "about.card.title": "Data Scientist & AI Engineer",
    "about.card.body": "Madrid. Data science, machine learning e IA generativa, de los datos al despliegue.",
    "about.card.cta": "Hablemos",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("portfolio-language");
    return (saved as Language) || "es";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
