/* Page d'accueil — « Le carnet ».
   Tous les composants sont dessinés ici (aucune bibliothèque d'UI) :
   en-tête courante, sommaire à pointillés, index de fin d'ouvrage,
   cachet tournant. */
import { Github } from "lucide-react";
import { NAV } from "../../app/nav.js";

const REPO = "https://github.com/tomvieilledent/holberton-spe-fullstack";

const FICHES = (n) => `${n} fiche${n > 1 ? "s" : ""}`;

function countSections(cat) {
  return cat.groups.reduce((n, g) => n + g.items.length, 0);
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
  return (
    <div className="home">
      <section className="home__hero" aria-label="Holberton — Spécialisation Full Stack">
        <p className="home__runhead">
          <span>Carnet de révision</span>
          <b>№ 01</b>
          <span>Spécialisation Full Stack</span>
        </p>

        <p className="home__kicker">vlldnt.fr</p>
        <h2 className="home__title">Holberton — Spécialisation Full Stack</h2>
        <p className="home__tagline">
          Le carnet de révision de l'année, mis à jour à chaque notion.
        </p>
        <p className="home__lead">
          Toutes les notions vues depuis le début de la spécialisation,
          regroupées par domaine et reliées entre elles : shell, C, front,
          back, bases de données, DevOps, CI/CD, modélisation et IA agentique.
          La barre latérale ouvre chaque section ; la recherche retrouve une
          notion par mot-clé.
        </p>
      </section>

      <section className="home__reveal" aria-label="Sommaire">
        <header className="home__section-head">
          <h3 className="home__section-title">Sommaire</h3>
        </header>

        <ol className="toc">
          {NAV.map((cat, i) => {
            const id = cat.groups[0]?.id;
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
                    <span className="toc__name">{cat.category}</span>
                    <span className="toc__leader" aria-hidden="true" />
                  </span>
                  <span className="toc__count">
                    {FICHES(countSections(cat))}
                  </span>
                </a>

                <ul className="toc__subs">
                  {cat.groups.map((g) => {
                    const gid = g.id;
                    return (
                      <li key={g.group}>
                        <a className="toc__sub" href={gid ? `#${gid}` : "#"}>
                          <span className="toc__sub-label">{g.group}</span>
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

      <section className="home__program home__reveal" aria-label="Index">
        <header className="home__section-head">
          <h3 className="home__section-title">Index</h3>
          <p className="home__section-sub">
            Toutes les fiches, dans l'ordre du programme.
          </p>
        </header>

        <div className="home__index">
          {NAV.map((cat) => (
            <div
              key={cat.category}
              className="home__index-cat"
              style={{ "--cat": cat.accent }}
            >
              <p className="home__index-cat-name">{cat.category}</p>
              {cat.groups.flatMap((g) =>
                g.items.map((it) => (
                  <a
                    key={it.id}
                    className="home__index-link"
                    href={`#${g.id}/${it.id}`}
                  >
                    {it.label}
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
          <span>Écrit et tenu à jour tout au long de l'année.</span>
          <a href={REPO} target="_blank" rel="noreferrer">
            <Github size={14} aria-hidden="true" />
            github.com/tomvieilledent/holberton-spe-fullstack
          </a>
        </div>
      </section>

      <section
        id="mentions-legales"
        className="home__legal home__reveal"
        aria-label="Mentions légales"
      >
        <h3 className="home__legal-title">Mentions légales</h3>
        <p>
          <strong>Éditeur & directeur de la publication :</strong> Tom
          Vieilledent — projet personnel non commercial, dans le cadre de la
          formation Holberton School. Contact :{" "}
          <a href="mailto:tomvieilledent@gmail.com">tomvieilledent@gmail.com</a>.
        </p>
        <p>
          <strong>Hébergeur :</strong> OVH SAS, 2 rue Kellermann, 59100 Roubaix,
          France — <a href="https://www.ovhcloud.com" target="_blank" rel="noreferrer">ovhcloud.com</a>.
        </p>
        <p>
          <strong>Données personnelles :</strong> ce site ne dépose aucun
          cookie, n'utilise aucun outil de mesure d'audience et ne collecte
          aucune donnée. Une préférence de thème est conservée localement dans
          le navigateur. Les journaux du serveur (adresse IP, horodatage)
          sont conservés à des fins de sécurité et d'exploitation pour une
          durée limitée.
        </p>
        <p>
          <strong>Code source :</strong> publié sous licence MIT —{" "}
          <a href={REPO} target="_blank" rel="noreferrer">
            dépôt GitHub
          </a>
          .
        </p>
      </section>
    </div>
  );
}
