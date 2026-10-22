import { InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
import { TechTable } from "../../shared/ui/tech.jsx";
import { REACT_ACCENT } from "../../shared/ui/tokens.js";

export default function FrameworkVsLibrary() {
  return (
    <div>
      <H2 accent={REACT_ACCENT}>Framework, bibliothèque et frameworks courants</H2>

      <H3>Le problème : trop de noms, aucun repère</H3>
      <P>
        React, Vue, Django, Express, Laravel… Les débutants les voient tous
        cités sans savoir à quoi ils servent ni en quoi ils diffèrent.
      </P>

      <H3>La solution : comprendre la différence</H3>
      <Ul>
        <li>
          Une <strong>bibliothèque</strong> (<em>library</em>) : des outils que{" "}
          <em>vous</em> appelez quand vous en avez besoin.
        </li>
        <li>
          Un <strong>framework</strong> : une structure qui impose son cadre,
          et c'est <em>lui</em> qui appelle votre code. Analogie : la
          bibliothèque est une caisse à outils, le framework une maison dont
          les murs sont déjà posés.
        </li>
      </Ul>

      <H3>Les plus utilisés</H3>
      <TechTable
        head={["Nom", "Côté", "Langage", "Sert à"]}
        rows={[
          ["React", "Frontend", "JavaScript", "Construire des interfaces par composants (bibliothèque)"],
          ["Vue", "Frontend", "JavaScript", "Interfaces, courbe d'apprentissage douce"],
          ["Svelte", "Frontend", "JavaScript", "Interfaces compilées, peu de code"],
          ["Next.js / Nuxt", "Fullstack", "JavaScript", "React / Vue + rendu serveur et routage"],
          ["Express", "Backend", "JavaScript", "Serveur web minimaliste sur Node.js"],
          ["Django", "Backend", "Python", "Tout inclus : ORM, admin, authentification"],
          ["Flask / FastAPI", "Backend", "Python", "Serveur léger, API rapides à écrire"],
          ["Laravel", "Backend", "PHP", "Tout inclus, très répandu"],
          ["Spring Boot", "Backend", "Java", "Applications d'entreprise"],
          ["Tailwind", "Frontend", "CSS", "Styliser avec des classes utilitaires"],
        ]}
      />
      <Note accent={REACT_ACCENT}>
        Aucun n'est « le meilleur ». On choisit selon le projet, l'équipe et le
        langage déjà maîtrisé. Apprendre les bases (HTML, CSS, JavaScript ou
        Python) d'abord rend n'importe quel framework plus facile.{" "}
        <InlineCode>React</InlineCode> se présente d'ailleurs comme une
        bibliothèque, mais on l'emploie souvent comme un framework.
      </Note>
    </div>
  );
}
