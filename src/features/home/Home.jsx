/* Page d'accueil — présentation du site, chiffres, domaines, programme.
   Parti pris « Apple » : grande typo, respiration, révélation au scroll.
   Bilingue (fr/en). Le titre h2 français est figé : un test s'appuie dessus. */
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { NAV } from "../../app/nav.js";
import { useLang } from "../../i18n/lang.jsx";
import { CAT_EN, GROUP_EN, NAV_EN } from "../../i18n/ui.js";

const REPO = "https://github.com/tomvieilledent/holberton-spe-fullstack";

const COPY = {
  fr: {
    kicker: "vlldnt.fr",
    title: "Holberton — Spécialisation Full Stack",
    tagline: "Le carnet de révision de l'année, mis à jour à chaque notion.",
    lead: "Toutes les notions vues depuis le début de la spécialisation, regroupées par domaine et reliées entre elles : front, back, bases de données, DevOps, CI/CD, modélisation et IA agentique. La barre latérale ouvre chaque section ; la recherche retrouve une notion par mot-clé.",
    ctaPrimary: "Commencer à réviser",
    ctaSecondary: "Voir le site en ligne",
    statsAria: "En chiffres",
    statTopics: "fiches",
    statModules: "modules",
    statDomains: "domaines",
    domainsTitle: "Les domaines",
    domainsSub: "Du front à l'IA agentique — chaque domaine relié aux autres.",
    browse: "Parcourir",
    sectionsWord: (n) => `${n} fiche${n > 1 ? "s" : ""}`,
    programTitle: "Tout le programme",
    programSub: "Chaque fiche, d'un coup d'œil.",
    siteLabel: "Version en ligne",
  },
  en: {
    kicker: "vlldnt.fr",
    title: "Holberton — Full Stack Specialization",
    tagline: "The year's revision notebook, updated with every new topic.",
    lead: "Every topic covered since the start of the specialization, grouped by domain and cross-linked: frontend, backend, databases, DevOps, CI/CD, modeling and agentic AI. The sidebar opens each section; search finds a topic by keyword.",
    ctaPrimary: "Start revising",
    ctaSecondary: "Visit the live site",
    statsAria: "In numbers",
    statTopics: "topics",
    statModules: "modules",
    statDomains: "domains",
    domainsTitle: "Domains",
    domainsSub: "From the browser to agentic AI — every domain cross-linked.",
    browse: "Browse",
    sectionsWord: (n) => `${n} topic${n > 1 ? "s" : ""}`,
    programTitle: "The whole programme",
    programSub: "Every topic at a glance.",
    siteLabel: "Live version",
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

export default function Home() {
  const { lang } = useLang();
  const c = COPY[lang];
  const catLabel = (cat) =>
    lang === "en" ? CAT_EN[cat.category] ?? cat.category : cat.category;

  const domains = NAV.length;
  const modules = NAV.reduce((n, cat) => n + cat.groups.length, 0);
  const topics = NAV.reduce((n, cat) => n + countSections(cat), 0);
  const startId = firstId(NAV[0]);

  return (
    <div className="home">
      <section className="home__hero" aria-label={c.title}>
        <p className="home__kicker">{c.kicker}</p>
        <h2 className="home__title">{c.title}</h2>
        <p className="home__tagline">{c.tagline}</p>
        <p className="home__lead">{c.lead}</p>
        <div className="home__cta">
          <a
            className="home__btn home__btn--primary"
            href={startId ? `#${startId}` : undefined}
          >
            {c.ctaPrimary}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a
            className="home__btn home__btn--ghost"
            href="https://vlldnt.fr"
            target="_blank"
            rel="noreferrer"
          >
            {c.ctaSecondary}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="home__stats home__reveal" aria-label={c.statsAria}>
        <Stat value={topics} label={c.statTopics} />
        <Stat value={modules} label={c.statModules} />
        <Stat value={domains} label={c.statDomains} />
      </section>

      <section className="home__reveal" aria-label={c.domainsTitle}>
        <header className="home__section-head">
          <h3 className="home__section-title">{c.domainsTitle}</h3>
          <p className="home__section-sub">{c.domainsSub}</p>
        </header>

        <div className="home__grid">
          {NAV.map((cat) => {
            const id = firstId(cat);
            const Icon = cat.icon;
            return (
              <div
                key={cat.category}
                className="home__card"
                style={{ "--cat": cat.accent }}
              >
                <a
                  className="home__card-head"
                  href={id ? `#${id}` : undefined}
                >
                  <span className="home__card-icon">
                    {Icon ? <Icon size={20} aria-hidden="true" /> : null}
                  </span>
                  <span className="home__card-name">{catLabel(cat)}</span>
                </a>

                <div className="home__card-groups">
                  {cat.groups.map((g) => {
                    const gid = g.items[0]?.id;
                    const gLabel =
                      lang === "en" ? GROUP_EN[g.group] ?? g.group : g.group;
                    return (
                      <a
                        key={g.group}
                        className="home__card-group"
                        href={gid ? `#${gid}` : undefined}
                      >
                        <span>{gLabel}</span>
                        <span className="home__card-group-n">
                          {g.items.length}
                        </span>
                      </a>
                    );
                  })}
                </div>

                <a
                  className="home__card-go"
                  href={id ? `#${id}` : undefined}
                >
                  {c.browse} · {c.sectionsWord(countSections(cat))}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      <section className="home__program home__reveal" aria-label={c.programTitle}>
        <header className="home__section-head">
          <h3 className="home__section-title">{c.programTitle}</h3>
          <p className="home__section-sub">{c.programSub}</p>
        </header>

        <div className="home__program-cols">
          {NAV.map((cat) => (
            <div
              key={cat.category}
              className="home__program-cat"
              style={{ "--cat": cat.accent }}
            >
              <p className="home__program-cat-name">{catLabel(cat)}</p>
              {cat.groups.flatMap((g) =>
                g.items.map((it) => (
                  <a
                    key={it.id}
                    className="home__program-link"
                    href={`#${it.id}`}
                  >
                    {lang === "en" ? NAV_EN[it.id] ?? it.label : it.label}
                  </a>
                ))
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="home__links home__reveal">
        <a href={REPO} target="_blank" rel="noreferrer">
          <Github size={15} aria-hidden="true" />
          github.com/tomvieilledent/holberton-spe-fullstack
        </a>
        <a href="https://vlldnt.fr" target="_blank" rel="noreferrer">
          {c.siteLabel} <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}
