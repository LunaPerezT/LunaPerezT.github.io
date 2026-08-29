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
    "hero.summary": "Data Scientist and AI Engineer working across the full pipeline, from ingestion to deployment. Most of my work sits in medical and health AI, with a recurring interest in what a model\u2019s output should actually be used for, and in evaluation that survives scrutiny.",
    "hero.viewProjects": "View Projects",
    "hero.contact": "Contact",
    "hero.stat.projects": "Featured Projects",
    "hero.stat.certifications": "Certifications",
    "hero.stat.focus": "ML & AI Focus",
    "hero.stat.tools": "Tools & Tech",
    
    // Projects
    "projects.subtitle": "Featured Work",
    "projects.title": "Projects",
    "projects.description": "Nine projects, ordered by what each one proves rather than by date. Every card carries its headline number, the split it was measured on, and the limitation that comes with it.",
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
    "skills.description": "Nine groups, drawn from what the projects on this page actually required, from cost-derived decision rules to Spark pipelines and clinical terminology.",
    
    // Tools
    "tools.subtitle": "Tech Stack",
    "tools.title": "Languages & Tools",
    "tools.description": "Everything advertised on my GitHub profile, grouped the same way. Depth varies: some of these carry whole projects on this page, others are familiar tools I have used less.",
    
    // Certifications
    "certifications.subtitle": "Training & credentials",
    "certifications.title": "Education & Certifications",
    "certifications.description": "Where the training came from, and the certifications behind it, from a data science bootcamp to Azure data engineering and clinical terminology standards.",
    
    // About
    "about.subtitle": "Get to Know Me",
    "about.title": "About Me",
    "about.bio1": "I'm a Data Scientist with a strong foundation in Artificial Intelligence, data analytics, and computational modeling, originally shaped through my background in science and research. Over time, I've transitioned my analytical and experimental mindset into the tech field, where I design data-driven solutions that transform complex information into actionable insights.",
    "about.bio2": "I have experience working across the full data pipeline, from data acquisition, cleaning, and exploration to building, validating, and deploying predictive models. My focus is on leveraging machine learning and statistical methods to uncover patterns, optimize processes, and support strategic decisions.",
    "about.bio3": "What defines my approach is a balance between technical precision and creativity. I'm passionate about connecting raw data with real-world impact, collaborating with cross-functional teams, and communicating insights in a way that drives innovation.",
    "about.value1.title": "Impact-Driven",
    "about.value1.description": "I focus on solving real problems with measurable outcomes, not just building technology for its own sake.",
    "about.value2.title": "Continuous Learner",
    "about.value2.description": "The field evolves rapidly. I stay current through research papers, courses, and hands-on experimentation.",
    "about.value3.title": "Full-Stack ML Mindset",
    "about.value3.description": "From data engineering to model deployment, I understand the entire ML lifecycle and build end-to-end solutions.",
    
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
    "project.limitations": "Limitations and caveats",
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
    "about.card.body": "Madrid. Medical and health AI, from data to deployment.",
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
    "hero.summary": "Data Scientist y AI Engineer que trabaja en todo el pipeline, desde la ingesta hasta el despliegue. La mayor parte de mi trabajo est\u00e1 en IA m\u00e9dica y de salud, con un inter\u00e9s recurrente en para qu\u00e9 deber\u00eda usarse de verdad la salida de un modelo, y en evaluaciones que aguantan el escrutinio.",
    "hero.viewProjects": "Ver Proyectos",
    "hero.contact": "Contacto",
    "hero.stat.projects": "Proyectos Destacados",
    "hero.stat.certifications": "Certificaciones",
    "hero.stat.focus": "Enfoque ML & IA",
    "hero.stat.tools": "Herramientas",
    
    // Projects
    "projects.subtitle": "Trabajo Destacado",
    "projects.title": "Proyectos",
    "projects.description": "Nueve proyectos, ordenados por lo que demuestra cada uno y no por fecha. Cada tarjeta lleva su cifra principal, el split sobre el que se midi\u00f3 y la limitaci\u00f3n que arrastra.",
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
    "skills.description": "Nueve bloques, sacados de lo que han exigido de verdad los proyectos de esta página, desde reglas de decisión por coste hasta pipelines de Spark y terminología cl\u00ednica.",
    
    // Tools
    "tools.subtitle": "Stack Tecnológico",
    "tools.title": "Lenguajes & Herramientas",
    "tools.description": "Todo lo que aparece en mi perfil de GitHub, agrupado igual. La profundidad var\u00eda: algunas sostienen proyectos enteros de esta p\u00e1gina y otras son herramientas conocidas que he usado menos.",
    
    // Certifications
    "certifications.subtitle": "Formación y credenciales",
    "certifications.title": "Formación y Certificaciones",
    "certifications.description": "De dónde viene la formación y qué certificaciones la respaldan, desde un bootcamp de data science hasta ingeniería de datos en Azure y estándares de terminología clínica.",
    
    // About
    "about.subtitle": "Conóceme",
    "about.title": "Sobre Mí",
    "about.bio1": "Soy una Data Scientist con una sólida formación en Inteligencia Artificial, análisis de datos y modelado computacional, formada originalmente en ciencia e investigación. Con el tiempo, he trasladado mi mentalidad analítica y experimental al campo tecnológico, donde diseño soluciones basadas en datos que transforman información compleja en insights accionables.",
    "about.bio2": "Tengo experiencia trabajando en todo el pipeline de datos, desde la adquisición, limpieza y exploración de datos hasta la construcción, validación y despliegue de modelos predictivos. Mi enfoque está en aprovechar métodos de machine learning y estadísticos para descubrir patrones, optimizar procesos y apoyar decisiones estratégicas.",
    "about.bio3": "Lo que define mi enfoque es un equilibrio entre precisión técnica y creatividad. Me apasiona conectar datos en bruto con impacto en el mundo real, colaborar con equipos multidisciplinarios y comunicar insights de manera que impulsen la innovación.",
    "about.value1.title": "Orientada al Impacto",
    "about.value1.description": "Me enfoco en resolver problemas reales con resultados medibles, no solo en construir tecnología por sí misma.",
    "about.value2.title": "Aprendizaje Continuo",
    "about.value2.description": "El campo evoluciona rápidamente. Me mantengo actualizada a través de papers, cursos y experimentación práctica.",
    "about.value3.title": "Mentalidad Full-Stack ML",
    "about.value3.description": "Desde ingeniería de datos hasta despliegue de modelos, entiendo todo el ciclo de vida de ML y construyo soluciones end-to-end.",
    
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
    "project.limitations": "Limitaciones y caveats",
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
    "about.card.body": "Madrid. IA médica y de salud, de los datos al despliegue.",
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
