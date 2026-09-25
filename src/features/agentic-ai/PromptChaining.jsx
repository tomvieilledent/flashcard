import { InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Prompt Chaining & isolation de contexte — l'amnésie volontaire</H2>

      <H3>1. Le syndrome « Lost in the Middle »</H3>
      <P>
        « Code-moi une application complète, fais le design, sécurise le
        serveur et rédige la doc » est la pire erreur en Agentic Ops. Face à
        une requête trop large, dans une fenêtre de contexte limitée à
        l'attention volatile, l'IA omet des consignes, mélange les langages ou
        utilise des frameworks non désirés.
      </P>

      <H3>2. La solution : le Prompt Chaining</H3>
      <P>
        Décomposer le workflow en micro-étapes : une chaîne de montage
        numérique plutôt qu'un « Super Agent » qui fait tout mal.
      </P>
      <Table
        head={["Étape", "Agent", "Entrée → Sortie"]}
        rows={[
          ["A", "Analyse le besoin", "Besoin → cahier des charges"],
          ["B", "Écrit uniquement le backend", "Cahier des charges → backend"],
          ["C", "Tests unitaires ou infrastructure", "Backend → tests / infra"],
        ]}
      />
      <Note accent={AI_ACCENT}>
        La sortie (Output) de l'étape A devient l'entrée <strong>stricte</strong>{" "}
        (Input) de l'étape B.
      </Note>

      <H3>3. L'isolation de contexte</H3>
      <P>
        Si l'Agent Développeur (B) lit les hésitations, brouillons et erreurs
        de l'Agent PO (A), ses probabilités génératives sont polluées. À chaque
        changement de rôle, l'humain doit donc :
      </P>
      <Ul>
        <li>purger le contexte : fermer le chat, ouvrir une session vierge ;</li>
        <li>
          charger un nouveau fichier de directives (
          <InlineCode>.github/instructions.md</InlineCode>).
        </li>
      </Ul>
      <P><strong>Un cerveau neuf pour une tâche neuve.</strong></P>

      <SourceLink href="https://arxiv.org/abs/2307.03172">
        arXiv:2307.03172 — Lost in the Middle: How Language Models Use Long Contexts
      </SourceLink>
      {" · "}
      <SourceLink href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#chain-complex-prompts">
        platform.claude.com — Chain complex prompts
      </SourceLink>
    </div>
  );
}

export default function PromptChaining() {
  return <Fr />;
}
