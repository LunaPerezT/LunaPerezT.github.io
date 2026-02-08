import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { projects } from "@/data/portfolio-data";
import { projectImages } from "@/data/project-images";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const images = id ? projectImages[id] ?? [] : [];

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-8 py-8 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("projects.backToProjects")}
        </Link>

        {/* Project Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {project.title[language]}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {project.shortDescription[language]}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <span key={tech} className="skill-tag">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button variant="hero" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            {project.demoUrl && (
              <Button variant="hero-outline" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Project Images Gallery */}
        {images.length > 0 && (
          <div className="mb-10 animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-border shadow-sm bg-card"
                >
                  <img
                    src={img}
                    alt={`${project.title[language]} - ${i + 1}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

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
            <TabsContent value="overview" className="animate-fade-in">
              <div className="space-y-8">
                <ContentBlock title={t("project.context")} content={project.overview.context[language]} />
                <ContentBlock title={t("project.problem")} content={project.overview.problem[language]} />
                <ContentBlock title={t("project.objective")} content={project.overview.objective[language]} />
              </div>
            </TabsContent>

            {/* Data / Architecture Tab */}
            <TabsContent value="data" className="animate-fade-in">
              <div className="space-y-8">
                <ContentBlock title={t("project.dataSources")} content={project.dataArchitecture.dataSources[language]} />
                <ContentBlock title={t("project.pipeline")} content={project.dataArchitecture.pipeline[language]} />
                {project.dataArchitecture.diagrams && (
                  <ContentBlock title={t("project.architecture")} content={project.dataArchitecture.diagrams[language]} />
                )}
              </div>
            </TabsContent>

            {/* Modeling Tab */}
            <TabsContent value="modeling" className="animate-fade-in">
              <div className="space-y-8">
                <ContentBlock title={t("project.algorithms")} content={project.modeling.algorithms[language]} />
                <ContentBlock title={t("project.decisions")} content={project.modeling.decisions[language]} />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {t("project.libraries")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.modeling.libraries.map((lib) => (
                      <span key={lib} className="skill-tag">
                        {lib}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="animate-fade-in">
              <div className="space-y-8">
                <ContentBlock title={t("project.metrics")} content={project.results.metrics[language]} />
                <ContentBlock title={t("project.outcomes")} content={project.results.outcomes[language]} />
                {project.results.visualizations && (
                  <ContentBlock title={t("project.visualizations")} content={project.results.visualizations[language]} />
                )}
              </div>
            </TabsContent>

            {/* Learnings Tab */}
            <TabsContent value="learnings" className="animate-fade-in">
              <div className="space-y-8">
                <ContentBlock title={t("project.challenges")} content={project.learnings.challenges[language]} />
                <ContentBlock title={t("project.learned")} content={project.learnings.learned[language]} />
                <ContentBlock title={t("project.improvements")} content={project.learnings.improvements[language]} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-3">
          <Button variant="hero" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
          {project.demoUrl && (
            <Button variant="hero-outline" asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}

function ContentBlock({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
}
