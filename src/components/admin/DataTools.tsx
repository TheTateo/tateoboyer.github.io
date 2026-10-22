import { useRef, useState, type ChangeEvent } from "react";
import { useProjects } from "../../context/ProjectsContext";
import { useSkills } from "../../context/SkillsContext";
import { useCertifications } from "../../context/CertificationsContext";
import { useTimeline } from "../../context/TimelineContext";
import { normalizeTechnologies, useTechnologies } from "../../context/TechnologiesContext";
import {
  normalizeCertifications,
  normalizeAINames,
  normalizeProjects,
  normalizeSkills,
  normalizeSkillCategories,
  normalizeTimeline,
  normalizeTools,
} from "../../lib/normalize";
import type { PortfolioExport } from "../../types";

export default function DataTools() {
  const { projects, replaceProjects, resetProjects } = useProjects();
  const {
    skills,
    categories,
    tools,
    aiNames,
    replaceSkills,
    replaceCategories,
    replaceTools,
    replaceAINames,
    resetSkills,
  } =
    useSkills();
  const { entries, replaceEntries, resetEntries } = useTimeline();
  const { technologies, replaceTechnologies } = useTechnologies();
  const {
    certifications,
    replaceCertifications,
    resetCertifications,
  } = useCertifications();

  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const handleExport = () => {
    const payload: PortfolioExport = {
      version: 1,
      projects,
      technologies,
      skills,
      skillCategories: categories,
      tools,
      aiNames,
      timeline: entries,
      certifications,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio-data.json";
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Export téléchargé : portfolio-data.json");
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const data: unknown = JSON.parse(await file.text());

      if (typeof data !== "object" || data === null || Array.isArray(data)) {
        throw new Error("Format inattendu");
      }

      const record = data as Record<string, unknown>;
      const hasKnownKey = [
        "projects",
        "technologies",
        "skills",
        "skillCategories",
        "tools",
        "aiNames",
        "timeline",
        "certifications",
      ].some((key) => key in record);
      if (!hasKnownKey) throw new Error("Aucune donnée reconnue");

      const importedProjects = "projects" in record
        ? normalizeProjects(record.projects)
        : null;
      if (importedProjects) replaceProjects(importedProjects);
      if ("technologies" in record) {
        replaceTechnologies(normalizeTechnologies(record.technologies));
      } else if (importedProjects) {
        const names = Array.from(
          new Set(importedProjects.flatMap((project) => project.technologies)),
        );
        replaceTechnologies(
          names.map((name, index) => ({ id: `imported-technology-${index}`, name })),
        );
      }
      if ("skills" in record) replaceSkills(normalizeSkills(record.skills));
      if ("skillCategories" in record) {
        replaceCategories(normalizeSkillCategories(record.skillCategories));
      }
      if ("tools" in record) replaceTools(normalizeTools(record.tools));
      if ("aiNames" in record) replaceAINames(normalizeAINames(record.aiNames));
      if ("timeline" in record) {
        replaceEntries(normalizeTimeline(record.timeline));
      }
      if ("certifications" in record) {
        replaceCertifications(normalizeCertifications(record.certifications));
      }

      setMessage("Import réussi : les données ont été remplacées.");
    } catch {
      setMessage("Fichier invalide : rien n'a été modifié.");
    }
  };

  const handleReset = () => {
    if (
      !window.confirm(
        "Remettre les projets, hard skills, logiciels, parcours et certifications aux valeurs par défaut ?",
      )
    ) {
      return;
    }
    resetProjects();
    resetSkills();
    resetEntries();
    resetCertifications();
    replaceTechnologies([]);
    setMessage("Données réinitialisées.");
  };

  return (
    <section className="mt-16 border-t border-white/10 pt-10">
      <p className="mb-2 text-xs tracking-[0.2em] text-white/40">DONNÉES</p>
      <h2 className="mb-3 text-xl font-bold">SAUVEGARDE</h2>
      <p className="mb-6 max-w-2xl text-sm leading-6 text-white/45">
        Tes modifications sont stockées dans ce navigateur uniquement : les
        visiteurs ne les voient pas. Exporte-les pour les sauvegarder, les
        transférer sur un autre appareil.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleExport}
          className="border border-white/20 px-5 py-3 text-xs font-bold tracking-[0.15em] transition hover:border-acid hover:text-acid"
        >
          EXPORTER (JSON)
        </button>
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="border border-white/20 px-5 py-3 text-xs font-bold tracking-[0.15em] transition hover:border-acid hover:text-acid"
        >
          IMPORTER (JSON)
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="border border-white/20 px-5 py-3 text-xs font-bold tracking-[0.15em] text-white/50 transition hover:border-red-400 hover:text-red-400"
        >
          RÉINITIALISER
        </button>

        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          onChange={handleImport}
          className="hidden"
          aria-label="Fichier JSON à importer"
        />
      </div>

      <p role="status" aria-live="polite" className="mt-5 min-h-5 text-sm text-acid">
        {message}
      </p>
    </section>
  );
}
