/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Le site est servi à la racine de son sous-domaine (https://flashcard.vlldnt.fr)
// par nginx. `base: "/"` = chemins d'assets absolus depuis la racine.
// (Pour un déploiement en sous-dossier — GitHub Pages projet — repasser à "./".)
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: { host: "0.0.0.0", port: 3000 },
  preview: { host: "0.0.0.0", port: 4173 },
  // Pas de source maps en prod (le code est déjà public sur GitHub) — évite
  // de servir ~430 Ko de .map. Passer à "hidden" si on veut les garder hors ligne.
  build: { outDir: "dist", sourcemap: false },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.js"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{js,jsx}"],
      exclude: ["src/main.jsx", "src/test/**"],
    },
  },
});
