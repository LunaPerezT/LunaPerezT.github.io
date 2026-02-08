import { BookOpen, Lightbulb, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function AboutSection() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Target,
      title: t("about.value1.title"),
      description: t("about.value1.description"),
    },
    {
      icon: BookOpen,
      title: t("about.value2.title"),
      description: t("about.value2.description"),
    },
    {
      icon: Lightbulb,
      title: t("about.value3.title"),
      description: t("about.value3.description"),
    },
  ];

  return (
    <section id="about" className="section-container section-divider">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            {t("about.subtitle")}
          </p>
          <h2 className="text-foreground mb-4">{t("about.title")}</h2>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed">
              {t("about.bio1")}
            </motion.p>
            <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed">
              {t("about.bio2")}
            </motion.p>
            <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed">
              {t("about.bio3")}
            </motion.p>
          </motion.div>

          {/* Values/Interests */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {values.map((item) => (
              <motion.div 
                key={item.title} 
                className="flex gap-4 group"
                variants={itemVariants}
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <item.icon className="h-5 w-5 text-accent-foreground group-hover:text-primary transition-colors" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
