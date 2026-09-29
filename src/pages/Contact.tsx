import { useState } from "react";
import { useForm } from "react-hook-form";
import { Arrow } from "../components/Icons";
import { siteConfig } from "../data/site";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
  /** Champ piège (honeypot) : invisible pour un humain, rempli par les robots. */
  website: string;
};

type Status = "idle" | "sent" | "mailto" | "error";

/**
 * Si VITE_CONTACT_ENDPOINT est défini (ex. https://formspree.io/f/xxxx),
 * le message est envoyé en POST JSON. Sinon on ouvre le client mail de l'utilisateur.
 */
const endpoint = String(import.meta.env.VITE_CONTACT_ENDPOINT ?? "").trim();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onTouched",
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");

    // Robot détecté : on fait comme si tout allait bien, sans rien envoyer
    if (values.website) {
      setStatus("sent");
      reset();
      return;
    }

    if (!endpoint) {
      const subject = encodeURIComponent(`Portfolio — message de ${values.name}`);
      const body = encodeURIComponent(
        `${values.message}\n\n— ${values.name} (${values.email})`,
      );
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      reset();
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto max-w-[1500px] px-5 pb-28 pt-36 md:px-10 md:pb-40 md:pt-48">
      <div className="section-index">04 / TRANSMISSION</div>

      <div className="mt-12 grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="eyebrow">PROCHAINE MISSION</p>
          <h1 className="section-title mt-5">
            PARLONS
            <br />
            PROJET.
          </h1>
          <p className="mt-8 max-w-md text-base leading-8 text-white/55">
            Une idée, un stage, une collaboration ? Décris-moi ce que tu as en
            tête, je te réponds rapidement.
          </p>

          <dl className="mt-12 space-y-6">
            <div>
              <dt className="data-label">E-MAIL</dt>
              <dd className="mt-2 text-sm">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="border-b border-acid pb-1 transition-colors hover:text-acid"
                >
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="data-label">BASE</dt>
              <dd className="mt-2 text-sm">{siteConfig.city}</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="relative space-y-7 border border-white/10 p-6 md:p-10"
        >
          <div>
            <label htmlFor="name" className="field-label">
              NOM
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Ton nom"
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="field-input"
              {...register("name", {
                required: "Indique ton nom.",
                minLength: { value: 2, message: "Ton nom doit faire au moins 2 caractères." },
                maxLength: { value: 80, message: "Ton nom est trop long (80 caractères max)." },
              })}
            />
            {errors.name && (
              <p id="name-error" role="alert" className="field-error">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="field-label">
              E-MAIL
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="toi@exemple.com"
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="field-input"
              {...register("email", {
                required: "Indique ton adresse e-mail.",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Cette adresse e-mail ne semble pas valide.",
                },
              })}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="field-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="field-label">
              MESSAGE
            </label>
            <textarea
              id="message"
              rows={7}
              placeholder="Parle-moi de ton projet…"
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="field-input resize-none"
              {...register("message", {
                required: "Écris ton message.",
                minLength: { value: 10, message: "Ton message doit faire au moins 10 caractères." },
                maxLength: { value: 1000, message: "Ton message est trop long (1000 caractères max)." },
              })}
            />
            {errors.message && (
              <p id="message-error" role="alert" className="field-error">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Honeypot : hors écran, ignoré par le clavier et les lecteurs d'écran */}
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="website">Ne pas remplir ce champ</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cut-button inline-flex items-center gap-6 px-8 py-4"
            >
              {isSubmitting ? "ENVOI EN COURS…" : "ENVOYER LE MESSAGE"} <Arrow />
            </button>

            <div role="status" aria-live="polite" className="text-sm">
              {status === "sent" && (
                <p className="text-acid">
                  Message envoyé. Je te réponds très vite.
                </p>
              )}
              {status === "mailto" && (
                <p className="text-acid">
                  Ton application mail va s&apos;ouvrir avec le message prêt à
                  partir : il ne reste qu&apos;à l&apos;envoyer.
                </p>
              )}
              {status === "error" && (
                <p className="text-[#ff8a70]">
                  L&apos;envoi a échoué. Réessaie, ou écris-moi directement à{" "}
                  {siteConfig.email}.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
