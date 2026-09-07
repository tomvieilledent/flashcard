import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CMalloc() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Mémoire dynamique : malloc, free</H2>

      <P>
        La pile ne suffit pas quand la taille n'est connue qu'à l'exécution
        ou quand une donnée doit survivre à la fonction qui l'a créée. On
        demande alors de la mémoire sur le <strong>tas</strong>.
      </P>

      <H3>Les fonctions de <InlineCode>&lt;stdlib.h&gt;</InlineCode></H3>
      <Table
        head={["Fonction", "Rôle"]}
        rows={[
          ["malloc(taille)", "réserve `taille` octets, contenu indéterminé"],
          ["calloc(n, taille)", "réserve n×taille octets, mis à 0"],
          ["realloc(p, taille)", "redimensionne un bloc existant"],
          ["free(p)", "rend le bloc au système"],
        ]}
      />
      <Code>{`#include <stdlib.h>

int *tab;

tab = malloc(10 * sizeof(int));   /* place pour 10 int */
if (tab == NULL)                  /* malloc peut échouer */
	return (1);

tab[0] = 42;
free(tab);
tab = NULL;                       /* évite un double free / usage après libération */`}</Code>

      <Note accent={CI_ACCENT}>
        En C, on ne <em>caste</em> pas le retour de <InlineCode>malloc</InlineCode> :
        <InlineCode> void *</InlineCode> se convertit implicitement, et un
        cast peut masquer l'oubli de <InlineCode>#include &lt;stdlib.h&gt;</InlineCode>.
        (En C++, le cast est obligatoire — mais ce n'est pas du C.)
      </Note>

      <H3>Règles de survie</H3>
      <Ul>
        <li>Toujours tester <InlineCode>malloc == NULL</InlineCode>.</li>
        <li>Un <InlineCode>free</InlineCode> par <InlineCode>malloc</InlineCode> — ni zéro (fuite), ni deux (corruption).</li>
        <li>Ne jamais utiliser un pointeur après <InlineCode>free</InlineCode> (<em>use-after-free</em>).</li>
        <li><InlineCode>sizeof(*p)</InlineCode> plutôt que <InlineCode>sizeof(int)</InlineCode> : reste juste si le type change.</li>
        <li>Vérifier avec <InlineCode>valgrind ./prog</InlineCode> : « All heap blocks were freed ».</li>
      </Ul>

      <H3>realloc</H3>
      <Code>{`int *plus = realloc(tab, 20 * sizeof(int));

if (plus == NULL)        /* échec : tab est encore valide */
{
	free(tab);
	return (1);
}
tab = plus;              /* realloc a pu déplacer le bloc */`}</Code>

      <SourceLink href="https://stackoverflow.com/questions/605845/should-i-cast-the-result-of-malloc-in-c">
        Stack Overflow — Should I cast the result of malloc?
      </SourceLink>
    </div>
  );
}
