import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { AI_ACCENT } from "../../shared/ui/tokens.js";

function Fr() {
  return (
    <div>
      <H2 accent={AI_ACCENT}>Les « Skills » — standardiser la production logicielle</H2>

      <H3>Qu'est-ce qu'un Skill ?</H3>
      <P>
        Un Skill n'a rien de magique : c'est un bloc de prompt engineering{" "}
        <strong>réutilisable</strong> qui définit exactement comment une tâche
        précise doit être exécutée selon les normes de l'entreprise.
      </P>
      <P>
        Demandé à la volée (« écris des tests pour cette fonction »), le
        résultat est fonctionnel mais chaque développeur obtient un style
        différent : mocks ou non, commentaires ou non. C'est une{" "}
        <strong>dette de maintenabilité</strong> massive pour l'équipe.
      </P>

      <H3>Injecter un Skill d'entreprise</H3>
      <P>
        Le Tech Lead rédige des fichiers de guidelines et force l'agent à s'y
        conformer. Exemple : imposer le pattern <strong>AAA</strong> (Arrange,
        Act, Assert) via un fichier{" "}
        <InlineCode>TESTING_GUIDELINES.md</InlineCode>, plutôt que des
        remontrances en Pull Request.
      </P>
      <Code>{`# SKILL : STANDARD DE TEST UNITAIRE
1. **Convention de nommage :** \`should_[EXPECTED_BEHAVIOR]_when_[CONDITION]\`
2. **Structure AAA obligatoire :**
   - \`// Arrange\` : initialisation des variables et des mocks.
   - \`// Act\` : appel unique de la méthode testée.
   - \`// Assert\` : vérifications via \`expect()\`.
   Ces trois blocs sont toujours séparés par un saut de ligne.`}</Code>
      <P>
        Couplé à l'agent spécialisé (System Prompt), le Skill garantit des
        tests conformes.
      </P>

      <H3>Le ROI</H3>
      <Code>{`@workspace crée les tests en suivant #file:TESTING_GUIDELINES.md`}</Code>
      <Ul>
        <li>Le code généré passe la revue de code du premier coup.</li>
        <li>
          Le gain ne porte pas que sur la frappe : ce sont les allers-retours
          de correction stylistique entre seniors et juniors (ou entre agents)
          qui disparaissent.
        </li>
      </Ul>
      <Note accent={AI_ACCENT}>
        Un Skill est une norme d'équipe rendue exécutable : versionné avec le
        code, relu comme du code.
      </Note>

      <SourceLink href="https://martinfowler.com/bliki/GivenWhenThen.html">
        martinfowler.com — GivenWhenThen
      </SourceLink>
    </div>
  );
}

export default function AiSkills() {
  return <Fr />;
}
