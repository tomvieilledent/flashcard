import { Code, InlineCode, P, H2, H3, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>SQL — interroger une table : SELECT, WHERE, ORDER BY</H2>
      <Code>{`SELECT {attribut}+
FROM {table}+
[ WHERE {prédicat booléen pour choisir les lignes} ]
[ ORDER BY {attribut}+ ];`}</Code>
      <Table
        head={["Clause", "Rôle"]}
        rows={[
          ["SELECT", "Choisit les colonnes ; * = toutes"],
          ["FROM", "Nomme la table source"],
          ["WHERE", "Filtre les lignes avec un prédicat booléen"],
          ["ORDER BY", "Ordonne le résultat : ASC (défaut) croissant, DESC décroissant"],
        ]}
      />

      <H3>Construire une requête pas à pas</H3>
      <Code>{`-- 1. Toutes les données
SELECT * FROM customers;

-- 2. Ajouter une condition
SELECT * FROM customers
WHERE cZipCode = '90840';

-- 3. Choisir des colonnes
SELECT cLastName, cFirstName, cPhone
FROM customers
WHERE cZipCode = '90840';

-- 4. Ordonner
SELECT cLastName, cFirstName, cPhone
FROM customers
WHERE cZipCode = '90840'
ORDER BY cLastName ASC, cFirstName ASC;`}</Code>

      <H3>Algèbre relationnelle (RA)</H3>
      <P>
        Deux opérateurs correspondent à SELECT / WHERE :
      </P>
      <Table
        head={["Opérateur", "Nom", "Rôle", "SQL"]}
        rows={[
          ["σ (sigma)", "Sélection", "Choisit les tuples qui satisfont un prédicat : σθ(e)", "WHERE"],
          ["π (pi)", "Projection", "Choisit les attributs (colonnes) : πX(e)", "liste du SELECT"],
        ]}
      />
      <Code>{`π cLastName, cFirstName, cPhone ( σ cZipCode='90840' ( customers ) )`}</Code>
      <Note accent={MERISE_ACCENT}>
        Différence : le résultat d'une expression RA est un <strong>ensemble</strong>{" "}
        (sans ordre, sans doublons) ; SQL, lui, peut ordonner (
        <InlineCode>ORDER BY</InlineCode>) et renvoyer des doublons sauf si l'on
        écrit <InlineCode>DISTINCT</InlineCode>.
      </Note>

      <SourceLink href="https://github.com/hs-hq/project_resources/blob/main/sql/database_design_queries.md">
        hs-hq — Database design : queries
      </SourceLink>
    </div>
  );
}

export default function SqlQueries() {
  return <Fr />;
}
