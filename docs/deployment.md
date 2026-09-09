# Déploiement — `https://flashcard.vlldnt.fr`

Le site est un build statique (`dist/`) servi par **nginx** sur le **VPS OVH**,
sur le sous-domaine `flashcard.vlldnt.fr`. La landing publique du projet est une
page du portail : `https://vlldnt.fr/flashcard` (repo séparé `vlldnt-portal`).

```
push main ─► GitHub Actions ─► npm ci + npm run build ─► rsync dist/ ─► /var/www/flashcard.vlldnt.fr ─► nginx ─► https://flashcard.vlldnt.fr
```

Chaque `push` sur `main` reconstruit et publie via `.github/workflows/deploy.yml`
(`rsync` over SSH). `workflow_dispatch` permet un déclenchement manuel.

## Pré-requis (déjà en place)

L'**apex** `vlldnt.fr` est provisionné par le repo `vlldnt-portal` :
nginx + certbot, utilisateur `deploy`, `/var/www/certbot`, snippet
`/etc/nginx/snippets/vlldnt-security-headers.conf`, hook de reload
post-renouvellement, pare-feu UFW (22 / 80 / 443). Le VPS écoute déjà en HTTPS.

Secrets GitHub de **ce** repo (`Settings → Secrets and variables → Actions`) —
mêmes valeurs que le portail :

| Type | Nom | Valeur |
| --- | --- | --- |
| Secret | `SSH_HOST` | IP du VPS |
| Secret | `SSH_USER` | `deploy` |
| Secret | `SSH_KEY` | clé privée de déploiement |
| Secret | `SSH_KNOWN_HOSTS` | sortie de `ssh-keyscan -p 22 <IP>` (évite le TOFU) |
| Variable | `SSH_PORT` | `22` (optionnel) |
| Variable | `DEPLOY_PATH` | `/var/www/flashcard.vlldnt.fr` (optionnel, valeur par défaut) |

## Mise en route du sous-domaine (une fois)

### 1. DNS (OVH)

```
A  flashcard.vlldnt.fr  <IPv4 du VPS>
```

Vérifier : `dig +short flashcard.vlldnt.fr`. Les enregistrements `MX` / `SPF` /
`TXT` de la messagerie ne sont pas touchés.

### 2. Certificat — étendre la lignée mutualisée

`flashcard.vlldnt.fr` est ajouté en SAN au certificat `vlldnt.fr` existant
(challenge HTTP-01) :

```bash
sudo certbot certonly --webroot -w /var/www/certbot --cert-name vlldnt.fr \
  -d vlldnt.fr -d www.vlldnt.fr -d flashcard.vlldnt.fr \
  --expand --non-interactive --agree-tos -m tomvieilledent@gmail.com
```

> `Strict-Transport-Security: includeSubDomains` est déjà servi sur l'apex :
> `flashcard.vlldnt.fr` **doit** répondre en HTTPS dès le premier accès.

### 3. Provisionner le vhost — `scripts/vps-add-subdomain.sh`

Copier le dépôt (ou au moins `scripts/` + `deploy/`) sur le VPS, puis en root :

```bash
export EMAIL="tomvieilledent@gmail.com"
bash scripts/vps-add-subdomain.sh
```

Le script (idempotent) : crée `/var/www/flashcard.vlldnt.fr` (propriétaire
`deploy`), pose un vhost bootstrap HTTP, étend le certificat au besoin, installe
le vhost final `deploy/nginx/flashcard.vlldnt.fr.conf`, teste et recharge nginx.

À la main :

```bash
scp deploy/nginx/flashcard.vlldnt.fr.conf ubuntu@<IP>:/tmp/
ssh ubuntu@<IP> '
  sudo install -d -o deploy -g deploy /var/www/flashcard.vlldnt.fr &&
  sudo install -m 644 /tmp/flashcard.vlldnt.fr.conf /etc/nginx/sites-available/ &&
  sudo ln -sf /etc/nginx/sites-available/flashcard.vlldnt.fr.conf /etc/nginx/sites-enabled/ &&
  sudo nginx -t && sudo systemctl reload nginx'
```

### 4. Déployer

```bash
git push origin main
```

## Vérifier

```bash
curl -I  https://flashcard.vlldnt.fr        # 200 ; HSTS + CSP + COOP + X-Frame-Options: DENY
curl -I  http://flashcard.vlldnt.fr         # 301 -> https
curl -sI https://flashcard.vlldnt.fr/robots.txt | head -1   # 200 text/plain
curl -sI https://flashcard.vlldnt.fr/llms.txt  | head -1    # 200
```

## Mise à jour des en-têtes seuls

Le snippet `deploy/nginx/vlldnt-security-headers.conf` est partagé avec l'apex
(SSOT dans `vlldnt-portal`). Pour le rafraîchir : le recopier dans
`/etc/nginx/snippets/` puis `sudo nginx -t && sudo systemctl reload nginx`. Les
`add_header` sont répétés dans chaque `location` via `include` (nginx cesse
d'hériter des en-têtes parents dès qu'un `location` en déclare un).

## Renouvellement TLS

`certbot` a son timer systemd ; le hook
`/etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh` (posé par le portail)
recharge nginx après renouvellement. Test : `sudo certbot renew --dry-run`.

## Rollback

`dist/` est reconstruit à chaque déploiement : `git revert` le commit fautif et
`push`, ou relancer le workflow sur un SHA antérieur via `workflow_dispatch`.

## Backend (plus tard)

Prévu découplé : service Node (Fastify) en `systemd`, exposé par nginx sous
`/api`, base PostgreSQL locale (schéma `docs/data-model.sql`, contrat
`docs/openapi.yaml`). À cadrer quand le besoin est défini.
