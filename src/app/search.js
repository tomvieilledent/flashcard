/* Index de recherche plein texte, construit à partir du source des sections.
   Chargé à la demande (import dynamique) pour ne pas alourdir le bundle initial. */
import { NAV, HOME } from "./nav.js";

const sources = import.meta.glob("../features/**/*.jsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

function toText(src) {
  return src
    .replace(/^import[\s\S]*?;\s*$/gm, " ")
    .replace(/<\/?[A-Za-z][^>]*>/g, " ")
    .replace(/[`{}<>]/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildIndex() {
  const entries = [];

  {
    const text = toText(sources[`../features/${HOME.file}`] || "");
    entries.push({
      id: HOME.id,
      groupId: HOME.id,
      label: HOME.label,
      group: "Présentation",
      category: "Accueil",
      accent: "var(--muted)",
      meta: `${HOME.label} accueil présentation`.toLowerCase(),
      text,
      lower: text.toLowerCase(),
    });
  }

  for (const cat of NAV) {
    for (const group of cat.groups) {
      for (const item of group.items) {
        const raw = sources[`../features/${item.file}`] || "";
        const text = toText(raw);
        entries.push({
          id: item.id,
          groupId: group.id,
          label: item.label,
          group: group.group,
          category: cat.category,
          accent: group.accent,
          meta: `${item.label} ${group.group} ${cat.category}`.toLowerCase(),
          text,
          lower: text.toLowerCase(),
        });
      }
    }
  }
  return entries;
}

export function runSearch(query, index) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const hits = [];
  for (const e of index) {
    let score = 0;
    let matchesAll = true;
    for (const t of terms) {
      if (e.label.toLowerCase().includes(t)) score += 12;
      else if (e.meta.includes(t)) score += 6;
      else if (e.lower.includes(t)) score += 1;
      else {
        matchesAll = false;
        break;
      }
    }
    if (!matchesAll) continue;

    const pos = e.lower.indexOf(terms[0]);
    const snippet =
      pos >= 0
        ? (pos > 40 ? "… " : "") +
          e.text.slice(Math.max(0, pos - 40), pos + 80).trim() +
          " …"
        : "";
    hits.push({ ...e, score, snippet });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 12);
}
