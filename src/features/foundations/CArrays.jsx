import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CArrays() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Tableaux</H2>

      <P>
        Un tableau est une suite d'éléments <strong>de même type</strong>,
        rangés de façon <strong>contiguë</strong> en mémoire. Sa taille est
        fixée à la déclaration.
      </P>

      <H3>Déclarer et initialiser</H3>
      <Code>{`int notes[5];                     /* 5 int, valeurs indéterminées */
int notes[5] = {12, 15, 9, 18, 7};
int zeros[10] = {0};              /* tout à 0 */
int prems[] = {1, 2, 3};         /* taille déduite : 3 */
char voyelles[] = {'a', 'e', 'i', 'o', 'u'};`}</Code>

      <H3>Accès — indices de 0 à n-1</H3>
      <Code>{`int i, dernier;

notes[0] = 20;          /* premier élément */
dernier = notes[4];     /* dernier d'un tableau de 5 */

for (i = 0; i < 5; i++)
	printf("%d\\n", notes[i]);`}</Code>
      <Note accent={CI_ACCENT}>
        C ne vérifie <em>pas</em> les bornes. <InlineCode>notes[5]</InlineCode>
        {" "}ou <InlineCode>notes[-1]</InlineCode> compile, lit/écrit de la
        mémoire voisine, et provoque des bugs sournois ou un
        <InlineCode> segmentation fault</InlineCode>.
      </Note>

      <H3>Tableaux et fonctions</H3>
      <P>
        Passé à une fonction, un tableau « se dégrade » en pointeur sur son
        premier élément : la fonction ne connaît plus sa taille, il faut la
        lui donner. Elle travaille sur le tableau <em>original</em>, pas sur
        une copie.
      </P>
      <Code>{`int somme(int *tab, int n)      /* ou  int tab[]  */
{
	int i, s = 0;

	for (i = 0; i < n; i++)
		s += tab[i];
	return (s);
}`}</Code>

      <H3>Tableaux à deux dimensions</H3>
      <Code>{`int grille[3][4];              /* 3 lignes, 4 colonnes */
int m[2][3] = {
	{1, 2, 3},
	{4, 5, 6}
};
m[1][2] = 60;`}</Code>

      <SourceLink href="https://www.tutorialspoint.com/cprogramming/c_arrays.htm">
        tutorialspoint — Arrays
      </SourceLink>
    </div>
  );
}
