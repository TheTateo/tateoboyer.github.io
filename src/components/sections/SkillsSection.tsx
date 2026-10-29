import { Mark } from "../Icons";
import { useSkills } from "../../context/SkillsContext";
import { formatIndex } from "../../lib/utils";
import { useState } from "react";

export default function SkillsSection() {
  const { skills, tools, aiNames } = useSkills();
  const visibleSkills = skills.filter((skill) => skill.name.trim() !== "");
  const uncategorizedLabel = "Sans catégorie";
  const skillCategories = Array.from(
    new Set(visibleSkills.map((skill) => skill.category || uncategorizedLabel)),
  );
  const [activeCategory, setActiveCategory] = useState("");
  const [activeAI, setActiveAI] = useState<string | null>(null);
  const selectedCategory = skillCategories.includes(activeCategory)
    ? activeCategory
    : (skillCategories[0] ?? "");
  const toolRows = Array.from(
    { length: Math.ceil(tools.length / 3) },
    (_, rowIndex) => tools.slice(rowIndex * 3, rowIndex * 3 + 3),
  );

  return (
    <section
      id="competences"
      data-scroll-reveal
      className="relative isolate mx-auto max-w-[1240px] overflow-hidden px-5 pb-28 pt-36 md:px-10 md:pb-40 md:pt-48"
    >
      <div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:gap-28">
        <div>
          <p className="eyebrow">MON ARSENAL DE</p>
          <h2 className="section-title mt-4">COMPÉTENCES.</h2>

          <div className="skill-radar mt-12">
            <div className="radar-ring ring-one" />
            <div className="radar-ring ring-two" />
            <div className="radar-ring ring-three" />
            <div className="radar-sweep" />

            {aiNames.map((aiName, index) => {
              const contact = ["contact-one", "contact-two", "contact-three", "contact-four", "contact-five", "contact-six"][index];
              const angle = index * 137.5 * (Math.PI / 180);
              const radius = 28 + Math.floor(index / 12) * 7;
              const position = index >= 6
                ? {
                    left: `${50 + Math.cos(angle) * radius}%`,
                    top: `${50 + Math.sin(angle) * radius}%`,
                  }
                : undefined;

              return (
                <button
                  key={`${aiName}-${index}`}
                  type="button"
                  className={`radar-contact ${contact ?? ""}`}
                  style={position}
                  aria-label={`Afficher ${aiName}`}
                  onMouseEnter={() => setActiveAI(aiName)}
                  onMouseLeave={() => setActiveAI(null)}
                  onFocus={() => setActiveAI(aiName)}
                  onBlur={() => setActiveAI(null)}
                />
              );
            })}
            {activeAI ? (
              <div className="radar-contact-label" aria-live="polite">
                IA D&#201;TECT&#201;E <span>{activeAI}</span>
              </div>
            ) : (
              <div className="radar-alert">HOSTILIT&#201; D&#201;TECT&#201;E</div>
            )}

            <Mark />
          </div>
        </div>

        <div className="self-end">
          <div className="capability-group-heading">
            <span>HARD SKILLS</span>
            {skillCategories.length > 0 && (
              <div>
                <label className="sr-only" htmlFor="skill-category-select">
                  Sélectionner une catégorie de hard skills
                </label>
                <select
                  id="skill-category-select"
                  className="skill-category-select"
                  value={selectedCategory}
                  onChange={(event) => setActiveCategory(event.target.value)}
                >
                  {skillCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="space-y-8">
            {skillCategories.filter((category) => category === selectedCategory).map((category) => {
              const categorySkills = visibleSkills.filter(
                (skill) => (skill.category || uncategorizedLabel) === category,
              );

              return (
                <section key={category}>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-white/70">
                      {category}
                    </h3>
                    <span className="text-[10px] tracking-[0.15em] text-white/30">
                      {formatIndex(categorySkills.length)} COMPÉTENCE
                      {categorySkills.length > 1 ? "S" : ""}
                    </span>
                  </div>
                  <div className="capability-grid">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="capability-card">
                        <div className="flex items-center justify-between gap-4">
                          <span className="capability-index">
                            {formatIndex(visibleSkills.indexOf(skill))}
                          </span>
                        </div>

                        <div>
                          <span className="break-words font-display text-base uppercase tracking-wide sm:text-lg lg:text-xl">
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {tools.length > 0 && (
            <>
              <div className="capability-group-heading mt-12">
                <span>LOGICIELS UTILISÉS</span>
                <span>STACK ACTIVE</span>
              </div>

              <div className="software-hive">
                {toolRows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`software-hive-row${row.length < 3 ? " software-hive-row-short" : ""}`}
                  >
                    {row.map((tool) => (
                      <div key={tool} className="software-cell">
                        <span className="software-cell-name">{tool}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
