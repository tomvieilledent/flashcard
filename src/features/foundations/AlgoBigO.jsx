import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function AlgoBigO() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Complexité & notation Big O</H2>

      <P>
        La notation <strong>O(...)</strong> décrit comment le coût d'un
        algorithme (temps ou mémoire) <em>croît</em> quand la taille de
        l'entrée <InlineCode>n</InlineCode> augmente. On ignore les
        constantes et les termes négligeables : <InlineCode>3n + 10</InlineCode>
        {" "}est <InlineCode>O(n)</InlineCode>.
      </P>

      <H3>Les classes courantes (de la meilleure à la pire)</H3>
      <Table
        head={["Notation", "Nom", "Exemple"]}
        rows={[
          ["O(1)", "constant", "accès à tab[i]"],
          ["O(log n)", "logarithmique", "recherche dichotomique"],
          ["O(n)", "linéaire", "parcours d'un tableau"],
          ["O(n log n)", "quasi-linéaire", "tri fusion, tri rapide (moyenne)"],
          ["O(n²)", "quadratique", "double boucle imbriquée (tri à bulles)"],
          ["O(2ⁿ)", "exponentiel", "sous-ensembles, Fibonacci naïf"],
        ]}
      />

      <H3>Comment l'estimer</H3>
      <Ul>
        <li>Une boucle sur <InlineCode>n</InlineCode> → <InlineCode>O(n)</InlineCode>.</li>
        <li>Deux boucles imbriquées sur <InlineCode>n</InlineCode> → <InlineCode>O(n²)</InlineCode>.</li>
        <li>On divise l'entrée par 2 à chaque tour → <InlineCode>O(log n)</InlineCode>.</li>
        <li>Séquence d'étapes → on garde la plus coûteuse : <InlineCode>O(n) + O(n²) = O(n²)</InlineCode>.</li>
      </Ul>
      <Code>{`/* O(n²) : pour chaque i, on reparcourt tout le tableau */
for (i = 0; i < n; i++)
	for (j = 0; j < n; j++)
		if (tab[i] == tab[j] && i != j)
			doublon = 1;`}</Code>

      <H3>Pire cas, cas moyen, meilleur cas</H3>
      <P>
        Le tri rapide est <InlineCode>O(n log n)</InlineCode> en moyenne mais
        <InlineCode> O(n²)</InlineCode> au pire (pivot mal choisi). Holberton
        demande souvent d'indiquer les trois.
      </P>

      <Note accent={CI_ACCENT}>
        Big O parle de <em>tendance</em>, pas de vitesse absolue : pour un
        petit <InlineCode>n</InlineCode>, un <InlineCode>O(n²)</InlineCode>
        {" "}simple peut battre un <InlineCode>O(n log n)</InlineCode> avec de
        grosses constantes.
      </Note>

      <SourceLink href="https://stackoverflow.com/questions/487258/what-is-a-plain-english-explanation-of-big-o-notation">
        Stack Overflow — Plain English explanation of Big O
      </SourceLink>
      {" · "}
      <SourceLink href="https://en.wikipedia.org/wiki/Sorting_algorithm">
        Wikipedia — Sorting algorithm
      </SourceLink>
    </div>
  );
}
