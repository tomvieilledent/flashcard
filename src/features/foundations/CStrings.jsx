import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CStrings() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Chaînes de caractères</H2>

      <P>
        En C, une chaîne est un <strong>tableau de <InlineCode>char</InlineCode></strong>
        {" "}terminé par le caractère nul <InlineCode>'\\0'</InlineCode>.
        Ce zéro final marque la fin ; il occupe une case.
      </P>

      <H3>Déclarer</H3>
      <Code>{`char a[] = "Holberton";   /* 10 cases : 9 lettres + '\\0' */
char b[20] = "Bonjour";   /* place réservée pour grandir */
char c[] = {'h', 'i', '\\0'};

char *lit = "constante";  /* littéral : NE PAS modifier */`}</Code>
      <Note accent={CI_ACCENT}>
        Oublier le <InlineCode>'\\0'</InlineCode> : <InlineCode>printf</InlineCode>,
        <InlineCode> strlen</InlineCode> &amp; co continuent de lire la mémoire
        jusqu'à en trouver un — au hasard.
      </Note>

      <H3>Parcourir soi-même</H3>
      <Code>{`int _strlen(char *s)
{
	int len = 0;

	while (s[len] != '\\0')
		len++;
	return (len);
}`}</Code>

      <H3>La bibliothèque <InlineCode>&lt;string.h&gt;</InlineCode></H3>
      <Table
        head={["Fonction", "Rôle"]}
        rows={[
          ["strlen(s)", "longueur, sans compter le '\\0'"],
          ["strcpy(dst, src)", "copie src (avec le '\\0') dans dst"],
          ["strncpy(dst, src, n)", "copie au plus n caractères"],
          ["strcat(dst, src)", "concatène src à la fin de dst"],
          ["strcmp(a, b)", "0 si égales, <0 / >0 selon l'ordre"],
          ["strchr(s, c)", "adresse de la 1re occurrence de c"],
        ]}
      />
      <Code>{`#include <stdio.h>
#include <string.h>

int main(void)
{
	char nom[32] = "Ada";

	strcat(nom, " Lovelace");
	printf("%s (%lu)\\n", nom, strlen(nom));
	return (0);
}`}</Code>

      <H3>Pièges</H3>
      <Ul>
        <li>La destination doit être <strong>assez grande</strong> (contenu + <InlineCode>'\\0'</InlineCode>) — sinon débordement.</li>
        <li><InlineCode>strncpy</InlineCode> ne pose pas toujours le <InlineCode>'\\0'</InlineCode> : le forcer si besoin.</li>
        <li>Comparer avec <InlineCode>==</InlineCode> compare des adresses, pas le texte — utiliser <InlineCode>strcmp</InlineCode>.</li>
      </Ul>

      <SourceLink href="https://www.tutorialspoint.com/cprogramming/c_strings.htm">
        tutorialspoint — Strings
      </SourceLink>
    </div>
  );
}
