import ProfileSection from "../components/sections/ProfileSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import CertificationsSection from "../components/sections/CertificationsSection";
import { siteConfig } from "../data/site";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-scroll-reveal]");
    const showAll = () => sections.forEach((section) => section.classList.add("scroll-revealed"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("scroll-revealed", entry.isIntersecting);
      });
    }, { threshold: 0 });

    sections.forEach((section) => {
      section.classList.add("scroll-reveal-pending");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="hero-grid relative flex min-h-screen items-end pt-28">
        <div className="hero-visual absolute inset-0" aria-hidden="true">
          <div className="hero-image absolute inset-0" />
          <div className="hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 grid w-full grid-cols-1 items-end gap-10 px-5 pb-14 md:px-10 lg:pb-20 2xl:px-[clamp(4rem,7vw,9rem)]">
          <div>
            <div className="reveal flex items-center gap-3 text-[10px] font-bold tracking-[0.32em] text-acid">
              <span className="h-px w-9 bg-current" />
              SIGNAL ÉTABLI — {siteConfig.city}
            </div>

            <h1 className="reveal-delay font-display mt-7 max-w-5xl text-[clamp(4.5rem,9vw,8rem)] 2xl:text-[clamp(4.5rem,8.5vw,7.6rem)] font-medium uppercase leading-[0.72] tracking-[-0.055em]">
              BIENVENUE
              <span className="outline-text block pl-[7vw]">DANS</span>
              <span className="block">
                MON UNIVERS<span className="text-acid">.</span>
              </span>
            </h1>

            <div className="hud-card hero-status-card">
              <div className="flex items-end justify-between">
                <div>
                  <p className="data-label">STATUT</p>
                  <p className="hero-status-value mt-1 text-xs tracking-[0.15em]">
                    {siteConfig.availability}
                  </p>
                </div>
                <div className="status-dot" />
              </div>
            </div>
          </div>
        </div>

        <a
          href="#profil"
          className="absolute bottom-8 right-6 z-20 hidden items-center gap-4 md:flex md:right-10"
        >
          <span className="text-[9px] font-bold tracking-[0.3em] text-white/40">
            EXPLORER
          </span>
          <span className="flex h-11 w-11 items-center justify-center border border-white/20">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 animate-bounce"
              aria-hidden="true"
            >
              <path d="M12 4v15m-5-5 5 5 5-5" fill="none" stroke="currentColor" />
            </svg>
          </span>
        </a>
      </section>

      <ProfileSection />
      <ProjectsSection featuredOnly />
      <SkillsSection />
      <CertificationsSection />
    </>
  );
}
