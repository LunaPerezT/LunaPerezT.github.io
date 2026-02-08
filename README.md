# My Web Portfolio

A modern, multilingual portfolio website showcasing data science and machine learning projects with interactive visualizations and responsive design.

## 🌟 Features

- **Multilingual Support**: English and Spanish language switching [1](#0-0) 
- **Project Showcase**: Detailed project pages with tabbed content (Overview, Data Architecture, Modeling, Results, Learnings) [2](#0-1) 
- **Responsive Design**: Mobile-first design with smooth animations
- **Interactive Components**: Dynamic project galleries, tech stack tags, and social links
- **Contact Form**: Integrated contact section for inquiries

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **Routing**: React Router for navigation
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Language, etc.)
├── data/              # Portfolio data and project information
├── pages/             # Page components
└── ui/                # Base UI components
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LunaPerezT/Web_Portfolio.git
cd Web_Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📊 Featured Projects

The portfolio showcases several data science and ML projects:

1. **Brain Tumor Detection & Segmentation** - End-to-end MLOps pipeline using ResNet-50 and ResUNet [3](#0-2) 
2. **Text-to-SQL Agent** - Conversational AI agent using MCP and Ollama [4](#0-3) 
3. **Mental Health Global Insights** - Interactive EDA with 30 years of global data [5](#0-4) 
4. **Parkinson's Disease Prediction** - ML model for early detection with feature importance analysis [6](#0-5) 

## 🌐 Pages

The application consists of the following main sections [7](#0-6) :

- Hero Section
- Projects Showcase
- Skills & Tools
- Certifications
- About
- Contact

## 📝 Project Data Structure

Each project follows a structured format including [8](#0-7) :
- Multilingual titles and descriptions
- Tech stack
- GitHub and demo URLs
- Detailed sections for overview, data architecture, modeling, results, and learnings

## 🔧 Customization

### Adding New Projects

1. Update `src/data/portfolio-data.ts` with your project details following the `Project` interface
2. Add project images to `src/data/project-images.ts`
3. The project will automatically appear in the portfolio

### Language Support

To add new languages:
1. Update `src/contexts/LanguageContext.tsx` with new translation keys
2. Add the language option to the language switcher

## 📬 Contact

- **Email**: lunapereztroncoso@gmail.com [9](#0-8) 
- **GitHub**: https://github.com/LunaPerezT
- **LinkedIn**: https://www.linkedin.com/in/luna-p%C3%A9rez-troncoso-0ab21929b/

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## Notes

This README is generated based on the portfolio's structure and data. The actual implementation includes additional features like animations, dark mode support, and more detailed component interactions that can be explored in the source code.

### Citations

**File:** src/contexts/LanguageContext.tsx (L73-93)
```typescript
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
    
```

**File:** src/pages/ProjectDetail.tsx (L91-112)
```typescript
        {/* Tabbed Content */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start flex-wrap h-auto gap-2 bg-transparent p-0 mb-8">
              {[
                { value: "overview", label: t("project.tab.overview") },
                { value: "data", label: t("project.tab.data") },
                { value: "modeling", label: t("project.tab.modeling") },
                { value: "results", label: t("project.tab.results") },
                { value: "learnings", label: t("project.tab.learnings") },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="tab-underline data-[state=active]:bg-accent data-[state=active]:text-accent-foreground rounded-lg px-4 py-2 text-sm font-medium transition-all"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Tab */}
```

**File:** src/data/portfolio-data.ts (L1-40)
```typescript
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
```

**File:** src/data/portfolio-data.ts (L44-54)
```typescript
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
```

**File:** src/data/portfolio-data.ts (L124-134)
```typescript
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
```

**File:** src/data/portfolio-data.ts (L204-214)
```typescript
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
```

**File:** src/data/portfolio-data.ts (L285-295)
```typescript
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
```

**File:** src/data/portfolio-data.ts (L672-677)
```typescript
// Social links
export const socialLinks = {
  github: "https://github.com/LunaPerezT",
  linkedin: "https://www.linkedin.com/in/luna-p%C3%A9rez-troncoso-0ab21929b/",
  email: "lunapereztroncoso@gmail.com",
};
```

**File:** src/pages/Index.tsx (L10-21)
```typescript
const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ToolsSection />
      <CertificationsSection />
      <AboutSection />
      <ContactSection />
    </Layout>
  );
```

