# 5. Le site vit sur `flashcard.vlldnt.fr`, l'apex devient un portail

- Statut : accepté
- Date : 2026-09-09
- Complète l'ADR 0004 (hébergement VPS OVH inchangé)

## Contexte

`vlldnt.fr` doit devenir le site personnel de l'auteur (présentation, portfolio,
contact) et servir de portail vers ses projets. Ce dépôt — des notes de cours de
développement fullstack, désormais nommées **Flashcard** — ne doit plus occuper
l'apex ni porter le nom « Holberton » dans sa marque ou son adresse.

## Décision

- **Adresse** : le site est servi sur `https://flashcard.vlldnt.fr`
  (`root /var/www/flashcard.vlldnt.fr`). L'apex `vlldnt.fr` est pris en charge
  par un dépôt distinct (`vlldnt-portal`, Astro) qui expose aussi la landing
  `https://vlldnt.fr/flashcard`.
- **Marque** : « Holberton — spécialisation Full Stack » → **Flashcard**. Les
  mentions de « Holberton » dans le *contenu de cours* (conventions Betty, etc.)
  restent, car factuelles.
- **Certificat** : `flashcard.vlldnt.fr` est ajouté en SAN à la lignée
  `vlldnt.fr` (`certbot --expand`, challenge HTTP-01), pas de wildcard.
- **nginx** : vhost dédié `deploy/nginx/flashcard.vlldnt.fr.conf` (HTTP→HTTPS,
  pas de `www`), réutilisant le snippet d'en-têtes partagé de l'apex.
- **Provisionnement** : `scripts/vps-setup.sh` → `scripts/vps-add-subdomain.sh`,
  qui n'installe que le sous-domaine (l'apex est provisionné par le portail).
- **CI/CD** : `deploy.yml` inchangé dans son principe ; `DEPLOY_PATH` par défaut
  passe à `/var/www/flashcard.vlldnt.fr`, `environment.url` à `https://flashcard.vlldnt.fr`.
- `vite.config.js` : `base: "/"` conservé (service à la racine du sous-domaine).

## Conséquences

- Le dépôt GitHub `holberton-spe-fullstack` est renommé `flashcard`
  (`gh repo rename flashcard`) ; badges, liens et `package.json` suivent.
- HSTS `includeSubDomains` de l'apex impose HTTPS sur `flashcard.vlldnt.fr` dès
  le premier accès — aucune phase HTTP.
- Le certificat mutualisé lie les cycles de renouvellement de l'apex et du
  sous-domaine (une seule lignée `vlldnt.fr`).
- Le premier déploiement écrit dans `/var/www/flashcard.vlldnt.fr` (pré-peuplé
  par le script) ; `rsync --delete` n'affecte plus l'apex.
