import { Code, InlineCode, P, H2, H3, Ul, Note, Table } from "../../shared/ui/primitives.jsx";
import { API_ACCENT } from "../../shared/ui/tokens.js";

export default function WhatIsApi() {
  return (
    <div>
      <H2 accent={API_ACCENT}>Qu'est-ce qu'une API ?</H2>

      <H3>Le problème : deux programmes doivent s'entendre</H3>
      <P>
        Une appli mobile a besoin de la liste des événements, stockée sur un
        serveur. Comment la demander sans connaître le code interne du serveur ?
      </P>

      <H3>La solution : une interface publique</H3>
      <P>
        <strong>API</strong> = <em>Application Programming Interface</em>. C'est
        la liste de ce qu'un programme accepte de faire pour les autres, et de
        la façon de le demander. Analogie : le menu d'un restaurant. On
        commande ce qui y figure, sans entrer en cuisine.
      </P>
      <Table
        head={["Terme", "En une phrase"]}
        rows={[
          ["API", "Ce qu'un programme propose aux autres, et comment l'utiliser"],
          ["Endpoint", "Une adresse précise de l'API (ex. /events)"],
          ["API REST", "API web qui utilise les URL et les verbes HTTP de façon standard"],
          ["Clé d'API / token", "Un code qui prouve qui vous êtes auprès de l'API"],
          ["SDK", "Une bibliothèque qui emballe l'API pour l'appeler plus facilement"],
        ]}
      />
      <Code>{`GET https://api.exemple.fr/events

{ "events": [ { "id": 1, "title": "Rando" } ] }`}</Code>

      <Note accent={API_ACCENT}>
        Le mot « API » est large : il existe aussi des API de bibliothèques ou
        du navigateur (<InlineCode>fetch</InlineCode>,{" "}
        <InlineCode>localStorage</InlineCode>). Dans le web, sans précision, on
        parle presque toujours d'une API HTTP.
      </Note>

      <H3>Pour aller plus loin</H3>
      <Ul>
        <li>Les règles d'une API REST : voir « Principes REST ».</li>
        <li>Le format des données échangées : voir « JSON ».</li>
      </Ul>
    </div>
  );
}
