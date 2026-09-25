import { Code, InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Tutoriel — brancher Copilot à un serveur MCP dans VS Code</H2>
      <P>
        Pas de théorie : créer le serveur le plus simple du monde, le lier à VS
        Code et forcer Copilot à l'utiliser.
      </P>

      <H3>Étape 1 — Coder le micro-serveur « System Ping »</H3>
      <P>
        Dans un dossier vide : <InlineCode>npm init -y</InlineCode> puis{" "}
        <InlineCode>npm install @modelcontextprotocol/sdk</InlineCode>. Ajouter{" "}
        <InlineCode>"type": "module"</InlineCode> dans{" "}
        <InlineCode>package.json</InlineCode> pour la syntaxe{" "}
        <InlineCode>import</InlineCode>. Puis créer{" "}
        <InlineCode>ping_mcp.js</InlineCode> :
      </P>
      <Code>{`import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// 1. Initialisation
const server = new Server({ name: "ping-server", version: "1.0.0" }, { capabilities: { tools: {} } });

// 2. Déclaration de l'outil (la notice pour l'IA)
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "system_ping",
    description: "Renvoie 'Pong' avec l'heure exacte du serveur pour vérifier la connexion.",
    inputSchema: { type: "object", properties: {} }
  }]
}));

// 3. Exécution de l'outil
server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name === "system_ping") {
    return { content: [{ type: "text", text: \`Pong ! L'heure du serveur est \${new Date().toLocaleTimeString()}\` }] };
  }
  throw new Error("Outil inconnu");
});

// 4. Démarrage sur stdio
const transport = new StdioServerTransport();
await server.connect(transport);`}</Code>
      <Note accent={AI_ACCENT}>
        Jamais de <InlineCode>console.log()</InlineCode> dans un serveur MCP
        stdio : il corrompt le flux JSON. Déboguer avec{" "}
        <InlineCode>console.error()</InlineCode>.
      </Note>

      <H3>Étape 2 — Créer le fichier mcp.json</H3>
      <P>
        Palette de commandes (<InlineCode>Cmd/Ctrl + Shift + P</InlineCode>) →{" "}
        <InlineCode>MCP: Open Workspace Folder MCP Configuration</InlineCode> :
        VS Code crée et ouvre <InlineCode>.vscode/mcp.json</InlineCode>.
      </P>

      <H3>Étape 3 — Configuration selon l'OS</H3>
      <P>
        L'extension tourne en arrière-plan et n'accède pas à l'environnement de
        la même façon selon l'OS. Remplacer impérativement{" "}
        <InlineCode>/chemin/absolu/vers/votre/</InlineCode> par le vrai chemin.
      </P>
      <Ul>
        <li>
          <strong>Cas A — Windows + WSL</strong> : l'extension tourne sous
          Windows, on force le passage par Linux via{" "}
          <InlineCode>wsl.exe</InlineCode> et Bash.
        </li>
      </Ul>
      <Code>{`{
  "servers": {
    "ping-local": {
      "command": "wsl.exe",
      "args": ["bash", "-ic", "node /chemin/absolu/vers/votre/ping_mcp.js"]
    }
  }
}`}</Code>
      <Ul>
        <li>
          <strong>Cas B — macOS ou Linux natif</strong> : si{" "}
          <InlineCode>node</InlineCode> ne se résout pas directement, passer par{" "}
          <InlineCode>/usr/bin/env</InlineCode>.
        </li>
      </Ul>
      <Code>{`{
  "servers": {
    "ping-local": {
      "command": "/usr/bin/env",
      "args": ["node", "/chemin/absolu/vers/votre/ping_mcp.js"]
    }
  }
}`}</Code>

      <H3>Étape 4 — Exécution et test de l'agent</H3>
      <Ul>
        <li>
          Recharger la fenêtre : <InlineCode>Developer: Reload Window</InlineCode>.
        </li>
        <li>
          Vérifier la détection : dans Copilot Chat, icône trombone
          (Attachments) ou <InlineCode>/</InlineCode> —{" "}
          <InlineCode>system_ping</InlineCode> doit apparaître.
        </li>
        <li>
          Prompt ultra-ciblé (pour éviter la confusion avec la commande réseau{" "}
          <InlineCode>ping</InlineCode> de l'OS) : « Exécute explicitement
          l'outil MCP nommé system_ping et donne-moi le résultat. »
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        Copilot affiche « Used tool system_ping » puis répond avec la phrase
        générée par votre script Node.js : vous avez créé un agent connecté.
      </Note>
    </div>
  );
}

export default function McpCopilotTutorial() {
  return <Fr />;
}
