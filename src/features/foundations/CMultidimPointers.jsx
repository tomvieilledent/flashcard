import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CMultidimPointers() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Tableaux multidimensionnels & pointeurs de pointeurs</H2>

      <H3>Tableau 2D : de la mémoire contiguë</H3>
      <P>
        <InlineCode>int m[3][4]</InlineCode> = 12 <InlineCode>int</InlineCode>
        {" "}rangés ligne après ligne. <InlineCode>m[i][j]</InlineCode> se
        calcule comme <InlineCode>*(*(m + i) + j)</InlineCode>.
      </P>
      <Code>{`int m[2][3] = {
	{1, 2, 3},
	{4, 5, 6}
};

/* parcours */
int i, j;

for (i = 0; i < 2; i++)
	for (j = 0; j < 3; j++)
		printf("%d ", m[i][j]);`}</Code>
      <Note accent={CI_ACCENT}>
        Passé à une fonction, toutes les dimensions <em>sauf la première</em>
        doivent être connues : <InlineCode>void f(int m[][3], int lignes)</InlineCode>.
        Le compilateur en a besoin pour calculer les décalages.
      </Note>

      <H3>Pointeur de pointeur</H3>
      <P>
        Un <InlineCode>int **</InlineCode> pointe vers un
        <InlineCode> int *</InlineCode>. Deux usages fréquents :
      </P>
      <Ul>
        <li>modifier un pointeur de l'appelant (allouer à sa place) ;</li>
        <li>un « tableau de tableaux » alloué dynamiquement (lignes de tailles variables).</li>
      </Ul>
      <Code>{`void allouer(int **pp, int n)
{
	*pp = malloc(n * sizeof(int));   /* modifie le pointeur de l'appelant */
}

/* tableau 2D dynamique */
int **grille = malloc(lignes * sizeof(int *));
for (i = 0; i < lignes; i++)
	grille[i] = malloc(colonnes * sizeof(int));
/* accès : grille[i][j] */`}</Code>
      <Note accent={CI_ACCENT}>
        <InlineCode>int **</InlineCode> (tableau de pointeurs) et
        <InlineCode> int[ ][N]</InlineCode> (bloc contigu) ne sont
        <strong> pas</strong> interchangeables : disposition mémoire
        différente.
      </Note>

      <SourceLink href="https://www.tutorialspoint.com/cprogramming/c_multi_dimensional_arrays.htm">
        tutorialspoint — Multi-dimensional arrays
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.tutorialspoint.com/cprogramming/c_pointer_to_pointer.htm">
        tutorialspoint — Pointer to pointer
      </SourceLink>
      {" · "}
      <SourceLink href="https://boredzo.org/pointers/">
        boredzo.org — Everything you need to know about pointers
      </SourceLink>
    </div>
  );
}
