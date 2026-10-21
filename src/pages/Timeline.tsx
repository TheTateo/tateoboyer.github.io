import { useTimeline } from "../context/TimelineContext";

export default function Timeline() {
  const { entries } = useTimeline();

  return (
    <section className="relative mx-auto min-h-screen max-w-[1500px] overflow-hidden px-5 pb-28 pt-36 md:px-10 md:pb-40 md:pt-48">
      <div className="section-index">PARCOURS / FORMATION & EXPÉRIENCES</div>

      <header className="mt-12 max-w-3xl">
        <p className="eyebrow">LES ÉTAPES QUI M&apos;ONT CONSTRUIT</p>
        <h1 className="section-title mt-4">MON PARCOURS.</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
          Formations, expériences et moments importants : voici les étapes de
          mon parcours.
        </p>
      </header>

      {entries.length === 0 ? (
        <p className="mt-16 border-t border-white/10 pt-8 text-sm text-white/40">
          Le parcours sera bientôt renseigné.
        </p>
      ) : (
        <ol className="relative mt-16 max-w-4xl border-l border-acid/30 pl-7 md:mt-24 md:pl-12">
          {entries.map((entry) => (
            <li key={entry.id} className="relative pb-12 last:pb-0 md:pb-16">
              <span
                className="absolute -left-[2.15rem] top-1 h-3 w-3 border border-acid bg-ink md:-left-[3.15rem]"
                aria-hidden="true"
              />
              <p className="text-xs font-bold tracking-[0.2em] text-acid">
                {entry.period}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold uppercase tracking-wide md:text-3xl">
                {entry.title}
              </h2>
              {entry.organization && (
                <p className="mt-2 text-sm font-semibold text-white/65">
                  {entry.organization}
                </p>
              )}
              {entry.description && (
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 md:text-base">
                  {entry.description}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
