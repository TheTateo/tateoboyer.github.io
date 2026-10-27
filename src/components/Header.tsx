import { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/site";
import { Arrow } from "./Icons";

const navItems = [
  { label: "PROFIL", to: "/#profil" },
  { label: "PROJETS", to: "/#projets" },
  { label: "COMPÉTENCES", to: "/#competences" },
  { label: "PARCOURS", to: "/parcours" },
];

const mobileItems = [...navItems, { label: "CONTACT", to: "/contact" }];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 md:px-10">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3 text-acid"
          aria-label="Retour à l'accueil"
        >
          <img
            src={`${import.meta.env.BASE_URL}spectre.svg`}
            alt="Spectre"
            className="h-12 w-12 object-contain"
          />

          <span className="font-display text-sm font-semibold tracking-[0.24em] text-white">
            {siteConfig.firstName} <span className="text-white/35">/</span>{" "}
            {siteConfig.lastName}
          </span>
        </Link>

        <nav className="hidden items-center gap-9 text-[11px] font-semibold tracking-[0.2em] text-white/60 md:flex">
          {navItems.map((item, index) => (
            <Link key={item.to} to={item.to} className="nav-link">
              <span className="mr-2 text-acid/70">0{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="cut-button hidden items-center gap-6 px-6 py-3 md:flex"
        >
          CONTACT <Arrow />
        </Link>

        <button
          type="button"
          className="relative h-10 w-10 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`menu-line top-[14px] ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`}
          />
          <span
            className={`menu-line top-[24px] ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        {mobileItems.map((item, index) => (
          <Link key={item.to} to={item.to} onClick={closeMenu}>
            <span>0{index + 1}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
