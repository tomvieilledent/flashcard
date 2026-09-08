/* Primitives de contenu partagées par toutes les sections. */
import { ExternalLink } from "lucide-react";
import { FONT_BODY, FONT_DISPLAY, FONT_MONO, LINE, MUTED, TEXT } from "./tokens.js";
import { highlight } from "./highlight.js";

export function Code({ children }) {
  const { html, lang } = highlight(children);
  return (
    <pre
      className="code-block"
      data-lang={lang}
      style={{
        background: "#0E1015",
        border: `1px solid ${LINE}`,
        borderRadius: 8,
        padding: "14px 16px",
        overflowX: "auto",
        fontFamily: FONT_MONO,
        fontSize: 13.5,
        lineHeight: 1.6,
        color: "#D8DEE9",
        margin: "14px 0",
      }}
    >
      {/* Sûr tant que `children` reste du contenu STATIQUE du dépôt : highlight()
          échappe l'entrée (hljs.highlight / escapeHtml) et ne produit que des
          <span> de coloration. Ne JAMAIS passer ici du contenu distant ou saisi
          par un utilisateur sans assainissement (DOMPurify) — ce serait un XSS. */}
      <code
        className="hljs"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </pre>
  );
}

export function InlineCode({ children }) {
  return (
    <code
      style={{
        fontFamily: FONT_MONO,
        fontSize: "0.88em",
        background: "#0E1015",
        border: `1px solid ${LINE}`,
        borderRadius: 4,
        padding: "1px 6px",
        color: "#D8DEE9",
      }}
    >
      {children}
    </code>
  );
}

export function P({ children }) {
  return (
    <p style={{ color: TEXT, lineHeight: 1.7, fontSize: 15.5, margin: "10px 0" }}>
      {children}
    </p>
  );
}

export function H2({ accent, rule = true, children }) {
  return (
    <h2
      style={{
        fontFamily: FONT_DISPLAY,
        fontSize: 28,
        fontWeight: 600,
        color: TEXT,
        marginTop: 34,
        marginBottom: 10,
        paddingBottom: rule ? 10 : 0,
        borderBottom: rule ? `1px solid ${LINE}` : "none",
        display: "flex",
        alignItems: "baseline",
        gap: 10,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 99, background: accent, display: "inline-block", transform: "translateY(-3px)" }} />
      {children}
    </h2>
  );
}

export function H3({ children }) {
  return (
    <h3
      style={{
        fontFamily: FONT_BODY,
        fontSize: 17,
        fontWeight: 700,
        color: TEXT,
        marginTop: 26,
        marginBottom: 8,
      }}
    >
      {children}
    </h3>
  );
}

export function Ul({ children }) {
  return (
    <ul style={{ color: TEXT, lineHeight: 1.7, fontSize: 15.5, paddingLeft: 20, margin: "10px 0" }}>
      {children}
    </ul>
  );
}

export function Note({ accent, children }) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${accent}`,
        background: "rgba(255,255,255,0.03)",
        padding: "10px 14px",
        borderRadius: "0 8px 8px 0",
        color: MUTED,
        fontSize: 14,
        margin: "14px 0",
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

export function Table({ head, rows }) {
  return (
    <div style={{ overflowX: "auto", margin: "14px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  color: MUTED,
                  fontWeight: 600,
                  borderBottom: `1px solid ${LINE}`,
                  padding: "8px 10px",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td
                  key={j}
                  style={{
                    borderBottom: `1px solid ${LINE}`,
                    padding: "8px 10px",
                    color: TEXT,
                    fontFamily: j === 0 ? FONT_MONO : FONT_BODY,
                  }}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SourceLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        color: MUTED,
        fontSize: 13,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        textDecoration: "none",
        borderBottom: `1px dotted ${LINE}`,
      }}
    >
      {children} <ExternalLink size={12} />
    </a>
  );
}
