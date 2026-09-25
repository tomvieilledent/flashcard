import { Code, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>La Source Unique de Vérité (SSOT) pour brider les LLM</H2>

      <H3>1. Le piège de la servilité (RLHF)</H3>
      <P>
        Les LLM modernes sont entraînés par <strong>RLHF</strong> (Reinforcement
        Learning from Human Feedback) : extrêmement polis, mais « trop
        serviables » (<em>sycophancy</em>). Face à une demande floue, l'IA
        invente pour faire plaisir. « Fais un script qui lit un fichier JSON »
        et voilà qu'elle ajoute une interface React ou une base SQLite. En
        contexte industriel, cette sur-ingénierie coûte cher à maintenir et
        crée des failles.
      </P>

      <H3>2. Créer une SSOT</H3>
      <P>
        Pour brider cette créativité toxique, on impose une{" "}
        <strong>Single Source of Truth</strong>, confiée à l'Agent PO : figer
        la pensée algorithmique dans un document standardisé, non
        interprétable.
      </P>
      <Ul>
        <li>un fichier Markdown de User Stories ;</li>
        <li>un fichier <code>.feature</code> Gherkin (Behavior-Driven Development) ;</li>
        <li>une spécification OpenAPI (Swagger) en YAML.</li>
      </Ul>

      <H3>3. La soumission contractuelle de l'agent exécutant</H3>
      <P>
        Une fois générée, la SSOT devient un <strong>contrat inviolable</strong>.
        Le System Prompt du Développeur porte une directive de soumission
        absolue :
      </P>
      <Code>{`Tu es un exécutant. Tu ne prends aucune décision d'architecture.
Tu n'inventes rien. Tu implémentes exclusivement ce qui est décrit
dans le fichier specifications.md.
Si une information manque, tu dois échouer et me le dire,
sans inventer la suite.`}</Code>
      <Note accent={AI_ACCENT}>
        C'est la méthode la plus fiable pour transformer un chatbot
        probabiliste en outil d'ingénierie déterministe.
      </Note>

      <SourceLink href="https://cucumber.io/docs/bdd/">
        cucumber.io — Introduction au BDD et à Gherkin
      </SourceLink>
    </div>
  );
}

export default function SsotSpecContract() {
  return <Fr />;
}
