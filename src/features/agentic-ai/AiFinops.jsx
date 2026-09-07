import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";
import { useLang } from "../../i18n/lang.jsx";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Modèle économique de l'IA — FinOps 101</H2>
      <P>
        L'Agentic Ops n'est pas qu'une affaire de technique : c'est aussi le coût
        et la rentabilité de l'outil. Chaque appel à une API IA (OpenAI,
        Anthropic…) est facturé, au token.
      </P>

      <H3>Input vs output</H3>
      <Table
        head={["Type de token", "Ce que c'est", "Coût relatif"]}
        rows={[
          ["Input", "Le prompt + les fichiers de contexte envoyés", "Faible"],
          ["Output", "Le texte généré : code, explications", "3 à 4× l'input"],
        ]}
      />
      <Note accent={AI_ACCENT}>
        Conséquence : demander à l'agent de <strong>réécrire un fichier entier</strong>{" "}
        pour changer trois lignes coûte cher en output. Un diff ciblé, ou une
        instruction « ne renvoie que la fonction modifiée », réduit la facture.
      </Note>

      <H3>Le syndrome de la boucle infinie</H3>
      <P>
        Un agent qui tente de corriger un test qui échoue, sans supervision :
      </P>
      <Code>{`Itération 1  : lit 5 000 tokens de contexte      → génère 500 tokens → test KO
Itération 2  : lit 5 500 (historique) + 500 (erreur) → génère 500 tokens → test KO
…
Itération 10 : lit ~20 000 tokens à chaque essai pour corriger une seule ligne`}</Code>
      <P>
        L'historique grossit à chaque tour : le coût par tentative augmente pour
        un résultat qui, souvent, n'arrive jamais. Une IA laissée en autonomie
        sur un bug complexe peut vider un budget cloud en quelques heures.
      </P>

      <H3>Garde-fous</H3>
      <Ul>
        <li>
          <strong>Human-in-the-loop / hooks</strong> — un point d'arrêt qui exige
          une validation avant de continuer ou de dépenser plus.
        </li>
        <li>
          <strong>Plafond d'itérations</strong> — au-delà de N essais infructueux,
          l'agent s'arrête et rend la main.
        </li>
        <li>
          <strong>Context truncation</strong> — purger l'historique et repartir
          d'une directive claire et resserrée plutôt que d'empiler les erreurs.
        </li>
        <li>
          <strong>Prompt caching</strong> — réutiliser un préfixe de contexte
          stable (System Prompt, doc) à tarif réduit au lieu de le renvoyer plein
          tarif à chaque tour.
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        Le rôle du superviseur : savoir <strong>quand arrêter la machine</strong>.
        Un budget par tâche et un nombre d'itérations maximum se décident{" "}
        <em>avant</em> de lancer l'agent, comme les limites mémoire d'un
        <InlineCode> ecosystem.config.js</InlineCode> pm2.
      </Note>

      <SourceLink href="https://openai.com/api/pricing/">
        openai.com/api/pricing — tarifs input / output par modèle
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.anthropic.com/pricing#api">
        anthropic.com/pricing — API, batch et prompt caching
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching">
        docs.anthropic.com — Prompt caching
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.finops.org/introduction/what-is-finops/">
        finops.org — What is FinOps
      </SourceLink>
    </div>
  );
}

function En() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>The economics of AI — FinOps 101</H2>
      <P>
        Agentic Ops is not only a technical matter: it is also the cost and the
        return on the tool. Every call to an AI API (OpenAI, Anthropic…) is
        billed, by the token.
      </P>

      <H3>Input vs output</H3>
      <Table
        head={["Token type", "What it is", "Relative cost"]}
        rows={[
          ["Input", "The prompt + the context files you send", "Low"],
          ["Output", "The generated text: code, explanations", "3–4× the input"],
        ]}
      />
      <Note accent={AI_ACCENT}>
        Consequence: asking the agent to <strong>rewrite a whole file</strong> to
        change three lines is expensive in output. A targeted diff, or an
        instruction like "return only the modified function", cuts the bill.
      </Note>

      <H3>The infinite-loop syndrome</H3>
      <P>An agent trying to fix a failing test, unsupervised:</P>
      <Code>{`Itération 1  : lit 5 000 tokens de contexte      → génère 500 tokens → test KO
Itération 2  : lit 5 500 (historique) + 500 (erreur) → génère 500 tokens → test KO
…
Itération 10 : lit ~20 000 tokens à chaque essai pour corriger une seule ligne`}</Code>
      <P>
        The history grows every turn: the cost per attempt rises for a result
        that often never comes. An AI left autonomous on a hard bug can drain a
        cloud budget in a few hours.
      </P>

      <H3>Guardrails</H3>
      <Ul>
        <li>
          <strong>Human-in-the-loop / hooks</strong> — a stop point that requires
          approval before continuing or spending more.
        </li>
        <li>
          <strong>Iteration cap</strong> — after N failed attempts, the agent
          stops and hands back control.
        </li>
        <li>
          <strong>Context truncation</strong> — clear the history and restart
          from a clear, tightened directive rather than stacking up errors.
        </li>
        <li>
          <strong>Prompt caching</strong> — reuse a stable context prefix (system
          prompt, docs) at a reduced rate instead of resending it at full price
          every turn.
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        The supervisor's role: knowing <strong>when to stop the machine</strong>.
        A per-task budget and a maximum number of iterations are decided{" "}
        <em>before</em> launching the agent, like the memory limits in a pm2
        <InlineCode> ecosystem.config.js</InlineCode>.
      </Note>

      <SourceLink href="https://openai.com/api/pricing/">
        openai.com/api/pricing — input / output rates per model
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.anthropic.com/pricing#api">
        anthropic.com/pricing — API, batch and prompt caching
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching">
        docs.anthropic.com — Prompt caching
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.finops.org/introduction/what-is-finops/">
        finops.org — What is FinOps
      </SourceLink>
    </div>
  );
}

export default function AiFinops() {
  return useLang().lang === "en" ? <En /> : <Fr />;
}
