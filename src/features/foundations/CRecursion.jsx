import { Code, InlineCode, P, H2, H3, Ul, Note, SourceLink } from "../../shared/ui/primitives.jsx";
import { CI_ACCENT } from "../../shared/ui/tokens.js";

export default function CRecursion() {
  return (
    <div>
      <H2 accent={CI_ACCENT}>Récursivité</H2>

      <P>
        Une fonction récursive s'appelle elle-même sur un sous-problème plus
        petit, jusqu'à un <strong>cas de base</strong> qui arrête la
        descente.
      </P>

      <H3>Les deux ingrédients</H3>
      <Ul>
        <li><strong>Cas de base</strong> : une entrée traitée directement, sans rappel.</li>
        <li><strong>Cas récursif</strong> : se rapproche du cas de base à chaque appel.</li>
      </Ul>
      <Code>{`int factorielle(int n)
{
	if (n <= 1)              /* cas de base */
		return (1);
	return (n * factorielle(n - 1));   /* cas récursif */
}`}</Code>

      <H3>Ce qui se passe en mémoire</H3>
      <P>
        Chaque appel empile une <em>stack frame</em> (paramètres, variables
        locales, adresse de retour). Les frames se dépilent au retour, dans
        l'ordre inverse.
      </P>
      <Code>{`factorielle(4)
= 4 * factorielle(3)
= 4 * (3 * factorielle(2))
= 4 * (3 * (2 * factorielle(1)))
= 4 * (3 * (2 * 1))  = 24`}</Code>
      <Note accent={CI_ACCENT}>
        Sans cas de base atteignable → récursion infinie →
        <InlineCode> stack overflow</InlineCode> (la pile est limitée, ~1–8 Mo).
      </Note>

      <H3>Exemples typiques (Holberton)</H3>
      <Code>{`/* longueur d'une chaîne, sans boucle */
int _strlen_recursion(char *s)
{
	if (*s == '\\0')
		return (0);
	return (1 + _strlen_recursion(s + 1));
}

/* puissance */
int _pow(int b, int e)
{
	if (e < 0)
		return (-1);
	if (e == 0)
		return (1);
	return (b * _pow(b, e - 1));
}`}</Code>

      <H3>Récursif vs itératif</H3>
      <P>
        Toute récursion peut se réécrire en boucle. La version récursive est
        souvent plus courte et plus proche de la définition mathématique ;
        l'itérative consomme une pile constante et évite le coût des appels.
      </P>

      <SourceLink href="https://www.tutorialspoint.com/cprogramming/c_recursion.htm">
        tutorialspoint — Recursion
      </SourceLink>
    </div>
  );
}
