import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CVariadic() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Fonctions variadiques (stdarg.h)</H2>

      <P>
        Une fonction variadique accepte un nombre variable d'arguments —
        comme <InlineCode>printf</InlineCode>. Les <InlineCode>...</InlineCode>
        {" "}suivent au moins un paramètre nommé.
      </P>

      <H3>Les macros de <InlineCode>&lt;stdarg.h&gt;</InlineCode></H3>
      <Ul>
        <li><InlineCode>va_list</InlineCode> — le type qui parcourt les arguments.</li>
        <li><InlineCode>va_start(ap, dernier)</InlineCode> — initialise, après le dernier paramètre nommé.</li>
        <li><InlineCode>va_arg(ap, type)</InlineCode> — lit l'argument suivant du type donné.</li>
        <li><InlineCode>va_end(ap)</InlineCode> — nettoie (obligatoire).</li>
      </Ul>
      <Code>{`#include <stdarg.h>
#include <stdio.h>

int somme(int n, ...)
{
	va_list ap;
	int i, total = 0;

	va_start(ap, n);
	for (i = 0; i < n; i++)
		total += va_arg(ap, int);
	va_end(ap);
	return (total);
}

somme(3, 10, 20, 30);   /* 60 */`}</Code>

      <Note accent={CI_ACCENT}>
        C ne connaît <strong>pas</strong> le nombre ni le type des arguments
        variadiques. Il faut une convention : un compteur
        (<InlineCode>somme(3, ...)</InlineCode>), un marqueur de fin
        (<InlineCode>NULL</InlineCode>), ou une chaîne de format
        (<InlineCode>"%d %s"</InlineCode> comme <InlineCode>printf</InlineCode>).
        Se tromper de type dans <InlineCode>va_arg</InlineCode> = comportement
        indéfini.
      </Note>

      <H3>Promotions par défaut</H3>
      <Ul>
        <li><InlineCode>char</InlineCode> et <InlineCode>short</InlineCode> sont promus en <InlineCode>int</InlineCode> ; lire <InlineCode>va_arg(ap, int)</InlineCode>.</li>
        <li><InlineCode>float</InlineCode> est promu en <InlineCode>double</InlineCode> ; lire <InlineCode>va_arg(ap, double)</InlineCode>.</li>
      </Ul>

      <SourceLink href="https://en.wikipedia.org/wiki/Stdarg.h">
        Wikipedia — stdarg.h
      </SourceLink>
    </div>
  );
}
