import { Link } from "react-router-dom";
import { Arrow } from "../components/Icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-screen max-w-[1500px] flex-col justify-center px-5 pb-20 pt-32 md:px-10">
      <p className="eyebrow">ERREUR 404</p>
      <h1 className="section-title mt-5">
        PAGE
        <br />
        INTROUVABLE.
      </h1>
      <p className="mt-8 max-w-md text-base leading-8 text-white/55">
        Cette adresse ne mène nulle part. Elle a peut-être été déplacée, ou le
        lien est incorrect.
      </p>
      <Link to="/" className="text-link mt-10 inline-flex w-fit items-center gap-4">
        RETOUR À L&apos;ACCUEIL <Arrow />
      </Link>
    </section>
  );
}
