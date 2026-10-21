import ProfileSection from "../components/sections/ProfileSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import CertificationsSection from "../components/sections/CertificationsSection";
import { siteConfig } from "../data/site";

export default function Home() {
  return (
    <>
      <section className="hero-grid relative flex min-h-screen items-end pt-28">
        <div className="hero-image absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#080a0d_0%,rgba(8,10,13,.88)_34%,rgba(8,10,13,.1)_72%),linear-gradient(0deg,#080a0d_0%,transparent_55%)]" />
        <div className="orb orb-one" aria-hidden="true" />
        <div className="orb orb-two" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-end gap-10 px-5 pb-14 md:px-10 lg:grid-cols-[1.35fr_.65fr] lg:pb-20">
          <div>
            <div className="reveal flex items-center gap-3 text-[10px] font-bold tracking-[0.32em] text-acid">
              <span className="h-px w-9 bg-current" />
              SIGNAL ÉTABLI — {siteConfig.city}
            </div>

            <h1 className="reveal-delay font-display mt-7 max-w-5xl text-[clamp(4.5rem,11vw,10rem)] font-medium uppercase leading-[0.72] tracking-[-0.055em]">
              DESIGNER
              <span className="outline-text block pl-[7vw]">D&apos;AUTRES</span>
              <span className="block">
                MONDES<span className="text-acid">.</span>
              </span>
            </h1>

            <p className="mt-9 max-w-md border-l border-acid pl-5 text-sm leading-7 text-white/55 md:ml-[7vw]">
              Étudiant en design numérique. Je transforme des idées en
              expériences visuelles, interactives et légèrement venues
              d&apos;ailleurs.
            </p>
          </div>

          <div className="hidden justify-self-end lg:block">
            <div className="hud-card">
              <div className="hud-reticle">
                <span />
              </div>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <p className="data-label">STATUT</p>
                  <p className="mt-1 text-xs tracking-[0.15em]">
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
