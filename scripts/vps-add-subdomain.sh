#!/usr/bin/env bash
# =====================================================================
#  Ajoute le sous-domaine https://flashcard.vlldnt.fr sur le VPS OVH.
#  Pré-requis : l'apex vlldnt.fr est déjà provisionné (voir le repo
#  vlldnt-portal : nginx, user `deploy`, certbot, snippet de headers).
#  À lancer en root sur le VPS. Idempotent.
#
#  Usage :
#    export EMAIL="tomvieilledent@gmail.com"
#    bash vps-add-subdomain.sh
# =====================================================================
set -euo pipefail

DOMAIN="${DOMAIN:-flashcard.vlldnt.fr}"
CERT_NAME="${CERT_NAME:-vlldnt.fr}"          # lignée de certificat mutualisée
APEX="${APEX:-vlldnt.fr}"
EMAIL="${EMAIL:?export EMAIL=ton-email@exemple.fr}"
DEPLOY_USER="${DEPLOY_USER:-deploy}"
WEBROOT="/var/www/${DOMAIN}"
ACMEROOT="/var/www/certbot"
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

command -v nginx  >/dev/null || { echo "nginx absent : provisionner l'apex d'abord." >&2; exit 1; }
command -v certbot >/dev/null || { echo "certbot absent : provisionner l'apex d'abord." >&2; exit 1; }

echo ">> Racine web : ${WEBROOT}"
install -d "${WEBROOT}"
chown -R "${DEPLOY_USER}:${DEPLOY_USER}" "${WEBROOT}"
if [ ! -f "${WEBROOT}/index.html" ]; then
  printf '<!doctype html><meta charset="utf-8"><title>%s</title><h1>%s — déploiement en cours</h1>\n' \
    "${DOMAIN}" "${DOMAIN}" > "${WEBROOT}/index.html"
  chown "${DEPLOY_USER}:${DEPLOY_USER}" "${WEBROOT}/index.html"
fi

echo ">> Vhost bootstrap (HTTP only, le temps d'obtenir le certificat)"
cat > "/etc/nginx/sites-available/${DOMAIN}.conf" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};
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

echo ">> Extension du certificat ${CERT_NAME} à ${DOMAIN}"
# Réémet la lignée existante en ajoutant le SAN du sous-domaine.
CUR_DOMAINS="$(certbot certificates 2>/dev/null | awk -v c="${CERT_NAME}" '
  $1=="Certificate" && $2=="Name:" && $3==c {found=1; next}
  found && $1=="Domains:" {$1=""; print; exit}')"
D_ARGS=(-d "${APEX}" -d "www.${APEX}" -d "${DOMAIN}")
for d in ${CUR_DOMAINS}; do
  case " ${D_ARGS[*]} " in *" -d ${d} "*) : ;; *) D_ARGS+=(-d "${d}") ;; esac
done
certbot certonly --webroot -w "${ACMEROOT}" --cert-name "${CERT_NAME}" \
  "${D_ARGS[@]}" --expand --non-interactive --agree-tos -m "${EMAIL}" --keep-until-expiring

echo ">> Vhost final (HTTPS) depuis le dépôt"
VHOST_SRC="${REPO_DIR}/deploy/nginx/${DOMAIN}.conf"
SNIPPET_SRC="${REPO_DIR}/deploy/nginx/vlldnt-security-headers.conf"
[ -f "${VHOST_SRC}" ] || { echo "manque ${VHOST_SRC}" >&2; exit 1; }
install -d /etc/nginx/snippets
# Le snippet appartient à l'apex ; on ne l'écrase que s'il est absent.
[ -f /etc/nginx/snippets/vlldnt-security-headers.conf ] || \
  install -m 644 "${SNIPPET_SRC}" /etc/nginx/snippets/vlldnt-security-headers.conf
install -m 644 "${VHOST_SRC}" "/etc/nginx/sites-available/${DOMAIN}.conf"
nginx -t
systemctl reload nginx

echo
echo "OK. ${DOMAIN} est servi en HTTPS depuis ${WEBROOT}."
echo "Le workflow deploy.yml de ce dépôt y publie dist/ à chaque push sur main."
