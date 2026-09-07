import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function AlgoSorting() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Algorithmes de tri</H2>

      <H3>Vocabulaire</H3>
      <Ul>
        <li><strong>Sur place</strong> (<em>in-place</em>) : mémoire supplémentaire O(1).</li>
        <li><strong>Stable</strong> : deux éléments égaux gardent leur ordre d'origine.</li>
        <li>On compte souvent les <strong>comparaisons</strong> et les <strong>échanges</strong> (<em>swaps</em>).</li>
      </Ul>

      <H3>Comparaison</H3>
      <Table
        head={["Tri", "Moyenne", "Pire", "Mémoire", "Stable"]}
        rows={[
          ["Bulles (bubble)", "O(n²)", "O(n²)", "O(1)", "oui"],
          ["Sélection", "O(n²)", "O(n²)", "O(1)", "non"],
          ["Insertion", "O(n²)", "O(n²)", "O(1)", "oui"],
          ["Rapide (quick)", "O(n log n)", "O(n²)", "O(log n)", "non"],
          ["Fusion (merge)", "O(n log n)", "O(n log n)", "O(n)", "oui"],
          ["Tas (heap)", "O(n log n)", "O(n log n)", "O(1)", "non"],
        ]}
      />

      <H3>Tri à bulles</H3>
      <P>
        Parcourt le tableau, échange deux voisins mal ordonnés, recommence
        jusqu'à ne plus rien échanger. Simple, lent, stable.
      </P>
      <Code>{`void bubble_sort(int *tab, int n)
{
	int i, tmp, permute = 1;

	while (permute)
	{
		permute = 0;
		for (i = 0; i < n - 1; i++)
		{
			if (tab[i] > tab[i + 1])
			{
				tmp = tab[i];
				tab[i] = tab[i + 1];
				tab[i + 1] = tmp;
				permute = 1;
			}
		}
		n--;                 /* le dernier est déjà à sa place */
	}
}`}</Code>

      <H3>Diviser pour régner</H3>
      <Ul>
        <li><strong>Fusion</strong> : coupe en deux, trie chaque moitié, fusionne. Coût garanti O(n log n), mais O(n) de mémoire.</li>
        <li><strong>Rapide</strong> : choisit un pivot, place les plus petits à gauche, les plus grands à droite, récursive. Très rapide en pratique ; O(n²) si le pivot est toujours mal choisi.</li>
      </Ul>

      <Note accent={CI_ACCENT}>
        Il n'y a pas de « meilleur » tri absolu : petit tableau presque trié
        → insertion ; mémoire limitée → tas ; stabilité requise → fusion.
      </Note>

      <SourceLink href="https://www.toptal.com/developers/sorting-algorithms">
        toptal — Sorting Algorithms Animations
      </SourceLink>
      {" · "}
      <SourceLink href="https://en.wikipedia.org/wiki/Sorting_algorithm">
        Wikipedia — Sorting algorithm
      </SourceLink>
    </div>
  );
}
