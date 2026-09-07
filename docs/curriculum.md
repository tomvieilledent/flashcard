# Journal du cursus

Une ligne par semaine. Chaque semaine ajoute des sections au site
(`src/App.jsx` + `NAV`) et, si besoin, met à jour `docs/` (SSOT).

## User Story type (INVEST)

> **En tant qu'** étudiant Holberton
> **je veux** retrouver les notions de la semaine dans une section dédiée du site
> **afin de** réviser sans rouvrir tous les supports de cours.
>
> **Critères d'acceptation**
> - la section apparaît dans la navigation, à la bonne place (ordre du cours) ;
> - elle suit la trame Problème → Solution → exemples → ressources ;
> - `npm run ci` passe (lint + spec:lint + tests + build) ;
> - `docs/` est à jour si la semaine introduit un modèle de données / d'échange.

## Semaines

| Semaine | Thème | Sections ajoutées | Docs impactés |
| --- | --- | --- | --- |
| — | Socle | React / Vue / Svelte, Outillage, Docker, DevOps & Git, CI/CD, Merise | — |
| S+1 | Analyse & conception (approfondissement) | Architecture, Bases de données & modélisation, UML, API & contrats, Spécifier le besoin, Cohérence & documentation | `architecture.md`, `data-model.sql`, `openapi.yaml` |
| S+1 | Refonte navigation | 4 catégories (Frontend / Backend / DevOps / Documentation & méthode), recherche plein texte, suppression de la « Vue d'ensemble » | `src/app/nav.js`, `src/app/search.js` |
| S+2 | IA agentique & Agentic Ops | Nouvelle catégorie **IA & agents** : Intent-Driven Development & dette sémantique, architecture des LLMs (tokens & probabilités), fenêtre de contexte & amnésie, modèle économique (FinOps 101) | `src/app/nav.js`, `src/shared/ui/tokens.js` |
| S+3 | _à venir_ | | |

## Backlog d'idées d'évolution

- [ ] Mode clair / sombre (persistance `localStorage`).
- [x] Recherche plein texte côté client (index bâti depuis le source, chunk à la demande).
- [x] Lien permanent par section (`#hash`).
- [ ] Persistance de l'état plié/déplié des catégories (`localStorage`).
- [ ] Génération de `NAV` depuis `docs/data-model.sql` (un seul modèle).
- [ ] Backend optionnel sur le VPS exposant `docs/openapi.yaml`.
