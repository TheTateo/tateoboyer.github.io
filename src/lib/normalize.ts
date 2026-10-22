import {
  defaultSkillCategories,
} from "../data/defaults";
import type {
  CertificationBadge,
  Project,
  Skill,
  TimelineEntry,
} from "../types";
import { FALLBACK_ACCENT, isHexColor } from "./utils";

/**
 * Ces fonctions transforment n'importe quelle donnée lue (localStorage ancien format,
 * fichier importé, données corrompues) en données valides pour l'application.
 */

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const asString = (value: unknown): string =>
  typeof value === "string" ? value : "";

const normalizeHttpUrl = (value: unknown): string => {
  const url = asString(value).trim();
  if (!url) return "";

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:"
      ? url
      : "";
  } catch {
    return "";
  }
};

export function normalizeProjects(raw: unknown): Project[] {
  if (!Array.isArray(raw)) return [];

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
        contributorCount:
          typeof item.contributorCount === "number" &&
          Number.isInteger(item.contributorCount) &&
          item.contributorCount > 0
            ? item.contributorCount
            : undefined,
        startDate: asString(item.startDate).trim(),
        endDate: asString(item.endDate).trim(),
        image: asString(item.image).trim(),
        imageSource:
          item.imageSource === "upload" || asString(item.image).startsWith("data:")
            ? "upload"
            : "url",
        color: isHexColor(color) ? color : FALLBACK_ACCENT,
      };
    })
    .filter((project) => project.title !== "");
}

export function normalizeSkills(raw: unknown): Skill[] {
  if (!Array.isArray(raw)) return [];

  return raw.filter(isRecord).map((item, index): Skill => {
    return {
      id: asString(item.id) || `skill-legacy-${index}`,
      name: asString(item.name).trim(),
      category: asString(item.category).trim() === "Autres"
        ? ""
        : asString(item.category).trim(),
    };
  }).filter((skill) => skill.name !== "");
}

export function normalizeSkillCategories(raw: unknown): string[] {
  if (!Array.isArray(raw)) return defaultSkillCategories;

  const categories = raw
    .filter((category): category is string => typeof category === "string")
    .map((category) => category.trim())
    .filter(Boolean);

  return Array.from(new Set(categories.filter((category) => category !== "Autres")));
}

export function normalizeTools(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];

  const cleaned = raw
    .filter((tool): tool is string => typeof tool === "string")
    .map((tool) => tool.trim())
    .filter(Boolean);

  return Array.from(new Set(cleaned));
}

export function normalizeAINames(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];

  const names = raw
    .filter((name): name is string => typeof name === "string")
    .map((name) => name.trim())
    .filter(Boolean);

  return Array.from(new Set(names));
}

export function normalizeTimeline(raw: unknown): TimelineEntry[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter(isRecord)
    .map((item, index): TimelineEntry => ({
      id: asString(item.id) || `timeline-legacy-${index}`,
      period: asString(item.period).trim(),
      title: asString(item.title).trim(),
      organization: asString(item.organization).trim(),
      location: asString(item.location).trim(),
      diploma: asString(item.diploma).trim(),
      description: asString(item.description).trim(),
    }))
    .filter((entry) => entry.period !== "" && entry.title !== "");
}

export function normalizeCertifications(
  raw: unknown,
): CertificationBadge[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter(isRecord)
    .map((item, index): CertificationBadge => ({
      id: asString(item.id) || `certification-legacy-${index}`,
      type: item.type === "badge" ? "badge" : "certification",
      title: asString(item.title).trim(),
      issuer: asString(item.issuer).trim(),
      date: asString(item.date).trim(),
      description: asString(item.description).trim(),
      credentialUrl: normalizeHttpUrl(item.credentialUrl),
    }))
    .filter((certification) => certification.title !== "");
}
