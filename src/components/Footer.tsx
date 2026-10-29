import { Link } from "react-router-dom";
import { siteConfig } from "../data/site";
import footerRoots from "../assets/footer-roots.svg";
import { Arrow } from "./Icons";

const footerRootBranches = [
  { x: 82, y: 57 },
  { x: 178, y: 99 },
  { x: 280, y: 66 },
  { x: 384, y: 110 },
  { x: 492, y: 53 },
  { x: 592, y: 105 },
  { x: 700, y: 63 },
  { x: 802, y: 111 },
  { x: 912, y: 51 },
  { x: 1011, y: 106 },
  { x: 1123, y: 64 },
  { x: 1227, y: 113 },
  { x: 1337, y: 54 },
  { x: 1435, y: 106 },
  { x: 1546, y: 62 },
  { x: 1651, y: 111 },
  { x: 1757, y: 52 },
  { x: 1859, y: 107 },
];

export default function Footer() {
  return (
    <footer className="site-footer relative border-t border-white/10 px-5 py-24 md:px-10 md:py-32">
      <div className="footer-symbol" aria-hidden="true">
        <div className="footer-symbol-fills">
          <span />
          <span />
          <span />
        </div>
        <div className="footer-symbol-art">
          <span className="footer-symbol-art-piece" />
          <span className="footer-symbol-art-piece" />
          <span className="footer-symbol-art-piece" />
        </div>
        <svg className="footer-circuit" viewBox="0 0 1940 620">
          <g className="footer-circuit-traces">
            <path className="footer-route footer-route-hunter" d="M-12 310H10V183L310 10L610 183V310H670V183L970 10L1270 183V310H1330V183L1630 10L1930 183V310H1952" />
            <path className="footer-route footer-route-hunter" d="M-12 310H10V437L310 610L610 437V310H670V437L970 610L1270 437V310H1330V437L1630 610L1930 437V310H1952" />
          </g>
          <g className="footer-circuit-flow">
            <path className="footer-flow-route footer-flow-connected footer-flow-upper" d="M-12 310H10V183L310 10L610 183V310H670V183L970 10L1270 183V310H1330V183L1630 10L1930 183V310H1952" />
            <path className="footer-flow-route footer-flow-connected footer-flow-lower" d="M-12 310H10V437L310 610L610 437V310H670V437L970 610L1270 437V310H1330V437L1630 610L1930 437V310H1952" />
          </g>
        </svg>
        <div className="footer-symbol-emblems">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="footer-content relative z-10 mx-auto max-w-[1240px]">
        <p className="text-[10px] font-bold tracking-[0.3em]">PROCHAINE MISSION</p>

        <div className="mt-5 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <h2 className="font-display max-w-5xl text-[clamp(4rem,10vw,9rem)] font-medium uppercase leading-[0.75] tracking-[-0.06em]">
            CRÉONS LE
            <br />
            PROCHAIN MONDE.
            <Link
              to="/admin"
              aria-label="Administration"
              className="ml-1 inline-flex size-8 items-center justify-center align-middle text-[0.2em] leading-none text-white/[0.12] transition-colors duration-300 hover:text-white/25 focus-visible:text-acid focus-visible:outline focus-visible:outline-1 focus-visible:outline-acid"
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

        <div className="footer-meta relative mt-20 flex flex-col justify-between gap-5 border-t pt-6 text-[10px] font-bold tracking-[0.16em] md:flex-row md:items-center">
          <img
            className="footer-roots"
            src={footerRoots}
            alt=""
            aria-hidden="true"
          />
          <svg
            className="footer-roots-flow"
            viewBox="0 0 1940 110"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="footer-roots-main-flow" pathLength="1" d="M0 82H1940" />
            {footerRootBranches.map(({ x, y }) => (
              <path
                key={x}
                className="footer-root-branch-flow"
                d={`M${x} 82V${y}`}
                pathLength="1"
                style={{ animationDelay: `${(x / 1940) * 9}s` }}
              />
            ))}
          </svg>

          <span className="relative z-10">
            {siteConfig.firstName} {siteConfig.lastName} — PORTFOLIO
          </span>

          <div className="footer-meta-right relative z-10 flex flex-wrap items-center gap-x-6 gap-y-4 md:gap-x-8">
            <div className="flex items-center gap-6">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-meta-link"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <span className="footer-location">FRANCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
