/* Barre de préférences : thème d'interface + langue.
   Deux boutons compacts ouvrant chacun un petit menu. */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Languages, Palette } from "lucide-react";
import { THEMES } from "../shared/ui/tokens.js";
import { getTheme, setTheme, THEME_SWATCHES } from "../shared/ui/theme.js";
import { useLang } from "../i18n/lang.jsx";
import { UI } from "../i18n/ui.js";

function useDismiss(open, onClose) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
  return ref;
}

function ThemeMenu({ t }) {
  const [open, setOpen] = useState(false);
  const [theme, setThemeState] = useState(getTheme);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss(open, close);

  const groups = useMemo(
    () => ({
      dark: THEMES.filter((x) => x.mode === "dark"),
      light: THEMES.filter((x) => x.mode === "light"),
    }),
    []
  );

  const choose = (id) => {
    setTheme(id);
    setThemeState(id);
    setOpen(false);
  };

  const { lang } = useLang();
  const current = THEMES.find((x) => x.id === theme);

  return (
    <div className="prefs__group" ref={ref}>
      <button
        type="button"
        className="prefs__btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.themeMenu}
        onClick={() => setOpen((v) => !v)}
      >
        <Palette size={15} aria-hidden="true" />
        <span>{current ? current.labels[lang] : t.theme}</span>
        <ChevronDown className="prefs__btn-caret" size={13} aria-hidden="true" />
      </button>

      {open ? (
        <div className="prefs__menu" role="menu" aria-label={t.themeMenu}>
          {["dark", "light"].map((mode) => (
            <div key={mode}>
              <div className="prefs__menu-label">
                {mode === "dark" ? t.groupDark : t.groupLight}
              </div>
              {groups[mode].map((x) => {
                const sw = THEME_SWATCHES[x.id] || ["#888", "#888", "#888"];
                return (
                  <button
                    key={x.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={x.id === theme}
                    aria-current={x.id === theme || undefined}
                    className="prefs__opt"
                    onClick={() => choose(x.id)}
                  >
                    <span
                      className="prefs__swatch"
                      style={{ "--sw-1": sw[0], "--sw-2": sw[1], "--sw-3": sw[2] }}
                      aria-hidden="true"
                    />
                    <span>{x.labels[lang]}</span>
                    {x.id === theme ? (
                      <Check className="prefs__opt-check" size={14} aria-hidden="true" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function LangMenu({ t }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss(open, close);

  const OPTS = [
    { id: "fr", label: "Français" },
    { id: "en", label: "English" },
  ];

  return (
    <div className="prefs__group" ref={ref}>
      <button
        type="button"
        className="prefs__btn prefs__lang"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t.langMenu}
        onClick={() => setOpen((v) => !v)}
      >
        <Languages size={15} aria-hidden="true" />
        <span>{lang.toUpperCase()}</span>
      </button>

      {open ? (
        <div className="prefs__menu" role="menu" aria-label={t.langMenu}>
          {OPTS.map((o) => (
            <button
              key={o.id}
              type="button"
              role="menuitemradio"
              aria-checked={o.id === lang}
              aria-current={o.id === lang || undefined}
              className="prefs__opt"
              onClick={() => {
                setLang(o.id);
                setOpen(false);
              }}
            >
              <span>{o.label}</span>
              {o.id === lang ? (
                <Check className="prefs__opt-check" size={14} aria-hidden="true" />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function PrefsBar() {
  const { lang } = useLang();
  const t = UI[lang];
  return (
    <div className="prefs">
      <ThemeMenu t={t} />
      <LangMenu t={t} />
    </div>
  );
}
