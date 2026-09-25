import { P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>L'usine logicielle agentique — de l'artisanat à l'industrie</H2>
      <P>
        Jusqu'ici, l'IA servait en artisan : une petite feature isolée dans un
        script unique. L'usine logicielle agentique, c'est le{" "}
        <strong>passage à l'échelle</strong>.
      </P>

      <H3>1. La vision « Software Factory »</H3>
      <P>
        Dans une usine automobile, les robots (les agents) soudent les pièces ;
        ce sont les ingénieurs qui conçoivent la chaîne de montage, calibrent
        les robots et gèrent les arrêts d'urgence. En Agentic Ops, votre rôle
        est de construire le <strong>pipeline</strong> : non plus la logique
        métier (le quoi), mais le comment.
      </P>
      <Ul>
        <li>Des templates de prompts stricts, versionnés sur Git.</li>
        <li>
          Une infrastructure CI/CD qui teste automatiquement le code généré par
          l'IA.
        </li>
        <li>
          Des formats d'échange standardisés entre agents : Markdown, Gherkin,
          JSON Schema.
        </li>
      </Ul>

      <H3>2. Le couplage Agent / Git</H3>
      <P>
        Dans une usine mature, l'agent Développeur est relié directement au
        gestionnaire de version : il lit un ticket Jira, clone la branche,
        génère le code, crée les tests unitaires et soumet lui-même une Pull
        Request sur GitHub.
      </P>
      <Note accent={AI_ACCENT}>
        La <strong>code review</strong> devient le goulot d'étranglement de la
        qualité : la PR d'une machine se juge avec encore plus de sévérité que
        celle d'un collègue.
      </Note>

      <SourceLink href="https://a16z.com/">a16z.com — Andreessen Horowitz</SourceLink>
    </div>
  );
}

export default function SoftwareFactory() {
  return <Fr />;
}
