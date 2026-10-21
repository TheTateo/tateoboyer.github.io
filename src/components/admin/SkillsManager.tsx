import { useState, type FormEvent } from "react";
import { useSkills } from "../../context/SkillsContext";

export default function SkillsManager() {
  const {
    skills,
    tools,
    addSkill,
    updateSkill,
    deleteSkill,
    addTool,
    updateTool,
    removeTool,
  } = useSkills();

  const [newSkill, setNewSkill] = useState("");
  const [newTool, setNewTool] = useState("");

  const handleAddSkill = (event: FormEvent) => {
    event.preventDefault();
    addSkill({ name: newSkill });
    setNewSkill("");
  };

  const handleAddTool = (event: FormEvent) => {
    event.preventDefault();
    addTool(newTool);
    setNewTool("");
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <section className="space-y-8">
        <div>
          <p className="mb-2 text-xs tracking-[0.25em] text-white/40">
            {skills.length} ÉLÉMENT{skills.length > 1 ? "S" : ""}
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            HARD SKILLS<span className="text-acid">.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">
            Gère les compétences affichées dans la section dédiée du portfolio.
          </p>
        </div>

        <form onSubmit={handleAddSkill} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={newSkill}
            onChange={(event) => setNewSkill(event.target.value)}
            placeholder="Ex. Direction artistique"
            aria-label="Nom du hard skill à ajouter"
            className="min-h-12 flex-1 border border-white/15 bg-white/5 px-4 text-sm outline-none transition placeholder:text-white/25 focus:border-acid"
          />
          <button
            type="submit"
            className="min-h-12 bg-acid px-6 text-xs font-bold tracking-[0.15em] text-ink transition hover:bg-white"
          >
            AJOUTER
          </button>
        </form>

        {skills.length === 0 ? (
          <div className="border border-dashed border-white/15 px-6 py-10 text-center">
            <p className="text-sm text-white/40">
              Aucun hard skill dans la liste.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(event) =>
                      updateSkill(skill.id, { name: event.target.value })
                    }
                    aria-label={`Nom du hard skill ${skill.name}`}
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => deleteSkill(skill.id)}
                    aria-label={`Supprimer ${skill.name}`}
                    className="shrink-0 text-xs text-white/30 transition hover:text-red-400"
                  >
                    SUPPR.
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-8">
        <div>
          <p className="mb-2 text-xs tracking-[0.25em] text-white/40">
            {tools.length} LOGICIEL{tools.length > 1 ? "S" : ""}
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            LOGICIELS<span className="text-acid">.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">
            Gère les logiciels présentés dans la grille de compétences.
          </p>
        </div>

        <form onSubmit={handleAddTool} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={newTool}
            onChange={(event) => setNewTool(event.target.value)}
            placeholder="Ex. Figma"
            aria-label="Nom du logiciel à ajouter"
            className="min-h-12 flex-1 border border-white/15 bg-white/5 px-4 text-sm outline-none transition placeholder:text-white/25 focus:border-acid"
          />
          <button
            type="submit"
            className="min-h-12 bg-acid px-6 text-xs font-bold tracking-[0.15em] text-ink transition hover:bg-white"
          >
            AJOUTER
          </button>
        </form>

        {tools.length === 0 ? (
          <div className="border border-dashed border-white/15 px-6 py-10 text-center">
            <p className="text-sm text-white/40">
              Aucun logiciel dans la liste.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {tools.map((tool) => (
              <div
                key={tool}
                className="border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={tool}
                    onChange={(event) =>
                      updateTool(tool, event.target.value)
                    }
                    aria-label={`Nom du logiciel ${tool}`}
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeTool(tool)}
                    aria-label={`Supprimer ${tool}`}
                    className="shrink-0 text-xs text-white/30 transition hover:text-red-400"
                  >
                    SUPPR.
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
