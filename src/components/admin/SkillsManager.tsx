import { useState, type FormEvent } from "react";
import { useSkills } from "../../context/SkillsContext";
import { formatIndex } from "../../lib/utils";

export default function SkillsManager() {
  const {
    skills,
    tools,
    addSkill,
    updateSkill,
    deleteSkill,
    moveSkill,
    addTool,
    removeTool,
  } = useSkills();

  const [name, setName] = useState("");
  const [level, setLevel] = useState(70);
  const [error, setError] = useState("");
  const [toolName, setToolName] = useState("");

  const handleAddSkill = (event: FormEvent) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Le nom de la compétence est obligatoire.");
      return;
    }

    addSkill({ name: name.trim(), level });
    setName("");
    setLevel(70);
    setError("");
  };

  const handleAddTool = (event: FormEvent) => {
    event.preventDefault();
    addTool(toolName);
    setToolName("");
  };

  const handleDeleteSkill = (id: string, skillName: string) => {
    if (!window.confirm(`Supprimer « ${skillName || "cette compétence"} » ?`)) {
      return;
    }
    deleteSkill(id);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
      <section>
        <p className="mb-2 text-xs tracking-[0.2em] text-white/40">
          {skills.length} COMPÉTENCE{skills.length > 1 ? "S" : ""}
        </p>
        <h2 className="mb-2 text-2xl font-bold">COMPÉTENCES EXISTANTES</h2>
        <p className="mb-6 text-sm text-white/40">
          Les modifications sont enregistrées au fur et à mesure.
        </p>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {skills.map((skill, index) => (
            <div key={skill.id} className="space-y-3 py-5">
              <div className="flex items-center gap-3">
                <span className="w-8 shrink-0 text-sm text-white/30">
                  {formatIndex(index)}
                </span>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(event) =>
                    updateSkill(skill.id, { name: event.target.value })
                  }
                  aria-label={`Nom de la compétence ${index + 1}`}
                  className="field-input min-w-0 flex-1"
                />
                <span className="w-12 shrink-0 text-right text-xs text-white/50">
                  {skill.level}%
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pl-11">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={skill.level}
                  onChange={(event) =>
                    updateSkill(skill.id, {
                      level: Number(event.target.value),
                    })
                  }
                  aria-label={`Niveau de ${skill.name || "la compétence"}`}
                  className="h-1 min-w-0 flex-1 cursor-pointer accent-acid"
                />

                <div className="flex items-center gap-1 text-xs tracking-[0.1em]">
                  <button
                    type="button"
                    onClick={() => moveSkill(skill.id, -1)}
                    disabled={index === 0}
                    aria-label={`Monter ${skill.name}`}
                    className="px-2 py-1 text-white/40 transition hover:text-white disabled:opacity-20 disabled:hover:text-white/40"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSkill(skill.id, 1)}
                    disabled={index === skills.length - 1}
                    aria-label={`Descendre ${skill.name}`}
                    className="px-2 py-1 text-white/40 transition hover:text-white disabled:opacity-20 disabled:hover:text-white/40"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(skill.id, skill.name)}
                    className="px-2 py-1 text-white/30 transition hover:text-red-400"
                  >
                    SUPPRIMER
                  </button>
                </div>
              </div>
            </div>
          ))}

          {skills.length === 0 && (
            <p className="py-10 text-sm text-white/40">
              Aucune compétence. Ajoute la première avec le formulaire.
            </p>
          )}
        </div>
      </section>

      <section className="space-y-8">
        <div className="border border-white/10 p-6 md:p-8">
          <p className="mb-2 text-xs tracking-[0.2em] text-white/40">NOUVELLE</p>
          <h2 className="mb-8 text-2xl font-bold">AJOUTER UNE COMPÉTENCE</h2>

          <form onSubmit={handleAddSkill} className="space-y-6" noValidate>
            <div>
              <label htmlFor="skill-name" className="field-label">
                NOM
              </label>
              <input
                id="skill-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Motion Design"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="skill-level" className="field-label">
                NIVEAU — {level}%
              </label>
              <input
                id="skill-level"
                type="range"
                min={0}
                max={100}
                value={level}
                onChange={(event) => setLevel(Number(event.target.value))}
                className="h-1 w-full cursor-pointer accent-acid"
              />
            </div>

            {error && (
              <p role="alert" className="field-error">
                {error}
              </p>
            )}

            <button type="submit" className="cut-button w-full px-5 py-4">
              + AJOUTER LA COMPÉTENCE
            </button>
          </form>
        </div>

        <div className="border border-white/10 p-6 md:p-8">
          <p className="mb-2 text-xs tracking-[0.2em] text-white/40">
            {tools.length} OUTIL{tools.length > 1 ? "S" : ""}
          </p>
          <h2 className="mb-6 text-2xl font-bold">OUTILS</h2>

          <div className="mb-6 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="tech-chip inline-flex items-center gap-2"
              >
                {tool}
                <button
                  type="button"
                  onClick={() => removeTool(tool)}
                  aria-label={`Retirer ${tool}`}
                  className="text-white/40 transition hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
            {tools.length === 0 && (
              <p className="text-sm text-white/40">Aucun outil.</p>
            )}
          </div>

          <form onSubmit={handleAddTool} className="flex gap-3">
            <input
              type="text"
              value={toolName}
              onChange={(event) => setToolName(event.target.value)}
              placeholder="Figma"
              aria-label="Nom de l'outil"
              className="field-input min-w-0 flex-1"
            />
            <button
              type="submit"
              className="border border-white/20 px-5 text-xs font-bold tracking-[0.15em] transition hover:border-acid hover:text-acid"
            >
              AJOUTER
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
