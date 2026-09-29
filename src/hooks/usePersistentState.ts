import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { readJSON, writeJSON } from "../lib/storage";

/**
 * Comme useState, mais la valeur est lue puis sauvegardée dans le localStorage.
 * - Rien n'est écrit tant que la valeur n'a pas changé (un simple visiteur n'écrit rien).
 * - Les modifications faites dans un autre onglet sont synchronisées automatiquement.
 *
 * `normalize` doit être une fonction stable (définie hors du composant).
 */
export function usePersistentState<T>(
  key: string,
  fallback: T,
  normalize: (raw: unknown) => T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const raw = readJSON<unknown>(key);
    return raw === null ? fallback : normalize(raw);
  });

  const initial = useRef(state);
  const hasChanged = useRef(false);

  useEffect(() => {
    if (!hasChanged.current) {
      if (state === initial.current) return;
      hasChanged.current = true;
    }
    writeJSON(key, state);
  }, [key, state]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key || event.newValue === null) return;
      try {
        setState(normalize(JSON.parse(event.newValue)));
      } catch {
        // donnée illisible : on ignore
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, normalize]);

  return [state, setState];
}
