import { Mark } from "../Icons";
import { useSkills } from "../../context/SkillsContext";
import { formatIndex } from "../../lib/utils";

export default function SkillsSection() {
  const { skills, tools } = useSkills();
  const visibleSkills = skills.filter((skill) => skill.name.trim() !== "");

  return (
    <section
      id="competences"
      className="relative mx-auto max-w-[1500px] px-5 pb-28 pt-36 md:px-10 md:pb-40 md:pt-48"
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-28">
        <div>
          <p className="eyebrow">MON ARSENAL</p>
          <h2 className="section-title mt-4">COMPÉTENCES.</h2>

          <div className="skill-radar mt-12" aria-hidden="true">
            <div className="radar-ring ring-one" />
            <div className="radar-ring ring-two" />
            <div className="radar-ring ring-three" />
            <div className="radar-sweep" />
            <Mark />
          </div>
        </div>

        <div className="self-end">
          {visibleSkills.length === 0 && (
            <p className="text-sm text-white/40">
              Aucune compétence renseignée pour le moment.
            </p>
          )}

          {visibleSkills.map((skill, index) => (
            <div key={skill.id} className="skill-row">
              <div className="mb-4 flex items-end justify-between">
                <span className="font-display text-xl uppercase tracking-wide">
                  <span className="mr-4 text-xs text-acid">
                    {formatIndex(index)}
                  </span>
                  {skill.name}
                </span>
                <span className="data-label">{skill.level}%</span>
              </div>
              <div className="h-px bg-white/10">
                <div
                  className="skill-level"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}

          {tools.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span key={tool} className="tech-chip">
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
