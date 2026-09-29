import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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

const SESSION_KEY = "portfolio-admin-session";

const PASSWORD_HASH = String(import.meta.env.VITE_ADMIN_PASSWORD_HASH ?? "")
  .trim()
  .toLowerCase();

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function readSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

type AuthContextValue = {
  isAuthenticated: boolean;
  /** false si VITE_ADMIN_PASSWORD_HASH n'est pas défini : l'admin reste alors verrouillé. */
  isConfigured: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readSession);

  const login = useCallback(async (password: string): Promise<boolean> => {
    if (!PASSWORD_HASH) return false;

    try {
      const hash = await sha256(password);
      if (hash !== PASSWORD_HASH) return false;

      sessionStorage.setItem(SESSION_KEY, "1");
      setIsAuthenticated(true);
      return true;
    } catch {
      // crypto.subtle indisponible (page en http hors localhost, par ex.)
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      isConfigured: PASSWORD_HASH !== "",
      login,
      logout,
    }),
    [isAuthenticated, login, logout],
  );

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
