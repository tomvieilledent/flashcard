import { InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Gérer la dette probabiliste et les régressions</H2>

      <H3>1. La dette probabiliste</H3>
      <P>
        Un script classique est déterministe. Un LLM génère du code de façon{" "}
        <strong>probabiliste</strong> : excellent aujourd'hui, mais un
        changement mineur du prompt demain peut lui faire régénérer tout le
        fichier avec de subtiles failles de logique qu'il avait évitées la
        veille. Cette instabilité est la <strong>dette probabiliste</strong> :
        plus l'IA génère de gros volumes de code non ancrés, plus le système
        devient fragile et imprévisible.
      </P>

      <H3>2. Le blindage par tests de régression</H3>
      <P>
        La seule arme : des barrières infranchissables, les tests automatisés.
        Règle absolue de l'usine agentique :{" "}
        <strong>l'IA n'écrit pas la fonctionnalité tant que les tests
        n'existent pas</strong> — un TDD poussé à l'extrême.
      </P>
      <Ul>
        <li>
          Le Tech Lead (ou un Agent PO) écrit les tests unitaires (ex. Jest) qui
          définissent le comportement attendu.
        </li>
        <li>
          L'Agent Développeur boucle sur son code jusqu'à ce que tout passe au
          vert (<em>self-correction loop</em>).
        </li>
        <li>
          Si l'agent casse le code du Sprint 1 pendant le Sprint 2, la suite de
          tests plante et la Pull Request ne peut pas être fusionnée.
        </li>
      </Ul>

      <H3>3. Figer les dépendances (pinning)</H3>
      <P>
        L'IA inclut volontiers les versions <InlineCode>latest</InlineCode> des
        librairies Docker ou NPM, ce qui rend les builds instables. L'Agent QA
        doit exiger le verrouillage des versions :{" "}
        <InlineCode>node:20.12.0-alpine</InlineCode> au lieu de{" "}
        <InlineCode>node:alpine</InlineCode>.
      </P>
      <Note accent={AI_ACCENT}>
        Tests d'abord, versions figées, PR bloquée si rouge : c'est ce qui
        transforme un générateur probabiliste en chaîne de production fiable.
      </Note>

      <SourceLink href="https://towardsdatascience.com/">towardsdatascience.com</SourceLink>
    </div>
  );
}

export default function ProbabilisticDebt() {
  return <Fr />;
}
