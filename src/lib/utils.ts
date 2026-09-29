/** Couleur utilisée si la variable CSS --acid est illisible. */
export const FALLBACK_ACCENT = "#ac3acf";

export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** 0 -> "01", 9 -> "10" : le numéro affiché dépend de la position, pas de l'id. */
export function formatIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function isHexColor(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

/** Lit l'accent défini dans index.css (--acid). */
export function getAccentColor(): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--acid")
    .trim();
  return isHexColor(value) ? value : FALLBACK_ACCENT;
}

/** Déplace un élément d'une position vers le haut (-1) ou le bas (1). */
export function moveItem<T extends { id: string }>(
  list: T[],
  id: string,
  direction: -1 | 1,
): T[] {
  const index = list.findIndex((item) => item.id === id);
  const target = index + direction;

  if (index < 0 || target < 0 || target >= list.length) return list;

  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
