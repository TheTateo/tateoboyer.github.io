import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type LocationState = { from?: { pathname?: string } } | null;

export default function AdminLogin() {
  const { isAuthenticated, isConfigured, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state as LocationState)?.from?.pathname ?? "/admin";

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading || !password) return;

    setLoading(true);
    setError("");

    const success = await login(password);

    if (success) {
      navigate(from, { replace: true });
      return;
    }

    // Petite pause pour décourager les essais à la chaîne
    await new Promise((resolve) => setTimeout(resolve, 800));
    setError("Mot de passe incorrect.");
    setPassword("");
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5 py-10 text-white">
      <div className="w-full max-w-md border border-white/10 p-8 md:p-10">
        <p className="mb-2 text-xs tracking-[0.25em] text-white/40">
          PORTFOLIO / ADMIN
        </p>
        <h1 className="font-display text-5xl font-medium tracking-tight">
          ACCÈS<span className="text-acid">.</span>
        </h1>

        {!isConfigured ? (
          <div className="mt-8 space-y-4 text-sm leading-6 text-white/60">
            <p role="alert" className="field-error">
              Aucun mot de passe n&apos;est configuré : l&apos;administration
              reste verrouillée.
            </p>
            <p>
              Ajoute la variable <code>VITE_ADMIN_PASSWORD_HASH</code> dans un
              fichier <code>.env.local</code>, puis relance{" "}
              <code>npm run dev</code>. Les instructions sont dans le guide.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
            <div>
              <label htmlFor="password" className="field-label">
                MOT DE PASSE
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? "password-error" : undefined}
                className="field-input"
              />
              {error && (
                <p id="password-error" role="alert" className="field-error">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="cut-button w-full px-6 py-4"
            >
              {loading ? "VÉRIFICATION…" : "SE CONNECTER"}
            </button>
          </form>
        )}

        <Link
          to="/"
          className="mt-8 inline-block text-xs tracking-[0.15em] text-white/40 transition hover:text-acid"
        >
          ← RETOUR AU PORTFOLIO
        </Link>
      </div>
    </main>
  );
}
