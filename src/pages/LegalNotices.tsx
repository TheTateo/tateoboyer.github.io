import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/site";
import { Arrow } from "../components/Icons";

function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-white/10 pt-6">
      <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">
        {title}
      </h2>
      <div className="legal-copy mt-4 space-y-4 text-sm leading-7 text-white/60">
        {children}
      </div>
    </section>
  );
}

export default function LegalNotices() {
  return (
    <section className="min-h-screen w-full px-5 pb-28 pt-36 md:px-10 md:pb-40 md:pt-48 2xl:px-[clamp(4rem,7vw,9rem)]">
      <div className="section-index">INFORMATIONS / TRANSPARENCE</div>
      <header className="mt-12 max-w-3xl">
        <p className="eyebrow">
          PORTFOLIO DE {siteConfig.firstName} {siteConfig.lastName}
        </p>
        <h1 className="section-title mt-4">MENTIONS LÉGALES.</h1>
        <p className="mt-6 text-sm text-white/45">
          Dernière mise à jour : 29 octobre 2026
        </p>
      </header>

      <Link to="/" className="text-link mt-8 inline-flex items-center gap-4">
        <span className="rotate-180"><Arrow /></span>
        RETOUR À L’ACCUEIL
      </Link>

      <div className="mt-14 max-w-3xl space-y-10">
        <LegalSection title="Éditeur du site">
          <p>
            Ce portfolio est édité à titre personnel par {siteConfig.firstName}{" "}
            {siteConfig.lastName}.
          </p>
          <p>
            Contact : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <p>
            Directeur de la publication : {siteConfig.firstName} {siteConfig.lastName}.
          </p>
        </LegalSection>

        <LegalSection title="Hébergement">
          <p>Le site est hébergé par GitHub Pages, service de GitHub, Inc.</p>
          <address>
            GitHub, Inc.<br />
            88 Colin P. Kelly Jr. Street<br />
            San Francisco, CA 94107, États-Unis
          </address>
          <p>
            GitHub ne propose pas d’assistance téléphonique. L’hébergeur peut
            être contacté via son{" "}
            <a href="https://support.github.com/" target="_blank" rel="noreferrer">
              support en ligne
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="Données personnelles">
          <p>
            Le formulaire de contact recueille le nom, l’adresse e-mail et le
            message afin de répondre aux demandes. Ces informations sont
            nécessaires à l’envoi du formulaire. Le traitement repose sur
            l’intérêt légitime de l’éditeur à répondre aux sollicitations
            reçues.
          </p>
          <p>
            Les messages sont transmis à Formspree, le prestataire de formulaire
            configuré sur ce site, puis à l’éditeur. Formspree indique héberger
            son service aux États-Unis ; les données peuvent donc être traitées
            hors de l’Union européenne, conformément aux garanties annoncées par
            le prestataire.
          </p>
          <p>
            Les demandes sont conservées le temps de leur traitement, puis
            supprimées au plus tard 12 mois après le dernier échange, sauf
            nécessité de conservation liée à une obligation légale ou à la
            défense de droits. La suppression doit également être effectuée
            dans l’espace Formspree.
          </p>
          <p>
            Pour exercer vos droits d’accès, de rectification, d’effacement ou
            de limitation, contactez l’éditeur à{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Vous
            pouvez aussi adresser une réclamation à la{" "}
            <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noreferrer">
              CNIL
            </a>
            .
          </p>
          <p>
            Supabase est utilisé pour charger les contenus du portfolio et gérer
            l’accès à l’espace d’administration. Les contenus publics du
            portfolio y sont stockés ; les identifiants de l’administrateur
            sont traités par Supabase pour l’authentification.
          </p>
        </LegalSection>

        <LegalSection title="Cookies et services tiers">
          <p>
            Le code du site n’intègre pas d’outil publicitaire ni de mesure
            d’audience. Les polices sont chargées depuis Google Fonts, ce qui
            entraîne une requête vers les serveurs de Google lors de
            l’affichage des pages.
          </p>
          <p>
            Les liens vers les réseaux sociaux ne transmettent aucune donnée à
            ces services tant qu’ils ne sont pas ouverts.
          </p>
        </LegalSection>

        <LegalSection title="Propriété intellectuelle">
          <p>
            Sauf mention contraire, les textes, créations graphiques et
            éléments de mise en page réalisés pour ce portfolio sont la
            propriété de leur auteur. Les marques, œuvres et contenus
            appartenant à des tiers restent la propriété de leurs ayants droit.
            Toute réutilisation d’un contenu protégé nécessite l’autorisation
            de son titulaire.
          </p>
        </LegalSection>
      </div>
    </section>
  );
}
