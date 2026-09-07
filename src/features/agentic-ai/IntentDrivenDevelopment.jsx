import { InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

export default function IntentDrivenDevelopment() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Intent-Driven Development & dette sémantique</H2>
      <P>
        Jusqu'ici, le métier consistait à traduire un besoin (un ticket Jira) en
        syntaxe : le goulot d'étranglement était l'écriture du code. L'IA
        agentique génère la syntaxe instantanément. Le nouveau goulot n'est plus
        <em> comment </em> coder, mais <em>quoi</em> coder — et avec quelles
        contraintes.
      </P>

      <H3>Le problème : la délégation de syntaxe</H3>
      <P>
        « Fais-moi un système de login » laisse l'agent deviner : il invente une
        base de données, choisit une méthode de hachage au hasard, oublie
        l'expiration des tokens. Dix minutes de code gagnées, des heures de dette
        technique créées.
      </P>

      <H3>L'approche : dirigée par l'intention</H3>
      <P>
        Votre valeur n'est plus dans la boucle <InlineCode>for</InlineCode> que
        vous écrivez, mais dans le <strong>cadre déterministe</strong> que vous
        posez. Vous agissez comme un Product Manager : vous ne codez pas, vous
        contraignez l'IA.
      </P>
      <Table
        head={["Délégation de syntaxe", "Orchestration par l'intention"]}
        rows={[
          ["« Fais-moi un système de login »", "MCD strict + diagramme de séquence fournis"],
          ["L'IA choisit la lib de hachage", "Règle absolue : bcrypt, coût 12"],
          ["Cas limites oubliés", "Tokens expirés / rejeu décrits en amont"],
          ["Revue du code généré ligne à ligne", "Revue de l'écart au blueprint"],
        ]}
      />

      <H3>La dette sémantique</H3>
      <P>
        Si l'instruction manque de précision, l'IA comble les vides par des
        probabilités — des <strong>hallucinations techniques</strong>. Cela
        génère une dette <em>sémantique</em> instantanée : une décision
        d'architecture implicite, jamais validée, bien plus coûteuse à
        refactoriser qu'une erreur de syntaxe.
      </P>
      <Note accent={AI_ACCENT}>
        Une erreur de syntaxe casse le build et se voit. Une dette sémantique
        compile, passe les tests superficiels, et ne se révèle qu'en production
        ou six mois plus tard, quand la « méthode probable » choisie par l'IA
        entre en conflit avec le reste du système.
      </Note>

      <H3>Junior ou senior : le même levier</H3>
      <Ul>
        <li>
          <strong>Junior</strong> — les cours de conception (Merise, flux
          utilisateurs, diagrammes d'états) deviennent un <em>langage de
          programmation</em> : un agent ne conçoit pas d'architecture saine sans
          blueprint clair.
        </li>
        <li>
          <strong>Senior</strong> — l'expérience métier (failles de sécurité,
          performance, cas limites) s'encapsule dans des <strong>guardrails</strong> :
          des instructions strictes qui empêchent l'IA de prendre de mauvaises
          décisions architecturales.
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        Les artefacts déjà produits sur ce site — MCD, diagrammes de séquence et
        d'états, contrat OpenAPI, scénarios Gherkin, ADR — <em>sont</em> le
        cadre déterministe à fournir à l'agent. Le reste du site sur l'IA
        agentique s'appuie sur eux.
      </Note>

      <SourceLink href="https://www.anthropic.com/research/building-effective-agents">
        anthropic.com — Building effective agents
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct">
        docs.anthropic.com — Be clear, direct, and detailed
      </SourceLink>
      {" · "}
      <SourceLink href="https://martinfowler.com/articles/2023-chatgpt-xu-hao.html">
        martinfowler.com — Prompt engineering for a known architecture
      </SourceLink>
    </div>
  );
}
