import { InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";
import { useLang } from "../../i18n/lang.jsx";

function Fr() {
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

function En() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Intent-Driven Development & semantic debt</H2>
      <P>
        Until now, the job was translating a need (a Jira ticket) into syntax:
        the bottleneck was writing the code. Agentic AI produces the syntax
        instantly. The new bottleneck is no longer <em>how</em> to code, but{" "}
        <em>what</em> to code — and under which constraints.
      </P>

      <H3>The problem: delegating syntax</H3>
      <P>
        "Build me a login system" leaves the agent to guess: it invents a
        database, picks a hashing method at random, forgets token expiry. Ten
        minutes of code saved, hours of technical debt created.
      </P>

      <H3>The approach: driven by intent</H3>
      <P>
        Your value is no longer in the <InlineCode>for</InlineCode> loop you
        write, but in the <strong>deterministic frame</strong> you set. You act
        like a product manager: you do not code, you constrain the AI.
      </P>
      <Table
        head={["Delegating syntax", "Orchestrating by intent"]}
        rows={[
          ['"Build me a login system"', "Strict data model + sequence diagram provided"],
          ["The AI picks the hashing library", "Absolute rule: bcrypt, cost 12"],
          ["Edge cases forgotten", "Expired tokens / replay described up front"],
          ["Reviewing the generated code line by line", "Reviewing the gap to the blueprint"],
        ]}
      />

      <H3>Semantic debt</H3>
      <P>
        If the instruction lacks precision, the AI fills the gaps with
        probabilities — <strong>technical hallucinations</strong>. That creates
        instant <em>semantic</em> debt: an implicit architecture decision, never
        validated, far more expensive to refactor than a syntax error.
      </P>
      <Note accent={AI_ACCENT}>
        A syntax error breaks the build and is visible. Semantic debt compiles,
        passes the shallow tests, and only surfaces in production or six months
        later, when the "likely method" the AI chose clashes with the rest of
        the system.
      </Note>

      <H3>Junior or senior: the same lever</H3>
      <Ul>
        <li>
          <strong>Junior</strong> — design courses (Merise, user flows, state
          diagrams) become a <em>programming language</em>: an agent does not
          design sound architecture without a clear blueprint.
        </li>
        <li>
          <strong>Senior</strong> — domain experience (security flaws,
          performance, edge cases) is encapsulated in <strong>guardrails</strong>:
          strict instructions that stop the AI from making bad architectural
          decisions.
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        The artefacts already produced on this site — data model, sequence and
        state diagrams, OpenAPI contract, Gherkin scenarios, ADRs — <em>are</em>{" "}
        the deterministic frame to hand the agent. The rest of the site's
        agentic-AI material builds on them.
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

export default function IntentDrivenDevelopment() {
  return useLang().lang === "en" ? <En /> : <Fr />;
}
