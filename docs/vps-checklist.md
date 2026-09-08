# Checklist post-audit — actions console VPS (`vlldnt.fr`)

> Reconstruite le 2026-09-08 depuis l'état réel du serveur + du dépôt.
> VPS OVH Ubuntu, nginx 1.28.3, IPv4 `137.74.175.164`.

## État constaté (sondé le 2026-09-08)

| Point | État | Détail |
| --- | --- | --- |
| DNS `A` apex + `www` | ✅ | → `137.74.175.164` |
| DNS `AAAA` | ⚪️ absent | optionnel |
| TLS / HTTP2 | ✅ | cert Let's Encrypt valide, `http/2 200` |
| Redirection `http` → `https` | ✅ | `301` |
| Redirection `www` → apex | ✅ | `301` |
| Pipeline CI + `Deploy to VPS` | ✅ | verts, secrets `SSH_HOST` / `SSH_USER` / `SSH_KEY` posés le 2026-09-02 |
| `dist/` publié (`robots.txt`, `.well-known/security.txt`) | ✅ | `200` |
| **En-têtes de sécurité HTTP** | ❌ **manquants** | aucun `HSTS` / `CSP` / `X-Frame-Options` / `X-Content-Type-Options` / `Referrer-Policy` / `COOP` / `Permissions-Policy` en prod |
| **`server_tokens off`** | ❌ inactif | `Server: nginx/1.28.3 (Ubuntu)` — version divulguée |

**Diagnostic** : la config nginx du VPS est encore la version bootstrap (avant
durcissement). Le snippet `deploy/nginx/vlldnt-security-headers.conf` et le vhost
`deploy/nginx/vlldnt.fr.conf` (durcis, commits `3bd0717` / `966469a` / `dbe5b72`)
sont **dans le dépôt mais jamais appliqués sur le serveur**. `deploy.yml` ne fait
qu'un `rsync dist/` — il ne touche pas nginx. **Seule action manuelle root
restante.**

---

## Action à faire — appliquer la config nginx durcie

Deux options équivalentes. **A** suffit (le VPS est déjà provisionné : user
`deploy`, webroot, cert OK).

### Option A — pousser les 2 fichiers + reload (rapide)

Depuis la machine locale, à la racine du dépôt :

```bash
scp deploy/nginx/vlldnt-security-headers.conf \
    root@137.74.175.164:/etc/nginx/snippets/vlldnt-security-headers.conf
scp deploy/nginx/vlldnt.fr.conf \
    root@137.74.175.164:/etc/nginx/sites-available/vlldnt.fr.conf
```

Puis en SSH root sur le VPS :

```bash
ssh root@137.74.175.164

# 1. vérifier le nom exact de la lignée de certificat référencée par le vhost
ls /etc/letsencrypt/live/
#   -> doit contenir "vlldnt.fr". Si c'est "vlldnt.fr-0001" (ou autre),
#      corriger les 2 lignes ssl_certificate* dans
#      /etc/nginx/sites-available/vlldnt.fr.conf en conséquence.

# 2. activer le vhost, retirer le défaut
ln -sf /etc/nginx/sites-available/vlldnt.fr.conf \
       /etc/nginx/sites-enabled/vlldnt.fr.conf
rm -f /etc/nginx/sites-enabled/default

# 3. si un ancien vhost déclare encore vlldnt.fr, le sortir
grep -RIl 'server_name[^;]*vlldnt\.fr' /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ \
  | grep -v 'vlldnt.fr.conf'
#   -> déplacer chaque fichier listé hors de sites-enabled/ (mv ... /etc/nginx/_disabled/)

# 4. test + reload
nginx -t && systemctl reload nginx
```

### Option B — relancer le provisionnement complet (idempotent)

```bash
scp scripts/vps-setup.sh root@137.74.175.164:/root/
scp -r deploy root@137.74.175.164:/root/
ssh root@137.74.175.164
cd /root
export EMAIL="tomvieilledent@gmail.com"
export CI_PUBKEY="<contenu de ~/.ssh/vlldnt_deploy.pub>"   # si connu ; sinon garder l'existant
bash vps-setup.sh
```

> Si la clé publique CI n'est plus connue, ne pas relancer B (il réécrit
> `authorized_keys` du user `deploy` et casserait le déploiement). Utiliser A.

---

## Vérification (depuis n'importe où, après reload)

```bash
curl -sI https://vlldnt.fr | grep -iE \
  'strict-transport|content-security|x-frame|x-content-type|referrer-policy|cross-origin-opener|permissions-policy|^server'
```

Attendu : les **7 en-têtes** présents + `Server: nginx` **sans version**.

```bash
curl -I  https://vlldnt.fr             # 200
curl -I  http://vlldnt.fr              # 301 -> https
curl -I  https://www.vlldnt.fr         # 301 -> apex
curl -sI https://vlldnt.fr/.well-known/security.txt | head -1   # 200
sudo certbot renew --dry-run           # sur le VPS
```

Contrôle externe (note visée A/A+) :
- <https://securityheaders.com/?q=vlldnt.fr>
- <https://www.ssllabs.com/ssltest/analyze.html?d=vlldnt.fr>

---

## Rappels

- **CSP `script-src` avec hash** : le vhost épingle le SHA-256 du `<script>`
  inline de `index.html` (bootstrap thème). Si ce script change, recalculer :
  ```bash
  node -e 'const c=require("crypto"),f=require("fs");const m=f.readFileSync("dist/index.html","utf8").match(/<script>([\s\S]*?)<\/script>/);console.log("sha256-"+c.createHash("sha256").update(m[1]).digest("base64"))'
  ```
  puis reporter dans `deploy/nginx/vlldnt-security-headers.conf` **et** sur le VPS.
- **MàJ des en-têtes seuls** plus tard : recopier le snippet dans
  `/etc/nginx/snippets/` puis `nginx -t && systemctl reload nginx`.
- `deploy.yml` ne gère jamais nginx : toute évolution de conf serveur = action
  manuelle root (ou évolution de `vps-setup.sh` relancé).
