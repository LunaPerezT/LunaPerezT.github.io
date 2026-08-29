import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { socialLinks } from "@/data/portfolio-data";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { href: socialLinks.github, label: "GitHub", Icon: Github },
    { href: socialLinks.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: `mailto:${socialLinks.email}`, label: "Email", Icon: Mail },
  ];

  return (
    <footer className="rule-top section-band px-5 py-10 sm:px-8">
      <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-display text-base font-semibold">
            Luna Pérez Troncoso<span className="text-highlight">.</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            © {year} · {t("footer.rights")}
          </p>
        </div>

        <ul className="flex items-center gap-1">
          {links.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
