import { Code, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Le calcul du ROI en Agentic Ops — FinOps vs temps humain</H2>
      <P>
        Un mythe tenace : le « développeur IA » serait gratuit. Le rôle du Lead
        Tech est de calculer le <strong>TCO</strong> (Total Cost of Ownership)
        de ses workflows.
      </P>

      <H3>1. Tokenomics & Prompt Caching</H3>
      <Ul>
        <li>
          <strong>Input vs Output</strong> : les tokens envoyés (contexte,
          prompt système) sont peu chers (ex. 5 $ / million) ; les tokens
          générés coûtent souvent 3 à 4 fois plus (ex. 15 $ / million) car ils
          mobilisent l'inférence GPU.
        </li>
        <li>
          <strong>Effet multi-agents</strong> : un document de 10 000 tokens
          passé du PO au Dev, qui fait 5 itérations avec le QA, est refacturé à
          chaque échange.
        </li>
        <li>
          <strong>Prompt Caching</strong> : envoyer la même documentation
          système dans une fenêtre de 5 minutes fait chuter le coût des input
          tokens de 50 % à 90 %. Architecturer ses agents pour en profiter est
          une compétence FinOps majeure.
        </li>
      </Ul>

      <H3>2. La formule du TCO Agentic</H3>
      <Code>{`Coût total = Coût API (tokens)
           + Temps de setup / prompt engineering
           + Temps de QA / code review humain`}</Code>

      <H3>Exemple : script de migration de BDD</H3>
      <Table
        head={["Scénario", "Détail", "Coût total"]}
        rows={[
          ["Sans IA", "Dev senior (TJM 400 €, soit 50 €/h) : 2 jours (16 h) pour concevoir, coder, tester", "16 h × 50 € = 800 €"],
          ["Agentic Ops", "1 h de config du workflow CrewAI (50 €) + 10 min d'agents, 1 M tokens input et 300 K output sur GPT-4o (≈ 10 €) + 2 h de code review et tests de pénétration (100 €)", "50 + 10 + 100 = 160 €"],
        ]}
      />
      <Note accent={AI_ACCENT}>
        Bilan : 640 € économisés, mais le gain stratégique n'est pas l'argent :
        ce sont les <strong>13 heures de cerveau humain libérées</strong>.
      </Note>

      <SourceLink href="https://chatgpt.com/fr-FR/pricing/">
        chatgpt.com — tarifs
      </SourceLink>
      {" · "}
      <SourceLink href="https://platform.claude.com/docs/en/build-with-claude/prompt-caching">
        platform.claude.com — Prompt caching
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.finops.org/">finops.org — FinOps Foundation</SourceLink>
    </div>
  );
}

export default function AgenticRoi() {
  return <Fr />;
}
