import { Code, InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { TechTable } from "../../shared/ui/tech.jsx";
import { MERISE_ACCENT } from "../../shared/ui/tokens.js";

export default function WhatIsOrm() {
  return (
    <div>
      <H2 accent={MERISE_ACCENT}>Qu'est-ce qu'un ORM ?</H2>

      <H3>Le problème : deux mondes qui ne parlent pas pareil</H3>
      <P>
        Le code manipule des <strong>objets</strong> (un{" "}
        <InlineCode>User</InlineCode> avec des attributs). La base de données
        manipule des <strong>tables</strong> et du SQL. Les écrire à la main
        partout est long, répétitif et source d'erreurs.
      </P>

      <H3>La solution : un traducteur objet ↔ table</H3>
      <P>
        <strong>ORM</strong> = <em>Object-Relational Mapping</em>. Une
        bibliothèque qui relie vos classes aux tables, et génère le SQL à votre
        place.
      </P>
      <Code>{`# Sans ORM : du SQL à la main
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))

# Avec un ORM (exemple Django)
user = User.objects.get(email=email)
user.name = "Léa"
user.save()   # l'ORM écrit le UPDATE`}</Code>

      <TechTable
        head={["ORM", "Langage / écosystème"]}
        rows={[
          ["Django ORM", "Python (inclus dans Django)"],
          ["SQLAlchemy", "Python"],
          ["Prisma, TypeORM, Sequelize", "JavaScript / TypeScript"],
          ["Eloquent", "PHP (Laravel)"],
          ["Hibernate / JPA", "Java"],
        ]}
      />

      <H3>Avantages et limites</H3>
      <Ul>
        <li>
          <strong>+</strong> Moins de SQL répétitif, code plus lisible.
        </li>
        <li>
          <strong>+</strong> Protection contre l'injection SQL (requêtes
          paramétrées).
        </li>
        <li>
          <strong>+</strong> Changer de SGBD devient plus simple.
        </li>
        <li>
          <strong>−</strong> Requêtes complexes parfois peu efficaces ; il faut
          alors regarder le SQL généré.
        </li>
        <li>
          <strong>−</strong> Ne dispense pas de comprendre SQL.
        </li>
      </Ul>
      <Note accent={MERISE_ACCENT}>
        Piège courant : le « problème N+1 », où l'ORM envoie une requête par
        ligne au lieu d'une seule. Il se règle en chargeant les relations en
        une fois (<InlineCode>select_related</InlineCode>,{" "}
        <InlineCode>include</InlineCode>…).
      </Note>
    </div>
  );
}
