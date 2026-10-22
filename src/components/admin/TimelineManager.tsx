import { useState, type FormEvent } from "react";
import { useTimeline } from "../../context/TimelineContext";
import { formatIndex } from "../../lib/utils";
import type { TimelineEntry, TimelineEntryInput } from "../../types";

const emptyEntry: TimelineEntryInput = {
  period: "",
  title: "",
  organization: "",
  location: "",
  diploma: "",
  description: "",
};

export default function TimelineManager() {
  const { entries, addEntry, updateEntry, deleteEntry, moveEntry } =
    useTimeline();
  const [form, setForm] = useState<TimelineEntryInput>(emptyEntry);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const resetForm = () => {
    setForm(emptyEntry);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const entry = {
      period: form.period.trim(),
      title: form.title.trim(),
      organization: form.organization.trim(),
      location: form.location.trim(),
      diploma: form.diploma.trim(),
      description: form.description.trim(),
    };

    if (!entry.period || !entry.title) {
      setError("La période et l’intitulé sont obligatoires.");
      return;
    }

    if (editingId) {
      updateEntry(editingId, entry);
    } else {
      addEntry(entry);
    }
    resetForm();
  };

  const startEdit = (entry: TimelineEntry) => {
    setForm({
      period: entry.period,
      title: entry.title,
      organization: entry.organization,
      location: entry.location,
      diploma: entry.diploma,
      description: entry.description,
    });
    setEditingId(entry.id);
  };

  const handleDelete = (entry: TimelineEntry) => {
    if (!window.confirm(`Supprimer « ${entry.title} » du parcours ?`)) return;
    deleteEntry(entry.id);
    if (editingId === entry.id) resetForm();
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
      <section>
        <p className="mb-2 text-xs tracking-[0.2em] text-white/40">
          {entries.length} ÉTAPE{entries.length > 1 ? "S" : ""}
        </p>
        <h2 className="mb-6 text-2xl font-bold">ÉTAPES DU PARCOURS</h2>
        <p className="mb-6 text-sm text-white/40">
          La première étape de la liste apparaît en premier sur la page publique.
        </p>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className="flex flex-wrap items-center gap-4 py-5"
            >
              <span className="w-8 text-sm text-white/30">
                {formatIndex(index)}
              </span>
              <div className="min-w-0 flex-1 basis-40">
                <p className="text-xs font-bold tracking-[0.15em] text-acid">
                  {entry.period}
                </p>
                <h3 className="mt-1 truncate font-bold">{entry.title}</h3>
                {entry.organization && (
                  <p className="mt-1 truncate text-xs text-white/40">
                    {entry.organization}
                  </p>
                )}
                {(entry.location || entry.diploma) && (
                  <p className="mt-1 truncate text-xs text-white/35">
                    {[entry.location, entry.diploma].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs tracking-[0.1em]">
                <button
                  type="button"
                  onClick={() => moveEntry(entry.id, -1)}
                  disabled={index === 0}
                  aria-label={`Monter ${entry.title}`}
                  className="px-2 py-1 text-white/40 transition hover:text-white disabled:opacity-20"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveEntry(entry.id, 1)}
                  disabled={index === entries.length - 1}
                  aria-label={`Descendre ${entry.title}`}
                  className="px-2 py-1 text-white/40 transition hover:text-white disabled:opacity-20"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => startEdit(entry)}
                  className="px-2 py-1 text-white/40 transition hover:text-acid"
                >
                  MODIFIER
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(entry)}
                  className="px-2 py-1 text-white/30 transition hover:text-red-400"
                >
                  SUPPRIMER
                </button>
              </div>
            </div>
          ))}

          {entries.length === 0 && (
            <p className="py-10 text-sm text-white/40">
              Aucune étape. Ajoute ta première formation ou expérience.
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
            {editingId ? "MODIFIER UNE ÉTAPE" : "AJOUTER UNE ÉTAPE"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="timeline-period" className="field-label">
                PÉRIODE
              </label>
              <input
                id="timeline-period"
                type="text"
                value={form.period}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    period: event.target.value,
                  }))
                }
                placeholder="2023 — 2026"
                required
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="timeline-title" className="field-label">
                INTITULÉ
              </label>
              <input
                id="timeline-title"
                type="text"
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                placeholder="Bachelor en design numérique"
                required
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="timeline-organization" className="field-label">
                ÉTABLISSEMENT / ORGANISME
              </label>
              <input
                id="timeline-organization"
                type="text"
                value={form.organization}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    organization: event.target.value,
                  }))
                }
                placeholder="École, entreprise, association…"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="timeline-location" className="field-label">
                LIEU
              </label>
              <input
                id="timeline-location"
                type="text"
                value={form.location}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    location: event.target.value,
                  }))
                }
                placeholder="Ville, région ou pays"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="timeline-diploma" className="field-label">
                DIPLÔME (FACULTATIF)
              </label>
              <input
                id="timeline-diploma"
                type="text"
                value={form.diploma}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    diploma: event.target.value,
                  }))
                }
                placeholder="Ex. Licence, Master…"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="timeline-description" className="field-label">
                DESCRIPTION
              </label>
              <textarea
                id="timeline-description"
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                placeholder="Quelques détails sur cette étape…"
                rows={4}
                className="field-input resize-y"
              />
            </div>

            {error && (
              <p role="alert" className="field-error">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button type="submit" className="cut-button flex-1 px-5 py-4">
                {editingId ? "ENREGISTRER" : "+ AJOUTER AU PARCOURS"}
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
