import {
  defaultProjects,
  defaultSkills,
  defaultTools,
  defaultCertifications,
  defaultTimeline,
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
    return {
      id: asString(item.id) || `skill-legacy-${index}`,
      name: asString(item.name).trim(),
    };
  }).filter((skill) => skill.name !== "");
}

export function normalizeTools(raw: unknown): string[] {
  if (!Array.isArray(raw)) return defaultTools;

  const cleaned = raw
    .filter((tool): tool is string => typeof tool === "string")
    .map((tool) => tool.trim())
    .filter(Boolean);

  return Array.from(new Set(cleaned));
}

export function normalizeTimeline(raw: unknown): TimelineEntry[] {
  if (!Array.isArray(raw)) return defaultTimeline;

  return raw
    .filter(isRecord)
    .map((item, index): TimelineEntry => ({
      id: asString(item.id) || `timeline-legacy-${index}`,
      period: asString(item.period).trim(),
      title: asString(item.title).trim(),
      organization: asString(item.organization).trim(),
      description: asString(item.description).trim(),
    }))
    .filter((entry) => entry.period !== "" && entry.title !== "");
}

export function normalizeCertifications(
  raw: unknown,
): CertificationBadge[] {
  if (!Array.isArray(raw)) return defaultCertifications;

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
