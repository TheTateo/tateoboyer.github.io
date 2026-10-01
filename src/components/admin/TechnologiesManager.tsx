import { useState } from "react";
import { useTechnologies } from "../../context/TechnologiesContext";

export default function TechnologiesManager() {
  const { technologies, addTechnology, removeTechnology, updateTechnology } =
    useTechnologies();

  const [newTechnology, setNewTechnology] = useState("");

  const handleAdd = () => {
    addTechnology(newTechnology);
    setNewTechnology("");
  };

  return (
    <section className="space-y-8">
      <div>
        <p className="mb-2 text-xs tracking-[0.25em] text-white/40">
          BIBLIOTHÈQUE
        </p>

        <h2 className="text-2xl font-bold tracking-tight">
          TECHNOLOGIES
          <span className="text-acid">.</span>
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/50">
          Ajoute ici les technologies et mots-clés disponibles pour tous tes
          projets.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={newTechnology}
          onChange={(event) => setNewTechnology(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleAdd();
            }
          }}
          placeholder="Ex. React, UI/UX, bash..."
          className="min-h-12 flex-1 border border-white/15 bg-white/5 px-4 text-sm outline-none transition placeholder:text-white/25 focus:border-acid"
        />

        <button
          type="button"
          onClick={handleAdd}
          className="min-h-12 bg-acid px-6 text-xs font-bold tracking-[0.15em] text-ink transition hover:bg-white"
        >
          AJOUTER
        </button>
      </div>

      {technologies.length === 0 ? (
        <div className="border border-dashed border-white/15 px-6 py-10 text-center">
          <p className="text-sm text-white/40">
            Aucune technologie dans la bibliothèque.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((technology) => (
            <div
              key={technology.id}
              className="border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={technology.name}
                  onChange={(event) =>
                    updateTechnology(technology.id, event.target.value)
                  }
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() => removeTechnology(technology.id)}
                  aria-label={`Supprimer ${technology.name}`}
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
  );
}