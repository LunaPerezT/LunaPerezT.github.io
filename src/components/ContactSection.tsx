import { Github, Linkedin, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { socialLinks } from "@/data/portfolio-data";
import { supabase } from "@/integrations/supabase/client";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: t("contact.fillAll"),
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: t("contact.sent"),
        description: t("contact.sentDesc"),
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error al enviar",
        description: "No se pudo enviar el mensaje. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks_items = [
    {
      icon: Mail,
      label: "Email",
      value: socialLinks.email,
      href: `mailto:${socialLinks.email}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: t("contact.connectWithMe"),
      href: socialLinks.linkedin,
      external: true,
    },
    {
      icon: Github,
      label: "GitHub",
      value: t("contact.viewRepos"),
      href: socialLinks.github,
      external: true,
    },
  ];

  return (
    <section id="contact" className="section-container section-divider">
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
            {t("contact.subtitle")}
          </p>
          <h2 className="text-foreground mb-4">{t("contact.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                {t("contact.name")}
              </label>
              <Input
                id="name"
                type="text"
                placeholder={t("contact.namePlaceholder")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full transition-all duration-200 focus:scale-[1.01]"
                maxLength={100}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                {t("contact.email")}
              </label>
              <Input
                id="email"
                type="email"
                placeholder={t("contact.emailPlaceholder")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full transition-all duration-200 focus:scale-[1.01]"
                maxLength={255}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                {t("contact.message")}
              </label>
              <Textarea
                id="message"
                placeholder={t("contact.messagePlaceholder")}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full min-h-[150px] resize-none transition-all duration-200 focus:scale-[1.01]"
                maxLength={1000}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    t("contact.sending")
                  ) : (
                    <>
                      {t("contact.send")}
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </motion.form>

          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {t("contact.otherWays")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("contact.responseTime")}
              </p>
            </motion.div>

            <div className="space-y-4">
              {socialLinks_items.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  variants={itemVariants}
                  whileHover={{ x: 8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors group"
                >
                  <motion.div 
                    className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <item.icon className="h-5 w-5 text-accent-foreground group-hover:text-primary transition-colors" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
