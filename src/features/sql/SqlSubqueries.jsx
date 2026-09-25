import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>SQL — sous-requêtes</H2>
      <P>
        Une sous-requête répond à un problème courant : au moment d'écrire la
        requête, on ne dispose pas de l'information nécessaire pour choisir les
        lignes. On la calcule donc avec une autre requête, imbriquée.
      </P>

      <H3>Sous-requête à valeur unique</H3>
      <Code>{`-- Clients du même code postal que Wayne Dick
SELECT cFirstName, cLastName, cZipCode
FROM customers
WHERE cZipCode =
  (SELECT cZipCode
   FROM customers
   WHERE cFirstName = 'Wayne' AND cLastName = 'Dick');`}</Code>

      <H3>Sous-requête d'agrégat</H3>
      <Code>{`-- Produits vendus plus cher que le prix moyen
SELECT DISTINCT prodName, unitSalePrice
FROM Products NATURAL JOIN OrderLines
WHERE unitSalePrice >
  (SELECT AVG(unitSalePrice)
   FROM OrderLines);`}</Code>

      <H3>À retenir</H3>
      <Ul>
        <li>Une sous-requête est toujours entre <strong>parenthèses</strong>.</li>
        <li>Renvoyant une seule colonne et une seule ligne, elle remplace n'importe quelle valeur unique d'un <InlineCode>WHERE</InlineCode>.</li>
        <li>Renvoyant plusieurs valeurs, elle s'utilise avec <InlineCode>IN</InlineCode>, <InlineCode>ANY</InlineCode>, <InlineCode>ALL</InlineCode> ou <InlineCode>EXISTS</InlineCode>.</li>
        <li><InlineCode>DISTINCT</InlineCode> est nécessaire quand les attributs affichés ne forment pas une clé unique (doublons).</li>
        <li>Afficher les attributs pertinents permet de vérifier le résultat.</li>
      </Ul>
      <Code>{`SELECT prodName
FROM Products
WHERE prodID IN (SELECT prodID FROM OrderLines WHERE quantity > 5);`}</Code>
      <Note accent={MERISE_ACCENT}>
        MySQL 8.0 gère aussi les sous-requêtes corrélées et les tables dérivées
        (sous-requête dans le <InlineCode>FROM</InlineCode>).
      </Note>

      <SourceLink href="https://github.com/hs-hq/project_resources/blob/main/sql/database_design_subqueries.md">
        hs-hq — Database design : subqueries
      </SourceLink>
    </div>
  );
}

export default function SqlSubqueries() {
  return <Fr />;
}
