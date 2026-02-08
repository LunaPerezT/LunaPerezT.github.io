import { motion } from "framer-motion";
import { skills } from "@/data/portfolio-data";
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export function SkillsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="skills" className="section-container section-divider">
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
            {t("skills.subtitle")}
          </p>
          <h2 className="text-foreground mb-4">{t("skills.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("skills.description")}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {Object.entries(skills).map(([key, category]) => (
            <motion.div 
              key={key}
              variants={cardVariants}
              className="group"
            >
              <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                <motion.span 
                  className="w-2 h-2 rounded-full bg-primary"
                  whileHover={{ scale: 1.5 }}
                />
                {category[language]}
              </h3>
              <motion.div 
                className="flex flex-wrap gap-2"
                variants={containerVariants}
              >
                {category.items.map((skill, index) => (
                  <motion.span 
                    key={skill} 
                    className="skill-tag cursor-default"
                    variants={tagVariants}
                    whileHover={{ 
                      scale: 1.08, 
                      backgroundColor: "hsl(var(--primary) / 0.2)",
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 17,
                      delay: index * 0.02,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
