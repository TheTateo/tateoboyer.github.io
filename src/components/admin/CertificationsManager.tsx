import { useState, type FormEvent } from "react";
import { useCertifications } from "../../context/CertificationsContext";
import { formatIndex } from "../../lib/utils";
import type { CertificationBadge, CertificationBadgeInput } from "../../types";

const emptyCertification: CertificationBadgeInput = {
  type: "certification",
  title: "",
  issuer: "",
  date: "",
  description: "",
  credentialUrl: "",
};

export default function CertificationsManager() {
  const {
    certifications,
    addCertification,
    updateCertification,
    deleteCertification,
    moveCertification,
  } = useCertifications();
  const [form, setForm] =
    useState<CertificationBadgeInput>(emptyCertification);
  const [editingId, setEditingId] = useState<string | null>(null);

  const resetForm = () => {
    setForm(emptyCertification);
    setEditingId(null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const certification = {
      ...form,
      title: form.title.trim(),
      issuer: form.issuer.trim(),
      date: form.date.trim(),
      description: form.description.trim(),
      credentialUrl: form.credentialUrl.trim(),
    };
    if (!certification.title) return;

    if (editingId) {
      updateCertification(editingId, certification);
    } else {
      addCertification(certification);
    }
    resetForm();
  };

  const startEdit = (certification: CertificationBadge) => {
    setForm({
      type: certification.type,
      title: certification.title,
      issuer: certification.issuer,
      date: certification.date,
      description: certification.description,
      credentialUrl: certification.credentialUrl,
    });
    setEditingId(certification.id);
  };

  const handleDelete = (certification: CertificationBadge) => {
    if (!window.confirm(`Supprimer « ${certification.title} » ?`)) return;
    deleteCertification(certification.id);
    if (editingId === certification.id) resetForm();
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
      <section>
        <p className="mb-2 text-xs tracking-[0.2em] text-white/40">
          {certifications.length} ÉLÉMENT
          {certifications.length > 1 ? "S" : ""}
        </p>
        <h2 className="mb-6 text-2xl font-bold">
          CERTIFICATIONS &amp; BADGES
        </h2>
        <p className="mb-6 text-sm text-white/40">
          L’ordre de cette liste est repris sur la page d’accueil.
        </p>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {certifications.map((certification, index) => (
            <div
              key={certification.id}
              className="flex flex-wrap items-center gap-4 py-5"
            >
              <span className="w-8 text-sm text-white/30">
                {formatIndex(index)}
              </span>
              <div className="min-w-0 flex-1 basis-40">
                <p className="text-[10px] font-bold tracking-[0.15em] text-acid">
                  {certification.type === "badge" ? "BADGE" : "CERTIFICATION"}
                  {certification.date ? ` · ${certification.date}` : ""}
                </p>
                <h3 className="mt-1 truncate font-bold">
                  {certification.title}
                </h3>
                {certification.issuer && (
                  <p className="mt-1 truncate text-xs text-white/40">
                    {certification.issuer}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs tracking-[0.1em]">
                <button
                  type="button"
                  onClick={() => moveCertification(certification.id, -1)}
                  disabled={index === 0}
                  aria-label={`Monter ${certification.title}`}
                  className="px-2 py-1 text-white/40 transition hover:text-white disabled:opacity-20"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveCertification(certification.id, 1)}
                  disabled={index === certifications.length - 1}
                  aria-label={`Descendre ${certification.title}`}
                  className="px-2 py-1 text-white/40 transition hover:text-white disabled:opacity-20"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => startEdit(certification)}
                  className="px-2 py-1 text-white/40 transition hover:text-acid"
                >
                  MODIFIER
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(certification)}
                  className="px-2 py-1 text-white/30 transition hover:text-red-400"
                >
                  SUPPRIMER
                </button>
              </div>
            </div>
          ))}

          {certifications.length === 0 && (
            <p className="py-10 text-sm text-white/40">
              Aucune certification ou badge. Ajoute le premier ici.
            </p>
          )}
        </div>
      </section>

      <section>
        <div className="border border-white/10 p-6 md:p-8">
          <p className="mb-2 text-xs tracking-[0.2em] text-white/40">
            {editingId ? "ÉDITION" : "NOUVEAU"}
          </p>
          <h2 className="mb-8 text-2xl font-bold">
            {editingId ? "MODIFIER" : "AJOUTER"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="certification-type" className="field-label">
                TYPE
              </label>
              <select
                id="certification-type"
                value={form.type}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    type:
                      event.target.value === "badge"
                        ? "badge"
                        : "certification",
                  }))
                }
                className="field-input"
              >
                <option value="certification">Certification</option>
                <option value="badge">Badge</option>
              </select>
            </div>

            <div>
              <label htmlFor="certification-title" className="field-label">
                NOM
              </label>
              <input
                id="certification-title"
                type="text"
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                placeholder="Certification obtenue"
                required
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="certification-issuer" className="field-label">
                ORGANISME
              </label>
              <input
                id="certification-issuer"
                type="text"
                value={form.issuer}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    issuer: event.target.value,
                  }))
                }
                placeholder="Organisme certificateur"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="certification-date" className="field-label">
                DATE D&apos;OBTENTION
              </label>
              <input
                id="certification-date"
                type="text"
                value={form.date}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    date: event.target.value,
                  }))
                }
                placeholder="2026"
                className="field-input"
              />
            </div>

            <div>
              <label
                htmlFor="certification-description"
                className="field-label"
              >
                DESCRIPTION
              </label>
              <textarea
                id="certification-description"
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                placeholder="Compétences validées ou détails utiles…"
                rows={4}
                className="field-input resize-y"
              />
            </div>

            <div>
              <label htmlFor="certification-url" className="field-label">
                LIEN DE VÉRIFICATION
              </label>
              <input
                id="certification-url"
                type="url"
                value={form.credentialUrl}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    credentialUrl: event.target.value,
                  }))
                }
                placeholder="https://…"
                className="field-input"
              />
            </div>

            <div className="flex gap-3">
              <button type="submit" className="cut-button flex-1 px-5 py-4">
                {editingId ? "ENREGISTRER" : "+ AJOUTER"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-white/20 px-5 py-4 text-xs font-bold tracking-[0.15em] transition hover:border-white"
                >
                  ANNULER
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
