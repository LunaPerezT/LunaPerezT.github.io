import { Footer } from "./Footer";
import { Header } from "./Header";
import { BackToTop } from "./BackToTop";
import { useLanguage } from "@/contexts/LanguageContext";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        {t("nav.skip")}
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
