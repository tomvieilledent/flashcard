import { Code, InlineCode, P, H2, H3, Ul, Note, Table } from "../../shared/ui/primitives.jsx";
import { API_ACCENT } from "../../shared/ui/tokens.js";

export default function HttpBasics() {
  return (
    <div>
      <H2 accent={API_ACCENT}>HTTP en bref</H2>

      <H3>Le problème : il faut une langue commune</H3>
      <P>
        Navigateur et serveur ne se connaissent pas. Pour se comprendre, ils
        suivent le même protocole : <strong>HTTP</strong> (et{" "}
        <strong>HTTPS</strong> quand l'échange est chiffré).
      </P>

      <H3>La solution : une requête, une réponse</H3>
      <Code>{`Requête                         Réponse
GET /events HTTP/1.1            HTTP/1.1 200 OK
Host: api.exemple.fr            Content-Type: application/json
Authorization: Bearer abc...
                                [ { "id": 1 } ]`}</Code>
      <Ul>
        <li>
          <strong>Méthode</strong> (verbe) : ce qu'on veut faire.
        </li>
        <li>
          <strong>URL</strong> : sur quelle ressource.
        </li>
        <li>
          <strong>En-têtes (headers)</strong> : des métadonnées (format, jeton…).
        </li>
        <li>
          <strong>Corps (body)</strong> : les données envoyées ou reçues.
        </li>
        <li>
          <strong>Code de statut</strong> : le résultat, dans la réponse.
        </li>
      </Ul>

      <Table
        head={["Verbe", "Sert à"]}
        rows={[
          ["GET", "Lire"],
          ["POST", "Créer"],
          ["PUT / PATCH", "Modifier"],
          ["DELETE", "Supprimer"],
        ]}
      />
      <Table
        head={["Famille", "Sens", "Exemple"]}
        rows={[
          ["2xx", "Succès", "200 OK, 201 Created"],
          ["3xx", "Redirection", "301 Moved Permanently"],
          ["4xx", "Erreur du client", "401 non connecté, 404 introuvable"],
          ["5xx", "Erreur du serveur", "500 Internal Server Error"],
        ]}
      />
      <Note accent={API_ACCENT}>
        Moyen mnémotechnique : <strong>4xx</strong> = « vous avez mal demandé »,{" "}
        <strong>5xx</strong> = « j'ai planté ». Un <InlineCode>404</InlineCode>{" "}
        n'est donc pas un bug du serveur.
      </Note>
      <P>Détail des codes et des verbes : voir « Principes REST ».</P>
    </div>
  );
}
