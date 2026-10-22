import { useState, type FormEvent } from "react";
import { useSkills } from "../../context/SkillsContext";

export default function SkillsManager() {
  const {
    skills,
    categories,
    tools,
    aiNames,
    addSkill,
    updateSkill,
    deleteSkill,
    addCategory,
    renameCategory,
    deleteCategory,
    addTool,
    updateTool,
    removeTool,
    addAIName,
    updateAIName,
    removeAIName,
  } = useSkills();

  const [newSkill, setNewSkill] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [newTool, setNewTool] = useState("");
  const [newAIName, setNewAIName] = useState("");

  const handleAddSkill = (event: FormEvent) => {
    event.preventDefault();
    addSkill({
      name: newSkill,
      category: newSkillCategory.trim(),
    });
    setNewSkill("");
  };

  const handleAddCategory = (event: FormEvent) => {
    event.preventDefault();
    addCategory(newCategory);
    setNewCategory("");
  };

  const handleRenameCategory = (event: FormEvent) => {
    event.preventDefault();
    if (!editingCategory) return;
    renameCategory(editingCategory, editedCategoryName);
    setEditingCategory(null);
    setEditedCategoryName("");
  };

  const handleAddTool = (event: FormEvent) => {
    event.preventDefault();
    addTool(newTool);
    setNewTool("");
  };

  const handleAddAIName = (event: FormEvent) => {
    event.preventDefault();
    addAIName(newAIName);
    setNewAIName("");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="space-y-6">
        <div>
          <p className="mb-2 text-xs tracking-[0.25em] text-white/40">
            {skills.length} ÉLÉMENT{skills.length > 1 ? "S" : ""}
          </p>
          <h2 className="text-xl font-bold tracking-tight">
            HARD SKILLS<span className="text-acid">.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">
            Gère les compétences affichées dans la section dédiée du portfolio.
          </p>
        </div>

        <form onSubmit={handleAddSkill} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input
            type="text"
            value={newSkill}
            onChange={(event) => setNewSkill(event.target.value)}
            placeholder="Ex. Direction artistique"
            aria-label="Nom du hard skill à ajouter"
            className="min-h-10 flex-1 border border-white/15 bg-white/5 px-4 text-sm outline-none transition placeholder:text-white/25 focus:border-acid"
          />
          <select
            value={newSkillCategory}
            onChange={(event) => setNewSkillCategory(event.target.value)}
            aria-label="Catégorie du hard skill"
            className="min-h-10 border border-white/15 bg-white/5 px-4 text-sm outline-none transition placeholder:text-white/25 focus:border-acid"
          >
            <option value="">Sans catégorie</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="min-h-10 bg-acid px-6 text-xs font-bold tracking-[0.15em] text-ink transition hover:bg-white"
          >
            AJOUTER
          </button>
        </form>

        <div className="space-y-4 border-y border-white/10 py-6">
          <div>
            <h3 className="text-sm font-bold tracking-[0.15em] text-white/75">
              CATÉGORIES
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-white/40">
              Dépose une compétence sur une catégorie pour la classer, ou
              utilise son sélecteur.
            </p>
          </div>
          <form
            onSubmit={handleAddCategory}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={newCategory}
              onChange={(event) => setNewCategory(event.target.value)}
              placeholder="Nouvelle catégorie"
              aria-label="Nom de la nouvelle catégorie"
              className="min-h-11 flex-1 border border-white/15 bg-white/5 px-4 text-sm outline-none transition placeholder:text-white/25 focus:border-acid"
            />
            <button
              type="submit"
              className="min-h-11 border border-acid/50 px-5 text-xs font-bold tracking-[0.15em] text-acid transition hover:bg-acid hover:text-ink"
            >
              CRÉER
            </button>
          </form>
          <div className="grid gap-2 sm:grid-cols-2">
            {categories.map((category) => {
              const skillCount = skills.filter(
                (skill) => skill.category === category,
              ).length;

              return (
                <div
                  key={category}
                  onDragOver={(event) => {
                    event.preventDefault();
                    event.dataTransfer.dropEffect = "move";
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    const skillId = event.dataTransfer.getData("text/plain");
                    if (skillId) updateSkill(skillId, { category });
                  }}
                  className="flex min-h-16 items-center justify-between gap-3 border border-acid/25 bg-acid/[0.04] p-3 transition hover:border-acid/70 hover:bg-acid/[0.08]"
                >
                  <div className="min-w-0">
                    {editingCategory === category ? (
                      <form
                        onSubmit={handleRenameCategory}
                        className="flex items-center gap-2"
                      >
                        <input
                          autoFocus
                          type="text"
                          value={editedCategoryName}
                          onChange={(event) =>
                            setEditedCategoryName(event.target.value)
                          }
                          aria-label={`Nouveau nom pour ${category}`}
                          className="min-w-0 w-full border-b border-acid/50 bg-transparent py-1 text-sm text-white outline-none focus:border-acid"
                        />
                        <button
                          type="submit"
                          className="shrink-0 text-[10px] font-bold text-acid hover:text-white"
                        >
                          OK
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategory(null);
                            setEditedCategoryName("");
                          }}
                          className="shrink-0 text-[10px] text-white/40 hover:text-white"
                        >
                          ANNULER
                        </button>
                      </form>
                    ) : (
                      <p className="truncate text-sm font-semibold text-white/80">
                        {category}
                      </p>
                    )}
                    <p className="mt-1 text-[10px] tracking-[0.12em] text-white/35">
                      {skillCount} COMPÉTENCE{skillCount === 1 ? "" : "S"} ·
                      ZONE DE DÉPÔT
                    </p>
                  </div>
                  {editingCategory !== category && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCategory(category);
                        setEditedCategoryName(category);
                      }}
                      aria-label={`Modifier le nom de ${category}`}
                      className="shrink-0 px-2 py-1 text-[10px] font-bold tracking-wide text-white/40 transition hover:text-acid"
                    >
                      MODIFIER
                    </button>
                  )}
                  {editingCategory !== category && (
                    <button
                      type="button"
                      onClick={() => deleteCategory(category)}
                      aria-label={`Supprimer la catégorie ${category}`}
                      className="shrink-0 px-2 py-1 text-[10px] font-bold tracking-wide text-white/35 transition hover:text-red-400"
                    >
                      SUPPR.
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

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
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData("text/plain", skill.id);
                  event.dataTransfer.effectAllowed = "move";
                }}
                className="cursor-grab border border-white/10 bg-white/[0.03] p-4 active:cursor-grabbing"
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
                <select
                  value={skill.category}
                  onChange={(event) =>
                    updateSkill(skill.id, { category: event.target.value })
                  }
                  aria-label={`Catégorie de ${skill.name}`}
                  className="mt-3 w-full border-t border-white/10 bg-transparent pt-3 text-xs text-white/55 outline-none focus:border-acid"
                >
                  <option value="">Sans catégorie</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div>
          <p className="mb-2 text-xs tracking-[0.25em] text-white/40">
            {tools.length} LOGICIEL{tools.length > 1 ? "S" : ""}
          </p>
          <h2 className="text-xl font-bold tracking-tight">
            LOGICIELS<span className="text-acid">.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">
            Gere les logiciels affiches dans la grille de competences.
          </p>
        </div>

        <form onSubmit={handleAddTool} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={newTool}
            onChange={(event) => setNewTool(event.target.value)}
            placeholder="Ex. Figma"
            aria-label="Nom du logiciel à ajouter"
            className="min-h-10 flex-1 border border-white/15 bg-white/5 px-4 text-sm outline-none transition placeholder:text-white/25 focus:border-acid"
          />
          <button
            type="submit"
            className="min-h-10 bg-acid px-6 text-xs font-bold tracking-[0.15em] text-ink transition hover:bg-white"
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

      <section className="space-y-6 lg:col-span-2">
        <div>
          <p className="mb-2 text-xs tracking-[0.25em] text-white/40">
            {aiNames.length} POINT{aiNames.length > 1 ? "S" : ""} RADAR
          </p>
          <h2 className="text-xl font-bold tracking-tight">
            INTELLIGENCES ARTIFICIELLES<span className="text-acid">.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">
            Chaque nom ajoute un point au radar des compétences. Survole un point pour afficher son IA.
          </p>
        </div>

        <form onSubmit={handleAddAIName} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={newAIName}
            onChange={(event) => setNewAIName(event.target.value)}
            placeholder="Ex. ChatGPT"
            aria-label="Nom de l'intelligence artificielle à ajouter"
            className="min-h-10 flex-1 border border-white/15 bg-white/5 px-4 text-sm outline-none transition placeholder:text-white/25 focus:border-acid"
          />
          <button
            type="submit"
            className="min-h-10 bg-acid px-6 text-xs font-bold tracking-[0.15em] text-ink transition hover:bg-white"
          >
            AJOUTER
          </button>
        </form>

        {aiNames.length === 0 ? (
          <div className="border border-dashed border-white/15 px-6 py-8 text-center">
            <p className="text-sm text-white/40">Aucune IA ajoutée au radar.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {aiNames.map((aiName, index) => (
              <div key={`${aiName}-${index}`} className="flex items-center gap-3 border border-acid/25 bg-acid/[0.04] p-4">
                <span className="text-xs text-acid">{String(index + 1).padStart(2, "0")}</span>
                <input
                  type="text"
                  value={aiName}
                  onChange={(event) => updateAIName(aiName, event.target.value)}
                  aria-label={`Nom de l'IA ${aiName}`}
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeAIName(aiName)}
                  aria-label={`Supprimer l'IA ${aiName}`}
                  className="shrink-0 text-xs text-white/30 transition hover:text-red-400"
                >
                  SUPPR.
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
