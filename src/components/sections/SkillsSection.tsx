import { Mark } from "../Icons";
import { useSkills } from "../../context/SkillsContext";
import { formatIndex } from "../../lib/utils";

export default function SkillsSection() {
  const { skills, tools } = useSkills();
  const visibleSkills = skills.filter((skill) => skill.name.trim() !== "");

  return (
    <section
      id="competences"
      className="relative isolate mx-auto max-w-[1500px] overflow-hidden px-5 pb-28 pt-36 md:px-10 md:pb-40 md:pt-48"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-y-[-8%] left-[-12%] w-[86%] bg-acid opacity-[0.055]"
          style={{
            WebkitMaskImage: "url('/symbole_titan.svg')",
            WebkitMaskPosition: "center left",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskImage: "url('/symbole_titan.svg')",
            maskPosition: "center left",
            maskRepeat: "no-repeat",
            maskSize: "contain",
          }}
        />
      </div>

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
            <span>{formatIndex(visibleSkills.length)} DOMAINES</span>
          </div>

          <div className="capability-grid">
            {visibleSkills.map((skill, index) => (
              <div key={skill.id} className="capability-card">
                <div className="flex items-center justify-between gap-4">
                  <span className="capability-index">
                    {formatIndex(index)}
                  </span>
                  <span className="capability-status">
                    {skill.level}%
                  </span>
                </div>

                <div>
                  <span className="font-display text-xl uppercase tracking-wide md:text-2xl">
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {tools.length > 0 && (
            <>
              <div className="capability-group-heading mt-12">
                <span>LOGICIELS UTILISÉS</span>
                <span>STACK ACTIVE</span>
              </div>

              <div className="software-grid">
                {tools.map((tool, index) => (
                  <div key={tool} className="software-card">
                    <span className="software-index">
                      S.{formatIndex(index)}
                    </span>
                    <span className="font-display text-lg uppercase tracking-wide">
                      {tool}
                    </span>
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
