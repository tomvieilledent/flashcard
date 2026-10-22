import { InlineCode, P, H2, H3, Ul, Note, Table } from "../../shared/ui/primitives.jsx";
import { API_ACCENT } from "../../shared/ui/tokens.js";

export default function ChoosingApi() {
  return (
    <div>
      <H2 accent={API_ACCENT}>Choisir son type d'API et son authentification</H2>

      <H3>Le problème : REST, GraphQL, gRPC, WebSocket… lequel ?</H3>
      <P>
        Plusieurs styles d'API coexistent, chacun avec un cas d'usage. Il faut
        aussi décider comment identifier l'appelant (authentification). Voici
        un guide de décision.
      </P>

      <H3>1. Quel style d'API ?</H3>
      <Table
        head={["Style", "Principe", "À choisir quand", "À éviter quand"]}
        rows={[
          ["REST", "Des URL (ressources) + verbes HTTP", "Cas général : appli web, mobile, API publique. Le choix par défaut", "Les clients ont des besoins de données très variés"],
          ["GraphQL", "Un seul endpoint, le client décrit les données voulues", "Beaucoup d'écrans différents, mobile avec peu de bande passante, données très liées", "Petit projet : la complexité n'en vaut pas la peine"],
          ["gRPC", "Appels de fonctions binaires, contrat strict (Protobuf)", "Communication interne entre services, hautes performances", "API ouverte au navigateur ou à des débutants"],
          ["WebSocket", "Connexion ouverte dans les deux sens", "Temps réel : chat, notifications, jeu, suivi en direct", "Simple lecture/écriture de données"],
          ["Webhook", "Le serveur vous appelle quand un événement arrive", "Être prévenu d'un paiement, d'un push Git…", "Besoin de lire des données à la demande"],
          ["SSE", "Le serveur pousse des événements au client, un seul sens", "Flux de notifications simples", "Échanges dans les deux sens"],
        ]}
      />
      <Note accent={API_ACCENT}>
        Par défaut : <InlineCode>REST</InlineCode> en JSON. On ajoute
        WebSocket ou un webhook seulement pour un besoin précis de temps réel
        ou d'événement.
      </Note>

      <H3>2. Quelle authentification ?</H3>
      <Table
        head={["Méthode", "Principe", "À choisir quand"]}
        rows={[
          ["Session + cookie", "Le serveur retient la session, le navigateur envoie un cookie", "Site web classique avec rendu serveur, même domaine"],
          ["JWT (jeton)", "Jeton signé envoyé dans l'en-tête Authorization", "API consommée par une SPA ou une appli mobile"],
          ["Clé d'API", "Une clé secrète fixe par application", "Accès machine à machine, API publique avec quotas"],
          ["OAuth 2.0 / OIDC", "Connexion déléguée (Google, GitHub…)", "« Se connecter avec… », accès à des données d'un autre service"],
          ["Basic auth", "Identifiant et mot de passe à chaque requête", "Outil interne, prototype, toujours en HTTPS"],
        ]}
      />
      <Ul>
        <li>
          <strong>Authentification</strong> : prouver qui on est.{" "}
          <strong>Autorisation</strong> : ce qu'on a le droit de faire.
        </li>
        <li>Toujours en HTTPS, jamais de secret dans le frontend.</li>
        <li>
          Ne pas réinventer : préférer une bibliothèque ou un service reconnu
          plutôt que d'écrire la sécurité soi-même.
        </li>
      </Ul>

      <H3>3. Les autres choix qui comptent</H3>
      <Table
        head={["Sujet", "Choix courant", "Pourquoi"]}
        rows={[
          ["Format des données", "JSON", "Lisible, supporté partout (XML ou Protobuf seulement si imposé)"],
          ["Versionnage", "/v1/… dans l'URL", "Faire évoluer l'API sans casser les anciens clients"],
          ["Documentation", "OpenAPI (Swagger)", "Doc interactive et contrat vérifiable"],
          ["Pagination", "?page=2&limit=20 ou curseur", "Ne jamais renvoyer toute une table d'un coup"],
          ["Limitation de débit", "Rate limiting (429)", "Protéger l'API des abus"],
          ["Erreurs", "Bons codes HTTP + message JSON clair", "Le client sait quoi corriger"],
        ]}
      />
      <Note accent={API_ACCENT}>
        Règle simple : concevez l'API pour celui qui la consomme, pas pour
        votre base de données. Détails des principes : voir « Principes REST ».
      </Note>
    </div>
  );
}
