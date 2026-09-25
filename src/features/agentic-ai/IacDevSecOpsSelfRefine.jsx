import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Génération d'IaC (Docker) & boucle DevSecOps par IA</H2>

      <H3>1. L'IaC et le « Shift-Left »</H3>
      <P>
        L'Agentic Ops ne s'arrête pas au code métier : demander à l'Agent
        Développeur un <InlineCode>Dockerfile</InlineCode> et un{" "}
        <InlineCode>docker-compose.yml</InlineCode>, c'est transformer
        l'infrastructure en <strong>code immuable</strong> (IaC). Cela permet
        le <strong>Shift-Left</strong> : la sécurité, testée historiquement à
        la fin du projet (à droite de la frise), est traitée dès l'écriture
        dans l'IDE, avant le premier <InlineCode>git commit</InlineCode>. Un bug
        corrigé à ce stade coûte infiniment moins cher.
      </P>

      <H3>2. Le biais probabiliste de la sécurité</H3>
      <P>
        Le LLM recrache la moyenne du code d'internet, où pullulent de vieux
        tutoriels Docker aux mauvaises pratiques. Un Dockerfile généré
        naïvement reproduit deux failles graves :
      </P>
      <Ul>
        <li>
          <strong>Images lourdes</strong> : <InlineCode>FROM node:20</InlineCode>{" "}
          au lieu de <InlineCode>FROM node:20-alpine</InlineCode> — surface
          d'attaque accrue (curl, bash… exploitables par un pirate).
        </li>
        <li>
          <strong>Privilèges root</strong> : par défaut, le processus principal
          tourne en administrateur ; si le code JS est compromis, le serveur
          l'est aussi.
        </li>
      </Ul>
      <Code>{`# Jet naïf de l'IA
FROM node:20
COPY . .
CMD ["node", "server.js"]

# Après revue de l'Agent QA
FROM node:20-alpine
WORKDIR /app
COPY --chown=node:node . .
USER node
CMD ["node", "server.js"]`}</Code>

      <H3>3. La boucle de Self-Refine (l'Agent QA)</H3>
      <P>
        On ne fait jamais confiance au premier jet. Un troisième agent, l'Expert
        QA / DevSecOps, relit le travail du premier : son System Prompt le
        programme pour traquer les erreurs d'IaC. Il lit le Dockerfile, repère
        l'absence de <InlineCode>USER node</InlineCode>, explique la
        vulnérabilité à l'humain et applique un patch correctif.
      </P>
      <Note accent={AI_ACCENT}>
        Cette rétroaction autonome et itérative s'appelle le{" "}
        <strong>Self-Refine</strong> (auto-raffinement).
      </Note>

      <SourceLink href="https://docs.docker.com/engine/security/">
        docs.docker.com — Docker security
      </SourceLink>
    </div>
  );
}

export default function IacDevSecOpsSelfRefine() {
  return <Fr />;
}
