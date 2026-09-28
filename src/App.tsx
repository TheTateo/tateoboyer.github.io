import { useEffect, useState } from "react";
import { projects, type Project } from "./data/projects";
import Admin from "./components/Admin";

const skills = [
  { name: "Direction artistique", level: 92 },
  { name: "UI / UX Design", level: 88 },
  { name: "Motion Design", level: 76 },
  { name: "Développement créatif", level: 68 },
];

function Mark() {
  return (
    <svg viewBox="0 0 44 44" className="h-8 w-8" aria-hidden="true">
      <path d="M22 2 42 13v18L22 42 2 31V13Z" fill="none" stroke="currentColor" />
      <path d="m22 9 8 13-8 13-8-13Z" fill="currentColor" />
      <circle cx="22" cy="22" r="3.5" fill="#080a0d" />
    </svg>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      {diagonal ? (
        <path d="M7 17 17 7m-8 0h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      ) : (
        <path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectList, setProjectList] = useState<Project[]>(() => {
    try {
      const savedProjects = localStorage.getItem("portfolio-projects");

      return savedProjects
        ? JSON.parse(savedProjects)
        : projects;
    } catch {
      return projects;
    }
  });

  const [isAdmin, setIsAdmin] = useState(
    window.location.hash === "#admin"
  );

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
      document.documentElement.style.setProperty("--px", `${(event.clientX / innerWidth - 0.5) * 18}px`);
      document.documentElement.style.setProperty("--py", `${(event.clientY / innerHeight - 0.5) * 18}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="overflow-hidden bg-[#080a0d] text-[#f2f0e9]">
      <div className="cursor-glow" aria-hidden="true" />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080a0d]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 md:px-10">
          <a href="#accueil" className="flex items-center gap-3 text-[#d8ff55]" aria-label="Retour à l'accueil">
            <img
              src="/spectre.svg"
              alt="Spectre"
              className="h-12 w-12 object-contain text-[#d8ff55]"
            />

            <span className="font-display text-sm font-semibold tracking-[0.24em] text-white">
              TATEO <span className="text-white/35">/</span> BOYER
            </span>
          </a>

          <nav className="hidden items-center gap-9 text-[11px] font-semibold tracking-[0.2em] text-white/60 md:flex">
            {[
              ["PROFIL", "#profil"],
              ["PROJETS", "#projets"],
              ["COMPÉTENCES", "#competences"],
            ].map(([label, href], index) => (
              <a key={href} href={href} className="nav-link">
                <span className="mr-2 text-[#d8ff55]/70">0{index + 1}</span>
                {label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="cut-button hidden items-center gap-6 px-6 py-3 md:flex">
            CONTACT <Arrow />
          </a>
          <button
            className="relative h-10 w-10 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
          >
            <span className={`menu-line top-[14px] ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`menu-line top-[24px] ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
          {["profil", "projets", "competences", "contact"].map((item, index) => (
            <a key={item} href={`#${item}`} onClick={closeMenu}>
              <span>0{index + 1}</span> {item}
              <svg
              viewBox="0 0 620 620"
              className="h-12 w-12"
              role="img"
              aria-label="Emblème de classe"
              ></svg>
            </a>
          ))}
        </div>
      </header>

      <section id="accueil" className="hero-grid relative flex min-h-screen items-end pt-28">
        <div className="hero-image absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#080a0d_0%,rgba(8,10,13,.88)_34%,rgba(8,10,13,.1)_72%),linear-gradient(0deg,#080a0d_0%,transparent_55%)]" />
        <div className="orb orb-one" aria-hidden="true" />
        <div className="orb orb-two" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-end gap-10 px-5 pb-14 md:px-10 lg:grid-cols-[1.35fr_.65fr] lg:pb-20">
          <div>
            <div className="reveal flex items-center gap-3 text-[10px] font-bold tracking-[0.32em] text-[#d8ff55]">
              <span className="h-px w-9 bg-current" />
              SIGNAL ÉTABLI — STRASBOURG, FR
            </div>
            <h1 className="reveal-delay font-display mt-7 max-w-5xl text-[clamp(4.5rem,11vw,10rem)] font-medium uppercase leading-[0.72] tracking-[-0.055em]">
              DESIGNER
              <span className="outline-text block pl-[7vw]">D&apos;AUTRES</span>
              <span className="block">MONDES<span className="text-[#d8ff55]">.</span></span>
            </h1>
            <p className="mt-9 max-w-md border-l border-[#d8ff55] pl-5 text-sm leading-7 text-white/55 md:ml-[7vw]">
              Étudiant en design numérique. Je transforme des idées en expériences visuelles, interactives et
              légèrement venues d&apos;ailleurs.
            </p>
          </div>

          <div className="hidden justify-self-end lg:block">
            <div className="hud-card">
              <div className="hud-reticle">
                <span />
              </div>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <p className="data-label">STATUT</p>
                  <p className="mt-1 text-xs tracking-[0.15em]">DISPONIBLE POUR UN STAGE</p>
                </div>
                <div className="status-dot" />
              </div>
            </div>
          </div>
        </div>

        <a href="#profil" className="absolute bottom-8 right-6 z-20 hidden items-center gap-4 md:flex md:right-10">
          <span className="text-[9px] font-bold tracking-[0.3em] text-white/40">EXPLORER</span>
          <span className="flex h-11 w-11 items-center justify-center border border-white/20">
            <svg viewBox="0 0 24 24" className="h-4 w-4 animate-bounce" aria-hidden="true">
              <path d="M12 4v15m-5-5 5 5 5-5" fill="none" stroke="currentColor" />
            </svg>
          </span>
        </a>
      </section>

      <section id="profil" 
              className="relative mx-auto max-w-[1500px] overflow-hidden px-5 py-28 md:px-10 md:py-40">

        <div
            className="absolute inset-y-[-8%] right-[-12%] w-[86%] bg-[#d8ff55] opacity-[0.055]"
            style={{
              WebkitMaskImage: "url('/symbole_chasseur.svg')",
              WebkitMaskPosition: "center right",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskImage: "url('/symbole_chasseur.svg')",
              maskPosition: "center right",
              maskRepeat: "no-repeat",
              maskSize: "contain",
            }}
        />

        <div className="section-index">01 / IDENTITÉ</div>
        <div className="mt-12 grid gap-16 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
          <div className="relative">
            <div className="portrait-frame">
              <div className="portrait-placeholder relative">
                <img
                  src="/photo.png"
                  alt="Portrait de Tateo"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />

                <span className="absolute bottom-5 left-5 z-10">
                  ARCHIVE PERSONNELLE
                </span>
              </div>
            </div>
            <div className="absolute -bottom-7 -right-3 border border-white/15 bg-[#080a0d] p-4 md:right-8">
              <div className="font-display text-3xl text-[#d8ff55]">LVL. 40</div>
              <div className="data-label">ETUDIANT EPITECH</div>
            </div>
          </div>
          <div className="self-center">
            <p className="eyebrow">À PROPOS DU JOUEUR</p>
            <h2 className="section-title mt-5">CRÉER, C&apos;EST<br />EXPLORER.</h2>
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
              Je m&apos;appelle Tateo, designer pluridisciplinaire fasciné par les interfaces qui racontent une histoire.
              Mon terrain de jeu se situe entre clarté fonctionnelle et imaginaire science-fictionnel.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/55">
              Chaque projet est une nouvelle planète : je l&apos;observe, je comprends ses lois, puis je construis le
              système visuel qui lui donnera vie.
            </p>
            <a href="#contact" className="text-link mt-10 inline-flex items-center gap-4">
              TÉLÉCHARGER MON CV <Arrow diagonal />
            </a>
          </div>
        </div>
      </section>

      <section id="projets" className="border-y border-white/10 bg-[#0b0e12] py-28 md:py-40">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">ARCHIVES SÉLECTIONNÉES</p>
              <h2 className="section-title mt-4">PROJETS.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/45">
              Une sélection de projets scolaires et personnels à la croisée du design, du mouvement et du code.
            </p>
          </div>

          <div className="mt-16 space-y-4">
            {projects.map((project) => (
              <button
                key={project.number}
                className="project group"
                onClick={() => setSelectedProject(project)}
                style={{ "--project-color": project.color } as React.CSSProperties}
              >
                <div className="project-visual">
                  <img src={project.image} alt="" />
                  <div className="project-scan" />
                </div>
                <span className="font-display text-sm text-white/30">{project.number}</span>
                <div className="relative z-10 text-left">
                  <h3 className="font-display text-[clamp(2.5rem,7vw,6.6rem)] leading-none tracking-[-0.04em]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    {project.type}
                  </p>
                </div>
                <span className="project-arrow"><Arrow diagonal /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="competences" className="relative mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-40">
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
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-row">
                <div className="mb-4 flex items-end justify-between">
                  <span className="font-display text-xl uppercase tracking-wide">
                    <span className="mr-4 text-xs text-[#d8ff55]">0{index + 1}</span>
                    {skill.name}
                  </span>
                  <span className="data-label">{skill.level}%</span>
                </div>
                <div className="h-px bg-white/10">
                  <div className="skill-level" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
            <div className="mt-10 flex flex-wrap gap-2">
              {["FIGMA", "ADOBE CC", "BLENDER", "AFTER EFFECTS", "REACT", "WEBGL"].map((tool) => (
                <span key={tool} className="tech-chip">{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="relative border-t border-white/10 bg-[#d8ff55] px-5 py-24 text-[#080a0d] md:px-10 md:py-32">
        <div className="footer-symbol" aria-hidden="true"><Mark /></div>
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <p className="text-[10px] font-bold tracking-[0.3em]">PROCHAINE MISSION</p>
          <div className="mt-5 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <h2 className="font-display max-w-5xl text-[clamp(4rem,10vw,9rem)] font-medium uppercase leading-[0.75] tracking-[-0.06em]">
              CRÉONS LE<br />PROCHAIN MONDE.
            </h2>
            <a href="mailto:tateovanai67@gmail.com" className="contact-orbit" aria-label="Envoyer un e-mail">
              <span>ME CONTACTER</span><Arrow diagonal />
            </a>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-5 border-t border-black/25 pt-6 text-[10px] font-bold tracking-[0.16em] md:flex-row">
            <span>TATEO BOYER — PORTFOLIO</span>
            <div className="flex gap-7">
              <a href="#" className="hover:opacity-50">GITHUB</a>
              <a href="#" className="hover:opacity-50">LINKEDIN</a>
              <a href="#" className="hover:opacity-50">LINKEDIN</a>
            </div>
            <span>FRANCE</span>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={selectedProject.title}>
          <button className="modal-backdrop" onClick={() => setSelectedProject(null)} aria-label="Fermer" />
          <article className="modal-content">
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Fermer le projet">
              <span />
              <span />
            </button>
            <img src={selectedProject.image} alt={`Visuel abstrait du projet ${selectedProject.title}`} />
            <div className="p-7 md:p-10">
              <p className="eyebrow">{selectedProject.type}</p>
              <h2 className="font-display mt-3 text-5xl md:text-7xl">{selectedProject.title}</h2>
              <p className="mt-5 max-w-xl leading-7 text-white/55">{selectedProject.description}</p>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}