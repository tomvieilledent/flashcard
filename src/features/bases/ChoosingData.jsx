import { InlineCode, P, H2, H3, Ul, Note, Table } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

export default function ChoosingData() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Choisir sa base de données et son ORM</H2>

      <H3>Le problème : tant de bases, tant d'ORM</H3>
      <P>
        PostgreSQL, MySQL, SQLite, MongoDB, Redis… puis Prisma, SQLAlchemy,
        Django ORM. Le choix se fait en deux temps : d'abord le{" "}
        <strong>type de base</strong>, ensuite l'<strong>ORM</strong> qui suit
        votre langage.
      </P>

      <H3>1. Quel type de base ?</H3>
      <Table
        head={["Situation", "Choix", "Pourquoi"]}
        rows={[
          ["Données liées entre elles (utilisateurs, commandes, inscriptions)", "SQL : PostgreSQL", "Relations, contraintes, transactions fiables"],
          ["Projet classique, hébergement mutualisé", "SQL : MySQL / MariaDB", "Très répandu, simple à héberger"],
          ["Prototype, petite appli, tests, mobile", "SQLite", "Un seul fichier, aucune installation"],
          ["Données de forme variable, peu de relations", "NoSQL document : MongoDB", "Schéma souple, documents imbriqués"],
          ["Cache, sessions, files d'attente", "Redis", "Mémoire, extrêmement rapide"],
          ["Recherche textuelle avancée", "Elasticsearch, Meilisearch", "Index de recherche dédié"],
          ["Fichiers (images, PDF)", "Stockage objet : S3", "Une base n'est pas faite pour les gros fichiers"],
        ]}
      />
      <Note accent={MERISE_ACCENT}>
        Réflexe par défaut : <InlineCode>PostgreSQL</InlineCode>. Il couvre
        presque tous les besoins d'une appli web, y compris du JSON. On ajoute
        une base spécialisée (Redis…) seulement quand un vrai besoin apparaît.
      </Note>

      <H3>2. Quel ORM ?</H3>
      <P>L'ORM se choisit surtout selon le langage et le framework déjà retenus.</P>
      <Table
        head={["Stack", "ORM", "À savoir"]}
        rows={[
          ["Django", "Django ORM", "Inclus, migrations automatiques, le plus simple pour débuter"],
          ["Python (FastAPI, Flask)", "SQLAlchemy (+ Alembic)", "Puissant, plus de configuration"],
          ["Node.js / TypeScript", "Prisma", "Schéma lisible, bon typage, très populaire"],
          ["Node.js, au plus près du SQL", "Drizzle, Knex", "Plus léger, plus proche du SQL"],
          ["Node.js, style classes et décorateurs", "TypeORM, Sequelize", "Courants dans les projets existants"],
          ["Laravel (PHP)", "Eloquent", "Inclus, très lisible"],
          ["Spring Boot (Java)", "Hibernate / JPA", "Standard de l'écosystème Java"],
        ]}
      />

      <H3>ORM ou SQL brut ?</H3>
      <Ul>
        <li>
          <strong>ORM</strong> : pour le CRUD courant, les relations simples,
          l'équipe qui débute, la rapidité de développement.
        </li>
        <li>
          <strong>SQL brut</strong> : pour les rapports complexes, les
          requêtes très optimisées, les besoins précis de performance.
        </li>
        <li>
          Les deux se combinent : la plupart des ORM laissent écrire du SQL
          quand il le faut.
        </li>
      </Ul>
      <Note accent={MERISE_ACCENT}>
        Dans tous les cas, apprenez les bases de SQL : un ORM le génère, mais
        il faut le comprendre pour déboguer une requête lente.
      </Note>
    </div>
  );
}
