import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronDown, ChevronRight, Menu, Moon, Search, Sun, X } from "lucide-react";
import { NAV, ALL_IDS, DEFAULT_ID, HOME, findEntry } from "./nav.js";
import { getTheme, resolveMode, setTheme } from "../shared/ui/theme.js";

const VALID_IDS = new Set(ALL_IDS);
const HomeIcon = HOME.icon;

function readHash() {
  const id = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
  return VALID_IDS.has(id) ? id : DEFAULT_ID;
}

function NavButton({ label, active, accent, onClick }) {
  return (
    <button
      type="button"
      className="nav__btn"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      style={{ "--accent": accent }}
      onClick={onClick}
    >
      <span className="nav__btn-label">{label}</span>
      {active ? (
        <ChevronRight className="nav__btn-caret" size={14} aria-hidden="true" />
      ) : null}
    </button>
  );
}

/* Marque du site — même dessin que /favicon.svg (icône d'app / favicon). */
function BrandMark() {
  return (
    <svg
      className="app__brand-mark"
      viewBox="0 0 512 512"
      width="34"
      height="34"
      aria-hidden="true"
    >
      <rect width="512" height="512" rx="112" fill="#14161C" />
      <rect
        x="8"
        y="8"
        width="496"
        height="496"
        rx="104"
        fill="none"
        stroke="#2A2E38"
        strokeWidth="16"
      />
      <g
        fill="none"
        strokeWidth="40"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M196 150 L112 256 L196 362" stroke="#4FD1E8" />
        <path d="M316 150 L400 256 L316 362" stroke="#4FD1E8" />
        <path d="M292 132 L220 380" stroke="#C4A2FF" />
      </g>
    </svg>
  );
}

function SectionFallback() {
  return (
    <div className="section-fallback" role="status" aria-live="polite">
      Chargement de la section…
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(readHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCats, setOpenCats] = useState(
    () => new Set([findEntry(readHash()).category].filter(Boolean))
  );
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(null); // { entries, run } — chargé à la demande
  const [theme, setThemeState] = useState(getTheme);
  const mainRef = useRef(null);

  const mode = resolveMode(theme);
  const toggleTheme = useCallback(() => {
    const next = resolveMode(theme) === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeState(next);
  }, [theme]);

  const entry = useMemo(() => findEntry(active), [active]);
  const ActiveComponent = entry.Component;

  const go = useCallback((id) => {
    const sameSection = readHash() === id;
    setActive(id);
    setMenuOpen(false);
    setQuery("");
    if (window.location.hash.slice(1) !== id) {
      window.location.hash = id;
    }
    /* Déjà sur la section : l'effet de scroll ne se déclenche pas, on remonte à la main. */
    if (sameSection) {
      mainRef.current?.focus();
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        /* jsdom */
      }
    }
  }, []);

  const toggleCat = useCallback((name) => {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const ensureSearch = useCallback(() => {
    if (search) return;
    import("./search.js").then((m) => {
      setSearch({ entries: m.buildIndex(), run: m.runSearch });
    });
  }, [search]);

  const results = useMemo(() => {
    if (!search || query.trim().length < 2) return [];
    return search.run(query, search.entries);
  }, [search, query]);

  const searching = query.trim().length >= 2;

  /* Navigation arrière/avant du navigateur. */
  useEffect(() => {
    const onHashChange = () => setActive(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  /* La catégorie de la section active reste dépliée. */
  useEffect(() => {
    const cat = findEntry(active).category;
    if (!cat) return;
    setOpenCats((prev) => (prev.has(cat) ? prev : new Set(prev).add(cat)));
  }, [active]);

  /* Changement de section : focus + retour en haut. */
  useEffect(() => {
    mainRef.current?.focus();
    try {
      window.scrollTo({ top: 0 });
    } catch {
      /* jsdom */
    }
  }, [active]);

  /* Échap ferme le tiroir mobile. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="app" data-menu-open={menuOpen || undefined}>
      <a className="app__skip" href="#section">
        Aller au contenu
      </a>

      <div className="app__progress" aria-hidden="true" />

      <header className="app__topbar">
        <button
          type="button"
          className="app__burger"
          aria-expanded={menuOpen}
          aria-controls="sidebar"
          aria-label="Ouvrir la navigation"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} aria-hidden="true" />
        </button>
        <span className="app__brand-mobile">Holberton · Full Stack</span>
      </header>

      <div
        className="app__overlay"
        data-show={menuOpen || undefined}
        onClick={() => setMenuOpen(false)}
      />

      <aside id="sidebar" className="app__sidebar">
        <div className="app__brand">
          <button
            type="button"
            className="app__brand-link"
            aria-label="Aller à l'accueil"
            onClick={() => go("home")}
          >
            <BrandMark />
            <span className="app__brand-text">
              <span className="app__brand-name">Holberton</span>
              <span className="app__brand-sub">Full Stack</span>
            </span>
          </button>
          <button
            type="button"
            className="app__theme-toggle"
            aria-label={
              mode === "dark" ? "Passer en mode clair" : "Passer en mode sombre"
            }
            title={mode === "dark" ? "Mode clair" : "Mode sombre"}
            onClick={toggleTheme}
          >
            {mode === "dark" ? (
              <Sun size={18} aria-hidden="true" />
            ) : (
              <Moon size={18} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className="app__close"
            aria-label="Fermer la navigation"
            onClick={() => setMenuOpen(false)}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="nav__search">
          <Search size={14} aria-hidden="true" />
          <input
            type="search"
            className="nav__search-input"
            placeholder="Rechercher (ex. shell, pointeur, git…)"
            value={query}
            onFocus={ensureSearch}
            onChange={(e) => {
              ensureSearch();
              setQuery(e.target.value);
            }}
            aria-label="Rechercher une section"
          />
          {query ? (
            <button
              type="button"
              className="nav__search-clear"
              aria-label="Effacer la recherche"
              onClick={() => setQuery("")}
            >
              <X size={14} aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {searching ? (
          <div className="nav__results" aria-label="Résultats de recherche">
            {!search ? (
              <p className="nav__results-msg">Indexation…</p>
            ) : results.length === 0 ? (
              <p className="nav__results-msg">
                Aucun résultat pour « {query.trim()} »
              </p>
            ) : (
              results.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className="nav__result"
                  style={{ "--accent": r.accent }}
                  onClick={() => go(r.id)}
                >
                  <span className="nav__result-label">{r.label}</span>
                  <span className="nav__result-path">
                    {r.category} · {r.group}
                  </span>
                  {r.snippet ? (
                    <span className="nav__result-snippet">{r.snippet}</span>
                  ) : null}
                </button>
              ))
            )}
          </div>
        ) : (
          <nav className="nav" aria-label="Sections du cours">
            <button
              type="button"
              className="nav__btn nav__home"
              data-active={active === "home" || undefined}
              aria-current={active === "home" ? "page" : undefined}
              onClick={() => go("home")}
            >
              <HomeIcon className="nav__btn-icon" size={15} aria-hidden="true" />
              <span className="nav__btn-label">Accueil</span>
              {active === "home" ? (
                <ChevronRight className="nav__btn-caret" size={14} aria-hidden="true" />
              ) : null}
            </button>

            {NAV.map((cat) => {
              const open = openCats.has(cat.category);
              return (
                <section className="nav__cat" key={cat.category}>
                  <button
                    type="button"
                    className="nav__cat-toggle"
                    aria-expanded={open}
                    style={{ "--accent": cat.accent }}
                    onClick={() => toggleCat(cat.category)}
                  >
                    <cat.icon size={16} aria-hidden="true" />
                    <span className="nav__cat-name">{cat.category}</span>
                    <ChevronDown
                      className="nav__cat-caret"
                      data-open={open || undefined}
                      size={15}
                      aria-hidden="true"
                    />
                  </button>
                  {open ? (
                    <div className="nav__cat-body">
                      {cat.groups.map((g) => (
                        <div className="nav__group" key={g.group}>
                          <div
                            className="nav__group-label"
                            style={{ "--accent": g.accent }}
                          >
                            {g.icon ? (
                              <g.icon size={13} aria-hidden="true" />
                            ) : null}
                            {g.group}
                          </div>
                          {g.items.map((it) => (
                            <NavButton
                              key={it.id}
                              label={it.label}
                              accent={g.accent}
                              active={active === it.id}
                              onClick={() => go(it.id)}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </nav>
        )}
      </aside>

      <main id="section" className="app__main" tabIndex={-1} ref={mainRef}>
        <div className="app__content">
          <div className="section-view" key={active}>
            <Suspense fallback={<SectionFallback />}>
              {ActiveComponent ? <ActiveComponent /> : null}
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
