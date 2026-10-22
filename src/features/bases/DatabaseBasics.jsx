import { Code, InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { TechTable } from "../../shared/ui/tech.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

export default function DatabaseBasics() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Base de données : SQL et NoSQL</H2>

      <H3>Le problème : où ranger les données ?</H3>
      <P>
        Un serveur qui redémarre perd ce qu'il a en mémoire. Pour garder des
        comptes, des événements ou des messages, il faut les stocker
        durablement, et pouvoir les retrouver vite.
      </P>

      <H3>La solution : une base de données</H3>
      <P>
        Un programme dédié (<strong>SGBD</strong>) qui range les données et
        répond à des questions appelées <strong>requêtes</strong>.
      </P>
      <TechTable
        head={["", "SQL (relationnelle)", "NoSQL"]}
        rows={[
          ["Structure", "Tables avec lignes et colonnes", "Documents, clé/valeur, graphes…"],
          ["Schéma", "Défini à l'avance", "Souple"],
          ["Relations", "Liens entre tables (clés étrangères)", "Souvent imbriquées dans le document"],
          ["Exemples", "PostgreSQL, MySQL, SQLite", "MongoDB, Redis"],
        ]}
      />
      <Code>{`-- Table users
id | name | email
1  | Léa  | lea@exemple.fr

SELECT name FROM users WHERE id = 1;`}</Code>
      <Ul>
        <li>
          <strong>Table</strong> : un tableau d'un même type d'objet.
        </li>
        <li>
          <strong>Clé primaire</strong> : l'identifiant unique d'une ligne
          (<InlineCode>id</InlineCode>).
        </li>
        <li>
          <strong>Clé étrangère</strong> : une colonne qui pointe vers la clé
          primaire d'une autre table.
        </li>
        <li>
          <strong>CRUD</strong> : Create, Read, Update, Delete, les 4 opérations
          de base.
        </li>
      </Ul>
      <Note accent={MERISE_ACCENT}>
        Pour débuter, SQL est un bon choix par défaut : des données liées entre
        elles (utilisateurs, événements, inscriptions) s'y modélisent
        naturellement.
      </Note>
    </div>
  );
}
