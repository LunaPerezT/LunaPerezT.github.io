import { Send } from "lucide-react";
import { useId, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { GradientButton } from "./uiverse/GradientButton";
import { IsoSocialLinks } from "./uiverse/IsoSocialLinks";
import { cn } from "@/lib/utils";

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const fieldId = useId();

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = t("contact.error.name");
    if (!values.email.trim()) next.email = t("contact.error.emailRequired");
    else if (!EMAIL_PATTERN.test(values.email.trim()))
      next.email = t("contact.error.emailFormat");
    if (!values.message.trim()) next.message = t("contact.error.message");
    return next;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first field that needs attention.
      const first = (["name", "email", "message"] as FieldName[]).find((f) => found[f]);
      document.getElementById(`${fieldId}-${first}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        },
      });
      if (error) throw error;

      toast({ title: t("contact.sent"), description: t("contact.sentDesc") });
      setValues({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: t("contact.error.sendTitle"),
        description: t("contact.error.sendBody"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const fieldClass = (field: FieldName) =>
    cn("w-full", errors[field] && "border-destructive focus-visible:ring-destructive");

  return (
    <section id="contact" className="section-shell rule-top scroll-mt-24">
      <div className="container">
        <SectionHeading
          eyebrow={t("contact.subtitle")}
          title={t("contact.title")}
          description={t("contact.description")}
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <Reveal className="min-w-0">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor={`${fieldId}-name`}
                  className="mb-2 block text-sm font-medium"
                >
                  {t("contact.name")}
                </label>
                <Input
                  id={`${fieldId}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t("contact.namePlaceholder")}
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${fieldId}-name-error` : undefined}
                  className={fieldClass("name")}
                  maxLength={100}
                />
                {errors.name && (
                  <p id={`${fieldId}-name-error`} className="mt-1.5 text-xs text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${fieldId}-email`}
                  className="mb-2 block text-sm font-medium"
                >
                  {t("contact.email")}
                </label>
                <Input
                  id={`${fieldId}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("contact.emailPlaceholder")}
                  value={values.email}
                  onChange={(event) => update("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${fieldId}-email-error` : undefined}
                  className={fieldClass("email")}
                  maxLength={255}
                />
                {errors.email && (
                  <p id={`${fieldId}-email-error`} className="mt-1.5 text-xs text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${fieldId}-message`}
                  className="mb-2 block text-sm font-medium"
                >
                  {t("contact.message")}
                </label>
                <Textarea
                  id={`${fieldId}-message`}
                  name="message"
                  placeholder={t("contact.messagePlaceholder")}
                  value={values.message}
                  onChange={(event) => update("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? `${fieldId}-message-error` : `${fieldId}-message-hint`
                  }
                  className={cn(fieldClass("message"), "min-h-[150px] resize-y")}
                  maxLength={1000}
                />
                {errors.message ? (
                  <p
                    id={`${fieldId}-message-error`}
                    className="mt-1.5 text-xs text-destructive"
                  >
                    {errors.message}
                  </p>
                ) : (
                  <p
                    id={`${fieldId}-message-hint`}
                    className="mt-1.5 font-mono text-xs tabular-nums text-muted-foreground"
                  >
                    {values.message.length}/1000
                  </p>
                )}
              </div>

              <GradientButton
                type="submit"
                disabled={isSubmitting}
                className="w-full disabled:cursor-not-allowed disabled:opacity-70"
                panelClassName="w-full"
              >
                {isSubmitting ? (
                  t("contact.sending")
                ) : (
                  <>
                    {t("contact.send")}
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </GradientButton>
            </form>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <p className="eyebrow">{t("contact.otherWays")}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("contact.responseTime")}
            </p>

            <div className="mt-8">
              <IsoSocialLinks />
            </div>

          </Reveal>
        </div>
      </div>
    </section>
  );
}
