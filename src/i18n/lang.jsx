/* Langue de l'interface et du contenu (fr | en).
   Mémorisée dans localStorage, reflétée sur <html lang>. Le fournisseur
   n'est monté qu'au niveau de l'app ; hors fournisseur (tests unitaires),
   la valeur par défaut « fr » s'applique. */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "vlldnt:lang";
const LANGS = ["fr", "en"];

const LangContext = createContext({ lang: "fr", setLang: () => {} });

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    /* stockage indisponible */
  }
  if (typeof navigator !== "undefined" && /^en\b/i.test(navigator.language || "")) {
    return "en";
  }
  return "fr";
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* stockage indisponible */
    }
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(LANGS.includes(next) ? next : "fr");
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/* Choisit la bonne chaîne dans un objet { fr, en } ; repli sur le français. */
export function pick(dict, lang) {
  if (!dict) return "";
  if (typeof dict === "string") return dict;
  return dict[lang] ?? dict.fr ?? "";
}
