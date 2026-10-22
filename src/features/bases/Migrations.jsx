import { Code, InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

export default function Migrations() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Schéma et migrations</H2>

      <H3>Le problème : la base évolue avec le code</H3>
      <P>
        On ajoute une colonne <InlineCode>phone</InlineCode> aux utilisateurs.
        Chaque développeur et chaque serveur doit modifier sa base de la même
        façon, au même moment, sans perdre de données.
      </P>

      <H3>La solution : des migrations versionnées</H3>
      <Ul>
        <li>
          Le <strong>schéma</strong> décrit la structure : tables, colonnes,
          types, relations.
        </li>
        <li>
          Une <strong>migration</strong> est un petit fichier qui décrit un
          changement de schéma, appliqué dans l'ordre.
        </li>
        <li>
          Les migrations sont committées dans Git avec le code : tout le monde
          reconstruit la même base.
        </li>
      </Ul>
      <Code>{`# Exemple Django
python manage.py makemigrations   # génère le fichier de migration
python manage.py migrate          # l'applique à la base`}</Code>
      <Note accent={MERISE_ACCENT}>
        Ne jamais modifier une migration déjà partagée : on en crée une
        nouvelle.
      </Note>
      <H3>Termes proches</H3>
      <Ul>
        <li>
          <strong>Seed</strong> : remplir la base avec des données de départ ou
          de test.
        </li>
        <li>
          <strong>Rollback</strong> : annuler une migration.
        </li>
      </Ul>
    </div>
  );
}
