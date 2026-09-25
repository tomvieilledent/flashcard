import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Forger un agent spécialisé — les System Prompts</H2>

      <H3>Le syndrome du couteau suisse</H3>
      <P>
        Un LLM non configuré (ChatGPT grand public, Copilot par défaut) est
        conçu pour être « utile et poli » face à n'importe quelle requête. Il
        répond de la manière la plus <strong>statistiquement moyenne</strong>{" "}
        possible, en piochant dans des millions de dépôts GitHub amateurs
        comme experts. En génie logiciel, on ne visse pas avec un couteau
        suisse : on utilise une visseuse calibrée.
      </P>
      <P>
        Un <strong>System Prompt</strong> est une directive cachée attachée
        avant chacune de vos requêtes. Il agit comme une{" "}
        <strong>fiche de poste</strong> stricte qui restreint l'espace
        probabiliste de l'IA vers un domaine d'expertise précis.
      </P>

      <H3>Les 4 piliers d'une fiche de poste IA (PRRF)</H3>
      <Table
        head={["Pilier", "Rôle", "Exemple"]}
        rows={[
          ["Persona", "Identité & niveau d'expertise", "« Tu es un Tech Lead Senior, expert en architecture Node.js et en sécurité. »"],
          ["Rôle", "Objectif unique de la session", "« Ta mission unique est d'auditer le code et d'écrire des tests. »"],
          ["Règles", "Guardrails & stack autorisée", "« Interdiction de modifier la logique métier ; pas de Moment.js, utilise l'objet Date. »"],
          ["Format", "Règles de sortie", "« Renvoie uniquement le code, sans markdown introductif ni salutations. »"],
        ]}
      />
      <Note accent={AI_ACCENT}>
        Le persona active statistiquement les bonnes pratiques complexes ; les
        règles bornent le champ d'action. Sans elles, l'IA comble les vides
        par des probabilités.
      </Note>

      <H3>Activer l'agent au niveau du workspace</H3>
      <P>
        Plutôt que de recopier le prompt à chaque question, on l'industrialise
        dans un fichier lu à chaque requête :
      </P>
      <Ul>
        <li>
          <strong>VS Code / GitHub Copilot</strong> : dossier{" "}
          <InlineCode>.github/</InlineCode> à la racine, avec un fichier{" "}
          <InlineCode>copilot-instructions.md</InlineCode>.
        </li>
        <li>
          <strong>Cursor</strong> : fichier <InlineCode>.cursorrules</InlineCode>{" "}
          à la racine.
        </li>
      </Ul>
      <Code>{`Tu es un ingénieur QA Senior et un expert en sécurité applicative.
Ta mission est d'analyser le code fourni et de relever les anti-patterns.
Règles absolues :
- Le projet utilise TypeScript strict (strict: true).
- Toute fonction asynchrone doit gérer ses erreurs via un bloc try/catch
  ou un middleware global.
- Tu n'as pas l'autorisation de réécrire la logique métier : tu dois
  uniquement pointer l'erreur de conception.
Format : Renvoie un tableau Markdown avec les colonnes
[Ligne, Criticité, Explication, Suggestion de pattern].
Aucun texte avant ou après le tableau.`}</Code>

      <SourceLink href="https://developers.openai.com/api/docs/guides/prompt-engineering?api-mode=responses">
        developers.openai.com — Prompt engineering guide
      </SourceLink>
    </div>
  );
}

export default function SystemPromptsAgent() {
  return <Fr />;
}
