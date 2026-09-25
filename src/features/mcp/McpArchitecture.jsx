import { P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>L'architecture MCP — le port USB de l'IA</H2>

      <H3>Historique : la genèse d'un standard</H3>
      <P>
        Jusqu'en novembre 2024, le monde des LLM souffrait d'une fragmentation
        sévère : pour lire des tickets Jira, il fallait coder un « plugin
        OpenAI » spécifique ; pour passer sur Claude, tout recoder selon une
        autre API. Fin 2024, Anthropic publie le{" "}
        <strong>Model Context Protocol (MCP)</strong> en open source, rapidement
        soutenu par GitHub, Zed et Cursor. Son but n'est pas de faire de l'IA,
        mais de <strong>standardiser la communication de l'IA avec le monde
        extérieur</strong>.
      </P>

      <H3>Architecture client / serveur</H3>
      <P>
        Le MCP est l'USB-C de l'IA : peu importe la marque de l'ordinateur (le
        client IA) et celle du disque dur (vos bases d'entreprise), s'ils
        parlent le même protocole, ils se comprennent.
      </P>
      <Table
        head={["Composant", "Rôle"]}
        rows={[
          ["Hôte (client MCP)", "L'IDE (VS Code + Copilot, Cursor, Windsurf) ou une application métier : il héberge l'interaction avec le LLM"],
          ["Transport", "stdio en local (le client lance le serveur en tâche de fond) ou SSE (Server-Sent Events) à distance pour le cloud"],
          ["Serveur MCP", "Micro-programme léger (Node.js, Python, Go, Rust…) qui fait le pont vers PostgreSQL, Jira, GitLab en exposant des Outils et des Ressources en JSON prévisible"],
        ]}
      />

      <H3>Le problème de l'isolement (avant le MCP)</H3>
      <Ul>
        <li>
          <strong>Le fardeau du développeur</strong> : déboguer une erreur de
          production imposait de copier la stack trace depuis Sentry, le
          fichier source depuis GitHub, le schéma SQL depuis la base… puis de
          tout coller dans le chat.
        </li>
        <li>
          <strong>La limitation de fraîcheur</strong> : entraînés sur des
          données passées, les modèles ignorent si un service est down ou si un
          paiement vient d'être validé.
        </li>
      </Ul>

      <H3>La révolution agentique</H3>
      <P>
        La charge s'inverse : le développeur donne l'<strong>intention</strong>,
        l'IA s'occupe de la <strong>collecte de données</strong>.
      </P>
      <Table
        head={["Cas d'usage", "Requête", "Action MCP"]}
        rows={[
          ["Auditeur de code continu", "« Fais une revue de mes changements locaux. »", "Outil git diff, comparaison aux règles d'entreprise, rapport — sans copier une ligne"],
          ["Agent SRE", "« Pourquoi l'API de paiement crashe depuis 10 minutes ? »", "Serveur Datadog (métriques CPU) → Sentry (dernière erreur : timeout PostgreSQL) → SQL (pg_stat_activity) → diagnostic complet"],
          ["Assistant produit", "« Rédige la doc de la feature du ticket TKT-402. »", "Récupération du ticket Jira, extraction des spécifications, génération du code"],
        ]}
      />
      <Note accent={AI_ACCENT}>
        Le MCP transforme un simple chatbot en <strong>agent système</strong>,
        capable de naviguer dans le SI aussi librement qu'un développeur humain.
      </Note>

      <SourceLink href="https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro">
        modelcontextprotocol.io — Introduction
      </SourceLink>
      {" · "}
      <SourceLink href="https://github.com/modelcontextprotocol/servers">
        github.com/modelcontextprotocol/servers — serveurs MCP open source
      </SourceLink>
    </div>
  );
}

export default function McpArchitecture() {
  return <Fr />;
}
