/* Page d'accueil — « Le carnet ».
   Tous les composants sont dessinés ici (aucune bibliothèque d'UI) :
   en-tête courante, compteurs animés, sommaire à pointillés, index de
   fin d'ouvrage, cachet tournant.
   Bilingue (fr/en). Le titre h2 français est figé : un test s'appuie dessus. */
import { useEffect, useState } from "react";
import { ArrowRight, Github } from "lucide-react";
import { NAV } from "../../app/nav.js";
import { useLang } from "../../i18n/lang.jsx";
import { CAT_EN, GROUP_EN, NAV_EN } from "../../i18n/ui.js";

const REPO = "https://github.com/tomvieilledent/holberton-spe-fullstack";

const COPY = {
  fr: {
    runLeft: "Carnet de révision",
    runRight: "Spécialisation Full Stack",
    kicker: "vlldnt.fr",
    title: "Holberton — Spécialisation Full Stack",
    tagline: "Le carnet de révision de l'année, mis à jour à chaque notion.",
    lead: "Toutes les notions vues depuis le début de la spécialisation, regroupées par domaine et reliées entre elles : front, back, bases de données, DevOps, CI/CD, modélisation et IA agentique. La barre latérale ouvre chaque section ; la recherche retrouve une notion par mot-clé.",
    cta: "Ouvrir le sommaire",
    statsAria: "En chiffres",
    statTopics: "fiches",
    statModules: "modules",
    statDomains: "domaines",
    tocTitle: "Sommaire",
    tocSub: "Cinq domaines, du navigateur à la base de données.",
    fichesWord: (n) => `${n} fiche${n > 1 ? "s" : ""}`,
    indexTitle: "Index",
    indexSub: "Toutes les fiches, dans l'ordre du programme.",
    colophon: "Écrit et tenu à jour tout au long de l'année.",
  },
  en: {
    runLeft: "Revision notebook",
    runRight: "Full Stack Specialization",
    kicker: "vlldnt.fr",
    title: "Holberton — Full Stack Specialization",
    tagline: "The year's revision notebook, updated with every new topic.",
    lead: "Every topic covered since the start of the specialization, grouped by domain and cross-linked: frontend, backend, databases, DevOps, CI/CD, modeling and agentic AI. The sidebar opens each section; search finds a topic by keyword.",
    cta: "Open the contents",
    statsAria: "In numbers",
    statTopics: "topics",
    statModules: "modules",
    statDomains: "domains",
    tocTitle: "Contents",
    tocSub: "Five domains, from the browser to the database.",
    fichesWord: (n) => `${n} topic${n > 1 ? "s" : ""}`,
    indexTitle: "Index",
    indexSub: "Every topic, in programme order.",
    colophon: "Written and kept up to date across the year.",
  },
};

function countSections(cat) {
  return cat.groups.reduce((n, g) => n + g.items.length, 0);
}

function firstId(cat) {
  return cat.groups[0]?.items[0]?.id;
}

/* Compteur animé au montage. jsdom n'a pas matchMedia : on affiche
   alors directement la valeur finale, sans animation. */
function Stat({ value, label }) {
  const [n, setN] = useState(value);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setN(value);
      return undefined;
    }
    let raf;
    const start = performance.now();
    const dur = 1000;
    setN(0);
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div className="home__stat">
      <span className="home__stat-num">{n}</span>
      <span className="home__stat-label">{label}</span>
    </div>
  );
}

/* Cachet : anneau de texte qui tourne, monogramme fixe au centre. */
function Seal() {
  return (
    <svg
      className="home__seal"
      viewBox="0 0 100 100"
      width="76"
      height="76"
      aria-hidden="true"
    >
      <defs>
        <path
          id="seal-arc"
          d="M50,50 m-33,0 a33,33 0 1,1 66,0 a33,33 0 1,1 -66,0"
          fill="none"
        />
      </defs>
      <g className="home__seal-ring">
        <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
        <text className="home__seal-text" fontSize="7.3" letterSpacing="1.7">
          <textPath href="#seal-arc" startOffset="0">
            · CARNET DE RÉVISION · HOLBERTON FULL STACK&nbsp;
          </textPath>
        </text>
      </g>
      <text
        className="home__seal-mono"
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="30"
        fontWeight="600"
      >
        V
      </text>
    </svg>
  );
}

export default function Home() {
  const { lang } = useLang();
  const c = COPY[lang];
  const catLabel = (cat) =>
    lang === "en" ? CAT_EN[cat.category] ?? cat.category : cat.category;
  const groupLabel = (g) =>
    lang === "en" ? GROUP_EN[g.group] ?? g.group : g.group;
  const itemLabel = (it) =>
    lang === "en" ? NAV_EN[it.id] ?? it.label : it.label;

  const domains = NAV.length;
  const modules = NAV.reduce((n, cat) => n + cat.groups.length, 0);
  const topics = NAV.reduce((n, cat) => n + countSections(cat), 0);
  const startId = firstId(NAV[0]);

  return (
    <div className="home">
      <section className="home__hero" aria-label={c.title}>
        <p className="home__runhead">
          <span>{c.runLeft}</span>
          <b>№ 01</b>
          <span>{c.runRight}</span>
        </p>

        <p className="home__kicker">{c.kicker}</p>
        <h2 className="home__title">{c.title}</h2>
        <p className="home__tagline">{c.tagline}</p>
        <p className="home__lead">{c.lead}</p>

        <div className="home__cta">
          <a className="home__tab" href={startId ? `#${startId}` : "#"}>
            {c.cta}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="home__stats home__reveal" aria-label={c.statsAria}>
        <Stat value={topics} label={c.statTopics} />
        <Stat value={modules} label={c.statModules} />
        <Stat value={domains} label={c.statDomains} />
      </section>

      <section className="home__reveal" aria-label={c.tocTitle}>
        <header className="home__section-head">
          <h3 className="home__section-title">{c.tocTitle}</h3>
          <p className="home__section-sub">{c.tocSub}</p>
        </header>

        <ol className="toc">
          {NAV.map((cat, i) => {
            const id = firstId(cat);
            return (
              <li
                key={cat.category}
                className="toc__entry"
                style={{ "--cat": cat.accent }}
              >
                <a className="toc__head" href={id ? `#${id}` : "#"}>
                  <span className="toc__folio">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="toc__namewrap">
                    <span className="toc__name">{catLabel(cat)}</span>
                    <span className="toc__leader" aria-hidden="true" />
                  </span>
                  <span className="toc__count">
                    {c.fichesWord(countSections(cat))}
                  </span>
                </a>

                <ul className="toc__subs">
                  {cat.groups.map((g) => {
                    const gid = g.items[0]?.id;
                    return (
                      <li key={g.group}>
                        <a className="toc__sub" href={gid ? `#${gid}` : "#"}>
                          <span className="toc__sub-label">{groupLabel(g)}</span>
                          <span className="toc__sub-count">{g.items.length}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="home__program home__reveal" aria-label={c.indexTitle}>
        <header className="home__section-head">
          <h3 className="home__section-title">{c.indexTitle}</h3>
          <p className="home__section-sub">{c.indexSub}</p>
        </header>

        <div className="home__index">
          {NAV.map((cat) => (
            <div
              key={cat.category}
              className="home__index-cat"
              style={{ "--cat": cat.accent }}
            >
              <p className="home__index-cat-name">{catLabel(cat)}</p>
              {cat.groups.flatMap((g) =>
                g.items.map((it) => (
                  <a
                    key={it.id}
                    className="home__index-link"
                    href={`#${it.id}`}
                  >
                    {itemLabel(it)}
                  </a>
                ))
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="home__colophon home__reveal">
        <Seal />
        <div className="home__colophon-meta">
          <span>{c.colophon}</span>
          <a href={REPO} target="_blank" rel="noreferrer">
            <Github size={14} aria-hidden="true" />
            github.com/tomvieilledent/holberton-spe-fullstack
          </a>
        </div>
      </section>
    </div>
  );
}
