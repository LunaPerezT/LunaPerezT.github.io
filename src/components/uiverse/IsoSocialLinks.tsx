import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/data/portfolio-data";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Adapted from "loud-shrimp-40" by jolprince_5263 on uiverse.io (MIT).
 * https://uiverse.io/jolprince_5263/loud-shrimp-40
 *
 * A horizontal row of round icons inside one glassy plate. On hover the icon
 * lifts up and to the right while three ghost rings stack behind it at
 * increasing offsets and opacities. Structure and the 0.3s timings are the
 * original's; the palette is the site's blue and orange instead of the
 * original's amber, and the plate uses the site's border and surface rather
 * than translucent white on an assumed dark page.
 *
 * One change to the label. The original slides it out to the right of the icon,
 * which works when the icons are the only thing on the row; in a row of three it
 * lands on top of the next icon. Here it sits under its own icon and fades in,
 * so nothing overlaps at any width.
 *
 * The <a> is the hover target, so the effect fires for keyboard focus too, which
 * the original (hovering a wrapper <li>) did not do.
 */
const CHANNELS = [
  {
    key: "github",
    Icon: Github,
    href: socialLinks.github,
    label: "GitHub",
    title: "GitHub",
    external: true,
  },
  {
    key: "linkedin",
    Icon: Linkedin,
    href: socialLinks.linkedin,
    label: "LinkedIn",
    title: "LinkedIn",
    external: true,
  },
  {
    key: "email",
    Icon: Mail,
    href: `mailto:${socialLinks.email}`,
    label: "Email",
    title: socialLinks.email,
    external: false,
  },
] as const;

export function IsoSocialLinks() {
  const { t } = useLanguage();

  return (
    <ul
      aria-label={t("contact.otherWays")}
      className="flex w-fit max-w-full flex-row flex-wrap items-start justify-start gap-x-8 gap-y-10 rounded-2xl border border-border bg-background-alt px-6 pb-12 pt-8 shadow-sm backdrop-blur-md"
    >
      {CHANNELS.map(({ key, Icon, href, label, title, external }) => (
        <li key={key} className="relative">
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={title}
            className="iso group/iso relative block h-[60px] w-[60px] focus-visible:outline-none"
          >
            {/* Ghost rings. Purely decorative, they carry no content. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-primary/30 opacity-0 transition-all duration-300 group-hover/iso:opacity-20 group-focus-visible/iso:opacity-20"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-primary/40 opacity-0 transition-all duration-300 group-hover/iso:translate-x-[5px] group-hover/iso:-translate-y-[5px] group-hover/iso:opacity-40 group-focus-visible/iso:translate-x-[5px] group-focus-visible/iso:-translate-y-[5px] group-focus-visible/iso:opacity-40"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-primary/50 opacity-0 transition-all duration-300 group-hover/iso:translate-x-[10px] group-hover/iso:-translate-y-[10px] group-hover/iso:opacity-60 group-focus-visible/iso:translate-x-[10px] group-focus-visible/iso:-translate-y-[10px] group-focus-visible/iso:opacity-60"
            />

            <span className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full border border-primary/20 bg-card text-primary shadow-[inset_0_2px_8px_hsl(var(--primary)/0.1),var(--shadow-sm)] transition-all duration-300 group-hover/iso:translate-x-[15px] group-hover/iso:-translate-y-[15px] group-hover/iso:text-highlight group-focus-visible/iso:translate-x-[15px] group-focus-visible/iso:-translate-y-[15px] group-focus-visible/iso:text-highlight group-focus-visible/iso:ring-2 group-focus-visible/iso:ring-ring group-focus-visible/iso:ring-offset-2 group-focus-visible/iso:ring-offset-background">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary-strong opacity-0 shadow-sm transition-all duration-300 group-hover/iso:-skew-x-[5deg] group-hover/iso:opacity-100 group-focus-visible/iso:opacity-100"
            >
              {label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
