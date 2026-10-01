import { defaultProjects, defaultSkills, defaultTools } from "../data/defaults";
import type { Project, Skill } from "../types";
import { FALLBACK_ACCENT, clamp, isHexColor } from "./utils";

/**
 * Ces fonctions transforment n'importe quelle donnée lue (localStorage ancien format,
 * fichier importé, données corrompues) en données valides pour l'application.
 */

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const asString = (value: unknown): string =>
  typeof value === "string" ? value : "";

export function normalizeProjects(raw: unknown): Project[] {
  if (!Array.isArray(raw)) return defaultProjects;

  return raw
    .filter(isRecord)
    .map((item, index): Project => {
      const color = asString(item.color);

      const legacyType = asString(item.type).trim();

      const technologies = Array.isArray(item.technologies)
        ? item.technologies
            .filter(
              (technology): technology is string =>
                  typeof technology === "string",
            )
              .map((technology) => technology.trim())
              .filter(Boolean)
            : legacyType
              ? [legacyType]
              : [];

      return {
        // Anciennes données : pas d'id -> on en fabrique un stable
        id: asString(item.id) || `legacy-${index}`,
        title: asString(item.title).trim(),
        technologies: Array.from(new Set(technologies)),
        description: asString(item.description).trim(),
        image: asString(item.image).trim(),
        color: isHexColor(color) ? color : FALLBACK_ACCENT,
      };
    })
    .filter((project) => project.title !== "");
}

export function normalizeSkills(raw: unknown): Skill[] {
  if (!Array.isArray(raw)) return defaultSkills;

  return raw.filter(isRecord).map((item, index): Skill => {
    const level = Math.round(Number(item.level));

    return {
      id: asString(item.id) || `skill-legacy-${index}`,
      name: asString(item.name),
      level: Number.isFinite(level) ? clamp(level, 0, 100) : 0,
    };
  });
}

export function normalizeTools(raw: unknown): string[] {
  if (!Array.isArray(raw)) return defaultTools;

  const cleaned = raw
    .filter((tool): tool is string => typeof tool === "string")
    .map((tool) => tool.trim())
    .filter(Boolean);

  return Array.from(new Set(cleaned));
}
