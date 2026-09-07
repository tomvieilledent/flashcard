/* Gestion du thème d'interface : lecture / écriture / application.
   Le thème est posé en attribut [data-theme] sur <html> et mémorisé
   dans localStorage. Un script inline dans index.html l'applique avant
   le premier rendu pour éviter tout flash. */
import { THEMES } from "./tokens.js";

const STORAGE_KEY = "vlldnt:theme";
const DEFAULT_THEME = "slate";
const VALID = new Set(THEMES.map((t) => t.id));

export function getTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && VALID.has(saved)) return saved;
  } catch {
    /* stockage indisponible */
  }
  return DEFAULT_THEME;
}

export function applyTheme(id) {
  const theme = VALID.has(id) ? id : DEFAULT_THEME;
  const root = document.documentElement;
  if (theme === DEFAULT_THEME) root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);

  const mode = THEMES.find((t) => t.id === theme)?.mode ?? "dark";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", mode === "light" ? "#ffffff" : "#14161c");
}

export function setTheme(id) {
  applyTheme(id);
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* stockage indisponible */
  }
}

/* Trois teintes représentatives d'un thème, pour la pastille du menu. */
export const THEME_SWATCHES = {
  slate: ["#12141a", "#4fd1e8", "#c4a2ff"],
  midnight: ["#0c1120", "#4fd1e8", "#6ee7b7"],
  "cvd-dark": ["#14161c", "#56b4e9", "#e69f00"],
  paper: ["#fbf8f1", "#0c7b8f", "#c4442b"],
  daylight: ["#ffffff", "#2c5fc7", "#3f7d22"],
  "cvd-light": ["#ffffff", "#1b7fb5", "#c74a00"],
};
