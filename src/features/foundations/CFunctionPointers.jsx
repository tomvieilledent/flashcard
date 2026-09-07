import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CFunctionPointers() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Pointeurs de fonction</H2>

      <P>
        Une fonction a une adresse. Un pointeur de fonction stocke cette
        adresse et permet d'appeler la fonction sans connaître son nom à
        l'avance — la base des <em>callbacks</em>.
      </P>

      <H3>Déclaration</H3>
      <Code>{`int  (*op)(int, int);      /* op : pointeur vers fonction (int,int) -> int */

int add(int a, int b) { return (a + b); }

op = add;          /* ou &add */
int r = op(2, 3);  /* ou (*op)(2, 3)  -> 5 */`}</Code>
      <Note accent={CI_ACCENT}>
        Les parenthèses autour de <InlineCode>*op</InlineCode> sont
        obligatoires : sans elles, <InlineCode>int *op(int, int)</InlineCode>
        déclare une <em>fonction qui renvoie</em> <InlineCode>int *</InlineCode>.
      </Note>

      <H3>Comme paramètre (callback)</H3>
      <Code>{`/* applique f à chaque élément */
void tab_each(int *tab, int n, void (*f)(int))
{
	int i;

	for (i = 0; i < n; i++)
		f(tab[i]);
}

void afficher(int x) { printf("%d\\n", x); }

tab_each(tab, 5, afficher);`}</Code>

      <H3>Table de dispatch</H3>
      <P>
        Un tableau de pointeurs de fonction remplace un long
        <InlineCode> switch</InlineCode>.
      </P>
      <Code>{`int add(int a, int b) { return (a + b); }
int sub(int a, int b) { return (a - b); }

int (*ops[])(int, int) = {add, sub};

int r = ops[0](10, 4);   /* add -> 14 */`}</Code>
      <P>
        C'est aussi le mécanisme de <InlineCode>qsort</InlineCode> : on lui
        passe la fonction de comparaison.
      </P>
      <Code>{`qsort(tab, n, sizeof(int), compare_ints);`}</Code>

      <SourceLink href="https://www.geeksforgeeks.org/c/function-pointer-in-c/">
        geeksforgeeks — Function pointer in C
      </SourceLink>
      {" · "}
      <SourceLink href="https://publications.gbdirect.co.uk//c_book/chapter5/function_pointers.html">
        The C Book — Function pointers
      </SourceLink>
    </div>
  );
}
