import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronDown, ChevronRight, Menu, Moon, Search, Sun, X } from "lucide-react";
import {
  NAV,
  PAGE_IDS,
  DEFAULT_ID,
  HOME,
  findGroup,
  parseHash,
  hashFor,
} from "./nav.js";
import { getTheme, resolveMode, setTheme } from "../shared/ui/theme.js";

const VALID_PAGES = new Set(PAGE_IDS);
const HomeIcon = HOME.icon;

/* État de navigation dérivé de l'URL : page (= groupe) + ancre (= section). */
function readRoute() {
  const raw = typeof window !== "undefined" ? window.location.hash : "";
  const { groupId, itemId } = parseHash(raw);
  const page = VALID_PAGES.has(groupId) ? groupId : DEFAULT_ID;
  return { page, anchor: page === groupId ? itemId : null };
}

/* Fait défiler jusqu'à une section ; réessaie tant que le composant paresseux
   n'est pas monté (fenêtre ~1 s). */
function scrollToAnchor(id) {
  let tries = 0;
  const tick = () => {
    const el = typeof document !== "undefined" && document.getElementById(id);
    if (el) {
      try {
        if (typeof el.scrollIntoView === "function") {
          el.scrollIntoView({ block: "start" });
        }
      } catch {
        /* jsdom */
      }
      return;
    }
    if (tries++ < 60) requestAnimationFrame(tick);
  };
  tick();
}

function scrollToTop() {
  try {
    window.scrollTo({ top: 0 });
  } catch {
    /* jsdom */
  }
}

function NavButton({ label, active, accent, icon: Icon, caret = true, onClick }) {
  return (
    <button
      type="button"
      className="nav__btn"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      style={{ "--accent": accent }}
      onClick={onClick}
    >
      {Icon ? <Icon className="nav__btn-icon" size={15} aria-hidden="true" /> : null}
      <span className="nav__btn-label">{label}</span>
      {active && caret ? (
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

/* Une page = un groupe. Titre de groupe en ancre en haut, puis une section
   ancrée par sous-élément (chaque composant rend son propre <h2>). */
function GroupPage({ group }) {
  return (
    <article className="group-page">
      <header className="group-page__head" style={{ "--accent": group.accent }}>
        <p className="group-page__eyebrow">{group.category}</p>
        <h1 className="group-page__title" id={group.id}>
          {group.icon ? <group.icon size={22} aria-hidden="true" /> : null}
          {group.group}
        </h1>
      </header>

      {group.items.map((it) => (
        <section
          key={it.id}
          id={it.id}
          className="group-section"
          aria-label={it.label}
        >
          <Suspense fallback={<SectionFallback />}>
            <it.Component />
          </Suspense>
        </section>
      ))}
    </article>
  );
}

export default function App() {
  const initial = readRoute();
  const [page, setPage] = useState(initial.page);
  const [anchor, setAnchor] = useState(initial.anchor);
  const [navSeq, setNavSeq] = useState(0); // force le re-scroll même si (page, anchor) inchangés
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCats, setOpenCats] = useState(() => {
    const g = findGroup(initial.page);
    return new Set([g?.category].filter(Boolean));
  });
  const [openGroups, setOpenGroups] = useState(
    () => new Set([initial.page].filter((id) => findGroup(id)))
  );
  const [spyAnchor, setSpyAnchor] = useState(initial.anchor);
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

  const group = useMemo(() => (page === HOME.id ? null : findGroup(page)), [page]);

  const go = useCallback((groupId, itemId = null) => {
    const nextHash = hashFor(groupId, itemId);
    setPage(groupId);
    setAnchor(groupId === HOME.id ? null : itemId);
    setSpyAnchor(groupId === HOME.id ? null : itemId); // repère immédiat, affiné au scroll
    setNavSeq((n) => n + 1);
    setMenuOpen(false);
    setQuery("");
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
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

  const toggleGroup = useCallback((id) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
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

  /* Navigation arrière/avant du navigateur (et liens profonds hérités). */
  useEffect(() => {
    const onHashChange = () => {
      const r = readRoute();
      setPage(r.page);
      setAnchor(r.anchor);
      setNavSeq((n) => n + 1);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  /* La catégorie et le groupe de la page active restent dépliés. */
  useEffect(() => {
    const grp = findGroup(page);
    if (!grp) return;
    setOpenCats((prev) =>
      prev.has(grp.category) ? prev : new Set(prev).add(grp.category)
    );
    setOpenGroups((prev) => (prev.has(grp.id) ? prev : new Set(prev).add(grp.id)));
  }, [page]);

  /* Scrollspy : met en surbrillance la section survolée par le défilement. */
  useEffect(() => {
    const grp = page === HOME.id ? null : findGroup(page);
    if (!grp) {
      setSpyAnchor(null);
      return;
    }
    const ids = grp.items.map((i) => i.id);
    const topbar =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--topbar-h")
      ) || 56;
    const line = topbar + 24;

    let raf = 0;
    const compute = () => {
      raf = 0;
      let current = ids[0] || null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - line <= 0) current = id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1] || current;
      setSpyAnchor(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    /* Recalcule aussi le temps que les sections paresseuses se montent. */
    const timers = [80, 250, 600, 1000, 1600].map((ms) => setTimeout(compute, ms));
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [page]);

  /* Normalise l'URL des liens profonds hérités (#section → #groupe/section). */
  useEffect(() => {
    if (page === HOME.id) return;
    const canonical = hashFor(page, anchor);
    if (window.location.hash !== canonical) {
      window.history.replaceState(null, "", canonical);
    }
  }, [page, anchor]);

  /* Changement de page ou d'ancre : focus + défilement. */
  useEffect(() => {
    mainRef.current?.focus();
    if (anchor) scrollToAnchor(anchor);
    else scrollToTop();
  }, [page, anchor, navSeq]);

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
                  onClick={() => go(r.groupId, r.id)}
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
              data-active={page === "home" || undefined}
              aria-current={page === "home" ? "page" : undefined}
              onClick={() => go("home")}
            >
              <HomeIcon className="nav__btn-icon" size={15} aria-hidden="true" />
              <span className="nav__btn-label">Accueil</span>
              {page === "home" ? (
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
                      {cat.groups.map((g) => {
                        const onPage = page === g.id;
                        const expanded = onPage || openGroups.has(g.id);
                        const activeAnchor = onPage
                          ? spyAnchor || anchor
                          : null;
                        return (
                          <div
                            className="nav__group"
                            data-expanded={expanded || undefined}
                            key={g.id}
                          >
                            <div className="nav__group-row">
                              <NavButton
                                label={g.group}
                                accent={g.accent}
                                icon={g.icon}
                                active={onPage}
                                caret={false}
                                onClick={() => go(g.id)}
                              />
                              <button
                                type="button"
                                className="nav__group-toggle"
                                aria-expanded={expanded}
                                aria-label={
                                  expanded
                                    ? `Replier ${g.group}`
                                    : `Déplier ${g.group}`
                                }
                                style={{ "--accent": g.accent }}
                                onClick={() => toggleGroup(g.id)}
                              >
                                <ChevronDown
                                  className="nav__group-caret"
                                  data-open={expanded || undefined}
                                  size={14}
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                            {expanded ? (
                              <div
                                className="nav__anchors"
                                style={{ "--accent": g.accent }}
                              >
                                {g.items.map((it) => (
                                  <button
                                    key={it.id}
                                    type="button"
                                    className="nav__anchor"
                                    data-active={
                                      activeAnchor === it.id || undefined
                                    }
                                    aria-current={
                                      activeAnchor === it.id
                                        ? "location"
                                        : undefined
                                    }
                                    onClick={() => go(g.id, it.id)}
                                  >
                                    {it.label}
                                  </button>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
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
          <div className="section-view" key={page}>
            {page === HOME.id ? (
              <Suspense fallback={<SectionFallback />}>
                <HOME.Component />
              </Suspense>
            ) : group ? (
              <GroupPage group={group} />
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
