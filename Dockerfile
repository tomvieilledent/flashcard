# syntax=docker/dockerfile:1

# --- Étape 1 : build du site statique ---------------------------------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Étape 2 : image finale, nginx sert dist/ ------------------------
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/nginx/vlldnt-security-headers.conf /etc/nginx/snippets/vlldnt-security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
