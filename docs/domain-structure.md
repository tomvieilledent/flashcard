# Structure du domaine `vlldnt.fr` (VPS)

## Principe général

Le domaine héberge **le site perso** + **un ensemble de projets**.
Chaque projet suit le même patron :

- une **landing page** sous `vlldnt.fr/<projet>` (présentation, hébergée avec le site perso)
- une **application** sur son **sous-domaine dédié** `<projet>.vlldnt.fr`

## Vue d'ensemble

| Hôte / URL | Rôle | Type |
|------------|------|------|
| `vlldnt.fr` | Page perso : présentation, liste des projets, contact | Site principal |
| `www.vlldnt.fr` | Alias → redirige vers `vlldnt.fr` | Redirection |
| `vlldnt.fr/<projet>` | Landing page du projet `<projet>` | Sous-chemin du site principal |
| `<projet>.vlldnt.fr` | Application du projet `<projet>` | Sous-domaine dédié |

### Exemple concret : Flashcard

| URL | Rôle |
|-----|------|
| `vlldnt.fr/flashcard` | Landing page Flashcard |
| `flashcard.vlldnt.fr` | Application Flashcard |

## Schéma général

```
                              vlldnt.fr  (domaine)
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
   apex / www              sous-chemins /<projet>        sous-domaines
        │                           │                           │
  vlldnt.fr                 vlldnt.fr/flashcard         flashcard.vlldnt.fr
  www.vlldnt.fr             vlldnt.fr/projet-2          projet-2.vlldnt.fr
        │                   vlldnt.fr/projet-N          projet-N.vlldnt.fr
        │                           │                           │
   Page perso              Landing pages des             Applications
   (projets, contact)      projets (présentation)        (les sites)
        │                           │                           │
        └────── liens ──────────────┴────── liens ──────────────┘
```

## Routage sur le VPS

```
DNS
 ├─ vlldnt.fr             A ──▶ IP du VPS
 ├─ www.vlldnt.fr         A ──▶ IP du VPS   (ou CNAME vlldnt.fr)
 ├─ flashcard.vlldnt.fr   A ──▶ IP du VPS
 └─ <projet>.vlldnt.fr    A ──▶ IP du VPS   (un enregistrement par projet)

nginx (reverse proxy + TLS)
 ├─ server_name vlldnt.fr www.vlldnt.fr
 │     ├─ /                ──▶ site perso (statique)
 │     ├─ /flashcard       ──▶ landing page Flashcard (statique)
 │     └─ /<projet>        ──▶ landing page <projet> (statique)
 │
 ├─ server_name flashcard.vlldnt.fr
 │     └─ /                ──▶ application Flashcard
 │
 └─ server_name <projet>.vlldnt.fr
       └─ /                ──▶ application <projet>   (un server block par projet)
```
