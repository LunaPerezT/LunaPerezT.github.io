import { ArrowRight, Github, Mail, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { socialLinks } from "@/data/portfolio-data";
import { AnimatedText } from "./AnimatedText";
import { AnimatedCounter } from "./AnimatedCounter";
import { FloatingParticles } from "./FloatingParticles";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function HeroSection() {
  const { language, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const roles = language === "es" 
    ? ["Data Scientist", "AI Engineer", "Data Analyst"]
    : ["Data Scientist", "AI Engineer", "Data Analyst"];

  return (
    <section className="section-container relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <FloatingParticles />
        <motion.div 
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <motion.div 
        className="container mx-auto max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.div variants={itemVariants}>
          <p className="text-sm md:text-base font-medium text-primary mb-4 tracking-wide uppercase">
            {t("hero.welcome")}
          </p>
          <h1 className="text-foreground mb-2">
            Luna Pérez Troncoso
          </h1>
          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold h-[1.4em]">
            <AnimatedText 
              texts={roles} 
              className="gradient-text"
            />
          </div>
        </motion.div>

        {/* Professional Summary */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 mt-8 leading-relaxed"
        >
          {t("hero.summary")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => scrollToSection("projects")}
              className="group"
            >
              {t("hero.viewProjects")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="hero-outline" 
              size="lg" 
              asChild
            >
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="hero-outline" 
              size="lg" 
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="h-4 w-4" />
              {t("hero.contact")}
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: 5, suffix: "", label: t("hero.stat.projects") },
            { value: 17, suffix: "+", label: t("hero.stat.certifications") },
            { value: 100, suffix: "%", label: t("hero.stat.focus") },
            { value: 45, suffix: "+", label: t("hero.stat.tools") },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <button 
            onClick={() => scrollToSection("projects")}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to projects"
          >
            <ChevronDown className="h-8 w-8" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
