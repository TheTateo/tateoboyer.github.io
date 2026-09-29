import { Link } from "react-router-dom";
import { Arrow } from "../Icons";
import { siteConfig } from "../../data/site";

export default function ProfileSection() {
  return (
    <section
      id="profil"
      className="relative mx-auto max-w-[1500px] overflow-hidden px-5 pb-28 pt-36 md:px-10 md:pb-40 md:pt-48"
    >
      <div
        className="absolute inset-y-[-8%] right-[-12%] w-[86%] bg-acid opacity-[0.055]"
        aria-hidden="true"
        style={{
          WebkitMaskImage: "url('/symbole_chasseur.svg')",
          WebkitMaskPosition: "center right",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskImage: "url('/symbole_chasseur.svg')",
          maskPosition: "center right",
          maskRepeat: "no-repeat",
          maskSize: "contain",
        }}
      />

      <div className="section-index">01 / IDENTITÉ</div>

      <div className="mt-12 grid gap-16 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
        <div className="relative">
          <div className="portrait-frame">
            <div className="portrait-placeholder relative">
              <img
                src="/photo.png"
                alt={`Portrait de ${siteConfig.firstName}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <span className="absolute bottom-5 left-5 z-10">
                ARCHIVE PERSONNELLE
              </span>
            </div>
          </div>

          <div className="absolute -bottom-7 -right-3 border border-white/15 bg-ink p-4 md:right-8">
            <div className="font-display text-3xl text-acid">LVL. 40</div>
            <div className="data-label">ETUDIANT EPITECH</div>
          </div>
        </div>

        <div className="self-center">
          <p className="eyebrow">À PROPOS DU JOUEUR</p>
          <h2 className="section-title mt-5">
            CRÉER, C&apos;EST
            <br />
            EXPLORER.
          </h2>

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
            Je m&apos;appelle Tateo, designer pluridisciplinaire fasciné par les
            interfaces qui racontent une histoire. Mon terrain de jeu se situe
            entre clarté fonctionnelle et imaginaire science-fictionnel.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/55">
            Chaque projet est une nouvelle planète : je l&apos;observe, je
            comprends ses lois, puis je construis le système visuel qui lui
            donnera vie.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
            <a
              href={siteConfig.cvUrl}
              download
              className="text-link inline-flex items-center gap-4"
            >
              TÉLÉCHARGER MON CV <Arrow diagonal />
            </a>
            <a
              href="#competences"
              className="text-link inline-flex items-center gap-4"
            >
              VOIR MES COMPÉTENCES <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
