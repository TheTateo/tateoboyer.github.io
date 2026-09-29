import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useMouseGlow } from "../hooks/useMouseGlow";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  const { pathname } = useLocation();

  useMouseGlow();

  // Retour en haut à chaque changement de page (sans le défilement animé du CSS)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="overflow-hidden bg-ink text-[#f2f0e9]">
      <div className="cursor-glow" aria-hidden="true" />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
