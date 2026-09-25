import { InlineCode, P, H2, H3, Ul, Note, Table } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>FinOps & économie des LLM — Tokenomics</H2>

      <H3>1. Le token, unité de facturation</H3>
      <P>
        Un LLM lit des <strong>tokens</strong> (fragments de mots). En moyenne,
        100 tokens ≈ 75 mots en anglais — et nettement moins en français, ce qui
        rend le français plus cher à traiter. La tarification des API (OpenAI,
        Anthropic) est asymétrique :
      </P>
      <Table
        head={["Type", "Contenu", "Coût"]}
        rows={[
          ["Input tokens", "Le prompt envoyé", "Généralement bon marché"],
          ["Output tokens", "La génération de l'IA", "Souvent 3 à 4 fois plus cher (calcul GPU massif)"],
        ]}
      />

      <H3>2. Le cauchemar : la boucle infinie</H3>
      <P>
        En développement classique, un <InlineCode>while(true)</InlineCode> fait
        crasher la machine. En développement multi-agents, il vous{" "}
        <strong>ruine</strong> : deux agents en désaccord s'échangent des
        milliers de tokens par seconde. À 15 $ le million de tokens (tarif
        GPT-4), une application mal architecturée peut coûter des centaines
        d'euros en une nuit.
      </P>

      <H3>3. Les tableaux de bord de consommation</H3>
      <P>
        Le FinOps IA consiste à tagger chaque exécution avec un{" "}
        <strong>cost tracking</strong>. Dans Langfuse, on attache un{" "}
        <InlineCode>userId</InlineCode> ou un <InlineCode>featureName</InlineCode>{" "}
        à chaque appel.
      </P>
      <Ul>
        <li>« Résumé » nous coûte 45 $ par jour ;</li>
        <li>« Traduction » en coûte 2 $.</li>
      </Ul>
      <Note accent={AI_ACCENT}>
        Sans étiquette par fonctionnalité, la facture est un bloc opaque :
        impossible de savoir quoi optimiser ou quoi couper.
      </Note>
    </div>
  );
}

export default function LlmTokenomics() {
  return <Fr />;
}
