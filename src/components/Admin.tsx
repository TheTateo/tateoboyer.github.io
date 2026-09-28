import { useState } from "react";
import type { Project } from "../data/projects";

type AdminProps = {
  projects: Project[];
  onAddProject: (project: Project) => void;
  onDeleteProject: (number: string) => void;
  onBack: () => void;
};

function Admin({
  projects,
  onAddProject,
  onDeleteProject,
  onBack,
}: AdminProps) {
  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    image: "",
    color: "#d8ff55",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.title.trim() || !form.type.trim()) {
      return;
    }

    const nextNumber =
      projects.length > 0
        ? String(
            Math.max(
              ...projects.map((project) => Number(project.number))
            ) + 1
          ).padStart(2, "0")
        : "01";

    const newProject: Project = {
      number: nextNumber,
      title: form.title.trim(),
      type: form.type.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      color: form.color,
    };

    onAddProject(newProject);

    setForm({
      title: "",
      type: "",
      description: "",
      image: "",
      color: "#d8ff55",
    });
  };

  return (
    <main className="min-h-screen bg-[#080a0d] px-5 py-10 text-white md:px-10 md:py-16">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-12 flex items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="mb-2 text-xs tracking-[0.25em] text-white/40">
              PORTFOLIO / ADMIN
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              PROJETS<span className="text-[#d8ff55]">.</span>
            </h1>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="border border-white/20 px-4 py-3 text-xs font-bold tracking-[0.15em] transition hover:border-[#d8ff55] hover:text-[#d8ff55]"
          >
            ← PORTFOLIO
          </button>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
          <section>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs tracking-[0.2em] text-white/40">
                  {projects.length} PROJET
                  {projects.length > 1 ? "S" : ""}
                </p>

                <h2 className="text-2xl font-bold">
                  PROJETS EXISTANTS
                </h2>
              </div>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {projects.map((project) => (
                <div
                  key={project.number}
                  className="flex items-center gap-4 py-5"
                >
                  <span className="w-10 text-sm text-white/30">
                    {project.number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold">
                      {project.title}
                    </h3>

                    <p className="mt-1 truncate text-xs text-white/40">
                      {project.type}
                    </p>
                  </div>

                  <div
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{
                      backgroundColor: project.color,
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => onDeleteProject(project.number)}
                    className="text-xs tracking-[0.1em] text-white/30 transition hover:text-red-400"
                  >
                    SUPPRIMER
                  </button>
                </div>
              ))}

              {projects.length === 0 && (
                <p className="py-10 text-sm text-white/40">
                  Aucun projet.
                </p>
              )}
            </div>
          </section>

          <section>
            <div className="border border-white/10 p-6 md:p-8">
              <p className="mb-2 text-xs tracking-[0.2em] text-white/40">
                NOUVEAU
              </p>

              <h2 className="mb-8 text-2xl font-bold">
                AJOUTER UN PROJET
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-xs tracking-[0.15em] text-white/50"
                  >
                    TITRE
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="MON//PROJET"
                    required
                    className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-[#d8ff55]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="mb-2 block text-xs tracking-[0.15em] text-white/50"
                  >
                    TYPE
                  </label>

                  <input
                    id="type"
                    name="type"
                    type="text"
                    value={form.type}
                    onChange={handleChange}
                    placeholder="Direction artistique · UI/UX"
                    required
                    className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-[#d8ff55]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-xs tracking-[0.15em] text-white/50"
                  >
                    DESCRIPTION
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Décris ton projet..."
                    rows={5}
                    className="w-full resize-none border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-[#d8ff55]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="mb-2 block text-xs tracking-[0.15em] text-white/50"
                  >
                    URL DE L'IMAGE
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="url"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-[#d8ff55]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="color"
                    className="mb-2 block text-xs tracking-[0.15em] text-white/50"
                  >
                    COULEUR
                  </label>

                  <div className="flex gap-3">
                    <input
                      id="color"
                      name="color"
                      type="color"
                      value={form.color}
                      onChange={handleChange}
                      className="h-12 w-16 cursor-pointer border border-white/10 bg-transparent p-1"
                    />

                    <input
                      type="text"
                      value={form.color}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          color: event.target.value,
                        }))
                      }
                      className="min-w-0 flex-1 border border-white/10 bg-white/[0.03] px-4 py-3 text-sm uppercase outline-none focus:border-[#d8ff55]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d8ff55] px-5 py-4 text-sm font-bold tracking-[0.15em] text-black transition hover:bg-white"
                >
                  + AJOUTER LE PROJET
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Admin;