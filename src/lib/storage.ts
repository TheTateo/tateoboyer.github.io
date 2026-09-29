/**
 * Couche d'accès aux données persistées.
 * Tout ce qui touche à localStorage passe par ici : le jour où tu passes
 * à un backend (Supabase, Firebase...), c'est ce fichier + les contextes qu'on adapte.
 */

export const STORAGE_KEYS = {
  projects: "portfolio-projects", // même clé qu'avant : tes projets existants sont conservés
  skills: "portfolio-skills",
  tools: "portfolio-tools",
} as const;

export function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Impossible d'écrire "${key}" dans le localStorage`, error);
  }
}
