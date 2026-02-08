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
    "nav.about": "About",
    "nav.contact": "Contact",
    "header.portfolio": "Luna Pérez Troncoso",
    
    // Hero
    "hero.welcome": "Welcome to my portfolio",
    "hero.title1": "Data Scientist &",
    "hero.title2": "AI Engineer",
    "hero.summary": "I'm a Data Scientist with a strong foundation in Artificial Intelligence, data analytics, and computational modeling. I design data-driven solutions that transform complex information into actionable insights.",
    "hero.viewProjects": "View Projects",
    "hero.contact": "Contact",
    "hero.stat.projects": "Featured Projects",
    "hero.stat.certifications": "Certifications",
    "hero.stat.focus": "ML & AI Focus",
    "hero.stat.tools": "Tools & Tech",
    
    // Projects
    "projects.subtitle": "Featured Work",
    "projects.title": "Projects",
    "projects.description": "A curated selection of my work in Data Science, ranging from Deep Learning and MLOps to Agentic AI and Data Engineering.",
    "projects.viewDetails": "View Details",
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
    "skills.description": "A comprehensive toolkit built through hands-on experience in data science, machine learning, and software engineering.",
    
    // Tools
    "tools.subtitle": "Tech Stack",
    "tools.title": "Languages & Tools",
    "tools.description": "The technologies and frameworks I use daily to build data-driven solutions and machine learning systems.",
    
    // Certifications
    "certifications.subtitle": "Professional Credentials",
    "certifications.title": "Certifications",
    "certifications.description": "Industry-recognized certifications validating expertise in data science and machine learning technologies.",
    
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
  },
  es: {
    // Header
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.skills": "Habilidades",
    "nav.tools": "Stack Tecnológico",
    "nav.about": "Sobre mí",
    "nav.contact": "Contacto",
    "header.portfolio": "Luna Pérez Troncoso",
    
    // Hero
    "hero.welcome": "Bienvenido/a a mi portfolio",
    "hero.title1": "Data Scientist &",
    "hero.title2": "AI Engineer",
    "hero.summary": "Soy una Data Scientist con una sólida formación en Inteligencia Artificial, análisis de datos y modelado computacional. Diseño soluciones basadas en datos que transforman información compleja en insights accionables.",
    "hero.viewProjects": "Ver Proyectos",
    "hero.contact": "Contacto",
    "hero.stat.projects": "Proyectos Destacados",
    "hero.stat.certifications": "Certificaciones",
    "hero.stat.focus": "Enfoque ML & IA",
    "hero.stat.tools": "Herramientas",
    
    // Projects
    "projects.subtitle": "Trabajo Destacado",
    "projects.title": "Proyectos",
    "projects.description": "Una selección de mi trabajo en Data Science, desde Deep Learning y MLOps hasta IA Agéntica e Ingeniería de Datos.",
    "projects.viewDetails": "Ver Detalles",
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
    "skills.description": "Un conjunto de herramientas construido a través de experiencia práctica en data science, machine learning e ingeniería de software.",
    
    // Tools
    "tools.subtitle": "Stack Tecnológico",
    "tools.title": "Lenguajes & Herramientas",
    "tools.description": "Las tecnologías y frameworks que utilizo a diario para construir soluciones basadas en datos y sistemas de machine learning.",
    
    // Certifications
    "certifications.subtitle": "Credenciales Profesionales",
    "certifications.title": "Certificaciones",
    "certifications.description": "Certificaciones reconocidas en la industria que validan mi experiencia en data science y tecnologías de machine learning.",
    
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
