import { InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>De l'équipe de dev traditionnelle aux agents spécialisés</H2>

      <H3>1. L'organisation humaine classique</H3>
      <P>
        Dans l'industrie (Agile / Scrum), personne ne conçoit, développe et
        valide seul un projet de bout en bout. Le travail est divisé en rôles
        étanches, chacun garantissant l'intégrité d'une étape :
      </P>
      <Table
        head={["Rôle", "Responsabilité", "Interdit"]}
        rows={[
          ["Product Owner (PO)", "Le « Quoi » : User Stories et critères d'acceptation ; clarifie le besoin flou avant transmission", "Ne code jamais"],
          ["Développeur / Tech Lead", "Le « Comment » : architecture technique (langage, base, infra) et code fonctionnel ; les specs du PO sont une vérité absolue", "Ne réécrit pas le besoin"],
          ["QA / DevSecOps", "Détruire plutôt que créer : edge cases, failles de sécurité, montée en charge ; sans son feu vert, pas de production", "Ne produit pas le code"],
        ]}
      />
      <Note accent={AI_ACCENT}>
        Les frictions (le PO qui contraint le Dev, le QA qui refuse le code)
        sont intentionnelles : elles sont le moteur de la qualité logicielle.
      </Note>

      <H3>2. La transposition à l'Agentic Ops</H3>
      <P>
        L'erreur du débutant : utiliser un LLM comme couteau suisse avec un
        méga-prompt (« cahier des charges, puis code, puis sécurité »). Un LLM
        n'a pas de personnalité par défaut, il est la <strong>moyenne
        d'internet</strong> : s'il joue tous les rôles à la fois, il est moyen
        partout.
      </P>
      <P>
        L'Agentic Ops recrée la structure de l'équipe humaine : un seul{" "}
        <strong>chapeau (persona)</strong> à la fois.
      </P>
      <Ul>
        <li>
          <strong>Agent PO</strong> : fichier d'instructions strict, interdiction
          de produire du JavaScript ; 100 % logique métier.
        </li>
        <li>
          <strong>Agent Développeur</strong> : interdiction de modifier le
          cahier des charges ; 100 % exécution technique.
        </li>
        <li>
          <strong>Agent QA</strong> : son seul but est de traquer les erreurs du
          deuxième agent.
        </li>
      </Ul>

      <H3>3. La fiche de poste numérique</H3>
      <P>
        Comme un collaborateur signe une fiche de poste, un agent reçoit un{" "}
        <strong>System Prompt</strong> (ici un fichier{" "}
        <InlineCode>.github/instructions.md</InlineCode>) qui définit
        expertise, limites et format de sortie. Recréer une équipe d'experts
        spécialisés est la clé de voûte des workflows modernes.
      </P>

      <SourceLink href="https://scrumguides.org/">scrumguides.org — Scrum Guide (rôles)</SourceLink>
      {" · "}
      <SourceLink href="https://docs.crewai.com/">
        docs.crewai.com — framework multi-agents à personas
      </SourceLink>
    </div>
  );
}

export default function AgentTeamRoles() {
  return <Fr />;
}
