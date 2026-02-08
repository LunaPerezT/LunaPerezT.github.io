import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ToolsSection } from "@/components/ToolsSection";
import { CertificationsSection } from "@/components/CertificationsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

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
};

export default Index;
