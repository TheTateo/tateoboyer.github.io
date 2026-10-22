import { Mark } from "../Icons";
import { useSkills } from "../../context/SkillsContext";
import { formatIndex } from "../../lib/utils";
import { useState } from "react";

export default function SkillsSection() {
  const { skills, tools } = useSkills();
  const visibleSkills = skills.filter((skill) => skill.name.trim() !== "");
  const skillCategories = Array.from(
    new Set(visibleSkills.map((skill) => skill.category || "Autres")),
  );
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = skillCategories[activeCategoryIndex];
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

          <div className="skill-radar mt-12" aria-hidden="true">
            <div className="radar-ring ring-one" />
            <div className="radar-ring ring-two" />
            <div className="radar-ring ring-three" />
            <div className="radar-sweep" />

            {["contact-one",
              "contact-two",
              "contact-three",
              "contact-four",
              "contact-five",
              "contact-six"].map((contact) => (
                <span key={contact} className={`radar-contact ${contact}`} /> ))}
                <div className="radar-alert">HOSTILITÉS DÉTECTÉS</div>

            <Mark />
          </div>
        </div>

        <div className="self-end">
          <div className="capability-group-heading">
            <span>HARD SKILLS</span>
                        <div className="category-navigation" aria-label="Navigation des categories">
              <button type="button" aria-label="Categorie precedente" disabled={skillCategories.length < 2} onClick={() => setActiveCategoryIndex((index) => (index - 1 + skillCategories.length) % skillCategories.length)}>{"←"}</button>
              <button type="button" aria-label="Categorie suivante" disabled={skillCategories.length < 2} onClick={() => setActiveCategoryIndex((index) => (index + 1) % skillCategories.length)}>{"→"}</button>
            </div>
          </div>

          <div className="space-y-8">
            {skillCategories.filter((category) => category === activeCategory).map((category) => {
              const categorySkills = visibleSkills.filter(
                (skill) => (skill.category || "Autres") === category,
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
