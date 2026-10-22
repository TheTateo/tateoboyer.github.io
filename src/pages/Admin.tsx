import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CertificationsManager from "../components/admin/CertificationsManager";
import DataTools from "../components/admin/DataTools";
import ProjectsManager from "../components/admin/ProjectsManager";
import SkillsManager from "../components/admin/SkillsManager";
import TimelineManager from "../components/admin/TimelineManager";
import TechnologiesManager from "../components/admin/TechnologiesManager";
import { useAuth } from "../context/AuthContext";

type Tab =
  | "projects"
  | "skills"
  | "technologies"
  | "timeline"
  | "certifications";

const tabs: { id: Tab; label: string }[] = [
  { id: "projects", label: "PROJETS" },
  { id: "skills", label: "COMPÉTENCES" },
  { id: "technologies", label: "TECHNOLOGIES" },
  { id: "timeline", label: "PARCOURS" },
  { id: "certifications", label: "CERTIFICATIONS" },
];

export default function Admin() {
  const [tab, setTab] = useState<Tab>("projects");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <main className="admin-shell min-h-screen bg-ink px-6 py-8 text-white md:px-12 md:py-10 lg:px-16">
      <div className="mx-auto max-w-[1240px]">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-5">
          <div>
            <p className="mb-2 text-xs tracking-[0.25em] text-white/40">
              PORTFOLIO / ADMIN
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {tab === "projects"
                ? "PROJETS"
                : tab === "skills"
                  ? "COMPÉTENCES"
                  : tab === "technologies"
                    ? "TECHNOLOGIES"
                    : tab === "timeline"
                      ? "PARCOURS"
                      : "CERTIFICATIONS"}
              <span className="text-acid">.</span>
            </h1>
          </div>

          <div className="flex gap-3">
            <Link
              to="/"
              className="border border-white/20 px-4 py-3 text-xs font-bold tracking-[0.15em] transition hover:border-acid hover:text-acid"
            >
              ← PORTFOLIO
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="border border-white/20 px-4 py-3 text-xs font-bold tracking-[0.15em] transition hover:border-red-400 hover:text-red-400"
            >
              DÉCONNEXION
            </button>
          </div>
        </header>

        <div
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Sections"
        >
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={`px-4 py-2.5 text-xs font-bold tracking-[0.15em] transition ${
                tab === item.id
                  ? "bg-acid text-ink"
                  : "border border-white/15 text-white/60 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === "projects" ? (
          <ProjectsManager />
        ) : tab === "skills" ? (
          <SkillsManager />
        ) : tab === "technologies" ? (
          <TechnologiesManager />
        ) : tab === "timeline" ? (
          <TimelineManager />
        ) : (
          <CertificationsManager />
        )}

        <DataTools />
      </div>
    </main>
  );
}
