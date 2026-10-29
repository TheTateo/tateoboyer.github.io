/** Clés historiques et lecture des anciennes données locales à migrer vers Supabase. */

export const STORAGE_KEYS = {
  projects: "portfolio-projects", // même clé qu'avant : tes projets existants sont conservés
  skills: "portfolio-skills",
  skillCategories: "portfolio-skill-categories",
  tools: "portfolio-tools",
  aiNames: "portfolio-ai-names",
  timeline: "portfolio-timeline",
  certifications: "portfolio-certifications",
} as const;

export function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
}

