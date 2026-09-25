import { Code, InlineCode, P, H2, H3, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>SQL — DDL, DML, transactions & privilèges</H2>
      <P>
        Le SQL se divise en <strong>DDL</strong> (Data Definition Language :
        la structure) et <strong>DML</strong> (Data Manipulation Language : les
        données).
      </P>

      <H3>DDL : définir la structure</H3>
      <Code>{`CREATE TABLE <nom_table> (
  <attribut_1> <type_1>,
  ...
  <attribut_n> <type_n>
);

-- Exemple
CREATE TABLE customers (
  custID     INT,
  cLastName  VARCHAR(40),
  cFirstName VARCHAR(40),
  cZipCode   CHAR(5),
  birthDate  DATE
);`}</Code>
      <P>
        Types courants : <InlineCode>VARCHAR</InlineCode> /{" "}
        <InlineCode>CHAR</InlineCode> (texte), <InlineCode>INT</InlineCode> /{" "}
        <InlineCode>DECIMAL</InlineCode> (nombres), <InlineCode>DATE</InlineCode>.
      </P>

      <H3>Clés primaires et étrangères</H3>
      <Code>{`ALTER TABLE customers
  ADD CONSTRAINT customers_pk PRIMARY KEY (custID);

ALTER TABLE orders
  ADD CONSTRAINT orders_customers_fk
  FOREIGN KEY (custID) REFERENCES customers (custID);`}</Code>
      <P>
        Convention de nommage : <InlineCode>table_pk</InlineCode> pour une clé
        primaire, <InlineCode>tableenfant_tableparent_fk</InlineCode> pour une
        clé étrangère.
      </P>

      <H3>Supprimer</H3>
      <Code>{`DROP TABLE customers;

-- Supprimer une contrainte
ALTER TABLE orders DROP FOREIGN KEY orders_customers_fk;   -- MySQL
ALTER TABLE customers DROP PRIMARY KEY;                    -- MySQL`}</Code>
      <Note accent={MERISE_ACCENT}>
        Le cours de référence utilise la syntaxe standard{" "}
        <InlineCode>DROP CONSTRAINT nom</InlineCode> ; MySQL demande la forme
        spécifique (<InlineCode>DROP FOREIGN KEY</InlineCode>,{" "}
        <InlineCode>DROP PRIMARY KEY</InlineCode>, <InlineCode>DROP CHECK</InlineCode>).
      </Note>

      <H3>DML : manipuler les données</H3>
      <Code>{`-- INSERT : chaînes et dates entre apostrophes, nombres sans
INSERT INTO customers
VALUES (1, 'Dick', 'Wayne', '90840', '1980-05-17');

INSERT INTO customers (custID, cLastName)      -- colonnes explicites
VALUES (2, 'Kent');

-- UPDATE : plusieurs colonnes séparées par des virgules
UPDATE customers
SET cZipCode = '90841', cFirstName = 'Bruce'
WHERE custID = 1;

-- DELETE
DELETE FROM customers
WHERE custID = 2;`}</Code>
      <Note accent={MERISE_ACCENT}>
        Sans <InlineCode>WHERE</InlineCode>, <InlineCode>UPDATE</InlineCode> et{" "}
        <InlineCode>DELETE</InlineCode> touchent <strong>toutes</strong> les
        lignes.
      </Note>

      <H3>Transactions : COMMIT et ROLLBACK</H3>
      <Table
        head={["Instruction", "Effet"]}
        rows={[
          ["COMMIT", "Valide les changements : visibles par les autres utilisateurs"],
          ["ROLLBACK", "Annule les changements non validés : retour à l'état d'avant"],
        ]}
      />
      <Code>{`START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;        -- ou ROLLBACK; en cas de problème`}</Code>
      <P>
        En MySQL, l'<InlineCode>autocommit</InlineCode> est actif par défaut :
        chaque instruction est validée seule, sauf dans un{" "}
        <InlineCode>START TRANSACTION</InlineCode>.
      </P>

      <H3>Privilèges : GRANT</H3>
      <Code>{`GRANT SELECT, INSERT ON customers TO webuser;      -- droits précis
REVOKE INSERT ON customers FROM webuser;           -- retirer un droit`}</Code>

      <SourceLink href="https://github.com/hs-hq/project_resources/blob/main/sql/database_design_ddl_dml.md">
        hs-hq — Database design : DDL & DML
      </SourceLink>
      {" · "}
      <SourceLink href="https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html">
        dev.mysql.com — SQL statements
      </SourceLink>
    </div>
  );
}

export default function SqlDdlDml() {
  return <Fr />;
}
