import { Code, InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { API_ACCENT } from "../../shared/ui/tokens.js";

export default function ClientServer() {
  return (
    <div>
      <H2 accent={API_ACCENT}>Client et serveur</H2>

      <H3>Le problème : qui fait quoi quand on ouvre un site ?</H3>
      <P>
        Quand on tape une adresse dans le navigateur, une page apparaît. Mais
        d'où vient-elle ? Sans le vocabulaire « client / serveur », impossible
        de comprendre la moindre doc ou le moindre message d'erreur.
      </P>

      <H3>La solution : deux rôles qui se parlent</H3>
      <Ul>
        <li>
          Le <strong>client</strong> demande quelque chose : le navigateur,
          une appli mobile, un script. Analogie : le client d'un restaurant.
        </li>
        <li>
          Le <strong>serveur</strong> répond : c'est un programme qui tourne
          sur une machine, souvent distante. Analogie : la cuisine.
        </li>
        <li>
          Ils communiquent par des <strong>requêtes</strong> (la commande) et
          des <strong>réponses</strong> (le plat), via le réseau.
        </li>
      </Ul>
      <Code>{`Navigateur (client)  --- requête : GET /articles --->  Serveur
Navigateur (client)  <--- réponse : 200 + données ----  Serveur`}</Code>

      <Note accent={API_ACCENT}>
        « Serveur » désigne à la fois un <strong>programme</strong> (Node,
        nginx…) et la <strong>machine</strong> qui l'héberge. Le contexte
        indique de quoi on parle.
      </Note>

      <H3>Termes à retenir</H3>
      <Ul>
        <li>
          <strong>Requête / réponse</strong> : un aller-retour complet.
        </li>
        <li>
          <strong>Hôte, domaine, IP</strong> : l'adresse du serveur
          (<InlineCode>exemple.fr</InlineCode> est un nom, l'IP est son numéro).
        </li>
        <li>
          <strong>Port</strong> : la « porte » du serveur ; en local on voit
          souvent <InlineCode>localhost:3000</InlineCode>.
        </li>
        <li>
          <strong>localhost</strong> : « cette machine-ci » ; le serveur tourne
          sur votre ordinateur.
        </li>
      </Ul>
    </div>
  );
}
