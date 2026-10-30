import { useTimeline } from "../context/TimelineContext";

export default function Timeline() {
  const { entries } = useTimeline();

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4 pb-28 pt-28 sm:px-6 sm:pt-36 md:px-10 md:pb-40 md:pt-48 2xl:px-[clamp(4rem,7vw,9rem)]">
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
        <ol className="relative mt-14 w-full pl-7 sm:mt-16 md:mt-24 md:pl-12">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="timeline-entry relative pb-12 last:pb-0 md:pb-16"
            >
              <p className="text-[clamp(.75rem,1vw,.875rem)] font-bold tracking-[0.2em] text-acid">
                {entry.period}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-y-2 lg:grid-cols-[minmax(0,1fr)_minmax(10rem,13rem)_minmax(8rem,9rem)] lg:gap-y-0">
                <h2 className="min-w-0 break-words font-display text-[clamp(1.75rem,3.2vw,3rem)] font-semibold uppercase leading-tight tracking-wide md:col-span-2 md:row-start-1 lg:col-span-1 lg:col-start-1">
                  {entry.title}
                </h2>
                {entry.organization && (
                  <p className="text-[clamp(1rem,1.4vw,1.25rem)] font-semibold text-white/65 md:col-start-1 md:row-start-2 md:mt-2 lg:mt-8">
                    {entry.organization}
                  </p>
                )}
                {entry.diploma && (
                  <aside className="min-w-0 border-l border-acid/35 py-1 pl-4 md:col-start-1 md:row-start-3 md:pl-5 lg:col-start-2 lg:row-start-1">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-acid/70">
                      DIPLÔME
                    </p>
                    <p className="mt-1 break-words font-display text-[clamp(1rem,1.6vw,1.5rem)] font-semibold leading-snug text-white/85">
                      {entry.diploma}
                    </p>
                  </aside>
                )}
                {entry.location && (
                  <aside className="min-w-0 border-l border-acid/35 py-1 pl-4 md:col-start-2 md:row-start-3 md:pl-5 lg:col-start-3 lg:row-start-1">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-acid/70">
                      LIEU
                    </p>
                    <p className="mt-1 break-words text-[clamp(.875rem,1.2vw,1.125rem)] leading-snug text-white/55">
                      {entry.location}
                    </p>
                  </aside>
                )}
              </div>
              {entry.description && (
                <p className="mt-4 max-w-2xl break-words text-[clamp(.875rem,1.2vw,1.125rem)] leading-7 text-white/45">
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
