import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CArgcArgv() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Arguments de main (argc, argv)</H2>

      <P>
        Pour recevoir les arguments de la ligne de commande,
        <InlineCode> main</InlineCode> se déclare :
      </P>
      <Code>{`int main(int argc, char *argv[])
/* équivalent : int main(int argc, char **argv) */`}</Code>
      <Ul>
        <li><InlineCode>argc</InlineCode> — <em>argument count</em> : nombre d'arguments, <strong>y compris le nom du programme</strong>.</li>
        <li><InlineCode>argv</InlineCode> — <em>argument vector</em> : tableau de chaînes.</li>
        <li><InlineCode>argv[0]</InlineCode> = nom/chemin du programme ; <InlineCode>argv[1]</InlineCode>… = les arguments ; <InlineCode>argv[argc]</InlineCode> = <InlineCode>NULL</InlineCode>.</li>
      </Ul>

      <Code>{`./prog bonjour 42

argc = 3
argv[0] = "./prog"
argv[1] = "bonjour"
argv[2] = "42"
argv[3] = NULL`}</Code>

      <H3>Parcourir les arguments</H3>
      <Code>{`#include <stdio.h>

int main(int argc, char *argv[])
{
	int i;

	for (i = 0; i < argc; i++)
		printf("argv[%d] = %s\\n", i, argv[i]);
	return (0);
}`}</Code>

      <H3>Points d'attention</H3>
      <Ul>
        <li>Tout arrive en <strong>chaîne</strong> : <InlineCode>"42"</InlineCode> n'est pas l'entier 42. Convertir avec <InlineCode>atoi(argv[1])</InlineCode> ou <InlineCode>strtol</InlineCode>.</li>
        <li>Vérifier <InlineCode>argc</InlineCode> avant de lire <InlineCode>argv[1]</InlineCode> — sinon lecture hors limites.</li>
        <li><InlineCode>gcc -Wall -Werror</InlineCode> : un <InlineCode>argv</InlineCode> non utilisé provoque un avertissement → <InlineCode>(void)argv;</InlineCode>.</li>
      </Ul>
      <Code>{`int main(int argc, char *argv[])
{
	if (argc != 2)
	{
		printf("Usage: %s <nombre>\\n", argv[0]);
		return (1);
	}
	printf("%d\\n", atoi(argv[1]) * 2);
	return (0);
}`}</Code>

      <SourceLink href="https://publications.gbdirect.co.uk//c_book/chapter10/arguments_to_main.html">
        The C Book — Arguments to main
      </SourceLink>
      {" · "}
      <SourceLink href="http://crasseux.com/books/ctutorial/argc-and-argv.html">
        crasseux.com — argc and argv
      </SourceLink>
    </div>
  );
}
