import { useState, type ChangeEvent, type FormEvent } from "react";
import { useProjects } from "../../context/ProjectsContext";
import { useTechnologies } from "../../context/TechnologiesContext";
import { formatIndex, getAccentColor, isHexColor } from "../../lib/utils";
import type { Project, ProjectInput } from "../../types";

const createEmptyForm = (): ProjectInput => ({
  title: "",
  technologies: [],
  description: "",
  image: "",
  color: getAccentColor(),
});

export default function ProjectsManager() {
  const { projects, addProject, updateProject, deleteProject, moveProject } =
    useProjects();

  const { technologies } = useTechnologies();

  const technologyById = new Map(
  technologies.map((technology) => [technology.id, technology]),
  );
  
  const [form, setForm] = useState<ProjectInput>(createEmptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [draggedTechnology, setDraggedTechnology] = useState<string | null>(
    null,
  )

  const resetForm = () => {
    setForm(createEmptyForm());
    setEditingId(null);
    setError("");
  };

  const toggleTechnology = (technologyName: string) => {
    setForm((current) => {
      const alreadySelected = current.technologies.includes(technologyName);
      
      return {
        ...current,
        technologies: alreadySelected
          ? current.technologies.filter(
              (technology) => technology !== technologyName,
          )
          : [...current.technologies, technologyName],
      };
    });
  };

  const moveTechnology = (fromName: string, toName: string) => {
    setForm((current) => {
      const technologies = [...current.technologies];
      const fromIndex = technologies.indexOf(fromName);
      const toIndex = technologies.indexOf(toName);

      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
        return current;
      }

      const [movedTechnology] = technologies.splice(fromIndex, 1);
      technologies.splice(toIndex, 0, movedTechnology);

      return {
        ...current,
        technologies,
      };
    });
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
      technologies: form.technologies,
      description: form.description.trim(),
      image: form.image.trim(),
      color: form.color.trim(),
    };

    if (!input.title) {
      setError("Le titre est obligatoire.");
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
                  {project.technologies.length > 0
                    ? project.technologies.join(" . ")
                    : "Aucune technologie"}
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
              <label htmlFor="technologies" className="field-label"> 
                  TECHNOLOGIES
              </label>

              {technologies.length === 0 ? (
                <div className="border border-dashed border-white/15 px-4 py-5 text-sm text-white/40">
                  Aucune technologie disponible.
                  <br />
                  Ajoute-en d'abord dans l'onglet TECHNOLOGIES.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {technologies.map((technology) => {
                    const isSelected = form.technologies.includes(technology.name);

                    return (
                      <button
                        key={technology.id}
                        type="button"
                        onClick={() => toggleTechnology(technology.name)}
                        className={`border px-3 py-2 text-xs font-bold tracking-[0.08em] transition ${
                          isSelected
                            ? "border-acid bg-acid text-ink"
                            : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
                        }`}
                      >
                        {technology.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

              {form.technologies.length > 0 && (
                <p className="mt-3 text-xs text-white/30">
                  {form.technologies.length} technologie
                  {form.technologies.length > 1 ? "s" : ""} sélectionnée
                  {form.technologies.length > 1 ? "s" : ""}.
                </p>
              )}

              {form.technologies.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-white/30">
                    ORDRE D&apos;AFFICHAGE — GLISSER POUR RÉORGANISER
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {form.technologies.map((technologyName) => (
                      <button
                        key={technologyName}
                        type="button"
                        draggable
                        onDragStart={() => setDraggedTechnology(technologyName)}
                        onDragEnd={() => setDraggedTechnology(null)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => {
                          if (draggedTechnology) {
                            moveTechnology(draggedTechnology, technologyName);
                          }

                          setDraggedTechnology(null);
                        }}
                        className={`cursor-grab border border-acid bg-acid px-3 py-2 text-xs font-bold tracking-[0.08em] text-ink transition active:cursor-grabbing ${
                          draggedTechnology === technologyName
                            ? "opacity-40"
                            : "opacity-100"
                        }`}
                      >
                        {technologyName}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
