import { useState, type ChangeEvent, type FormEvent } from "react";
import { useProjects } from "../../context/ProjectsContext";
import { formatIndex, getAccentColor, isHexColor } from "../../lib/utils";
import type { Project, ProjectInput } from "../../types";

const createEmptyForm = (): ProjectInput => ({
  title: "",
  type: "",
  description: "",
  image: "",
  color: getAccentColor(),
});

export default function ProjectsManager() {
  const { projects, addProject, updateProject, deleteProject, moveProject } =
    useProjects();

  const [form, setForm] = useState<ProjectInput>(createEmptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const resetForm = () => {
    setForm(createEmptyForm());
    setEditingId(null);
    setError("");
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const startEdit = (project: Project) => {
    const { id, ...values } = project;
    setForm(values);
    setEditingId(id);
    setError("");
  };

  const handleDelete = (project: Project) => {
    if (!window.confirm(`Supprimer « ${project.title} » ?`)) return;
    deleteProject(project.id);
    if (editingId === project.id) resetForm();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const input: ProjectInput = {
      title: form.title.trim(),
      type: form.type.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      color: form.color.trim(),
    };

    if (!input.title || !input.type) {
      setError("Le titre et le type sont obligatoires.");
      return;
    }

    if (!isHexColor(input.color)) {
      setError("La couleur doit être au format #RRGGBB (ex. #ac3acf).");
      return;
    }

    if (editingId) {
      updateProject(editingId, input);
    } else {
      addProject(input);
    }

    resetForm();
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
      <section>
        <p className="mb-2 text-xs tracking-[0.2em] text-white/40">
          {projects.length} PROJET{projects.length > 1 ? "S" : ""}
        </p>
        <h2 className="mb-6 text-2xl font-bold">PROJETS EXISTANTS</h2>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-wrap items-center gap-4 py-5 ${
                editingId === project.id ? "bg-white/[0.03]" : ""
              }`}
            >
              <span className="w-10 text-sm text-white/30">
                {formatIndex(index)}
              </span>

              <div className="min-w-0 flex-1 basis-40">
                <h3 className="truncate font-bold">{project.title}</h3>
                <p className="mt-1 truncate text-xs text-white/40">
                  {project.type}
                </p>
              </div>

              <div
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: project.color }}
                aria-hidden="true"
              />

              <div className="flex items-center gap-1 text-xs tracking-[0.1em]">
                <button
                  type="button"
                  onClick={() => moveProject(project.id, -1)}
                  disabled={index === 0}
                  aria-label={`Monter ${project.title}`}
                  className="px-2 py-1 text-white/40 transition hover:text-white disabled:opacity-20 disabled:hover:text-white/40"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveProject(project.id, 1)}
                  disabled={index === projects.length - 1}
                  aria-label={`Descendre ${project.title}`}
                  className="px-2 py-1 text-white/40 transition hover:text-white disabled:opacity-20 disabled:hover:text-white/40"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => startEdit(project)}
                  className="px-2 py-1 text-white/40 transition hover:text-acid"
                >
                  MODIFIER
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project)}
                  className="px-2 py-1 text-white/30 transition hover:text-red-400"
                >
                  SUPPRIMER
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <p className="py-10 text-sm text-white/40">
              Aucun projet. Ajoute le premier avec le formulaire.
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
            {editingId ? "MODIFIER LE PROJET" : "AJOUTER UN PROJET"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="title" className="field-label">
                TITRE
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="MON//PROJET"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="type" className="field-label">
                TYPE
              </label>
              <input
                id="type"
                name="type"
                type="text"
                value={form.type}
                onChange={handleChange}
                placeholder="Direction artistique · UI/UX"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="description" className="field-label">
                DESCRIPTION
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Décris ton projet…"
                rows={5}
                className="field-input resize-none"
              />
            </div>

            <div>
              <label htmlFor="image" className="field-label">
                URL DE L&apos;IMAGE
              </label>
              <input
                id="image"
                name="image"
                type="url"
                value={form.image}
                onChange={handleChange}
                placeholder="https://…"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="color" className="field-label">
                COULEUR
              </label>
              <div className="flex gap-3">
                <input
                  id="color"
                  name="color"
                  type="color"
                  value={isHexColor(form.color) ? form.color : "#000000"}
                  onChange={handleChange}
                  className="h-12 w-16 cursor-pointer border border-white/10 bg-transparent p-1"
                />
                <input
                  name="color"
                  type="text"
                  value={form.color}
                  onChange={handleChange}
                  maxLength={7}
                  aria-label="Code hexadécimal de la couleur"
                  className="field-input min-w-0 flex-1 uppercase"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="field-error">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="cut-button flex-1 px-5 py-4"
              >
                {editingId ? "ENREGISTRER" : "+ AJOUTER LE PROJET"}
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
