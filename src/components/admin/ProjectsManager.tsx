import { useState, type ChangeEvent, type FormEvent } from "react";
import { useProjects } from "../../context/ProjectsContext";
import { useTechnologies } from "../../context/TechnologiesContext";
import { formatIndex, getAccentColor, isHexColor } from "../../lib/utils";
import type { Project, ProjectInput } from "../../types";

const createEmptyForm = (): ProjectInput => ({
  title: "",
  technologies: [],
  description: "",
  contributorCount: undefined,
  startDate: "",
  endDate: "",
  image: "",
  imageSource: "url",
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

  const handleImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choisis un fichier image.");
      event.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("L’image doit faire 2 Mo maximum pour être enregistrée dans le navigateur.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setForm((current) => ({ ...current, image: reader.result as string }));
        setError("");
      }
    };
    reader.onerror = () => setError("Impossible de lire cette image.");
    reader.readAsDataURL(file);
  };

  const startEdit = (project: Project) => {
    const { id, ...values } = project;
    setForm({
      ...values,
      imageSource:
        values.imageSource ?? (values.image.startsWith("data:") ? "upload" : "url"),
    });
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
      contributorCount: form.contributorCount,
      startDate: form.startDate?.trim() ?? "",
      endDate: form.endDate?.trim() ?? "",
      image: form.image.trim(),
      imageSource: form.imageSource ?? "url",
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

    if (
      input.contributorCount !== undefined &&
      (!Number.isInteger(input.contributorCount) || input.contributorCount < 1)
    ) {
      setError("Le nombre de contributeurs doit être un entier positif.");
      return;
    }

    if (input.startDate && input.endDate && input.endDate < input.startDate) {
      setError("La date de fin doit être postérieure à la date de début.");
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
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <section>
        <p className="mb-2 text-xs tracking-[0.2em] text-white/40">
          {projects.length} PROJET{projects.length > 1 ? "S" : ""}
        </p>
        <h2 className="mb-6 text-xl font-bold">PROJETS EXISTANTS</h2>

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
        <div className="border border-white/10 p-5 md:p-6">
          <p className="mb-2 text-xs tracking-[0.2em] text-white/40">
            {editingId ? "ÉDITION" : "NOUVEAU"}
          </p>
          <h2 className="mb-5 text-xl font-bold">
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
              <label htmlFor="contributorCount" className="field-label">
                NOMBRE DE CONTRIBUTEURS (OPTIONNEL)
              </label>
              <input
                id="contributorCount"
                name="contributorCount"
                type="number"
                min="1"
                step="1"
                value={form.contributorCount ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    contributorCount: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  }))
                }
                placeholder="Ex. 3"
                className="field-input"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="startDate" className="field-label">
                  DATE DE DÉBUT (OPTIONNELLE)
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={form.startDate ?? ""}
                  onChange={handleChange}
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="field-label">
                  DATE DE FIN (OPTIONNELLE)
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={form.endDate ?? ""}
                  onChange={handleChange}
                  className="field-input"
                />
              </div>
            </div>

            <div>
              <p className="field-label">IMAGE DU PROJET</p>
              <div className="mb-3 flex gap-2">
                {(["url", "upload"] as const).map((source) => (
                  <button
                    key={source}
                    type="button"
                    aria-pressed={(form.imageSource ?? "url") === source}
                    onClick={() => {
                      setForm((current) => ({ ...current, imageSource: source, image: "" }));
                      setError("");
                    }}
                    className={`border px-3 py-2 text-xs font-bold tracking-[0.08em] transition ${
                      (form.imageSource ?? "url") === source
                        ? "border-acid bg-acid text-ink"
                        : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {source === "url" ? "URL" : "FICHIER DE L’APPAREIL"}
                  </button>
                ))}
              </div>
              {(form.imageSource ?? "url") === "url" ? (
                <>
                  <label htmlFor="image" className="sr-only">URL de l’image</label>
                  <input
                    id="image"
                    name="image"
                    type="url"
                    value={form.image.startsWith("data:") ? "" : form.image}
                    onChange={handleChange}
                    placeholder="https://…"
                    className="field-input"
                  />
                </>
              ) : (
                <>
                  <label htmlFor="image-file" className="sr-only">Choisir une image</label>
                  <input
                    id="image-file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageFile}
                    className="field-input file:mr-3 file:border-0 file:bg-acid file:px-3 file:py-2 file:font-bold file:text-ink"
                  />
                  <p className="mt-2 text-xs text-white/35">Image enregistrée dans ce navigateur, 2 Mo maximum.</p>
                </>
              )}
              {form.image && (
                <img src={form.image} alt="Aperçu de l’image du projet" className="mt-3 h-28 w-full object-cover" />
              )}
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
