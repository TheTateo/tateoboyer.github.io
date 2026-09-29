import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTools from "../components/admin/DataTools";
import ProjectsManager from "../components/admin/ProjectsManager";
import SkillsManager from "../components/admin/SkillsManager";
import { useAuth } from "../context/AuthContext";

type Tab = "projects" | "skills";

const tabs: { id: Tab; label: string }[] = [
  { id: "projects", label: "PROJETS" },
  { id: "skills", label: "COMPÉTENCES" },
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
    <main className="min-h-screen bg-ink px-5 py-10 text-white md:px-10 md:py-16">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="mb-2 text-xs tracking-[0.25em] text-white/40">
              PORTFOLIO / ADMIN
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              {tab === "projects" ? "PROJETS" : "COMPÉTENCES"}
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

        <div className="mb-10 flex gap-2" role="tablist" aria-label="Sections">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={`px-5 py-3 text-xs font-bold tracking-[0.15em] transition ${
                tab === item.id
                  ? "bg-acid text-ink"
                  : "border border-white/15 text-white/60 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === "projects" ? <ProjectsManager /> : <SkillsManager />}

        <DataTools />
      </div>
    </main>
  );
}
