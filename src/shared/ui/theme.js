/* Thème d'interface : sombre / clair.
   - Aucun choix mémorisé  → on suit la préférence système (prefers-color-scheme).
   - Choix explicite        → attribut [data-theme] sur <html> + localStorage.
   Un petit script inline dans index.html applique le choix avant le
   premier rendu pour éviter tout flash. */

const KEY = "vlldnt:theme";

/* "dark" | "light" | null (null = suivre le système). */
export function getTheme() {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "dark" || v === "light") return v;
  } catch {
    /* stockage indisponible */
  }
  return null;
}

export function applyTheme(v) {
  const root = document.documentElement;
  if (v === "dark" || v === "light") root.setAttribute("data-theme", v);
  else root.removeAttribute("data-theme");
}

export function setTheme(v) {
  applyTheme(v);
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* stockage indisponible */
  }
}

/* Mode réellement affiché, en tenant compte du système. */
export function resolveMode(v) {
  if (v === "dark" || v === "light") return v;
  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
  return "dark";
}
