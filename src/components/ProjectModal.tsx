import { useEffect } from "react";
import type { Project } from "../types";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Fermeture avec Échap + blocage du scroll de la page derrière la modale
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
          <p className="eyebrow">{project.type}</p>
          <h2 className="font-display mt-3 text-5xl md:text-7xl">
            {project.title}
          </h2>
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
