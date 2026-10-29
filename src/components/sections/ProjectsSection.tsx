import { Link } from "react-router-dom";
import { Arrow } from "../Icons";
import ProjectsShowcase from "../ProjectsShowcase";
import { useProjects } from "../../context/ProjectsContext";

const FEATURED_COUNT = 3;

type ProjectsSectionProps = {
  featuredOnly?: boolean;
};

export default function ProjectsSection({ featuredOnly = false }: ProjectsSectionProps) {
  const { projects } = useProjects();
  const displayedProjects = featuredOnly
    ? projects.slice(0, FEATURED_COUNT)
    : projects;

  return (
    <section
      id="projets"
      data-scroll-reveal
      className="relative isolate border-y border-white/10 bg-[#0b0e12] py-28 md:py-40"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="projects-symbol-mask absolute inset-y-[-8%] right-[-12%] w-[86%] bg-acid opacity-[0.055]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">
              {featuredOnly
                ? "ARCHIVES SÉLECTIONNÉES"
                : `${projects.length} PROJET${projects.length > 1 ? "S" : ""}`}
            </p>
            <h2 className="section-title mt-4">PROJETS.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/45">
            Une sélection de projets scolaires et personnels
          </p>
        </div>

        <ProjectsShowcase projects={displayedProjects} />

        {featuredOnly && (
          <Link
            to="/projets"
            className="text-link mt-14 inline-flex items-center gap-4"
          >
            VOIR TOUS LES PROJETS <Arrow />
          </Link>
        )}
      </div>
    </section>
  );
}
