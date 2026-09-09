# Architecture

Documentation vivante du projet. Les diagrammes sont en **Mermaid**, rendus
nativement par GitHub — mêmes conventions que les diagrammes du site.

## 1. Vue d'ensemble (statique)

```mermaid
flowchart LR
    Dev[Développeur] -->|push / PR| GH[(GitHub repo)]
    GH -->|Actions: lint + tests + build| CI{CI verte ?}
    CI -->|oui, sur main| Deploy[Build de production]
    Deploy --> Pages[GitHub Pages]
    Deploy -. cible en préparation .-> VPS[VPS - nginx - flashcard.vlldnt.fr]
    Pages --> User[Navigateur]
    VPS --> User
```

## 2. Modèle de composants (React)

`NAV` (dans `src/app/nav.js`) décrit la navigation sur 2 niveaux :
catégorie → groupe → section. `App` garde l'état de la section active
(synchronisé avec `#hash`), des catégories dépliées et de la recherche ;
`search.js` bâtit un index plein texte à partir du source des sections.

```mermaid
classDiagram
    class App {
        -active: string
        -menuOpen: boolean
        -openCats: Set~string~
        -query: string
        +go(id) void
    }
    class NAV {
        <<data>>
        +Category[] categories
    }
    class Category {
        +name: string
        +icon: Component
        +Group[] groups
    }
    class Group {
        +name: string
        +accent: string
        +Item[] items
    }
    class Item {
        +id: string
        +label: string
        +file: string
        +Component: LazyComponent
    }
    class SearchIndex {
        <<lazy chunk>>
        +buildIndex() Entry[]
        +runSearch(q, index) Result[]
    }
    class Section {
        <<function component>>
    }

    App --> NAV : lit
    App ..> SearchIndex : charge à la demande
    App ..> Section : rend la section active (Suspense)
    NAV o-- Category
    Category o-- Group
    Group o-- Item
```

## 3. Inversion des dépendances (cible backend)

Si un backend est ajouté (VPS), le domaine ne dépend pas de l'infrastructure :
il définit une interface, l'infra l'implémente.

```mermaid
classDiagram
    namespace DomainLayer {
        class CurriculumService
        class ICurriculumRepository {
            <<interface>>
            +listWeeks() Week[]
            +getSection(id) Section
        }
    }
    namespace InfrastructureLayer {
        class PostgresCurriculumRepository
        class HttpApi
    }
    CurriculumService --> ICurriculumRepository : dépend de
    PostgresCurriculumRepository ..|> ICurriculumRepository : implémente
    HttpApi --> CurriculumService : appelle
```

## 4. Séquence — déploiement automatique

```mermaid
sequenceDiagram
    participant D as Dev
    participant G as GitHub
    participant A as Actions
    participant P as Pages / VPS

    D->>G: git push origin main
    G-x A: déclenche le workflow deploy
    A->>A: npm ci
    A->>A: npm run build
    alt build OK
        A->>P: publie dist/
        P-->>D: site à jour
    else build KO
        A-->>D: échec CI, rien n'est publié
    end
```

## 5. États d'une contribution hebdomadaire

```mermaid
stateDiagram-v2
    [*] --> BRANCHE : git switch -c week-XX
    BRANCHE --> PR_OUVERTE : push + open PR
    PR_OUVERTE --> CI_ROUGE : lint/tests/build KO
    CI_ROUGE --> PR_OUVERTE : corrections
    PR_OUVERTE --> RELUE : CI verte + review
    RELUE --> MERGED : squash & merge
    MERGED --> DEPLOYE : Actions publie
    DEPLOYE --> [*]
```

## 6. Dictionnaire de données (cohérence inter-modèles)

Un concept = un nom canonique = un type, dans **toutes** les couches.

| Concept | Nom canonique | Type | SQL (`docs/data-model.sql`) | OpenAPI (`docs/openapi.yaml`) | UI (`src/features/**`) |
| --- | --- | --- | --- | --- | --- |
| Identifiant de section | `section_id` | `slug` (`^[a-z0-9-]+$`) | `section.section_id` | `Section.sectionId` | `src/app/nav.js` |
| Titre de section | `section_title` | `string` | `section.title` | `Section.title` | `H2` de la section |
| Numéro de semaine | `week_number` | `integer >= 1` | `week.week_number` | `Week.number` | `docs/curriculum.md` |
| URL de ressource | `resource_url` | `uri` | `resource.url` | `Resource.url` | `SourceLink href` |
