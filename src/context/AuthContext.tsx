import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { supabase } from "../lib/supabase"
/**
 * Protection de l'admin CÔTÉ NAVIGATEUR uniquement.
 *
 * - Le mot de passe n'est jamais écrit en clair : on compare son empreinte SHA-256
 *   avec VITE_ADMIN_PASSWORD_HASH (fichier .env.local).
 * - La session vit dans sessionStorage : elle disparaît à la fermeture de l'onglet.
 *
 * Limite : tout ce qui est dans le bundle front est lisible par un visiteur curieux.
 * C'est suffisant pour masquer l'admin, pas pour protéger une vraie base de données.
 * Avec un backend, on remplacera `login` par un appel serveur.
 */

const ADMIN_USER_ID = String(
import.meta.env.VITE_ADMIN_USER_ID ?? ""
).trim();

type AuthContextValue = {
  isAuthenticated: boolean;
  /** false si VITE_ADMIN_PASSWORD_HASH n'est pas défini : l'admin reste alors verrouillé. */
  isConfigured: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;

    // Vérifie s'il existe déjà une session Supabase
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;

      const userId = data.session?.user.id;
      setIsAuthenticated(
        !error && !!ADMIN_USER_ID && userId === ADMIN_USER_ID
      );
      setIsReady(true);
    });

    // Suit les connexions et déconnexions.
    const {
      data: { subscription},
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;

      setIsAuthenticated(
        !!ADMIN_USER_ID && session?.user.id === ADMIN_USER_ID
      );
      setIsReady(true);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (!ADMIN_USER_ID) return false;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return false;
    }

    // Seul le compte administrateur autorisé peut accéder à l'admin
    if (data.user.id !== ADMIN_USER_ID) {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      return false;
    }

    setIsAuthenticated(true);
    return true;
  },
  []
);

  const logout = useCallback(async (): Promise<void> => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isConfigured: !!ADMIN_USER_ID,
      login,
      logout,
    }),
    [isAuthenticated, login, logout],
  );

  // Evite d'afficher l'interface avant d'avoir vérifié la session
  if (!isReady) {
    return null;
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans <AuthProvider>");
  }
  return context;
}
