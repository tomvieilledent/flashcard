import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CPointers() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Pointeurs</H2>

      <P>
        Un pointeur est une variable qui contient l'<strong>adresse</strong>
        {" "}d'une autre variable. Son type dit ce qu'il y a à cette adresse.
      </P>

      <H3>Deux opérateurs</H3>
      <Table
        head={["Opérateur", "Se lit", "Rôle"]}
        rows={[
          ["&x", "adresse de x", "donne l'adresse d'une variable"],
          ["*p", "contenu pointé par p", "accède à la valeur à cette adresse (déréférencement)"],
        ]}
      />
      <Code>{`int x = 42;
int *p;          /* p : pointeur sur int */

p = &x;          /* p contient l'adresse de x */
printf("%d\\n", *p);   /* 42 */
*p = 7;          /* modifie x à travers p */
printf("%d\\n", x);    /* 7 */`}</Code>

      <H3>NULL</H3>
      <P>
        <InlineCode>NULL</InlineCode> = « ne pointe nulle part ». Déréférencer
        un pointeur <InlineCode>NULL</InlineCode> (ou non initialisé) =
        <InlineCode> segmentation fault</InlineCode>. Toujours tester avant.
      </P>
      <Code>{`int *p = NULL;

if (p != NULL)
	*p = 10;`}</Code>

      <H3>Modifier une variable de l'appelant</H3>
      <P>
        Les arguments sont copiés (passage par valeur). Pour qu'une fonction
        change une variable de l'appelant, on lui passe son <em>adresse</em>.
      </P>
      <Code>{`void echange(int *a, int *b)
{
	int tmp = *a;

	*a = *b;
	*b = tmp;
}

int main(void)
{
	int x = 1, y = 2;

	echange(&x, &y);      /* x vaut 2, y vaut 1 */
	return (0);
}`}</Code>

      <H3>Pointeurs et tableaux</H3>
      <Ul>
        <li>Le nom d'un tableau vaut l'adresse de son 1er élément : <InlineCode>tab</InlineCode> ≡ <InlineCode>&amp;tab[0]</InlineCode>.</li>
        <li><InlineCode>*(tab + i)</InlineCode> ≡ <InlineCode>tab[i]</InlineCode>.</li>
        <li>L'arithmétique de pointeur avance par <em>éléments</em>, pas par octets : <InlineCode>p + 1</InlineCode> saute <InlineCode>sizeof(*p)</InlineCode> octets.</li>
      </Ul>
      <Code>{`int tab[3] = {10, 20, 30};
int *p = tab;

printf("%d\\n", *(p + 2));   /* 30 */`}</Code>

      <H3>Pointeur de pointeur</H3>
      <Code>{`int x = 5;
int *p = &x;
int **pp = &p;

**pp = 9;      /* modifie x */`}</Code>
      <Note accent={CI_ACCENT}>
        Se lit de droite à gauche : <InlineCode>int **pp</InlineCode> = « pp
        est un pointeur vers un pointeur vers un int ».
      </Note>

      <SourceLink href="https://www.tutorialspoint.com/cprogramming/c_pointers.htm">
        tutorialspoint — Pointers
      </SourceLink>
    </div>
  );
}
