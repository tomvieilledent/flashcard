import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>La mémoire évolutive externe — le fichier MEMORY.md</H2>

      <H3>L'amnésie native</H3>
      <P>
        Le plus grand frein à l'Agentic Ops : si vous fermez l'IDE le soir,
        l'agent oublie les décisions d'architecture (choix de base de données,
        conventions) validées la veille.
      </P>

      <H3>Le pattern de la mémoire persistante</H3>
      <P>
        Les architectes IA placent un fichier <InlineCode>MEMORY.md</InlineCode>{" "}
        à la racine du projet : le <strong>journal de bord sémantique</strong>{" "}
        de l'application, rédigé pour la machine.
      </P>
      <Code>{`# MÉMOIRE PROJET : [Nom du Projet]

## 🛠️ Stack Technique & Configuration
- Backend : Node.js / NestJS (Strict Mode activé)
- Base de données : PostgreSQL / Prisma ORM

## 📐 Décisions Architecturales (Historique)
- [12 Mai] : Isolation de la logique de calcul de TVA dans le \`TaxService\`.
  Les contrôleurs ne font aucun calcul.
- [15 Mai] : Les montants financiers sont manipulés en \`Integer\`
  (centimes) pour éviter les flottants.

## 📊 État Actuel & Prochaine Étape
- Terminés : Module d'Auth, Module Utilisateur.
- En cours : Intégration du système de paiement Stripe.`}</Code>

      <H3>Le protocole d'initialisation</H3>
      <P>Au début de la journée, dans une session de chat vierge :</P>
      <Code>{`@workspace Initialise-toi en lisant le #file:MEMORY.md. Résume ta tâche actuelle.`}</Code>
      <Ul>
        <li>L'agent retrouve sa pertinence contextuelle instantanément.</li>
        <li>
          Le fichier se met à jour en fin de fonctionnalité : « Mets à jour le{" "}
          <InlineCode>MEMORY.md</InlineCode> avec ce que nous venons de
          terminer ».
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        Ce que l'agent doit retenir entre deux sessions s'écrit
        explicitement : la mémoire, c'est un fichier versionné, pas le modèle.
      </Note>

      <SourceLink href="https://arxiv.org/abs/2305.14322">
        arXiv:2305.14322 — RET-LLM: Towards a General Read-Write Memory for Large Language Models
      </SourceLink>
    </div>
  );
}

export default function MemoryFile() {
  return <Fr />;
}
