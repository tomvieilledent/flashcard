/* Design tokens.
   Les couleurs pointent vers des variables CSS définies dans src/index.css.
   Le thème actif (sombre / clair / daltonien) redéfinit ces variables ;
   tout le contenu suit automatiquement. */
export const INK = "var(--ink)";
export const PANEL = "var(--panel)";
export const LINE = "var(--line)";
export const TEXT = "var(--text)";
export const MUTED = "var(--muted)";

export const REACT_ACCENT = "var(--react-accent)";
export const VUE_ACCENT = "var(--vue-accent)";
export const SVELTE_ACCENT = "var(--svelte-accent)";
export const TOOL_ACCENT = "var(--tool-accent)";
export const DOCKER_ACCENT = "var(--docker-accent)";
export const DEVOPS_ACCENT = "var(--devops-accent)";
export const CI_ACCENT = "var(--ci-accent)";
export const MERISE_ACCENT = "var(--merise-accent)";
export const ARCH_ACCENT = "var(--arch-accent)";
export const UML_ACCENT = "var(--uml-accent)";
export const API_ACCENT = "var(--api-accent)";
export const SPEC_ACCENT = "var(--spec-accent)";
export const URBA_ACCENT = "var(--urba-accent)";
export const AI_ACCENT = "var(--ai-accent)";

export const FONT_DISPLAY = '"Iowan Old Style", Georgia, "Times New Roman", serif';
export const FONT_BODY =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "IBM Plex Sans", sans-serif';
export const FONT_MONO =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

/* Thèmes proposés par le sélecteur (voir src/shared/ui/theme.js). */
export const THEMES = [
  { id: "slate", labels: { fr: "Ardoise", en: "Slate" }, mode: "dark" },
  { id: "midnight", labels: { fr: "Nuit", en: "Midnight" }, mode: "dark" },
  { id: "cvd-dark", labels: { fr: "Sombre · daltonien", en: "Dark · color-blind" }, mode: "dark" },
  { id: "paper", labels: { fr: "Papier", en: "Paper" }, mode: "light" },
  { id: "daylight", labels: { fr: "Grand jour", en: "Daylight" }, mode: "light" },
  { id: "cvd-light", labels: { fr: "Clair · daltonien", en: "Light · color-blind" }, mode: "light" },
];
