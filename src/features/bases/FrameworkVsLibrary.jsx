import { InlineCode, P, H2, H3, Ul, Note } from "../../shared/ui/primitives.jsx";
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

      <H3>Et dans la pratique ?</H3>
      <Ul>
        <li>
          <strong>React</strong> est une bibliothèque, <strong>Vue</strong>,{" "}
          <strong>Svelte</strong>, <strong>Django</strong> et{" "}
          <strong>Laravel</strong> sont des frameworks.
        </li>
        <li>
          Plus un outil impose son cadre, plus on avance vite au début, et
          moins on a de liberté ensuite.
        </li>
      </Ul>
      <P>
        Le détail par besoin : voir « Quel frontend ? » et « Quel backend ? ».
      </P>

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
