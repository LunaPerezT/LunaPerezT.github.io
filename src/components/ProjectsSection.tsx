import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { projects } from "@/data/portfolio-data";
import { useLanguage } from "@/contexts/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function ProjectsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="projects" className="section-container section-divider">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            {t("projects.subtitle")}
          </p>
          <h2 className="text-foreground mb-4">{t("projects.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("projects.description")}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="project-card group flex flex-col"
            >
              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title[language]}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
                {project.shortDescription[language]}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span 
                    key={tech} 
                    className="skill-tag text-xs py-1 px-2"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="skill-tag text-xs py-1 px-2">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Button variant="project" size="sm" asChild className="flex-1">
                  <Link to={`/project/${project.id}`}>
                    {t("projects.viewDetails")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="project-outline" size="icon" asChild>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
                {project.demoUrl && (
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="project-outline" size="icon" asChild>
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
