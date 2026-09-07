import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

export default function ContextWindow() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Limites physiques — fenêtre de contexte & amnésie</H2>
      <P>
        Si un agent IA était un ordinateur, la <strong>fenêtre de contexte</strong>{" "}
        (context window) serait sa mémoire vive. Elle est bornée, et tout ce qui
        déborde est oublié.
      </P>

      <H3>Le mythe de l'omniscience</H3>
      <Ul>
        <li>
          Un modèle retient un nombre <strong>strict</strong> de tokens par
          conversation (p. ex. 128 000, 200 000…). Au-delà, le début de
          l'échange est tronqué.
        </li>
        <li>
          <strong>Amnésie native</strong> : entre deux sessions, ou si l'agent
          redémarre, il repart d'une page vierge. Rien n'est mémorisé
          implicitement.
        </li>
      </Ul>

      <H3>« Lost in the middle »</H3>
      <P>
        L'erreur classique de l'autodidacte : coller tout le projet dans le
        prompt pour que l'IA « comprenne ». Deux effets :
      </P>
      <Table
        head={["Effet", "Conséquence"]}
        rows={[
          ["Coût", "Des milliers de tokens inutiles facturés à chaque tour"],
          ["Attention", "Le modèle retient le début et la fin du prompt, décroche au milieu"],
        ]}
      />
      <P>
        Les études sur le <em>lost in the middle</em> montrent une performance en
        U : une information cruciale noyée au centre d'un long contexte est
        quasiment ignorée.
      </P>

      <H3>Injecter le contexte, pas le déverser</H3>
      <P>
        C'est comme un processus sous <InlineCode>pm2</InlineCode> sur un VPS :
        sans fichier d'écosystème strict — variables d'environnement précises,
        limites mémoire — le processus s'emballe et crashe. Avec l'IA, le{" "}
        <strong>System Prompt</strong> joue ce rôle de fichier de configuration :
        il ne donne que les fichiers et interfaces nécessaires. Pas un de plus.
      </P>
      <Code>{`# Mauvais : tout le repo
cat $(git ls-files) | llm "corrige le bug de login"

# Bon : la surface strictement utile
llm --system prompts/auth.md \\
    --file src/auth/session.ts \\
    --file src/auth/session.test.ts \\
    "le test 'refuse un token expiré' échoue — corrige session.ts uniquement"`}</Code>
      <Note accent={AI_ACCENT}>
        Placez les contraintes non négociables <strong>en tête</strong> du
        prompt et rappelez l'objectif <strong>en fin</strong> de prompt : les
        deux zones où l'attention du modèle est la plus fiable.
      </Note>

      <H3>Repères pratiques</H3>
      <Ul>
        <li>Un fichier de contexte = une raison d'être ; sinon, il sort du prompt.</li>
        <li>
          Conversation qui s'allonge et déraille : purger le contexte
          (<em>context truncation</em>) et repartir d'une directive resserrée
          vaut mieux qu'insister.
        </li>
        <li>
          Ce qui doit survivre entre sessions se réécrit explicitement : un
          fichier <InlineCode>CLAUDE.md</InlineCode> / <InlineCode>AGENTS.md</InlineCode>,
          un ADR, une doc — pas la mémoire de l'agent.
        </li>
      </Ul>

      <SourceLink href="https://arxiv.org/abs/2307.03172">
        arXiv:2307.03172 — Lost in the Middle: How Language Models Use Long Contexts
      </SourceLink>
      {" · "}
      <SourceLink href="https://docs.anthropic.com/en/docs/build-with-claude/context-windows">
        docs.anthropic.com — Context windows
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.anthropic.com/news/context-management">
        anthropic.com — Context management & compaction
      </SourceLink>
    </div>
  );
}
