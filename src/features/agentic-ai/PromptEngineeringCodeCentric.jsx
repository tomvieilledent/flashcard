import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Prompt engineering « code-centric » & N-shot</H2>
      <P>
        Pour obtenir un code déterministe et éviter que l'IA ne génère du code
        « fantaisie », on structure le prompt selon le framework{" "}
        <strong>R-C-T-C-F</strong>.
      </P>

      <H3>Le framework R-C-T-C-F</H3>
      <Ul>
        <li>
          <strong>Rôle</strong> — l'expertise exacte du modèle (ex. expert
          performance Node.js).
        </li>
        <li>
          <strong>Contexte</strong> — l'environnement (ex. NestJS, PostgreSQL,
          Prisma ORM).
        </li>
        <li>
          <strong>Tâche</strong> — l'action précise (ex. créer une méthode
          d'authentification).
        </li>
        <li>
          <strong>Contraintes</strong> — les limites techniques absolues (ex.
          pas de SQL brut, doublons gérés par exception levée).
        </li>
        <li>
          <strong>Format</strong> — la structure de la réponse (ex. uniquement
          le code de la méthode, pas de texte).
        </li>
      </Ul>

      <H3>Few-shot prompting (apprentissage par l'exemple)</H3>
      <P>
        Pour que l'IA adopte un style d'écriture particulier (une gestion de log
        maison, par exemple), ne lui donnez pas de longues explications
        théoriques : donnez un exemple concret directement dans le prompt.
      </P>
      <Code>{`Tu es un développeur senior expert en sécurité.
Le projet utilise TypeScript et la librairie Joi pour la validation.

Voici un exemple de validateur conforme dans notre projet :

import Joi from 'joi';
export const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required()
});

Tâche : génère le validateur pour l'entité Product sur le même modèle strict.
Contraintes : title (min 5 caractères), price (nombre positif strict).
Format : uniquement le code TypeScript, aucun texte narratif.`}</Code>
      <Note accent={AI_ACCENT}>
        L'inclusion d'un exemple (few-shot) augmente nettement la probabilité de
        conformité du code généré par rapport à une simple consigne textuelle
        (zero-shot).
      </Note>

      <H3>Repères pratiques</H3>
      <Ul>
        <li>
          Un exemple vaut mieux qu'un paragraphe de règles : le modèle imite
          plus fidèlement qu'il n'applique.
        </li>
        <li>
          Placez les contraintes non négociables en tête, rappelez la tâche en
          fin de prompt.
        </li>
        <li>
          Le bloc <InlineCode>Format</InlineCode> évite le blabla : « uniquement
          le code » coupe court aux explications non désirées.
        </li>
      </Ul>

      <SourceLink href="https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering">
        docs.github.com — Prompt engineering for GitHub Copilot
      </SourceLink>
      {" · "}
      <SourceLink href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview">
        platform.claude.com — Prompt engineering overview
      </SourceLink>
      {" · "}
      <SourceLink href="https://developers.openai.com/api/docs/guides/prompt-engineering?api-mode=responses">
        developers.openai.com — Prompt engineering guide
      </SourceLink>
    </div>
  );
}

export default function PromptEngineeringCodeCentric() {
  return <Fr />;
}
