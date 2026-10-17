import { Link } from "react-router-dom";
import { siteConfig } from "../data/site";
import { Arrow } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-acid px-5 py-24 text-ink md:px-10 md:py-32">
      <div className="footer-symbol" aria-hidden="true">
        <img src="/trois_symboles_exact.svg" alt="" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <p className="text-[10px] font-bold tracking-[0.3em]">PROCHAINE MISSION</p>

        <div className="mt-5 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <h2 className="font-display max-w-5xl text-[clamp(4rem,10vw,9rem)] font-medium uppercase leading-[0.75] tracking-[-0.06em]">
            CRÉONS LE
            <br />
            PROCHAIN MONDE.
            <Link
              to="/admin"
              aria-label="Administration"
              className="ml-1 inline-block text-[#f2f0e9]/20 transition-all duration-300 hover:text-ink"
            >
              .
            </Link>
          </h2>

          <Link
            to="/contact"
            className="contact-orbit"
            aria-label="Me contacter"
          >
            <span>ME CONTACTER</span>
            <Arrow diagonal />
          </Link>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-5 border-t border-black/25 pt-6 text-[10px] font-bold tracking-[0.16em] md:flex-row">
          <span>
            {siteConfig.firstName} {siteConfig.lastName} — PORTFOLIO
          </span>

          <div className="flex gap-7">
            {siteConfig.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-50"
              >
                {social.label}
              </a>
            ))}
          </div>

          <span>FRANCE</span>
        </div>
      </div>
    </footer>
  );
}
