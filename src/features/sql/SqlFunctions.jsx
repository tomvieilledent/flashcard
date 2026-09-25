import { Code, InlineCode, P, H2, H3, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>SQL — colonnes calculées, agrégats, GROUP BY, HAVING</H2>
      <P>
        Les fonctions SQL calculent des attributs dérivés à partir des données
        stockées.
      </P>

      <H3>Colonnes calculées et alias</H3>
      <Code>{`SELECT custID, orderDate, UPC,
       unitSalePrice * quantity AS subtotal
FROM orderlines;

SELECT unitSalePrice * 1.06 AS \`prix TTC\`     -- constante dans le calcul ; alias à espaces : backticks
FROM orderlines;`}</Code>

      <H3>Fonctions d'agrégation</H3>
      <Table
        head={["Fonction", "Résultat"]}
        rows={[
          ["SUM(x)", "Somme"],
          ["COUNT(*) / COUNT(col)", "Nombre de lignes / de valeurs non nulles"],
          ["MIN(x), MAX(x)", "Plus petite / plus grande valeur"],
          ["AVG(x)", "Moyenne"],
        ]}
      />
      <Code>{`SELECT SUM(unitSalePrice * quantity) AS totalsales FROM orderlines;
SELECT COUNT(*) FROM orders;`}</Code>

      <H3>GROUP BY : un résultat par groupe</H3>
      <Code>{`SELECT custID, orderDate, SUM(unitSalePrice * quantity) AS total
FROM orderlines
GROUP BY custID, orderDate;

SELECT prodname, COUNT(prodname) AS times_ordered
FROM products
GROUP BY prodname;`}</Code>

      <H3>HAVING : filtrer les groupes</H3>
      <P>
        <InlineCode>WHERE</InlineCode> filtre les lignes <em>avant</em>{" "}
        regroupement ; <InlineCode>HAVING</InlineCode> filtre les groupes{" "}
        <em>après</em> l'agrégation.
      </P>
      <Code>{`SELECT prodname, COUNT(prodname) AS times_ordered
FROM products NATURAL JOIN orderlines
GROUP BY prodname
HAVING COUNT(prodname) > 1;`}</Code>

      <H3>Autres familles de fonctions</H3>
      <Table
        head={["Famille", "Exemples d'usage (la syntaxe varie selon le SGBD)"]}
        rows={[
          ["Numériques", "Arrondir, tronquer, convertir, formater"],
          ["Caractères", "Concaténer, changer la casse, extraire (CONCAT, UPPER, SUBSTRING)"],
          ["Date / heure", "Formater, lire l'heure système (NOW, DATE_FORMAT)"],
          ["Conversion de type", "Date / nombre vers chaîne (CAST, CONVERT)"],
          ["NULL & conditionnel", "IFNULL, COALESCE, CASE WHEN"],
        ]}
      />
      <Note accent={MERISE_ACCENT}>
        Le cours de référence met les alias entre guillemets doubles ; en
        MySQL, utilisez plutôt des backticks (ou des alias sans espace).
      </Note>

      <SourceLink href="https://github.com/hs-hq/project_resources/blob/main/sql/database_design_functions.md">
        hs-hq — Database design : functions
      </SourceLink>
    </div>
  );
}

export default function SqlFunctions() {
  return <Fr />;
}
