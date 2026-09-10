# Déploiement — `https://flashcard.vlldnt.fr`

Ce dépôt ne gère plus lui-même son infrastructure. Le déploiement est piloté
par l'orchestrateur du domaine, dans le dépôt **`portfolio`**
(`~/Documents/Vieilledent conseil/vlldnt.fr/portfolio/`).

## Comment ça marche

```
push main ─► .github/workflows/deploy.yml ─► SSH VPS ─► /opt/vlldnt/scripts/deploy-project.sh flashcard
```

`deploy-project.sh` :
1. lit `/opt/vlldnt/config/projects.yml` — si `flashcard` n'est pas `deployed: true`, **ne fait rien** ;
2. sinon : `git clone/pull` de ce dépôt sur le VPS → `npm ci && npm run build` →
   publie `dist/` dans `/opt/vlldnt/projects/flashcard/current` ;
3. si un dossier `landing-page/` existe à la racine → il est publié sur
   `https://vlldnt.fr/flashcard` ;
4. génère le vhost nginx `flashcard.vlldnt.fr` (certificat wildcard `*.vlldnt.fr`)
   et recharge nginx.

## Activer / désactiver / supprimer

Tout se passe dans `portfolio/projects.yml` :

| Action | Dans `projects.yml` |
| --- | --- |
| activer | ligne `flashcard` → `deployed: true`, puis workflow *Sync projects* |
| désactiver | `deployed: false` → retiré du VPS au prochain sync |
| supprimer | retirer la ligne → suppression du VPS (backup + confirmation) |

## Secrets GitHub de ce dépôt

`SSH_HOST`, `SSH_USER` (= `deploy`), `SSH_KEY` (clé privée de déploiement),
`SSH_KNOWN_HOSTS`. Mêmes valeurs que le dépôt `portfolio`.

## Détails

- Infra complète : `portfolio/DEPLOYMENT.md` et `portfolio/README.md`.
- Runbook de mise en place : `~/Documents/Vieilledent conseil/vlldnt.fr/RUNBOOK.md`.
- Historique : `docs/adr/0005-sous-domaine-flashcard.md`.
