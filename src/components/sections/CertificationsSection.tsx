import { useCertifications } from "../../context/CertificationsContext";

export default function CertificationsSection() {
  const { certifications } = useCertifications();

  return (
    <section
      id="certifications"
      className="relative mx-auto max-w-[1500px] overflow-hidden px-5 pb-28 pt-20 md:px-10 md:pb-40 md:pt-28"
    >
      <div className="section-index">DISTINCTIONS / CERTIFICATIONS</div>

      <header className="mt-10 max-w-3xl">
        <p className="eyebrow">APPRENDRE, PROGRESSER, VALIDER</p>
        <h2 className="section-title mt-4">
          CERTIFICATIONS<span className="text-acid">.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
          Certifications et badges obtenus au fil de mon parcours.
        </p>
      </header>

      {certifications.length === 0 ? (
        <p className="mt-12 border-t border-white/10 pt-6 text-sm text-white/40">
          Les certifications et badges obtenus seront affichés ici.
        </p>
      ) : (
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification) => (
            <article
              key={certification.id}
              className="flex h-full flex-col border border-white/10 bg-white/[0.025] p-6 transition hover:border-acid/40 hover:bg-white/[0.04] md:p-7"
            >
              <div className="mb-6 flex items-center justify-between gap-3">
                <span className="border border-acid/30 px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-acid">
                  {certification.type === "badge" ? "BADGE" : "CERTIFICATION"}
                </span>
                {certification.date && (
                  <span className="text-xs tracking-[0.12em] text-white/40">
                    {certification.date}
                  </span>
                )}
              </div>

              <h3 className="font-display text-2xl font-semibold uppercase leading-tight tracking-wide">
                {certification.title}
              </h3>
              {certification.issuer && (
                <p className="mt-2 text-sm font-semibold text-white/60">
                  {certification.issuer}
                </p>
              )}
              {certification.description && (
                <p className="mt-4 flex-1 text-sm leading-7 text-white/45">
                  {certification.description}
                </p>
              )}
              {certification.credentialUrl && (
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 border-b border-acid/40 pb-1 text-xs font-bold tracking-[0.14em] text-acid transition hover:border-acid hover:text-white"
                >
                  VOIR LE JUSTIFICATIF
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
