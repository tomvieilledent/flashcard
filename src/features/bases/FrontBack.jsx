import { P, H2, H3, Ul, Note, Table } from "../../shared/ui/primitives.jsx";
import { API_ACCENT } from "../../shared/ui/tokens.js";

export default function FrontBack() {
  return (
    <div>
      <H2 accent={API_ACCENT}>Frontend, backend, fullstack</H2>

      <H3>Le problème : « je fais du dev web », mais quoi ?</H3>
      <P>
        Une application web se compose de plusieurs parties qui n'ont ni les
        mêmes outils ni les mêmes métiers. Ces mots reviennent partout dans les
        offres et les docs.
      </P>

      <H3>La solution : séparer ce qu'on voit de ce qui travaille</H3>
      <Table
        head={["", "Frontend", "Backend"]}
        rows={[
          ["Où ça tourne", "Dans le navigateur de l'utilisateur", "Sur le serveur"],
          ["Rôle", "Afficher, réagir aux clics", "Règles métier, données, sécurité"],
          ["Technos courantes", "HTML, CSS, JavaScript, React, Vue", "Python, Node.js, PHP, Java, bases de données"],
          ["Analogie", "La salle du restaurant", "La cuisine et le stock"],
        ]}
      />
      <Ul>
        <li>
          <strong>Fullstack</strong> : savoir intervenir sur les deux côtés.
        </li>
        <li>
          Le front appelle le back via une <strong>API</strong>.
        </li>
        <li>
          <strong>DevOps</strong> : l'équipe ou le métier qui s'occupe du
          déploiement et de l'infrastructure.
        </li>
      </Ul>
      <Note accent={API_ACCENT}>
        Règle de sécurité : tout ce qui est dans le frontend est visible par
        l'utilisateur. Ne jamais y mettre de secret (mot de passe, clé privée).
      </Note>
    </div>
  );
}
