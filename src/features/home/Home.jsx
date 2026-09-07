/* Page d'accueil — présentation du site, aperçu des domaines, liens.
   Bilingue (fr/en). Le titre h2 français est figé : un test s'appuie dessus. */
import { ArrowUpRight, Github } from "lucide-react";
import { NAV } from "../../app/nav.js";
import { useLang } from "../../i18n/lang.jsx";
import { CAT_EN } from "../../i18n/ui.js";
import { FONT_DISPLAY, FONT_MONO } from "../../shared/ui/tokens.js";

const REPO = "https://github.com/tomvieilledent/holberton-spe-fullstack";

const COPY = {
  fr: {
    title: "Holberton — Spécialisation Full Stack",
    tagline: "Le carnet de révision de l'année, mis à jour à chaque notion.",
    lead: "Toutes les notions vues depuis le début de la spécialisation, regroupées par domaine et reliées entre elles : front, back, bases de données, DevOps, CI/CD, modélisation et IA agentique. La barre latérale ouvre chaque section ; la recherche retrouve une notion par mot-clé.",
    browse: "Parcourir",
    sectionsWord: (n) => `${n} section${n > 1 ? "s" : ""}`,
    siteLabel: "Version en ligne",
  },
  en: {
    title: "Holberton — Full Stack Specialization",
    tagline: "The year's revision notebook, updated with every new topic.",
    lead: "Every topic covered since the start of the specialization, grouped by domain and cross-linked: frontend, backend, databases, DevOps, CI/CD, modeling and agentic AI. The sidebar opens each section; search finds a topic by keyword.",
    browse: "Browse",
    sectionsWord: (n) => `${n} section${n > 1 ? "s" : ""}`,
    siteLabel: "Live version",
  },
};

function countSections(cat) {
  return cat.groups.reduce((n, g) => n + g.items.length, 0);
}

function firstId(cat) {
  return cat.groups[0]?.items[0]?.id;
}

export default function Home() {
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <div>
      <section
        aria-label={c.title}
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 16,
          border: "1px solid var(--line)",
          padding: "clamp(26px, 6vw, 52px)",
          marginBottom: 30,
          background:
            "radial-gradient(120% 140% at 0% 0%, color-mix(in srgb, var(--react-accent) 22%, transparent) 0%, transparent 55%), radial-gradient(120% 140% at 100% 0%, color-mix(in srgb, var(--devops-accent) 20%, transparent) 0%, transparent 50%), radial-gradient(120% 160% at 100% 100%, color-mix(in srgb, var(--ai-accent) 16%, transparent) 0%, transparent 55%), var(--panel)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: FONT_MONO,
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          vlldnt.fr
        </p>

        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 600,
            fontSize: "clamp(30px, 6.5vw, 50px)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            margin: "14px 0 0",
          }}
        >
          {c.title}
        </h2>

        <p
          style={{
            margin: "14px 0 0",
            fontSize: "clamp(15px, 2.4vw, 18px)",
            lineHeight: 1.5,
            color: "var(--text)",
            maxWidth: "42ch",
          }}
        >
          {c.tagline}
        </p>

        <p
          style={{
            margin: "18px 0 0",
            fontSize: 14.5,
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: "62ch",
          }}
        >
          {c.lead}
        </p>
      </section>

      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          marginBottom: 30,
        }}
      >
        {NAV.map((cat) => {
          const id = firstId(cat);
          const label =
            lang === "en" ? CAT_EN[cat.category] ?? cat.category : cat.category;
          const Icon = cat.icon;
          return (
            <a
              key={cat.category}
              href={id ? `#${id}` : undefined}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: "16px 16px 18px",
                borderRadius: 12,
                border: "1px solid var(--line)",
                borderTop: "3px solid var(--cat)",
                background: "var(--fill)",
                color: "var(--text)",
                textDecoration: "none",
                "--cat": cat.accent,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: "color-mix(in srgb, var(--cat) 16%, transparent)",
                  color: "var(--cat)",
                }}
              >
                {Icon ? <Icon size={18} aria-hidden="true" /> : null}
              </span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{label}</span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: "auto",
                  fontSize: 12.5,
                  color: "var(--muted)",
                }}
              >
                {c.browse} · {c.sectionsWord(countSections(cat))}
                <ArrowUpRight size={13} aria-hidden="true" />
              </span>
            </a>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          fontSize: 13.5,
        }}
      >
        <a
          href={REPO}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid var(--line)",
            background: "var(--fill)",
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          <Github size={15} aria-hidden="true" />
          github.com/tomvieilledent/holberton-spe-fullstack
        </a>
        <a
          href="https://vlldnt.fr"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid var(--line)",
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          {c.siteLabel} <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
