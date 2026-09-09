# Flashcard — notes de cours dev fullstack

[![CI](https://github.com/tomvieilledent/flashcard/actions/workflows/ci.yml/badge.svg)](https://github.com/tomvieilledent/flashcard/actions/workflows/ci.yml)
[![Deploy](https://github.com/tomvieilledent/flashcard/actions/workflows/deploy.yml/badge.svg)](https://github.com/tomvieilledent/flashcard/actions/workflows/deploy.yml)
[![Site](https://img.shields.io/badge/site-flashcard.vlldnt.fr-2ea44f)](https://flashcard.vlldnt.fr)

**Flashcard** : site **statique** de notes de cours de développement fullstack —
une seule application React (Vite) qui présente, au fil des cours, les notions
vues — React / Vue / Svelte, l'outillage front, Docker, la culture DevOps & Git,
GitHub Actions, l'analyse et la conception (Merise, UML), les API REST / OpenAPI
/ JSON Schema, les spécifications (PRD, INVEST, BDD/Gherkin) et l'urbanisation du
SI.

> 🔗 **Site en ligne :** <https://flashcard.vlldnt.fr> — VPS OVH + nginx,
> déploiement automatique à chaque `push` sur `main`.
> Landing du projet : <https://vlldnt.fr/flashcard>.

Le site est un catalogue de toutes les notions vues depuis le début de l'année,
complété à chaque nouvelle notion, construit en appliquant (ou en s'en
approchant) les règles décrites dans la documentation du dépôt. Aucun secret
n'y figure : la clé SSH et l'hôte du VPS vivent uniquement dans les
*GitHub Actions secrets*.

## Ce dépôt est lui-même l'exercice

Le contenu du site enseigne des notions ; le dépôt les **applique**. La règle du
projet : rester 100 % statique, mais matérialiser dans la structure du repo un
maximum de concepts du cursus.

| Notion du cours | Où elle est appliquée dans le repo |
| --- | --- |
| Composants React, JSX, `useState`, hooks, lifting state up | `src/app/App.jsx`, `src/features/**` |
| Architecture SPA feature-sliced + `React.lazy` / `Suspense` (code-splitting par section) | `src/features/<feature>/`, `src/app/nav.js` |
| Navigation à 2 niveaux (catégorie → groupe → section), catégories repliables | `src/app/App.jsx`, `src/app/nav.js` |
| Recherche plein texte côté client (index bâti depuis le source des sections, chunk chargé à la demande) | `src/app/search.js` |
| Responsive **mobile-first**, routage par hash (deep links) | `src/index.css`, `src/app/App.jsx` |
| Monter un projet avec Vite | `vite.config.js`, `index.html`, `src/main.jsx` |
| ESLint (guillemets, points-virgules, variables inutilisées) | `eslint.config.js` |
| Icônes Lucide | `src/shared/ui/`, `src/features/**` (import `lucide-react`) |
| Rédaction de contenu assistée par IA, vérifiée et complétée | `docs/ai/authoring.md` |
| Déploiement continu sur VPS (nginx, HTTPS Let's Encrypt) | `.github/workflows/deploy.yml`, `scripts/vps-add-subdomain.sh`, `deploy/nginx/` |
| Docker : empaqueter une application (build multi-stage) | `Dockerfile`, `nginx.conf`, `.dockerignore` |
| Culture DevOps (CALMS), métriques DORA | `docs/adr/`, CI qui mesure lint + tests + build |
| Workflows Git, GitHub flow, Conventional Commits | `CONTRIBUTING.md`, `.github/pull_request_template.md` |
| GitHub Actions : workflow, `on`, jobs, steps, **matrice**, **cache** | `.github/workflows/ci.yml` |
| Publier une image / automatiser | `.github/workflows/*.yml`, `.github/dependabot.yml` |
| Merise : MCD, MLD, MPD, contraintes SQL (`CHECK`, `FK`, `ON DELETE`) | `docs/data-model.sql` |
| Normalisation 1NF / 2NF / 3NF | `docs/data-model.sql` (commentaires) |
| UML : diagramme de classes, séquence, états-transitions | `docs/architecture.md` (Mermaid) |
| Repository & inversion des dépendances | `docs/architecture.md` |
| REST, OpenAPI 3.0, JSON Schema | `docs/openapi.yaml` |
| PRD, User Story, critères INVEST | `docs/curriculum.md`, `.github/ISSUE_TEMPLATE/weekly-update.md` |
| BDD, Gherkin, Scenario Outline | `features/navigation.feature` |
| Aligner les modèles, cohérence entre modèles | `docs/architecture.md` (dictionnaire de données) |
| Documentation as Code, SSOT, ADR | `docs/` versionné avec le code |
| SEO / robots / plan de site / `llms.txt` | `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `index.html` (canonical + Open Graph) |
| En-têtes de sécurité HTTP (CSP, HSTS, COOP, anti-clickjacking) | `deploy/nginx/vlldnt-security-headers.conf`, `deploy/nginx/flashcard.vlldnt.fr.conf` |

## Stack

- **React 18** + **Vite** (build statique, HMR, code-splitting par section)
- Architecture **feature-sliced** : `src/features/<feature>/` + `src/shared/ui/` + `src/app/`
- SPA **mobile-first**, navigation à 2 niveaux repliable, **recherche plein texte**, deep links par `#hash`
- **Vitest** + **Testing Library** (tests de comportement, environnement jsdom)
- **ESLint 9** (flat config) + `eslint-plugin-react-hooks`
- **GitHub Actions** : CI (lint / tests / build sur Node 20 & 22) + déploiement automatique
- **Docker** (optionnel) : image nginx servant le build

## Démarrer

```bash
nvm use            # Node 20 (voir .nvmrc)
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script | Commande | Rôle |
| --- | --- | --- |
| `dev` | `npm run dev` | Serveur de développement (HMR) |
| `lint` | `npm run lint` | Analyse ESLint |
| `fix` | `npm run fix` | Corrige ce qui est auto-corrigeable |
| `test` | `npm run test` | Tests en mode watch |
| `test:run` | `npm run test:run` | Tests une fois (utilisé en CI) |
| `test:coverage` | `npm run test:coverage` | Tests + rapport de couverture |
| `spec:lint` | `npm run spec:lint` | Lint du contrat `docs/openapi.yaml` (Spectral) |
| `build` | `npm run build` | Build de production dans `dist/` |
| `preview` | `npm run preview` | Sert le build en local |
| `ci` | `npm run ci` | `lint` + `spec:lint` + `test:run` + `build` |

## Docker

```bash
docker build -t flashcard .
docker run --rm -p 8080:80 flashcard
# http://localhost:8080
```

## Déploiement

**Automatique** : tout `push` sur `main` déclenche
`.github/workflows/deploy.yml`, qui build le site puis `rsync` le `dist/` sur le
**VPS OVH** où **nginx** le sert en HTTPS sur `https://flashcard.vlldnt.fr`.

Mise en route (une fois) et détail des secrets : **[`docs/deployment.md`](./docs/deployment.md)**.
Décisions d'architecture : [`docs/adr/0004-deploiement-vps-ovh.md`](./docs/adr/0004-deploiement-vps-ovh.md),
[`docs/adr/0005-sous-domaine-flashcard.md`](./docs/adr/0005-sous-domaine-flashcard.md).

## Rythme hebdomadaire

Le site évolue chaque semaine avec les nouvelles notions. Le processus est
décrit dans [`CONTRIBUTING.md`](./CONTRIBUTING.md) et suivi dans
[`docs/curriculum.md`](./docs/curriculum.md).

## Structure

```
flashcard/
├── src/
│   ├── app/
│   │   ├── App.jsx          # shell : layout mobile-first, tiroir, nav 2 niveaux, #hash, Suspense
│   │   ├── App.test.jsx     # tests de navigation, de rendu et de recherche
│   │   ├── nav.js           # NAV (catégorie → groupe → section), lazy imports via import.meta.glob
│   │   └── search.js        # index plein texte (chargé à la demande)
│   ├── features/            # une notion = un dossier = un chunk
│   │   ├── react/           #   ReactBasics.jsx, ReactSetup.jsx, ReactDeploy.jsx
│   │   ├── docker/  devops/  cicd/  merise/  vue/  svelte/
│   │   ├── architecture/  data-modeling/  uml/
│   │   ├── api-rest/  specs-bdd/  urbanization/
│   │   └── tooling/
│   ├── shared/ui/
│   │   ├── primitives.jsx   # H2, H3, P, Ul, Code, InlineCode, Note, Table, SourceLink
│   │   └── tokens.js        # couleurs, polices
│   ├── main.jsx             # point d'entrée React
│   ├── index.css            # design system mobile-first (variables CSS, media queries min-width)
│   └── test/setup.js        # setup Vitest / jest-dom
├── docs/
│   ├── architecture.md      # diagrammes UML (Mermaid), dictionnaire de données
│   ├── curriculum.md        # journal semaine par semaine
│   ├── deployment.md        # runbook sous-domaine flashcard.vlldnt.fr
│   ├── data-model.sql       # MPD PostgreSQL du domaine "cursus"
│   ├── openapi.yaml         # contrat d'API (hypothétique, read-only)
│   ├── ai/authoring.md      # pipeline de rédaction assistée par IA
│   └── adr/                 # Architecture Decision Records (0001..0005)
├── deploy/nginx/flashcard.vlldnt.fr.conf  # vhost du sous-domaine (SSOT)
├── scripts/vps-add-subdomain.sh  # ajout du sous-domaine sur le VPS (idempotent)
├── features/
│   └── navigation.feature   # spécification exécutable (Gherkin)
├── .github/
│   ├── workflows/ci.yml
│   ├── workflows/deploy.yml
│   └── dependabot.yml
├── Dockerfile
└── nginx.conf
```

## Licence

[MIT](./LICENSE) © 2026 Tom Vieilledent
