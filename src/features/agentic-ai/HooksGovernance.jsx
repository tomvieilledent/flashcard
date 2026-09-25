import { InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Gouvernance et Hooks — l'art de l'interception</H2>

      <H3>1. La perte de contrôle déterministe</H3>
      <P>
        Un script Python classique fait exactement la même chose un million de
        fois. Un agent IA qui a accès à vos outils (API, bases de données) peut
        agir différemment à chaque exécution selon son interprétation
        probabiliste du prompt. Lui confier les pleins pouvoirs sans garde-fou,
        c'est la définition de la faille <strong>Excessive Agency</strong>.
      </P>

      <H3>2. L'architecture par Hooks</H3>
      <P>
        Les <strong>hooks</strong> sont des fonctions d'interception exécutées à
        des moments clés du cycle de vie de l'IA.
      </P>
      <Table
        head={["Hook", "Moment", "Usage"]}
        rows={[
          ["Pre-Hook (garde-fou)", "Avant une action irréversible", "Intercepter l'intention (ex. DROP TABLE), geler l'exécution, appeler l'humain"],
          ["Post-Hook (audit & alerte)", "Après la réponse générée", "Détecter une fuite de données sensibles, alerte FinOps si réponse trop longue, scoring de pertinence (Langfuse)"],
        ]}
      />

      <H3>3. Le Human-in-the-Loop</H3>
      <P>
        Le Pre-Hook permet le HITL : l'IA planifie, propose et prépare, mais{" "}
        <strong>ne peut pas appuyer sur le bouton rouge</strong>. Le Pre-Hook
        notifie l'humain (terminal, Slack, bouton dans une UI web) et attend sa
        validation. Sans elle, l'action est avortée.
      </P>
      <Ul>
        <li>
          Voir aussi le HITL côté MCP (section « Sécurité & Human-in-the-Loop »)
          : même principe, appliqué par le client au niveau du{" "}
          <InlineCode>tools/call</InlineCode>.
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        Le garde-fou doit être du code déterministe placé entre la proposition
        du LLM et l'exécution — jamais une consigne de prompt.
      </Note>

      <SourceLink href="https://www.anthropic.com/research/building-evaluating-agents">
        anthropic.com — Building and evaluating agents
      </SourceLink>
      {" · "}
      <SourceLink href="https://owasp.org/projects/top-10-for-large-language-model-applications">
        owasp.org — Top 10 for LLM applications (LLM08 : Excessive Agency)
      </SourceLink>
    </div>
  );
}

export default function HooksGovernance() {
  return <Fr />;
}
