import {
  siAstro,
  siCplusplus,
  siDjango,
  siDocker,
  siDotnet,
  siDrizzle,
  siElasticsearch,
  siExpress,
  siFastapi,
  siFlask,
  siFlutter,
  siGit,
  siGithub,
  siGradle,
  siGraphql,
  siHibernate,
  siJavascript,
  siJsonwebtokens,
  siKotlin,
  siLaravel,
  siMariadb,
  siMeilisearch,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNpm,
  siNuxt,
  siOpenjdk,
  siPhp,
  siPnpm,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siRedis,
  siRust,
  siSequelize,
  siShopify,
  siSocketdotio,
  siSpringboot,
  siSqlalchemy,
  siSqlite,
  siSvelte,
  siSwift,
  siTailwindcss,
  siTypeorm,
  siTypescript,
  siUnity,
  siVite,
  siVuedotjs,
  siWoocommerce,
  siYarn,
} from "simple-icons";
import { Table } from "./primitives.jsx";

/* Nom affiché dans le texte -> icône Simple Icons.
   Les noms ambigus (« C », « Go ») sont volontairement absents. */
const ICONS = {
  Astro: siAstro,
  "C++": siCplusplus,
  Django: siDjango,
  Docker: siDocker,
  ".NET": siDotnet,
  Drizzle: siDrizzle,
  Elasticsearch: siElasticsearch,
  Express: siExpress,
  FastAPI: siFastapi,
  Flask: siFlask,
  Flutter: siFlutter,
  Git: siGit,
  GitHub: siGithub,
  Gradle: siGradle,
  GraphQL: siGraphql,
  "Hibernate / JPA": siHibernate,
  Hibernate: siHibernate,
  Java: siOpenjdk,
  JavaScript: siJavascript,
  JWT: siJsonwebtokens,
  Kotlin: siKotlin,
  Laravel: siLaravel,
  MariaDB: siMariadb,
  Meilisearch: siMeilisearch,
  MongoDB: siMongodb,
  MySQL: siMysql,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  npm: siNpm,
  Nuxt: siNuxt,
  PHP: siPhp,
  pnpm: siPnpm,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  Python: siPython,
  React: siReact,
  Redis: siRedis,
  Rust: siRust,
  Sequelize: siSequelize,
  Shopify: siShopify,
  WebSocket: siSocketdotio,
  "Spring Boot": siSpringboot,
  SQLAlchemy: siSqlalchemy,
  SQLite: siSqlite,
  Svelte: siSvelte,
  Swift: siSwift,
  Tailwind: siTailwindcss,
  TypeORM: siTypeorm,
  TypeScript: siTypescript,
  Unity: siUnity,
  Vite: siVite,
  Vue: siVuedotjs,
  WooCommerce: siWoocommerce,
  yarn: siYarn,
};

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const NAMES = Object.keys(ICONS).sort((a, b) => b.length - a.length);
const PATTERN = new RegExp(
  `(?<![\\w.+#-])(${NAMES.map(escape).join("|")})(?![\\w#-]|\\.\\w)`,
  "g"
);

/* Les marques très sombres disparaîtraient en thème sombre : on les laisse
   hériter de la couleur du texte. */
function fillFor(hex) {
  const n = parseInt(hex, 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.3 ? "currentColor" : `#${hex}`;
}

export function TechLogo({ name, size = 16 }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fillFor(icon.hex)}
      style={{ verticalAlign: "-3px", marginRight: 5, flex: "none" }}
    >
      <path d={icon.path} />
    </svg>
  );
}

/* Ajoute le logo devant chaque techno reconnue dans un texte. */
export function withLogos(text) {
  if (typeof text !== "string") return text;
  const parts = text.split(PATTERN);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} style={{ whiteSpace: "nowrap" }}>
        <TechLogo name={part} />
        {part}
      </span>
    ) : (
      part
    )
  );
}

/* Table de contenu dont les colonnes `cols` affichent les logos des technos
   citées (toutes les colonnes si `cols` est omis). */
export function TechTable({ rows, cols, ...rest }) {
  const show = (j) => !cols || cols.includes(j);
  return (
    <Table
      {...rest}
      rows={rows.map((r) => r.map((c, j) => (show(j) ? withLogos(c) : c)))}
    />
  );
}
