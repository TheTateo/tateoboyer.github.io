import { useEffect } from "react";
import type { Project } from "../types";

const formatProjectDate = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : value;
};

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Fermeture avec Ã‰chap + blocage du scroll de la page derriÃ¨re la modale
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="project-modal"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <button
        type="button"
        className="modal-backdrop"
        onClick={onClose}
        aria-label="Fermer"
      />

      <article className="modal-content">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Fermer le projet"
        >
          <span />
          <span />
        </button>

        {project.image && (
          <img
            src={project.image}
            alt={`Visuel du projet ${project.title}`}
          />
        )}

        <div className="p-7 md:p-10">
          {project.technologies.length > 0 && (
            <p className="eyebrow project-modal-technologies">{project.technologies.join(" · ")}</p>
          )}
          <h2 className="font-display mt-3 text-5xl md:text-7xl">
            {project.title}
          </h2>
          {(project.contributorCount || project.startDate || project.endDate) && (
            <dl className="mt-7 grid gap-5 text-sm text-white/65 sm:grid-cols-2">
              {project.contributorCount && (
                <div>
                  <dt className="text-[10px] font-bold tracking-[0.2em] text-white/35">
                    CONTRIBUTEURS
                  </dt>
                  <dd className="mt-1">
                    {project.contributorCount} personne
                    {project.contributorCount > 1 ? "s" : ""}
                  </dd>
                </div>
              )}
              {(project.startDate || project.endDate) && (
                <div>
                  <dt className="text-[10px] font-bold tracking-[0.2em] text-white/35">
                    PÉRIODE
                  </dt>
                  <dd className="mt-1">
                    {project.startDate ? formatProjectDate(project.startDate) : ""}
                    {project.startDate && project.endDate ? " — " : ""}
                    {project.endDate ? formatProjectDate(project.endDate) : ""}
                  </dd>
                </div>
              )}
            </dl>
          )}
          {project.description && (
            <p className="mt-5 max-w-xl leading-7 text-white/55">
              {project.description}
            </p>
          )}
        </div>
      </article>
    </div>
  );
}
