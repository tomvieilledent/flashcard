import { Code, InlineCode, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>SQL & MySQL — installation, familles d'instructions, guillemets</H2>

      <H3>Installer MySQL sur Ubuntu</H3>
      <Code>{`sudo apt update
sudo apt install mysql-server
sudo systemctl status mysql          # vérifier que le service tourne
sudo mysql_secure_installation       # durcissement : mot de passe, comptes anonymes, base test`}</Code>
      <Ul>
        <li>
          Sous Ubuntu, <InlineCode>root</InlineCode> s'authentifie par défaut via{" "}
          <InlineCode>auth_socket</InlineCode> : on se connecte avec{" "}
          <InlineCode>sudo mysql</InlineCode>.
        </li>
        <li>
          Préférer un utilisateur dédié aux applications plutôt que{" "}
          <InlineCode>root</InlineCode>.
        </li>
      </Ul>
      <Code>{`sudo mysql
-- Mot de passe pour root (au lieu d'auth_socket)
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'motdepasse';

-- Utilisateur dédié + droits sur UNE base
CREATE USER 'app'@'localhost' IDENTIFIED BY 'motdepasse';
CREATE DATABASE ma_base;
GRANT ALL PRIVILEGES ON ma_base.* TO 'app'@'localhost';
FLUSH PRIVILEGES;`}</Code>

      <H3>Les familles d'instructions SQL (MySQL 8.0)</H3>
      <Table
        head={["Famille", "Rôle", "Exemples"]}
        rows={[
          ["DDL — définition", "Créer / modifier / supprimer les structures", "CREATE, ALTER, DROP, RENAME TABLE, TRUNCATE TABLE"],
          ["DML — manipulation", "Interroger et modifier les données", "SELECT, INSERT, UPDATE, DELETE, REPLACE, UNION, LOAD DATA"],
          ["Transactions & verrous", "Regrouper des opérations en une unité atomique", "START TRANSACTION, COMMIT, ROLLBACK, SAVEPOINT, LOCK TABLES"],
          ["Instructions préparées", "Précompiler une requête paramétrée", "PREPARE, EXECUTE, DEALLOCATE PREPARE"],
          ["Programmes stockés", "Contrôle de flux dans les procédures", "BEGIN…END, IF, CASE, LOOP, WHILE, DECLARE, cursors"],
          ["Administration", "Comptes, droits, maintenance", "CREATE USER, GRANT, REVOKE, ANALYZE / OPTIMIZE TABLE, SET, SHOW"],
          ["Utilitaires", "Aide et diagnostic", "DESCRIBE, EXPLAIN, HELP, USE"],
          ["Réplication", "Serveur source / réplique", "CHANGE REPLICATION SOURCE TO, START REPLICA"],
        ]}
      />
      <Code>{`SHOW DATABASES;
USE ma_base;
SHOW TABLES;
DESCRIBE clients;             -- colonnes d'une table
SHOW CREATE TABLE clients;    -- le CREATE TABLE complet
EXPLAIN SELECT * FROM clients WHERE ville = 'Lyon';   -- plan d'exécution`}</Code>

      <H3>Backticks ou apostrophes ?</H3>
      <Table
        head={["Symbole", "Sert à quoi", "Exemple"]}
        rows={[
          ["Backtick `…`", "Délimiter un identifiant (table, colonne, base), indispensable si c'est un mot réservé ou s'il contient des espaces / tirets", "SELECT `order`, `first name` FROM `orders`;"],
          ["Apostrophe '…'", "Délimiter une valeur littérale (chaîne, date)", "WHERE ville = 'Lyon' AND d = '2024-05-01'"],
        ]}
      />
      <Note accent={MERISE_ACCENT}>
        Les guillemets doubles <InlineCode>"…"</InlineCode> désignent une chaîne
        en MySQL par défaut (sauf mode <InlineCode>ANSI_QUOTES</InlineCode>) :
        pour les alias et identifiants, préférez les backticks.
      </Note>

      <SourceLink href="https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html">
        dev.mysql.com — SQL statements (MySQL 8.0)
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04">
        DigitalOcean — How to install MySQL on Ubuntu 20.04
      </SourceLink>
      {" · "}
      <SourceLink href="https://stackoverflow.com/questions/29402361/what-makes-the-big-difference-between-a-backtick-and-an-apostrophe/29402458">
        Stack Overflow — backtick vs apostrophe
      </SourceLink>
      {" · "}
      <SourceLink href="https://intellipaat.com/mediaFiles/2019/02/SQL-Commands-Cheat-Sheet.pdf?US">
        Intellipaat — SQL commands cheat sheet (PDF)
      </SourceLink>
    </div>
  );
}

export default function SqlMysqlIntro() {
  return <Fr />;
}
