import { Code, InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { API_ACCENT } from "../../shared/ui/tokens.js";

export default function JsonFormat() {
  return (
    <div>
      <H2 accent={API_ACCENT}>JSON</H2>

      <H3>Le problème : échanger des données lisibles par tous</H3>
      <P>
        Un serveur en Python et une appli en JavaScript doivent s'envoyer des
        données. Il leur faut un format texte simple que tous les langages
        savent lire et écrire.
      </P>

      <H3>La solution : JSON</H3>
      <P>
        <strong>JSON</strong> (<em>JavaScript Object Notation</em>) décrit des
        données avec des paires clé / valeur. C'est le format le plus courant
        des API web.
      </P>
      <Code>{`{
  "id": 1,
  "title": "Rando du dimanche",
  "places": 8,
  "online": false,
  "tags": ["sport", "nature"],
  "organizer": { "name": "Léa" }
}`}</Code>
      <Ul>
        <li>
          Types possibles : texte, nombre, booléen, <InlineCode>null</InlineCode>,
          liste <InlineCode>[ ]</InlineCode>, objet <InlineCode>{"{ }"}</InlineCode>.
        </li>
        <li>
          Les clés sont toujours entre <strong>guillemets doubles</strong>.
        </li>
        <li>Pas de commentaires, pas de virgule après le dernier élément.</li>
      </Ul>
      <Code>{`JSON.stringify(objet)  // objet -> texte JSON
JSON.parse(texte)      // texte JSON -> objet`}</Code>
      <Note accent={API_ACCENT}>
        Beaucoup d'erreurs « Unexpected token » viennent d'un JSON invalide :
        virgule en trop ou guillemets simples.
      </Note>
    </div>
  );
}
