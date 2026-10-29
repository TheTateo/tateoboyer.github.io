import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { readJSON } from "../lib/storage";

function reportSupabaseError(error: { message: string }, key: string, action: string) {
  console.error(`Impossible de ${action} les données « ${key} » dans Supabase`, error);
  window.dispatchEvent(
    new CustomEvent("portfolio:supabase-error", {
      detail: `Erreur Supabase (${key}) : ${error.message}`,
    }),
  );
}

/** Persists one portfolio collection in the portfolio_data table. */
export function useSupabaseState<T>(
  key: string,
  fallback: T,
  normalize: (raw: unknown) => T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(fallback);
  const [loaded, setLoaded] = useState(false);
  const [canPersist, setCanPersist] = useState(false);
  const { isAuthenticated } = useAuth();
  const saveQueue = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let active = true;
    setLoaded(false);
    setCanPersist(false);

    void (async () => {
      const { data, error } = await supabase
        .from("portfolio_data")
        .select("data")
        .eq("key", key)
        .maybeSingle();

      if (!active) return;
      if (error) {
        reportSupabaseError(error, key, "charger");
        setLoaded(true);
        return;
      }

      setCanPersist(true);
      if (data) {
        setState(normalize(data.data));
      } else if (isAuthenticated) {
        // Migre les données déjà présentes dans le navigateur administrateur.
        const legacyData = readJSON<unknown>(key);
        if (legacyData !== null) setState(normalize(legacyData));
      }
      setLoaded(true);
    })();

    return () => {
      active = false;
    };
  }, [isAuthenticated, key, normalize]);

  useEffect(() => {
    if (!loaded || !canPersist || !isAuthenticated) return;

    saveQueue.current = saveQueue.current.then(async () => {
      try {
        const { error } = await supabase
          .from("portfolio_data")
          .upsert({ key, data: state }, { onConflict: "key" });
        if (error) reportSupabaseError(error, key, "enregistrer");
      } catch (error) {
        reportSupabaseError(
          { message: error instanceof Error ? error.message : "Erreur réseau" },
          key,
          "enregistrer",
        );
      }
    });
  }, [canPersist, isAuthenticated, key, loaded, state]);

  const updateState = useCallback<Dispatch<SetStateAction<T>>>((next) => {
    setState(next);
  }, []);

  return [state, updateState];
}
