import { useState, type CSSProperties } from "react";
import { formatIndex } from "../lib/utils";
import type { Project } from "../types";
import { Arrow } from "./Icons";
import ProjectModal from "./ProjectModal";

type ProjectsShowcaseProps = {
  projects: Project[];
};

export default function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  if (projects.length === 0) {
    return (
      <p className="mt-16 text-sm text-white/40">
        Aucun projet pour le moment.
      </p>
    );
  }

  return (
    <>
      <div className="mt-16 space-y-4">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            className="project group"
            onClick={() => setSelected(project)}
            style={{ "--project-color": project.color } as CSSProperties}
          >
            {project.image && (
              <div className="project-visual">
                <img src={project.image} alt="" />
                <div className="project-scan" />
              </div>
            )}

            <span className="font-display text-sm text-white/30">
              {formatIndex(index)}
            </span>

            <div className="relative z-10 text-left">
              <h3 className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] leading-none tracking-[-0.04em]">
                {project.title}
              </h3>
              {project.technologies.length > 0 && (
                <div className="mt-4 flex max-w-full gap-2 overflow-x-auto pb-1">
                  {project.technologies.map((technology, index) => (
                    <span key={technology} className="flex shrink-0 items-center gap-2">
                      {index > 0 && (
                        <span aria-hidden="true" className="text-acid">·</span>
                      )}
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
                        {technology}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <span className="project-arrow">
              <Arrow diagonal />
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
