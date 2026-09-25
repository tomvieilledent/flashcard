import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Les primitives MCP — Resources, Prompts, Tools</H2>
      <P>
        Le flux stdio n'est pas du texte magique : il repose sur le protocole
        standard <strong>JSON-RPC 2.0</strong>. Le MCP répartit les capacités
        d'un serveur en trois familles : les <strong>Resources</strong>, les{" "}
        <strong>Prompts</strong> et les <strong>Tools</strong>.
      </P>

      <H3>1. Resources — le système de fichiers virtuel</H3>
      <P>
        Source de données brutes exposée en <strong>lecture seule</strong>,
        identifiée par une URI propre au serveur (
        <InlineCode>postgres://</InlineCode>, <InlineCode>logs://</InlineCode>,{" "}
        <InlineCode>api://</InlineCode>…). L'IA la consulte passivement pour
        enrichir sa compréhension.
      </P>
      <Code>{`// Requête de l'IDE
{ "jsonrpc": "2.0", "method": "resources/read",
  "params": { "uri": "crm://customers/metadata" }, "id": 1 }

// Réponse du serveur
{ "jsonrpc": "2.0", "id": 1,
  "result": { "contents": [ {
    "uri": "crm://customers/metadata",
    "mimeType": "application/json",
    "text": "{\\"tables\\": [\\"users\\", \\"orders\\"], \\"version\\": \\"1.4\\"}"
  } ] } }`}</Code>

      <H3>2. Prompts — les gabarits contextuels</H3>
      <P>
        Gabarit de prompt pré-rédigé et paramétrable, stocké côté serveur : une
        bibliothèque de prompt engineering centralisée, accessible à toute
        l'équipe depuis l'IDE. Le Tech Lead écrit le template une fois ; l'IA
        l'appelle en y injectant des arguments.
      </P>
      <Code>{`// Requête de l'IDE
{ "jsonrpc": "2.0", "method": "prompts/get",
  "params": { "name": "audit_code_securite",
              "arguments": { "niveau_severite": "CRITICAL" } }, "id": 2 }

// Réponse du serveur
{ "jsonrpc": "2.0", "id": 2,
  "result": {
    "description": "Gabarit d'audit de sécurité d'entreprise",
    "messages": [ { "role": "user", "content": { "type": "text",
      "text": "Analyse le fichier actuel. Filtre uniquement les failles de niveau CRITICAL. Applique les normes OWASP." } } ] } }`}</Code>

      <H3>3. Tools — les bras armés de l'agent</H3>
      <P>
        La primitive la plus puissante : un Tool permet une action concrète{" "}
        <strong>avec effets de bord</strong> (écriture en base, envoi de mail,
        exécution de script). Le serveur fournit au modèle la « notice
        technique » de la fonction en <strong>JSON Schema</strong> : nom,
        utilité, types des entrées.
      </P>
      <Code>{`// Requête de l'IDE (arguments extraits par le LLM)
{ "jsonrpc": "2.0", "method": "tools/call",
  "params": { "name": "update_customer_status",
              "arguments": { "email": "dev@entreprise.com",
                             "new_status": "Inactif" } }, "id": 3 }

// Réponse du serveur
{ "jsonrpc": "2.0", "id": 3,
  "result": { "content": [ { "type": "text",
    "text": "Succès : Le statut de dev@entreprise.com a été mis à jour." } ],
    "isError": false } }`}</Code>

      <H3>Mini-tutoriel : le MCP Inspector</H3>
      <P>
        Outil officiel open source qui se comporte comme un « faux » Copilot :
        il se connecte à votre serveur local et offre une interface web pour
        tester les primitives à la main, sans intercepter le terminal de VS
        Code.
      </P>
      <Ul>
        <li>
          <strong>Lancer</strong> depuis le dossier du serveur :{" "}
          <InlineCode>npx @modelcontextprotocol/inspector node mcp_server.js</InlineCode>
        </li>
        <li>
          <strong>Ouvrir</strong> l'interface web locale (généralement{" "}
          <InlineCode>http://localhost:5173</InlineCode>).
        </li>
        <li>
          <strong>Tester un Tool</strong> : onglet Tools →{" "}
          <InlineCode>get_customer_status</InlineCode> (réponse à{" "}
          <InlineCode>ListToolsRequestSchema</InlineCode>) → argument{" "}
          <InlineCode>email</InlineCode> = <InlineCode>ceo@entreprise.com</InlineCode>{" "}
          → <em>Run Tool</em> → le panneau de droite montre la requête{" "}
          <InlineCode>tools/call</InlineCode> et la réponse JSON.
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        C'est exactement ce payload que Copilot envoie, de façon invisible,
        lorsqu'il décide d'utiliser vos outils dans l'IDE.
      </Note>

      <H3>Pour aller plus loin</H3>
      <Ul>
        <li>
          <strong>Capabilities</strong> : à la poignée de main{" "}
          <InlineCode>initialize</InlineCode>, client et serveur échangent la
          liste de leurs fonctionnalités ; un serveur peut ne proposer que des
          outils, ou que des ressources.
        </li>
        <li>
          <strong>Erreurs standardisées</strong> : un outil qui échoue renvoie
          un code JSON-RPC standard (p. ex. <InlineCode>-32602</InlineCode>,
          paramètres invalides) pour que l'IA comprenne et se corrige seule
          (<em>self-healing</em>).
        </li>
      </Ul>

      <SourceLink href="https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture">
        modelcontextprotocol.io — Architecture (spécification & cycle de vie)
      </SourceLink>
    </div>
  );
}

export default function McpPrimitives() {
  return <Fr />;
}
