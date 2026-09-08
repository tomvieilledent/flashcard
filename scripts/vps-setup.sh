#!/usr/bin/env bash
# =====================================================================
#  Provisionnement du VPS OVH pour servir https://vlldnt.fr
#  À lancer UNE FOIS, en root, sur le VPS (Debian 12 / Ubuntu 22.04+).
#  Idempotent : relançable sans casse.
#
#  ATTENTION : remplace le vhost par défaut de nginx et prend la main
#  sur vlldnt.fr / www.vlldnt.fr.
#
#  Usage :
#    export EMAIL="tomvieilledent@gmail.com"
#    export CI_PUBKEY="ssh-ed25519 AAAA... gha-deploy-vlldnt"
#    bash vps-setup.sh
# =====================================================================
set -euo pipefail

DOMAIN="${DOMAIN:-vlldnt.fr}"
EMAIL="${EMAIL:?export EMAIL=ton-email@exemple.fr}"
CI_PUBKEY="${CI_PUBKEY:?export CI_PUBKEY='ssh-ed25519 AAAA... gha-deploy'}"
DEPLOY_USER="${DEPLOY_USER:-deploy}"
WEBROOT="/var/www/${DOMAIN}"
ACMEROOT="/var/www/certbot"

echo ">> Paquets"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y nginx rsync ufw certbot

echo ">> Utilisateur de déploiement : ${DEPLOY_USER}"
id -u "${DEPLOY_USER}" >/dev/null 2>&1 || adduser --disabled-password --gecos "" "${DEPLOY_USER}"
install -d -m 700 -o "${DEPLOY_USER}" -g "${DEPLOY_USER}" "/home/${DEPLOY_USER}/.ssh"
printf '%s\n' "${CI_PUBKEY}" > "/home/${DEPLOY_USER}/.ssh/authorized_keys"
chown "${DEPLOY_USER}:${DEPLOY_USER}" "/home/${DEPLOY_USER}/.ssh/authorized_keys"
chmod 600 "/home/${DEPLOY_USER}/.ssh/authorized_keys"

echo ">> Racine web : ${WEBROOT}"
install -d "${WEBROOT}"
# chown récursif : le dossier peut préexister avec les fichiers d'un ancien site.
chown -R "${DEPLOY_USER}:${DEPLOY_USER}" "${WEBROOT}"
install -d "${ACMEROOT}"
if [ ! -f "${WEBROOT}/index.html" ]; then
  printf '<!doctype html><meta charset="utf-8"><title>%s</title><h1>%s — déploiement en cours</h1>\n' \
    "${DOMAIN}" "${DOMAIN}" > "${WEBROOT}/index.html"
  chown "${DEPLOY_USER}:${DEPLOY_USER}" "${WEBROOT}/index.html"
fi

echo ">> Pare-feu (UFW)"
ufw allow OpenSSH        >/dev/null
ufw allow 'Nginx Full'   >/dev/null
ufw --force enable       >/dev/null

echo ">> Sauvegarde de la config nginx existante"
BACKUP="/etc/nginx.bak.$(date +%Y%m%d-%H%M%S)"
cp -a /etc/nginx "${BACKUP}"
echo "   -> ${BACKUP}"

echo ">> Désactivation des vhosts qui revendiquent ${DOMAIN} (hors le nôtre)"
# nginx (Ubuntu) inclut « sites-enabled/* » SANS filtre d'extension : renommer
# en .disabled ne suffit pas, il faut sortir le fichier du dossier.
DISABLED_DIR="/etc/nginx/_disabled"
install -d "${DISABLED_DIR}"
rm -f /etc/nginx/sites-enabled/default
for f in /etc/nginx/sites-enabled/* /etc/nginx/conf.d/*.conf; do
  [ -e "$f" ] || continue
  case "$f" in */"${DOMAIN}.conf") continue ;; esac
  if grep -Eq "server_name[^;]*(^|[[:space:]])${DOMAIN//./\\.}([[:space:]]|;)" "$f" 2>/dev/null; then
    echo "   - $f  (déclare ${DOMAIN}) -> ${DISABLED_DIR}/"
    mv "$f" "${DISABLED_DIR}/"
  fi
done

echo ">> Vhost bootstrap (HTTP)"
cat > "/etc/nginx/sites-available/${DOMAIN}.conf" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};
    server_tokens off;
    root ${WEBROOT};
    index index.html;
    location /.well-known/acme-challenge/ { root ${ACMEROOT}; }
    location / { try_files \$uri \$uri/ /index.html; }
}
EOF
ln -sf "/etc/nginx/sites-available/${DOMAIN}.conf" "/etc/nginx/sites-enabled/${DOMAIN}.conf"
nginx -t
systemctl reload nginx

echo ">> Certificat Let's Encrypt (webroot)"
# --keep-until-expiring : ne réémet pas si un certificat valide existe déjà.
# --cert-name : lignée déterministe, réutilise un éventuel certificat existant.
certbot certonly --webroot -w "${ACMEROOT}" \
  --cert-name "${DOMAIN}" -d "${DOMAIN}" -d "www.${DOMAIN}" \
  --non-interactive --agree-tos -m "${EMAIL}" --keep-until-expiring --expand

echo ">> Snippet en-têtes de sécurité"
install -d /etc/nginx/snippets
# SSOT = deploy/nginx/vlldnt-security-headers.conf. On le copie s'il est là
# (dépôt cloné sur le VPS), sinon on écrit une copie de secours identique.
SNIPPET_SRC="$(cd "$(dirname "$0")" && pwd)/../deploy/nginx/vlldnt-security-headers.conf"
if [ -f "${SNIPPET_SRC}" ]; then
  install -m 644 "${SNIPPET_SRC}" /etc/nginx/snippets/vlldnt-security-headers.conf
else
  # Copie de secours — DOIT rester identique à
  # deploy/nginx/vlldnt-security-headers.conf.
  cat > "/etc/nginx/snippets/vlldnt-security-headers.conf" <<'EOF'
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
add_header Permissions-Policy "geolocation=(), camera=(), microphone=(), payment=(), usb=(), interest-cohort=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'sha256-rc8oRlSkpzS65XHTf/ScPm0RzBk0KNZMHtDCcUOOmzc='; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'" always;
EOF
fi

echo ">> Vhost final (HTTPS)"
# SSOT = deploy/nginx/vlldnt.fr.conf. On le copie s'il est là, sinon copie
# de secours (à garder identique au fichier versionné).
VHOST_SRC="$(cd "$(dirname "$0")" && pwd)/../deploy/nginx/vlldnt.fr.conf"
if [ -f "${VHOST_SRC}" ]; then
  install -m 644 "${VHOST_SRC}" "/etc/nginx/sites-available/${DOMAIN}.conf"
else
  cat > "/etc/nginx/sites-available/${DOMAIN}.conf" <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name vlldnt.fr www.vlldnt.fr;
    server_tokens off;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://vlldnt.fr$request_uri; }
}
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name www.vlldnt.fr;
    server_tokens off;
    ssl_certificate     /etc/letsencrypt/live/vlldnt.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vlldnt.fr/privkey.pem;
    return 301 https://vlldnt.fr$request_uri;
}
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name vlldnt.fr;
    server_tokens off;
    root /var/www/vlldnt.fr;
    index index.html;

    ssl_certificate     /etc/letsencrypt/live/vlldnt.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vlldnt.fr/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 127.0.0.53 valid=300s;
    resolver_timeout 5s;

    gzip on;
    gzip_vary on;
    gzip_min_length 512;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    include snippets/vlldnt-security-headers.conf;

    location /assets/ {
        include snippets/vlldnt-security-headers.conf;
        add_header Cache-Control "public, max-age=31536000, immutable" always;
        try_files $uri =404;
    }
    location / {
        include snippets/vlldnt-security-headers.conf;
        add_header Cache-Control "no-cache" always;
        try_files $uri $uri/ /index.html;
    }
}
EOF
fi
nginx -t
systemctl reload nginx

echo ">> Rechargement de nginx après renouvellement auto du certificat"
install -d /etc/letsencrypt/renewal-hooks/deploy
printf '#!/bin/sh\nsystemctl reload nginx\n' > /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh

echo
echo "OK. Prochaines étapes :"
echo "  1. DNS : A ${DOMAIN} -> IP du VPS, A www.${DOMAIN} -> IP du VPS"
echo "  2. Secrets GitHub : SSH_HOST, SSH_USER=${DEPLOY_USER}, SSH_KEY (clé privée)"
echo "  3. git push origin main  ->  le workflow deploy.yml publie dist/ ici"
