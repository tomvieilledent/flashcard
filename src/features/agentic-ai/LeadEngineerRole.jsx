import { P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Le nouveau rôle du Lead Engineer — code review IA</H2>
      <P>
        Si l'IA code, que fait un Lead Engineer à 100 000 € par an ? Il prend
        les décisions que l'IA ne peut assumer ni pénalement ni
        stratégiquement.
      </P>
      <Table
        head={["Rôle", "Part du temps", "Focus"]}
        rows={[
          ["Architecte de la SSOT", "≈ 40 %", "Raffiner specifications.md et les ADR"],
          ["Maître du FinOps & de la télémétrie", "≈ 30 %", "Dashboards Langfuse / Datadog"],
          ["Juge du HITL", "—", "Pre-Hooks, Post-Hooks, validation des actions critiques"],
        ]}
      />

      <H3>1. L'architecte de la SSOT</H3>
      <P>
        Gardien du temple, il affine les documents de spécification. Si l'IA
        produit du code inutile, il <strong>ne corrige pas le code : il corrige
        le cahier des charges</strong>, pour que la machine (et toute machine
        future) ne refasse pas l'erreur. C'est le prompt engineering industriel.
      </P>

      <H3>2. Le maître du FinOps et de la télémétrie</H3>
      <Ul>
        <li>
          <strong>Model Drift</strong> : GPT-4o est-il devenu moins performant
          sur notre stack JS depuis la dernière mise à jour d'OpenAI ?
        </li>
        <li>
          <strong>Anomalies budgétaires</strong> : pourquoi l'Agent QA consomme-t-il
          soudain 20 $ par nuit ? (détection d'une boucle infinie de
          correction).
        </li>
      </Ul>

      <H3>3. Le juge du Human-in-the-Loop</H3>
      <P>
        L'humain devant le bouton rouge : il conçoit les Pre-Hooks et
        Post-Hooks, autorise les modifications critiques de base de données et
        veille à la conformité (RGPD, PCI-DSS) qu'une IA ne peut garantir. Il
        porte la responsabilité finale de la production.
      </P>
      <Note accent={AI_ACCENT}>
        Le Lead ne produit plus le code : il produit le cadre — spécifications,
        garde-fous, budget — dans lequel les agents travaillent.
      </Note>

      <SourceLink href="https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/">
        mckinsey.com — Tech & AI insights
      </SourceLink>
    </div>
  );
}

export default function LeadEngineerRole() {
  return <Fr />;
}
