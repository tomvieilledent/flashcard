import { Code, InlineCode, P, H2, H3, Ul, Note, Table, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CControlFlow() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Conditions et boucles</H2>

      <P>
        En C, il n'y a pas de type booléen dédié (avant
        <InlineCode> &lt;stdbool.h&gt;</InlineCode>) : <strong>0 est faux</strong>,
        toute autre valeur est vraie.
      </P>

      <H3>if / else if / else</H3>
      <Code>{`if (note >= 90)
{
	printf("A\\n");
}
else if (note >= 80)
{
	printf("B\\n");
}
else
{
	printf("C ou moins\\n");
}`}</Code>
      <P>
        Sans accolades, seul <em>l'instruction suivante</em> dépend du
        <InlineCode> if</InlineCode> — source de bugs. Betty impose souvent
        les accolades.
      </P>

      <H3>Opérateur ternaire</H3>
      <Code>{`int max = (a > b) ? a : b;`}</Code>

      <H3>switch</H3>
      <Code>{`switch (choix)
{
	case 1:
		printf("un\\n");
		break;
	case 2:
	case 3:
		printf("deux ou trois\\n");
		break;
	default:
		printf("autre\\n");
		break;
}`}</Code>
      <Note accent={CI_ACCENT}>
        Sans <InlineCode>break</InlineCode>, l'exécution « tombe » dans le
        <InlineCode> case</InlineCode> suivant (fall-through). Utile pour
        grouper des cas, dangereux si oublié.
      </Note>

      <H3>Boucles</H3>
      <Table
        head={["Forme", "Quand"]}
        rows={[
          ["while (cond) { … }", "condition testée AVANT chaque tour (0 à n itérations)"],
          ["do { … } while (cond);", "corps exécuté AU MOINS une fois"],
          ["for (init; cond; pas) { … }", "compteur connu ; init + test + incrément regroupés"],
        ]}
      />
      <Code>{`int i = 0;
while (i < 5)
{
	printf("%d ", i);
	i++;
}

for (i = 0; i < 5; i++)
	printf("%d ", i);`}</Code>

      <H3>break / continue</H3>
      <Ul>
        <li><InlineCode>break</InlineCode> — sort immédiatement de la boucle (ou du <InlineCode>switch</InlineCode>).</li>
        <li><InlineCode>continue</InlineCode> — passe directement au tour suivant.</li>
      </Ul>
      <Code>{`for (i = 1; i <= 100; i++)
{
	if (i % 2 == 0)
		continue;          /* ignore les pairs */
	if (i > 50)
		break;             /* arrête à partir de 51 */
	printf("%d ", i);
}`}</Code>

      <SourceLink href="https://www.tutorialspoint.com/cprogramming/if_else_statement_in_c.htm">
        tutorialspoint — if...else
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.tutorialspoint.com/cprogramming/c_while_loop.htm">
        while loop
      </SourceLink>
      {" · "}
      <SourceLink href="https://www.cprogramming.com/tutorial/c/lesson2.html">
        cprogramming.com — Conditions
      </SourceLink>
    </div>
  );
}
